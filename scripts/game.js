// To allow the overlay to work the javascript needs to load at the same time.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {

}

// Intial test for Jest Environment
function sum(a, b) {
    return a + b;
}
module.exports = sum;