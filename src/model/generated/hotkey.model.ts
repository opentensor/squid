import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Neuron} from "./neuron.model"

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
  @ManyToOne_(() => Neuron, {nullable: true})
  neuron!: Neuron | undefined | null

  @Column_("int4", {nullable: false})
  blockNum!: number
}
