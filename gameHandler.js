import { Platform, generatePlatforms } from "./platform";
import Character from "./character";
import Button from "./button";

// The Controller, or GameHandler, currently initiates and calls other objects/classes to collaborate. It does almost nothing on it's own, and if it were nicer it would do even less on it's own.

export default class GameHandler {
    gameStates = {
        start: "start",
        play: "play",
        death: "death",
        win: "win",
    };

    gameButtons = {
        startButton: new Button(0, 0, 300, 80, "Start", true),
        deathButton: new Button(0, 0, 350, 80, "Restart", true),
    };

    #character;
    #platforms = [];
    #score = 0;
    #highScore = 0;

    constructor(
        canvasWidth = 800,
        canvasHeight = 400,
        avgPlatformWidth = 90,
        avgPlatformHeight = 280
    ) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.currentGameState = this.gameStates.start;
        this.avgPlatformWidth = avgPlatformWidth;
        this.avgPlatformHeight = avgPlatformHeight;
    }

    changeGameState(newGameState) {
        this.currentGameState = newGameState;
    }

    resetGame() {
        this.#score = 0;
		this.#character = new Character(100, 200, 50, 50, .4, -15);
		
        this.#platforms = [
            new Platform(100, 350, 100, 10),
            new Platform(250, 300, 100, 10),
            new Platform(450, 250, 100, 10),
            new Platform(200, 200, 100, 10),
            new Platform(350, 150, 100, 10),
            new Platform(150, 100, 100, 10),
            new Platform(500, 50, 100, 10),
        ];
        this.#character.bounce();
    }

    startMenu() {
		this.resetGame();
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
        }

        if (this.#character.y < this.canvasHeight / 2) {
            const dy = (this.canvasHeight / 2) - this.#character.y;

            this.#character.y = this.canvasHeight / 2;

        this.#platforms.forEach(p => {
            p.y += dy;
        });
        this.#score += Math.floor(dy);
        }


        generatePlatforms(
            this.#platforms,
            0,
            this.canvasWidth,
            this.avgPlatformWidth,
            this.avgPlatformHeight
        );


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
