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
    Neuron,
} from "./model/generated"

import {Store, TypeormDatabase} from "@subsquid/typeorm-store"

import { 
    SubtensorModuleNeuronsStorage, 
    SubtensorModuleHotkeysStorage,
    SubtensorModuleNStorage
} from "./types/storage";



const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(500);
processor.setDataSource({
  archive: 'http://morpheus.opentensor.ai:8889/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
processor.setBlockRange({ from: 290377 })


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

processor.addPreHook(async ctx => {
    ctx.log.info('Pre-hook');

    const n_ctx = new SubtensorModuleNStorage(ctx);
    const n = await n_ctx.getAsV107();
    
    
    for (let i = 0; i < n; i++) {
        const neurons_ctx = new SubtensorModuleNeuronsStorage(ctx);
        const neuron = await neurons_ctx.getAsV107(i);
        // ctx.log.info(neuron);

        const uid = neuron.uid;
        const stake = neuron.stake;
        const rank = neuron.rank;
        const incentive = neuron.incentive;
        const trust = neuron.trust;
        const consensus = neuron.consensus;
        const dividends = neuron.dividends;
        const emission = neuron.emission;
        const ip = neuron.ip;
        const port = neuron.port;
        const version = neuron.version;
        const coldkey = ss58.codec(42).encode(neuron.coldkey);
        const hotkey = ss58.codec(42).encode(neuron.hotkey);
        const last_updated = neuron.lastUpdate;
        const blockNum = ctx.block.height;
        const blockHash = ctx.block.hash;
        
        const data = new Neuron({
            id: makeid(12).toLowerCase(),
            uid: uid,
            stake: stake,
            rank: rank,
            incentive: incentive,
            trust: trust,
            consensus: consensus,
            dividends: dividends,
            emission: emission,
            ip: ip,
            port: port,
            version: version,
            lastUpdated: last_updated,
            createdAt: new Date(),
            })

        const account = new Account({
            id: makeid(12).toLowerCase(),
            coldkey: coldkey,
            hotkey: hotkey,
            neuron: [data],
            blockNum: blockNum,
            blockHash: blockHash,

        })

        data.account = account;


        await ctx.store.save(account);
        await ctx.store.save(data);
        // ctx.log.info('saved account: '+uid);
    }
})
// processor.addEventHandler('SubtensorModule.NeuronRegistered', processTransfers) 
// processor.addEventHandler("Balances.Transfer", processTransfers);

// async function processTransfers(
//   ctx: EventHandlerContext<Store, { event: { args: true } }>
// ) {
//     const event = ctx.event;
//     ctx.log.info(`Info Log example ${JSON.stringify(event)}`);

//     // if (event.name === "SubtensorModule.NeuronRegistered") {
//     //     const coldkey = event.args.call.args.coldkey;
//     //     const hotkey = event.args.call.args.hotkey;
        
//     //     const storage_ctx = new SubtensorModuleHotkeysStorage(ctx);
//     //     const account = new Account();
//     //     account.coldkey = coldkey;
//     //     account.hotkey = hotkey;
//     //     let account_address = ss58.decode(account.coldkey).bytes;

//     //     let txn_account = await storage_ctx.getAsV109(account_address);

//     //     ctx.log.info(`Info Log example ${JSON.stringify(txn_account)}`);


//     // }
// }


processor.run();

// const processor = new SubstrateBatchProcessor()
//     .setBatchSize(500)
//     .setTypesBundle('types.json')
//     .setDataSource({
//         // For locally-run archives:
//         archive: 'http://206.81.4.77:8888/graphql',
//         chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
//         // Lookup archive by the network name in the Subsquid registry
//         // archive: lookupArchive("kusama", { release: "FireSquid" })
//     })
//     .setBlockRange({ from: 100000 })
//     .addEvent('SubtensorModule.NeuronRegistered', {
//         data: {event: {args: true}}
//     } as const);

// type Item = BatchProcessorItem<typeof processor>;
// type Ctx = BatchContext<Store, Item>;

// processor.run(new TypeormDatabase(), async (ctx) => {
//     ctx.log.info('Pre-hook');
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
