let cards = localStorage.getItem("cards");
if (cards) {
  cards = JSON.parse(cards);
} else {
  cards = [];
}

let currentCardIndex = 0;
let currentCard = cards[currentCardIndex];

const showBtn = document.getElementById("show");
const front = document.getElementById("front");
const back = document.getElementById("back");

showBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showBack();
});

const stages = document.getElementsByClassName("stage");

for (let i = 0; i < stages.length; i++) {
  let stage = stages[i];
  stage.addEventListener("click", function (e) {
    e.preventDefault();

    currentCard.stage = i;
    
    nextCard();
  });
}

function nextCard() {
  let nextCard = null;
  while (currentCardIndex < cards.length && !nextCard) {
    currentCardIndex = (currentCardIndex + 1);

    const card = cards[currentCardIndex];
    const stageToDaysMap = {
      0: 0,
      1: 1,
      2: 2,
      3: 7,
      4: 30
    }

    nextCard = cards[currentCardIndex];
  }

  currentCard = nextCard
  
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
