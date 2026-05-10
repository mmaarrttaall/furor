// ===== TÍTOL I AUTOR =====

const canciones = [
  {
    spotify: "https://open.spotify.com/embed/track/7GvCDhqL17l7IrjIcYhRQ9",
    titulo: "La Bomba",
    autor: "King Africa"
  },

  {
    spotify: "https://open.spotify.com/embed/track/1FhRIZtz1d4qLVe4928exT",
    titulo: "Las Babys",
    autor: "Aitana"
  }
];

let indiceCancion = 0;

// ===== VIDEO INICIAL =====

function instruccionesAny() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="video-cascos">
      <video width="650" controls preload="auto">
        <source src="./videos/titol.mp4" type="video/mp4">
      </video>
    </div>

    <button onclick="comenzarPrueba()">Començar</button>
  `;

  document.getElementById("ganador").innerText = "";
}

// ===== CARGAR PRUEBA =====

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
