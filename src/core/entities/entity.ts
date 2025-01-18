import { randomUUID } from "node:crypto"
import { UniqueEntityID } from "./unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityID
  public props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID){
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }
}