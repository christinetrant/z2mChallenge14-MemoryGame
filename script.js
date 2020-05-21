const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards = [...card];

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
let matchArray = [];
let lastCard;

const checkMatch = () => {}
const checkSameCard = () => {}


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

// resets game
function resetGame() { 
		lastCardIndex = '';
		lastCardValue = '';
		count = 0;
		cards = [];
		cards = [...card]
		matchArray = [];
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate')
		element.classList.remove('yellow');
		element.classList.add('purple');	
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
				console.log('element', element, 'lastcard', lastCard)
				console.log('lastcard i:', lastCardIndex, 'currcard i:', index)
				matchArray.push(lastCard);
				matchArray.push(element);

				
				console.log('match', matchArray);


				// for(let i=0; i<cards.length;i++) {
				// 	if(cards[i] === element || cards[i] === lastCard ) {
				// 		cards.splice(i,1);
				// 	}
				// }

				cards.forEach((match, i) => {
					if(match === element || match === lastCard ) {
						cards.splice(i,1);
					}
				})
				clearBoard();


				
				
				console.log('lastcard i:', lastCardIndex, 'currcard i:', index)
				console.log('cards', cards);
				matchArray.forEach(match => {
					// match.classList.add('card-rotate');
					match.classList.remove('blue');
					match.classList.add('yellow');
					// clearBoard();
				})
				// checkMatch();
			// 3. IF NOT A MATCH RESET BOARD
			} else {
				// clear board
				// otherwise reset the board in 1.5 seconds as 2 cards will be showing
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
reset.addEventListener('click', resetGame)


// NEED TO RANDOMIZE CARDS!!!