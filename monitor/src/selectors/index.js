import { createSelector } from 'reselect'

const getServicios = state => state.servicios.all
const getIdsServiciosSeleccionados = state => state.servicios.selected

export const filtrarServicios = createSelector([getServicios, getIdsServiciosSeleccionados], (servicios, idsServiciosSeleccionados) => {

  if (!idsServiciosSeleccionados) { return servicios }

  return servicios.filter(servicio => idsServiciosSeleccionados.includes(servicio.id))
})

const getBitacoras = (state) => (state.bitacoras.all);
const getIdBitacoraSeleccionada = (state) => (state.bitacoras.editing.id);

export const getBitacoraSeleccionada = createSelector(
  [getBitacoras, getIdBitacoraSeleccionada], (xs, id) => ( xs.find(x => ( x.id === id))));

const getAuditoria = (state) => (state.auditorias.all);
const getIdAuditoriaSeleccionada = (state) => (state.auditorias.updating.id);

export const getAuditoriaSeleccionada = createSelector(
    [getAuditoria, getIdAuditoriaSeleccionada], (xs, id) => ( xs.find(x => ( x.id === id))));

const getRevision = (state) => (state.revisiones.all);
const getIdRevisionSeleccionada = (state) => (state.revisiones.updating.id);

export const getRevisionSeleccionada = createSelector(
    [getRevision, getIdRevisionSeleccionada], (xs, id) => ( xs.find(x => ( x.id === id))));

