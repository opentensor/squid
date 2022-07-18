import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

@Entity_()
export class Neuron {
  constructor(props?: Partial<Neuron>) {
    Object.assign(this, props)
  }

  /**
   * Neuron address
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  account!: Account

  @Index_({unique: true})
  @Column_("int4", {nullable: true})
  uid!: number | undefined | null

  @Column_("numeric", {nullable: false})
  stake!: number

  @Column_("numeric", {nullable: false})
  rank!: number

  @Column_("numeric", {nullable: false})
  incentive!: number

  @Column_("numeric", {nullable: false})
  trust!: number

  @Column_("numeric", {nullable: false})
  consensus!: number

  @Column_("numeric", {nullable: false})
  dividends!: number

  @Column_("int4", {nullable: false})
  lastUpdated!: number

  @Column_("text", {nullable: true})
  extrinsicId!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("int4", {nullable: false})
  blockNum!: number
}
