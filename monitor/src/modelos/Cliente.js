import React from 'react'
import BaseModel from './BaseModel'

class Cliente extends BaseModel {
  constructor(data) {
    super(data)

    this.nombreEmpresa = this.getAttribute('nombreEmpresa')
    this.logoEmpresa = this.getAttribute('logoEmpresa')
    this.politicaServicio = this.getAttribute('politicaServicio')
    this.politicaTaxis = this.getAttribute('politicaTaxis')
    this.mostrarTelefonoOperador = this.getAttribute('mostrarTelefonoOperador')
    this.ubicacionEmpresa = this.getAttribute('ubicacionEmpresa')
    this.categoria = this.getAttribute('categoria')
    this.activo = this.getAttribute('activo')
  }
}

export default Cliente
