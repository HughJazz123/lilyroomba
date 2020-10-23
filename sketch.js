let x;
let y;

let xspeed;
let yspeed;

let img;
let audio;

let pg;

var angle = 0;
var audio2 = '';
var value = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function preload() {
  img = loadImage("static/roomba.png");
  fuck1 = loadSound("static/audio/fuck1.mp3");
  fuck2 = loadSound("static/audio/fuck2.mp3");
  gfd = loadSound("static/audio/godfuckindammit.mp3");
  motherfucker = loadSound("static/audio/motherfucker.mp3");
  rufs = loadSound("static/audio/rufs.mp3");

  sounds = [fuck1, fuck2, gfd, motherfucker, rufs];
  noLoop();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.overflow = "hidden";
  console.log(width,height);
  img.resize(img.width, img.height);
  x = random(width/2);
  y = random(height/2);
  xspeed = 6;
  yspeed = 6;
  angleMode(DEGREES);
}

function playSound(){
  var audio = sounds[Math.floor(Math.random() * sounds.length)];
  while (audio==audio2){
    var audio = sounds[Math.floor(Math.random() * sounds.length)];
  }
  audio.play();
  sleep(audio.duration()*1000);
  audio2 = audio;
}

function rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(img_angle);
  image(img, 0, 0, img_width, img_height);
  imageMode(CORNER);
}

function draw() {
  background(0);

  rotate_and_draw_image(x,y,img.width, img.height, angle);
  
  x = x + xspeed;
  y = y + yspeed;

  if (x + img.width >= width) {
    xspeed = -xspeed;
    x = width - img.width;
    if (yspeed>0){
      angle+=90
    } else {
      angle-=90
    }
    playSound();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    if (yspeed>0){
      angle-=90;
    } else {
      angle+=90;
    }
    playSound();
  }

  if (y + img.height >= height) {
    yspeed = -yspeed;
    y = height - img.height;
    if (xspeed>0){
      angle-=90;
    } else {
      angle+=90;
    }
    playSound();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    if (xspeed>0){
      angle+=90;
    } else {
      angle-=90;
    }
    playSound();
  }

}

function touchStarted() {
  getAudioContext().resume()
}

function mouseClicked() {
  if (value==0){
    loop();
    value = 1;
  } else{
    noLoop();
    value = 0;
  }
}
