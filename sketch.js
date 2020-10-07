//Create variables here
var dog,happyDog,database,foodS,foodStock;
var fedTime,lastFed;
var foodObj;
var redState,changeGameState;
var gameState;
function preload()
{
  //load images here
  doggyHappy = loadImage("images/happydog.png");
  doggy = loadImage("images/Dog.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/download.jpg");
}

function setup() {
  createCanvas(1000,1000);
  database = firebase.database();

  dog = createSprite(500,300,50,50);
  dog.addImage(doggy);
  dog.scale= 0.3;

    
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError)
  
  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //read Game State from database
  readState = database.ref('gameState');
  readState.on("value",function(data){
   gameState = data.val();
  });

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime = hour();
  console.log(lastFed);
  currentTime = 16;
  if(currentTime==(lastFed+1)){
    console.log("play");
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else {
    console.log("check")
    update("Hungry");
    foodObj.display();
  }

  //fuction to update game State in database
  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }

background(46,139,87);
foodObj.display();
fedtime = database.ref('FeedTime');
fedtime.on("value",function(data){
  lastFed = data.val();
})
  
  //add styles here
  
  fill(255,255,254);
 
  textSize(20);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(doggyHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

/*function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update(
    {
      Food : x
    }
  )
}*/

function showError(){
  console.log("ERROR");
}

