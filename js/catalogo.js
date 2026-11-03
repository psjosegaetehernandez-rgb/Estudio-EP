const CATALOGO_JUEGOS = [
    { id: "pandemic", nombre: "Pandemic", familia: "Cooperativo", jugadores: "2-4", icono: "fa-virus", color: "#dc2626",
      reglas: { objetivo: "Erradicar las enfermedades.", preparacion: "Repartir roles, colocar cubos.", turno: "Moverse o tratar enfermedades." },
      adaptacion_ep: { objetivo: "Reflexionar sobre la salud como derecho.", preguntas: ["¿Quién tiene acceso al sistema de salud?", "¿Cómo nos organizamos ante una emergencia?"] }
    },
    { id: "catan", nombre: "Colonos de Catán", familia: "Gestión de Recursos", jugadores: "3-4", icono: "fa-tree", color: "#15803d",
      reglas: { objetivo: "Llegar a 10 puntos.", preparacion: "Armar el tablero hexagonal.", turno: "Tirar dados, recolectar, comerciar." },
      adaptacion_ep: { objetivo: "Simular la gestión de recursos comunitarios.", preguntas: ["¿Qué recursos son los más disputados?", "¿Cómo se negocia en igualdad?"] }
    },
    { id: "catan_ciudades", nombre: "Catán: Ciudades y Caballeros", familia: "Expansión", jugadores: "3-4", icono: "fa-city", color: "#b91c1c",
      reglas: { objetivo: "Mejorar ciudades y defender la isla.", preparacion: "Añadir cuarteles y mercancías.", turno: "Producción, Comercio, Construcción." },
      adaptacion_ep: { objetivo: "Analizar la defensa colectiva.", preguntas: ["¿Cómo decidimos qué mejoras construir?", "¿Qué pasa si la comunidad no se une?"] }
    },
    { id: "catan_navegantes", nombre: "Catán: Navegantes", familia: "Expansión", jugadores: "3-4", icono: "fa-ship", color: "#0284c7",
      reglas: { objetivo: "Explorar islas desconocidas.", preparacion: "Añadir barcos y hexágonos de mar.", turno: "Construir barcos en lugar de caminos." },
      adaptacion_ep: { objetivo: "Hablar sobre migración.", preguntas: ["¿Qué implica llegar a un territorio nuevo?", "¿Cómo se reparten los recursos?"] }
    },
    { id: "dixit", nombre: "Dixit", familia: "Asociación Visual", jugadores: "3-8", icono: "fa-moon", color: "#6d28d9",
      reglas: { objetivo: "Adivinar la carta del narrador.", preparacion: "Repartir 6 cartas.", turno: "El narrador da una pista, los demás votan." },
      adaptacion_ep: { objetivo: "Trabajar la interpretación subjetiva.", preguntas: ["¿Por qué vemos cosas distintas?", "¿Cómo se construye un relato colectivo?"] }
    },
    { id: "virus", nombre: "Virus!", familia: "Toma Eso / Cartas", jugadores: "2-6", icono: "fa-biohazard", color: "#14532d",
      reglas: { objetivo: "Construir un cuerpo sano.", preparacion: "Barajar los mazos.", turno: "Jugar órgano, virus o medicina." },
      adaptacion_ep: { objetivo: "Visibilizar conflictos de poder en salud.", preguntas: ["¿Los órganos son derechos?", "¿Los virus son recortes y las medicinas acciones colectivas?"] }
    }
];

let juegoSeleccionadoEnCatalogo = null;

function renderCatalogo() {
    const grid = document.getElementById('catalogo-grid');
    if(!grid) return;
    grid.innerHTML = '';
    CATALOGO_JUEGOS.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.cursor = 'pointer';
        card.onclick = () => mostrarDetalleJuego(juego);
        card.innerHTML = `<div class="tool-icon" style="background:${juego.color}20; color:${juego.color};"><i class="fa-solid ${juego.icono}"></i></div><div class="tool-info"><h4>${juego.nombre}</h4><p>${juego.familia}</p></div><div style="margin-left:auto; background:${juego.color}; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">${juego.jugadores}</div>`;
        grid.appendChild(card);
    });
}

function filtrarCatalogo(texto) {
    const grid = document.getElementById('catalogo-grid');
    if(!grid) return;
    const filtro = texto.toLowerCase();
    Array.from(grid.children).forEach(card => {
        const nombre = card.querySelector('h4').innerText.toLowerCase();
        card.style.display = nombre.includes(filtro) ? 'flex' : 'none';
    });
}

