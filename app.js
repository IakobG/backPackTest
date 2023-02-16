const drawNumberDivs = document.querySelector('.container');
let resetApp = document.querySelector('.reset');
const pText = document.querySelector('.p');

let T = [];
let n; //nivtebis raodenoba 5
let m; //maqsimaluri satarebeli wona 16
let M = []; //nivtebis wonebi 4, 5, 3, 7, 6
let C = []; //nivtebis girebulebebi 5, 7, 4, 9, 8

onLoad();

resetApp = addEventListener('click', reset);

function onLoad() {
    randomNumber();
    RandomArray();
    fillArray();
    algo();
    drawP();
    drawArray();
}

function reset() {
    while (drawNumberDivs.hasChildNodes()) {
        drawNumberDivs.removeChild(drawNumberDivs.firstChild);
    }
    while (pText.hasChildNodes()) {
        pText.removeChild(pText.firstChild);
    }
    onLoad();
}

function drawP() {
    const text = document.createElement('DIV');
    text.innerText = `ნივთების რაოდენობა ${n}, მაქსიმალური წონა ${m}, ნივთების წონები: ${M}. ნივთების ღირებულება: ${C}.`;
    pText.append(text);
}

function randomNumber() {
    n = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    m = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
}

function RandomArray() {
    for (let i = 0; i < n; i++) {
        M[i] = (Math.floor(Math.random() * 25) + 1)
    }
    for (let i = 0; i < n; i++) {
        C[i] = (Math.floor(Math.random() * 25) + 1)
    }
}

function fillArray() {
    for (let i = 0; i <= n; i++) {
        T[i] = [];
        for (let j = 0; j <= m; j++) {
            T[i][j] = null;
        }
    }
    T[0][0] = 0;
    for (j = 1; j <= m; j++)
        T[0][j] = 0;
    for (i = 1; i <= n; i++)
        T[i][0] = 0;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function max(a, b) {
    return (a > b) ? a : b;
}

function algo() {
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= m; j++) {
            if (M[i] <= j)
                T[i][j] = max(T[i - 1][j], T[i - 1][j - M[i]] + C[i]);
            else
                T[i][j] = T[i - 1][j];
        }
    }
}

async function drawArray() {
    for (let i = 0; i <= n; i++) {
        const arrayX = document.createElement('SECTION');
        arrayX.classList.add(`X${i}`);
        await timeout(10);
        drawNumberDivs.append(arrayX);
        for (let j = 0; j <= m; j++) {
            const row = document.querySelector(`.X${i}`);
            const arrayY = document.createElement('DIV');
            // arrayY.classList.add(`row`);
            arrayY.classList.add('animation');
            arrayY.innerText = T[i][j];
            await timeout(10);
            row.append(arrayY);
        }
    }
}
