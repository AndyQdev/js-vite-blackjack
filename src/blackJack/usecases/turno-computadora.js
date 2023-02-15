import {pedirCarta, acumularPuntos, crearCarta} from './'
const determinarGanador = (puntosJugadores) => {
       
    const [ puntosMinimos, puntosComputadora] = puntosJugadores; //extrae el puntaje del arreglo
    
     setTimeout(() => { //hace que se ejecute el codigo super rapido
         if(((puntosMinimos>puntosComputadora)||(puntosComputadora>21))&&(puntosMinimos<=21)){
             alert('FELICIDADES, GANASTE!');
         } else if ((puntosMinimos<puntosComputadora)||(puntosMinimos>21)){
             alert('LO SIENTO, PERDISTE');
         } else {
             alert('EMPATE!');
         };
     }, 10);
 };
/**
 * 
 * @param {Number} puntosMinimos Puntos minimos que necesita la computadora para ganar
 * @param {Array<String>} deck 
 * @param {HTMLElement} puntosHTML 
 * @param {Array<Number>} puntosJugadores 
 * @param {HTMLElement} divCartasJugadores 
 */
export const turnoComputadora = (puntosMinimos, deck, puntosHTML, puntosJugadores, divCartasJugadores)=>{
    
    if (!puntosMinimos) throw new console.Error('Putos mínimos son necesarios');
    if (!deck) throw new console.Error('El deck es necesario');
    
    let puntosComputadora = 0;
     do{
         const carta = pedirCarta(deck);
         puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1, puntosHTML, puntosJugadores);
         crearCarta(carta, puntosJugadores.length - 1, divCartasJugadores);
 
     }while( (puntosComputadora  < puntosMinimos)&&(puntosMinimos<=21) );
     determinarGanador(puntosJugadores);
 };
