import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v109 from './v109'

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
  get isV109() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd'
  }

  /**
   *  ---- Maps from hotkey to uid.
   */
  async getAsV109(key: v109.AccountId): Promise<number> {
    assert(this.isV109)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', key)
  }

  async getManyAsV109(keys: v109.AccountId[]): Promise<(number)[]> {
    assert(this.isV109)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') != null
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
  get isV109() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') === '893f13529c7086c600265efd340b02f4932efb16e4e5333ac6438bb1211f40fc'
  }

  /**
   *  ---- Maps from uid to neuron.
   */
  async getAsV109(key: number): Promise<v109.NeuronMetadataOf> {
    assert(this.isV109)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Neurons', key)
  }

  async getManyAsV109(keys: number[]): Promise<(v109.NeuronMetadataOf)[]> {
    assert(this.isV109)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Neurons', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') != null
  }
}
