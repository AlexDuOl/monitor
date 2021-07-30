import {
  REQUEST_PROVEEDORES,
  REQUEST_PROVEEDORES_SUCCESS,
  REQUEST_PROVEEDORES_FAILED,
  INVALIDATE_PROVEEDORES
} from '../constants/action_types'

export const requestProveedores = (params) => ({
  type: REQUEST_PROVEEDORES,
  payload: {params}
})

export const onProveedoresRequestSuccess = (response) => ({
  type: REQUEST_PROVEEDORES_SUCCESS,
  payload: response
})

export const onProveedoresRequestFailed = (response) => ({
  type: REQUEST_PROVEEDORES_FAILED,
  payload: response
})

export const invalidateProveedores = () => ({
  type: INVALIDATE_PROVEEDORES
})
