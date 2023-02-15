   import _ from 'underscore';
   
    /**
     * Exporta una funcion creardeck
     * @param {Array<String>} tiposCartas Ejemp : ['C','D','H','S'] 
     * @param {Array<String>} tiposEspeciales Ejemp: ['A', 'J', 'Q', 'K']
     * @returns {Array<String>}
     * Retorna un nuevo deck de cartas
     */
    export const crearDeck =( tiposCartas, tiposEspeciales )=>{    
        
        if (!tiposCartas || tiposCartas.length === 0 ) 
            throw new Error('tiposCartas es obligatorio como un arregki de string');
        if (!tiposEspeciales || tiposEspeciales.length === 0 ) 
            throw new Error('tiposEspeciales es obligatorio como un arregki de string');
        
            let deck = [];
        let j = 0;
        for ( let i = 2; i <= 10; i++ ){
            for ( let tipo of tiposCartas ){
                if (j < tiposEspeciales.length){
                deck.push(tiposEspeciales[j] + tipo);
                };
                deck.push(i+tipo);
            }; 
            j++;   
        };  
        return  _.shuffle(deck);
    };