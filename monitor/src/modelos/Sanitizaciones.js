import BaseModel from './BaseModel';
import Cliente from './Cliente';
import Unidad from './Unidad';
import Operador from './Operador';

import moment from 'moment';
import 'moment/locale/es';

export default class Sanitizaciones extends BaseModel{


    constructor(data){
        super(data)
    }

    getCliente(){
        if(!this.getRelationData('cliente'))
            return undefined

        if(!this.cliente) this.cliente = new Cliente(this.getRelationData('cliente'))
        
        return this.cliente
    }
    getUnidad(){
        if(!this.getRelationData('unidad'))
            return undefined

        if(!this.unidad) this.unidad = new Unidad(this.getRelationData('unidad'))
        
        return this.unidad
    }
    getOperador(){
        if(!this.getRelationData('operador'))
            return undefined

        if(!this.operador) this.operador = new Operador(this.getRelationData('operador'))
        
        return this.operador
    }

    getFecha(formato){
        return moment(this.getAttribute('fecha')).format(formato)
    }
}

