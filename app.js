// ===== ESTAT GENERAL =====

const estado = {
  equipos: [],
  ganadorIndex: null,
  bloqueado: false,
  pruebaActual: "paraula",
  pruebaInicial: "paraula",
  enInstrucciones: true,
  timers: [],
  rondasPorPrueba: {
    paraula: 1,
    lletra: 1,
    any: 1,
    cascos: 1
  }
};

// ===== PROVES =====

function obtenerPruebas() {
  return {
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
    },

    any: {
      titulo: "Títol i autor",
      instrucciones: instruccionesAny,
      cargar: cargarPruebaAny,
      siguiente: siguienteAny
    },

    cascos: {
      titulo: "Auricular i canta",
      instrucciones: instruccionesCascos,
      cargar: cargarPruebaCascos,
      siguiente: siguienteCascos
    }
  };
}

// ===== ELEMENTS HTML =====

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

// ===== INICI =====

function crearCampos() {
  nombresEquipos.innerHTML = "";

  for (let i = 0; i < selector.value; i++) {
    nombresEquipos.innerHTML += `
      <input id="equipo${i}" value="Equip ${i + 1}">
    `;
  }
}

function seleccionarPruebaInicial(nombre) {
  estado.pruebaInicial = nombre;

  document.querySelectorAll(".boto-prova-inicial").forEach(boton => {
    boton.classList.remove("seleccionat");
  });

  const idBoton = "btnInicial" + nombre.charAt(0).toUpperCase() + nombre.slice(1);
  const botonSeleccionado = document.getElementById(idBoton);

  if (botonSeleccionado) {
    botonSeleccionado.classList.add("seleccionat");
  }
}

function empezarJuego() {
  estado.equipos = [];
  estado.ganadorIndex = null;
  estado.bloqueado = false;
  estado.pruebaActual = estado.pruebaInicial;

  for (let i = 0; i < selector.value; i++) {
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
  const pruebas = obtenerPruebas();

  document.getElementById("tituloPrueba").innerText =
    pruebas[estado.pruebaActual].titulo;

  if (estado.enInstrucciones) {
    document.getElementById("tituloRonda").innerText = "";
  } else {
    document.getElementById("tituloRonda").innerText =
      "Ronda " + estado.rondasPorPrueba[estado.pruebaActual];
  }
}

// ===== PROVES =====

function mostrarInstrucciones() {
  limpiarTimers();

  estado.enInstrucciones = true;
  actualizarTitulos();

  obtenerPruebas()[estado.pruebaActual].instrucciones();
}

function comenzarPrueba() {
  limpiarTimers();

  estado.enInstrucciones = false;
  actualizarTitulos();
  cargarPrueba();
}

function cargarPrueba() {
  limpiarTimers();

  obtenerPruebas()[estado.pruebaActual].cargar();
}

function cambiarPrueba(nombre) {
  limpiarTimers();

  estado.pruebaActual = nombre;
  reiniciarPulsadores();
  mostrarInstrucciones();
}

function siguienteRonda() {
  limpiarTimers();

  const pruebas = obtenerPruebas();

  estado.rondasPorPrueba[estado.pruebaActual]++;
  pruebas[estado.pruebaActual].siguiente();

  estado.enInstrucciones = false;

  reiniciarPulsadores();
  actualizarTitulos();
  cargarPrueba();
}

// ===== TIMERS =====

function guardarTimer(timer) {
  estado.timers.push(timer);
}

function limpiarTimers() {
  estado.timers.forEach(timer => clearTimeout(timer));
  estado.timers = [];
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

// ===== PULSADORS =====

document.addEventListener("keydown", function(event) {
  if (document.getElementById("juego").classList.contains("oculto")) return;
  if (estado.enInstrucciones) return;
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

  const ganador = document.getElementById("ganador");

  if (ganador) {
    ganador.innerText = "Esperant pulsador...";
  }

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

  gain.gain.setValueAtTime(1.0, ctx.currentTime);
  gain.gain.setValueAtTime(1.0, ctx.currentTime + 1.5);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 2);
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
