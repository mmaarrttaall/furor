// ===== AURICULAR I CANTA =====

const cancionesCascos = [
  {
    video: "videos/cascos.mp4"
  }
];

let indiceCascos = 0;

// ===== INSTRUCCIONES =====

function instruccionesCascos() {
  comenzarPrueba();
}

// ===== CARGAR PRUEBA =====

function cargarPruebaCascos() {
  const item = cancionesCascos[indiceCascos];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="video-cascos">
      <video width="650" controls autoplay>
        <source src="${item.video}" type="video/mp4">
        El teu navegador no pot reproduir aquest vídeo.
      </video>
    </div>
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
