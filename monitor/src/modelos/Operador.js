import BaseModel from './BaseModel'

export default class Operador extends BaseModel {
  constructor(data) {
    super(data)

    this.nombre = this.getAttribute('nombre')
    this.email = this.getAttribute('email')
    this.numeroTelefono = this.getAttribute('numeroTelefono')
    this.fotografia = this.getAttribute('fotografia')
    this.esSubcontratado = this.getAttribute('esSubcontratado')
    this.idUnidad = this.getAttribute('idUnidad')
    this.activo = this.getAttribute('activo')
    this.fechaActualizacionUnidad = this.getAttribute('fechaActualizacionUnidad')
    this.idProveedor = this.getAttribute('idProveedor')
  }
}
