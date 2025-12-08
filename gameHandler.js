import { Platform, generatePlatforms } from "./platform";
import { Spike, generateSpikes } from "./spike";
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
        startButton: new Button(200, 150, 400, 100, "Start"),
        deathButton: new Button(200, 150, 400, 100, "You died! Restart?"),
    };

    #character;

    #platforms = [];
    #spikes = [];

    constructor(
        canvasWidth = 800,
        canvasHeight = 400,
        gameFloor = 300,
        gameSpeed = 5,
        avgPlatformWidth = 90,
        avgPLatformHeight = 280
    ) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gameFloor = gameFloor;
        this.gameSpeed = gameSpeed;
        this.currentGameState = this.gameStates.start;
        this.avgPlatformWidth = avgPlatformWidth;
        this.avgPlatformHeight = avgPLatformHeight;
    }

    changeGameState(newGameState) {
        this.currentGameState = newGameState;
    }

    resetGame() {
		this.#character = new Character(100, 200, 50, 50, 5, 120);
		
        this.#platforms = [
            new Platform(100, 270, 80, 10),
            new Platform(250, 290, 100, 10),
            new Platform(450, 300, 90, 10),
            new Platform(600, 270, 80, 10),
            new Platform(800, 290, 100, 10),
        ];
        this.#spikes = [new Spike(350, 300, 50, 50)];
    }

    startMenu() {
		this.resetGame();
        this.gameButtons.startButton.draw();
    }

    playGame() {
        this.#character.draw();

        generatePlatforms(
            this.#platforms,
            this.gameSpeed,
            this.canvasWidth,
            this.avgPlatformWidth,
            this.avgPlatformHeight
        );

        generateSpikes(this.#spikes, this.gameSpeed, this.canvasWidth);

        this.checkCollision();

        if (this.#character.y > this.gameFloor) {
            this.#character.y = this.gameFloor;
        }
    }

    characterJump() {
        if (
            this.#character.isColliding(this.#platforms, this.gameSpeed) ||
            this.#character.y >= this.gameFloor
        ) {
            this.#character.y -= 120;
        }
    }

    checkCollision() {
        if (
            this.#character.y < this.gameFloor &&
            !this.#character.isColliding(this.#platforms, this.gameSpeed)
        ) {
            this.#character.fall();
        }

        if (this.#character.isColliding(this.#spikes, this.gameSpeed)) {
            this.changeGameState("death");
        }
    }

    endGame() {
		this.resetGame();
        this.gameButtons.deathButton.draw();
    }
}
