const DEFAULT_COLOR = 'black';

let color = DEFAULT_COLOR;

const container = document.querySelector('#container');
const sizeSelect = document.querySelector('#sizeSelect');
const modeSelect = document.querySelector('#modeSelect');
const clearButton = document.querySelector('#clearButton');
const options = document.querySelector('#options');
const select = document.getElementsByClassName('select');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function isMobileDevice() {
    if (navigator.userAgent.toLowerCase().match(/mobile/i))
        return true;
    else
        return false;
}

function goRainbow() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function goShading(backgroundColor) {
    const rgb = backgroundColor.split('(')[1].split(')')[0].split(',');
    const r = rgb[0].trim();
    const g = rgb[1].trim();
    const b = rgb[2].trim();
    return `rgb(${Number(r)-25}, ${Number(g)-25}, ${Number(b)-25})`;
}

function goEraser(targetID) {
    const coordinates = targetID.split('-');
    const row = Number(coordinates[0]);
    const col = Number(coordinates[1]);
    if ((row+col)%2 == 0)
        return 'white';
    else
        return 'lightgrey';
}

function changeColor(e) {
    if (!isMobileDevice())
        if (e.type === 'mouseover' && !mouseDown) return;

    if (modeSelect.value == 'color')
        color = DEFAULT_COLOR;
    else if (modeSelect.value == 'rainbow')
        color = goRainbow();
    else if (modeSelect.value == 'shading')
        color = goShading(window.getComputedStyle(e.target).getPropertyValue('background-color'));
    else if (modeSelect.value == 'eraser')
        color = goEraser(e.target.id);
    e.target.style.backgroundColor = color;
}

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

function empty(element) {
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

sizeSelect.addEventListener('change', () => {
    empty(container);
    if (sizeSelect.value == '8')
        createGrid(8);
    else if (sizeSelect.value == '16')
        createGrid(16);
    else if (sizeSelect.value == '32')
        createGrid(32);
    else if (sizeSelect.value == '64')
        createGrid(64);
});

clearButton.addEventListener('click', () => {
    empty(container);
    createGrid(sizeSelect.value);
});


if (isMobileDevice()) {
    sizeSelect.removeChild(document.querySelector('#value32'));
    sizeSelect.removeChild(document.querySelector('#value64'));
    container.classList.add('mobile-container');
    options.style['flex-direction'] = "column";
    options.style['margin-top'] = '3vh';
    for (let i = 0; i < select.length; i++) {
        select[i].style.width = '24vh';
    }
}
createGrid(sizeSelect.value);
