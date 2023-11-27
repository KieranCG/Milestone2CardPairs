/**
 * @jest-environment jsdom
 */

const { sum, ready, MemoryMatrix } = require('../game');

// Declare variables outside beforeEach for access in other tests
let overlays, cards, game;

// Set up the DOM or any necessary environment before running tests
beforeAll(() => {
    // Read the contents of 'index.html' and write to the DOM
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// Baseline test for peace of mind.
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('ready function', () => {
    beforeEach(() => {
        overlays = Array.from(document.getElementsByClassName('overlay-text'));
        cards = Array.from(document.getElementsByClassName('card'));
        game = new MemoryMatrix(100, cards);

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
    });

    test('Overlay click should hide the overlay and start the game', () => {
        overlays[0].click(); // Simulate a click

        expect(overlays[0].classList.contains('visible')).toBe(false); // Check if overlay class 'visible' is removed
    });
});

describe('Card Flipping', () => {
    test('Flipping a card increments the total clicks counter', (done) => {
        const initialClicks = game.totalClicks;
        cards[0].click(); // Simulate a card click

        // Introduce a small delay to allow the flipCard method to complete
        setTimeout(() => {
            expect(game.totalClicks).toBe(initialClicks + 1);
            done();
        }, 100);
    });

    test('Flipping a card updates the flips counter element', (done) => {
        cards[0].click(); // Simulate a card click

        // Introduce a small delay to allow the flipCard method to complete
        setTimeout(() => {
            expect(parseInt(game.ticker.innerText)).toBe(game.totalClicks);
            done();
        }, 100);
    });

    test('Flipping a card sets the card to visible', (done) => {
        cards[0].click(); // Simulate a card click

        // Introduce a small delay to allow the flipCard method to complete
        setTimeout(() => {
            expect(cards[0].classList.contains('visible')).toBe(true);
            done();
        }, 100);
    });
});