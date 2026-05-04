// ===== LLETRA OCULTA =====

const letrasOcultas = [
    // CANCIÓN 1 
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

    // CANCIÓN 2 
  {
    spotify: "https://open.spotify.com/track/73scB4Q4fcOmnsBVZPmk32",
    respuesta: "peligrosa",
    frases: [
      { linea1: "¿Qué hubiera sido?", linea2: "Si antes te hubiera conocido", tiempo: 18000 },
      { linea1: "Seguramente...", linea2: "estarías bailando esta conmig", tiempo: 25000 },
      { linea1: "No como amigoso", linea2: "Sino como otra cosa", tiempo: 31000 },
      { linea1: "Usted cerca me pone _____", linea2: "", tiempo: 37000 }
    ]
  }


];

let indiceLetra = 0;

function instruccionesLletra() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>
        Escolta la cançó i endevina la paraula que falta a la lletra.
      </p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;

  document.getElementById("ganador").innerText = "";
}

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

function empezarLetra() {
  const item = letrasOcultas[indiceLetra];

  const l1 = document.getElementById("linea1");
  const l2 = document.getElementById("linea2");
  const ganador = document.getElementById("ganador");

  limpiarTimers();

  l1.innerHTML = "";
  l2.innerHTML = "";
  ganador.innerText = "Escoltant la cançó...";

  item.frases.forEach((frase, index) => {
    const timer = setTimeout(() => {
      l1.innerHTML = frase.linea1;
      l2.innerHTML = frase.linea2;

      if (index === item.frases.length - 1) {
        sonidoCensura();
        ganador.innerText = "✋ Adivina la paraula!";
      }
    }, frase.tiempo);

    guardarTimer(timer);
  });
}

function mostrarRespuestaLetra() {
  const respuesta = document.getElementById("respuestaLetra");

  if (respuesta) {
    respuesta.style.display = "block";
  }
}

function siguienteLetra() {
  indiceLetra++;

  if (indiceLetra >= letrasOcultas.length) {
    indiceLetra = 0;
  }
}
