import BaseModel from "./BaseModel";
import Usuario from "./Usuario";
import Operador from "./Operador";
import Ruta from "./Ruta";
import Proveedor from "./Proveedor";

class Revision extends BaseModel {
    constructor(data) {
        super(data);

            this.usuario_id = this.getAttribute("usuarioId")
            this.unidadId = this.getAttribute("unidadId")
            this.operadorSumaId = this.getAttribute("operadorSumaId")
            this.rutaId = this.getAttribute("rutaId")
            this.fecha = this.getAttribute("fecha")
            this.kilometraje = this.getAttribute("kilometraje")
            this.limpiezaExterior = this.getAttribute("limpiezaExterior")
            this.limpiezaInterior = this.getAttribute("limpiezaInterior")
            this.presionLlantas = this.getAttribute("presionLlantas")
            this.estadoLlantas = this.getAttribute("estadoLlantas")
            this.nota = this.getAttribute("nota")
            this.latitud = this.getAttribute("latitud")
            this.longitud = this.getAttribute("longitud")
            this.notaMantenimiento = this.getAttribute("notaMantenimiento")
            this.llanta = this.getAttribute("llanta")
            this.golpes = this.getAttribute("golpes")
            this.rayones = this.getAttribute("rayones")
            this.faros = this.getAttribute("faros")
            this.multas = this.getAttribute("multas")
            this.firmaRecibos = this.getAttribute("firmaRecibos")
            this.llenadoCombustible = this.getAttribute("llenadoCombustible")
            this.reporteBase = this.getAttribute("reporteBase")
            this.disponibilidadCelular = this.getAttribute("disponibilidadCelular")
            this.quejaClientes = this.getAttribute("quejaClientes")
            this.tarjetaCirculacion = this.getAttribute("tarjetaCirculacion")
            this.polizaSeguros = this.getAttribute("polizaSeguros")
            this.extintor = this.getAttribute("extintor")
            this.dineroEfectivo = this.getAttribute("dineroEfectivo")
            this.licenciaVigente = this.getAttribute("licenciaVigente")
            this.kardexMantenimiento = this.getAttribute("kardexMantenimiento")
            this.kitLimpieza = this.getAttribute("kitLimpieza")
            this.kitAuxilio = this.getAttribute("kitAuxilio")
            this.uniforme = this.getAttribute("uniforme")
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
        if (!this.operador)
            this.operador = this.getRelationData('operador') ? new Operador(this.getRelationData('operador')) : null;
        return this.operador
    }

    /**
     * @returns {OperadorSuma}
     */
    getOperadorSuma () {
        if(!this.operadorSuma)
            this.operadorSuma = this.getRelationData('operadorSuma') ? new Operador(this.getRelationData('operadorSuma')) : null;
        return this.operadorSuma
    }

    /**
     * @returns {Ruta}
     */
    getRuta () {
        if (!this.ruta)
            this.ruta = this.getRelationData('ruta') ? new Ruta(this.getRelationData('ruta')) : null;
        return this.ruta
    }

    /**
     * @returns {Proveedor}
     */
    getProveedor() {
        if (!this.proveedor)
            this.proveedor = this.getRelationData('proveedor') ? new Proveedor(this.getRelationData('proveedor')) : null;
        return this.proveedor
    }
}

export default Revision