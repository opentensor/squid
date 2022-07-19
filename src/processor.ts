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
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import { Account } from "./model";

// import { SubtensorModuleNeuronsStorage, SubtensorModuleHotkeysStorage } from "./types/storage";



const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(500);
processor.setDataSource({
  archive: 'http://206.81.4.77:8888/graphql',
//   chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
processor.setBlockRange({ from: 200000 })


const logger = (data: any) => {
    console.log(data);
}



processor.addPreHook(async ctx => {
    ctx.log.info('Pre-hook');
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


// processor.run();

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
