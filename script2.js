const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
const cards = [...card];

// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;
// to store value of card so we can match it
let lastCardValue = '';
let lastCardIndex = '';
// let matchArray = [];
// let lastCard;





function checkCount() {
	if(count<1) {
		console.log('first go', count)
		displayCard(element, index);

		lastCardIndex = index;
		lastCard = element;
		lastCardValue = element.classList[1];
		console.log(lastCardIndex, index);
	} else if(count<2) {
		console.log('second & last go', count)
		// display the elements while count is less than 2
		while(count<2) {
		
		if(lastCardIndex !== index) {
			displayCard(element, index);
			console.log('lastCard: ', lastCardIndex, 'index: ', index)

			// check for match:
			if(lastCardValue === element.classList[1]){
				console.log('it\'s a match!');
				// matchArray.push(element);
				// matchArray.push(lastCard);
				// console.log('match', matchArray);
				// cards.splice(element, 1);
				// cards.splice(lastCard, 1);
				// console.log('cards', cards);
			}
		} else {
			// if(element.classList.contains('active')) {
				console.log('count < 2 card already active', lastCardIndex, index)
				// count=1;
				// LASTCARDINDEC REMOVE EVENT LISTENER
				clearBoard();
			// 	console.log('count', count);
			}
		}

		// otherwise reset the board in 1.5 seconds as 2 cards will be showing
		setTimeout(clearBoard, 1500);
	} else if(count === 2) {
		console.log('count equals 2 - reset count', count)
		clearBoard();
	}
}















cards.forEach(function (element, index){
  element.addEventListener("click", function() {  

  	checkCount(element, index);
	})
});


function displayCard(element, index) {
	// if(element.classList.contains('active')) {
		// console.log('card already active', index)
		// count = count;
		// console.log('count', count);
	// } else {
		// if(count===2) { 
		// 	setTimeout(clearBoard(), 1500);
		// 	console.log('clear!');
		// }
		// console.log("you clicked card " +index + "!", element);
		// add classes to rotate card
		element.classList.add('card-rotate');
		// change color of overturned cards
		// element.classList.add('active');
		element.classList.remove('purple');
		element.classList.add('blue');
		
		count++;
		
		console.log(element.classList[1])
		// item.classList[2]
	}
// }

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




// at beginning of game show all cards then flip over - 5 seconds maybe?


