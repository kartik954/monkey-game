// this is a infinite monkey runner game.
// the monkey jump when space key is pressed.
// if you lose the game u will press the R key and the game is restart.

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;


function preload(){
  
  //loading all image that is used in our game.
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover.jpg");
 
}



function setup() {
  //creating canvas.
      createCanvas(600, 200);
  
  //creating ground and giving velocity to it.
      ground = createSprite(350, 180, 1200, 10);
  
  //creating monkey.
      monkey = createSprite(80, 150, 20, 20);
      monkey.addAnimation("running", monkey_running);
      monkey.scale = 0.09;
  
  //creating food and obstacle group.
      foodGroup = new Group();
      obstacleGroup = new Group();
  
  //creating gameover.
      gameover = createSprite(280, 100, 20, 20);
      gameover.addImage("over", gameoverImage);
      gameover.visible = false;
      gameover.scale = 2;

  
}


function draw() {
  background("white");
  
// making play gameastate.
  if(gameState == PLAY){
    
// caliing function.
      hangbanana();
      stopobstacle();
    
// increasing speed.
      ground.velocityX = -(5 + 3*score/40);
    
// increasing score.
      score = score + Math.round(getFrameRate()/30);
      console.log(getFrameRate());
    
//giving gravity to the monkey.
      monkey.velocityY = monkey.velocityY +0.8;

//colliding monkey with the ground.
      monkey.collide(ground);
      console.log(monkey.y)
    
//jumping the monkey when space key is pressed.
  if(keyDown("space") && monkey.y>= 146){
      monkey.velocityY = -15;
  } 
// creating infinite ground.
  if(ground.x<0){
      ground.x = ground.width/2;
  }
// eating banana.
  if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
    }
// ending game when it touches the rock.
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
  }
  //creating end gamestate.
   else if(gameState == END){
    monkey.velocityY = 0;
    monkey.visible = false;
    ground.visible = false;
    gameover.visible = true;
  if(keyDown("R")){
      console.log("callingReset");
      reset();
    }
   
  }
  
drawSprites();
  //displaying score.
  text("SURVIVAL TIME :"+ score, 50, 50);
  
}
//creting a reset function.
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  monkey.visible = true;
  ground.visible = true;
  score = 0;
  console.log("resetting");
}
//creating a function for banana.
function hangbanana(){
  if(frameCount % 40 === 0){
    banana = createSprite(400, 100, 10, 10);
    banana.addImage("fruit", bananaImage);
    banana.scale = 0.1;
    banana.x = Math.round(random(150, 450));
    banana.y = Math.round(random(100, 80));
    banana.velocityX = -(5 + 3*score/40);
    foodGroup.add(banana);
  }
}
//creating function for rock.
function stopobstacle(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(400, 170, 10, 10);
    obstacle.addImage("danger", obstaceImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -(4 + 3*score/40);
    obstacle.x = Math.round(random(280, 450));
    obstacleGroup.add(obstacle);
  }
}






