import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v100 from './v100'

export class SubtensorModuleHotkeysStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  ---- Maps from hotkey to uid.
   */
  get isV100() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd'
  }

  /**
   *  ---- Maps from hotkey to uid.
   */
  async getAsV100(key: Uint8Array): Promise<number> {
    assert(this.isV100)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', key)
  }

  async getManyAsV100(keys: Uint8Array[]): Promise<(number)[]> {
    assert(this.isV100)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') != null
  }
}

export class SubtensorModuleNStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  ************************************************************
   * 	*---- Storage Objects
   *  ************************************************************
   */
  get isV100() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'N') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  ************************************************************
   * 	*---- Storage Objects
   *  ************************************************************
   */
  async getAsV100(): Promise<number> {
    assert(this.isV100)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'N')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'N') != null
  }
}

export class SubtensorModuleNeuronsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  ---- Maps from uid to neuron.
   */
  get isV100() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') === '893f13529c7086c600265efd340b02f4932efb16e4e5333ac6438bb1211f40fc'
  }

  /**
   *  ---- Maps from uid to neuron.
   */
  async getAsV100(key: number): Promise<v100.NeuronMetadataOf> {
    assert(this.isV100)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Neurons', key)
  }

  async getManyAsV100(keys: number[]): Promise<(v100.NeuronMetadataOf)[]> {
    assert(this.isV100)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Neurons', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') != null
  }
}

export class SystemAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV100() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '6890c1aff9ee8613f29f28c61a4338c5967aa55e87574dc736c9de25fae1f270'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV100(key: Uint8Array): Promise<v100.AccountInfo> {
    assert(this.isV100)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV100(keys: Uint8Array[]): Promise<(v100.AccountInfo)[]> {
    assert(this.isV100)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}
