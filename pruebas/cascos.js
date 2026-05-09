// ===== AURICULAR I CANTA =====

const cancionesCascos = [
  {
    video: "videos/despacito.mp4"
  },
  {
    video: "videos/labomba.mp4"
  }
];

let indiceCascos = 0;

// ===== INSTRUCCIONES =====

function instruccionesCascos() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>
        Un jugador es posa els cascos i escolta la cançó.
        Ha de cantar-la sense dir paraules.
        El seu equip ha d’endevinar-la.
      </p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;

  document.getElementById("ganador").innerText = "";
}

// ===== CARGAR PRUEBA =====

function cargarPruebaCascos() {
  const item = cancionesCascos[indiceCascos];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="video-cascos">
      <video width="650" controls>
        <source src="${item.video}" type="video/mp4">
        El teu navegador no pot reproduir aquest vídeo.
      </video>
    </div>

    <p>🎧 Posa't els cascos i dona-li al play</p>
  `;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

// ===== SIGUIENTE =====

function siguienteCascos() {
  indiceCascos++;

  if (indiceCascos >= cancionesCascos.length) {
    indiceCascos = 0;
  }
}
