class Word{
  constructor(){
    this.index = level;
    this.value = currentword;
    this.arr = [];
    for (let i=0;i<5;i++){
      this.arr.push(this.value.charAt(i));
    }
    this.colors = [];
    for(let i=0;i<5;i++){
      this.colors[i] = 100;
    }
    this.calcColors();
  }
  
  calcColors(){
    this.tmparr = this.arr.slice();
    this.tmpans = answer.slice();
    let Green = [0,255,0];
    let Yellow = [255,255,0];
    
    for (let i=0;i<5;i++){
      if (this.arr[i] == answer[i]){
        this.colors[i]=Green;
        this.tmparr[i] = ' ';
        this.tmpans[i] = '.';
        for (let j=0;j<allKeys.length;j++){
          if (answer[i] == allKeys[j])
            colorKeys[j] = Green;
        }
      }
    }
    for (let i=0;i<5;i++){
      winner=true;
      if(this.tmparr[i]!=' '){
        winner=false;
        break;
      }
    }
    
    for (let i=0;i<5;i++){
      let index = this.tmparr.indexOf(this.tmpans[i]);
      if (index != -1){
        this.colors[index] = Yellow;
        this.tmparr[index] = ' ';
        for (let j=0;j<allKeys.length;j++){
          if (answer[i] == allKeys[j])
            colorKeys[j] = Yellow;
        }
      }
    }
    for (let i=0;i<5;i++){
      for (let j=0;j<allKeys.length;j++){
        if (this.tmparr[i]==allKeys[j]){
          colorKeys[j]=100;
        }
      }
    }
  }
  
  show(){
    let yoffset = this.index * width*0.1 + yoff;
    push();
    for (let i=0;i<5;i++){
      fill(this.colors[i]);
      square(i*xspacing+xoff,yoffset,xspacing,10);
      fill(0);
      text(this.value.charAt(i),i*xspacing+xoff,yoffset);
    }
    pop();
  }
}