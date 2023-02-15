    
    
//turno: el ultimo es la computadora
    /**
     * 
     * @param {String} carta 
     * @param {Number} turno 
     * @param {HTMLElement} divCartasJugadores El turno de la carta del jugador
     */
    export const crearCarta = ( carta, turno, divCartasJugadores ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; 
        imgCarta.classList.add('cartas'); 
        divCartasJugadores[turno].append(imgCarta);
    };