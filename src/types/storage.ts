import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v107 from './v107'

export class BalancesAccountStorage {
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
   *  The balance of an account.
   * 
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === 'dba1bfeb1258117ae732d6352c5990b0a43384798842bb1ba85a19e1c4e289aa'
  }

  /**
   *  The balance of an account.
   * 
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  async getAsV107(key: v107.AccountId): Promise<v107.AccountData> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV107(keys: v107.AccountId[]): Promise<(v107.AccountData)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') != null
  }
}

export class BalancesLocksStorage {
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
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') === '1fd03ed79b885693f584f13fe463dfd4dff4135ad8a64aef22d7a9a4ed76b737'
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  async getAsV107(key: v107.AccountId): Promise<v107.BalanceLock[]> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Locks', key)
  }

  async getManyAsV107(keys: v107.AccountId[]): Promise<(v107.BalanceLock[])[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') != null
  }
}

export class BalancesReservesStorage {
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
   *  Named reserves on some account balances.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') === '08a78bdfa0c3e61a3737bcbc0f929bb14b5531a416f88db7d077526cfac0d083'
  }

  /**
   *  Named reserves on some account balances.
   */
  async getAsV107(key: v107.AccountId): Promise<v107.ReserveData[]> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Reserves', key)
  }

  async getManyAsV107(keys: v107.AccountId[]): Promise<(v107.ReserveData[])[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') != null
  }
}

export class BalancesStorageVersionStorage {
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
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') === '78a0d483d7fe4fc699def1765b9b22deed84e9f003169321f89a7b2c516a4ffe'
  }

  /**
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  async getAsV107(): Promise<v107.Releases> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Balances', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') != null
  }
}

export class BalancesTotalIssuanceStorage {
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
   *  The total units issued in the system.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV107(): Promise<v107.Balance> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class GrandpaCurrentSetIdStorage {
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
   *  The number of changes (both in terms of keys and underlying economic responsibilities)
   *  in the "set" of Grandpa validators from genesis.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'CurrentSetId') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The number of changes (both in terms of keys and underlying economic responsibilities)
   *  in the "set" of Grandpa validators from genesis.
   */
  async getAsV107(): Promise<v107.SetId> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'CurrentSetId')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'CurrentSetId') != null
  }
}

export class GrandpaNextForcedStorage {
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
   *  next block number where we can force a change.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'NextForced') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  next block number where we can force a change.
   */
  async getAsV107(): Promise<v107.BlockNumber | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'NextForced')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'NextForced') != null
  }
}

export class GrandpaPendingChangeStorage {
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
   *  Pending change: (signaled at, scheduled change).
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'PendingChange') === '13755304b861af7343de28e9c0f8c93252785a6950a8ef864736ceb88092a3c7'
  }

  /**
   *  Pending change: (signaled at, scheduled change).
   */
  async getAsV107(): Promise<v107.StoredPendingChange | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'PendingChange')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'PendingChange') != null
  }
}

export class GrandpaSetIdSessionStorage {
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
   *  A mapping from grandpa set ID to the index of the *most recent* session for which its
   *  members were responsible.
   * 
   *  TWOX-NOTE: `SetId` is not under user control.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'SetIdSession') === '2d385d75717e58066ac593e8c94f49e0ce544a47573cd5889073ca2ac7c97de9'
  }

  /**
   *  A mapping from grandpa set ID to the index of the *most recent* session for which its
   *  members were responsible.
   * 
   *  TWOX-NOTE: `SetId` is not under user control.
   */
  async getAsV107(key: v107.SetId): Promise<v107.SessionIndex | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'SetIdSession', key)
  }

  async getManyAsV107(keys: v107.SetId[]): Promise<(v107.SessionIndex | undefined)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'Grandpa', 'SetIdSession', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'SetIdSession') != null
  }
}

export class GrandpaStalledStorage {
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
   *  `true` if we are currently stalled.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'Stalled') === '3b9e892deedcedebca6cccb95fac40be1ea485932811a2dcae3ec80a6b871360'
  }

  /**
   *  `true` if we are currently stalled.
   */
  async getAsV107(): Promise<[v107.BlockNumber, v107.BlockNumber] | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'Stalled')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'Stalled') != null
  }
}

export class GrandpaStateStorage {
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
   *  State of the current authority set.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'State') === 'a793f4266a3a22cf894ef532591752b5cadd1e784285284a201d9d4da95a60fe'
  }

  /**
   *  State of the current authority set.
   */
  async getAsV107(): Promise<v107.StoredState> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'State')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'State') != null
  }
}

export class RandomnessCollectiveFlipRandomMaterialStorage {
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
   *  Series of block headers from the last 81 blocks that acts as random seed material. This
   *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
   *  the oldest hash.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('RandomnessCollectiveFlip', 'RandomMaterial') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  Series of block headers from the last 81 blocks that acts as random seed material. This
   *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
   *  the oldest hash.
   */
  async getAsV107(): Promise<v107.Hash[]> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'RandomnessCollectiveFlip', 'RandomMaterial')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('RandomnessCollectiveFlip', 'RandomMaterial') != null
  }
}

export class SubtensorModuleActivityCutoffStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'ActivityCutoff') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'ActivityCutoff')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'ActivityCutoff') != null
  }
}

export class SubtensorModuleAdjustmentIntervalStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'AdjustmentInterval') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'AdjustmentInterval')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'AdjustmentInterval') != null
  }
}

export class SubtensorModuleBlockAtRegistrationStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlockAtRegistration') === '228bf827d35e95d258d11cd66d3469a9c64a8ee7fbe63ce51106d34980b5a861'
  }

  async getAsV107(key: number): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'BlockAtRegistration', key)
  }

  async getManyAsV107(keys: number[]): Promise<(bigint)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'BlockAtRegistration', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlockAtRegistration') != null
  }
}

export class SubtensorModuleBlocksPerStepStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlocksPerStep') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'BlocksPerStep')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlocksPerStep') != null
  }
}

export class SubtensorModuleBlocksSinceLastStepStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlocksSinceLastStep') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'BlocksSinceLastStep')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'BlocksSinceLastStep') != null
  }
}

export class SubtensorModuleDifficultyStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Difficulty') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Difficulty')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Difficulty') != null
  }
}

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
  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd'
  }

  /**
   *  ---- Maps from hotkey to uid.
   */
  async getAsV107(key: v107.AccountId): Promise<number> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', key)
  }

  async getManyAsV107(keys: v107.AccountId[]): Promise<(number)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Hotkeys', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Hotkeys') != null
  }
}

export class SubtensorModuleImmunityPeriodStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'ImmunityPeriod') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'ImmunityPeriod')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'ImmunityPeriod') != null
  }
}

export class SubtensorModuleKappaStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Kappa') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Kappa')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Kappa') != null
  }
}

export class SubtensorModuleLastDifficultyAdjustmentBlockStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'LastDifficultyAdjustmentBlock') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'LastDifficultyAdjustmentBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'LastDifficultyAdjustmentBlock') != null
  }
}

export class SubtensorModuleLastMechansimStepBlockStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'LastMechansimStepBlock') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'LastMechansimStepBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'LastMechansimStepBlock') != null
  }
}

export class SubtensorModuleMaxAllowedUidsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'MaxAllowedUids') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'MaxAllowedUids')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'MaxAllowedUids') != null
  }
}

export class SubtensorModuleMaxRegistrationsPerBlockStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'MaxRegistrationsPerBlock') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'MaxRegistrationsPerBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'MaxRegistrationsPerBlock') != null
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
  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') === '893f13529c7086c600265efd340b02f4932efb16e4e5333ac6438bb1211f40fc'
  }

  /**
   *  ---- Maps from uid to neuron.
   */
  async getAsV107(key: number): Promise<v107.NeuronMetadataOf> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Neurons', key)
  }

  async getManyAsV107(keys: number[]): Promise<(v107.NeuronMetadataOf)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'Neurons', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Neurons') != null
  }
}

export class SubtensorModuleNeuronsToPruneAtNextEpochStorage {
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
   *  ---- Maps from uid to uid as a set which we use to record uids to prune at next epoch.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'NeuronsToPruneAtNextEpoch') === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
  }

  /**
   *  ---- Maps from uid to uid as a set which we use to record uids to prune at next epoch.
   */
  async getAsV107(key: number): Promise<number> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'NeuronsToPruneAtNextEpoch', key)
  }

  async getManyAsV107(keys: number[]): Promise<(number)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'SubtensorModule', 'NeuronsToPruneAtNextEpoch', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'NeuronsToPruneAtNextEpoch') != null
  }
}

export class SubtensorModuleRegistrationsThisBlockStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'RegistrationsThisBlock') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'RegistrationsThisBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'RegistrationsThisBlock') != null
  }
}

export class SubtensorModuleRegistrationsThisIntervalStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'RegistrationsThisInterval') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'RegistrationsThisInterval')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'RegistrationsThisInterval') != null
  }
}

export class SubtensorModuleRhoStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Rho') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'Rho')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'Rho') != null
  }
}

export class SubtensorModuleTargetRegistrationsPerIntervalStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TargetRegistrationsPerInterval') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'TargetRegistrationsPerInterval')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TargetRegistrationsPerInterval') != null
  }
}

export class SubtensorModuleTotalBondsPurchasedStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalBondsPurchased') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'TotalBondsPurchased')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalBondsPurchased') != null
  }
}

export class SubtensorModuleTotalEmissionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalEmission') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'TotalEmission')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalEmission') != null
  }
}

export class SubtensorModuleTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalIssuance') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalIssuance') != null
  }
}

export class SubtensorModuleTotalStakeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalStake') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV107(): Promise<bigint> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'SubtensorModule', 'TotalStake')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('SubtensorModule', 'TotalStake') != null
  }
}

