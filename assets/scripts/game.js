class MemoryMatrix {
    // Constructor to initialize the game with totalTime and cards
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }

    // Method to start the game
    startGame() {
        // Initialize game variables
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;

        // Shuffle cards and start countdown after a delay
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);

        // Hide cards, update timer and click counter
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;

        // Fetch a random quote when the game starts
        this.fetchRandomQuote();
    }

    // Method to start the countdown
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    // Method called when the game is over
    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }

    // Method called when the player wins
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
    }

    // Method to hide all cards
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    // Method to handle card flipping
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;

            // Check for a card match or mismatch
            if (this.cardToCheck) {
                card.classList.add('visible');
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
                card.classList.add('visible');
            }
        }
    }

    // Method to check if two flipped cards match
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    // Method called when two cards match
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');

        // Check for victory if all cards are matched
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    // Method called when two cards do not match
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    // Method to shuffle cards using Fisher-Yates Shuffle Algorithm
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }

    // Method to get the background color of a card
    getCardType(card) {
        return card.querySelector('.card-front').style.backgroundColor;
    }

    // Method to check if a card can be flipped
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    // Method to fetch a random quote
    async fetchRandomQuote() {
        const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29a8e59729msh875a19000269704p1c138fjsn880dfdc38fea',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            // You can use the quote data as needed in your game
        } catch (error) {
            console.error(error);
        }
    }
}

// Event listener to initialize the game when the DOM is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Function to initialize the game and set up event listeners
async function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MemoryMatrix(100, cards);

    // Fetch a random quote when the game is ready
    await game.fetchRandomQuote();

    // Add event listeners to overlays and cards
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

// Initial test for Jest Environment
function sum(a, b) {
    return a + b;
}

// Export functions and the MemoryMatrix class for testing
module.exports = { sum, ready, MemoryMatrix };