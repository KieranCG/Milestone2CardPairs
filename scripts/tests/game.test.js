/**
 * @jest-environment jsdom
 */

const { sum, ready } = require('../game');

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