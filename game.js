const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 400;

const scoreText =
document.getElementById("points");

const gameOverBox =
document.getElementById("gameOver");

const finalScore =
document.getElementById("finalScore");

const groundY = 320;

let score = 0;

let gameSpeed = 8;

let gameRunning = true;

class Dino{

    constructor(){

        this.x = 80;

        this.y = groundY - 60;

        this.width = 50;

        this.height = 60;

        this.velocity = 0;

        this.gravity = 0.8;

        this.jumpPower = -18;

        this.onGround = true;
    }

    jump(){

        if(this.onGround){

            this.velocity =
            this.jumpPower;

            this.onGround = false;
        }
    }

    update(){

        this.velocity += this.gravity;

        this.y += this.velocity;

        if(
            this.y >= groundY - this.height
        ){

            this.y =
            groundY - this.height;

            this.velocity = 0;

            this.onGround = true;
        }
    }

    draw(){

        ctx.fillStyle="black";

        ctx.fillRect(
            this.x,
            this.y+10,
            35,
            40
        );

        ctx.fillRect(
            this.x+25,
            this.y,
            25,
            25
        );

        ctx.fillRect(
            this.x+5,
            this.y+50,
            8,
            10
        );

        ctx.fillRect(
            this.x+22,
            this.y+50,
            8,
            10
        );
    }
}

class Cactus{

    constructor(){

        this.width =
        20 + Math.random()*20;

        this.height =
        40 + Math.random()*60;

        this.x =
        canvas.width + 50;

        this.y =
        groundY - this.height;
    }

    update(){

        this.x -= gameSpeed;
    }

    draw(){

        ctx.fillStyle="black";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

const dino = new Dino();

let obstacles = [];

let spawnTimer = 0;

function spawnCactus(){

    obstacles.push(
        new Cactus()
    );
}

function collision(a,b){

    return(
        a.x < b.x+b.width &&
        a.x+a.width > b.x &&
        a.y < b.y+b.height &&
        a.y+a.height > b.y
    );
}

function gameLoop(){

    if(!gameRunning)
        return;

    ctx.fillStyle="white";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY
    );

    ctx.lineTo(
        canvas.width,
        groundY
    );

    ctx.stroke();

    dino.update();

    dino.draw();

    spawnTimer++;

    if(
        spawnTimer >
        60 + Math.random()*40
    ){

        spawnCactus();

        spawnTimer = 0;
    }

    for(
        let i =
        obstacles.length-1;

        i>=0;

        i--
    ){

        obstacles[i].update();

        obstacles[i].draw();

        if(
            collision(
                dino,
                obstacles[i]
            )
        ){

            gameOver();
        }

        if(
            obstacles[i].x < -100
        ){

            obstacles.splice(i,1);

            score++;
        }
    }

    gameSpeed += 0.001;

    scoreText.innerText =
    score;

    requestAnimationFrame(
        gameLoop
    );
}

function gameOver(){

    gameRunning = false;

    finalScore.innerText =
    score;

    gameOverBox.style.display =
    "block";
}

function restartGame(){

    location.reload();
}

document.addEventListener(
"keydown",
e=>{

    if(e.code==="Space")
        dino.jump();
});

canvas.addEventListener(
"click",
()=>{
    dino.jump();
});

canvas.addEventListener(
"touchstart",
()=>{
    dino.jump();
});

gameLoop();