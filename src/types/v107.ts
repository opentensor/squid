import type {Result} from './support'

export type AccountId = Uint8Array

export type Balance = bigint

export interface AccountData {
  free: Balance
  reserved: Balance
  miscFrozen: Balance
  feeFrozen: Balance
}

export interface BalanceLock {
  id: LockIdentifier
  amount: Balance
  reasons: Reasons
}

export interface ReserveData {
  id: ReserveIdentifier
  amount: Balance
}

export type Releases = Releases_V1 | Releases_V2 | Releases_V3 | Releases_V4 | Releases_V5 | Releases_V6 | Releases_V7 | Releases_V8 | Releases_V9 | Releases_V10

export interface Releases_V1 {
  __kind: 'V1'
}

export interface Releases_V2 {
  __kind: 'V2'
}

export interface Releases_V3 {
  __kind: 'V3'
}

export interface Releases_V4 {
  __kind: 'V4'
}

export interface Releases_V5 {
  __kind: 'V5'
}

export interface Releases_V6 {
  __kind: 'V6'
}

export interface Releases_V7 {
  __kind: 'V7'
}

export interface Releases_V8 {
  __kind: 'V8'
}

export interface Releases_V9 {
  __kind: 'V9'
}

export interface Releases_V10 {
  __kind: 'V10'
}

export type SetId = bigint

export type BlockNumber = number

export interface StoredPendingChange {
  scheduledAt: BlockNumber
  delay: BlockNumber
  nextAuthorities: AuthorityList
}

export type SessionIndex = number

export type StoredState = StoredState_Live | StoredState_PendingPause | StoredState_Paused | StoredState_PendingResume

export interface StoredState_Live {
  __kind: 'Live'
  value: null
}

export interface StoredState_PendingPause {
  __kind: 'PendingPause'
  value: PendingPause
}

export interface StoredState_Paused {
  __kind: 'Paused'
  value: null
}

export interface StoredState_PendingResume {
  __kind: 'PendingResume'
  value: PendingResume
}

export type Hash = Uint8Array

export interface NeuronMetadataOf {
  version: number
  ip: bigint
  port: number
  ipType: number
  uid: number
  modality: number
  hotkey: AccountId
  coldkey: AccountId
  active: number
  lastUpdate: bigint
  priority: bigint
  stake: bigint
  rank: bigint
  trust: bigint
  consensus: bigint
  incentive: bigint
  dividends: bigint
  emission: bigint
  bonds: [number, bigint][]
  weights: [number, number][]
}

export interface AccountInfo {
  nonce: Index
  consumers: RefCount
  providers: RefCount
  sufficients: RefCount
  data: AccountData
}

export interface ConsumedWeight {
  normal: Weight
  operational: Weight
  mandatory: Weight
}

export interface DigestOf {
  logs: DigestItem[]
}

export type EventIndex = number

export interface EventRecord {
  phase: Phase
  event: Type_113
  topics: Hash[]
}

export type Phase = Phase_ApplyExtrinsic | Phase_Finalization | Phase_Initialization

export interface Phase_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  value: number
}

export interface Phase_Finalization {
  __kind: 'Finalization'
  value: null
}

export interface Phase_Initialization {
  __kind: 'Initialization'
  value: null
}

export interface LastRuntimeUpgradeInfo {
  specVersion: number
  specName: string
}

export type Moment = bigint

export type Multiplier = bigint

export type LockIdentifier = Uint8Array

export type Reasons = Reasons_Fee | Reasons_Misc | Reasons_All

export interface Reasons_Fee {
  __kind: 'Fee'
}

export interface Reasons_Misc {
  __kind: 'Misc'
}

export interface Reasons_All {
  __kind: 'All'
}

export type ReserveIdentifier = Uint8Array

export type AuthorityId = Uint8Array

export type AuthorityWeight = bigint

export type NextAuthority = [AuthorityId, AuthorityWeight]

export type AuthorityList = NextAuthority[]

export interface PendingPause {
  scheduledAt: BlockNumber
  delay: BlockNumber
}

export interface PendingResume {
  scheduledAt: BlockNumber
  delay: BlockNumber
}

export type Index = number

export type RefCount = number

export type Weight = bigint

