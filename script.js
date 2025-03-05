const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restart");

const emojis = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🍓", "🥝"];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create cards
function createBoard() {
    gameBoard.innerHTML = "";
    cards = shuffle(cards);
    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.textContent = this.dataset.emoji;
        this.classList.add("flipped");
        flippedCards.push(this);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            alert("You Win!");
        }
    } else {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }
    flippedCards = [];
}

// Restart game
restartButton.addEventListener("click", () => {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
});

// Initialize game
createBoard();
