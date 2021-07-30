import BaseModel from './BaseModel'

export default class Unidad extends BaseModel {
  constructor(data) {
    super(data)

    this.descripcion = this.getAttribute('descripcion')
    this.pasajeros = this.getAttribute('pasajeros')
    this.numeroEconomico = this.getAttribute('numeroEconomico')
    this.tipo = this.getAttribute('tipo')
    this.fotografia = this.getAttribute('fotografia')
    this.gps = this.getAttribute('gps')
    this.modelo = this.getAttribute('modelo')
    this.activa = this.getAttribute('activa')
    this.locatorWialon = this.getAttribute('locatorWialon')
    this.itemIdWialon = this.getAttribute('itemIdWialon')
    this.iconoUnidad = this.getAttribute('iconoUnidad')
  }
}
