import { randomUUID } from "node:crypto"

export class Student {
  public id: string
  public name: string

  constructor(nome: string, id?: string) {
    this.name = nome
    this.id = id ?? randomUUID()
  }
}