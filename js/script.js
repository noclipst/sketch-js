const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');
const showGridCheckbox = document.getElementById('show-grid-checkbox');
const rainbowBtn = document.getElementById('rainbow-button');
const randomColorBtn = document.getElementById('random-color-button');
const resetBoardBtn = document.getElementById('clear-board-button');
const erasePixelBtn = document.getElementById('erase-pixel-button');

const boardWidthPx = 500;
const initialBoardSize = 256;
const initialPixelSize = 31.25;

let isRainbowModeActive = false;
let isRandomColorModeActive = false;
let isErasePixelModeActive = false;
let isMousePressed = false;

generateBoard(initialBoardSize, initialPixelSize);

const pixels = document.querySelectorAll('.pixel');

// -------------  event listeners  ---------------

sketchboard.addEventListener('mousedown', () => (isMousePressed = true));

sketchboard.addEventListener('mouseup', () => (isMousePressed = false));

pixels.forEach(pixel => {
    pixel.addEventListener('mouseover', () => {
      if (isMousePressed) {
        changePixelColor(pixel);
      }
    });
});

sketchboard.addEventListener('dragstart', (e) => (e.preventDefault()));

boardSizeSlider.addEventListener("input", (e) => {
    const sliderValue = e.target.value;

    clearBoard();
    generateBoard((sliderValue * sliderValue), (boardWidthPx / sliderValue));
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

rainbowBtn.addEventListener('click', () => {
    if (isRainbowModeActive) {
        isRainbowModeActive = false;
        rainbowBtn.classList.remove('rainbow-button_clicked');
    } else {
        isRainbowModeActive = true;
        isRandomColorModeActive = false;
        isErasePixelModeActive = false;

        if (randomColorBtn.classList.contains('random-color-button_clicked')) {
            randomColorBtn.classList.remove('random-color-button_clicked');
        }

        if (erasePixelBtn.classList.contains('erase-pixel-button_clicked')) {
            erasePixelBtn.classList.remove('erase-pixel-button_clicked');
        }

        rainbowBtn.classList.add('rainbow-button_clicked');
    }
})

randomColorBtn.addEventListener('click', () => {
    if (isRandomColorModeActive) {
        isRandomColorModeActive = false;
        randomColorBtn.classList.remove('random-color-button_clicked');
    } else {
        isRandomColorModeActive = true;
        isRainbowModeActive = false;
        isErasePixelModeActive = false;

        if (rainbowBtn.classList.contains('rainbow-button_clicked')) {
            rainbowBtn.classList.remove('rainbow-button_clicked');
        }

        if (erasePixelBtn.classList.contains('erase-pixel-button_clicked')) {
            erasePixelBtn.classList.remove('erase-pixel-button_clicked');
        }

        randomColorBtn.classList.add('random-color-button_clicked');
    }
})

erasePixelBtn.addEventListener('click', () => {
    if (isErasePixelModeActive) {
        isErasePixelModeActive = false;
        erasePixelBtn.classList.remove('erase-pixel-button_clicked');
    } else {
        isErasePixelModeActive = true;
        isRainbowModeActive = false;
        isRandomColorModeActive = false

        if (rainbowBtn.classList.contains('rainbow-button_clicked')) {
            rainbowBtn.classList.remove('rainbow-button_clicked');
        }

        if (randomColorBtn.classList.contains('random-color-button_clicked')) {
            randomColorBtn.classList.remove('random-color-button_clicked');
        }

        erasePixelBtn.classList.add('erase-pixel-button_clicked');
    }
})

resetBoardBtn.addEventListener('click', () => {
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
})


// ---------------------------------------------------------------------------------------

function generateBoard(totalBoardSize, divSideSize) {
    for (i = 0; i < totalBoardSize; i += 1) {
        const div = document.createElement('div');

        div.className = 'pixel';
        div.style.height = `${divSideSize}px`;
        div.style.width = `${divSideSize}px`;
        sketchboard.appendChild(div);
    }
}

function changePixelColor(pixel) {
    if (isErasePixelModeActive) {
        pixel.style.backgroundColor = 'white';
    } else if (isRainbowModeActive) {
        const colorNumber = Math.floor(Math.random() * 7);
        const pixelColorConfig = {
            [0]: "violet",
            [1]: "indigo",
            [2]: "blue",
            [3]: "green",
            [4]: "yellow",
            [5]: "orange",
            [6]: "red",
        }

        pixel.style.backgroundColor = pixelColorConfig[colorNumber];
    } else if (isRandomColorModeActive) {
        pixel.style.backgroundColor = `rgb(${getRandomRgbValue()}, ${getRandomRgbValue()}, ${getRandomRgbValue()})`;
    } else {
        pixel.style.backgroundColor = "black";
    }
}

function clearBoard() {
    sketchboard.replaceChildren();
}

function updatePixelEventListeners() {
    const pixels = document.querySelectorAll('.pixel');
    
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
          if (isMousePressed) {
            changePixelColor(pixel);
          }
        });
    });
    
    sketchboard.addEventListener('dragstart', (e) => (e.preventDefault()));

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

    resetBoardBtn.addEventListener('click', () => {
        pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
    })
}

function getRandomRgbValue() {
    return Math.floor(Math.random() * 256)
} 