// Multiple similarities to spikes, both could be interactable objects (maybe a class to inherit from?)

export default class Platform {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }

    move(gameSpeed) {
        this.y += gameSpeed;
    }
}

function generatePlatforms(
    platforms,
    gameSpeed,
    canvasWidth,
    standardWidth,
    standardHeight
) {
    for (let i = platforms.length - 1; i >= 0; i--) {
        const p = platforms[i];
        p.draw();

        if (p.y > height + 10) { // off bottom
            platforms.splice(i, 1);

            // create new platform at top with random x
            const newWidth = standardWidth + Math.floor(50 * Math.random());
            const newX = Math.floor(Math.random() * (canvasWidth - newWidth));
            const newY = -Math.floor(50 * Math.random()); // slightly above view

            platforms.push(
                new Platform(newX, newY, newWidth, 10)
            );
        }
    }
}

export { Platform, generatePlatforms };
