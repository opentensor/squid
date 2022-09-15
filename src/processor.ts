import * as ss58 from "@subsquid/ss58"
import { lookupArchive } from "@subsquid/archive-registry"
import {
    BatchContext,
    BatchProcessorItem,
    BlockHandlerContext, 
    EventHandlerContext, 
    SubstrateBatchProcessor, 
    SubstrateProcessor
} from "@subsquid/substrate-processor"

import {
    Account,
    Hotkey,
    Neuron,
} from "./model/generated"

import {Store, TypeormDatabase} from "@subsquid/typeorm-store"

import { 
    SubtensorModuleNeuronsStorage, 
    SubtensorModuleHotkeysStorage,
    SubtensorModuleNStorage,
    SystemAccountStorage
} from "./types/storage";

import {
    BalancesTransferEvent
} from "./types/events"



const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(500);
processor.setDataSource({
  archive: 'http://morpheus.opentensor.ai:8889/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
processor.setBlockRange({ from: 300000 })


const logger = (data: any) => {
    console.log(data);
}

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


function sliceIntoChunks({arr, chunkSize}: SliceProps) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

interface SliceProps {
    arr: number[],
    chunkSize: number
}


async function sync(ctx: BlockHandlerContext<Store, {}>) {
    const n_ctx = new SubtensorModuleNStorage(ctx);
    const n = await n_ctx.getAsV100();

    // create an array with a range of 0 to n, then split into chunks of size 16
    ctx.log.info(`n: ${n}`);
    const ns = Array.from(Array(n).keys());
    const uids = sliceIntoChunks({arr: ns, chunkSize: 512});



    const neurons_ctx = new SubtensorModuleNeuronsStorage(ctx);
    const system_ctx = new SystemAccountStorage(ctx);


    for (let i = 0; i < uids.length; i++) {
        const neurons = await neurons_ctx.getManyAsV100(uids[i]);

        // let accounts = [];
        // let datas = [];

        let accounts: Account[] = [];
        let all_hotkeys: Hotkey[] = [];
        let datas: Neuron[] = [];
        let coldkeys: Uint8Array[] = [];

        neurons.map((neuron) => {
            coldkeys.push(neuron.coldkey);
        })


        const balances = await system_ctx.getManyAsV100(coldkeys);

        // ctx.log.info(neurons)
        neurons.map(async (neuron) => {
            const {uid, stake, rank, incentive, trust, consensus, dividends, emission, ip, port, version} = neuron;
            const last_updated = neuron.lastUpdate;
            const coldkey = ss58.codec(42).encode(neuron.coldkey);
            const hotkey = ss58.codec(42).encode(neuron.hotkey);
            const blockNum = ctx.block.height;

            // const data = new Neuron({
            //     id: hotkey,
            //     uid: uid,
            //     stake: stake,
            //     rank: rank,
            //     incentive: incentive,
            //     trust: trust,
            //     consensus: consensus,
            //     dividends: dividends,
            //     emission: emission,
            //     ip: ip,
            //     port: port,
            //     version: version,
            //     lastUpdated: last_updated,
            //     createdAt: new Date(),

            // })
            
            // const user_balance = balances[i].data.free;

            // const hotkeys = new Hotkey({
            //     id: makeid(12).toLowerCase(),
            //     account: coldkey,
            // })

            // const account = new Account({
            //     id: makeid(12).toLowerCase(),
            //     coldkeyAddress: coldkey,
            //     hotkey: hotkey,
            //     balance: user_balance,
            //     neuron: [data],
            //     blockNum: blockNum,
            //     blockHash: ctx.block.hash,
            // })

            // data.account = account;

            // accounts.push(account);
            // datas.push(data);

            let accounts_search = await ctx.store.findBy(Account, { id: coldkey });
            const _accounts = new Map<string, Account>(accounts_search.map((a) => [a.id, a]));
            const account = getAccount(_accounts, coldkey)


            let hotkeys = await ctx.store.findBy(Hotkey, { id: hotkey });
            const _hotkeys = new Map<string, Hotkey>(hotkeys.map((h) => [h.id, h]));
            const account_hotkey = getHotkey(_hotkeys, hotkey)


            let neurons = await ctx.store.findBy(Neuron, { hotkeyAddress: hotkey });
            const _neurons = new Map<string, Neuron>(neurons.map((n) => [n.id, n]));

            const data = getNeuron(_neurons, hotkey)

            data.id = makeid(12).toLowerCase();
            data.uid = uid;
            data.coldkeyAddress = coldkey;
            data.hotkey = account_hotkey;
            data.stake = stake;
            data.rank = rank;
            data.incentive = incentive;
            data.trust = trust;
            data.consensus = consensus;
            data.dividends = dividends;
            data.emission = emission;
            data.ip = ip;
            data.port = port;
            data.version = version;
            data.lastUpdated = last_updated;
            data.createdAt = new Date();
            data.blockNum = blockNum;

            account_hotkey.blockNum = blockNum;
            account_hotkey.uid = uid;

            // account_hotkey.account = account;
            // let user_hotkeys: Hotkey[] = [account.hotkeys]
            account.hotkeys = [...account.hotkeys, account_hotkey]
            // account.hotkeys = [account_hotkey]
            account.balance = balances[i].data.free;
            account.blockNum = blockNum;

            // sort the hotkeys by colkdey address
            // account.hotkeys = account.hotkeys.sort((a, b) => {
                // ctx.log.info('account')
                // ctx.log.info(account);
                // ctx.log.info('hotkey')
                // ctx.log.info(account.hotkeys)
            // await ctx.store.save(account_hotkey);
            // await ctx.store.save(account);
            // await ctx.store.save(data);



            accounts.push(account);
            datas.push(data);
            all_hotkeys.push(account_hotkey);
            // datas.push(data);


                

            // const account = getAccount(ctx.store.accounts, coldkey);


        })

        // ctx.log.info(`accounts: ${accounts}`)
        await ctx.store.save(accounts);
        await ctx.store.save(datas);
        await ctx.store.save(all_hotkeys);

    }
}

processor.addPreHook(async (ctx) => {

    if (ctx.block.height % 100 === 0) {
        await sync(ctx);
    }
})


function getAccount(m: Map<string, Account>, id: string): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
        acc.hotkeys = []
        acc.transfersFrom = []
        acc.transfersTo = []
        
        m.set(id, acc)
    }
    return acc
}

