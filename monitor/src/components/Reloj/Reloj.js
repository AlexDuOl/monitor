import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'

const getTiempo = tiempo => (tiempo.format('DD-MM-YYYY h:mm a'))
const getDesde = (tiempo, horas, format = 'h:mm a') => (
    moment(tiempo.toISOString()).subtract(horas, 'h').format(format))
const getHasta = (tiempo, horas, format = 'h:mm a') => (
    moment(tiempo.toISOString()).add(horas, 'h').format(format))

const Reloj = ({tiempo, horasDesde, horasHasta}) => {
    return (
        <div className='ui center aligned basic container segment'>
            <div className='ui tiny statistic'>
                <div className='value'>
                    <i className='calendar icon'/> {getTiempo(tiempo)}
                </div>
                <div className='label'>
                    De {getDesde(tiempo, horasDesde)} a {getHasta(tiempo, horasHasta)}
                </div>
            </div>
        </div>
    )
}

Reloj.propTypes = {
    tiempo: PropTypes.object.isRequired,
    horasDesde: PropTypes.number.isRequired,
    horasHasta: PropTypes.number.isRequired
}

export default Reloj
