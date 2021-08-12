var defaultbg,bgImg,logo,logoImg, endImg; // bg, logo, endingImg
var playButton,lvl1button,lvl2button,lvl3button,lvl4button,lvl5button,completed = 0; //buttons
var lvl2lock,lvl3lock,lvl4lock,lvl5lock,lvl2lockImg,lvl3lockImg,lvl4lockImg,lvl5lockImg; //locks
var plr,direction = 1,gravity,wall1,wall2,ground,plrLeft,plrRight,plrFd,plrBulletImg,plrBulletLeft,plrBulletRight,bullets = []; // plr
var lvl1bg,goopLeft,goopRight,bigGoopLeft,bigGoopRight,bigGoopFd; //gupu
var lvl2bg,fairyImg,birdImg,birdbulletImg, birdbullets = []; //pero
var lvl3bg,skeletonLeft,skeletonRight,skeletonAtk,zombImg,zombBullet,zombBullets = []; //nekros
var lvl4bg,fishLeft,fishRight,octopusImg,octopusPortal,octopusBullet,octopusBullets = [];//wai
var lvl5bg,lgmLeft,lgmRight,finalbossImg,snakeImg,snakes = []; //prodigium

var goops = [], fairies = [], skeletons = [], fishes = [], lgms = [],enemies = [];
//classes: bullet, goop, fairy, skeleton, fish, lgm

var left_arrow,right_arrow,jump_button,shoot_button;

var bgmus,lvl1mus,lvl2mus,lvl3mus,lvl4mus,lvl5mus; //music

var hurtsound,footsteps; //sound effects

var START = 0, SELECT = 1, LVL1 = 2, LVL2 = 3, LVL3 = 4, LVL4 = 5, LVL5 = 6, PAUSE = 7, END = 8;
var gameState = START;

function preload(){
  //single images
  bgImg = loadImage("./assets/ipad_bg.png");
  finalbossImg = loadImage("./assets/final_boss.png");
  logoImg = loadImage("./assets/logo.png");
  plrLeft = loadImage("./assets/necrolord_lt.png");
  plrRight = loadImage("./assets/necrolord_rt.png");
  plrFd = loadImage("./assets/necrolord_fd.png");
  octopusImg = loadImage("./assets/octopuscase.png");
  octopusPortal = loadImage("./assets/octopusportal.png");
  zombImg = loadImage("./assets/puppetzomb.png");
  endImg = loadImage("./assets/ending.png")
  lvl1bg = loadImage("./assets/gupu_bg.png");
  lvl2bg = loadImage("./assets/peto_bg.png");
  lvl3bg = loadImage("./assets/nekros_bg.png");
  lvl4bg = loadImage("./assets/wai_bg.png");
  lvl5bg = loadImage("./assets/prodigium_bg.png");

  lvl2lockImg = loadImage("./assets/blankselect_2.png");
  lvl3lockImg = loadImage("./assets/blankselect_3.png");
  lvl4lockImg = loadImage("./assets/blankselect_4.png");
  lvl5lockImg = loadImage("./assets/blankselect_5.png");

  //animations
  // = loadAnimation("./assets/");
  plrBulletLeft = loadAnimation("./assets/Bullet_Left/bullet_lt0.png","./assets/Bullet_Left/bullet_lt1.png","./assets/Bullet_Left/bullet_lt2.png");
  plrBulletRight = loadAnimation("./assets/Bullet_Right/bullet_rt0.png","./assets/Bullet_Right/bullet_rt1.png","./assets/Bullet_Right/bullet_rt2.png");
  goopLeft = loadAnimation("./assets/Goop_Left/goop_lt0.png","./assets/Goop_Left/goop_lt1.png");
  goopRight = loadAnimation("./assets/Goop_Right/goop_rt0.png","./assets/Goop_Right/goop_rt1.png");
  fairyImg = loadAnimation("./assets/Wing_Monster/wingmonster0.png","./assets/Wing_Monster/wingmonster1.png","./assets/Wing_Monster/wingmonster2.png","./assets/Wing_Monster/wingmonster3.png");
  skeletonLeft = loadAnimation("./assets/Skeleton_Left/skeleton_lt0.png","./assets/Skeleton_Left/skeleton_lt1.png");
  skeletonAtk = loadAnimation("./assets/Skeleton_Atk/skeleatk0.png","./assets/Skeleton_Atk/skeleatk1.png");
  skeletonRight = loadAnimation("./assets/Skeleton_Right/skeleton_rt0.png","./assets/Skeleton_Right/skeleton_rt1.png");
  fishLeft = loadAnimation("./assets/Payara_Left/payara_lt0.png","./assets/Payara_Left/payara_lt1.png","./assets/Payara_Left/payara_lt2.png","./assets/Payara_Left/payara_lt3.png","./assets/Payara_Left/payara_lt4.png","./assets/Payara_Left/payara_lt5.png");
  fishRight = loadAnimation("./assets/Payara_Right/payara_lt0.png","./assets/Payara_Right/payara_lt1.png","./assets/Payara_Right/payara_lt2.png","./assets/Payara_Right/payara_lt3.png","./assets/Payara_Right/payara_lt4.png","./assets/Payara_Right/payara_lt5.png");
  lgmLeft = loadAnimation("./assets/Green_Monster_Left/lgm_lt0.png","./assets/Green_Monster_Left/lgm_lt1.png");
  lgmRight = loadAnimation("./assets/Green_Monster_Right/lgm_rt0.png","./assets/Green_Monster_Right/lgm_rt1.png");

  //music
  bg_mus = loadSound("./assets/Twinkling Starlight.mp3");
  lvl1mus = loadSound("./assets/Weird_Slime.mp3");
  lvl2mus = loadSound("./assets/Electric_Wings.mp3");
  lvl3mus = loadSound("./assets/SpookyScarySkeletons.wav");
  lvl4mus = loadSound("./assets/Turbulent_Waters.mp3");
  lvl5mus = loadSound("./assets/Last_Stand.mp3");

  //sound effects
  hurtsound = loadSound("./assets/hurt.wav");
  footsteps = loadSound("./assets/footsteps.wav");
}

