import BaseModel from './BaseModel'

class Estructura extends BaseModel {

  constructor(data) {
    super(data)

    this.idRuta = this.getAttribute('idRuta')
    this.nombreRuta = this.getAttribute('nombreRuta')
    this.tipo = this.getAttribute('tipo')
    this.turno = this.getAttribute('turno')
    this.horaInicio = this.getAttribute('horaInicio')
    this.horaFin = this.getAttribute('horaFin')
    this.tipoUnidad = this.getAttribute('tipoUnidad')
    this.dias = this.getAttribute('diasActivos')
    this.pagoOperador = this.getAttribute('pagoOperador')
    this.pagoAliado = this.getAttribute('pagoSubcontratado')
    this.precioCliente = this.getAttribute('precioCliente')
  }

  detalle() {
    return `${this.turno} - ${this.tipo} | ${this.horaInicio.substr(11, 5)} - ${this.horaFin.substr(11, 5)}`
  }

  color() {
    switch (this.tipo) {
      case 'Sencillo':
        return 'green';
      case 'Medio':
        return 'yellow';
      case 'Operación':
        return 'grey';
      case 'Especial':
        return 'purple';
      default:
        return 'black';
    }
  }
}

export default Estructura
