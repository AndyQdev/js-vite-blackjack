   
   
   /**
    * Esta funcion permite tomar una carta
    * @param {Array<String>} deck 
    * @returns {String} retorna la carta del deck
    * Retorna un string
    */
    export const pedirCarta = (deck) =>{
        if (!deck || deck.length === 0 ){
            throw 'No hay cartas en el deck'
        };
        return deck.shift();
    };