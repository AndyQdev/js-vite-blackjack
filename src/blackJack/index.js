import _ from 'underscore'; //es para que de el shufle
import {crearDeck, pedirCarta, acumularPuntos, crearCarta, turnoComputadora} from './usecases'
//PATRON MODULO
const miModulo = (()=>{ //ayuda a proteger el codigo
    'use strict' //jhavascrip es mas estricto con el codio, por ejemplo ve que todas las variables esten definidas, etc

    let deck = [],
        tipos=['C','D','H','S'],
        especiales = ['A', 'J', 'Q', 'K'],
    
        puntosJugadores = [];//El ultimo jugador es la computadora
    //Referencias de html
    const btnPedir= document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNew = document.querySelector('#btnNew'),
          puntosHTML = document.querySelectorAll('small'), 
          divCartasJugadores = document.querySelectorAll('.divCartas');
    
    const inicializarJuego = ( numJugadores ) => {
        numJugadores = 2;
        deck = crearDeck( tipos, especiales );
        puntosJugadores = []; 
        for (let i=0; i<numJugadores;i++){
            puntosJugadores.push(0);
        };  
        
        btnPedir.disabled   = false;
        btnDetener.disabled = false;

        puntosHTML.forEach( elem => elem.innerText = 0 ); // recorre el arreglo

        divCartasJugadores.forEach( elem => elem.innerText = '' );

    };

    
    //Eventos
    
    btnPedir.addEventListener('click', ()=>{
         
        const carta = pedirCarta(deck),
              puntosJugador = acumularPuntos( carta, 0, puntosHTML, puntosJugadores );
        
        crearCarta(carta, 0, divCartasJugadores);

        if (puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador, deck, puntosHTML, puntosJugadores, divCartasJugadores);
        } else if (puntosJugador === 21){
            console.warn('Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador, deck, puntosHTML, puntosJugadores, divCartasJugadores);
        };
    });
    
    btnDetener.addEventListener('click', ()=>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0], deck, puntosHTML, puntosJugadores, divCartasJugadores);
    });
    
    
    btnNew.addEventListener('click', ()=>{

        inicializarJuego();
    
    });
    
//AL FINAL SIEMPRE SE RETORNA ALGO
    return{//todo los objetos que retornemos seran publicos, osea quiensea podra verlo en la consola
        nuevoJuego : inicializarJuego
    };

})();
