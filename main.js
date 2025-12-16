import GameHandler from "./gameHandler.js";
let gameHandler = new GameHandler();

// This file serves as the main engine for the game, but relies on gameHandler for true logic. Closer to being UI (due to button / keypress).


function setup() {
    createCanvas(gameHandler.canvasWidth, gameHandler.canvasHeight);
}

function draw() {
    background(100, 100, 100);

    if (gameHandler.currentGameState === gameHandler.gameStates.play) {

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            gameHandler.moveCharacter(-6); 
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            gameHandler.moveCharacter(6);
        }
    }

    switch (gameHandler.currentGameState) {
        case gameHandler.gameStates.start:
            gameHandler.startMenu();
            break;
        case gameHandler.gameStates.play:
            gameHandler.playGame();
            break;
        case gameHandler.gameStates.death:
            gameHandler.endGame();
            break;
        default:
            console.error("Error: draw() main");
    }
}

// Button logic here as it cannot be taken into classes.
function mousePressed() {
    switch (gameHandler.currentGameState) {
        case gameHandler.gameStates.start:
            if (gameHandler.gameButtons.startButton.isHovered()) {
                gameHandler.resetGame();
                gameHandler.changeGameState(gameHandler.gameStates.play);
            }
            break;
        case gameHandler.gameStates.death:
            if (gameHandler.gameButtons.deathButton.isHovered()) {
                gameHandler.resetGame();
                gameHandler.changeGameState(gameHandler.gameStates.play);
            }
            break;

        default:
            console.error("Error: mousePressed()");
    }
}

