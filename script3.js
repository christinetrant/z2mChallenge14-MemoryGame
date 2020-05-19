const card = document.getElementsByClassName('card');
// use spread operator to log all cards in array:
const cards = [...card];
// console.log(cards)
const oneCard = document.getElementsByClassName('card')[0];

let inner = document.getElementsByClassName('card-inner')[0];

// oneCard.addEventListener('click', function() {
// 	console.log('clicked!', oneCard)
// 	oneCard.classList.toggle('card-rotate');
// })

// Object.keys(card).map((key, index) => {
// 	console.log(card[key].classList[2], index);
// });

// cards.forEach(item => item.classList)



const newArray = cards.forEach((item) => {
  // console.log(item.classList[2]);
});

// cards.forEach((item) => {
//   item.addEventListener('click', function() {
// 		item.classList.toggle('card-rotate');
// 		count++;
// 		console.log(item.classList[2], count)
// 	})
// })
// if classlist doesnt equal first card return to normal - count = 0 & noTurnedCards()  have count as 0 in a loop one card turned count ++, cant go over 2, put first card in let firstCard check against second?
// const checkMatch = (item) => {
// 	if(item)
// }
// counter = 0 as user only gets 2 cards to turn at a time
let count = 0;

// function turns cards back over face down
const noTurnedCards = () => {
	cards.forEach(item => {
		item.classList.remove('card-rotate')
		item.classList.remove('active');
		item.classList.remove('blue');
		item.classList.add('purple');
		// count = 0;
	})
}

// iterate through array to add event listener on each card
cards.forEach((item, i, arr) => {
	// let currentCard = '';
  item.addEventListener('click', function(event) {

		// let currentCard = i;
  	// if counter is less than 2 user can flip a card and count goes up by one
  	if(count<2) {
  		

  	// 	// remove eventListener so it doesn't count as clicked twice
			// event.target.addEventListener('click', function() {
			// // 	if(currentCard === i) {
			// 		console.log('Same card clicked twice!!!')
			// 		if(count === 1) {
			// 			count === 1;
			// 		} else if(count === 2) {
			// 			count === 2;
			// 		}
			// // 		count--;
			// // 	}
			// })


  		// console.log('item:', item, 'i:', i, 'arr[i]:',arr[i])
			item.classList.add('card-rotate');
			// change color of overturned cards
			item.classList.add('active');
			item.classList.remove('purple');
			item.classList.add('blue');
			count++;
			// currrentCard = -1;
			

			console.log(item.classList[2], count)
		// once 2 cards are flipped the counter resets and cards are turned back over
		} else if(count === 2){
			console.log('count over 3')
			noTurnedCards();
			count = 0;
			// currrentCard = -1;
		}
	})




			// if(currentCard === item[i]) {
			// 	console.log('Same card clicked')
				// item.removeEventListener('click', noTurnedCards);
				// currrentCard = '';
				// count --;
			// }
})



// at beginning of game show all cards then flip over - 5 seconds maybe?





// displayCard = () => {

// }
