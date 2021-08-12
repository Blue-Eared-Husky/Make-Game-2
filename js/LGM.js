class LGM{
    constructor(x){
        this.lgm = createSprite(x,height-20,10,10);
        this.lgm.addAnimation("left",lgmLeft);
        this.lgm.addAnimation("right",lgmRight);
        this.lgm.scale = 2;
        this.health = 5;
        
        lgms.push(this.lgm);
        enemies.push(this.lgm)
    }
}