import BaseModel from './BaseModel'
import Unidad from './Unidad'
import Operador from './Operador'
import Proveedor from './Proveedor'

/**
 * TODO: Remove getUnidad, getOperador, getGasolinera
 */

class Ticket extends BaseModel {
  constructor(data) {
    super(data)

    this.fecha = this.getAttribute('fecha')
    this.verificado = this.getAttribute('verificado')
    this.viaCaptura = this.getAttribute('viaCaptura')
    this.kilometraje = this.getAttribute('kilometraje')
    this.tipoCombustible = this.getAttribute('tipoCombustible')
    this.folio = this.getAttribute('folio')
    this.monto = this.getAttribute('monto')
    this.litros = this.getAttribute('litros')
    this.precioCombustible = this.getAttribute('precioCombustible')
    this.idUnidad = this.getAttribute('idUnidad')
    this.idOperador = this.getAttribute('idOperador')
    this.idGasolinera = this.getAttribute('idGasolinera')
    this.idPartida = this.getAttribute('idPartida')
  }

  /**
   * @returns {Unidad}
   */
  getUnidad () {
    if(!this.unidad)
      this.unidad = this.getRelationData('unidad') ? new Unidad(this.getRelationData('unidad')) : null

    return this.unidad
  }

  /**
   * @returns {Operador}
   */
  getOperador () {
    if(!this.operador)
      this.operador = this.getRelationData('operador') ? new Operador(this.getRelationData('operador')) : null

    return this.operador
  }

  /**
   * @returns {Proveedor}
   */
  getGasolinera () {
    if(!this.gasolinera)
      this.gasolinera = this.getRelationData('gasolinera') ? new Proveedor(this.getRelationData('gasolinera')) : null

    return this.gasolinera
  }
}

export default Ticket
