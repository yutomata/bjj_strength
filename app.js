let moves = [];
let currentIndex = 0;
let timer;
let timeLeft = 30;

async function loadMoves() {
  const url = 'https://raw.githubusercontent.com/your-username/your-repo/main/moves.json';
  const res = await fetch(url);
  moves = await res.json();
  currentIndex = 0;
  showMove();
}

function showMove() {
  if (moves.length === 0) return;
  document.getElementById('move').textContent = moves[currentIndex];
  resetTimer();
}

function nextMove() {
  currentIndex = (currentIndex + 1) % moves.length;
  showMove();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById('timer').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      nextMove();
    }
  }, 1000);
}

loadMoves();
