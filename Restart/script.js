const card = document.querySelectorAll('.card');
const type = document.getElementsByTagName;
// use spread operator to log all cards in array:
let cards = [...card];
// let count = 0;
const playModal = document.getElementById('playModal');
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
	console.log("Let's play!");
	playModal.style.display = 'none';
})
// Get the button that will play a new game
const winBtn = document.getElementById("winBtn");
// function turns cards back over face down
// const clearBoard = function() { 
// 	card.forEach(item => {
// 		item.classList.remove('card-rotate');
// 		item.classList.remove('blue');
// 		item.classList.add('purple');
// 	})
// 	// reset count
// 	count = 0;
// }
let firstCard;
let hascardbeenflipped = false;


const clearBoard = () => {
	cards.forEach((element) => {
		element.classList.remove('card-rotate');
		element.classList.remove('blue');
		element.classList.add('purple');
		element.classList.remove('disable');
	})
}

const checkMatch = () => {
	let firstType = firstCard.classList[1];
	let secondType = secondCard.classList[1];
	if(firstType === secondType) {
		// 2B. IF A MATCH KEEP CARDS FLIPPED OVER
		firstCard.classList.remove('blue');
		firstCard.classList.add('yellow');
		firstCard.classList.add('disable');
		secondCard.classList.remove('blue');
		secondCard.classList.add('yellow');
		
		console.log('Match!')
		
		// filter out the cards that are not equal to the current match
		cards = cards.filter(element => {
			return (element !== firstCard && element !== secondCard)
		});
	} else {
		// clear board in 1 second as 2 cards will be showing
		setTimeout(clearBoard, 1000);
	}
	hascardbeenflipped = false;
}

const checkWin = () => {
	// if there are no more cards in array - user has won
	if(cards.length<1) {
		// console.log('You win! Game Over')
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
	this.classList.add('disable');
	
	if(!hascardbeenflipped) {
		firstCard = this;
		hascardbeenflipped = true;
	} else {
		secondCard = this;
		checkMatch();
		checkWin();
	}

	// count++;
}


const startGame = () => {
	console.log('Game time!')
card.forEach(item => item.addEventListener('click', displayCard))
}

// Modal functions
// When the user clicks the button, play game and hide modal
playBtn.addEventListener('click', startGame);
// When the user clicks the button play a new game
winBtn.addEventListener('click', startGame)


