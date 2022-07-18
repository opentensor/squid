import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

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
