import BaseModel from './BaseModel'

class BitacoraLlamada extends BaseModel {
  constructor(data) {
    super(data)

    this.tipo = this.getAttribute('tipo')
    this.estatus = this.getAttribute('estatus')
    this.tiempo = this.getAttribute('tiempo')
  }
}

export default BitacoraLlamada
