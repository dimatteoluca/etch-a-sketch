const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let touchStart = false;
document.body.ontouchstart = () => (touchStart = true);
document.body.ontouchend = () => (touchStart = false);

function createGrid(n) {
    // const containerSide = container.clientWidth;
    container.setAttribute('style', `grid-template-rows: repeat(${n}, ${100/n}%);`+
                                    `grid-template-columns: repeat(${n}, ${100/n}%);`);
    
    for(let i=1; i<=n; i++) {
        for(let j=1; j<=n; j++) {
            const temp = document.createElement('div');
            temp.id = `${i}-${j}`;
            temp.classList.add('grid-item');
            if ((i+j)%2 == 1)
                temp.setAttribute('style', 'background-color: lightgrey');
            // temp.setAttribute('style', `width: ${divSide}px; height: ${divSide}px;`);
            if (isMobileDevice()) {
                temp.addEventListener('touchstart', changeColor);
                temp.addEventListener('touchmove', changeColor);
            }
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
        if (e.type === 'touchmove' && !touchStart) return;
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

const container = document.querySelector('#container');
createGrid(DEFAULT_SIZE);
