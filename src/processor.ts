import * as ss58 from "@subsquid/ss58"
import { lookupArchive } from "@subsquid/archive-registry"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import { Account, HistoricalBalance, Weights, Registration } from "./model";
import {BalancesTransferEvent} from "./types/events"


const processor = new SubstrateBatchProcessor()
    .setBatchSize(500)
    .setTypesBundle('types.json')
    .setDataSource({
        // For locally-run archives:
        archive: 'http://localhost:8888/graphql'
        // Lookup archive by the network name in the Subsquid registry
        // archive: lookupArchive("kusama", { release: "FireSquid" })
    })
    .addEvent('subtensorModule.NeuronRegistered', {
        data: {event: {args: true}}
    } as const)


type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>

// processor.addEventHandler('subtensorModule.NeuronRegistered', async (ctx) => {
//     const event = ctx.event;

//     let coldkey = ""
//     let hotkey = ""

//     for (const args of event.extrinsic.args) {
//         if (args.name === "coldkey") {
//         coldkey = args.value;
//         }
//         if (args.name === "hotkey") {
//         hotkey = args.value;
//         }
//     }

        
//     await ctx.store.save(
//         new Registration({
//         id: event.id,
//         name: event.name,
//         versionInfo: event.extrinsic.versionInfo,
//         blockNumber: event.blockNumber,
//         blockHash: event.extrinsic.hash,
//         // immunityPeriod: event.extrinsic.era.immortalEra,
//         coldkey: coldkey,
//         hotkey: hotkey,
//         // args: {
//         //   id: event.id,
//         //   name: event.extrinsic.args.name,
//         //   type: event.extrinsic.args.type,
//         //   value: event.extrinsic.args.value,
//         // },
//         })
//     );
// });

// processor.run();

processor.run(new TypeormDatabase(), async ctx => {
    const event = ctx.event;

    let coldkey = ""
    let hotkey = ""

    for (const args of event.extrinsic.args) {
        if (args.name === "coldkey") {
        coldkey = args.value;
        }
        if (args.name === "hotkey") {
        hotkey = args.value;
        }
    }

        
    await ctx.store.save(
        new Registration({
        id: event.id,
        name: event.name,
        versionInfo: event.extrinsic.versionInfo,
        blockNumber: event.blockNumber,
        blockHash: event.extrinsic.hash,
        // immunityPeriod: event.extrinsic.era.immortalEra,
        coldkey: coldkey,
        hotkey: hotkey,
        // args: {
        //   id: event.id,
        //   name: event.extrinsic.args.name,
        //   type: event.extrinsic.args.type,
        //   value: event.extrinsic.args.value,
        // },
        })
    );
})


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