function mostrarDetalleJuego(juego) {
    juegoSeleccionadoEnCatalogo = juego;
    
    const pEmpty = document.getElementById('props-empty');
    const pContent = document.getElementById('props-content');
    const pActions = document.getElementById('props-actions');
    const cPanel = document.getElementById('catalogo-detalle-panel');

    if(pEmpty) pEmpty.style.display = 'none';
    if(pContent) pContent.style.display = 'none';
    if(pActions) pActions.style.display = 'none';
    if(cPanel) cPanel.style.display = 'flex';

    if(document.getElementById('cat-nombre')) document.getElementById('cat-nombre').innerText = juego.nombre;
    if(document.getElementById('cat-familia')) document.getElementById('cat-familia').innerText = juego.familia;
    if(document.getElementById('cat-objetivo')) document.getElementById('cat-objetivo').querySelector('span').innerText = juego.reglas.objetivo;
    if(document.getElementById('cat-preparacion')) document.getElementById('cat-preparacion').querySelector('span').innerText = juego.reglas.preparacion;
    if(document.getElementById('cat-turno')) document.getElementById('cat-turno').querySelector('span').innerText = juego.reglas.turno;
    if(document.getElementById('cat-ep-objetivo')) document.getElementById('cat-ep-objetivo').querySelector('span').innerText = juego.adaptacion_ep.objetivo;
    
    const ul = document.getElementById('cat-ep-preguntas');
    if(ul) {
        ul.innerHTML = '';
        juego.adaptacion_ep.preguntas.forEach(p => { ul.innerHTML += `<li>${p}</li>`; });
    }
}

function cargarDesdePanelCatalogo() {
    if(juegoSeleccionadoEnCatalogo) cargarComponentesJuego(juegoSeleccionadoEnCatalogo.id);
}

async function cargarComponentesJuego(id) {
    const juego = CATALOGO_JUEGOS.find(j => j.id === id);
    if(!juego) return;
    if(typeof mostrarLoading === 'function') mostrarLoading(`Generando ${juego.nombre}`, "Espera...");
    await new Promise(r => setTimeout(r, 100));
    try {
        if (document.querySelectorAll('#canvas > .canvas-element').length > 0) {
            if(confirm("El lienzo tiene elementos. ¿Deseas limpiarlo antes de cargar este juego?")) {
                if (typeof limpiarLienzo === 'function') limpiarLienzo();
            }
        }
        if (id === 'catan') {
            insertarTableroCompletoCatan(50, 50);
            insertarTableroJugadorCatan(600, 50);
            for(let i=0; i<18; i++) insertarFichasNumeroCatan(50 + i*50, 580);
            const recs = ['madera', 'trigo', 'ladrillo', 'oveja', 'piedra'];
            recs.forEach((rec, i) => insertarCartaRecursoCatan(rec, 600 + i*260, 350));
            insertarKitJugadorCatan('#dc2626', 50, 680); insertarKitJugadorCatan('#0284c7', 230, 680);
            insertarKitJugadorCatan('#15803d', 410, 680); insertarKitJugadorCatan('#ca8a04', 590, 680);
            insertarLadronCatan(800, 680); insertarPuertoCatan(850, 680); insertarPuertoCatan(910, 680);
        }
        else if (id === 'catan_ciudades') {
            insertarTableroCompletoCatan(50, 50); insertarKitJugadorCatan('#dc2626', 600, 50);
            insertarFichaCaballeroCatan(600, 250); insertarFichaMetropoliCatan(680, 250);
            insertarFichaMercanciaCatan(760, 250); insertarCartaRecursoCatan('madera', 50, 600);
        }
        else if (id === 'catan_navegantes') {
            insertarTableroCompletoCatan(50, 50); insertarKitJugadorCatan('#0284c7', 600, 50);
            for(let i=0; i<4; i++) insertarBarcoNavegante(600 + i*80, 250);
        }
        else if (id === 'pandemic') {
            insertarTableroPandemic(50, 50);
            for(let i=0; i<8; i++) insertarCuboPandemic(600 + (i%4)*50, 50 + Math.floor(i/4)*50);
            for(let i=0; i<4; i++) insertarMeeplePandemic(600 + i*60, 180);
            for(let i=0; i<3; i++) insertarEventoPandemic(50 + i*280, 400);
        }
        else if (id === 'dixit') { for(let i=0; i<10; i++) insertarCartaDixit(); }
        else if (id === 'virus') { for(let i=0; i<4; i++) { insertarCartaVirusOrgano(); insertarCartaVirusInfeccion(); insertarCartaVirusMedicina(); } }
        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast(`¡Materiales de ${juego.nombre} cargados!`, "success");
    } catch (error) {
        console.error(error); if(typeof ocultarLoading === 'function') ocultarLoading();
    }
}

document.addEventListener('DOMContentLoaded', () => { renderCatalogo(); });