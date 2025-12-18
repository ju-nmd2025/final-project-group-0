import { Platform, generatePlatforms } from "./platform";
import Character from "./character";
import Button from "./button";


export default class GameHandler {
    gameStates = {
        start: "start",
        play: "play",
        death: "death",
    };

    gameButtons = {
        startButton: new Button(0, 0, 300, 80, "Start", true),
        deathButton: new Button(0, 0, 350, 80, "Restart", true),
    };

    #character;
    #platforms = [];
    #score = 0;
    #highScore = 0;

    constructor() 
    {
        this.canvasWidth = 500;
        this.canvasHeight = 700;
        this.currentGameState = this.gameStates.start;
    }

    changeGameState(newGameState) {
        this.currentGameState = newGameState;
    }

    resetGame() {

        this.#score = 0;
		this.#character = new Character(this.canvasWidth / 2, 200, 60, 60, .4, -15); // x, y, w, h, gravity, jumpVelocity

        this.#platforms = [
            new Platform(60, 760, 80, 15, "normal"),
            new Platform(220, 640, 80, 15, "moving"),
            new Platform(140, 520, 80, 15, "breaking"),
            new Platform(80, 400, 80, 15, "normal"),
            new Platform(240, 280, 80, 15, "normal"),
            new Platform(120, 160, 80, 15, "normal")

        ];
        this.#character.bounce();
    }

    startMenu() {
        this.gameButtons.startButton.draw();
    }

    playGame() {
        push();
        fill(0);
        textSize(20);
        text("Score: " + this.#score, 10, 30);
        pop();
        this.#character.applyPhysics();

        const hitPlatform = this.#character.isColliding(this.#platforms);
        if (hitPlatform) {
            if (hitPlatform.type === "breaking") {
                this.#character.vy = this.#character.jumpVelocity / 2;
                hitPlatform.isBroken = true;
            }
            else {
                this.#character.bounce();
            }
        }

        if (this.#character.y < this.canvasHeight / 2) { 
            const dy = (this.canvasHeight / 2) - this.#character.y;

            this.#character.y = this.canvasHeight / 2;

        this.#platforms.forEach(p => {
            p.y += dy;
        });
        this.#score += Math.floor(dy);
        }


        generatePlatforms(this.#platforms);


        if (this.#character.y > this.canvasHeight) {
            this.changeGameState(this.gameStates.death);
        }

        this.#character.draw();

    }

    moveCharacter(dx) {
        
        if (dx < 0) {
            this.#character.moveLeft(Math.abs(dx));
        } 
        else if (dx > 0) {
            this.#character.moveRight(dx);
        }

        if (this.#character.x - this.#character.w > this.canvasWidth) {
            this.#character.x = 0;
        } 
        else if (this.#character.x < 0) {
            this.#character.x = this.canvasWidth;
        }

        if (this.#character.x > this.canvasWidth) {
            this.#character.x = 0;
        } 
        else if (this.#character.x < 0) {
            this.#character.x = this.canvasWidth;
        }
    }

    endGame() {
        if (this.#score > this.#highScore) {
            this.#highScore = this.#score;
            }

        // Display final score and high score
        push();
        fill(0);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Score: " + this.#score, this.canvasWidth / 2, 50);
        text("High Score: " + this.#highScore, this.canvasWidth / 2, 100);
        pop();
        this.gameButtons.deathButton.draw();
    }
}
