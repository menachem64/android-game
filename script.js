const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const androidImage = document.getElementById("android");
const appleImage = document.getElementById("apple");
const points = document.querySelectorAll(".points span");
const smartphonesImage = document.getElementById("smartphones");
const refresh = document.getElementById("refresh");
const boom = document.getElementById("boom");


const Player = {
    x: 850,
    y: 100,
    w: 80,
    h: 70,
    speed: 5,
    dx: 0,
    dy: 0,
}
const adversary = {
    x:[
       -100,
    ],
    y:[ 
        35,
    ],
    w:[
        80,
    ],
    h:[ 
        70,
    ],
    speed: 15,
   // dx: 3,
   // dy: 0
}


const bite = {
    x:[ 
        -46,
    ],
    y:[ 
        74,
    ],
    w: [ 
        0,
    ],
    h:[
        0,
    ], 
   // dx: 3,
   // dy: 0
}

const smartphones ={
    start: [
        0,
        -1000
    ],
    x: [
        0,
        -1000
    ],
    y: [
        0,
        0
    ],
    w: [
        1000,
        1000
    ],
    h: [
        450,
        450
    ],
    speed: 0.5,
}


const adversaryForPush = {
    x:[
       -100,
       -100,
       -100,
       -100,
      // -100,
    ],
    y:[ 
        35,
   
    ],
    w:[
        80,
        80,
        80,
        80,
     //   80,
    ],
    h:[ 
        70,
        70,
        70,
        70,
    //    70, 
    ],
}

const biteForPush = {
    x:[ 
        -46,
        -46,
        -46,
        -46,
      //  -46,
    ],
    y:[ 
        74,
        239,
        404,
        158.5,
      //  321.5,
    ],
    w: [ 
        0,
        0,
        0,
        0,
     //   0,
    ],
    h:[
        0,
        0,
        0,
        0,
    //    0,
    ], 
}

let val = 1;
function pointsPlus(){
   // for (let i = 0; i < adversary.y.length; i++) {
     // if(Player.y === adversary.y[i]){
        val++;
        points[0].innerHTML = val;
   // }}
}

function drawSmartphones(){
   for (let i = 0; i < smartphones.x.length; i++) {
        ctx.filter = "brightness(100%)";
        ctx.drawImage(smartphonesImage, smartphones.x[i], smartphones.y[i], smartphones.w[i], smartphones.h[i]);  
   }
}

function drawPlayer(){
    ctx.drawImage(androidImage, Player.x, Player.y, Player.w, Player.h);
}


function drawAdversaryr(){
    for (let i = 0; i < adversary.x.length; i++) {
        ctx.drawImage(appleImage, adversary.x[i], adversary.y[i], adversary.w[i], adversary.h[i]);  
    }
}


function circleForBite(){
    for (let i = 0; i < bite.x.length; i++) {
        ctx.beginPath();
        ctx.moveTo(bite.x[i], bite.y[i]);
        ctx.arc(bite.x[i], bite.y[i], bite.w[i], bite.h[i], Math.PI*2 );
        ctx.fillStyle ='rgb(34, 32, 32)';
        ctx.fill();  
    }
}


   


function biting(){
    setInterval(() => { 
        for (let i = 0; i < bite.w.length; i++) {
        bite.w[i] = 0;
        biteForPush.w[i] = 0;
}}, 2000)
    setInterval(() => {
        for (let i = 0; i < bite.w.length; i++) {
        bite.w[i] = 23.2;
        biteForPush.w[i] = 23.2;
}}, 1000)
}

biting();


function oneByOne(){ 
    for (let i = 0; i < adversary.x.length; i++) {
        if(adversary.x[i] + adversary.w[i] - 100 < canvas.width){
            adversary.x[i] += adversary.speed;
            bite.x[i] += adversary.speed;
        }else if(adversary.x[i] + adversary.w[i] > canvas.width){
            adversary.x.splice(i, 1);
            adversary.y.splice(i, 1);
            adversary.w.splice(i, 1);
            adversary.h.splice(i, 1);

            bite.x.splice(i, 1);
            bite.y.splice(i, 1);
            bite.w.splice(i, 1);
            bite.h.splice(i, 1);
        }
    }

}


//function adversaryPush(time){
    let i = 0;
    let circle = adversaryForPush.x.length;
    let time = 2000
   // let pushCounter = 5;
    
    setInterval(() => { 
        if(time > 1000){
            time -= 100
        }
    },10000)

    setInterval(() => { 
        if(adversary.speed < 7){
          adversary.speed += 0.5
        }
    },5000)

   // let adversaryPush = setInterval(() => { 
    function adversaryPush(){
       adversary.x.push(adversaryForPush.x[i]);
       adversary.y.push(adversaryForPush.y[i]);
       adversary.h.push(adversaryForPush.h[i]);
       adversary.w.push(adversaryForPush.w[i]);
       bite.x.push(biteForPush.x[i]);
       bite.y.push(biteForPush.y[i]);
       bite.h.push(biteForPush.h[i]);
       bite.w.push(biteForPush.w[i]);
       i++;
       if(i > circle){
          i = 0;
       }
       pointsPlus();

}//,time)
 //}   


