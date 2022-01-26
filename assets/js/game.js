/**
 * 2C = two of clubs (tréboles)
 * 2D = two of diamond (diamantes)
 * 2H = two of hearts (corazones)
 * 2S = two of spades (espadas)
 * 
 * La meta es llegar a 21 pts sin pasarnos
 * El empate de 21 y 21
 */

// deckOfCards = barajaDeCartas

// Patrón Módulo (para que no se pueda ver la baraja en el inspector)

(() => {                                   // función anónima autoinvocada. Se conoce como el patrón de módulo en js

 let deckOfCards = [];
 // C = Tréboles, D = Diamantes, H = Corazones, S = espadas
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

// Score de los jugadores
// El jugador 0 somos nosotros y el jugador 1 es la computadora
let scorePlayers = [];



/* ---REFERENCIAS AL DOM, (PARA QUE JS PUEDA ACCEDER AL DOM) --- */



// Botones de acciones
const getBtnCard = document.querySelector("#btnGetCard");
const stopBtnTurn = document.querySelector("#btnStopTurn");
const newBtnGame = document.querySelector("#btnNewGame");

// Área de juego
const divCardPlayers = document.querySelectorAll('.divCards');
const scoreHtml = document.querySelectorAll('small');

/* ---FIN DE REFERENCIAS AL DOM ---*/

/** FUNCIONES */

//INICIAR JUEGO
const startGame = (numPlayer = 2) => {
console.log('Comenzando el juego');
// crear la baraja
deckOfCards = createDeck();
// console.log(deckOfCards);

// cada nuevo juego se reinician los puntajes
scorePlayers = [];
for( let i=0; i<numPlayer; i++) {
    scorePlayers.push(0);
}
console.log(scorePlayers);
// puntaje de los jugadores

};

// CREAR BARAJA
const createDeck = () => {
let deckOfCards = [];

for(let i=2; i <=10; i++) {
    for(let type of types) {
    deckOfCards.push(i + type)
    // console.log(`deckOfCards ${i}`, deckOfCards);
    }
}

for(let type of types) {
    for( let special of specials) {
        deckOfCards.push(special + type);
    }
}
console.log(deckOfCards);
return _.shuffle(deckOfCards);
};

// Obtener una carta (tarjeta)

const getOneCard = () => {

}

// Valor de la carta
const ValueCard = () => {

};

// Contador de puntaje

const countScore = () => {

}

// Crear para mostrarla en el DOM
const createCard = () => {

}

// Determinar un Ganador
const winnerPlayer = () => {

}

// Para los turno de la computadora
const turnComputer = () => {

}

/* LOS EVENTOS DE LOS BOTONES */

newBtnGame.addEventListener('click', ()=>{
    startGame();
});

})();  // función anónima autoinvocada. Se conoce como el patrón de módulo en js

