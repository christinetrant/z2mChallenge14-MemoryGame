const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards;
// DOM Strings
const time = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');

// ul to hide and display
const timeUl = document.getElementsByClassName('time-ul')[0]
const movesUl = document.getElementsByClassName('moves-ul')[0]
const resetUl = document.getElementsByClassName('reset-ul')[0]
// variables for modals
const playModal = document.getElementById("playModal");
// Get the button that opens the modal
const playBtn = document.getElementById("playBtn");
const userTime = document.getElementById('userTime');
const userMoves = document.getElementById('userMoves');
// Win Game Modal!
const winModal = document.getElementById("winModal");
// Get the button that will play a new game
const winBtn = document.getElementById("winBtn");


// counter = 0 as user only gets 2 cards to turn at a time
let count, userMove, lastCardValue, currentCardValue, lastCardIndex, currentCardIndex, lastCard, currentCard;

// resets game
const resetGame = () => { 
	// call modal to begin game when ready
	playModal.style.display = 'block';
	
	// counter = 0 as user only gets 2 cards to turn at a time
	count = 0;
	userMove = 0;
	// to store value of card so we can match it
	lastCardValue = ''; // e.g. unicorn
	currentCardValue = ''; // e.g. tiger
	lastCardIndex = ''; // index of last card
	currentCardIndex = ''; // index of current card
	moves.textContent = 0;
	time.textContent = 0;

	// use spread operator to log all cards in array:
	cards = [...card];

	// adds original classes to cards
	cards.forEach((element, index) => {
		element.classList.remove('card-rotate')
		element.classList.remove('yellow');
		element.classList.add('purple');	
	})	
}
// Display a new card
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


// Play Game
const playGame = () => {
	// Call init function to reset game stats and cards;
	resetGame();
	// change text
	reset.textContent = 'Reset Game';
	// if reset button is pressed
	reset.addEventListener('click', resetGame)
	timeUl.classList.add('show');
	movesUl.classList.add('show');
	resetUl.classList.add('show');
	
	// start timer
	timer();

	cards.forEach((element, index) => {
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
					console.log('Match!')
					console.log('current', currentCard)
					console.log('last', lastCard)
					// filter out the cards that are not equal to the current match
					cards = cards.filter(element => {
						return (element !== lastCard && element !== currentCard)
					});
					// 2C. CONTINUE GAME
					clearBoard();	
					userMove++;
					moves.textContent = userMove;			
				// 3. IF NOT A MATCH RESET BOARD
				} else {
					// clear board in 1 second as 2 cards will be showing
					setTimeout(clearBoard, 1000);
					userMove++;
					moves.textContent = userMove;
				}
			}
		// count equals 2 - reset count	
		} else if(count === 2) {
			clearBoard();
			userMove++;
			moves.textContent = userMove;
		}
		// if there are no more cards in array - user has won
		if(cards.length<1) {
			// console.log('You win! Game Over')
			winModal.style.display = "block";
			userTime.textContent = `Time Taken: ${time.textContent} seconds`;
			userMoves.textContent = `Total Moves: ${userMove}`;
		}	
	})
});
}
// Event Listener for Play Game
reset.addEventListener('click', playGame);



// Modal functions
// When the user clicks the button, play game and hide modal
playBtn.addEventListener('click', () => {
  playGame();
  playModal.style.display = "none";
})

// When the user clicks the button play a new game
winBtn.addEventListener('click', () => {
  playGame();
  winModal.style.display = "none";
  // playModal.style.display = "none";
})