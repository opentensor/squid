import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class Transfer {
  constructor(props?: Partial<Transfer>) {
    Object.assign(this, props)
  }

  /**
   * Transfer ID
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  from!: Account

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  to!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
