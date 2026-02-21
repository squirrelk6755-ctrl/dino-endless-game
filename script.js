let character = document.getElementById("character");
let game = document.getElementById("game");
let scoreDisplay = document.getElementById("score");

let score = 0;
let isGameOver = false;
let gameSpeed = 6;

// Jump
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!character.classList.contains("jump")) {
      character.classList.add("jump");
      setTimeout(() => {
        character.classList.remove("jump");
      }, 600);
    }
  }
});

// Create cactus
function spawnCactus() {
  if (isGameOver) return;

  let cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = "800px";
  game.appendChild(cactus);

  let move = setInterval(() => {
    if (isGameOver) {
      clearInterval(move);
      return;
    }

    let cactusLeft = parseInt(cactus.style.left);
    cactus.style.left = cactusLeft - gameSpeed + "px";

    // Collision detection
    let characterBottom = parseInt(
      window.getComputedStyle(character).getPropertyValue("bottom")
    );

    if (cactusLeft < 140 && cactusLeft > 60 && characterBottom < 80) {
      gameOver();
      clearInterval(move);
    }

    // Remove when off screen
    if (cactusLeft < -60) {
      cactus.remove();
      clearInterval(move);
    }

  }, 20);

  // Spawn next cactus safely
  setTimeout(spawnCactus, Math.random() * 2000 + 1500);
}

// Game Over
function gameOver() {
  isGameOver = true;
  alert("💀 Game Over! Score: " + score);
  location.reload();
}

// Score system
setInterval(() => {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    if (score % 300 === 0) {
      gameSpeed++; // increase difficulty
    }
  }
}, 100);

spawnCactus();