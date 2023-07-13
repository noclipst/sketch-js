const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');
const showGridCheckbox = document.getElementById('show-grid-checkbox');

const boardWidth = 500; // board width in pixels
generateBoard(256, 31.25); // default board size (16x16 grid) and pixel width and height for that size

const pixels = document.querySelectorAll('.pixel');

// ---  event listeners  ---

pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel)));

boardSizeSlider.addEventListener("input", (e) => {
    const sliderValue = e.target.value;

    clearBoard();
    generateBoard((sliderValue * sliderValue), (boardWidth / sliderValue)); // the first parameter is the total board size, the second is width and height of each pixel for the given slider value
    boardSizeText.textContent = `Grid size: ${sliderValue} x ${sliderValue}`;
    updatePixelEventListeners(); // once the board is regenerated all the pixel event listeners stop working, need updating
})

showGridCheckbox.addEventListener("input", function() {
    if (this.checked) {
        pixels.forEach(pixel => {
            pixel.classList.add('pixel');
            pixel.classList.remove('pixel_nogrid');
        });
    } else {
        pixels.forEach(pixel => {
            pixel.classList.remove('pixel');
            pixel.classList.add('pixel_nogrid');
        });
    }
})

// -------------------------

function generateBoard(totalBoardSize, divSideSize) {
    for (i = 0; i < totalBoardSize; i += 1) {
        const div = document.createElement('div');

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

    showGridCheckbox.addEventListener("input", function() {
        if (this.checked) {
            pixels.forEach(pixel => {
                pixel.classList.add('pixel');
                pixel.classList.remove('pixel_nogrid');
            });
        } else {
            pixels.forEach(pixel => {
                pixel.classList.remove('pixel');
                pixel.classList.add('pixel_nogrid');
            });
        }
    })
}