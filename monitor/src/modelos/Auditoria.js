import BaseModel from "./BaseModel";
import Usuario from "./Usuario";
import Operador from "./Operador";
import Unidad from './Unidad'

class Auditoria extends BaseModel {
    constructor(data) {
        super(data);

        this.idUsuario = this.getAttribute('idUsuario')
        this.idUnidad = this.getAttribute('idUnidad')
        this.idOperador = this.getAttribute('idOperador')
        this.fechaCaptura = this.getAttribute('fechaCaptura')
        this.comentarios = this.getAttribute('comentarios')
        this.calificacionUsoUniforme = this.getAttribute('calificacionUsoUniforme')
        this.calificacionLimpiezaUniforme = this.getAttribute('calificacionLimpiezaUniforme')
        this.calificacionLimpiezaInteriorUnidad = this.getAttribute('calificacionLimpiezaInteriorUnidad')
        this.calificacionLimpiezaExteriorUnidad = this.getAttribute('calificacionLimpiezaExteriorUnidad')
        this.calificacionCortePelo = this.getAttribute('calificacionCortePelo')
        this.calificacionAseoOperador = this.getAttribute('calificacionAseoOperador')
        this.totalFotografias = this.getAttribute('totalFotografias')
    }

    /**
     * @returns {Usuario}
     */
    getUsuario () {
        if(!this.usuario)
            this.usuario = this.getRelationData('usuario') ? new Usuario(this.getRelationData('usuario')) : null;
        return this.usuario
    }

    /**
     * @returns {Operador}
     */
    getOperador () {
        if(!this.operador)
            this.operador = this.getRelationData('operador') ? new Operador(this.getRelationData('operador')) : null;
        return this.operador
    }

    /**
     * @returns {Unidad}
     */
        getUnidad () {
        if (!this.unidad)
        this.unidad = this.getRelationData('unidad') ? new Unidad(this.getRelationData('unidad')) : { id: 0, tipo: 'Sin definir'}
        return this.unidad
    }
}

export default Auditoria