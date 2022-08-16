import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
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

  @Column_("int4", {nullable: false})
  uid!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  stake!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  rank!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  incentive!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  trust!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  consensus!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  dividends!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  emission!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  ip!: bigint

  @Column_("int4", {nullable: false})
  port!: number

  @Column_("int4", {nullable: false})
  version!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastUpdated!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
