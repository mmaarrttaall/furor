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

function instruccionesParaula() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>
        Digues una cançó que contingui aquesta paraula.
      </p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;

  document.getElementById("ganador").innerText = "";
}

function cargarPruebaParaula() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="palabra-grande">
      ${palabras[indicePalabra]}
    </div>
  `;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

function siguienteParaula() {
  indicePalabra++;

  if (indicePalabra >= palabras.length) {
    indicePalabra = 0;
  }
}
