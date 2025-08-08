export function iniciarTresEnRaya() {

// Seleccionamos el contenedor del tablero y botón reiniciar
const board = document.getElementById('board');
const restartBtn = document.getElementById('restart-btn');
const turnInfo = document.getElementById('turn-info');
const scoreInfo = document.getElementById('score-info');

// Variables para el juego
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let scores = { X: 0, O: 0 };

restartBtn.addEventListener('click', restartGame);
// Mostrar botón volver solo en móviles
const volverBtn = document.getElementById('volver-btn');
if (window.innerWidth <= 600 && volverBtn) {
  volverBtn.style.display = 'block';
}


// Función para crear las celdas del tablero
function createBoard() {
  board.innerHTML = ''; // Limpiamos tablero
  for(let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Función para manejar click en celda
function handleCellClick(e) {
  const index = e.target.dataset.index;

  // Si ya está ocupada o el juego terminó no hacemos nada
  if (boardState[index] || checkWinner()) return;

  // Marcamos la jugada
  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Revisamos si alguien ganó
  if (checkWinner()) {
    alert(`¡Jugador ${currentPlayer} gana!`);
    scores[currentPlayer]++;
    updateScore();
  } else if (boardState.every(cell => cell !== null)) {
    alert('¡Empate!');
  } else {
    // Cambiamos de turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnInfo();
  }
}

// Función para actualizar el texto del turno
function updateTurnInfo() {
  turnInfo.textContent = `Turno de ${currentPlayer}`;
}

// Función para actualizar la puntuación en pantalla y guardar en localStorage
function updateScore() {
  scoreInfo.textContent = `Puntuación ➡️ X: ${scores.X} | O: ${scores.O}`;
  localStorage.setItem('tresEnRayaScores', JSON.stringify(scores));
}

// Función para revisar ganador
function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // filas
    [0,3,6],[1,4,7],[2,5,8], // columnas
    [0,4,8],[2,4,6]          // diagonales
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

// Función para reiniciar el juego
function restartGame() {
  boardState.fill(null);
  currentPlayer = 'X';
  updateTurnInfo();
  createBoard();
  // Reiniciar puntuaciones
  scores = { X: 0, O: 0 };
  localStorage.removeItem('tresEnRayaScores');
  updateScore();

  updateTurnInfo();
  createBoard();
}

// Función para cargar puntuaciones desde localStorage
function loadScores() {
  const savedScores = JSON.parse(localStorage.getItem('tresEnRayaScores'));
  if (savedScores) {
    scores = savedScores;
  }
  updateScore();
}

// Inicializamos el juego
createBoard();
loadScores();
updateTurnInfo();

// Eventos
restartBtn.addEventListener('click', restartGame);
}

