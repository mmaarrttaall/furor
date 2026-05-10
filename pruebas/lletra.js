// ===== LLETRA OCULTA =====

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
  }
];

let indiceLetra = 0;

// ===== VIDEO INICIAL =====

function instruccionesLletra() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="video-cascos">
      <video width="650" controls preload="auto">
        <source src="./videos/lletra.mp4" type="video/mp4">
      </video>
    </div>

    <button onclick="comenzarPrueba()">Començar</button>
  `;

  document.getElementById("ganador").innerText = "";
}

// ===== CARGAR PRUEBA =====

function cargarPruebaLletra() {
  const item = letrasOcultas[indiceLetra];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="spotify-box">
      <iframe
        style="border-radius:12px"
        src="${item.spotify}"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; encrypted-media"
        loading="lazy">
      </iframe>
    </div>

    <button onclick="empezarLetra()" class="boton-spotify">
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

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

// ===== INICIAR LETRA =====

function empezarLetra() {
  const item = letrasOcultas[indiceLetra];

  const l1 = document.getElementById("linea1");
  const l2 = document.getElementById("linea2");

  limpiarTimers();

  l1.innerHTML = "";
  l2.innerHTML = "";

  item.frases.forEach((frase, index) => {
    const timer = setTimeout(() => {
      l1.innerHTML = frase.linea1;
      l2.innerHTML = frase.linea2;

      if (index === item.frases.length - 1) {
        sonidoCensura();
        document.getElementById("ganador").innerText = "✋ Adivina la paraula!";
      }
    }, frase.tiempo);

    guardarTimer(timer);
  });
}

// ===== RESPUESTA =====

function mostrarRespuestaLetra() {
  const respuesta = document.getElementById("respuestaLetra");

  if (respuesta) {
    respuesta.style.display = "block";
  }
}

// ===== SIGUIENTE =====

function siguienteLetra() {
  indiceLetra++;

  if (indiceLetra >= letrasOcultas.length) {
    indiceLetra = 0;
  }
}
