import { randomUUID } from "node:crypto"

export class Entity<Props> {
  private _id: string
  public props: Props

  get id() {
    return this._id
  }

  constructor(props: Props, id?: string){
    this.props = props
    this._id = id ?? randomUUID()
  }
}