export class SudoKeyStorage {
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
   *  The `AccountId` of the sudo key.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  async getAsV107(): Promise<v107.AccountId> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Sudo', 'Key')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') != null
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
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '6890c1aff9ee8613f29f28c61a4338c5967aa55e87574dc736c9de25fae1f270'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV107(key: v107.AccountId): Promise<v107.AccountInfo> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV107(keys: v107.AccountId[]): Promise<(v107.AccountInfo)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}

export class SystemAllExtrinsicsLenStorage {
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
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  async getAsV107(): Promise<number | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'AllExtrinsicsLen')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') != null
  }
}

export class SystemBlockHashStorage {
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
   *  Map of block numbers to block hashes.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
  }

  /**
   *  Map of block numbers to block hashes.
   */
  async getAsV107(key: v107.BlockNumber): Promise<v107.Hash> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockHash', key)
  }

  async getManyAsV107(keys: v107.BlockNumber[]): Promise<(v107.Hash)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') != null
  }
}

export class SystemBlockWeightStorage {
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
   *  The current weight for the block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
  }

  /**
   *  The current weight for the block.
   */
  async getAsV107(): Promise<v107.ConsumedWeight> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockWeight')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') != null
  }
}

export class SystemDigestStorage {
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
   *  Digest of the current block, also part of the block header.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'Digest') === '1ddf323439264601ddc32cb21cada8436fbec4e5389a9ff6d45f95e6e3c4b579'
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  async getAsV107(): Promise<v107.DigestOf> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'Digest')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Digest') != null
  }
}

export class SystemEventCountStorage {
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
   *  The number of events in the `Events<T>` list.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  async getAsV107(): Promise<v107.EventIndex> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'EventCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') != null
  }
}

export class SystemEventTopicsStorage {
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
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
  }

  /**
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  async getAsV107(key: v107.Hash): Promise<[v107.BlockNumber, v107.EventIndex][]> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'EventTopics', key)
  }

  async getManyAsV107(keys: v107.Hash[]): Promise<([v107.BlockNumber, v107.EventIndex][])[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') != null
  }
}

export class SystemEventsStorage {
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
   *  Events deposited for the current block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'Events') === '937ff7d82d576e99008f7f0728a6015f79d396720d35514ef83953ee2ce62b46'
  }

  /**
   *  Events deposited for the current block.
   */
  async getAsV107(): Promise<v107.EventRecord[]> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'Events')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Events') != null
  }
}

export class SystemExecutionPhaseStorage {
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
   *  The execution phase of the block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') === 'd79e80744c6939b13f7b8c45d8ea2656fb288e2987e1e58a3c0c8e3c80bc2040'
  }

  /**
   *  The execution phase of the block.
   */
  async getAsV107(): Promise<v107.Phase | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'ExecutionPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') != null
  }
}

export class SystemExtrinsicCountStorage {
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
   *  Total extrinsics count for the current block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total extrinsics count for the current block.
   */
  async getAsV107(): Promise<number | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') != null
  }
}

export class SystemExtrinsicDataStorage {
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
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  async getAsV107(key: number): Promise<Uint8Array> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicData', key)
  }

  async getManyAsV107(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV107)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') != null
  }
}

export class SystemLastRuntimeUpgradeStorage {
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
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  async getAsV107(): Promise<v107.LastRuntimeUpgradeInfo | undefined> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'LastRuntimeUpgrade')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') != null
  }
}

export class SystemNumberStorage {
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
   *  The current block number being processed. Set by `execute_block`.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'Number') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  async getAsV107(): Promise<v107.BlockNumber> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'Number')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Number') != null
  }
}

export class SystemParentHashStorage {
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
   *  Hash of the previous block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  Hash of the previous block.
   */
  async getAsV107(): Promise<v107.Hash> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'ParentHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') != null
  }
}

export class SystemUpgradedToTripleRefCountStorage {
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
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  async getAsV107(): Promise<boolean> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToTripleRefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') != null
  }
}

export class SystemUpgradedToU32RefCountStorage {
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
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  async getAsV107(): Promise<boolean> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToU32RefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') != null
  }
}

export class TimestampDidUpdateStorage {
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
   *  Did the timestamp get updated in this block?
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  async getAsV107(): Promise<boolean> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'DidUpdate')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') != null
  }
}

export class TimestampNowStorage {
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
   *  Current time for the current block.
   */
  get isV107() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current time for the current block.
   */
  async getAsV107(): Promise<v107.Moment> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'Now')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') != null
  }
}

export class TransactionPaymentNextFeeMultiplierStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') === '8840628264db1877ef5c3718a00459d4b519de0922f813836237f71320a25aa6'
  }

  async getAsV107(): Promise<v107.Multiplier> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'NextFeeMultiplier')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') != null
  }
}

export class TransactionPaymentStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV107() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') === '78a0d483d7fe4fc699def1765b9b22deed84e9f003169321f89a7b2c516a4ffe'
  }

  async getAsV107(): Promise<v107.Releases> {
    assert(this.isV107)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') != null
  }
}
