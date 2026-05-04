const estado = {
  equipos: [],
  ganadorIndex: null,
  bloqueado: false,
  pruebaActual: "paraula",
  pruebaInicial: "paraula",
  timers: [],
  enInstrucciones: true,
  rondasPorPrueba: {
    paraula: 1,
    lletra: 1,
    any: 1
  }
};

function obtenerPruebas() {
  return {
    paraula: {
      titulo: "Cançó amb paraula",
      instrucciones: instruccionesParaula,
      cargar: cargarPruebaParaula,
      siguiente: siguienteParaula
    },
    lletra: {
      titulo: "Lletra oculta",
      instrucciones: instruccionesLletra,
      cargar: cargarPruebaLletra,
      siguiente: siguienteLetra
    },
    any: {
      titulo: "Adivina l’any",
      instrucciones: instruccionesAny,
      cargar: cargarPruebaAny,
      siguiente: siguienteAny
    }
  };
}

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

function crearCampos() {
  const cantidad = parseInt(selector.value);
  nombresEquipos.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    nombresEquipos.innerHTML += `<input id="equipo${i}" value="Equip ${i + 1}">`;
  }
}

function seleccionarPruebaInicial(nombre) {
  estado.pruebaInicial = nombre;

  document.querySelectorAll(".boto-prova-inicial").forEach(b => b.classList.remove("seleccionat"));
  document.getElementById("btnInicial" + capitalize(nombre)).classList.add("seleccionat");
}

function empezarJuego() {
  const cantidad = parseInt(selector.value);

  estado.equipos = [];

  for (let i = 0; i < cantidad; i++) {
    estado.equipos.push({
      nombre: document.getElementById("equipo" + i).value,
      puntos: 0
    });
  }

  estado.pruebaActual = estado.pruebaInicial;

  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("juego").classList.remove("oculto");

  actualizarMarcador();
  mostrarInstrucciones();
}

function actualizarTitulos() {
  const pruebas = obtenerPruebas();

  document.getElementById("tituloPrueba").innerText =
    pruebas[estado.pruebaActual].titulo;

  document.getElementById("tituloRonda").innerText =
    estado.enInstrucciones ? "" : "Ronda " + estado.rondasPorPrueba[estado.pruebaActual];
}

function siguienteRonda() {
  const pruebas = obtenerPruebas();

  estado.rondasPorPrueba[estado.pruebaActual]++;
  pruebas[estado.pruebaActual].siguiente();

  estado.enInstrucciones = false;
  actualizarTitulos();
  cargarPrueba();
}

function cambiarPrueba(nombre) {
  estado.pruebaActual = nombre;
  mostrarInstrucciones();
}

function mostrarInstrucciones() {
  const pruebas = obtenerPruebas();

  estado.enInstrucciones = true;
  actualizarTitulos();
  pruebas[estado.pruebaActual].instrucciones();
}

function comenzarPrueba() {
  estado.enInstrucciones = false;
  actualizarTitulos();
  cargarPrueba();
}

function cargarPrueba() {
  obtenerPruebas()[estado.pruebaActual].cargar();
}

function actualizarMarcador() {
  const marcador = document.getElementById("marcador");
  marcador.innerHTML = "";

  estado.equipos.forEach(e => {
    marcador.innerHTML += `
      <div class="equipo">
        <div>${e.nombre}</div>
        <div>${e.puntos}</div>
      </div>
    `;
  });
}

function darPunto() {
  if (estado.ganadorIndex === null) return;
  estado.equipos[estado.ganadorIndex].puntos++;
  actualizarMarcador();
}

function quitarPunto() {
  if (estado.ganadorIndex === null) return;
  estado.equipos[estado.ganadorIndex].puntos--;
  actualizarMarcador();
}

function reiniciarPulsadores() {
  estado.ganadorIndex = null;
  estado.bloqueado = false;
  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

selector.addEventListener("change", crearCampos);
crearCampos();
