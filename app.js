let equipos = [];
let ganadorIndex = null;
let bloqueado = false;
let pruebaActual = "paraula";
let timers = [];

let rondasPorPrueba = {
  paraula: 1,
  lletra: 1
};

const palabras = [
  "AMOR", "NIT", "COR", "BALLAR", "SOL", "LLUNA",
  "MAR", "VIDA", "BESO", "LOVE", "DANCE", "HEART"
];

const letrasOcultas = [
  {
    spotify: "https://open.spotify.com/embed/track/3gxOPs7aBe5SJUcvYew6Ax",
    respuesta: "desmelena",
    frases: [
      { linea1: "Suau, suau", linea2: "Mare meva, quin cacau", tiempo: 1000 },
      { linea1: "Suau, suau", linea2: "Seguim amb el tumbao", tiempo: 5000 },
      { linea1: "Xiringuito (xiringuito)", linea2: "Abanico (abanico)", tiempo: 7000 },
      { linea1: "Pa-ra-ba-ra-ba,", linea2: "pa-ra-ri-pa-pa", tiempo: 11000 },
      { linea1: "La Marina està morena", linea2: "Es pentina, es fa una trena", tiempo: 14000 },
      { linea1: "Lo rompe, lo rompe, ho trenca", linea2: "Lo rompe, lo rompe, ho trenca", tiempo: 22000 },
      { linea1: "I es _____", linea2: "", tiempo: 28400 }
    ]
  },
  {
    spotify: "https://open.spotify.com/embed/track/6Tnnk7MAnZiDx67DJN2hnx",
    respuesta: "vida",
    frases: [
      { linea1: "Hoy, para mí, es un día especial", linea2: "Hoy saldré por la noche", tiempo: 10000 },
      { linea1: "Podré vivir lo que el mundo nos da", linea2: "Cuando el Sol ya se esconde", tiempo: 17000 },
      { linea1: "Podré cantar una dulce canción", linea2: "A la luz de la Luna", tiempo: 25000 },
      { linea1: "Y acariciar y besar a mi amor", linea2: "Como no lo hice nunca", tiempo: 32000 },
      { linea1: "¿Qué pasará? ¿Qué misterio habrá?", linea2: "Puede ser mi gran noche", tiempo: 38000 },
      { linea1: "Y al despertar, ya mi _____", linea2: "", tiempo: 47000 }
    ]
  }
];

let indicePalabra = 0;
let indiceLetra = 0;

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

function crearCampos() {
  const cantidad = parseInt(selector.value);
  nombresEquipos.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    nombresEquipos.innerHTML += `<input id="equipo${i}" value="Equip ${i + 1}">`;
  }
}

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

function animacionGanador() {
  document.body.classList.remove("flash");
  void document.body.offsetWidth;
  document.body.classList.add("flash");

  const ganador = document.getElementById("ganador");
  ganador.classList.remove("activo");
  void ganador.offsetWidth;
  ganador.classList.add("activo");
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

function actualizarTituloRonda() {
  document.getElementById("tituloRonda").innerText =
    "Ronda " + rondasPorPrueba[pruebaActual];
}

function limpiarTimers() {
  timers.forEach(timer => clearTimeout(timer));
  timers = [];
}

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

function cargarPruebaParaula() {
  document.getElementById("tituloPrueba").innerText = "Prova: Cançó amb paraula";

  document.getElementById("contenidoPrueba").innerHTML = `
    <div style="font-size:28px;">Digues una cançó que contingui aquesta paraula:</div>
    <div class="palabra-grande">${palabras[indicePalabra]}</div>
  `;
}

function cargarPruebaLletra() {
  const item = letrasOcultas[indiceLetra];

  document.getElementById("tituloPrueba").innerText = "Prova: Lletra oculta";

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="spotify-box">
      <iframe
        style="border-radius:12px"
        src="${item.spotify}"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    </div>

    <button onclick="empezarLetra()" style="background:#1DB954;">
      ▶ Començar lletra
    </button>

    <div class="letra-caja">
      <div id="linea1"></div>
      <div id="linea2"></div>
    </div>

    <button onclick="mostrarRespuestaLetra()">Veure resposta</button>

    <div id="respuestaLetra" class="respuesta">
      Resposta: ${item.respuesta}
    </div>
  `;
}

function empezarLetra() {
  const item = letrasOcultas[indiceLetra];
  const l1 = document.getElementById("linea1");
  const l2 = document.getElementById("linea2");

  limpiarTimers();

  l1.innerHTML = "";
  l2.innerHTML = "";

  const respuesta = document.getElementById("respuestaLetra");
  if (respuesta) respuesta.style.display = "none";

  item.frases.forEach((frase, index) => {
    const timer = setTimeout(() => {
      l1.innerHTML = frase.linea1;
      l2.innerHTML = frase.linea2;

      if (index === item.frases.length - 1) {
        sonidoCensura();
        document.body.classList.remove("flash");
        void document.body.offsetWidth;
        document.body.classList.add("flash");
        document.getElementById("ganador").innerText = "✋ Adivina la paraula!";
      }
    }, frase.tiempo);

    timers.push(timer);
  });
}

function mostrarRespuestaLetra() {
  document.getElementById("respuestaLetra").style.display = "block";
}

function siguienteRonda() {
  limpiarTimers();

  rondasPorPrueba[pruebaActual]++;
  actualizarTituloRonda();

  if (pruebaActual === "paraula") {
    indicePalabra++;
    if (indicePalabra >= palabras.length) indicePalabra = 0;
  }

  if (pruebaActual === "lletra") {
    indiceLetra++;
    if (indiceLetra >= letrasOcultas.length) indiceLetra = 0;
  }

  reiniciarPulsadores();
  cargarPrueba();
}

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

selector.addEventListener("change", crearCampos);
crearCampos();
