// ===== ESTAT GENERAL DEL JOC =====

const estado = {
  equipos: [],
  ganadorIndex: null,
  bloqueado: false,
  pruebaActual: "paraula",
  timers: [],
  rondasPorPrueba: {
    paraula: 1,
    lletra: 1
  }
};

// ===== PROVES DISPONIBLES =====

const pruebas = {
  paraula: {
    cargar: cargarPruebaParaula,
    siguiente: siguienteParaula
  },
  lletra: {
    cargar: cargarPruebaLletra,
    siguiente: siguienteLetra
  }
};

// ===== ELEMENTS HTML =====

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

// ===== INICI =====

function crearCampos() {
  const cantidad = parseInt(selector.value);
  nombresEquipos.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    nombresEquipos.innerHTML += `
      <input id="equipo${i}" value="Equip ${i + 1}">
    `;
  }
}

function empezarJuego() {
  const cantidad = parseInt(selector.value);

  estado.equipos = [];
  estado.ganadorIndex = null;
  estado.bloqueado = false;

  for (let i = 0; i < cantidad; i++) {
    const input = document.getElementById("equipo" + i);

    estado.equipos.push({
      nombre: input.value.trim() || "Equip " + (i + 1),
      puntos: 0
    });
  }

  estado.pruebaActual = document.getElementById("pruebaInicial").value;

  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("juego").classList.remove("oculto");

  actualizarMarcador();
  actualizarTituloRonda();
  cargarPrueba();
  reiniciarPulsadores();
}

// ===== MARCADOR =====

function actualizarMarcador() {
  const marcador = document.getElementById("marcador");
  marcador.innerHTML = "";

  estado.equipos.forEach((equipo, index) => {
    const claseGanador = index === estado.ganadorIndex ? "equipo seleccionado" : "equipo";

    marcador.innerHTML += `
      <div class="${claseGanador}">
        <div class="equipo-nombre">${equipo.nombre}</div>
        <div class="equipo-puntos">${equipo.puntos}</div>
      </div>
    `;
  });
}

// ===== RONDES =====

function actualizarTituloRonda() {
  document.getElementById("tituloRonda").innerText =
    "Ronda " + estado.rondasPorPrueba[estado.pruebaActual];
}

function siguienteRonda() {
  limpiarTimers();

  estado.rondasPorPrueba[estado.pruebaActual]++;

  if (pruebas[estado.pruebaActual]) {
    pruebas[estado.pruebaActual].siguiente();
  }

  actualizarTituloRonda();
  reiniciarPulsadores();
  cargarPrueba();
}

// ===== PROVES =====

function cambiarPrueba(nombrePrueba) {
  if (!pruebas[nombrePrueba]) return;

  limpiarTimers();

  estado.pruebaActual = nombrePrueba;

  actualizarTituloRonda();
  reiniciarPulsadores();
  cargarPrueba();
}

function cargarPrueba() {
  limpiarTimers();

  if (pruebas[estado.pruebaActual]) {
    pruebas[estado.pruebaActual].cargar();
  }
}

// ===== TIMERS =====

function guardarTimer(timer) {
  estado.timers.push(timer);
}

function limpiarTimers() {
  estado.timers.forEach(timer => clearTimeout(timer));
  estado.timers = [];
}

// ===== PULSADORS =====

document.addEventListener("keydown", function(event) {
  if (document.getElementById("juego").classList.contains("oculto")) return;
  if (estado.bloqueado) return;

  let indice = null;

  if (event.key === "1") indice = 0;
  if (event.key === "2") indice = 1;
  if (event.key === "3") indice = 2;
  if (event.key === "4") indice = 3;

  if (indice !== null && estado.equipos[indice]) {
    estado.ganadorIndex = indice;
    estado.bloqueado = true;

    document.getElementById("ganador").innerText =
      "🏆 " + estado.equipos[indice].nombre + " ha premut primer!";

    sonidoBuzzer();
    animacionGanador();
    actualizarMarcador();
  }
});

// ===== PUNTS =====

function darPunto() {
  if (estado.ganadorIndex === null) return;

  estado.equipos[estado.ganadorIndex].puntos++;
  actualizarMarcador();
}

function quitarPunto() {
  if (estado.ganadorIndex === null) return;

  estado.equipos[estado.ganadorIndex].puntos--;
  actualizarMarcador();
}

function reiniciarPulsadores() {
  estado.ganadorIndex = null;
  estado.bloqueado = false;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
  actualizarMarcador();
}

// ===== SONS =====

function crearAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

function sonidoBuzzer() {
  const ctx = crearAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 180;

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

function sonidoCensura() {
  const ctx = crearAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.value = 900;

  gain.gain.setValueAtTime(0.45, ctx.currentTime);
  gain.gain.setValueAtTime(0.45, ctx.currentTime + 1.8);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 2.2);
}

// ===== ANIMACIONS =====

function animacionGanador() {
  document.body.classList.remove("flash");
  void document.body.offsetWidth;
  document.body.classList.add("flash");

  const ganador = document.getElementById("ganador");
  ganador.classList.remove("activo");
  void ganador.offsetWidth;
  ganador.classList.add("activo");
}

// ===== INIT =====

selector.addEventListener("change", crearCampos);
crearCampos();
