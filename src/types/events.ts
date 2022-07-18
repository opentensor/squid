import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v107 from './v107'

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
}
