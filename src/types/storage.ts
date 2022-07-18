import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'

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
  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'N') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  ************************************************************
   * 	*---- Storage Objects
   *  ************************************************************
   */
  async getAsV107(): Promise<number> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'N')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'N') != null
  }
}
