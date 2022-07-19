import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Neuron} from "./neuron.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  coldkey!: string

  @Column_("text", {nullable: false})
  hotkey!: string

  @OneToMany_(() => Neuron, e => e.account)
  neuron!: Neuron[]

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("text", {nullable: false})
  blockHash!: string
}
