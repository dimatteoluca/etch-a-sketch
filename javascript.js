const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

const container = document.querySelector('#container');
const sizeSelect = document.querySelector('#sizeSelect');
const value64 = document.querySelector('#value64');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(n) {
    // const containerSide = container.clientWidth;
    container.setAttribute('style', `grid-template-rows: repeat(${n}, ${100/n}%);`+
                                    `grid-template-columns: repeat(${n}, ${100/n}%);`);
    
    for(let i=1; i<=n; i++) {
        for(let j=1; j<=n; j++) {
            const temp = document.createElement('div');
            temp.id = `${i}-${j}`;
            temp.classList.add('grid-item', 'non-selectable');
            if ((i+j)%2 == 1)
                temp.setAttribute('style', 'background-color: lightgrey');
            // temp.setAttribute('style', `width: ${divSide}px; height: ${divSide}px;`);
            if (isMobileDevice())
                temp.addEventListener('touchstart', changeColor);
            else {
                temp.addEventListener('mouseover', changeColor);
                temp.addEventListener('mousedown', changeColor);
            }
            container.appendChild(temp);
        }
    }
}

function changeColor(e) {
    if (isMobileDevice()) {
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
    else {
        if (e.type === 'mouseover' && !mouseDown) return;
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }

}

function isMobileDevice() {
    if (navigator.userAgent.toLowerCase().match(/mobile/i))
        return true;
    else
        return false;
}

function empty(element) {
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

sizeSelect.addEventListener('change', () => {
    empty(container);
    if (sizeSelect.value == "8")
        createGrid(8);
    else if (sizeSelect.value == "16")
        createGrid(16);
    else if (sizeSelect.value == "32")
        createGrid(32);
    else if (sizeSelect.value == "64")
        createGrid(64);
});

createGrid(sizeSelect.value);
if (isMobileDevice()) sizeSelect.removeChild(value64);
