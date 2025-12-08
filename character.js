// Character centric logic

export default class Character {
    constructor(x, y, w, h, gravity, jumpVelocity) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gravity = gravity;
        this.jumpVelocity = jumpVelocity;
        this.vy = 0;
    }

    applyPhysics() {
        this.vy += this.gravity;
        this.y += this.vy;
    }

    moveLeft(speed) {
    this.x -= speed;
    }

    moveRight(speed) {
    this.x += speed;
    }


    bounce() {
        this.vy = this.jumpVelocity;
    }

    isColliding(platforms) {
        const feetY = this.y + this.h;

        for (const p of platforms) {
            if (p.isBroken) continue; // skip broken platform types if you add them later

            const withinX =
                this.x + this.w > p.x &&
                this.x < p.x + p.w;

            const isFallingDown = this.vy > 0;

            const hitFromAbove =
                feetY >= p.y &&          // feet below or at platform top
                feetY <= p.y + p.h;      // feet not too far through

            if (withinX && isFallingDown && hitFromAbove) {
                // Snap feet to platform top (optional but feels better)
                this.y = p.y - this.h;
                return p;
            }
        }

        return null;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);

        push();
        fill("black");
        rect(this.x + this.w - 20, this.y + 20, 4, 4);
        rect(this.x + this.w - 10, this.y + 20, 4, 4);
        pop();
    }
}
