// ===== ADIVINA TITOL I AUTOR =====

const canciones = [
  {
    spotify: "https://open.spotify.com/embed/track/3gxOPs7aBe5SJUcvYew6Ax",
    titulo: "Despechá",
    autor: "Rosalía"
  },
  {
    spotify: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT",
    titulo: "Never Gonna Give You Up",
    autor: "Rick Astley"
  }
];

let indiceCancion = 0;

// ===== INSTRUCCIONES =====

function instruccionesAny() {
  document.getElementById("contenidoPrueba").innerHTML = `
    <div class="instrucciones">
      <p>
        Escolta la cançó i digues el títol i l’artista.
      </p>

      <button onclick="comenzarPrueba()">Començar</button>
    </div>
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

// ===== MOSTRAR RESPUESTA =====

function mostrarRespuestaAny() {
  const respuesta = document.getElementById("respuestaAny");

  if (respuesta) {
    respuesta.style.display = "block";
  }
}

// ===== SIGUIENTE =====

function siguienteAny() {
  indiceCancion++;

  if (indiceCancion >= canciones.length) {
    indiceCancion = 0;
  }
}
