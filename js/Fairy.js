class Fairy{
    constructor(x,y){
        this.fairy = createSprite(x,y,10,10);
        this.fairy.addAnimation(fairyImg);
        this.fairy.scale = 2;
        this.health = 2;
        
        fairies.push(this.fairy);
        enemies.push(this.fairy);
    }
}