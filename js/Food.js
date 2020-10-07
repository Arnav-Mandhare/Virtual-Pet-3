class Food{
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage("images/Milk.png");
    
    }

    bedroom(){
        background(bedroom,550,500);
    }

    garden(){
        console.log("garden");
        background(garden,550,500,100,100);
    }

    washroom(){
        background(washroom,550,500);
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }

    display(){
        var x=80,y=100;
        imageMode (CENTER);
       // image (sadDog,720,250,300,300);
        
        
        if(this.foodStock!=0){
            for (var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image (this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}