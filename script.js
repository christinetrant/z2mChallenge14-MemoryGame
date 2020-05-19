const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
const cards = [...card];

// DOM Strings
const timer = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');
// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;
// to store value of card so we can match it
let lastCardValue = '';
let lastCardIndex = '';
let currentCardValue = '';
// let matchArray = [];
// let lastCard;

const checkMatch = () => {}
const checkSameCard = () => {}
// if(lastCardIndex !== index) {
// 			displayCard(element, index);
// 			console.log('lastCard: ', lastCardIndex, 'index: ', index)

// 			// check for match:
// 			if(lastCardValue === element.classList[1]){
// 				console.log('it\'s a match!');
// 				// matchArray.push(element);
// 				// matchArray.push(lastCard);
// 				// console.log('match', matchArray);
// 				// cards.splice(element, 1);
// 				// cards.splice(lastCard, 1);
// 				// console.log('cards', cards);
// 			}
// 		} else {
// 			// if(element.classList.contains('active')) {
// 				console.log('count < 2 card already active', lastCardIndex, index)
// 				// count=1;
// 				// LASTCARDINDEC REMOVE EVENT LISTENER
// 				clearBoard();
// 			// 	console.log('count', count);
// 			}


// function checkCount(element, index) {
// 	if(count<1) {
// 		console.log('first go', count)
// 		displayCard(element, index);

// 		lastCardIndex = index;
// 		lastCard = element;
// 		lastCardValue = element.classList[1];
// 		console.log(lastCardIndex, index);
// 	} else if(count<2) {
// 		console.log('second & last go', count)
// 		displayCard(element, index);
// 		// display the elements while count is less than 2
// 		// while(count<2) {

// 			// THINGS TO DO:
// 			// 1. CHECK IF CARD IS THE SAME ONE CLICKED
// 			// 2. CHECK IF IT IS A MATCH
// 			// 	2B. IF A MATCH KEEP CARDS FLIPPED OVER
// 			// 	2C. CONTINUE GAME
// 			// 3. IF NOT A MATCH RESET BOARD
			
// 			// checkMatch();
// 			// checkSameCard();
		
// 		// }

// 		// otherwise reset the board in 1.5 seconds as 2 cards will be showing
// 		setTimeout(clearBoard, 1500);
// 	} else if(count === 2) {
// 		console.log('count equals 2 - reset count', count)
// 		clearBoard();
// 	}
// }


















function displayCard(element, index) {
	// add classes to rotate card
	element.classList.add('card-rotate');
	// change color of overturned cards
	element.classList.remove('purple');
	element.classList.add('blue');
	// increment value of count
	count++;
	console.log(element.classList[1])
	// item.classList[2]
}

// function turns cards back over face down
function clearBoard() { 
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate')
		// element.classList.remove('active');
		element.classList.remove('blue');
		element.classList.add('purple');
		lastCardIndex = '';
		lastCardValue = '';
		count = 0;
	})
}




cards.forEach(function (element, index){
  element.addEventListener("click", function() {  

  	// checkCount(element, index);

  	if(count<1) {
		console.log('first go', 'count:', count)
		displayCard(element, index);

		lastCardIndex = index;
		lastCard = element;
		lastCardValue = element.classList[1];
		console.log('lastCardIndex:', lastCardIndex, 'index:', index);
	} else if(count<2) {
		console.log('second & last go', 'count:', count)
		displayCard(element, index);
		console.log('lastCardIndex:', lastCardIndex, 'index:', index);
		currentCardValue = element.classList[1];
		// display the elements while count is less than 2

		// THINGS TO DO:
		// 1. CHECK IF CARD IS THE SAME ONE CLICKED
		if(lastCardIndex === index) {
			// reset count
			count = 0;
			console.log('same card clicked twice');
			console.log('count', count)
			// call displayCard again 
			displayCard(element, index);

			// checkSameCard();
		// 2. CHECK IF IT IS A MATCH
		} else {
			if(currentCardValue === lastCardValue) {
				// 2B. IF A MATCH KEEP CARDS FLIPPED OVER - maybe add to a matchedcard array?
				// 2C. CONTINUE GAME
				console.log('cards match!')
				// checkMatch();
			// 3. IF NOT A MATCH RESET BOARD
			} else {
				// clear board
				// otherwise reset the board in 1.5 seconds as 2 cards will be showing
				setTimeout(clearBoard, 1500);
			}
		}
	} else if(count === 2) {
		console.log('count equals 2 - reset count', count)
		clearBoard();
	}

	
	})
});

// at beginning of game show all cards then flip over - 5 seconds maybe?


