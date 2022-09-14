import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToOne as OneToOne_} from "typeorm"
import {Account} from "./account.model"
import {Neuron} from "./neuron.model"

@Entity_()
export class Hotkey {
  constructor(props?: Partial<Hotkey>) {
    Object.assign(this, props)
  }

  /**
   * Hotkey address
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account

  @OneToOne_(() => Neuron)
  neuron!: Neuron | undefined | null
}
