// Select from Sketch dropdown Add Folder or Sketch Files Create Folder
// Name the folder images
// Select from images folder Upload image
// Drag and drop any files

let circleY = [];// snow balls
const words = [] // store word objects

//Boiler plate for adding images to canvas preload, setup, draw
function preload(){
  img1 =loadImage("images/icebreaker.png");
}

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < 25; i++) {
      circleY[i] = random(height);
    }

    const str = 'Find 5 things all of you have in common'
    const wordsStr = str.split(' ')

    textSize(30)
    strokeWeight(2);

    // track word position
    let x = 20
    let y = 60
    fill(255)
    // iterate over each word
    for (let i = 0; i < wordsStr.length; i++) {
        const wordStr = wordsStr[i] // get current word
        const wordStrWidth = textWidth(wordStr) // get current word width
        const word = new Word(wordStr, x, y, i)
        words.push(word)
        x = x + wordStrWidth + textWidth(' ') // update x by word width + space character
        // look ahead the next word - will it fit in the space? if not, line break
        const nextWordStrWidth = textWidth(wordsStr[i+1]) || 0
        if (x > width - nextWordStrWidth) {
            y += 40 // line height, sort of
            x = 20 // reset x position
        }
    }
}

function draw() {
    background(img1)

  // snowballs
  fill(255)
    for (let i = 2; i < circleY.length; i++) {
    let circleX = width * i / circleY.length;
    circle(circleX, circleY[i], 10);

    circleY[i]++;
    
    if (circleY[i] > height) {
      circleY[i] = 0;
    }
  }

  
    for (let i = 0; i < words.length; i++) {
        const word = words[i] // retrieve word object
        word.update()
        word.display()
    }
}

function keyPressed() {
    if (key === 'r') {
        for (let word of words) word.spread()
    } else if (key === ' ') {
        for (let word of words) word.reset()
    }
}

class Word {
    constructor(word, x, y, idx) {
        this.word = word
        this.x = x
        this.y = y
        // target position is the same as current position at start
        this.tx = this.x
        this.ty = this.y
        // original position
        this.origx = this.x
        this.origy = this.y
        this.idx = idx
        this.fcolor = color(0)
    }

    reset() {
        this.tx = this.origx
        this.ty = this.origy
    }

    spread() {
        this.tx = random(width)
        this.ty = random(height)
    }

    update() {
        // move towards the target by 10% each time
        this.x = lerp(this.x, this.tx, 0.1)
        this.y = lerp(this.y, this.ty, 0.1)
    }

    display() {
        fill(this.fcolor)
        noStroke()
        text(this.word, this.x, this.y)
    }
}