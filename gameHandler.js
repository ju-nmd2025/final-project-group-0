import { Platform, generatePlatforms } from "./platform";
import Character from "./character";
import Button from "./button";

// The Controller, or GameHandler, currently initiates and calls other objects/classes to collaborate. It does almost nothing on it's own, and if it were nicer it would do even less on it's own.

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
        this.canvasWidth = 400;
        this.canvasHeight = 600;
        this.currentGameState = this.gameStates.start;
    }

    changeGameState(newGameState) {
        this.currentGameState = newGameState;
    }

    resetGame() {
        this.#score = 0;
		this.#character = new Character(100, 200, 50, 50, .4, -18);

        this.#platforms = [
            new Platform(60, 760, 100, 10, "normal"),
            new Platform(220, 640, 100, 10, "moving"),
            new Platform(140, 520, 100, 10, "breaking"),
            new Platform(80, 400, 100, 10, "normal"),
            new Platform(240, 280, 100, 10, "moving"),
            new Platform(120, 160, 100, 10, "normal")

        ];
        this.#character.bounce();
    }

    startMenu() {
        this.gameButtons.startButton.draw();
    }

    playGame() {
        push();
        fill(255);
        textSize(20);
        text("Score: " + this.#score, 10, 30);
        pop();
        this.#character.applyPhysics();

        const hitPlatform = this.#character.isColliding(this.#platforms);
        if (hitPlatform) {
            this.#character.bounce();
            if (hitPlatform.type === "breaking") {
                hitPlatform.isBroken = true;
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
        
        this.#character.x += dx;

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
        fill(255);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Score: " + this.#score, this.canvasWidth / 2, 50);
        text("High Score: " + this.#highScore, this.canvasWidth / 2, 100);
        pop();
        this.gameButtons.deathButton.draw();
    }
}
