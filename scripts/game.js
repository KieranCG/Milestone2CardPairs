class MemoryMatrix {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        // Fetch images from the API
        this.fetchImages().then(images => {
            // Duplicate each image to create matching pairs
            const pairedImages = images.concat(images);

            // Shuffle the paired images
            this.shuffleCards(pairedImages);

            // Update card backgrounds with shuffled images
            this.updateCardBackgrounds(pairedImages);

            setTimeout(() => {
                this.shuffleCards(this.cardsArray);
                this.countdown = this.startCountdown();
                this.busy = false;
            }, 500);

            this.hideCards();
            this.timer.innerText = this.timeRemaining;
            this.ticker.innerText = this.totalClicks;
        });
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        };
    };
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    getCardType(card) {
        return card.querySelector('.card-front').style.backgroundColor;
    }


    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
    }

    //Fisher Yates Shuffle
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    };

    fetchImages() {
        const pexelsClient = createClient('EGtI1qwcVvp5Fd17dEkpE5Y5BR5qTr0jO0qX5cLTfgt7I4TfScIXL9hM');
        const query = 'Nature';

        return pexelsClient.photos.search({ query, per_page: 10 })
            .then(photos => photos.map(photo => photo.src.large))
            .catch(error => {
                console.error('Error fetching images:', error);
                return [];
            });
    }

    updateCardBackgrounds(images) {
        this.cardsArray.forEach((card, index) => {
            const cardFront = card.querySelector('.card-front');
            cardFront.style.backgroundImage = `url(${images[index]})`;
        });
    }
};

// To allow the overlay to work the javascript needs to load at the same time.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MemoryMatrix(100, cards);

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

import { createClient } from 'pexels';

const pexelsClient = createClient('EGtI1qwcVvp5Fd17dEkpE5Y5BR5qTr0jO0qX5cLTfgt7I4TfScIXL9hM');

// All requests made with the client will be authenticated
const query = 'Tigers';

// The variable name should be 'pexelsClient' instead of 'client'
pexelsClient.photos.search({ query, per_page: 1 }).then(photos => {...});



const PexelsAPI = require('pexels-api-wrapper');


// Intial test for Jest Environment
function sum(a, b) {
    return a + b;
};

module.exports = { sum, ready, MemoryMatrix };