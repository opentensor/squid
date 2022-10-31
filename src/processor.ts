import * as ss58 from "@subsquid/ss58"

import { 
    EventHandlerContext,
    BlockHandlerContext,
    SubstrateProcessor  ,
} from "@subsquid/substrate-processor"

import {
    Coldkey,
    Hotkey,
    Neuron,
    Transfer,
} from "./model/generated"

import {Store, TypeormDatabase} from "@subsquid/typeorm-store"

import {
    BalancesTransferEvent
} from "./types/events"

import { 
    SubtensorModuleNeuronsStorage, 
    SubtensorModuleNStorage,
    SystemAccountStorage
} from "./types/storage";
import { NeuronMetadata } from "./types/v107";


type EntityConstructor<T> = {
    new (...args: any[]): T;
  };

function getTransferEvent( event: BalancesTransferEvent ) {
    if (event.isV107) {
        const { from, to, amount } = event.asV107;
        return { from, to, amount }
      } else if (event.isV107) {
        const { from, to, amount } = event.asV107;
        return { from, to, amount }
      }
}


async function getOrCreate<T extends { id: string }>(
    store: Store,
    EntityConstructor: EntityConstructor<T>,
    id: string
  ): Promise<T> {
    let entity = await store.get<T>(EntityConstructor, {
        // @ts-ignore
      where: { id },
    });
  
    if (entity == null) {
      entity = new EntityConstructor();
      entity.id = id;
    }
  
    return entity;
  }


const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(100);
processor.setDataSource({
  archive: 'http://morpheus.opentensor.ai:8889/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
// processor.setBlockRange({ from: 2270000 })
processor.setBlockRange({ from: 1702287 })



processor.addEventHandler('Balances.Transfer', async (ctx) => {
    const event = new BalancesTransferEvent(ctx);

    let _transfer = getTransferEvent(event);


    if (_transfer) {
        const fromAddress = ss58.codec(42).encode(_transfer.from);
        const toAddress = ss58.codec(42).encode(_transfer.to);

        const fromAcc = await getOrCreate(ctx.store, Coldkey, fromAddress);
        fromAcc.balance = fromAcc.balance || 0n;
        fromAcc.balance -= _transfer.amount;
        fromAcc.blockNum = ctx.block.height;
        await ctx.store.save(fromAcc);

        const toAcc = await getOrCreate(ctx.store, Coldkey, toAddress);
        toAcc.balance = toAcc.balance || 0n;
        toAcc.balance += _transfer.amount;
        toAcc.blockNum = ctx.block.height;
        await ctx.store.save(toAcc);

        let transfer = new Transfer({
            id: ctx.block.hash,
            from: fromAcc,
            to: toAcc,
            amount: _transfer.amount,
            blockNum: ctx.block.height,
        });

        await ctx.store.save(transfer);

    
    }
});

processor.run();