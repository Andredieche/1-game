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
let scorePlayers = []; // [0,0]



/* ---REFERENCIAS AL DOM, (PARA QUE JS PUEDA ACCEDER AL DOM) --- */



// Botones de acciones
const getBtnCard = document.querySelector("#btnGetCard");
const stopBtnTurn = document.querySelector("#btnStopTurn");
const newBtnGame = document.querySelector("#btnNewGame");

// Área de juego
const divCardPlayers = document.querySelectorAll('.divCards');
// Puntaje de los jugadores
const scoreHtml = document.querySelectorAll('small');

/* ---FIN DE REFERENCIAS AL DOM ---*/

/** FUNCIONES */

//INICIAR JUEGO
const startGame = (numPlayer = 2) => {
console.log('Comenzando el juego');
// crear la baraja
deckOfCards = createDeck();
console.log(deckOfCards);

// cada nuevo juego se reinician los puntajes
scorePlayers = [];
for( let i=0; i<numPlayer; i++) {
    scorePlayers.push(0);
}

// Resetear los puntajes de los jugadores
// Limpiar el área de juego
scoreHtml.forEach( element => element.innerText = 0);
divCardPlayers.forEach( element => element.innerHTML = '');


// Habilitar los botones
getBtnCard.disabled = false;
stopBtnTurn.disabled = false;
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
return _.shuffle(deckOfCards);
}

// Obtener una carta (tarjeta)

const getOneCard = () => {
    if(deckOfCards.length === 0) {
        throw 'the deck is empty';
    }
    // el pop elimina el último y me devuelve el elemento eliminado
    return deckOfCards.pop();
}

// VALOR DE LA CARTA
//el último índice lo quiero ignorar
//2D [2,D] length 2 índices 2=0 y D=1 (por ser un array)
//10D [1,0,D] length 3

/** 
 * 10D tiene una longitud de 3
 * y sus índices son 0, 1, 2
 * 
 * rocky su longitud 5 sus indices es 0,1,2,3,4
 * 5-1 = 4 (última carta)
*/
const valueCard = (card) => {
  const value = card.substring(0,card.length-1);
  return (isNaN(value)?(value === 'A')?11:10: value * 1);
}

// Contador de puntaje
const countScore = (card, turn) => {
  scorePlayers[turn] += valueCard(card); // [0,0]
  // scorePlayers[turn] = scorePlayers[turn] = valueCard(card);
  console.log(valueCard(card));        
  scoreHtml[turn].innerText = scorePlayers[turn];
  return scorePlayers[turn];
}

// Crear para mostrarla en el DOM
// Obtener la carta a crear y necesitamos el turno del jugador 0, 1
// Nosotros somos el 0 y el computador es el 1
const createCard = (card, turn) => {
   const imgCard = document.createElement('img');
   // con el comando anterior se va a crear <img src=""></img>
   imgCard.src=`assets/img/cartas/${card}.png`;
   imgCard.classList.add('img-card', 'animate__animated', 'animate__flipInY');
   divCardPlayers[turn].append(imgCard);
}

// Determinar un Ganador
const winnerPlayer = () => {
  // scorePlayers puntajes del jugador y la computadora
  const [scorePlayer, scoreComputer] = scorePlayers; // [0,0] que ahora tiene puntajes acumulados

  if(scoreComputer === scorePlayer) {
      Swal.fire({
          title:'Empate',
      });
  } else if (scorePlayer > 21) {
      Swal.fire({
          icon: 'error',
          title: 'DERROTA!',
          texto: 'Perdiste, el computador gana!!'
      });
  } else if (scoreComputer > 21) {
      Swal.fire({
          title: 'Victoria!',
      });
  } else {
      Swal.fire({
          icon: 'error',
          title: 'DERROTA!',
          texto: 'Perdiste, el computador gana!!'
      });
  }
};

// Para los turno de la computadora
// minScore el puntaje que obtuvo el player 0 (de nosotros)
// 18 eso tiene obtener 19 20 21
const turnComputer = (minScore) => {
  let scoreComputer = 0;
  do {
    const card = getOneCard();
    // [0,0] scorePlayers longitud tiene 2 // longitud-1
    scoreComputer = countScore(card, scorePlayers.length - 1);
    createCard(card, scorePlayers.length - 1);

 } while ((scoreComputer < minScore)  && (minScore <= 21))
 winnerPlayer();
};

/* LOS EVENTOS DE LOS BOTONES */
// crear juego
newBtnGame.addEventListener('click', ()=>{
    startGame();
});

//obtener una carta
getBtnCard.addEventListener('click', () => {
    const card = getOneCard();
    // vamos a enviar al jugador y la carta para que sea creada
    const scorePlayer = countScore(card, 0);
    createCard(card, 0);
    
    if(scorePlayer > 21) {
      getBtnCard.disabled = true;
      stopBtnTurn.disabled = true;
      // turno de la máquina
      turnComputer(scorePlayer);
    } else if (scorePlayer === 21) {
      getBtnCard.disabled = true;
      stopBtnTurn.disabled = true;
      // turno de la máquina
      turnComputer(scorePlayer); 
    }

});
// stop, turno de la computadora
stopBtnTurn.addEventListener('click', () => {
    getBtnCard.disabled = true;
    stopBtnTurn.disabled = true;
    turnComputer(scorePlayers[0]);
});


})();  // función anónima autoinvocada. Se conoce como el patrón de módulo en js

