import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

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

  @Column_("int4", {nullable: false})
  uid!: number

  @Column_("int4", {nullable: false})
  blockNum!: number
}
