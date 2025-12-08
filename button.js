// Button centric logic without it having knowledge of the outside world

export default class Button {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
    }

    draw() {
        push();
        textSize(20);
        textAlign(CENTER, CENTER);
        rect(this.x, this.y, this.w, this.h);
        text(
            this.text,
            this.w + this.x - Math.abs(this.w - this.x),
            this.y + this.h - Math.abs(this.h - this.y)
        );
        pop();
    }

    isHovered() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            return true;
        } else {
            return false;
        }
    }
}
