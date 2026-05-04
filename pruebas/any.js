const canciones = [
  {
    spotify: "https://open.spotify.com/embed/track/3gxOPs7aBe5SJUcvYew6Ax",
    titulo: "Despechá",
    autor: "Rosalía"
  }
];

let indiceCancion = 0;

function instruccionesAny() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>Endevina el títol i l’artista</p>
      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;
}

function cargarPruebaAny() {
  const item = canciones[indiceCancion];

  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="spotify-oculto">
      <iframe src="${item.spotify}"></iframe>
    </div>

    <button onclick="mostrarRespuestaAny()">Veure resposta</button>

    <div id="respuestaAny" class="respuesta">
      ${item.titulo} - ${item.autor}
    </div>
  `;
}

function mostrarRespuestaAny() {
  document.getElementById("respuestaAny").style.display = "block";
}

function siguienteAny() {
  indiceCancion = (indiceCancion + 1) % canciones.length;
}
