import { valorCarta } from './valor-carta'

    
    /**
     *  
     * @param {String} carta 
     * @param {Number} turno El turno del jugador o la computadora 
     * @param {HTMLElement} puntosHTML El elemento HTML para mostrar puntos
     * @param {Array<Number>} puntosJugadores El puntaje de los jugadores 
     * @returns 
     */
    export const acumularPuntos = ( carta, turno, puntosHTML, puntosJugadores) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );    
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };
