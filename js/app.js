'use strict';


let atemsEl = document.getElementById('Natems');
let contaEl = document.getElementById('container');
let lefImg = document.getElementById('left');
let midImg = document.getElementById('midil');
let rigImg = document.getElementById('right');
let resEl = document.getElementById('res');
let purchas = [];
let attempts = 0;
let maxAttempts = 25;

let purchasImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

function Survay(purchaseName) {
    this.purchaseName = purchaseName.split('.')[0];
    this.img = 'img/' + purchaseName;
    this.views = 0;
    this.votes = 0;

    purchas.push(this);

}

for (let i = 0; i < purchasImg.length; i++) {
    new Survay(purchasImg[i]);
    console.log(purchas[i]);
}

function ranDex() {
    return Math.floor(Math.random() * purchas.length);
}

let LImg = ranDex();
let MImg = ranDex();
let RImg = ranDex();

function renderRanImg() {
    LImg = ranDex();
    MImg = ranDex();
    RImg = ranDex();

    while ((LImg === MImg) || (MImg === RImg) || (LImg === RImg)) {
        LImg = ranDex();
        MImg = ranDex();
        RImg = ranDex();
    }

    lefImg.setAttribute('src', purchas[LImg].img);
    midImg.setAttribute('src', purchas[MImg].img);
    rigImg.setAttribute('src', purchas[RImg].img);
    purchas[RImg].views++;
    purchas[LImg].views++;
    purchas[MImg].views++;

}

renderRanImg();


lefImg.addEventListener('click', clickshand);
midImg.addEventListener('click', clickshand);
rigImg.addEventListener('click', clickshand);



function clickshand(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        let clicked = event.target.id;
        console.log(clicked);
        if (event.target.id === 'left') {
            purchas[LImg].votes++;
        }

        else if (event.target.id === 'midil') {
            purchas[MImg].votes++;
        }
        else if (event.target.id === 'right') {
            purchas[RImg].votes++;
        }
        renderRanImg();
    }
    else {
        let ulEl = document.getElementById('res');
        for (let i = 0; i < purchas.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${purchas[i].purchaseName} has ${purchas[i].votes} votes and ${purchas[i].views} views  .`
            ulEl.appendChild(liEl);
        }
        alert("Thank you for your valuable time");
        lefImg.removeEventListener('click', clickshand);
        midImg.removeEventListener('click', clickshand);
        rigImg.removeEventListener('click', clickshand);

    }
}

function finish(){
    window.location ='https://github.com/BasharTaamneh/BusMall/pull/1';

}
console.log(purchas);