function setup() {
  createCanvas(320,240);

  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);

  plr = createSprite(20,height-30);
  plr.addImage("left",plrLeft);
  plr.addImage("right",plrRight);
  plr.addImage("forward",plrFd);
  plr.changeImage("right");
  plr.scale = 2;
  plr.setCollider("rectangle",0,5,10,20);
  plr.visible = false;

  ground = createSprite(width/2,height,width,30);
  ground.visible = false;

  wall1 = createSprite(0,height/2,30,height);
  wall1.visible = false;

  wall2 = createSprite(width,height/2,30,height);
  wall2.visible = false;

  logo = createSprite(width/2,50);
  logo.addImage(logoImg);
  logo.scale = 2;

  lvl1button = createImg("./assets/lvl1select.png");
  lvl1button.position(30,height/2);
  lvl1button.mousePressed(lvl1Pressed);
  
  lvl2button = createImg("./assets/lvl2select.png");
  lvl2button.position(30+60,height/2);
  lvl2button.mousePressed(lvl2Pressed);

  lvl2lock = createSprite(30+60+7,height/2+7);
  lvl2lock.addImage(lvl2lockImg);

  lvl3button = createImg("./assets/lvl3select.png");
  lvl3button.position(30+60+60,height/2);
  lvl3button.mousePressed(lvl3Pressed);

  lvl3lock = createSprite(30+60+60+7,height/2+7);
  lvl3lock.addImage(lvl3lockImg);

  lvl4button = createImg("./assets/lvl4select.png");
  lvl4button.position(30+60+60+60,height/2);
  lvl4button.mousePressed(lvl4Pressed);

  lvl4lock = createSprite(30+60+60+60+7,height/2+7);
  lvl4lock.addImage(lvl4lockImg);

  lvl5button = createImg("./assets/lvl5select.png");
  lvl5button.position(30+60+60+60+60,height/2);
  lvl5button.mousePressed(lvl5Pressed);

  lvl5lock = createSprite(30+60+60+60+60+7,height/2+7);
  lvl5lock.addImage(lvl5lockImg);

  left_arrow = createImg("./assets/Left_Arrow.png");
  left_arrow.position(width/2-65,10);
  left_arrow.mousePressed(moveLeft);

  right_arrow = createImg("./assets/Right_Arrow.png");
  right_arrow.position(width/2-2,10);
  right_arrow.mousePressed(moveRight);

  jump_button = createImg("./assets/jump_button.png");
  jump_button.position(width/2-18.7,27);
  jump_button.size(36,16.5);
  jump_button.mousePressed(moveUp);

  shoot_button = createImg("./assets/shoot.png");
  shoot_button.position(width/2-22.5,57);
  shoot_button.size(43.5,16.5);
  shoot_button.mousePressed(shoot);

  lvl1button.hide();
  lvl2button.hide();
  lvl3button.hide();
  lvl4button.hide();
  lvl5button.hide();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();

  lvl2lock.visible = false;
  lvl3lock.visible = false;
  lvl4lock.visible = false;
  lvl5lock.visible = false;

  gravity = 2 ;

  playButton = createImg("./assets/play_button.png");
  playButton.position(width/2-22.4,75);
  playButton.size(42,20);
  playButton.mousePressed(playButtonPressed);  

  defaultbg = bgImg;
  plrBulletImg = plrBulletLeft;

  bg_mus.loop();
}

