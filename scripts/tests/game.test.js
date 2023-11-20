/**
 * @jest-environment jsdom
 */

const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const { sum, ready, MemoryMatrix } = require('../game');

jest.spyOn(window, "alert").mockImplementation(() => { });

// Set up the DOM or any necessary environment before running tests
beforeAll(() => {
    // Read the contents of 'index.html' and write to the DOM
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

//Baseline test for peace of mind.
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('ready function', () => {
    let overlays, cards;

    beforeEach(() => {
        // Assuming 'game' object is available from the 'game' module
        // ... (Your setup code from the previous response)

        overlays = Array.from(document.getElementsByClassName('overlay-text'));
        cards = Array.from(document.getElementsByClassName('card'));

        // Assuming the 'game' object is correctly imported from the 'game' module
        game = new game.MemoryMatrix(100, cards);

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
        // Add further assertions for game state after starting the game
    });

    // Add more tests to simulate card clicks and check game behavior
});

describe('startGame function', () => {
    test('should initialize game state correctly', () => {
        // Instantiate the MemoryMatrix object before manipulating the document
        const mockCards = document.getElementsByClassName('card');
        const game = new MemoryMatrix(100, mockCards);
        game.startGame();

        document.body.innerHTML = `
            <!-- Your HTML structure -->
        `;

        // Assertions for the game state
        expect(game.cardToCheck).toBe(null);
        expect(game.totalClicks).toBe(0);
        expect(game.timeRemaining).toBe(100);
        expect(game.matchedCards).toEqual([]);
        expect(game.busy).toBe(true);
    });
});

describe('MemoryMatrix', () => {
    let mockCards;
    let game;

    beforeEach(() => {
        // Creating a set of mock cards for testing purposes
        mockCards = [
            document.createElement('div'),
            document.createElement('div'),
            // Add as many mock cards as needed for your test cases
        ];

        game = new MemoryMatrix(100, mockCards);
    });

    test('flipCard method should add visible class and increment totalClicks', () => {
        const testCard = mockCards[0]; // Choose a card to test

        game.flipCard(testCard);

        expect(game.totalClicks).toBe(1); // Check if totalClicks was incremented
        expect(testCard.classList.contains('visible')).toBe(true); // Check if the 'visible' class was added
    });

    // Add more test cases as needed
});
