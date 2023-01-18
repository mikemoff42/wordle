let letters='QWERTYUIOPASDFGHJKLZXCVBNM';
let allKeys=[];
let colorKeys=[];
function KeyBoard(){
  for (let i=0;i<letters.length;i++){
    allKeys.push(letters.charAt(i));
    colorKeys[i]=[220,100];
  }
}
function showKeys(){
  let xspa = width*0.05;
  let yspa = xspa;
  let xoffs = width*0.275;
  let yoffs = height *0.8;
  push();
  textSize(width/30);
  let counter =0;
  
  for (let i=0;i<26;i++){
    if (i==10){
      yoffs+=xspa;
      xoffs+=xspa/2;
      counter=0;
    } else if (i == 19){
      yoffs+=xspa;
      xoffs+=xspa;
      counter=0;
    }
    fill(colorKeys[i]);
    square(xoffs + counter*xspa,yoffs,xspa);
    fill(0);
    text(allKeys[i],xoffs + counter*xspa,yoffs);
    counter++;
  }
  pop();
}