
var stickman,stickmanAnimation;
var boxes;
var boxesImg, spikesImg;
var ground;
var boxesArray= [];
var lives= 3;
var score= 0;
var gameState = "play";

function preload() {
  backgroundImage = loadImage("./assets/Bg.jpg");
  stickmanAnimation= loadAnimation("./assets/S1.png", "./assets/S2.png", "./assets/S3.png", "./assets/S4.png");
  spikesImg= loadImage("./assets/spikes.png");
  boxesImg= loadImage("./assets/box.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  stickman= createSprite(60, height-100);
  stickman.addAnimation("stick", stickmanAnimation);
  stickman.scale= 0.65;

  ground= createSprite(60,height-15,width,10);
  ground.visible=false;

  
}

function draw() {
  background(backgroundImage);
  if(gameState=="play") {
  spawnBoxes();

  if(keyDown("space")) {
    stickman.velocity.y= -10;
  }
  stickman.velocity.y+=0.5;

  for(var i=0; i<boxesArray.length; i++) {
    if (stickman.collide(boxesArray[i])) {
      lives-=1;
      boxesArray[i].remove();
      boxesArray.splice(i, 1);
      i--;
      stickman.velocity.y= 0;
    }
  }

  textSize(22);
  fill("white");
  
  if(frameCount%100==0) {
    
    score+=10;

  }

  if(lives==0) {
    gameState= "end";
  }


}
  if(gameState=="end") {
    gameOver();
  }
  text("Score = "+ score, width-600, 150);
  text("Lives = "+ lives, 100, 150);

  stickman.collide(ground);

  drawSprites();
}


function spawnBoxes() {
  if(frameCount%Math.round(random(100,400)) == 0) {
    boxes= createSprite(width+10, height-80);
    rand= Math.round(random(1,2));
    if(rand==1) {
      boxes.addImage("box",boxesImg);
    }else {
      boxes.addImage("spike", spikesImg)
    }
    boxes.scale= 1.5;
    boxes.velocity.x= -2;
    boxes.lifetime= 800;
    boxesArray.push(boxes);
  }
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you hit an obstacle....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Try again"
  });
}