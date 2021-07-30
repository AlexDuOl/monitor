import BaseModel from './BaseModel'
import Estructura from './Estructura'
import Ruta from './Ruta'
import Unidad from './Unidad'
import Operador from "./Operador";
import Proveedor from "./Proveedor";

class Bitacora extends BaseModel {

  constructor(data) {
    super(data)

    this.modalidad = this.getAttribute('modalidad')
    this.terminado = this.getAttribute('terminado')
    this.confirmado = this.getAttribute('confirmado')
    this.transferido = this.getAttribute('transferido')
    this.horaConfirmacion = this.getAttribute('horaConfirmacion')
    this.fecha = this.getAttribute('fecha')
    this.tiempoInicial = this.getAttribute('tiempoInicial')
    this.tiempoFinal = this.getAttribute('tiempoFinal')
    this.alarmaNotificacion = this.getAttribute('alarmaNotificacion')
    this.alarmaInicioRuta = this.getAttribute('alarmaInicioRuta')
    this.comentarios = this.getAttribute('comentarios')
    this.estatus = this.getAttribute('estatus')
    this.folioBitacora = this.getAttribute('folioBitacora')
    this.kilometrajeInicial = this.getAttribute('kilometrajeInicial')
    this.kilometrajeFinal = this.getAttribute('kilometrajeFinal')
    this.numeroPersonas = this.getAttribute('numeroPersonas')
    this.tiempoCantidad = this.getAttribute('tiempoCantidad')
    this.dia = this.getAttribute('dia')
    this.semana = this.getAttribute('semana')
    this.idProveedor = this.getAttribute('idProveedor')
    this.idOperador = this.getAttribute('idOperador')
    this.idUnidad = this.getAttribute('idUnidad')
    this.idRuta = this.getAttribute('idRuta')
    this.idEstructura = this.getAttribute('idEstructura')
    this.idServicioEspecial = this.getAttribute('idServicioEspecial')
    this.horaBanderazo = this.getAttribute('horaBanderazo')
    this.horaInicioRuta = this.getAttribute('horaInicioRuta')
    this.horaFinalRuta = this.getAttribute('horaFinalRuta')
    this.horaCierreRuta = this.getAttribute('horaCierreRuta')
    this.tipo = this.getAttribute('tipo')
    this.verificado = this.getAttribute('verificado')

    this.pagarServicio = this.getAttribute('pagarServicio')

    this.cancelable = this.getAttribute('cancelable')
    this.transferible = this.getAttribute('transferible')
    this.rescatable = this.getAttribute('rescatable')

    this.pagoOperador = this.getAttribute('pagoChofer')
    this.pagoAliado = this.getAttribute('pagoSubcontratado')
    this.precioCliente = this.getAttribute('precioCliente')

  }


  permitirCambioDePrecio(){
    if(this.pagoOperador === 0 && this.pagoAliado === 0 && this.precioCliente === 0) {

      return false
      
    } else if (!this.pagarServicio) { 

      return false

    } else {

      return true
    }

  }

  getNombreRuta () {
    return `${this.getRuta().nombre} - ${this.getEstructura().turno} - ${this.getEstructura().tipo}`
  }

  getFecha () {
    return `${this.tiempoInicial.substring(0,10).split('-').reverse().join('-')}`
  }

  getDia() {
    return this.tiempoInicial.substring(0,10).split('-')[2]
  }

  getHorario () {
    if (this.modalidad === 'Especial') {
      return `${this.tiempoInicial.substr(11, 5)} - ${this.tiempoFinal.substr(11, 5)}`
    }

    if(this.horaInicioRuta && this.horaFinalRuta) {
      return `${this.horaInicioRuta.substr(11, 5)} - ${this.horaFinalRuta.substr(11, 5)}`
    } else {
      return `${this.tiempoInicial.substr(11, 5)} - ${this.tiempoFinal.substr(11, 5)}`
    }
  }

  /**
   * @returns {Ruta}
   */
  getRuta () {
    if (!this.ruta) this.ruta = new Ruta(this.getRelationData('ruta'))

    return this.ruta
  }

  /**
   * @returns {Operador}
   */
  getOperador() {

    if(!this.getRelationData('operador'))
      return undefined

    if(!this.operador) this.operador = new Operador(this.getRelationData('operador'))

    return this.operador
  }

  /**
   * @returns {Proveedor}
   */
  getProveedor() {
    if(!this.getRelationData('proveedor'))
      return undefined

    if(!this.proveedor) this.proveedor = new Proveedor(this.getRelationData('proveedor'))

    return this.proveedor
  }

  /**
   * @returns {Estructura}
   */
  getEstructura () {
    if (!this.estructura) this.estructura = new Estructura(this.getRelationData('estructura'))

    return this.estructura
  }

  /**
   * @returns {Unidad}
   */
  getUnidad () {
    if (!this.unidad)
      this.unidad = this.getRelationData('unidad') ? new Unidad(this.getRelationData('unidad')) : { id: 0, tipo: 'Sin definir'}

    return this.unidad
  }

  /**
   * @returns boolean
   */
  hasDatosCompletos () {
    return this.folioBitacora && this.numeroPersonas && this.kilometrajeInicial && this.kilometrajeFinal
  }
}

export default Bitacora
