// ===== TÍTOL I AUTOR =====

const canciones = [
  // CANCIÓN 1
  {
    spotify: "https://open.spotify.com/embed/track/7GvCDhqL17l7IrjIcYhRQ9",
    titulo: "La Bomba",
    autor: "King Africa"
  },

  // CANCIÓN 2
  {
    spotify: "https://open.spotify.com/embed/track/1FhRIZtz1d4qLVe4928exT",
    titulo: "Las Babys",
    autor: "Aitana"
  }
];

let indiceCancion = 0;

function instruccionesAny() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>Endevina el títol i l’artista.</p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
  `;

  document.getElementById("ganador").innerText = "";
}

function cargarPruebaAny() {
  const item = canciones[indiceCancion];

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

    <button onclick="mostrarRespuestaAny()">Veure resposta</button>

    <div id="respuestaAny" class="respuesta">
      ${item.titulo} - ${item.autor}
    </div>
  `;

  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

function mostrarRespuestaAny() {
  const respuesta = document.getElementById("respuestaAny");

  if (respuesta) {
    respuesta.style.display = "block";
  }
}

function siguienteAny() {
  indiceCancion++;

  if (indiceCancion >= canciones.length) {
    indiceCancion = 0;
  }
}
