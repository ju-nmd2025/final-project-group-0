// Multiple similarities to spikes, both could be interactable objects (maybe a class to inherit from?)

export default class Platform {
    constructor(x, y, w, h, type = "normal") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type;
        this.isBroken = false;
        this.direction = 1;
        this.speed = 2;
    }
    update() {
        if (this.isBroken) {return;}
        
        if (this.type === "moving") {
            this.x += this.direction * this.speed;

            if(this.x < 0){
                this.x = 0;
                this.direction *= -1;
            }
            if(this.x + this.w > width) {
                this.x = width - this.w;
                this.direction *= -1;
            }
        }
    }
    draw() {
        if (this.isBroken) return;

        push();
        noStroke();
        if (this.type === "normal") fill(0, 200, 0);
        else if (this.type === "moving") fill(0, 120, 255);
        else if (this.type === "breaking") fill(255, 80, 80);

        rect(this.x, this.y, this.w, this.h, 4);
        pop();
    }
}

function randomPlatformType() {
    const r = Math.random(); // 0 to 1
    if (r < 0.6) return "normal"; // 60% chance
    if (r < 0.8) return "moving"; // 20% chance
    return "breaking"; // 20% chance
}

function generatePlatforms(platforms) 
{
    for (let i = platforms.length - 1; i >= 0; i--) {
        const p = platforms[i];

        p.update();
        p.draw();

        if (p.y > height + 20) {
            platforms.splice(i, 1);
        }
    }

    const targetCount = 20;
    const gap = 80;
    const fixedWidth = 80;

    while (platforms.length < targetCount) {

        let highestY = platforms[0].y;
        for (let i = 1; i < platforms.length; i++) {
            if (platforms[i].y < highestY) {
                highestY = platforms[i].y;
            }
        }

        const newX = Math.floor(Math.random() * (width - fixedWidth));
        const newY = highestY - gap;

        platforms.push(
            new Platform(newX, newY, fixedWidth, 15, randomPlatformType())
        );
    }
}

export { Platform, generatePlatforms };
