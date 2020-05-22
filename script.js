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
let matchArray = []; // temp array to store matched cards


// DOM Strings
const timer = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');


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
		// the current card value becomes the last
		// lastCardValue = currentCardValue;
		// lastCard = currentCard;
		// lastCardIndex = currentCardIndex
		
		// clear current value so it can be reassigned
		// currentCardValue = '';
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
	// lastCardValue = ''; // e.g. unicorn
	// lastCardIndex = ''; // index of last card
	// currentCardValue = ''; // e.g. tiger
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

		// lastCardIndex = index;
		// lastCard = element;
		// lastCardValue = element.classList[1];
		// console.log('lastCardIndex:', lastCardIndex, 'index:', index);

	// display the elements while count is less than 2
	} else if(count<=2) {
		console.log('second & last go', 'count:', count)
		// play a card to turn
		displayCard(element, index);

		// currentCardValue = element.classList[1];
		// THINGS TO DO:
		// 1. CHECK IF CARD IS THE SAME ONE CLICKED
		if(lastCardIndex === currentCardIndex) {
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


				currentCard.classList.remove('blue');
				currentCard.classList.add('yellow');
				lastCard.classList.remove('blue');
				lastCard.classList.add('yellow');
				// splice: at position remove item
				// cards.splice(currentCardIndex, 1);
				// cards.splice(lastCardIndex, 1);
				for(let i = 0; i< cards.length; i++) {
					// console.log(cards[i], 'cards[i]')
					if(cards[i] === lastCard || cards[i] === currentCard) {
						console.log(cards, '1')
						cards.splice(i, 1);
						console.log(cards, '2')
					}
				}
				// save last card before overwriting current card
				// lastCardValue = '';
				// lastCard = '';
				// lastCardIndex = '';
				count = 0;

				// push matching cards into temp array
				// matchArray.push(lastCard);
				// matchArray.push(element);
				// matchArray.forEach(match => {
				// 	match.classList.remove('blue');
				// 	match.classList.add('yellow');
				// })		
				// // remove matched cards from card array
				// cards.forEach((match, i) => {
				// 		if(match === element ) {
				// 			cards.splice(i,1);
				// 		} else if(match === lastCard) {
				// 			cards.splice(i,1);
				// 		}					
				// })
				// if(cards.length === 1) {
				// 	matchArray.push(element)
				// }
				// 2C. CONTINUE GAME
				// clearBoard();				
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


// LOG INDEX FOR CURRENT AND LAST - SEEM TO MATCH AT THE MOMENT?
// CHAMGE ALL ELEMENTS TO CURRENT OR LAST TO MAKE CLEARER
