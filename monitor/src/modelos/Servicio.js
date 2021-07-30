import BaseModel from './BaseModel'
import Ruta from './Ruta'
import Estructura from './Estructura'
import Operador from './Operador'
import Unidad from './Unidad'

export default class Servicio extends BaseModel {
  ruta = null
  estructura = null
  operador = null
  unidad = null

  constructor(data) {
    super(data)

    this.folioBitacora = this.getAttribute('folioBitacora')
    this.numeroPersonas = this.getAttribute('numeroPersonas')
    this.estatus = this.getAttribute('estatus')
    this.confirmado = this.getAttribute('confirmado')
    this.modalidad = this.getAttribute('modalidad')
    this.fecha = this.getAttribute('fecha')
    this.tiempoInicial = this.getAttribute('tiempoInicial')
    this.tiempoFinal = this.getAttribute('tiempoFinal')
    this.semana = this.getAttribute('semana')
    this.dia = this.getAttribute('dia')
    this.idOperador = this.getAttribute('idOperador')
    this.idUnidad = this.getAttribute('idUnidad')
    this.idEstructura = this.getAttribute('idEstructura')
    this.kilometrajeInicial = this.getAttribute('kilometrajeInicial')
    this.kilometrajeFinal = this.getAttribute('kilometrajeFinal')
    this.verificado = this.getAttribute('verificado')
    this.pagarServicio = this.getAttribute('pagarServicio')
    this.modalidad = this.getAttribute('modalidad')
  }

  getDetalle () {
    return `${this.getRuta() ? this.getRuta().nombre : 'Sin definir'} - 
            ${this.getEstructura().tipo} - ${this.getEstructura().turno} (${this.getHorario()})`
  }

  getHorario () {
    if (this.modalidad === 'Especial') {
      return `${this.tiempoInicial.substr(11, 5)} - ${this.tiempoFinal.substr(11, 5)}`
    }

    return `${this.getEstructura().horaInicio.substr(11, 5)} - ${this.getEstructura().horaFin.substr(11, 5)}`
  }

  getNombreOperador() {
    if(this.getRelationData('operador')) {
      return this.getOperador().nombre
    } else {
      return this.getProveedor().nombre
    }
  }

  /**
   * @returns {Ruta}
   */
  getRuta () {
    if (this.getRelationData('ruta') && !this.ruta) {
      this.ruta = new Ruta(this.getRelationData('ruta'))
    }

    return this.ruta
  }

  /**
   * @returns {Estructura}
   */
  getEstructura () {
    if (this.getRelationData('estructura') && !this.estructura) {
      this.estructura = new Estructura(this.getRelationData('estructura'))
    }

    return this.estructura
  }

  /**
   * @returns {Operador}
   */
  getOperador () {
    if (this.getRelationData('operador') && !this.operador) {
      this.operador = new Operador(this.getRelationData('operador'))
    }

    return this.operador
  }

  getProveedor() {
    if (this.getRelationData('proveedor') && !this.proveedor) {
      this.proveedor = new Operador(this.getRelationData('proveedor'))
    }

    return this.proveedor
  }

  /**
   * @returns {Unidad}
   */
  getUnidad () {
    if (this.getRelationData('unidad') && !this.unidad) {
      this.unidad = new Unidad(this.getRelationData('unidad'))
    }

    return this.unidad
  }
}
