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
let purchaeName=[];
let vote=[];
let view =[];

let purchasImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

readFRMLocStor();

function Survay(purchaseName) {
    this.purchaseName = purchaseName.split('.')[0];
    this.img = 'img/' + purchaseName;
    this.views = 0;
    this.votes = 0;

    purchas.push(this);
    purchaeName.push(this.purchaseName);
    console.log('ourches=',purchas);
}


for (let i = 0; i < purchasImg.length; i++) {
    new Survay(purchasImg[i]);
    console.log(purchas[i]);
}
let inds
let thisround=[];
let lastround=[];
function ranDex() {
    inds= (Math.floor(Math.random() * purchas.length ));
    thisround=inds;
     return thisround;
    // console.log("index= " + inds);
}

let LImg = ranDex();
let MImg = ranDex();
let RImg = ranDex();



function renderRanImg() {
    if(lastround===thisround){
        ranDex();}
        
    LImg = ranDex();
    MImg = ranDex();
    RImg = ranDex();

    while ((LImg === MImg) || (MImg === RImg) || (LImg === RImg)  ) {
       
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
lastround=thisround;


lefImg.addEventListener('click', clickshand);
midImg.addEventListener('click', clickshand);
rigImg.addEventListener('click', clickshand);



function chartRender() {

    let ctx = document.getElementById('myChart').getContext('2d');
    ctx.height = 100;
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: purchaeName,
        datasets: [{
            label: '# of Votes',
            data: vote,
            backgroundColor: [
                'rgba(50, 255, 150, 0.9)',
            ],
            borderColor: [
                'rgba(40, 175, 175, 0.3)',
            ],
            borderWidth: 2
        },
        {
            label: '# of views',
            data: view,
            backgroundColor: [
                'rgba(255, 255, 175)',
            ],
            borderColor: [
                'rgba(190, 150, 150, 0.8)',
            ],
        
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}



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
        thisround=[];
    }
    else {resrender();}
}

        function resrender(){
        
        let ulEl = document.getElementById('res');
        for (let i = 0; i < purchas.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${purchas[i].purchaseName} has ${purchas[i].votes} votes and ${purchas[i].views} views  .`
            ulEl.appendChild(liEl);
            vote.push(purchas[i].votes);
            view.push(purchas[i].views);
        }
        
        savToLocStor();
        alert("Thank you for your valuable time");
        lefImg.removeEventListener('click', clickshand);
        midImg.removeEventListener('click', clickshand);
        rigImg.removeEventListener('click', clickshand);
        chartRender();
    }

function finish() {
    window.location = 'https://github.com/BasharTaamneh/BusMall/pull/1';

}

function savToLocStor() {
    let data = JSON.stringify(purchas);
    localStorage.setItem('Survay', data);
}

function readFRMLocStor() {
    let strinTOnormop = localStorage.getItem('Survay');
   let normop=JSON.parse(strinTOnormop);
   if (normop !== null) {
    purchas=normop; 
    resrender();
}
}


// console.log(purchas ,"====");
console.log(purchas);
console.log("l="+LImg);
console.log("m="+MImg);
console.log("r="+RImg);


/////