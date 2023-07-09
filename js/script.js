const sketchboard = document.getElementById('sketchboard');

generateBoard();

const pixels = document.querySelectorAll('.pixel');

pixels.forEach(pixel => pixel.addEventListener('mouseover', () => changePixelColor(pixel)));

function generateBoard() {
    for (i = 0; i < 256; i += 1) {
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