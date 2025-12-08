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
        this.x -= gameSpeed;
    }
}

function generatePlatforms(
    platforms,
    gameSpeed,
    canvasWidth,
    standardWidth,
    standardHeight
) {
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].move(gameSpeed);

        if (platforms[i].x + platforms[i].w < -10) {
            platforms.splice(i, 1);

            if (platforms.length < 6) {
                let biggestSpace =
                    platforms[platforms.length - 1].w < canvasWidth
                        ? platforms[platforms.length - 1].x +
                          platforms[platforms.length - 1].w +
                          standardWidth
                        : canvasWidth;

                platforms.push(
                    new Platform(
                        biggestSpace,
                        standardHeight - Math.floor(90 * Math.random()),
                        standardWidth + Math.floor(50 * Math.random()),
                        10
                    )
                );
            }
        }
    }
}

export { Platform, generatePlatforms };
