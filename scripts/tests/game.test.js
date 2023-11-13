/**
 * @jest-environment jsdom
 */

const { sum, ready, MemoryMatrix } = require('../game');

//Baseline test for peace of mind.
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

describe('ready function', () => {
    test('should remove class "visible" from overlays on click', () => {
        document.body.innerHTML = `
      <div class="overlay-text visible">Overlay 1</div>
      <div class="overlay-text visible">Overlay 2</div>
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
    `;
        ready();
        const overlays = document.getElementsByClassName('overlay-text');
        overlays[0].dispatchEvent(new Event('click'));

        expect(overlays[0].classList.contains('visible')).toBe(false);
        expect(overlays[1].classList.contains('visible')).toBe(true);
    });
});

describe('startGame function', () => {
    test('should initialize game state correctly', () => {
        document.body.innerHTML = `
          <h1 class="page-title">Memory Matrix</h1>
          <div class="overlay-text visible">Click to Start</div>
          <div id="game-over-text" class="overlay-text">
            GAME OVER
            <span class="overlay-text-small">Click to Restart</span>
          </div>
          <div id="victory-text" class="overlay-text">
            VICTORY
            <span class="overlay-text-small">Click to Restart</span>
          </div>
          <div class="game-container">
            <div class="game-info-container">
              <div class="game-info">Time <span id="time-remaining">100</span></div>
              <div class="game-info">Flips <span id="flips">0</span></div>
            </div>
            <div class="card">
              <div class="card-back card-face"></div>
              <div class="card-front card-face"></div>
            </div>
          </div>
        `;

        const mockCards = document.getElementsByClassName('card');

        const game = new MemoryMatrix(100, mockCards);
        game.startGame();

        expect(game.cardToCheck).toBe(null);
        expect(game.totalClicks).toBe(0);
        expect(game.timeRemaining).toBe(100);
        expect(game.matchedCards).toEqual([]);
        expect(game.busy).toBe(true);
    });
});
