// Character centric logic

export default class Character {
    constructor(x, y, w, h, gravity, jumpVelocity, facing = "right") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gravity = gravity;
        this.jumpVelocity = jumpVelocity;
        this.vy = 0;
        this.facing = facing;
    }

    applyPhysics() {
        this.vy += this.gravity;
        this.y += this.vy;
    }

    moveLeft(speed) {
    this.x -= speed;
    this.facing = "left";
    }

    moveRight(speed) {
    this.x += speed;
    this.facing = "right";
    }


    bounce() {
        this.vy = this.jumpVelocity;
    }

    isColliding(platforms) {
        const feetY = this.y + this.h;

        for (const p of platforms) {
            if (p.isBroken) continue;

            const withinX =
                this.x + this.w > p.x &&
                this.x < p.x + p.w;

            const isFallingDown = this.vy > 0;

            const hitFromAbove = feetY >= p.y && feetY <= p.y + p.h;

            if (withinX && isFallingDown && hitFromAbove) {
                this.y = p.y - this.h;
                return p;
            }
        }

        return null;
    }
    draw() {
        let sprite;

        const isJumping = this.vy < 0;


        if (this.facing === "left") {
            if (isJumping) { sprite = images.leftJump; }
            else { sprite = images.left; }
        } 
        
        else {
            if (isJumping) { sprite = images.rightJump; }
            else { sprite = images.right; }
        }

        image(sprite, this.x, this.y, this.w, this.h);
    }
}
