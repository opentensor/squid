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
import { NeuronMetadataOf } from "./types/v109";

interface SliceProps {
    arr: number[],
    chunkSize: number
}

interface TransferEvent {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    from: string
    to: string
    amount: bigint
    fee?: bigint
}

type EntityConstructor<T> = {
    new (...args: any[]): T;
  };

function makeid(coldkeyAddress: string, hotkeyAddress: string, uid: number): string {
    let result = coldkeyAddress + '-' + hotkeyAddress

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

function getTransferEvent( event: BalancesTransferEvent ) {
    if (event.isV109) {
        const [from, to, amount] = event.asV109;
        return { from, to, amount }
      } else if (event.isV109) {
        const [from, to, amount] = event.asV109;
        return { from, to, amount }
      }
}

function getColdkey( m: Map<string, Coldkey>, id: string): Coldkey {
    let coldkey = m.get(id)
    if (coldkey == null) {
        coldkey = new Coldkey()
        coldkey.id = id

        m.set(id, coldkey)
    }
    return coldkey
}


function getHotkey( m: Map<string, Hotkey>, id: string): Hotkey {
    let hotkey = m.get(id)
    if (hotkey == null) {
        hotkey = new Hotkey()
        hotkey.id = id
        
        m.set(id, hotkey)
    }
    return hotkey
}


function getNeuron( m: Map<string, Neuron>, id: string): Neuron {
    let neuron = m.get(id)
    if (neuron == null) {
        neuron = new Neuron()

        neuron.id = id

        m.set(id, neuron)
    }
    return neuron
}




async function map_neuron(ctx: BlockHandlerContext<Store, {}>, neurons: NeuronMetadataOf[]) {

    const system_ctx = new SystemAccountStorage(ctx);
    
    let coldkey_collection = new Array<Coldkey>()
    let hotkey_collection = new Array<Hotkey>()
    let neuron_collection = new Array<Neuron>()

    let coldkeys_balances: Uint8Array[] = [];

    neurons.map((neuron) => {
        coldkeys_balances.push(neuron.coldkey);
    })


    const balances = await system_ctx.getManyAsV109(coldkeys_balances);


    for (let i = 0; i < neurons.length; i++) {
        const neuron = neurons[i];
        const {uid, stake, rank, incentive, trust, consensus, dividends, emission, ip, port, version} = neuron;
        const last_updated = neuron.lastUpdate;
        const coldkeyAddress = ss58.codec(42).encode(neuron.coldkey);
        const hotkeyAddress = ss58.codec(42).encode(neuron.hotkey);
        const blockNum = ctx.block.height;

        const neuron_id = makeid(coldkeyAddress, hotkeyAddress, uid);

        let sck
        let shk
        let sn


        // TODO: make this block of code more efficient
        try {
            sck = await ctx.store
            .findBy(Coldkey, {id: coldkeyAddress })
            .then((coldkey) => {
                return new Map<string, Coldkey>(coldkey.map((c) => [c.id, c]))
            })
        } catch (error) {
            sck = new Map<string, Coldkey>()
        }

        try {
            shk = await ctx.store
            .findBy(Hotkey, {id: hotkeyAddress })
            .then((hotkey) => {
                return new Map<string, Hotkey>(hotkey.map((h) => [h.id, h]))
            })
        } catch (error) {
            shk = new Map<string, Hotkey>()
        }


        try {
            sn = await ctx.store
            .findBy(Neuron, {id: neuron_id })
            .then((neuron) => {
                return new Map<string, Neuron>(neuron.map((n) => [n.id, n]))
            })
        } catch (error) {
            sn = new Map<string, Neuron>()
            ctx.log.info('Neuron not found')
        }


        let _coldkey = getColdkey(sck, coldkeyAddress)
        let _hotkey = getHotkey(shk, hotkeyAddress)
        let _neuron = getNeuron(sn, neuron_id)

        // Block nums
        _coldkey.blockNum = blockNum
        _hotkey.blockNum = blockNum
        _neuron.blockNum = blockNum


        // neuron information
        _neuron.uid = uid
        _neuron.stake = stake
        _neuron.rank = rank
        _neuron.incentive = incentive
        _neuron.trust = trust
        _neuron.consensus = consensus
        _neuron.dividends = dividends
        _neuron.emission = emission
        _neuron.ip = ip
        _neuron.port = port
        _neuron.version = version
        _neuron.lastUpdated = last_updated

        // try {
        // coldkey information
        _coldkey.balance = balances[i].data.free;

        // hotkey information
        // _hotkey.neuronId = neuron_id

        // neuron link information
        _neuron.coldkey = _coldkey
        _neuron.hotkey = _hotkey

        // ctx.log.info(_neuron)
        
        coldkey_collection.push(_coldkey)
        hotkey_collection.push(_hotkey)
        neuron_collection.push(_neuron)
        // } catch (error) {
        //     ctx.log.info('error')
        // }
        


    }

    // await ctx.store.save([...coldkey_collection, ...hotkey_collection, ...neuron_collection])

    return {
        'coldkey_collection': coldkey_collection, 
        'hotkey_collection': hotkey_collection, 
        'neuron_collection': neuron_collection
    }
}


async function sync( ctx: BlockHandlerContext<Store, {}>)  {

    const n_ctx = new SubtensorModuleNStorage(ctx);
    const n = await n_ctx.getAsV109();

    const ns = Array.from(Array(n).keys());
    const uids = sliceIntoChunks({arr: ns, chunkSize: 512});

    const neurons_ctx = new SubtensorModuleNeuronsStorage(ctx); 

    for (let i = 0; i < uids.length; i++) {
        const neurons = await neurons_ctx.getManyAsV109(uids[i]);

        // if (neurons) {
        const { coldkey_collection, hotkey_collection, neuron_collection } = await map_neuron(ctx, neurons);

        coldkey_collection.map(async coldkey => {
            await ctx.store.save(coldkey)
        })

        hotkey_collection.map(async hotkey => {
            await ctx.store.save(hotkey)
        })

        neuron_collection.map(async neuron => {
            await ctx.store.save(neuron)
            // ctx.log.info(neuron)
        })
        
        // }
        
    }
}




/** PROCESSOR */

const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(100);
processor.setDataSource({
  archive: 'http://morpheus.opentensor.ai:8889/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
// processor.setBlockRange({ from: 2270000 })
processor.setBlockRange({ from: 2274300 })


processor.addPreHook(async (ctx) => {

    if (ctx.block.height % 100 === 0) {
        await sync(ctx);
    }
})

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
