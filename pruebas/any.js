const cancionesAny = [
  {
    spotify: "https://open.spotify.com/embed/track/3gxOPs7aBe5SJUcvYew6Ax",
    any: 2023
  }
];

let indiceAny = 0;

function instruccionesAny() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>Endevina l’any de la cançó (±2 anys)</p>
      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;
}

function cargarPruebaAny() {
  const item = cancionesAny[indiceAny];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="spotify-oculto">
      <iframe src="${item.spotify}" width="100%" height="152"></iframe>
      <div class="tapa-spotify">🎵 Escolta</div>
    </div>

    <button onclick="mostrarRespuestaAny()">Veure resposta</button>

    <div id="respuestaAny" class="respuesta">
      Any: ${item.any}<br>
      Vàlid: ${item.any - 2} - ${item.any + 2}
    </div>
  `;
}

function mostrarRespuestaAny() {
  document.getElementById("respuestaAny").style.display = "block";
}

function siguienteAny() {
  indiceAny = (indiceAny + 1) % cancionesAny.length;
}
