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

describe('MemoryMatrix class', () => {
    describe('Initialization', () => {
        test('initializes correctly', () => {
            const cards = [/* mock cards array */];
            const game = new MemoryMatrix(100, cards);

            expect(game.totalTime).toBe(100);
            expect(game.cardsArray).toBe(cards);
            // Add more expectations as needed
        });
    });

    describe('canFlipCard method', () => {
        test('returns true when card can be flipped', () => {
            const cards = [/* mock cards array */];
            const game = new MemoryMatrix(100, cards);
            game.busy = false;
            game.matchedCards = [];
            game.cardToCheck = null;

            const result = game.canFlipCard(cards[0]);

            expect(result).toBe(true);
        });

        test('returns false when game is busy', () => {
            const cards = [/* mock cards array */];
            const game = new MemoryMatrix(100, cards);
            game.busy = true;

            const result = game.canFlipCard(cards[0]);

            expect(result).toBe(false);
        });

        // Add more tests for different conditions
    });
});