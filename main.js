import GameHandler from "./gameHandler.js";
let gameHandler = new GameHandler();
let images = {};
let gameFont;
// This file serves as the main engine for the game, but relies on gameHandler for true logic. Closer to being UI (due to button / keypress).

function preload() {
    images.background = loadImage("assets/bck@2x.png");

    images.left = loadImage("assets/bunny-left@2x.png");
    images.leftJump = loadImage("assets/bunny-left-odskok@2x.png");

    images.right = loadImage("assets/bunny-right@2x.png");
    images.rightJump = loadImage("assets/bunny-right-odskok@2x.png");}

    gameFont = loadFont("assets/DoodleJump.ttf");

function setup() {
    createCanvas(gameHandler.canvasWidth, gameHandler.canvasHeight);
    textFont(gameFont);
}

function draw() {
    image(images.background, 0, 0, width, height);
    if (gameHandler.currentGameState === gameHandler.gameStates.play) {

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            gameHandler.moveCharacter(-5); 
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            gameHandler.moveCharacter(5);
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

