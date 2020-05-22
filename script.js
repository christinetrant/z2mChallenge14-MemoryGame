const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards = [...card];
// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;
// to store value of card so we can match it
let lastCardValue = ''; // e.g. unicorn
let currentCardValue = ''; // e.g. tiger
let lastCardIndex = ''; // index of last card
let currentCardIndex = ''; // index of current card
let lastCard; // div of last card
let currentCard; // div of current card

// DOM Strings
const timer = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');

// resets game
const resetGame = () => { 
	// use spread operator to log all cards in array:
	cards = [...card];
	// counter = 0 as user only gets 2 cards to turn at a time
	count = 0;
	// adds original classes to cards
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate')
		element.classList.remove('yellow');
		element.classList.add('purple');	
	})
}

const displayCard = (element, index) => {
	// add classes to rotate card
	element.classList.add('card-rotate');
	// change color of overturned cards
	element.classList.remove('purple');
	element.classList.add('blue');
	// increment value of count
	count++;
	// save last card before overwriting current card
	lastCardValue = currentCardValue;
	lastCard = currentCard;
	lastCardIndex = currentCardIndex
	// card value becomes the current element
	currentCardValue = element.classList[1];
	currentCard = element;
	currentCardIndex = index;
}

// function turns cards back over face down
const clearBoard = () => { 
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate');
		element.classList.remove('blue');
		element.classList.add('purple');
		// reset count
		count = 0;
	})
}

cards = cards.forEach((element, index) => {
  element.addEventListener("click", function() {  

  	if(count<1) {
		console.log('first go', 'count:', count)
		// play a card to turn
		displayCard(element, index);
	// display the elements while count is less than 2
	} else if(count<=2) {
		console.log('second & last go', 'count:', count)
		// play a card to turn
		displayCard(element, index);
		// THINGS TO DO:
		// 1. CHECK IF CARD IS THE SAME ONE CLICKED
		if(lastCardIndex === currentCardIndex) {
			// reset count
			count = 0;
			// call displayCard again 
			displayCard(element, index);
		// 2. CHECK IF IT IS A MATCH
		} else {
			if(currentCardValue === lastCardValue) {
				// 2B. IF A MATCH KEEP CARDS FLIPPED OVER
				currentCard.classList.remove('blue');
				currentCard.classList.add('yellow');
				lastCard.classList.remove('blue');
				lastCard.classList.add('yellow');
				// filter out the cards that are not equal to the current match
				cards = cards.filter(element => {
					console.log(element)
					return (element !== lastCard && element !== currentCard)
				});
				// 2C. CONTINUE GAME
				clearBoard();				
			// 3. IF NOT A MATCH RESET BOARD
			} else {
				// clear board in 1 second as 2 cards will be showing
				setTimeout(clearBoard, 1000);
			}
		}
	} else if(count === 2) {
		console.log('count equals 2 - reset count', count)
		clearBoard();
	}
	// if there are no more cards in array - user has won
	if(cards.length<1) {
		console.log('You win! Game Over')
	}
	
	})
});

// if reset button is pressed
reset.addEventListener('click', resetGame)

// Call init function to begin game;
resetGame();


// NEED TO RANDOMIZE CARDS!!!
// at beginning of game show all cards then flip over - 5 seconds maybe?

// TIMER TO CHANGE!
// const timer = () => {
//     var i = 1;
//     var timer = setInterval(function() {
//         console.log(i);
//         i++;
//         if(i > 10) {
//             clearInterval(timer);
//         }
//     }, 1000);
// }

// timer();