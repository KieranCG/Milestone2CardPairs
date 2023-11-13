// To allow the overlay to work the javascript needs to load at the same time.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            // game.startGame();
        });
    });
}

// Intial test for Jest Environment
function sum(a, b) {
    return a + b;
}
module.exports = { sum, ready };