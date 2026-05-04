// ===== ESTAT GENERAL DEL JOC =====

const estado = {
  equipos: [],
  ganadorIndex: null,
  bloqueado: false,
  pruebaActual: "paraula",
  pruebaInicial: "paraula",
  timers: [],
  enInstrucciones: true,
  rondasPorPrueba: {
    paraula: 1,
    lletra: 1
  }
};

// ===== PROVES DISPONIBLES =====

const pruebas = {
  paraula: {
    titulo: "Cançó amb paraula",
    instrucciones: instruccionesParaula,
    cargar: cargarPruebaParaula,
    siguiente: siguienteParaula
  },
  lletra: {
    titulo: "Lletra oculta",
    instrucciones: instruccionesLletra,
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

function seleccionarPruebaInicial(nombrePrueba) {
  estado.pruebaInicial = nombrePrueba;

  document.getElementById("btnInicialParaula").classList.remove("seleccionat");
  document.getElementById("btnInicialLletra").classList.remove("seleccionat");

  if (nombrePrueba === "paraula") {
    document.getElementById("btnInicialParaula").classList.add("seleccionat");
  }

  if (nombrePrueba === "lletra") {
    document.getElementById("btnInicialLletra").classList.add("seleccionat");
  }
}

function empezarJuego() {
  const cantidad = parseInt(selector.value);

  estado.equipos = [];
  estado.ganadorIndex = null;
  estado.bloqueado = false;
  estado.pruebaActual = estado.pruebaInicial;

  for (let i = 0; i < cantidad; i++) {
    const input = document.getElementById("equipo" + i);

    estado.equipos.push({
      nombre: input.value.trim() || "Equip " + (i + 1),
      puntos: 0
    });
  }

  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("juego").classList.remove("oculto");

  actualizarMarcador();
  mostrarInstrucciones();
}

// ===== TITOLS =====

function actualizarTitulos() {
  const titulo = document.getElementById("tituloPrueba");
  const ronda = document.getElementById("tituloRonda");

  titulo.innerText = pruebas[estado.pruebaActual].titulo;

  if (estado.enInstrucciones) {
    ronda.innerText = "";
  } else {
    ronda.innerText = "Ronda " + estado.rondasPorPrueba[estado.pruebaActual];
  }
}

// ===== MARCADOR =====

function actualizarMarcador() {
  const marcador = document.getElementById("marcador");
  marcador.innerHTML = "";

  estado.equipos.forEach((equipo, index) => {
    const clase =
      index === estado.ganadorIndex ? "equipo seleccionado" : "equipo";

    marcador.innerHTML += `
      <div class="${clase}">
        <div class="equipo-nombre">${equipo.nombre}</div>
        <div class="equipo-puntos">${equipo.puntos}</div>
      </div>
    `;
  });
}

// ===== RONDES =====

function siguienteRonda() {
  limpiarTimers();

  estado.rondasPorPrueba[estado.pruebaActual]++;

  if (pruebas[estado.pruebaActual]) {
    pruebas[estado.pruebaActual].siguiente();
  }

  estado.enInstrucciones = false;

  reiniciarPulsadores();
  actualizarTitulos();
  cargarPrueba();
}

// ===== PROVES =====

function cambiarPrueba(nombrePrueba) {
  if (!pruebas[nombrePrueba]) return;

  limpiarTimers();

  estado.pruebaActual = nombrePrueba;

  reiniciarPulsadores();
  mostrarInstrucciones();
}

function mostrarInstrucciones() {
  estado.enInstrucciones = true;

  limpiarTimers();
  actualizarTitulos();

  pruebas[estado.pruebaActual].instrucciones();
}

function comenzarPrueba() {
  estado.enInstrucciones = false;

  actualizarTitulos();
  cargarPrueba();
}

function cargarPrueba() {
  limpiarTimers();

  pruebas[estado.pruebaActual].cargar();
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
  if (estado.bloqueado || estado.enInstrucciones) return;

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
seleccionarPruebaInicial("paraula");
