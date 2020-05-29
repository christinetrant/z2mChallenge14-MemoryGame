const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
let cards = [...card];
// counter = 0 as user only gets 2 cards to turn at a time

let count, userMove, lastCardValue, currentCardValue, lastCardIndex, currentCardIndex, lastCard, currentCard;

// DOM Strings
const time = document.getElementById('timer');
const moves = document.getElementById('moves');
const reset = document.getElementById('reset');

// ul to hide and display
const scoreBoard = document.getElementsByClassName('score-ul')[0]
// const timeUl = document.getElementsByClassName('time-ul')[0]
// const movesUl = document.getElementsByClassName('moves-ul')[0]
// const resetUl = document.getElementsByClassName('reset-ul')[0]
// update text content of moves and times
const userTime = document.getElementById('userTime');
const userMoves = document.getElementById('userMoves');
// Win Game Modal!
const winModal = document.getElementById('winModal');
// Get the button that will play a new game
// const winBtn = document.getElementById("winBtn");
// variables for modals
const playModal = document.getElementById('playModal');
// Get the button that opens the modal
// const playBtn = document.getElementById("playBtn");
const playBtn = document.querySelectorAll('.playBtn');

// Shuffle Cards
const shuffleCards = (arr) => {
	// Shuffle Cards [Fisher Yates Shuffle]
	for(let i = arr.length - 1; i > 0; i--){
	  const j = Math.floor(Math.random() * i);
	  // swap elements array[i] and array[j]
	  const temp = arr[i];
	 	arr[i] = arr[j];
	  arr[j] = temp;
	} 
	// assignCards();
	console.log('shuf arr', arr)
	return arr;
}

// Play Game
// const playGame = () => {
// 	// Call init function to reset game stats and cards;
// 	// resetGame();

// 	scoreBoard.classList.add('show');
// 	// start timer
// 	// timer();

// 	// MAKE EVENT LISTENER A FUNCTION THEN WE CAN DISABLE FOR MATCHED CARDS
// 	cards.forEach((element, index) => {
//   element.addEventListener("click", function() {  

//   	if(count<1) {
// 			console.log('first go', 'count:', count)
// 			// play a card to turn
// 			displayCard(element, index);
// 		// display the elements while count is less than 2
		
// 		} else if(count<=2) {
// 			console.log('second & last go', 'count:', count)
// 			// play a card to turn
// 			displayCard(element, index);
// 			// THINGS TO DO:
// 			// 1. CHECK IF CARD IS THE SAME ONE CLICKED
// 			if(lastCardIndex === currentCardIndex) {
// 				// reset count
// 				count = 0;
// 				// call displayCard again 
// 				displayCard(element, index);
// 			// 2. CHECK IF IT IS A MATCH
// 			} else {
// 				if(currentCardValue === lastCardValue) {
// 					// 2B. IF A MATCH KEEP CARDS FLIPPED OVER
// 					currentCard.classList.remove('blue');
// 					currentCard.classList.add('yellow');
// 					currentCard.classList.add('disable');
// 					lastCard.classList.remove('blue');
// 					lastCard.classList.add('yellow');
// 					lastCard.classList.add('disable');
// 					console.log('Match!')
					
// 					// filter out the cards that are not equal to the current match
// 					cards = cards.filter(element => {
// 						return (element !== lastCard && element !== currentCard)
// 					});
// 					// 2C. CONTINUE GAME
// 					clearBoard();	
// 					userMove++;
// 					moves.textContent = userMove;			
// 				// 3. IF NOT A MATCH RESET BOARD
// 				} else {
// 					// clear board in 1 second as 2 cards will be showing
// 					setTimeout(clearBoard, 1000);
// 					userMove++;
// 					moves.textContent = userMove;
// 				}
// 			}
// 		// count equals 2 - reset count	
// 		} else if(count === 2) {
// 			clearBoard();
// 			userMove++;
// 			moves.textContent = userMove;
// 		}
// 		// if there are no more cards in array - user has won
// 		if(cards.length<1) {
// 			// console.log('You win! Game Over')
// 			winModal.style.display = "block";
// 			userTime.textContent = `Time Taken: ${time.textContent} seconds`;
// 			userMoves.textContent = `Total Moves: ${userMove}`;
// 		}	
// 	})
// });
// }
// // Event Listener for Play Game
// reset.addEventListener('click', playGame);

// // resets game
// const resetGame = () => { 
	
// 	// counter = 0 as user only gets 2 cards to turn at a time
// 	count = 0;
// 	userMove = 0;
// 	moves.textContent = 0;
// 	time.textContent = 0;

// 	// to store value of card so we can match it
// 	lastCardValue = ''; // e.g. unicorn
// 	currentCardValue = ''; // e.g. tiger
// 	lastCardIndex = ''; // index of last card
// 	currentCardIndex = ''; // index of current card
// 	lastCard = ''; // div of last card
// 	currentCard = ''; // div of current card

// 	// call modal to begin game when ready
// 	// playModal.style.display = 'block';
	
// 	playModal.style.display = "none";
// 	console.log('Im here')
// 	winModal.style.display = "none";

// 	// adds original classes to cards
// 	cards.forEach((element, index) => {
// 		element.classList.remove('card-rotate')
// 		element.classList.remove('yellow');
// 		element.classList.add('purple');	
// 	})	

// 	// Shuffle Cards
// 	let shuffled = shuffleCards(cards);

// 	shuffled.forEach((el, i) => {
// 			cards[i].classList = el.classList;
// 			cards[i].childNodes[1].childNodes[3].textContent = el.childNodes[1].childNodes[3].textContent
// 		})
// 	console.log(cards)
	

// 	reset.addEventListener('click', reloadPage)

// 	// playGame();
// }


// Display a new card
const displayCard = () => {
	console.log(event.target)
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


cards.forEach(card => card.addEventListener('click', displayCard))




// function turns cards back over face down
const clearBoard = () => { 
	cards.forEach((element, index) => {
		element.classList.remove('card-rotate');
		element.classList.remove('blue');
		element.classList.add('purple');
		// reset count
		count = 0;
	})
}

// Timer function
const timer = () => {
  let i = 0;
  let timer = setInterval(function() {
    time.textContent = i;
    i++;
    // stop timer if game is reset or game is won
    // if(playModal.style.display === 'block' || winModal.style.display === 'block') {
    if(winModal.style.display === 'block') {
      clearTimeout(timer);
      // i=0;
    }
  }, 1000); //roughly 1 second
}


// Modal functions
// When the user clicks the button, play game and hide modal
// for(let i=0; i<playBtn.length;i++) {
// playBtn[i].addEventListener('click', () => {
// 	displayCard();
// });
// }
// When the user clicks the button play a new game
// winBtn.addEventListener('click', reloadPage)
// winBtn.addEventListener('click', resetGame)

// at beginning of game show all cards then flip over - 5 seconds maybe?
