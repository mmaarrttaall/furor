// ===== PROVA PARAULA =====

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

function cargarPruebaParaula() {
  document.getElementById("tituloPrueba").innerText = "Prova: Cançó amb paraula";

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="texto-prueba">
      Digues una cançó que contingui aquesta paraula:
    </div>

    <div class="palabra-grande">
      ${palabras[indicePalabra]}
    </div>

    <div class="ayuda">
      Prem 1, 2, 3 o 4 quan un equip sàpiga la resposta.
    </div>
  `;
}

function siguienteParaula() {
  indicePalabra++;

  if (indicePalabra >= palabras.length) {
    indicePalabra = 0;
  }
}
