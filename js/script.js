// TODO: show/hide pixel borders

const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');

generateBoard(256); // default value, 16x16

const pixels = document.querySelectorAll('.pixel');

// ---  event listeners  ---

pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel)));

boardSizeSlider.addEventListener("input", (e) => {
    const sliderValue = e.target.value;

    clearBoard();
    generateBoard(sliderValue * sliderValue);
    boardSizeText.textContent = `Grid size: ${sliderValue} x ${sliderValue}`;
    resizePixels(sliderValue);
    updatePixelEventListeners(); // once the board is regenerated the mouseover event listener no longer works; needs updating
})

// -------------------------

function generateBoard(size) {
    for (i = 0; i < size; i += 1) {
        const div = document.createElement('div');
        div.className = 'pixel';
        div.id = `pixel-${i}`;
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

function resizePixels(boardSize) {
    const pixelDiv = document.querySelectorAll('.pixel');
    const sketchboardDivWidth = 450; 

    const pixelWidth = sketchboardDivWidth / boardSize;
    
    pixelDiv.forEach(pixel => pixel.style.padding = pixelWidth);
}