function getNeuron(m: Map<string, Neuron>, id: string): Neuron {
    let n = m.get(id)
    if (n == null) {
        n = new Neuron()
        n.id = id
        m.set(id, n)
    }
    return n
}

function getHotkey(m: Map<string, Hotkey>, id: string): Hotkey {
    let h = m.get(id)
    if (h == null) {
        h = new Hotkey()
        h.id = id
        m.set(id, h)
    }
    return h
}



// processor.addPreHook(async (ctx) => {
//     // ctx.log.info(`processing block ${ctx.block.height}`);

//     if (ctx.block.height % 100 === 0) {
//         ctx.log.info(`processing block ${ctx.block.height}`);
//     }
// })


processor.run();

// const processor = new SubstrateBatchProcessor()
//     .setBatchSize(500)
//     .setTypesBundle('types.json')
//     .setDataSource({
//         // For locally-run archives:
//         archive: 'http://morpheus.opentensor.ai:8889/graphql',
//         chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
//         // Lookup archive by the network name in the Subsquid registry
//         // archive: lookupArchive("kusama", { release: "FireSquid" })
//     })
//     .setBlockRange({ from: 300000 })
//     .addEvent('SubtensorModule.NeuronRegistered', {
//         data: {event: {args: true}}
//     } as const)
//     .addEvent('Balances.Transfer', {
//         data: {
//             event: {
//                 args: true,
//                 extrinsic: {
//                     hash: true,
//                     fee: true
//                 }
//             }
//         }
//     } as const);


// type Item = BatchProcessorItem<typeof processor>;
// type Ctx = BatchContext<Store, Item>;

// interface TransferData {
//     id: string
//     timestamp: Date
//     // extrinsicHash: string
//     from: string
//     to: string
//     amount: bigint
//     fee?: bigint
// }


// function getTransfers(ctx: Ctx): TransferData[] {
//     let transfers: TransferData[] = []
//     for (let block of ctx.blocks) {
//         for (let item of block.items) {
//             if (item.kind === "event" && item.name === "Balances.Transfer") {
//                 let e = new BalancesTransferEvent(ctx, item.event)
//                 let rec: {from: Uint8Array, to: Uint8Array, amount: bigint}
//                 rec = e.asV100

//                 transfers.push({
//                     // some data manipulation  with `item.event` data
//                     id: item.event.id,
//                     timestamp: new Date(block.header.timestamp),
//                     // extrinsicHash: item.event.extrinsic.hash,
//                     from: ss58.codec('kusama').encode(rec.from),
//                     to: ss58.codec('kusama').encode(rec.to),
//                     amount: rec.amount,
//                     fee: 125n,
//                 })
//             }
//         }
//     }


//     return transfers;
// } 

// function getAccount(m: Map<string, Account>, id: string): Account {
//     let acc = m.get(id)
//     if (acc == null) {
//         acc = new Account()
//         acc.id = id
//         acc.balance = 0n
//         m.set(id, acc)
//     }
//     return acc
// }