export type DigestItem = DigestItem_Other | DigestItem_AuthoritiesChange | DigestItem_ChangesTrieRoot | DigestItem_SealV0 | DigestItem_Consensus | DigestItem_Seal | DigestItem_PreRuntime | DigestItem_ChangesTrieSignal | DigestItem_RuntimeEnvironmentUpdated

export interface DigestItem_Other {
  __kind: 'Other'
  value: Uint8Array
}

export interface DigestItem_AuthoritiesChange {
  __kind: 'AuthoritiesChange'
  value: AuthorityId[]
}

export interface DigestItem_ChangesTrieRoot {
  __kind: 'ChangesTrieRoot'
  value: Hash
}

export interface DigestItem_SealV0 {
  __kind: 'SealV0'
  value: SealV0
}

export interface DigestItem_Consensus {
  __kind: 'Consensus'
  value: Consensus
}

export interface DigestItem_Seal {
  __kind: 'Seal'
  value: Seal
}

export interface DigestItem_PreRuntime {
  __kind: 'PreRuntime'
  value: PreRuntime
}

export interface DigestItem_ChangesTrieSignal {
  __kind: 'ChangesTrieSignal'
  value: ChangesTrieSignal
}

export interface DigestItem_RuntimeEnvironmentUpdated {
  __kind: 'RuntimeEnvironmentUpdated'
  value: null
}

export type Type_113 = Type_113_System | Type_113_Grandpa | Type_113_Balances | Type_113_Sudo | Type_113_SubtensorModule

export interface Type_113_System {
  __kind: 'System'
  value: SystemEvent
}

export interface Type_113_Grandpa {
  __kind: 'Grandpa'
  value: GrandpaEvent
}

export interface Type_113_Balances {
  __kind: 'Balances'
  value: BalancesEvent
}

export interface Type_113_Sudo {
  __kind: 'Sudo'
  value: SudoEvent
}

export interface Type_113_SubtensorModule {
  __kind: 'SubtensorModule'
  value: SubtensorModuleEvent
}

export type Signature = Uint8Array

export type SealV0 = [bigint, Signature]

export type ConsensusEngineId = Uint8Array

export type Consensus = [ConsensusEngineId, Uint8Array]

export type Seal = [ConsensusEngineId, Uint8Array]

export type PreRuntime = [ConsensusEngineId, Uint8Array]

export type ChangesTrieSignal = ChangesTrieSignal_NewConfiguration

export interface ChangesTrieSignal_NewConfiguration {
  __kind: 'NewConfiguration'
  value: (ChangesTrieConfiguration | undefined)
}

export type SystemEvent = SystemEvent_ExtrinsicSuccess | SystemEvent_ExtrinsicFailed | SystemEvent_CodeUpdated | SystemEvent_NewAccount | SystemEvent_KilledAccount | SystemEvent_Remarked

/**
 *  An extrinsic completed successfully. \[info\]
 */
export interface SystemEvent_ExtrinsicSuccess {
  __kind: 'ExtrinsicSuccess'
  value: DispatchInfo
}

/**
 *  An extrinsic failed. \[error, info\]
 */
export interface SystemEvent_ExtrinsicFailed {
  __kind: 'ExtrinsicFailed'
  value: [DispatchError, DispatchInfo]
}

/**
 *  `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
  __kind: 'CodeUpdated'
}

/**
 *  A new \[account\] was created.
 */
export interface SystemEvent_NewAccount {
  __kind: 'NewAccount'
  value: AccountId
}

/**
 *  An \[account\] was reaped.
 */
export interface SystemEvent_KilledAccount {
  __kind: 'KilledAccount'
  value: AccountId
}

/**
 *  On on-chain remark happened. \[origin, remark_hash\]
 */
export interface SystemEvent_Remarked {
  __kind: 'Remarked'
  value: [AccountId, Hash]
}

export type GrandpaEvent = GrandpaEvent_NewAuthorities | GrandpaEvent_Paused | GrandpaEvent_Resumed

/**
 *  New authority set has been applied. \[authority_set\]
 */
export interface GrandpaEvent_NewAuthorities {
  __kind: 'NewAuthorities'
  value: AuthorityList
}

/**
 *  Current authority set has been paused.
 */
export interface GrandpaEvent_Paused {
  __kind: 'Paused'
}

/**
 *  Current authority set has been resumed.
 */
export interface GrandpaEvent_Resumed {
  __kind: 'Resumed'
}

export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Deposit | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated

