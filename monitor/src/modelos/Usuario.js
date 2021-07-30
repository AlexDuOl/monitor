import BaseModel from './BaseModel'

class Usuario extends BaseModel {
  constructor(data) {
    super(data)

    this.nombre = this.getAttribute('nombre')
    this.email = this.getAttribute('email')
    this.acceso = this.getAttribute('acceso')
    this.activo = this.getAttribute('activo')
    this.iniciales = this.getAttribute('iniciales')
    this.supervisor = this.getAttribute('supervisor')
  }

  puedeVerFacturacion() {
    return this.id === 1445 || this.id === 330 || this.id === 80 || this.id === 3746
  }

  puedeCambiarPrecios() {
    return this.id === 330 || this.id === 80 || this.id === 1445 || this.id === 3746
  }

  puedeProgramarServicios() {
    return this.id === 80 || this.id === 365 || this.id === 390 || this.id === 3746 || this.id === 401 || 
           this.id === 3825 || this.id === 3839
  }

  puedeForzarProgramacionTransferencias() {
    return this.id === 401 || this.id === 3746
  }

  puedeDesconfirmarBitacora() {
    return this.id === 401 || this.id === 3746
  }
}

export default Usuario


/*
  ==> Programadores
  80   Juan Jose Cortes Guzmán
  3746 Claudia Alejandra Durán Olmedo
  
  ==> Administrativos
  330  Claudian Lizbeth Oseguera Jiménez
  1445 Fernando Navarro Virgen

  ==> Operaciones
  401  Miguel Machuca López

  ==> Programador de rutas
  390  Gustavo Orozco Vázquez
  3839 Christian Yaeht Cedeño Vargas

  ==> Monitoristas
  365  Alejandra Mertínes
  3825 Gabriela Elizabeth Martínez García

* */