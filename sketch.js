//variables
var tower, towerImage;
var door, doorGroup, doorImage
var railing, railingGroup, railingImage;
var ghost, ghostImage;
var  invisibleR, invisibleGroup;
var PLAY=0, END=1;
var gameState=PLAY;
var sound;


function preload(){
  
  //load tower image
  towerImage=loadImage("tower.png");
  
  //load door image
  doorImage=loadImage("door.png");
  
  //load railing image
  railingImage=loadImage("climber.png");
  
  //load ghost image
  ghostImage=loadImage("ghost-standing.png");
  
  //load spooky sound
  sound=loadSound("spooky.wav");
  
  
}//PRELOAD END 



function setup(){
  createCanvas(600,600);
  
  //play sound on a loop
  sound.loop();
  
  //create tower sprite
  tower=createSprite(300,300,1,1);
  //add image
  tower.addImage("tower", towerImage);
  //give velocity
  tower.velocityY=2;
  
  //create door group
  doorGroup= new Group();
  //create railing group
  railingGroup=new Group();
  //create invisible railing group
  invisibleGroup=new Group();
  
  //create ghost
  ghost=createSprite(300,300,1,1);
  //add image
  ghost.addImage("standing", ghostImage);
  //scale
  ghost.scale=0.3;
  
  
  
  
  
}//SETUP END


function draw(){
  background("black");
  
  //if gamestate is play,
  if (gameState==PLAY){

    //infinite tower scrolling effect
    if (tower.y>400){
      tower.y=300;
    }

    //make ghost go up when space key is pressed
    if (keyDown("SPACE")){
      ghost.velocityY=-5;
    }

    //give gravity to bring it down
    ghost.velocityY=ghost.velocityY+0.8;

    //if right arrow key is pressed, 
    if (keyDown("RIGHT_ARROW")){
      //make ghost move right
      ghost.x=ghost.x+3;
    }

    //if left arrow key is pressed,
    if (keyDown("LEFT_ARROW")){
      //move ghost left
      ghost.x=ghost.x-3;
    }

    //if ghost touches railing,
    if (ghost.isTouching(railingGroup)){
      //stop ghost movement to let ghost rest
      ghost.velocityY=0;
      ghost.velocityX=0;
    }

    //if ghost touches bottome of railing,
    if (ghost.isTouching(invisibleGroup) || ghost.y>600){
      //destroy ghost
      ghost.destroy();
      //end game
      gameState=END;
    }
    
    //spawn doors and railing
    spawnDoors();
    
    //show sprites
    drawSprites();
    
  }//END OF GAMESTATE PLAY  
  
  //if gamestate is end
  else if (gameState==END){
    
    //game over text in red
    textSize(30);
    fill("yellow");
    text("GAME OVER", 220,300);
    
  }//END OF GAMESTATE END
  
  
  
}//DRAW END




function spawnDoors(){
  
  //every 240 framecounts,
  if (World.frameCount%240==0){
    //create doors
    door=createSprite(200,-50,20,20);
    //give velocity
    door.velocityY=2;
    //add image
    door.addImage("door", doorImage);
    //give random x position
    door.x=Math.round(random(120,400));
    //give lifetime
    door.lifetime=300;
    //add to group
    doorGroup.add(door);
    
    //create railings
    railing=createSprite(200,10,20,20);
    //give velocity
    railing.velocityY=2;
    //add image
    railing.addImage("climber", railingImage);
    //make railing'x x position the same as door's x position
    railing.x=door.x;
    //give lifetime
    railing.lifetime=300;
    //add to railing group
    railingGroup.add(railing);
    
    //create Invisible railing
    invisibleR=createSprite(200,15,railing.width,2);
    //give it velocity
    invisibleR.velocityY=2;
    //make Invisible railing's x position same as railing's
    invisibleR.x=railing.x;
    //give lifetime
    invisibleR.lifetime=300;
    //make it invisible
    invisibleR.visible=false;
    //add to group
    invisibleGroup.add(invisibleR);
    
    //control depths
    ghost.depth=door.depth;
    ghost.depth=railing.depth;
    ghost.depth=ghost.depth+1;
    
    //railing.debug=true;
    
  }
  
}//end of spawn doors