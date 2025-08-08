import { iniciarTresEnRaya } from './tresEnRaya.js';
import { iniciarPiedraPapelTijera } from './piedraPapelTijera.js';
import { iniciarMemoria } from './memoria.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.game-btn');
  const sections = document.querySelectorAll('.game-section');
  const nav = document.querySelector('.game-nav');

 function showMenu() {
  nav.classList.remove('hidden');
  sections.forEach(section => {
    section.classList.remove('active');
    section.hidden = true;

    const back = section.querySelector('.back-arrow');
    if (back) {
      back.hidden = true; // ← Asegura que esté oculta en pantalla principal
    }
  });
  buttons.forEach(btn => btn.classList.remove('active'));
}


function showGame(gameId) {
  nav.classList.add('hidden');
  sections.forEach(section => {
    const back = section.querySelector('.back-arrow');

    if (section.id === gameId) {
      section.classList.add('active');
      section.hidden = false;

      if (back) {
        back.hidden = window.innerWidth > 600 ? true : false;
      }
    } else {
      section.classList.remove('active');
      section.hidden = true;
      if (back) back.hidden = true;
    }
  });

  // Inicializar juego
  if (gameId === 'tres-en-raya') iniciarTresEnRaya();
  else if (gameId === 'piedra-papel-tijera') iniciarPiedraPapelTijera();
  else if (gameId === 'memoria') iniciarMemoria();
}


  // Al cargar página
  if (window.innerWidth <= 600) {
    showMenu();
  } else {
    showGame('tres-en-raya');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.game === 'tres-en-raya');
    });
  }

  // Click en botones menú
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showGame(btn.dataset.game);
    });
  });

  // Click flechas volver
  sections.forEach(section => {
    const back = section.querySelector('.back-arrow');
    if (back) {
      back.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            document.getElementById('volver-btn').style.display = 'block';
} else {
  document.getElementById('volver-btn').style.display = 'none';
          showMenu();
        }
      });
      back.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          back.click();
        }
      });
    }
  });


  
  // Cambio de tamaño ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
      showMenu();
    } else {
      showGame('tres-en-raya');
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.game === 'tres-en-raya');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const volverBtn = document.getElementById('volver-btn').style.display = 'block';
  const gameButtons = document.querySelectorAll('.game-btn');
  const gameSections = document.querySelectorAll('.game-section');

  function actualizarBotonVolver() {
    // Detectar si alguna sección de juego está visible
    const juegoActivo = Array.from(gameSections).some(sec => !sec.hasAttribute('hidden'));
    if (juegoActivo) {
      volverBtn.style.display = 'block';  // mostrar botón volver
    } else {
      volverBtn.style.display = 'none';  // ocultar botón volver
    }
  }

  // Al cargar la página, verificar estado
  actualizarBotonVolver();

  // Al hacer click en botones de juego, cambiar visibilidad y actualizar botón volver
  gameButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const game = btn.getAttribute('data-game');
      // Mostrar solo la sección del juego seleccionado, ocultar las demás
      gameSections.forEach(sec => {
        if (sec.id === game) {
          sec.removeAttribute('hidden');
        } else {
          sec.setAttribute('hidden', '');
        }
      });

      // Marcar el botón activo
      gameButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Actualizar visibilidad botón volver
      actualizarBotonVolver();
    });
  });

});