const setIntervalForAdversaryPush1 = setInterval(adversaryPush, time);
const setIntervalForAdversaryPush2 = setInterval(adversaryPush, time+2000);
const setIntervalForAdversaryPush3 = setInterval(adversaryPush, time+4000);
const setIntervalForAdversaryPush4 = setInterval(adversaryPush, time+5000);


//adversaryPush(3000);
//adversaryPush(4000);
//adversaryPush(5000);
//adversaryPush(2000);

/*function rowFullOfAdversary(){
    if(adversaryForPush.y[1] === adversaryForPush.y[0] && adversaryForPush.y[2] && adversaryForPush.y[3] && adversaryForPush.y[4]){
        adversaryForPush.y[1] = 0;
    }
};*/

function gameStopRunning(){
    if(adversary.speed === 0){
        clearTimeout(setIntervalForAdversaryPush1);
        clearTimeout(setIntervalForAdversaryPush2);
        clearTimeout(setIntervalForAdversaryPush3);
        clearTimeout(setIntervalForAdversaryPush4);

}};
//gameStopRunning();

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

function newPos(){
    Player.x += Player.dx;
    Player.y += Player.dy;
    detectWalls();
}

function newPosBackGround(){
  for (let i = 0; i < smartphones.x.length; i++) {
    smartphones.x[i] += smartphones.speed;
    
    detectWallsAd();
}}

function detectWalls(){
  //left well
  if(Player.x < -17){
    Player.x = -17;
  }
  //right well
  if(Player.x + Player.w > canvas.width + 22){
    Player.x = canvas.width - Player.w + 22;
  }

  //top well
  if(Player.y < 0){
    Player.y = 0;
  }

  //bottom well 
  if(Player.y + Player.h > canvas.height + 5){
    Player.y = canvas.height - Player.h + 5;
  }
}

function detectWallsAd(){
  //right well
  for (let i = 0; i < smartphones.x.length; i++) {    
      if(smartphones.x[i] > canvas.width){
        smartphones.x[i] = -990;
  }
}}


function gameOver(){
    for (let i = 0; i < adversary.x.length; i++) {
      if(Player.y + 55 >= adversary.y[i] && Player.y - 55 <= adversary.y[i] 
        && Player.x + 40 >= adversary.x[i] && Player.x - 40 <= adversary.x[i]
        ){
        adversary.speed = 0;
        bite.speed = 0;
        Player.speed = 0;
        ctx.drawImage(boom, Player.x-100, Player.y-115, 300, 300);
     }
    }
}


function moveRight(){
    Player.dx = Player.speed;
}

function moveLeft(){
    Player.dx = -Player.speed;
   // for (let i = 0; i < adversary.x.length; i++) {
   //      adversary.x[i] += Player.speed;
    //     bite.x[i] += Player.speed;
//}
   // pointsPlus();
    //newPosAd();
}

function moveUp(){
    Player.dy = -Player.speed;
}
 
function moveDown(){
    Player.dy = Player.speed;
}

function keydown(e){
   if(e.key === 'ArrowRight' || e.key === 'Right'){
    moveRight();
   } else if(e.key === 'ArrowLeft' || e.key === 'Left'){
    moveLeft();
   } else if(e.key === 'ArrowUp' || e.key === 'Up'){
    moveUp();
   } else if(e.key === 'ArrowDown' || e.key === 'Down'){
    moveDown();
   }
}

function keyup(e){
    if(e.key === 'ArrowRight' ||
     e.key === 'Right' ||
      e.key === 'ArrowLeft' ||
       e.key === 'Left' ||
        e.key === 'ArrowUp' ||
         e.key === 'Up' ||
          e.key === 'ArrowDown' ||
           e.key === 'Down'
    ){
        Player.dx = 0;
        Player.dy = 0; 
    }

}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
refresh.addEventListener('click', () =>{
   window.location.href=window.location.href
}
 );

refresh.addEventListener('mouseover', () =>{
    refresh.style.width = '80px',
    refresh.style.height = '80px'
}
  );

refresh.addEventListener('mouseout', () =>{
    refresh.style.width = '70px',
    refresh.style.height = '70px'
 }
  );

function update(){
    clear(); 
    
    drawSmartphones();
    drawPlayer();
    drawAdversaryr();
    circleForBite();

    newPos();
    newPosBackGround();
    oneByOne();
    //rowFullOfAdversary();
    gameOver();
    gameStopRunning()

    requestAnimationFrame(update);
};
update();


