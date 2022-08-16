import type {Result} from './support'

export type AccountId = Uint8Array

export type Balance = bigint

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

export type Index = number

export type RefCount = number

export interface AccountData {
  free: Balance
  reserved: Balance
  miscFrozen: Balance
  feeFrozen: Balance
}
