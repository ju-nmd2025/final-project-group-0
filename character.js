// Character centric logic

export default class Character {
    constructor(x, y, w, h, fallSpeed, jumpDistance) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fallSpeed = fallSpeed;
        this.jumpDistance = jumpDistance;
    }

    fall() {
        this.y += this.fallSpeed;
    }

    jump() {
        this.y -= this.jumpDistance;
    }

    isColliding(objects, gameSpeed) {
        for (const object of objects) {
            if (
                Math.abs(this.y + this.h - object.y) < gameSpeed &&
                this.x + this.w >= object.x &&
                this.x <= object.x + object.w
            ) {
                return true;
            }
        }
        return false;
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
