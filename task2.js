const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');
const ctx = canvas.getContext('2d');
const zombr = document.querySelector('#zombier');
const zombl = document.querySelector('#zombiel');
let player;
let zomb, zl = 0, zr = 0;
let c, k, pl, pr;
let b = [1, 1, 1, 1, 1, 1, 1];
let y, s;
let i;
let z1r = 0, z1l = 0;
const stars = [];
const zombiesr = [];
const zombiesl = [];
const bullets = [];
let lastDirection = 'r'; 

function drawMoon() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(1255, 150, 70, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(1300, 120, 80, 0, Math.PI * 2, false);
    ctx.fill();
}

function initiateStars() {
    for (i = 0; i < 150; i += 1) {
        stars.push({
            x: Math.random() * (canvas.width),
            y: Math.random() * (canvas.height - 200),
            radius: Math.random() * 2,
            speed: Math.random()
        })
    }
}

function updateStars() {
    for (i = 0; i < 150; i += 1) {
        if (stars[i].x - stars[i].speed > 0) {
            stars[i].x -= stars[i].speed;
        } else {
            stars[i].x = canvas.width;
            stars[i].y = Math.random() * (canvas.height - 200);
            stars[i].radius = Math.random() * 2;
            stars[i].speed = Math.random();
        }
    }
}

function drawStars() {
    stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
    })
}

function initiateZombie() {
    switch (Math.ceil(Math.random() * 2)) {
        case 1: zomb = zombl; y = 1340; s = -1.5; zl += 1; zombiesl.push({ img: zomb, x: y, speed: s }); break;
        default: zomb = zombr; y = -40; s = 1.5; zr += 1; zombiesr.push({ img: zomb, x: y, speed: s }); break;
    }
    z1r = 0;
    z1l = 0;
}

function updateZombies() {
    zombiesr.forEach((zombie, index) => {
        z1r = 0;
        for (i = 0; i < zr - 1; i += 1) {
            if (zombie.x + 30 >= zombiesr[i].x) {
                z1r = 1;
                break;
            }
        }
        if (z1r || ((zombie.x >= 285 && zombie.x <= 375 && b[0] == 1) || (zombie.x >= 380 && zombie.x <= 470 && b[1] == 1) || (zombie.x >= 425 && zombie.x <= 515 && b[2] == 1))) {
        } else {
            zombie.x += zombie.speed;
        }
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x > zombie.x+31 && bullet.x < zombie.x + 100 && bullet.y > 580 && bullet.y < 700) {
                zombiesr.splice(index, 1);
                bullets.splice(bulletIndex, 1);
                zr -= 1;
            }
        });
    });

    zombiesl.forEach((zombie, index) => {
        z1l = 0;
        for (i = 0; i < zl - 1; i += 1) {
            if (zombie.x - 30 <= zombiesl[i].x) {
                z1l = 1;
                break;
            }
        }
        if (z1l || ((zombie.x >= 1005 && zombie.x <= 1095 && b[3] == 1) || (zombie.x >= 910 && zombie.x <= 1000 && b[4] == 1) || (zombie.x >= 865 && zombie.x <= 955 && b[5] == 1) || (zombie.x >= 975 && zombie.x <= 1065 && b[6] == 1))) {
        } else {
            zombie.x += zombie.speed;
        }
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x > zombie.x && bullet.x < zombie.x + 109 && bullet.y > 580 && bullet.y < 700) {
                zombiesl.splice(index, 1);
                bullets.splice(bulletIndex, 1);
                zl -= 1;
            }
        });
    });
}

body.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: k = 'l'; lastDirection = 'l'; break;
        case 39: k = 'r'; lastDirection = 'r'; break;
        case 90: shootBullet(); break; // Z key to shoot bullet
    }
})

body.addEventListener('keyup', () => {
    k = 'n';
})

function drawZombies() {
    zombiesr.forEach(zombie => {
        ctx.drawImage(zombie.img, zombie.x, 500, 150, 200);
    })
    zombiesl.forEach(zombie => {
        ctx.drawImage(zombie.img, zombie.x, 500, 150, 200);
    })
}

function defenceBlocks() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(385, 570, 90, 90);
    ctx.rect(480, 570, 90, 90);
    ctx.rect(525, 480, 90, 90);
    ctx.rect(1055, 570, 90, 90);
    ctx.rect(960, 570, 90, 90);
    ctx.rect(915, 480, 90, 90);
    ctx.rect(1025, 480, 90, 90)
    ctx.fill();
}

function updatePlayer() {
    if ((player >= 385 && player <= 475 && b[0] == 1) || (player >= 480 && player <= 570 && b[1] == 1) || (player >= 525 && player <= 615 && b[2] == 1)) {
        pl = 0;
    } else if (((player + 50) >= 1055 && (player + 50) <= 1145 && b[3] == 1) || ((player + 50) >= 960 && (player + 50) <= 1050 && b[4] == 1) || ((player + 50) >= 915 && (player + 50) <= 1005 && b[5] == 1) || ((player + 50) >= 1025 && (player + 50) <= 1115 && b[6] == 1)) {
        pr = 0;
    } else {
        pl = 1;
        pr = 1;
    }
    if (k == 'r' && pr) {
        player += 2.5;
    } else if (k == 'l' && pl) {
        player -= 2.5;
    }
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(player, 500, 50, 160);
    ctx.fill();
}

function createPlayer() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    player = 725
    ctx.rect(725, 500, 50, 160);
    ctx.fill();
}

// Function to shoot a bullet
function shootBullet() {
    const directionMultiplier = lastDirection === 'r' ? 1 : -1;
    bullets.push({
        x: player + 25, // Start from the center of the player
        y: 500, // Start from the top of the player
        vx: 4 * directionMultiplier, // Horizontal velocity
        vy: -8, // Initial vertical velocity
        gravity: 0.2 // Gravity effect on the bullet
    });
}

// Function to update bullets
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.vy += bullet.gravity; // Update vertical velocity
        bullet.x += bullet.vx; // Update horizontal position
        bullet.y += bullet.vy; // Update vertical position

        // Remove bullet if it goes out of bounds
        if (bullet.y > canvas.height || bullet.x < 0 || bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

// Function to draw bullets
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2, false);
        ctx.fill();
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    defenceBlocks();
    updateZombies();
    drawZombies();
    updateStars();
    drawStars();
    drawMoon();
    updatePlayer();
    updateBullets(); // Update bullet positions
    drawBullets(); // Draw bullets
    requestAnimationFrame(animateStars);
}

let zombieSpawn = setInterval(initiateZombie, 4000);
initiateStars();
createPlayer();
animateStars();
