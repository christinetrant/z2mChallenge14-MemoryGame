const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards = [...card];
// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;
let userMove = 0;
// to store value of card so we can match it
let lastCardValue = ''; // e.g. unicorn
let currentCardValue = ''; // e.g. tiger
let lastCardIndex = ''; // index of last card
let currentCardIndex = ''; // index of current card
let lastCard; // div of last card
let currentCard; // div of current card

// DOM Strings
const time = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');

// ul to hide and display
const timeUl = document.getElementsByClassName('time-ul')[0]
const movesUl = document.getElementsByClassName('moves-ul')[0]

// TIMER TO CHANGE!
const timer = () => {
  let i = 1;
  let timer = setInterval(function() {
    // console.log(i);
    time.textContent = i;
    i++;
    if(i > 10) {
       clearInterval(timer);
    }
  }, 1000);
}

// Play Game
const playGame = () => {
	// Call init function to begin game;
	resetGame();
	// change text
	reset.textContent = 'Reset Game';
	// if reset button is pressed
	reset.addEventListener('click', resetGame)
	timeUl.classList.add('show');
	movesUl.classList.add('show');


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
			console.log('You win! Game Over')
			winModal.style.display = "block";
			// moves.textContent = userMove;
			userTime.textContent = `Time Taken: ${time.textContent}`;
userMoves.textContent = `Total Moves: ${userMove}`;
		}	
	})
});
}
// Event Listener for Play Game
reset.addEventListener('click', playGame);

// resets game
const resetGame = () => { 
	// use spread operator to log all cards in array:
	cards = [...card];
	// counter = 0 as user only gets 2 cards to turn at a time
	count = 0;
	// start timer
	timer();
	// adds original classes to cards
	cards.forEach(function (element, index){
		element.classList.remove('card-rotate')
		element.classList.remove('yellow');
		element.classList.add('purple');	
	})
}
// Shuffle Cards [Fisher Yates Shuffle]
for(let i = cards.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * i)
  // swap elements array[i] and array[j]
  const temp = cards[i]
  cards[i] = cards[j]
  cards[j] = temp
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







// NEED TO RANDOMIZE CARDS!!!
// at beginning of game show all cards then flip over - 5 seconds maybe?




// Get the modal
const playModal = document.getElementById("playModal");

// Get the button that opens the modal
const playBtn = document.getElementById("playBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
playBtn.addEventListener('click', function() {
  // playModal.style.display = "block";
  playGame();
  playModal.style.display = "none";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  playModal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == playModal) {
    playModal.style.display = "none";
  }
})

const userTime = document.getElementById('userTime');
const userMoves = document.getElementById('userMoves');
// Win Game Modal!
// Get the modal
const winModal = document.getElementById("winModal");
// Get the button that will play a new game
const winBtn = document.getElementById("winBtn");
// Get the <span> element that closes the modal
const winSpan = document.getElementsByClassName("close")[0];
// When the user clicks the button play a new game
winBtn.addEventListener('click', function() {
  playGame();
  winModal.style.display = "none";
})
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  winModal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == winModal) {
    winModal.style.display = "none";
  }
})



