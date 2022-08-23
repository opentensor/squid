import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

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
  get asV107(): [Uint8Array, Uint8Array, bigint] {
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
  get asV100(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
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

export class SubtensorModuleWeightsSetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SubtensorModule.WeightsSet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  ---- Event created when a caller successfully set's their weights
   *  on the chain.
   */
  get isV107(): boolean {
    return this._chain.getEventHash('SubtensorModule.WeightsSet') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  ---- Event created when a caller successfully set's their weights
   *  on the chain.
   */
  get asV107(): Uint8Array {
    assert(this.isV107)
    return this._chain.decodeEvent(this.event)
  }
}
