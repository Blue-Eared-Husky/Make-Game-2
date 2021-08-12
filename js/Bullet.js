class Bullet{
    constructor(vX){
        this.bullet = createSprite(plr.x,plr.y,10,10);
        this.bullet.addAnimation("bullet",plrBulletImg);
        this.bullet.velocityX = vX * 10;
        this.bullet.velocityY = gravity;
        this.bullet.lifetime = 1000;
        this.bullet.scale = 2;
        this.bullet.setCollider("circle",0,0,2.5);

        bullets.push(this.bullet);
    }
}