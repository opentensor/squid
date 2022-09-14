import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Hotkey} from "./hotkey.model"
import {Transfer} from "./transfer.model"

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

  @OneToMany_(() => Hotkey, e => e.account)
  hotkeys!: Hotkey[]

  @OneToMany_(() => Transfer, e => e.from)
  transfersFrom!: Transfer[]

  @OneToMany_(() => Transfer, e => e.to)
  transfersTo!: Transfer[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint
}
