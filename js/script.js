// TODO: change the code so that it reacts to mousehold, not mousehover

const sketchboard = document.getElementById('sketchboard');
const boardSizeSlider = document.getElementById('board-size-slider');
const boardSizeText = document.getElementById('board-size-slider-text');
const showGridCheckbox = document.getElementById('show-grid-checkbox');
const rainbowBtn = document.getElementById('rainbow-button');
const randomColorBtn = document.getElementById('random-color-button');

const boardWidth = 500; // width in pixels
const initialBoardSize = 256; // default board size
const initialPixelSize = 31.25; // and pixel width and height for that size

let isRainbowModeActive = false;
let isRandomColorModeActive = false;

generateBoard(initialBoardSize, initialPixelSize);

const pixels = document.querySelectorAll('.pixel');

// ---  event listeners  ---

pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel))); // handles color change

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
        isRandomColorModeActive = false; // ensures that these two modes are mutually exclusive

        if (randomColorBtn.classList.contains('random-color-button_clicked')) { // deselects the other button
            randomColorBtn.classList.remove('random-color-button_clicked');
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
        isRainbowModeActive = false; // ensures that these two modes are mutually exclusive

        if (rainbowBtn.classList.contains('rainbow-button_clicked')) { // deselects the other button
            rainbowBtn.classList.remove('rainbow-button_clicked');
        }

        randomColorBtn.classList.add('random-color-button_clicked');
    }
})

// -------------------------

function generateBoard(totalBoardSize, divSideSize) {
    for (i = 0; i < totalBoardSize; i += 1) {
        const div = document.createElement('div');

        div.className = 'pixel';
        div.style.height = `${divSideSize}px`;
        div.style.width = `${divSideSize}px`;
        sketchboard.appendChild(div);
        console.log(`Generated pixel number ${i + 1}`);
    }
}

function changePixelColor(pixel) {
    if (isRainbowModeActive) {
        const color = Math.floor(Math.random() * 7);

        switch (color) {
            case 0: 
                pixel.style.backgroundColor = 'violet';
                console.log(`Changing color of pixel to violet`);
                break;
            case 1: 
                pixel.style.backgroundColor = 'indigo';
                console.log(`Changing color of pixel to indigo`);
                break;
            case 2: 
                pixel.style.backgroundColor = 'blue';
                console.log(`Changing color of pixel to blue`);
                break;
            case 3: 
                pixel.style.backgroundColor = 'green';
                console.log(`Changing color of pixel to green`);
                break;
            case 4: 
                pixel.style.backgroundColor = 'yellow';
                console.log(`Changing color of pixel to yellow`);
                break;
            case 5: 
                pixel.style.backgroundColor = 'orange';
                console.log(`Changing color of pixel to orange`);
                break;
            case 6: 
                pixel.style.backgroundColor = 'red';
                console.log(`Changing color of pixel to red`);
                break;
        }
    } else if (isRandomColorModeActive) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        console.log(`Changing color to RGB ${red}, ${green}, ${blue}`);
    } else {
        pixel.style.backgroundColor = "black";
        console.log(`Changing color of pixel to black`);
    }
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