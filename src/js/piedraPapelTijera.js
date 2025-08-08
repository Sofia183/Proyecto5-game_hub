// piedraPapelTijera.js

export function iniciarPiedraPapelTijera() {
  const choicesButtons = document.querySelectorAll('#piedra-papel-tijera .choices button');
  const resultadoText = document.getElementById('resultado-text');
  const scorePpt = document.getElementById('score-ppt');
  const restartBtn = document.getElementById('restart-ppt-btn');

  let scores = { jugador: 0, sofia: 0 };

  // Cargar puntuación desde localStorage
  function loadScores() {
    const savedScores = JSON.parse(localStorage.getItem('pptScores'));
    if (savedScores) {
      scores = savedScores;
    }
    updateScore();
  }

  // Actualizar texto de puntuación
  function updateScore() {
    scorePpt.textContent = `Puntuación ➡️ Jugador: ${scores.jugador} | Sofia: ${scores.sofia}`;
    localStorage.setItem('pptScores', JSON.stringify(scores));
  }

  // Computadora elige aleatoriamente
  function sofiaElige() {
    const opciones = ['piedra', 'papel', 'tijera'];
    return opciones[Math.floor(Math.random() * opciones.length)];
  }

  // Lógica para decidir ganador
  function decidirGanador(jugador, sofia) {
    if (jugador === sofia) return 'Empate';
    if (
      (jugador === 'piedra' && sofia === 'tijera') ||
      (jugador === 'papel' && sofia === 'piedra') ||
      (jugador === 'tijera' && sofia === 'papel')
    ) return 'Jugador';
    return 'Sofia';
  }

  // Manejar elección jugador
  function handleChoice(e) {
    const jugadorEleccion = e.target.dataset.choice;
    const sofiaEleccion = sofiaElige();
    const ganador = decidirGanador(jugadorEleccion, sofiaEleccion);

    if (ganador === 'Jugador') {
      scores.jugador++;
      resultadoText.textContent = `¡Ganaste! 😎 ${jugadorEleccion} vence a ${sofiaEleccion}`;
    } else if (ganador === 'Sofia') {
      scores.sofia++;
      resultadoText.textContent = `Perdiste 😢 ${sofiaEleccion} vence a ${jugadorEleccion}`;
    } else {
      resultadoText.textContent = `¡Empate! Ambos eligieron ${jugadorEleccion}`;
    }

    updateScore();
  }

  // Reiniciar juego (reiniciar puntuaciones y texto)
  function restartGame() {
    scores = { jugador: 0, sofia: 0 };
    updateScore();
    resultadoText.textContent = 'Haz tu elección';
  }

  // Añadir eventos a botones de elección
  choicesButtons.forEach(button => button.addEventListener('click', handleChoice));

  // Evento para reiniciar
  restartBtn.addEventListener('click', restartGame);

  loadScores();
}
