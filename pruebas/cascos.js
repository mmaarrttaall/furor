// ===== AURICULAR I CANTA =====

const cancionesCascos = [
  {
    spotify: "https://open.spotify.com/embed/track/7GvCDhqL17l7IrjIcYhRQ9"
  },
  {
    spotify: "https://open.spotify.com/embed/track/1FhRIZtz1d4qLVe4928exT"
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
    <div class="spotify-oculto">
      <iframe
        src="${item.spotify}"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; encrypted-media"
        loading="lazy">
      </iframe>
    </div>

    <p>(Només el jugador amb cascos ha de mirar la pantalla)</p>
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
