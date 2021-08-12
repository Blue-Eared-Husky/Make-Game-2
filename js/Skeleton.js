class Skeleton{
    constructor(x){
        this.skeleton = createSprite(x,height-20,10,10);
        this.skeleton.addAnimation("left",skeletonLeft);
        this.skeleton.addAnimation("right",skeletonRight);
        this.skeleton.scale = 2;
        this.health = 3;
        
        skeletons.push(this.skeleton);
        enemies.push(this.skeleton);
    }
}