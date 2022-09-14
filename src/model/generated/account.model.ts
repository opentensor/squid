import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Hotkey} from "./hotkey.model"

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
  coldkeyAddress!: string

  @OneToMany_(() => Hotkey, e => e.account)
  hotkeys!: Hotkey[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("int4", {nullable: false})
  blockNum!: number

  @Column_("text", {nullable: false})
  blockHash!: string
}
