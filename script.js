const card = document.querySelectorAll('.card');
// use spread operator to log all cards in array:
let cards, cardsFlipped;

const playModal = document.getElementById('playModal');
const playBtn = document.getElementById('playBtn');
const winBtn = document.getElementById("winBtn");
// DOM Strings
const time = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');
// ul to hide and display
const scoreBoard = document.getElementsByClassName('score-ul')[0]
// update text content of moves and times
const userTime = document.getElementById('userTime');
const userMoves = document.getElementById('userMoves');

let firstCard, secondCard;
let hascardbeenflipped = false;

// The cards we want to play in the game
let testCards = [
	{	cardClass: 'tiger', cardText: '🐯', },
	{ cardClass: 'dolphin', cardText: '🐬', },
	{ cardClass: 'unicorn', cardText: '🦄', },
	{ cardClass: 'ghost', cardText: '👻', },
	{ cardClass: 'alien', cardText: '👽', },
	{ cardClass: 'dinosaur', cardText: '🦖', },
	{ cardClass: 'unicorn', cardText: '🦄', },
	{ cardClass: 'tiger', cardText: '🐯', },
	{ cardClass: 'fish', cardText: '🐠', },
	{ cardClass: 'ghost', cardText: '👻', },
	{ cardClass: 'ladybug', cardText: '🐞', },
	{ cardClass: 'fish', cardText: '🐠', },
	{ cardClass: 'ladybug', cardText: '🐞', },
	{ cardClass: 'dolphin', cardText: '🐬', },
	{ cardClass: 'dinosaur', cardText: '🦖', },
	{ cardClass: 'alien', cardText: '👽', },
]
// Shuffle Cards
const shuffleCards = () => {
	// Shuffle Cards [Fisher Yates Shuffle]
	for(let i = testCards.length - 1; i > 0; i--){
	  const j = Math.floor(Math.random() * i);
	  // swap elements array[i] and array[j]
	  const temp = testCards[i];
	 	testCards[i] = testCards[j];
	  testCards[j] = temp;
	} 
	// assignCards - need to remove all classes in case previous game was played:
	cards.forEach((element, index) => {
		// remove classes except card
		element.classList = 'card';
		// emoji text
		element.childNodes[1].childNodes[3].textContent = '';
	})
	// empty arrays to store classes and textContent
	let classTest = [];
	let textTest = [];

	classTest = testCards.map(item => item.cardClass)
	textTest = testCards.map(item => item.cardText)
	// loop through cards to add classes and value of shuffled cards
	// add classes: animal and purple
	classTest.map((item, i) => {
		cards[i].classList.add(item)
		cards[i].classList.add('purple')
		return cards;
	})
	textTest.map((item, i) => cards[i].childNodes[1].childNodes[3].textContent = item)
}

// Clears the board
const clearBoard = () => {
	cards.forEach((element) => {
		element.classList.remove('card-rotate');
		element.classList.remove('blue');
		element.classList.add('purple');
		element.classList.remove('disable');
	})
}

// Checks for a match when two cards are flipped
const checkMatch = () => {
	cards.forEach((element) => {
		element.classList.add('disable');
	})
	let firstType = firstCard.classList[1];
	let secondType = secondCard.classList[1];
	if(firstType === secondType) {
		// 2B. IF A MATCH KEEP CARDS FLIPPED OVER
		firstCard.classList.remove('blue');
		firstCard.classList.add('yellow');
		firstCard.classList.add('disable');
		secondCard.classList.remove('blue');
		secondCard.classList.add('yellow');
		// filter out the cards that are not equal to the current match
		cards = cards.filter(element => {
			return (element !== firstCard && element !== secondCard)
		});
		clearBoard();
	} else {
		// clear board in 1 second as 2 cards will be showing
		setTimeout(clearBoard, 1000);
	}
	hascardbeenflipped = false;
}

const checkWin = () => {
	// if there are no more cards in array - user has won
	if(cards.length<1) {
		winModal.style.display = "block";
		userTime.textContent = `Time Taken: ${time.textContent} seconds`;
		userMoves.textContent = `Total Moves: ${userMove}`;
	}
}

function displayCard() {
	// add classes to rotate card
	this.classList.add('card-rotate');
	// change color of overturned cards
	this.classList.remove('purple');
	this.classList.add('blue');
	// disable card from being clicked
	this.classList.add('disable');
	// check to see if a card has been turned or not and assign accordingly
	if(!hascardbeenflipped) {
		firstCard = this;
		hascardbeenflipped = true;
	} else {
		secondCard = this;
		checkMatch();
		checkWin();
		userMove++;
		moves.textContent = userMove;	
	}
}

const startGame = () => {
	playModal.style.display = 'none';
	winModal.style.display = 'none';
	// display score boards
	scoreBoard.classList.add('show');
	// start timer
	timer();
	// user moves starts at zero and display time and moves
	userMove = 0;
	moves.textContent = 0;
	time.textContent = 0;
	// no cards are flipped to begin with
	hascardbeenflipped = false;
	cards = [...card];
	shuffleCards();
	clearBoard();
	// for each card add event listener
	card.forEach(item => item.addEventListener('click', displayCard))
}

// Timer function
const timer = () => {
  let i = 0;
  let timer = setInterval(function() {
    time.textContent = i;
    i++;
    // stop timer if game is reset or game is won
    if(playModal.style.display === 'block' || winModal.style.display === 'block') {
      clearTimeout(timer);
    }
  }, 1000); //roughly 1 second
}

// Event Listeners
// When user clicks button in either play or win modal, play game
playBtn.addEventListener('click', startGame);
winBtn.addEventListener('click', startGame);
// if reset game pressed - bring up playmodal
reset.addEventListener('click', () => {
	scoreBoard.classList.add('hide');
	playModal.style.display = 'block'
})


