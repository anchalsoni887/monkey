var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,ground,groundimage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,background,backgroundimage;

function preload(){
  
  monkey_running =                   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  backgroundimage=loadimage("jungle.jpg")
  bananaImage = loadImage ("banana.png");
  obstacleImage = loadImage ("stone.png");
  
}

function setup() {
  
  background=createSprite(400,400,400,400);
  background.addImage(backgroundimage);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=20;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  
  score=0;
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
}

function draw() {
  
 if(gameState==PLAY){ 
  if(ground.x<0){
     ground.x=ground.width/2;
  }
 
  if(keyDown("space")){
  monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
 
  if(monkey.y<0 || monkey.y>315){
  monkey.y=315; 
  monkey.velocityY=0; 
  }
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale=10;
  }
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
  }
  if(monkey.scale==10&&monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
}
  if(gameState==END){
 ground.velocityX=0;
    monkey.velocityX=0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
  }
 
  monkey.collide(ground);
  spawnObstacles();
  banana();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,100,50);
 
}

function spawnObstacles(){
  if (frameCount % 150 === 0){
  var obstacle = createSprite(600,310,10,40);
    obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6 ;
  obstacle.scale = 0.2;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
 }
}

function banana(){
  if(frameCount%60==0){
    
   var banana=createSprite(600,200,40,10)
   banana.addImage(bananaImage)
    banana.scale=0.1;
   banana.y=random(120,200);
    banana.velocityX=-5;
    banana.lifetime=300;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    FoodGroup.add(banana)
}
}