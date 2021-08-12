class Fish{
    constructor(x,y){
        this.fish = createSprite(x,y,10,10);
        this.fish.addAnimation("left",fishLeft);
        this.fish.addAnimation("right",fishRight);
        this.fish.scale = 2;
        this.health = 4;
        
        fishes.push(this.fish);
        enemies.push(this.fish)
    }
}