import BaseModel from './BaseModel'

export default class Efecto extends BaseModel {
  constructor(data) {
    super(data)

    this.descripcion = this.getAttribute('descripcion')
  }
}
