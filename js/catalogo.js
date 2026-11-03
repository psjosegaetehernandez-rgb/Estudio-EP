const CATALOGO_JUEGOS = [
    { id: "pandemic", nombre: "Pandemic", familia: "Cooperativo", jugadores: "2-4", icono: "fa-virus", color: "#dc2626" },
    { id: "catan", nombre: "Colonos de Catán", familia: "Gestión de Recursos", jugadores: "3-4", icono: "fa-tree", color: "#15803d" },
    { id: "catan_ciudades", nombre: "Catán: Ciudades y Caballeros", familia: "Expansión", jugadores: "3-4", icono: "fa-city", color: "#b91c1c" },
    { id: "catan_navegantes", nombre: "Catán: Navegantes", familia: "Expansión", jugadores: "3-4", icono: "fa-ship", color: "#0284c7" },
    { id: "dixit", nombre: "Dixit", familia: "Asociación Visual", jugadores: "3-8", icono: "fa-moon", color: "#6d28d9" },
    { id: "virus", nombre: "Virus!", familia: "Toma Eso / Cartas", jugadores: "2-6", icono: "fa-biohazard", color: "#14532d" },
    { id: "sushi_go", nombre: "Sushi Go!", familia: "Drafting", jugadores: "2-5", icono: "fa-utensils", color: "#ca8a04" },
    { id: "hombres_lobo", nombre: "Los Hombres Lobo", familia: "Roles Ocultos", jugadores: "3-18", icono: "fa-paw", color: "#1e293b" },
    { id: "codigo_secreto", nombre: "Código Secreto", familia: "Deducción", jugadores: "2-8", icono: "fa-user-secret", color: "#dc2626" },
    { id: "root", nombre: "Root", familia: "Asimétrico", jugadores: "2-4", icono: "fa-tree", color: "#15803d" },
    { id: "ciudadelas", nombre: "Ciudadelas", familia: "Roles Ocultos", jugadores: "2-8", icono: "fa-chess-rook", color: "#78350f" },
    { id: "polilla", nombre: "Polilla Tramposa", familia: "Fiesta", jugadores: "2-6", icono: "fa-bug", color: "#6d28d9" },
    { id: "bang", nombre: "Bang! Dados", familia: "Dados", jugadores: "3-8", icono: "fa-cowboy", color: "#b91c1c" },
    { id: "wingspan", nombre: "Wingspan", familia: "Eurogame", jugadores: "1-5", icono: "fa-feather", color: "#0284c7" },
    { id: "munchkin", nombre: "Munchkin", familia: "Cartas", jugadores: "3-6", icono: "fa-hat-wizard", color: "#b91c1c" },
    { id: "jungle", nombre: "Jungle Speed", familia: "Reflejos", jugadores: "2-8", icono: "fa-hand-fist", color: "#eab308" },
    { id: "coup", nombre: "Coup", familia: "Deducción", jugadores: "2-6", icono: "fa-mask", color: "#9a3412" }
];

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
    if(confirm(`¿Cargar los componentes de ${juego.nombre} en el lienzo?`)) {
        cargarComponentesJuego(juego.id);
    }
}

