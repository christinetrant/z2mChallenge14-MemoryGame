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


let testCards = [
	{
		class: 'tiger',
		text: '🐯',
	},
	{
		class: 'dolphin',
		text: '🐬',
	},
	{
		class: 'unicorn', 
		text: '🦄',
	},
	{
		class: 'ghost',
		text: '👻',
	},
	{
		class: 'alien',
		text: '👽',
	},
	{
		class: 'dinosaur',
		text: '🦖',
	},
	{
		class: 'unicorn',
		text: '🦄',
	},
	{
		class: 'tiger',
		text: '🐯',
	},
	{
		class: 'fish',
		text: '🐠',
	},
	{
		class: 'ghost',
		text: '👻',
	},
	{
		class: 'ladybug',
		text: '🐞',
	},
	{
		class: 'fish',
		text: '🐠',
	},
	{
		class: 'ladybug',
		text: '🐞',
	},
	{
		class: 'dolphin',
		text: '🐬',
	},
	{
		class: 'dinosaur',
		text: '🦖',
	},
	{
		class: 'alien',
		text: '👽',
	},
]

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
	return arr;
}

let classTest = testCards.map(item => item.class)
let textTest = testCards.map(item => item.text)

for(let i=0; i<cards.length;i++) {
	// for(let j=0; j<classTest.length;j++) {
		classTest.map((item, i, arr) => {
		cards[i].classList.add(item)
	// }
	})
}
// cards.map(obj => {
// 	testCards.map(c => {
// 	obj.classList.add(c.class)
// 	obj.classList.add('purple')
// 	obj.childNodes[1].childNodes[3].textContent = c.text
// 	})
// })
// arr[i].childNodes[1].childNodes[3].textContent = temp.text
		// arr[i].classList.add(temp.text)
// cards.forEach(item => {
// 	item.childNodes[1].childNodes[3].textContent = .text
// 	item.classList.add(it.class)
// 	item.classList.add('purple')
// })

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
	// timer();

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

// resets game
const resetGame = () => { 
	// call modal to begin game when ready
	playModal.style.display = 'block';
	// use spread operator to log all cards in array:
	cards = [...card];
	// counter = 0 as user only gets 2 cards to turn at a time
	count = 0;
	userMove = 0;
	moves.textContent = 0;
	time.textContent = 0;
	// Shuffle Cards
	// shuffleCards(cards);
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

// Timer function
const timer = () => {
  let i = 0;
  let timer = setInterval(function() {
    console.log(i);
    time.textContent = i;
    i++;
    // stop timer if game is reset or game is won
    if(playModal.style.display === 'block' || winModal.style.display === 'block') {
       clearTimeout(timer);
       i=0;
    }
  }, 1000); //roughly 1 second
}


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
  playModal.style.display = "none";
})


// NEED TO RANDOMIZE CARDS!!!
// at beginning of game show all cards then flip over - 5 seconds maybe?
