
//#region 

let canvas;
let canvasContext;
let ballX = 50;
let ballY = 100;
let paddle1Y = 250;
let paddle2Y = 250;
let ballSpeedX = 10;
let ballSpeedY = 10;

let player1Score = 0;
let player2Score = 0;

const WINNING_SCORE = 19;
const PADDLE_THICKNESS = 19;
const PADDLE_HEIGHT = 300;

//#endregion

window.onload = function () {
    canvas = document.getElementById('canvas-game');
    canvasContext = canvas.getContext('2d');
    let framePerSecond = 32;
    setInterval(() => {
        draw();
        move();
    }, 1000 / framePerSecond);

    canvas.addEventListener('mousemove', (evt) => {
        console.log(evt);
        let mousePosition = getMousePosition(evt);
        paddle1Y = mousePosition.y - PADDLE_HEIGHT;
    });
}


getMousePosition = (evt) => {
    let x = evt.clientX;
    let y = evt.clientY;
    return {
        x, y
    }
}

ballRest = () => {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {

    }
    ballSpeedX = - ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

computerMovment = () => {
    let paddle2Center = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2Center < ballY + 10) {
        paddle2Y += 10;
    } else if (paddle2Center > ballY + 10) {
        paddle2Y -= 10;
    }
}

move = () => {
    computerMovment();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            ballSpeedY = deltaY * .35
        } else {
            player2Score++;
            ballRest();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            ballSpeedY = deltaY * .35
        } else {
            player1Score++;
            ballRest();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

draw = () => {
    // draw context
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // draw dash lines
    drawDashedLines()

    // draw paddle left
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'red');

    // draw paddle right
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // draw circle
    drawCircle(ballX, ballY, 10, 'white');
}

drawDashedLines = () => {
    for (let index = 0; index <= canvas.height; index += 30) {
        colorRect(canvas.width / 2, index, 2, 20, 'white')
    }
}

colorRect = (x, y, width, height, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(x, y, width, height);
}

drawCircle = (ballX, ballY, radius, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}