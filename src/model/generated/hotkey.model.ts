import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

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

  @Column_("int4", {nullable: false})
  blockNum!: number
}