function draw() {
  background(10);
  
  image(defaultbg,width/2,height/2,64*5,48*5);

  plr.y += gravity;

  plr.collide(ground);

  if (enemies != null){
    for (var i = 0; i < enemies.length; i++){
      if (bullets != null){
        for (var x = 0; x < bullets.length; x++){
          if(enemies[i].isTouching(bullets)){
            enemies[i].health -= 1;
          }
        }
      }

      if(enemies[i].health = 0){
        enemies[i].destroy();
        enemies.remove(enemies[i]);
      }
    }
  }

  drawSprites();
}

function shoot(){
  if(gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END){
    var bullet = new Bullet(direction);
  }
}

function moveUp(){
  if(gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END){
    //plr.y +- 100;
    console.log("up");
  }
}

function moveLeft(){
  if(plr.x > 20 && gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END){
    plr.x -= 10;
    plr.changeImage("left");
    footsteps.play();
    direction = -1;
    plrBulletImg = plrBulletLeft;
  }
}

function moveRight(){
  if(plr.x < width-20 && gameState != START && gameState != SELECT && gameState != PAUSE && gameState != END){
    plr.x += 10;
    plr.changeImage("right");
    footsteps.play();
    direction = 1;
    plrBulletImg = plrBulletRight;
  }
}

function playButtonPressed(){
  if (gameState === START){
    gameState = SELECT;
    playButton.hide();

    lvl2lock.visible = true;
    lvl3lock.visible = true;
    lvl4lock.visible = true;
    lvl5lock.visible = true;

    lvl1button.show();
  }
}

function lvl1Pressed(){
  if (gameState === SELECT){
    gameState = LVL1;
    defaultbg = lvl1bg;

    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl1mus.loop();

    for(var i = 0; i < 10; i++){
      var ranx = random(200,240);
      var goop = new Goop(ranx);
    }
  }
}

function lvl1completed(){
  if (completed <= 1){
    completed = 1;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl3lock.visible = true;
  lvl4lock.visible = true;
  lvl5lock.visible = true;

  lvl1mus.stop();
  bg_mus.loop();
}

function lvl2Pressed(){
  if (gameState === SELECT && completed >= 1){
    gameState = LVL2;
    defaultbg = lvl2bg;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = true;

    plr.visible = true;

    bg_mus.stop();
    lvl2mus.loop();
  }
}

function lvl2completed(){
  if (completed <= 2){
    completed = 2;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl4lock.visible = true;
  lvl5lock.visible = true;

  lvl2mus.stop();
  bg_mus.loop();
}

function lvl3Pressed(){
  if (gameState === SELECT && completed >= 2){
    gameState = LVL3;
    defaultbg = lvl3bg;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl3mus.loop();
  }
}

function lvl3completed(){
  if (completed <= 3){
    completed = 3;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl5lock.visible = true;

  lvl3mus.stop();
  bg_mus.loop();
}

function lvl4Pressed(){
  if (gameState === SELECT && completed >= 3){
    gameState = LVL4;
    defaultbg = lvl4bg;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl4mus.loop();
  }
}

function lvl4completed(){
  if (completed <= 4){
    completed = 4;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  lvl5button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl4mus.stop();
  bg_mus.loop();
}

function lvl5Pressed(){
  if (gameState === SELECT && completed >= 4){
    gameState = LVL5;
    defaultbg = lvl5bg;
    
    lvl1button.hide();
    lvl2button.hide();
    lvl3button.hide();
    lvl4button.hide();
    lvl5button.hide();
    lvl2lock.visible = false;
    lvl3lock.visible = false;
    lvl4lock.visible = false;
    lvl5lock.visible = false;
    left_arrow.show();
    right_arrow.show();
    shoot_button.show();
    jump_button.show();
    logo.visible = false;

    plr.visible = true;

    bg_mus.stop();
    lvl5mus.loop();
  }
}

function lvl5completed(){
  if (completed <= 5){
    completed = 5;
  }
  defaultbg = bgImg;

  lvl1button.show();
  lvl2button.show();
  lvl3button.show();
  lvl4button.show();
  lvl5button.show();
  left_arrow.hide();
  right_arrow.hide();
  shoot_button.hide();
  jump_button.hide();
  logo.visible = true;

  lvl5mus.stop();
  bg_mus.loop();
}