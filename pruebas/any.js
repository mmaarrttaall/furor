const canciones = [
    // CANCIÓN 1 
  {
    spotify: "https://open.spotify.com/track/7GvCDhqL17l7IrjIcYhRQ9",
    titulo: "La Bomba",
    autor: "King Africa"
  }
      // CANCIÓN 2 
  {
    spotify: "https://open.spotify.com/track/1FhRIZtz1d4qLVe4928exT",
    titulo: "Las Babys",
    autor: "Aitana"
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