/**
 *  An account was created with some free balance. \[account, free_balance\]
 */
export interface BalancesEvent_Endowed {
  __kind: 'Endowed'
  value: [AccountId, Balance]
}

/**
 *  An account was removed whose balance was non-zero but below ExistentialDeposit,
 *  resulting in an outright loss. \[account, balance\]
 */
export interface BalancesEvent_DustLost {
  __kind: 'DustLost'
  value: [AccountId, Balance]
}

/**
 *  Transfer succeeded. \[from, to, value\]
 */
export interface BalancesEvent_Transfer {
  __kind: 'Transfer'
  value: [AccountId, AccountId, Balance]
}

/**
 *  A balance was set by root. \[who, free, reserved\]
 */
export interface BalancesEvent_BalanceSet {
  __kind: 'BalanceSet'
  value: [AccountId, Balance, Balance]
}

/**
 *  Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
 */
export interface BalancesEvent_Deposit {
  __kind: 'Deposit'
  value: [AccountId, Balance]
}

/**
 *  Some balance was reserved (moved from free to reserved). \[who, value\]
 */
export interface BalancesEvent_Reserved {
  __kind: 'Reserved'
  value: [AccountId, Balance]
}

/**
 *  Some balance was unreserved (moved from reserved to free). \[who, value\]
 */
export interface BalancesEvent_Unreserved {
  __kind: 'Unreserved'
  value: [AccountId, Balance]
}

/**
 *  Some balance was moved from the reserve of the first account to the second account.
 *  Final argument indicates the destination balance type.
 *  \[from, to, balance, destination_status\]
 */
export interface BalancesEvent_ReserveRepatriated {
  __kind: 'ReserveRepatriated'
  value: [AccountId, AccountId, Balance, BalanceStatus]
}

export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_SudoAsDone

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_Sudid {
  __kind: 'Sudid'
  value: DispatchResult
}

/**
 *  The \[sudoer\] just switched identity; the old key is supplied.
 */
export interface SudoEvent_KeyChanged {
  __kind: 'KeyChanged'
  value: AccountId
}

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_SudoAsDone {
  __kind: 'SudoAsDone'
  value: DispatchResult
}

export type SubtensorModuleEvent = SubtensorModuleEvent_WeightsSet | SubtensorModuleEvent_NeuronRegistered | SubtensorModuleEvent_AxonServed | SubtensorModuleEvent_StakeAdded | SubtensorModuleEvent_StakeRemoved | SubtensorModuleEvent_DifficultySet | SubtensorModuleEvent_BlocksPerStepSet | SubtensorModuleEvent_AdjustmentIntervalSet | SubtensorModuleEvent_ActivityCuttoffSet | SubtensorModuleEvent_TargetRegistrationsPerIntervalSet | SubtensorModuleEvent_RhoSet | SubtensorModuleEvent_KappaSet | SubtensorModuleEvent_MaxAllowedUidsSet | SubtensorModuleEvent_ImmunityPeriodSet

/**
 *  ---- Event created when a caller successfully set's their weights
 *  on the chain.
 */
export interface SubtensorModuleEvent_WeightsSet {
  __kind: 'WeightsSet'
  value: AccountId
}

/**
 *  --- Event created when a new neuron account has been registered to 
 *  the chain.
 */
export interface SubtensorModuleEvent_NeuronRegistered {
  __kind: 'NeuronRegistered'
  value: number
}

/**
 *  --- Event created when the axon server information is added to the network.
 */
export interface SubtensorModuleEvent_AxonServed {
  __kind: 'AxonServed'
  value: number
}

/**
 *  --- Event created during when stake has been transfered from 
 *  the coldkey onto the hotkey staking account.
 */
export interface SubtensorModuleEvent_StakeAdded {
  __kind: 'StakeAdded'
  value: [AccountId, bigint]
}

/**
 *  --- Event created when stake has been removed from 
 *  the staking account into the coldkey account.
 */
export interface SubtensorModuleEvent_StakeRemoved {
  __kind: 'StakeRemoved'
  value: [AccountId, bigint]
}

/**
 *  --- Event created when the difficulty has been set.
 */
export interface SubtensorModuleEvent_DifficultySet {
  __kind: 'DifficultySet'
  value: bigint
}

/**
 *  --- Event created when default blocks per step has been set.
 */
