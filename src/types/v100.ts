import type {Result} from './support'

export type AccountId32 = Uint8Array

export interface NeuronMetadata {
  version: number
  ip: bigint
  port: number
  ipType: number
  uid: number
  modality: number
  hotkey: AccountId32
  coldkey: AccountId32
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
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData
}

export interface AccountData {
  free: bigint
  reserved: bigint
  miscFrozen: bigint
  feeFrozen: bigint
}
