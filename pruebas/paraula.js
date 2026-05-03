// ===== PROVA PARAULA =====

const palabras = [
  "AMOR", "NIT", "COR", "BALLAR", "SOL", "LLUNA",
  "MAR", "VIDA", "BESO", "LOVE", "DANCE", "HEART"
];

let indicePalabra = 0;

function cargarPruebaParaula() {
  document.getElementById("tituloPrueba").innerText = "Prova: Cançó amb paraula";

  document.getElementById("contenidoPrueba").innerHTML = `
    <div style="font-size:28px;">Digues una cançó que contingui aquesta paraula:</div>
    <div class="palabra-grande">${palabras[indicePalabra]}</div>
  `;
}

function siguienteParaula() {
  indicePalabra++;
  if (indicePalabra >= palabras.length) indicePalabra = 0;
}
