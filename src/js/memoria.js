export function iniciarMemoria() {
  const botones = {
    verde: document.getElementById('verde'),
    rojo: document.getElementById('rojo'),
    amarillo: document.getElementById('amarillo'),
    azul: document.getElementById('azul'),
    morado: document.getElementById('morado'),
    rosa: document.getElementById('rosa'),
    naranja: document.getElementById('naranja'),
    celeste: document.getElementById('celeste')
  };

  const nivelInfo = document.getElementById('nivel-info');
  const startBtn = document.getElementById('start-memoria');
  const dificultadSelect = document.getElementById('dificultad');

  let coloresDisponibles = [];
  let secuencia = [];
  let secuenciaUsuario = [];
  let nivel = 1;
  let puedeJugar = false;

  function configurarDificultad() {
    const dificultad = dificultadSelect.value;

    // Ocultar y reiniciar todos los botones
    Object.values(botones).forEach(btn => {
      btn.hidden = true;
      btn.classList.add('oculto');
      btn.classList.remove('color-real'); // ← asegurarse que no se muestre el color
    });

    if (dificultad === 'facil') {
      coloresDisponibles = ['verde', 'rojo', 'amarillo', 'azul'];
    } else {
      coloresDisponibles = ['verde', 'rojo', 'amarillo', 'azul', 'morado', 'rosa', 'naranja', 'celeste'];
    }

    // Mostrar los botones de la dificultad actual, pero en gris oscuro
    coloresDisponibles.forEach(color => {
      const btn = botones[color];
      btn.hidden = false;
      btn.classList.add('oculto');
      btn.classList.remove('color-real'); // eliminar cualquier color visible anterior
    });
  }

  function iniciarJuego() {
    configurarDificultad();
    nivel = 1;
    secuencia = [];

    siguienteNivel();
  }

  function siguienteNivel() {
    puedeJugar = false;
    secuenciaUsuario = [];
    const nuevoColor = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    secuencia.push(nuevoColor);
    nivelInfo.textContent = `Nivel: ${nivel}`;
    mostrarSecuencia();
  }

  function mostrarSecuencia() {
    let i = 0;
    const intervalo = setInterval(() => {
      activarBoton(secuencia[i]);
      i++;
      if (i >= secuencia.length) {
        clearInterval(intervalo);
        puedeJugar = true;
      }
    }, 800);
  }

  function activarBoton(color) {
    const btn = botones[color];
    btn.classList.add('color-real');
    btn.classList.remove('oculto');
    btn.classList.add('active');

    setTimeout(() => {
      btn.classList.remove('active');
      btn.classList.remove('color-real');
      btn.classList.add('oculto');
    }, 400);
  }

  function manejarClick(e) {
    if (!puedeJugar) return;
    const colorSeleccionado = e.target.dataset.color;
    secuenciaUsuario.push(colorSeleccionado);
    activarBoton(colorSeleccionado);

    const index = secuenciaUsuario.length - 1;
    if (colorSeleccionado !== secuencia[index]) {
      alert('¡Fallaste! Juego terminado.');
      puedeJugar = false;
      return;
    }

    if (secuenciaUsuario.length === secuencia.length) {
      nivel++;
      setTimeout(siguienteNivel, 1000);
    }
  }

  // Eventos de clic
  Object.values(botones).forEach(btn => {
    btn.addEventListener('click', manejarClick);
  });

  startBtn.addEventListener('click', iniciarJuego);
  dificultadSelect.addEventListener('change', configurarDificultad);

  // Inicializar
  configurarDificultad();
}

