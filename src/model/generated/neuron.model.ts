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

  @Column_("int4", {nullable: false})
  stake!: number

  @Column_("int4", {nullable: false})
  rank!: number

  @Column_("int4", {nullable: false})
  incentive!: number

  @Column_("int4", {nullable: false})
  trust!: number

  @Column_("int4", {nullable: false})
  consensus!: number

  @Column_("int4", {nullable: false})
  dividends!: number

  @Column_("int4", {nullable: false})
  emission!: number

  @Column_("int4", {nullable: false})
  ip!: number

  @Column_("int4", {nullable: false})
  port!: number

  @Column_("int4", {nullable: false})
  version!: number

  @Column_("int4", {nullable: false})
  lastUpdated!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
