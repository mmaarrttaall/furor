// ===== CANÇÓ AMB PARAULA =====

const palabras = [
  "AMOR",
  "NIT",
  "COR",
  "BALLAR",
  "SOL",
  "LLUNA",
  "MAR",
  "VIDA",
  "BESO",
  "LOVE",
  "DANCE",
  "HEART"
];

let indicePalabra = 0;

// ===== VIDEO INICIAL =====

function instruccionesParaula() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="video-cascos">
      <video width="650" controls preload="auto">
        <source src="./videos/paraula.mp4" type="video/mp4">
      </video>
    </div>

    <button onclick="comenzarPrueba()">Començar</button>
  `;

  document.getElementById("ganador").innerText = "";
}

// ===== CARGAR PRUEBA =====

function cargarPruebaParaula() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="palabra-grande">
      ${palabras[indicePalabra]}
    </div>
  `;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

// ===== SIGUIENTE =====

function siguienteParaula() {
  indicePalabra++;

  if (indicePalabra >= palabras.length) {
    indicePalabra = 0;
  }
}
