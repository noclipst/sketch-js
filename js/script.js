// TODO: show/hide pixel borders

const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');
const boardWidth = 500; // board width in pixels
generateBoard(256, 16); // default value, 16x16

const pixels = document.querySelectorAll('.pixel');

// ---  event listeners  ---

pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel)));

boardSizeSlider.addEventListener("input", (e) => {
    const sliderValue = e.target.value;

    clearBoard();
    generateBoard((sliderValue * sliderValue), sliderValue); // the first parameter is the total board size, the second is used to calculate each div's size when resizing the board
    boardSizeText.textContent = `Grid size: ${sliderValue} x ${sliderValue}`;
    updatePixelEventListeners(); // once the board is regenerated the mouseover event listener no longer works; needs updating
})

// -------------------------

function generateBoard(totalBoardSize, sliderValue) {
    for (i = 0; i < totalBoardSize; i += 1) {
        const div = document.createElement('div');
        const divSideSize = boardWidth / sliderValue;

        div.className = 'pixel';
        div.id = `pixel-${i + 1}`;
        div.style.height = `${divSideSize}px`;
        div.style.width = `${divSideSize}px`;
        sketchboard.appendChild(div);
        console.log(`Generated pixel number ${i + 1}`);
    }
}

function changePixelColor(pixel) {
    pixel.style.backgroundColor = "black";
    console.log(`Changing color of pixel to black`);
}

function clearBoard() {
    while (sketchboard.firstChild) {
        sketchboard.removeChild(sketchboard.firstChild);
    }
}

function updatePixelEventListeners() {
    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel)));
}