import type {Result} from './support'

export type AccountId = Uint8Array

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
