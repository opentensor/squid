import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v107 from './v107'
import * as v100 from './v100'

export class BalancesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV107(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '01bd9c526b0f715f947efaae82673221462be99f3a3f192f5f47bd9956dfec38'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV107(): [v107.AccountId, v107.AccountId, v107.Balance] {
    assert(this.isV107)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV100(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV100(): {from: v100.AccountId32, to: v100.AccountId32, amount: bigint} {
    assert(this.isV100)
    return this._chain.decodeEvent(this.event)
  }
}

export class SubtensorModuleNeuronRegisteredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SubtensorModule.NeuronRegistered')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  --- Event created when a new neuron account has been registered to 
   *  the chain.
   */
  get isV107(): boolean {
    return this._chain.getEventHash('SubtensorModule.NeuronRegistered') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  --- Event created when a new neuron account has been registered to 
   *  the chain.
   */
  get asV107(): number {
    assert(this.isV107)
    return this._chain.decodeEvent(this.event)
  }
}
