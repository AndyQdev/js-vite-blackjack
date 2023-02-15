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
        deck = crearDeck();
        puntosJugadores = [];
        for (let i=0; i<numJugadores;i++){
            puntosJugadores.push(0);
        };  
        
        btnPedir.disabled   = false;
        btnDetener.disabled = false;

        puntosHTML.forEach( elem => elem.innerText = 0 ); // recorre el arreglo

        divCartasJugadores.forEach( elem => elem.innerText = '' );

    };

    //Esta funcion crea una nueva baraja
    const crearDeck =()=>{    
        deck = [];
        let j = 0;
        for ( let i = 2; i <= 10; i++ ){
            for ( let tipo of tipos ){
                if (j < especiales.length){
                deck.push(especiales[j] + tipo);
                };
                deck.push(i+tipo);
            }; 
            j++;   
        };  
        return  _.shuffle(deck);
    };
    
    //Esta funcion permite tomar una carta
    const pedirCarta = () =>{
        if ( deck.length === 0 ){
            throw 'No hay cartas en el deck'
        };
        return deck.shift();
    };
    
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length-1); //substring(inicio, final);
        return ( isNaN(valor)  ) ?  
                ( valor ==='A' ) ? 11 :10
                : valor * 1;
    };
    //turno de la computadora
    //turno: 0
    const acumularPuntos = ( carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );    
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };


    //turno: el ultimo es la computadora
    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; 
        imgCarta.classList.add('cartas'); 
        divCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {
       
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

    const turnoComputadora = (puntosMinimos)=>{
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
    
        }while( (puntosComputadora  < puntosMinimos)&&(puntosMinimos<=21) );
        determinarGanador();
    };
    
    //Eventos
    
    btnPedir.addEventListener('click', ()=>{
         
        const carta = pedirCarta(),
              puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta(carta, 0);

        if (puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        };
    });
    
    btnDetener.addEventListener('click', ()=>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    
    
    btnNew.addEventListener('click', ()=>{

        inicializarJuego();
    
    });
    
//AL FINAL SIEMPRE SE RETORNA ALGO
    return{//todo los objetos que retornemos seran publicos, osea quiensea podra verlo en la consola
        nuevoJuego : inicializarJuego
    };

})();
