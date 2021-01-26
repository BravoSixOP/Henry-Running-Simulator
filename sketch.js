//Plot/Abstract Story:
//This, here the character, Henry is trying to get to his house and has to dodge the props, cars here.

var character, characterImage;
var ground, groundImage, backgroundImage;
var obstacle, obstacleImage, obstaclesGroup;
var restart, restartImage;

var PLAY= 0;
var END= 1;
var gameState=PLAY;

var score=0;

function preload(){
  groundImage= loadImage("background.jpg")
  obstacleImage= loadImage("obstacle.png")
  characterImage= loadImage("character.gif")
  restartImage= loadImage("restart.png")
}

function setup() {
  createCanvas(600, 400)
  
  backgroundImage = createSprite(360, 200, 20, 20);
  
  backgroundImage.addImage(groundImage)
  backgroundImage.scale=0.55
  
  ground = createSprite(400, 340, 900, 10);
  ground.velocityX= -6
  
  character = createSprite(50, 340, 20, 20);
  character.addImage(characterImage)
  character.scale=0.5
  
  restart = createSprite(310, 210, 20, 20)
  restart.addImage(restartImage)
  restart.scale=0.1
  
  obstaclesGroup = new Group();
}

function draw() {
  background(220);
      
  drawSprites();
  
  if(gameState===PLAY){
    obstacles();
    
    restart.visible=false
    
    ground.velocityX= -(6+ 2*score/100);
    backgroundImage.velocityX= -(6+ 2*score/100)
    
    score = score + Math.round(getFrameRate()/60);

    if(ground.x < 150){
      ground.x=400
    }
    if(backgroundImage.x < 250){
      backgroundImage.x=360
    }

    if(keyDown("space") && character.y >= 285){
      character.velocityY= -18
    }
    character.velocityY = character.velocityY+0.8
    if(obstaclesGroup.isTouching(character)){
      gameState= END
    }
  }
  else if(gameState===END){
    restart.visible=true
    
    character.velocityY= character.velocityY+3.8
    
    backgroundImage.velocityX=0;
    ground.velocityX=0;
    
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    
    stroke("black")
    textSize(20);
    fill("black")
    text("Game Over", 260, 180);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  ground.visible=false;
  character.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score, 480, 40)
  
  character.setCollider("rectangle", 0, 0, 80, 150);
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  score=0;
}

function obstacles(){
  if(frameCount% 80===0){
    obstacle= createSprite(610, 325, 20, 20);
    obstacle.velocityX=-(6 + 2*score/100);
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.3
    obstaclesGroup.add(obstacle);
    obstacle.lifetime= 110;
  }
}
