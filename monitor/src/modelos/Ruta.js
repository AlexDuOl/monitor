import BaseModel from './BaseModel'

export default class Ruta extends BaseModel {

  constructor(data) {
    super(data)

    this.nombre = this.getAttribute('nombre')
    this.kilometros = this.getAttribute('kilometros')
    this.idOperador = this.getAttribute('idOperador')
    this.tiempoEstimado = this.getAttribute('tiempoEstimado')
    this.tipoServicio = this.getAttribute('tipoServicio')
    this.horarioSalidas = this.getAttribute('horarioSalidas')
    this.activa = this.getAttribute('activa')
    this.idMapa = this.getAttribute('idMapa')
    this.idCliente = this.getAttribute('idCliente')
  }
}