export interface SubtensorModuleEvent_BlocksPerStepSet {
  __kind: 'BlocksPerStepSet'
  value: bigint
}

/**
 *  --- Event created when the difficulty adjustment interval has been set.
 */
export interface SubtensorModuleEvent_AdjustmentIntervalSet {
  __kind: 'AdjustmentIntervalSet'
  value: bigint
}

/**
 *  --- Event created when the activity cuttoff has been set.
 */
export interface SubtensorModuleEvent_ActivityCuttoffSet {
  __kind: 'ActivityCuttoffSet'
  value: bigint
}

/**
 *  --- Event created when the target registrations per interval has been set.
 */
export interface SubtensorModuleEvent_TargetRegistrationsPerIntervalSet {
  __kind: 'TargetRegistrationsPerIntervalSet'
  value: bigint
}

/**
 *  --- Event created when mechanism rho has been set.
 */
export interface SubtensorModuleEvent_RhoSet {
  __kind: 'RhoSet'
  value: bigint
}

/**
 *  --- Event created when mechanism kappa has been set.
 */
export interface SubtensorModuleEvent_KappaSet {
  __kind: 'KappaSet'
  value: bigint
}

/**
 *  --- Event created when max allowed uids has been set.
 */
export interface SubtensorModuleEvent_MaxAllowedUidsSet {
  __kind: 'MaxAllowedUidsSet'
  value: bigint
}

/**
 *  --- Event created when the immunity period has been set.
 */
export interface SubtensorModuleEvent_ImmunityPeriodSet {
  __kind: 'ImmunityPeriodSet'
  value: bigint
}

export interface ChangesTrieConfiguration {
  digestInterval: number
  digestLevels: number
}

export interface DispatchInfo {
  weight: Weight
  class: DispatchClass
  paysFee: Pays
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_Token | DispatchError_Arithmetic

export interface DispatchError_Other {
  __kind: 'Other'
  value: null
}

export interface DispatchError_CannotLookup {
  __kind: 'CannotLookup'
  value: null
}

export interface DispatchError_BadOrigin {
  __kind: 'BadOrigin'
  value: null
}

export interface DispatchError_Module {
  __kind: 'Module'
  value: DispatchErrorModule
}

export interface DispatchError_ConsumerRemaining {
  __kind: 'ConsumerRemaining'
  value: null
}

export interface DispatchError_NoProviders {
  __kind: 'NoProviders'
  value: null
}

export interface DispatchError_Token {
  __kind: 'Token'
  value: TokenError
}

export interface DispatchError_Arithmetic {
  __kind: 'Arithmetic'
  value: ArithmeticError
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export type DispatchResult = Result<null, DispatchError>

export type DispatchClass = DispatchClass_Normal | DispatchClass_Operational | DispatchClass_Mandatory

export interface DispatchClass_Normal {
  __kind: 'Normal'
}

export interface DispatchClass_Operational {
  __kind: 'Operational'
}

export interface DispatchClass_Mandatory {
  __kind: 'Mandatory'
}

export type Pays = Pays_Yes | Pays_No

export interface Pays_Yes {
  __kind: 'Yes'
}

export interface Pays_No {
  __kind: 'No'
}

export interface DispatchErrorModule {
  index: number
  error: number
}

export type TokenError = TokenError_NoFunds | TokenError_WouldDie | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Underflow | TokenError_Overflow

export interface TokenError_NoFunds {
  __kind: 'NoFunds'
}

export interface TokenError_WouldDie {
  __kind: 'WouldDie'
}

export interface TokenError_BelowMinimum {
  __kind: 'BelowMinimum'
}

export interface TokenError_CannotCreate {
  __kind: 'CannotCreate'
}

export interface TokenError_UnknownAsset {
  __kind: 'UnknownAsset'
}

export interface TokenError_Frozen {
  __kind: 'Frozen'
}

export interface TokenError_Underflow {
  __kind: 'Underflow'
}

export interface TokenError_Overflow {
  __kind: 'Overflow'
}

export type ArithmeticError = ArithmeticError_Underflow | ArithmeticError_Overflow | ArithmeticError_DivisionByZero

export interface ArithmeticError_Underflow {
  __kind: 'Underflow'
}

export interface ArithmeticError_Overflow {
  __kind: 'Overflow'
}

export interface ArithmeticError_DivisionByZero {
  __kind: 'DivisionByZero'
}
