const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards = [...card];
// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;
// to store value of card so we can match it
let lastCardValue = ''; // e.g. unicorn
let lastCardIndex = ''; // index of last card
let currentCardValue = ''; // e.g. tiger
let matchArray = []; // temp array to store matched cards
let lastCard; // div of last card

// DOM Strings
const timer = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');


const checkMatch = () => {}
const checkSameCard = () => {}


const displayCard = (element, index) => {
	// add classes to rotate card
	element.classList.add('card-rotate');
	// change color of overturned cards
	element.classList.remove('purple');
	element.classList.add('blue');
	// increment value of count
	count++;
	// card value becomes the current element
	currentCardValue = element.classList[1];
}

// function turns cards back over face down
function clearBoard() { 
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate');
		element.classList.remove('blue');
		element.classList.add('purple');
		// the current card value becomes the last
		lastCardValue = currentCardValue;
		// clear current value so it can be reassigned
		currentCardValue = '';
		// reset count
		count = 0;
	})
}

// resets game
const init = () => { 
	// use spread operator to log all cards in array:
	cards = [...card];
	// counter = 0 as user only gets 2 cards to turn at a time
	count = 0;
	// to store value of card so we can match it
	lastCardValue = ''; // e.g. unicorn
	lastCardIndex = ''; // index of last card
	currentCardValue = ''; // e.g. tiger
	matchArray = []; // temp array to store matched cards
	lastCard; // div of last card
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate')
		element.classList.remove('yellow');
		element.classList.add('purple');	
	})
		// cards = [];
		// cards = [...card]
}



cards = cards.forEach((element, index) => {
  element.addEventListener("click", function() {  

  	if(count<1) {
		console.log('first go', 'count:', count)
		// play a card to turn
		displayCard(element, index);

		lastCardIndex = index;
		lastCard = element;
		lastCardValue = element.classList[1];
		console.log('lastCardIndex:', lastCardIndex, 'index:', index);

	// display the elements while count is less than 2
	} else if(count<2) {
		// console.log('second & last go', 'count:', count)
		// play a card to turn
		displayCard(element, index);

		currentCardValue = element.classList[1];
		// THINGS TO DO:
		// 1. CHECK IF CARD IS THE SAME ONE CLICKED
		if(lastCardIndex === index) {
			// reset count
			count = 0;
			// call displayCard again 
			displayCard(element, index);

			// checkSameCard();
		// 2. CHECK IF IT IS A MATCH
		} else {
			if(currentCardValue === lastCardValue) {
				// 2B. IF A MATCH KEEP CARDS FLIPPED OVER - maybe add to a matchedcard array?
				console.log('cards match!')

				// push matching cards into temp array
				matchArray.push(lastCard);
				matchArray.push(element);
				matchArray.forEach(match => {
					match.classList.remove('blue');
					match.classList.add('yellow');
				})		
				// remove matched cards from card array
				cards.forEach((match, i) => {

						if(match === element ) {
							cards.splice(i,1);
						} else if(match === lastCard) {
							cards.splice(i,1);
						}					
				})
				// 2C. CONTINUE GAME
				clearBoard();				
				// checkMatch();
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

	
	})
});

// at beginning of game show all cards then flip over - 5 seconds maybe?

// if reset button is pressed
reset.addEventListener('click', init)

// Call init function to begin game;
init();


// NEED TO RANDOMIZE CARDS!!!