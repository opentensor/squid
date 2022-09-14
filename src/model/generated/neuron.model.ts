import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

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

  @Column_("text", {nullable: false})
  coldkeyAddress!: string

  @Column_("text", {nullable: false})
  hotkeyAddress!: string

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

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
