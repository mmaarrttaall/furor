const estado = {
  equipos: [],
  ganadorIndex: null,
  bloqueado: false,
  pruebaActual: "paraula",
  pruebaInicial: "paraula",
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
      titulo: "Títol i autor",
      instrucciones: instruccionesAny,
      cargar: cargarPruebaAny,
      siguiente: siguienteAny
    }
  };
}

const selector = document.getElementById("numEquipos");
const nombresEquipos = document.getElementById("nombresEquipos");

function crearCampos() {
  nombresEquipos.innerHTML = "";
  for (let i = 0; i < selector.value; i++) {
    nombresEquipos.innerHTML += `<input id="equipo${i}" value="Equip ${i+1}">`;
  }
}

function seleccionarPruebaInicial(nombre) {
  estado.pruebaInicial = nombre;
  document.querySelectorAll(".boto-prova-inicial").forEach(b => b.classList.remove("seleccionat"));
  document.getElementById("btnInicial" + nombre.charAt(0).toUpperCase() + nombre.slice(1)).classList.add("seleccionat");
}

function empezarJuego() {
  estado.equipos = [];
  for (let i = 0; i < selector.value; i++) {
    estado.equipos.push({
      nombre: document.getElementById("equipo"+i).value,
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
  const p = obtenerPruebas();
  document.getElementById("tituloPrueba").innerText = p[estado.pruebaActual].titulo;
  document.getElementById("tituloRonda").innerText =
    estado.enInstrucciones ? "" : "Ronda " + estado.rondasPorPrueba[estado.pruebaActual];
}

function siguienteRonda() {
  const p = obtenerPruebas();
  estado.rondasPorPrueba[estado.pruebaActual]++;
  p[estado.pruebaActual].siguiente();
  estado.enInstrucciones = false;
  actualizarTitulos();
  cargarPrueba();
}

function cambiarPrueba(nombre) {
  estado.pruebaActual = nombre;
  mostrarInstrucciones();
}

function mostrarInstrucciones() {
  estado.enInstrucciones = true;
  actualizarTitulos();
  obtenerPruebas()[estado.pruebaActual].instrucciones();
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
  const m = document.getElementById("marcador");
  m.innerHTML = "";
  estado.equipos.forEach(e => {
    m.innerHTML += `<div class="equipo"><div>${e.nombre}</div><div>${e.puntos}</div></div>`;
  });
}

function darPunto() {
  if (estado.ganadorIndex == null) return;
  estado.equipos[estado.ganadorIndex].puntos++;
  actualizarMarcador();
}

function quitarPunto() {
  if (estado.ganadorIndex == null) return;
  estado.equipos[estado.ganadorIndex].puntos--;
  actualizarMarcador();
}

function reiniciarPulsadores() {
  estado.ganadorIndex = null;
  estado.bloqueado = false;
  document.getElementById("ganador").innerText = "Esperant pulsador...";
}

document.addEventListener("keydown", e => {
  if (estado.enInstrucciones || estado.bloqueado) return;
  let i = ["1","2","3","4"].indexOf(e.key);
  if (i >= 0 && estado.equipos[i]) {
    estado.ganadorIndex = i;
    estado.bloqueado = true;
    document.getElementById("ganador").innerText = "🏆 " + estado.equipos[i].nombre;
  }
});

selector.addEventListener("change", crearCampos);
crearCampos();
