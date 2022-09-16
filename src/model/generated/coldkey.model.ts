import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Transfer} from "./transfer.model"

@Entity_()
export class Coldkey {
  constructor(props?: Partial<Coldkey>) {
    Object.assign(this, props)
  }

  /**
   * Coldkey address
   */
  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Transfer, e => e.from)
  transferFrom!: Transfer[]

  @OneToMany_(() => Transfer, e => e.to)
  transferTo!: Transfer[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("int4", {nullable: false})
  blockNum!: number
}
