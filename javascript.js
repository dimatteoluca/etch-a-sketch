function createGrid(n) {
    // const containerSide = container.clientWidth;
    container.setAttribute('style', `grid-template-rows: repeat(${n}, ${100/n}%);`+
                                    `grid-template-columns: repeat(${n}, ${100/n}%);`);
    
    for(let i=1; i<=n; i++) {
        for(let j=1; j<=n; j++) {
            const temp = document.createElement('div');
            temp.id = `${i}-${j}`;
            temp.classList.add('grid-item');
            if ((i+j)%2 == 1) temp.setAttribute('style', 'background-color: lightgrey');
            // temp.setAttribute('style', `width: ${divSide}px; height: ${divSide}px;`);
            container.appendChild(temp);
        }
    }
}

const container = document.querySelector('#container');
createGrid(16);
