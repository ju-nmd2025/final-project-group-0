// Button centric logic without it having knowledge of the outside world

export default class Button {
    constructor(x, y, w, h, text, centered = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.centered = centered;
    }

    draw() {
        let drawX = this.centered ? (width / 2 - this.w / 2) : this.x;
        let drawY = this.centered ? (height / 2 - this.h / 2) : this.y;

        fill(0, 0, 0, 50);
        rect(drawX, drawY, this.w, this.h, 10, 10);
        push();
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(36);
        text(this.text, drawX + this.w / 2, drawY + this.h / 2);
        pop();
    }

    isHovered() {
        let drawX = this.centered ? (width / 2 - this.w / 2) : this.x;
        let drawY = this.centered ? (height / 2 - this.h / 2) : this.y;

        return (
            mouseX > drawX &&
            mouseX < drawX + this.w &&
            mouseY > drawY &&
            mouseY < drawY + this.h
        );
    }
}
