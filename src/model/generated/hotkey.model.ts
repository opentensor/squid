import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
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

  @Column_("text", {nullable: false})
  hotkeyAddress!: string

  @OneToMany_(() => Neuron, e => e.hotkey)
  neuron!: Neuron[]

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("text", {nullable: false})
  blockHash!: string
}