// processor.addPreHook(async (ctx) => {
//     const n_ctx = new SubtensorModuleNStorage(ctx);
//     const n = await n_ctx.getAsV107();

//     // create an array with a range of 0 to n, then split into chunks of size 16
//     ctx.log.info(`n: ${n}`);
//     const ns = Array.from(Array(n).keys());
//     const uids = sliceIntoChunks({arr: ns, chunkSize: 512});



//     const neurons_ctx = new SubtensorModuleNeuronsStorage(ctx);
//     const system_ctx = new SystemAccountStorage(ctx);


//     for (let i = 0; i < uids.length; i++) {
//         const neurons = await neurons_ctx.getManyAsV107(uids[i]);

//         // let accounts = [];
//         // let datas = [];

//         let accounts: Account[] = [];
//         let datas: Neuron[] = [];
//         let coldkeys: Uint8Array[] = [];

//         neurons.map((neuron) => {
//             coldkeys.push(neuron.coldkey);
//         })


//         const balances = await system_ctx.getManyAsV107(coldkeys);

//         // ctx.log.info(neurons)
//         neurons.map(async (neuron) => {
//             const {uid, stake, rank, incentive, trust, consensus, dividends, emission, ip, port, version} = neuron;
//             const last_updated = neuron.lastUpdate;
//             const coldkey = ss58.codec(42).encode(neuron.coldkey);
//             const hotkey = ss58.codec(42).encode(neuron.hotkey);
//             const blockNum = ctx.block.height;

//             const data = new Neuron({
//                 id: makeid(12).toLowerCase(),
//                 uid: uid,
//                 stake: stake,
//                 rank: rank,
//                 incentive: incentive,
//                 trust: trust,
//                 consensus: consensus,
//                 dividends: dividends,
//                 emission: emission,
//                 ip: ip,
//                 port: port,
//                 version: version,
//                 lastUpdated: last_updated,
//                 createdAt: new Date(),

//             })
            
//             const user_balance = balances[i].data.free;
//             const account = new Account({
//                 id: makeid(12).toLowerCase(),
//                 coldkey: coldkey,
//                 hotkey: hotkey,
//                 balance: user_balance,
//                 neuron: [data],
//                 blockNum: blockNum,
//                 blockHash: ctx.block.hash,
//             })

//             data.account = account;

//             accounts.push(account);
//             datas.push(data);

//         })

//         await ctx.store.save(accounts);
//         await ctx.store.save(datas);
//     }
// })


// processor.run(new TypeormDatabase(), async (ctx: Ctx) => {
//     ctx.log.info('Pre-hook');

//     const blocks = ctx.blocks;
//     const store = ctx.store;
    
//     ctx.log.info(`Processing ${blocks.length} blocks`);
//     ctx.log.info(`Processing ${JSON.stringify(blocks[0])} items`);
// })





// type Item = BatchProcessorItem<typeof processor>
// type Ctx = BatchContext<Store, Item>

// const logger = ({data}: any) => {
//     console.log(data)
// }

// interface TransferEvent {
//     from: Uint8Array
//     to: Uint8Array
//     amount: bigint
// }



// function getTransferEvent(ctx: Ctx) {
//     console.log(ctx)
// }


// processor.run(new TypeormDatabase(), async ctx => {
//     console.log('aa')
// })


// interface TransferEvent {
//     id: string
//     from: string
//     to: string
//     amount: bigint
//     timestamp: bigint
// }


// function getRegistrations(ctx: Ctx): Registration[] {
//     return ctx.store.find(Registration)
// } 

// function getTransfers(ctx: Ctx): TransferEvent[] {
//     let transfers: TransferEvent[] = []
//     for (let block of ctx.blocks) {
//         for (let item of block.items) {
//             if (item.name == "Balances.Transfer") {
//                 let e = new BalancesTransferEvent(ctx, item.event)
//                 let rec: {from: Uint8Array, to: Uint8Array, amount: bigint}
//                 if (e.isV1020) {
//                     let [from, to, amount, ] = e.asV1020
//                     rec = {from, to, amount}
//                 } else if (e.isV1050) {
//                     let [from, to, amount] = e.asV1050
//                     rec = {from, to, amount}
//                 } else {
//                     rec = e.asV9130
//                 }
//                 transfers.push({
//                     id: item.event.id,
//                     from: ss58.codec('kusama').encode(rec.from),
//                     to: ss58.codec('kusama').encode(rec.to),
//                     amount: rec.amount,
//                     timestamp: BigInt(block.header.timestamp)
//                 })
//             }
//         }
//     }
//     return transfers
// }


