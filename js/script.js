const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');
const showGridCheckbox = document.getElementById('show-grid-checkbox');
const rainbowBtn = document.getElementById('rainbow-button');
const randomColorBtn = document.getElementById('random-color-button');
const resetBoardBtn = document.getElementById('clear-board-button');
const erasePixelBtn = document.getElementById('erase-pixel-button');

const boardWidth = 500; // width in pixels
const initialBoardSize = 256; // default board size
const initialPixelSize = 31.25; // and pixel width and height for that size

let isRainbowModeActive = false;
let isRandomColorModeActive = false;
let isErasePixelModeActive = false;
let isMousePressed = false;

generateBoard(initialBoardSize, initialPixelSize);

const pixels = document.querySelectorAll('.pixel');

// -------------  event listeners  ---------------

sketchboard.addEventListener('mousedown', () => { // supposed to fix dragging behavior on the board
    isMousePressed = true;
});

sketchboard.addEventListener('mouseup', () => { // supposed to fix dragging behavior on the board
    isMousePressed = false;
});

pixels.forEach(pixel => {
    pixel.addEventListener('mouseover', () => { // supposed to fix dragging behavior on the board
      if (isMousePressed) {
        changePixelColor(pixel);
      }
    });
});

sketchboard.addEventListener('dragstart', (e) => { // supposed to fix dragging behavior on the board
    e.preventDefault();
});

boardSizeSlider.addEventListener("input", (e) => { // handles board size slider
    const sliderValue = e.target.value;

    clearBoard();
    generateBoard((sliderValue * sliderValue), (boardWidth / sliderValue)); // the first parameter is the total board size, the second is width and height of each pixel for the given slider value
    boardSizeText.textContent = `Grid size: ${sliderValue} x ${sliderValue}`;
    updatePixelEventListeners(); // once the board is regenerated all the pixel event listeners stop working, need updating
})

showGridCheckbox.addEventListener("input", function() { // handles show/hide grid functionality
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

rainbowBtn.addEventListener('click', () => { // handles random color button
    if (isRainbowModeActive) {
        isRainbowModeActive = false;
        rainbowBtn.classList.remove('rainbow-button_clicked');
    } else {
        isRainbowModeActive = true;
        isRandomColorModeActive = false;
        isErasePixelModeActive = false; // ensures that these three modes are mutually exclusive

        if (randomColorBtn.classList.contains('random-color-button_clicked')) { // deselects the other button
            randomColorBtn.classList.remove('random-color-button_clicked');
        }

        if (erasePixelBtn.classList.contains('erase-pixel-button_clicked')) { // deselects the other button
            erasePixelBtn.classList.remove('erase-pixel-button_clicked');
        }

        rainbowBtn.classList.add('rainbow-button_clicked');
    }
})

randomColorBtn.addEventListener('click', () => { // handles rainbow color button
    if (isRandomColorModeActive) {
        isRandomColorModeActive = false;
        randomColorBtn.classList.remove('random-color-button_clicked');
    } else {
        isRandomColorModeActive = true;
        isRainbowModeActive = false;
        isErasePixelModeActive = false; // ensures that these three modes are mutually exclusive

        if (rainbowBtn.classList.contains('rainbow-button_clicked')) { // deselects the other button
            rainbowBtn.classList.remove('rainbow-button_clicked');
        }

        if (erasePixelBtn.classList.contains('erase-pixel-button_clicked')) { // deselects the other button
            erasePixelBtn.classList.remove('erase-pixel-button_clicked');
        }

        randomColorBtn.classList.add('random-color-button_clicked');
    }
})

erasePixelBtn.addEventListener('click', () => { // handles erase pixel button
    if (isErasePixelModeActive) {
        isErasePixelModeActive = false;
        erasePixelBtn.classList.remove('erase-pixel-button_clicked');
    } else {
        isErasePixelModeActive = true;
        isRainbowModeActive = false;
        isRandomColorModeActive = false // ensures that these three modes are mutually exclusive

        if (rainbowBtn.classList.contains('rainbow-button_clicked')) { // deselects the other button
            rainbowBtn.classList.remove('rainbow-button_clicked');
        }

        if (randomColorBtn.classList.contains('random-color-button_clicked')) { // deselects the other button
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
        const color = Math.floor(Math.random() * 7);

        switch (color) {
            case 0: 
                pixel.style.backgroundColor = 'violet';
                break;
            case 1: 
                pixel.style.backgroundColor = 'indigo';
                break;
            case 2: 
                pixel.style.backgroundColor = 'blue';
                break;
            case 3: 
                pixel.style.backgroundColor = 'green';
                break;
            case 4: 
                pixel.style.backgroundColor = 'yellow';
                break;
            case 5: 
                pixel.style.backgroundColor = 'orange';
                break;
            case 6: 
                pixel.style.backgroundColor = 'red';
                break;
        }
    } else if (isRandomColorModeActive) {
        pixel.style.backgroundColor = `rgb(${getRandomRgbValue()}, ${getRandomRgbValue()}, ${getRandomRgbValue()})`;
    } else {
        pixel.style.backgroundColor = "black";
    }
}

function clearBoard() {
    while (sketchboard.firstChild) {
        sketchboard.removeChild(sketchboard.firstChild);
    }
}

function updatePixelEventListeners() {
    const pixels = document.querySelectorAll('.pixel');


    sketchboard.addEventListener('mousedown', () => {
        isMousePressed = true;
    });
    
    sketchboard.addEventListener('mouseup', () => {
        isMousePressed = false;
    });
    
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
          if (isMousePressed) {
            changePixelColor(pixel);
          }
        });
    });
    
    sketchboard.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

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