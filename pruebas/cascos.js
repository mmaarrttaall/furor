// ===== AURICULAR I CANTA =====

const cancionesCascos = [
  "Despacito",
  "La Bomba",
  "Macarena",
  "Aserejé",
  "Waka Waka"
];

let indiceCascos = 0;

function instruccionesCascos() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>
        Un jugador es posa els cascos i escolta una cançó.
        Ha de cantar-la sense dir cap paraula.
        El seu equip ha d’endevinar-la.
      </p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;

  document.getElementById("ganador").innerText = "";
}

function cargarPruebaCascos() {
  const cancion = cancionesCascos[indiceCascos];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="palabra-grande">
      🎧 ${cancion}
    </div>

    <p>(Només el jugador amb cascos ha de mirar això)</p>
  `;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

function siguienteCascos() {
  indiceCascos++;

  if (indiceCascos >= cancionesCascos.length) {
    indiceCascos = 0;
  }
}
