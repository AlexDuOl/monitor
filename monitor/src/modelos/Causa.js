import BaseModel from './BaseModel'

export default class Causa extends BaseModel {
  constructor(data) {
    super(data)

    this.descripcion = this.getAttribute('descripcion')
  }
}
