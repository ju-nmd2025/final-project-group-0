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
        avgPlatformHeight = 280
    ) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gameFloor = gameFloor;
        this.gameSpeed = gameSpeed;
        this.currentGameState = this.gameStates.start;
        this.avgPlatformWidth = avgPlatformWidth;
        this.avgPlatformHeight = avgPlatformHeight;
    }

    changeGameState(newGameState) {
        this.currentGameState = newGameState;
    }

    resetGame() {
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
        this.#spikes = [];
        this.#character.bounce();
    }

    startMenu() {
		this.resetGame();
        this.gameButtons.startButton.draw();
    }

    playGame() {
        this.#character.applyPhysics();

        if (this.#character.vy > 0 && 
        this.#character.isColliding(this.#platforms)) {
        this.#character.bounce();
        }

        generatePlatforms(
            this.#platforms,
            this.gameSpeed,
            this.canvasWidth,
            this.avgPlatformWidth,
            this.avgPlatformHeight
        );

        generateSpikes(this.#spikes, this.gameSpeed, this.canvasWidth);

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
		this.resetGame();
        this.gameButtons.deathButton.draw();
    }
}
