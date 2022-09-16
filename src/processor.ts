import * as ss58 from "@subsquid/ss58"

import { 
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
    SubtensorModuleNeuronsStorage, 
    SubtensorModuleNStorage,
    SystemAccountStorage
} from "./types/storage";
import { NeuronMetadataOf } from "./types/v100";

interface SliceProps {
    arr: number[],
    chunkSize: number
}


function makeid(coldkeyAddress: string, hotkeyAddress: string, uid: number): string {
    let result = coldkeyAddress + '-' + hotkeyAddress + '-' + uid

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


function getColdkey( m: Map<string, Coldkey>, id: string): Coldkey {
    if (!m.has(id)) {
        m.set(id, new Coldkey({id}))
    }
    return m.get(id)!
}

function getHotkey( m: Map<string, Hotkey>, id: string): Hotkey {
    if (!m.has(id)) {
        m.set(id, new Hotkey({id}))
    }
    return m.get(id)!
}

function getNeuron( m: Map<string, Neuron>, id: string): Neuron {
    if (!m.has(id)) {
        m.set(id, new Neuron({id}))
    }
    return m.get(id)!
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


    const balances = await system_ctx.getManyAsV100(coldkeys_balances);


    neurons.map(async (neuron, i) => {
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

        // coldkey information
        _coldkey.balance = balances[i].data.free;

        // hotkey information
        // _hotkey.neuronId = neuron_id

        // neuron link information
        _neuron.coldkey = _coldkey
        _neuron.hotkey = _hotkey

        ctx.log.info(_neuron)
        
        // coldkey_collection.push(_coldkey)
        // hotkey_collection.push(_hotkey)
        // neuron_collection.push(_neuron)
        await ctx.store.save(_coldkey)
        await ctx.store.save(_hotkey)
        await ctx.store.save(_neuron)


    })

    // await ctx.store.save(coldkey_collection)
    // await ctx.store.save(hotkey_collection)
    // await ctx.store.save(neuron_collection)

    // await ctx.store.save([...coldkey_collection, ...hotkey_collection, ...neuron_collection])

    return {
        'coldkey_collection': coldkey_collection, 
        'hotkey_collection': hotkey_collection, 
        'neuron_collection': neuron_collection
    }
}


async function sync( ctx: BlockHandlerContext<Store, {}>)  {

    const n_ctx = new SubtensorModuleNStorage(ctx);
    const n = await n_ctx.getAsV100();

    const ns = Array.from(Array(n).keys());
    const uids = sliceIntoChunks({arr: ns, chunkSize: 512});

    const neurons_ctx = new SubtensorModuleNeuronsStorage(ctx);

    for (let i = 0; i < uids.length; i++) {
        const neurons = await neurons_ctx.getManyAsV100(uids[i]);

        await map_neuron(ctx, neurons);
        
    }
}




/** PROCESSOR */

const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setBatchSize(500);
processor.setDataSource({
  archive: 'http://morpheus.opentensor.ai:8889/graphql',
  chain: "ws://archivelb.nakamoto.opentensor.ai:9944",
  
});

processor.setTypesBundle('types.json');
processor.setBlockRange({ from: 300000 })

processor.addPreHook(async (ctx) => {

    if (ctx.block.height % 100 === 0) {
        await sync(ctx);
    }
})

processor.run();
