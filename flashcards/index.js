let cards = localStorage.getItem("cards");
if (cards) {
  cards = JSON.parse(cards);
} else {
  cards = [];
}

console.log(cards)

let currentCardIndex = 0;
let currentCard = cards[currentCardIndex];

const showBtn = document.getElementById("show");
const front = document.getElementById("front");
const back = document.getElementById("back");

showBtn.addEventListener("click", function () {
  showBack();
});

const stages = document.getElementsByClassName("stage");

for (let i = 0; i < stages.length; i++) {
  let stage = stages[i];
  stage.addEventListener("click", function (e) {
    nextCard();
  });
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  currentCard = cards[currentCardIndex];
  updateCards();
  hideBack();
}

function updateCards() {
  front.innerText = currentCard.front;
  back.innerText = currentCard.back;
}

function showBack() {
  back.removeAttribute("class");
}

function hideBack() {
  back.setAttribute("class", "hidden");
}
