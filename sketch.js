let words=[];
let level=0;
let answerText;
let answer=[];
let asort;
let currentword='';
let notWord=false;
let notWordTimer;
let xspacing,xoff,yoff,yspacing;
let winner;
let newGameHighlight,dailyPuzlleHighlight;
let checkCurrentWord;

let date;
let wordIndex;
let freePlay;
let redword;
let daily;


function setup() {
  createCanvas(windowHeight, windowHeight);
  beginGame();
  
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}
function draw() {
  background(0,90);
  showKeys();
  drawSquares();
  checkWinner();
  if (!freePlay && level < 6 && !winner){
    let m = date.getMonth()+1;
    let d = date.getDate();
    let y = date.getFullYear()-2000;
    let today = m+'/'+d+'/'+y;
    textSize(width/30);
    text('Daily Puzzle for '+today,width/2,height*0.05);
    textSize(xspacing*0.9);
  } else if (!winner && level < 6){
    textSize(width/30);
    text('Wordle Free Play',width/2,height*0.05);
    textSize(xspacing*0.9);
  }
  
}
function beginGame(){
  daily = true;
  date = new Date();
  wordIndex = ((date.getMonth())*31 + date.getDate())+(date.getFullYear()-2023)*366;
  newGame();
}
function checkWinner(){
  push();
  if (winner){
    textSize(width/30);
    text('Winner!',width/2,height*0.05);
  } else if (level > 5){
    textSize(width/30);
    text('Game Over: '+answerText.toUpperCase(),width/2,height*0.05);
    
  }
  if (winner || level > 5 || level == 0){
    let r=width*0.05;
    let x = mouseX;
    let y = mouseY;
    let cx = width*0.1;
    let cy = height*0.21;
    textSize(width/40);
    ellipseMode(CENTER);
    fill(200,90);
    circle(cx,cy,r*2);
    fill(0);
    text('Free',cx,cy-width/60);
    text('Play',cx,cy+width/60);
    let d = dist(x,y,cx,cy);
    if (d<r){
      newGameHighlight=true;
      fill(220,90);
      circle(cx,cy,r*2);
    } else
      newGameHighlight=false;
    
  
    cy = height*0.1;
    d = dist(x,y,cx,cy);
    fill(200,90);
    circle(cx,cy,r*2);
    fill(0);
    text('Daily',cx,cy-width/60);
    text('Puzzle',cx,cy+width/60);
    if (d<r){
      dailyPuzlleHighlight=true;
      fill(220,90);
      circle(cx,cy,r*2);
    } else
      dailyPuzlleHighlight=false;
  }
  
  pop();
}
function drawSquares(){
  currentword=currentword.toUpperCase();  
  if (currentword.length > 5) currentword = currentword.substring(0, 5);
  for (let i=0;i<6;i++)
    for (let j=0;j<5;j++){
      fill(250,190);
      square(j*xspacing+xoff,i*yspacing+yoff,xspacing-5);
      push();
      if(level==i && currentword){
        if (currentword.length == 5 && WORDS.indexOf(currentword.toLowerCase()) == -1) 
          fill(255,0,0);
        else
          fill(0);
        text(currentword.charAt(j),j*xspacing+xoff-1,i*yspacing+yoff+2);
      }
      pop();
    }
  
  for (let i=0;i<level;i++){
    words[i].show();
  }
}
function genNewWord(){
  let ans = random(WORDS);
  if (ans.charAt(4) == 's' && random() > 0.01){
    while (ans.charAt(4) == 's'){
      ans = random(WORDS);
    }
  }
  return ans;
}
function newGame(){
  let ans;
  if (freePlay) {
    ans = genNewWord();
  }
  else
    ans = WORDS[wordIndex];
  answerText=ans;
  gameover=false;
  winner=false;
  
  level=0;
  words=[];
  currentword='';
  xspacing=width*0.1;
  yspacing=xspacing;
  xoff=width*0.3;
  yoff=height*0.15;
  KeyBoard();
  textSize(xspacing*0.9);
  
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  for (let i=0;i<5;i++){
    answer[i] = ans.charAt(i).toUpperCase();
  }
}
function mousePressed(){
  if (newGameHighlight){
    newGameHighlight=false;
    freePlay=true;
    newGame();
    daily=false;
  }
  if (dailyPuzlleHighlight){
    dailyPuzlleHighlight=false;
    freePlay=false;
    beginGame();
  }
  for (let k of allKeys){
    if (k.highlight && !(winner || level > 5)){
      currentword+=k.letter;
    }
    k.highlight = false;
  }
  if (entHighlight && !(winner || level > 5) && WORDS.indexOf(currentword.toLowerCase()) != -1 && currentword.length == 5){
    words[level] = new Word();
    level++;
    currentword='';
  }
  if (backHighlight && currentword.length>0 && !(winner || level > 5)){
    currentword = currentword.substring(0, currentword.length - 1);
    backHighlight=false;
  }
}
function keyPressed(){
  if ((winner || level > 5) && keyCode == 13){
    freePlay=true;
    newGame();
  } else if ((winner || level > 5) && key == 'd'){
    freePlay=false;
    newGame();
  } else if (winner || level > 5){
    //game over
  } else if (keyCode == 13 && WORDS.indexOf(currentword.toLowerCase()) == -1) {
    // invalid word, clear guess
    currentword='';
  } else if (keyCode == 13 && currentword.length == 5) {
    words[level] = new Word();
    level++;
    currentword='';
  } else if (keyCode == BACKSPACE) {
    currentword = currentword.substring(0, currentword.length - 1);
  } else if (keyCode > 64 && keyCode < 91){
    currentword+=key;
  }
}