// Multiple similarities to platforms, both could be interactable objects (maybe a class to inherit from?)

export default class Spike {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        triangle(
            this.x,
            this.y + this.h,
            this.x + this.w,
            this.y + this.h,
            this.x,
            this.y
        );
    }

    move(gameSpeed) {
        this.x -= gameSpeed;
    }
}

function generateSpikes(spikes, gameSpeed, canvasWidth) {
    for (let i = 0; i < spikes.length; i++) {
        spikes[i].draw();
        spikes[i].move(gameSpeed);

        if (spikes[i].x < 0) {
            spikes[i].x = canvasWidth;
        }
    }
}

export { Spike, generateSpikes };
