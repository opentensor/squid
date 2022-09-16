import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Coldkey} from "./coldkey.model"

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
  @ManyToOne_(() => Coldkey, {nullable: true})
  from!: Coldkey

  @Index_()
  @ManyToOne_(() => Coldkey, {nullable: true})
  to!: Coldkey

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("text", {nullable: false})
  blockHash!: string
}