async function cargarComponentesJuego(id) {
    const juego = CATALOGO_JUEGOS.find(j => j.id === id);
    if(!juego) return;

    if(typeof mostrarLoading === 'function') mostrarLoading(`Generando ${juego.nombre}`, "Por favor, espera...");
    await new Promise(r => setTimeout(r, 100));

    try {
        if (document.querySelectorAll('#canvas > .canvas-element').length > 0) {
            if(confirm("El lienzo tiene elementos. ¿Deseas limpiarlo antes de cargar este juego?")) {
                if (typeof limpiarLienzo === 'function') limpiarLienzo();
            } else {
                if(typeof ocultarLoading === 'function') ocultarLoading();
                return;
            }
        }

        // --- CARGA MAESTRA ---
        if (id === 'catan') {
            insertarTableroCompletoCatan(50, 50);
            insertarTableroJugadorCatan(600, 50);
            for(let i=0; i<18; i++) insertarFichasNumeroCatan(50 + i*50, 580);
            const recs = ['madera', 'trigo', 'ladrillo', 'oveja', 'piedra'];
            recs.forEach((rec, i) => insertarCartaRecursoCatan(rec, 600 + i*260, 350));
            insertarKitJugadorCatan('#dc2626', 50, 680);
            insertarKitJugadorCatan('#0284c7', 230, 680);
            insertarKitJugadorCatan('#15803d', 410, 680);
            insertarKitJugadorCatan('#ca8a04', 590, 680);
            insertarLadronCatan(800, 680);
            insertarPuertoCatan(850, 680); insertarPuertoCatan(910, 680);
        }
        else if (id === 'catan_ciudades') {
            insertarTableroCompletoCatan(50, 50);
            insertarKitJugadorCatan('#dc2626', 600, 50);
            insertarFichaCaballeroCatan(600, 250);
            insertarFichaMetropoliCatan(680, 250);
            insertarFichaMercanciaCatan(760, 250);
            insertarCartaRecursoCatan('madera', 50, 600);
        }
        else if (id === 'catan_navegantes') {
            insertarTableroCompletoCatan(50, 50);
            insertarKitJugadorCatan('#0284c7', 600, 50);
            for(let i=0; i<4; i++) insertarBarcoNavegante(600 + i*80, 250);
        }
        else if (id === 'pandemic') {
            insertarTableroPandemic(50, 50);
            for(let i=0; i<8; i++) insertarCuboPandemic(600 + (i%4)*50, 50 + Math.floor(i/4)*50);
            for(let i=0; i<4; i++) insertarMeeplePandemic(600 + i*60, 180);
            for(let i=0; i<3; i++) insertarEventoPandemic(50 + i*280, 400);
        }
        else if (id === 'sushi_go') { for(let i=0; i<10; i++) insertarCartaSushi(); }
        else if (id === 'dixit') { for(let i=0; i<10; i++) insertarCartaDixit(); }
        else if (id === 'hombres_lobo') { for(let i=0; i<10; i++) insertarCartaHombreLobo(); }
        else if (id === 'codigo_secreto') { for(let i=0; i<10; i++) insertarCartaCodename(); }
        else if (id === 'wingspan') { for(let i=0; i<8; i++) insertarCartaWingspan(); }
        else if (id === 'munchkin') { for(let i=0; i<8; i++) insertarCartaMunchkin(); }
        else if (id === 'jungle') { for(let i=0; i<8; i++) insertarCartaJungleSpeed(); }
        else if (id === 'coup') { for(let i=0; i<8; i++) insertarCartaCoup(); }
        else if (id === 'virus') {
            for(let i=0; i<4; i++) { insertarCartaVirusOrgano(); insertarCartaVirusInfeccion(); insertarCartaVirusMedicina(); }
        }
        else if (id === 'root') {
            insertarCartaRoot('marquesado'); insertarCartaRoot('nido'); insertarCartaRoot('alianza'); insertarCartaRoot('vagabundo');
        }
        else if (id === 'ciudadelas') {
            for(let i=0; i<8; i++) insertarCartaCiudadelasPersonaje();
            for(let i=0; i<4; i++) insertarCartaCiudadelasDistrito();
        }
        else if (id === 'polilla') {
            for(let i=0; i<8; i++) insertarCartaPolillaNum();
            for(let i=0; i<4; i++) insertarCartaPolillaTramposa();
        }
        else if (id === 'bang') {
            for(let i=0; i<4; i++) insertarCartaBangRol();
            for(let i=0; i<4; i++) insertarCartaBangPersonaje();
        }

        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast(`¡Materiales de ${juego.nombre} cargados!`, "success");

    } catch (error) {
        console.error("Error cargando juego:", error);
        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast("Error al cargar: " + error.message, "error");
    }
}

document.addEventListener('DOMContentLoaded', () => { renderCatalogo(); });