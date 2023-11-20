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
    let overlays, cards, game;

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
