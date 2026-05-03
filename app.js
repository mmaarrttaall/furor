// ===== ESTAT GENERAL =====

let equipos = [];
let ganadorIndex = null;
let bloqueado = false;
let pruebaActual = "paraula";
let timers = [];

let rondasPorPrueba = {
  paraula: 1,
  lletra: 1
};

// ===== INICI =====

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

function crearCampos() {
  const cantidad = parseInt(selector.value);
  nombresEquipos.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    nombresEquipos.innerHTML += `<input id="equipo${i}" value="Equip ${i + 1}">`;
  }
}

function empezarJuego() {
  const cantidad = parseInt(selector.value);
  equipos = [];

  for (let i = 0; i < cantidad; i++) {
    equipos.push({
      nombre: document.getElementById("equipo" + i).value,
      puntos: 0
    });
  }

  pruebaActual = document.getElementById("pruebaInicial").value;

  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("juego").classList.remove("oculto");

  actualizarMarcador();
  actualizarTituloRonda();
  cargarPrueba();
}

// ===== MARCADOR =====

function actualizarMarcador() {
  const marcador = document.getElementById("marcador");
  marcador.innerHTML = "";

  equipos.forEach((equipo) => {
    marcador.innerHTML += `
      <div class="equipo">
        <div class="equipo-nombre">${equipo.nombre}</div>
        <div class="equipo-puntos">${equipo.puntos}</div>
      </div>
    `;
  });
}

// ===== RONDES =====

function actualizarTituloRonda() {
  document.getElementById("tituloRonda").innerText =
    "Ronda " + rondasPorPrueba[pruebaActual];
}

function siguienteRonda() {
  limpiarTimers();

  rondasPorPrueba[pruebaActual]++;
  actualizarTituloRonda();

  if (pruebaActual === "paraula") {
    siguienteParaula();
  }

  if (pruebaActual === "lletra") {
    siguienteLetra();
  }

  reiniciarPulsadores();
  cargarPrueba();
}

// ===== PROVES =====

function cambiarPrueba(nombrePrueba) {
  limpiarTimers();
  pruebaActual = nombrePrueba;

  reiniciarPulsadores();
  actualizarTituloRonda();
  cargarPrueba();
}

function cargarPrueba() {
  if (pruebaActual === "paraula") cargarPruebaParaula();
  if (pruebaActual === "lletra") cargarPruebaLletra();
}

// ===== TIMERS =====

function limpiarTimers() {
  timers.forEach(timer => clearTimeout(timer));
  timers = [];
}

// ===== PULSADORS =====

document.addEventListener("keydown", function(event) {
  if (document.getElementById("juego").classList.contains("oculto")) return;
  if (bloqueado) return;

  let indice = null;

  if (event.key === "1") indice = 0;
  if (event.key === "2") indice = 1;
  if (event.key === "3") indice = 2;
  if (event.key === "4") indice = 3;

  if (indice !== null && equipos[indice]) {
    ganadorIndex = indice;
    bloqueado = true;

    document.getElementById("ganador").innerText =
      "🏆 " + equipos[indice].nombre + " ha premut primer!";

    sonidoBuzzer();
    animacionGanador();
  }
});

// ===== PUNTS =====

function darPunto() {
  if (ganadorIndex === null) return;
  equipos[ganadorIndex].puntos += 1;
  actualizarMarcador();
}

function quitarPunto() {
  if (ganadorIndex === null) return;
  equipos[ganadorIndex].puntos -= 1;
  actualizarMarcador();
}

function reiniciarPulsadores() {
  ganadorIndex = null;
  bloqueado = false;
  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

// ===== SONS =====

function sonidoBuzzer() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
