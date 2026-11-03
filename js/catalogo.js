const CATALOGO_JUEGOS = [
    { id: "taller_ep", nombre: "Kit Taller EP", familia: "Educación Popular", jugadores: "10-30", icono: "fa-hands-holding-circle", color: "#ca8a04", reglas: { objetivo: "Facilitar la reflexión.", preparacion: "Imprimir cartas.", turno: "Buscar la mitad." }, adaptacion_ep: { objetivo: "Visibilizar problemáticas.", preguntas: ["¿Qué refrán se parece a tu realidad?"] } },
    { id: "taller_vih", nombre: "Taller VIH Tarapacá", familia: "Salud y Género", jugadores: "10-25", icono: "fa-heart-pulse", color: "#8B3A3A", reglas: { objetivo: "Derribar mitos.", preparacion: "Descargar guía.", turno: "Seguir fases." }, adaptacion_ep: { objetivo: "Tejer red de cuidado.", preguntas: ["¿Qué mitos conocías?"] } },
    { id: "pandemic", nombre: "Pandemic", familia: "Cooperativo", jugadores: "2-4", icono: "fa-virus", color: "#dc2626", reglas: { objetivo: "Erradicar enfermedades.", preparacion: "Repartir roles.", turno: "Moverse o tratar." }, adaptacion_ep: { objetivo: "Salud como derecho.", preguntas: ["¿Cómo nos organizamos?"] } },
    { id: "catan", nombre: "Colonos de Catán", familia: "Gestión", jugadores: "3-4", icono: "fa-tree", color: "#15803d", reglas: { objetivo: "Llegar a 10 puntos.", preparacion: "Armar tablero.", turno: "Tirar dados y comerciar." }, adaptacion_ep: { objetivo: "Recursos comunitarios.", preguntas: ["¿Cómo se negocia?"] } },
    { id: "dixit", nombre: "Dixit", familia: "Asociación", jugadores: "3-8", icono: "fa-moon", color: "#6d28d9", reglas: { objetivo: "Adivinar la carta.", preparacion: "Repartir 6.", turno: "Dar pista y votar." }, adaptacion_ep: { objetivo: "Interpretación subjetiva.", preguntas: ["¿Por qué vemos distinto?"] } },
    { id: "virus", nombre: "Virus!", familia: "Cartas", jugadores: "2-6", icono: "fa-biohazard", color: "#14532d", reglas: { objetivo: "Cuerpo sano.", preparacion: "Barajar.", turno: "Jugar órgano o virus." }, adaptacion_ep: { objetivo: "Conflictos de poder.", preguntas: ["¿Los órganos son derechos?"] } },
    { id: "sushi_go", nombre: "Sushi Go!", familia: "Drafting", jugadores: "2-5", icono: "fa-utensils", color: "#ca8a04", reglas: { objetivo: "Mejor menú.", preparacion: "Repartir cartas.", turno: "Elegir y pasar." }, adaptacion_ep: { objetivo: "Elección bajo presión.", preguntas: ["¿Cómo afectan las decisiones?"] } },
    { id: "hombres_lobo", nombre: "Hombres Lobo", familia: "Roles Ocultos", jugadores: "3-18", icono: "fa-paw", color: "#1e293b", reglas: { objetivo: "Eliminar rivales.", preparacion: "Repartir roles.", turno: "Noche y Día." }, adaptacion_ep: { objetivo: "Argumentación.", preguntas: ["¿Cómo se manipula?"] } },
    { id: "codigo_secreto", nombre: "Código Secreto", familia: "Deducción", jugadores: "2-8", icono: "fa-user-secret", color: "#dc2626", reglas: { objetivo: "Encontrar agentes.", preparacion: "Colocar 25.", turno: "Dar pistas." }, adaptacion_ep: { objetivo: "Lenguaje y fake news.", preguntas: ["¿Quién controla el código?"] } },
    { id: "root", nombre: "Root", familia: "Asimétrico", jugadores: "2-4", icono: "fa-tree", color: "#15803d", reglas: { objetivo: "Dominar el bosque.", preparacion: "Elegir facción.", turno: "Jugar cartas." }, adaptacion_ep: { objetivo: "Poder asimétrico.", preguntas: ["¿Es justo?"] } },
    { id: "ciudadelas", nombre: "Ciudadelas", familia: "Roles Ocultos", jugadores: "2-8", icono: "fa-chess-rook", color: "#78350f", reglas: { objetivo: "Construir ciudad.", preparacion: "Repartir distritos.", turno: "Elegir personaje." }, adaptacion_ep: { objetivo: "Corrupción.", preguntas: ["¿Cómo se usa el poder?"] } },
    { id: "polilla", nombre: "Polilla Tramposa", familia: "Fiesta", jugadores: "2-6", icono: "fa-bug", color: "#6d28d9", reglas: { objetivo: "Deshacerte de cartas.", preparacion: "Repartir.", turno: "Jugar ascendente." }, adaptacion_ep: { objetivo: "Reglas implícitas.", preguntas: ["¿Es justo hacer trampa?"] } },
    { id: "bang", nombre: "Bang! Dados", familia: "Dados", jugadores: "3-8", icono: "fa-cowboy", color: "#b91c1c", reglas: { objetivo: "Eliminar enemigos.", preparacion: "Rol secreto.", turno: "Lanzar dados." }, adaptacion_ep: { objetivo: "Lealtad.", preguntas: ["¿En quién confiar?"] } },
    { id: "wingspan", nombre: "Wingspan", familia: "Eurogame", jugadores: "1-5", icono: "fa-feather", color: "#0284c7", reglas: { objetivo: "Atraer pájaros.", preparacion: "Colocar tableros.", turno: "Jugar pájaros." }, adaptacion_ep: { objetivo: "Biodiversidad.", preguntas: ["¿Cómo protegemos fauna?"] } },
    { id: "munchkin", nombre: "Munchkin", familia: "Cartas", jugadores: "3-6", icono: "fa-hat-wizard", color: "#b91c1c", reglas: { objetivo: "Nivel 10.", preparacion: "Repartir 4.", turno: "Abrir puerta." }, adaptacion_ep: { objetivo: "Individualismo.", preguntas: ["¿Ayudaste a otros?"] } },
    { id: "jungle", nombre: "Jungle Speed", familia: "Reflejos", jugadores: "2-8", icono: "fa-hand-fist", color: "#eab308", reglas: { objetivo: "Atrapar tótem.", preparacion: "Repartir cartas.", turno: "Voltear carta." }, adaptacion_ep: { objetivo: "Reflejos.", preguntas: ["¿Qué pasa al actuar sin pensar?"] } },
    { id: "coup", nombre: "Coup", familia: "Deducción", jugadores: "2-6", icono: "fa-mask", color: "#9a3412", reglas: { objetivo: "Último en pie.", preparacion: "2 roles, 2 monedas.", turno: "Declarar acción." }, adaptacion_ep: { objetivo: "Corrupción.", preguntas: ["¿Cómo detectamos líderes corruptos?"] } },
    { id: "uno", nombre: "UNO", familia: "Cartas", jugadores: "2-10", icono: "fa-clone", color: "#dc2626", reglas: { objetivo: "Quedarse sin cartas.", preparacion: "Repartir 7.", turno: "Jugar color o número." }, adaptacion_ep: { objetivo: "Toma eso.", preguntas: ["¿Cómo afecta el ataque?"] } },
    { id: "trivial", nombre: "Trivial", familia: "Trivia", jugadores: "2-6", icono: "fa-chart-pie", color: "#ca8a04", reglas: { objetivo: "Completar quesitos.", preparacion: "Tablero circular.", turno: "Responder preguntas." }, adaptacion_ep: { objetivo: "Saberes colectivos.", preguntas: ["¿Qué saberes faltan?"] } },
    { id: "carcassonne", nombre: "Carcassonne", familia: "Losetas", jugadores: "2-5", icono: "fa-map", color: "#15803d", reglas: { objetivo: "Construir mapa.", preparacion: "Loseta inicial.", turno: "Colocar loseta y meeple." }, adaptacion_ep: { objetivo: "Mapeo comunitario.", preguntas: ["¿Cómo conectamos el barrio?"] } },
    { id: "dobble", nombre: "Dobble", familia: "Reflejos", jugadores: "2-8", icono: "fa-brands fa-fly", color: "#0284c7", reglas: { objetivo: "Encontrar símbolo.", preparacion: "Barajar.", turno: "Gritar el símbolo igual." }, adaptacion_ep: { objetivo: "Agudeza visual.", preguntas: ["¿Qué sesgos tenemos al mirar?"] } },
    { id: "wavelength", nombre: "Wavelength", familia: "Telepatía", jugadores: "2-12", icono: "fa-gauge-high", color: "#be123c", reglas: { objetivo: "Adivinar escala.", preparacion: "Colocar dial.", turno: "Dar pista subjetiva." }, adaptacion_ep: { objetivo: "Percepción colectiva.", preguntas: ["¿Por qué diferimos en la escala?"] } },
    { id: "skyteam", nombre: "Sky Team", familia: "Cooperativo", jugadores: "2", icono: "fa-plane", color: "#1e293b", reglas: { objetivo: "Aterrizar avión.", preparacion: "Panel de vuelo.", turno: "Asignar dados a ejes." }, adaptacion_ep: { objetivo: "Confianza ciega.", preguntas: ["¿Cómo coordinamos sin hablar?"] } },
    { id: "hitster", nombre: "Hitster", familia: "Fiesta Musical", jugadores: "2-10", icono: "fa-headphones", color: "#6d28d9", reglas: { objetivo: "Ordenar 10 canciones en tu línea de tiempo.", preparacion: "Repartir 2 fichas y 1 carta inicial.", turno: "Escuchar canción y colocarla en el orden correcto." }, adaptacion_ep: { objetivo: "Memoria musical y colectiva.", preguntas: ["¿Qué canciones marcaron la historia de tu comunidad?", "¿Cómo la música puede unir o dividir?"] } },
    { id: "munchkin_exacto", nombre: "Munchkin (Exacto)", familia: "Cartas", jugadores: "3-6", icono: "fa-hat-wizard", color: "#b91c1c", reglas: { objetivo: "Llegar al nivel 10.", preparacion: "Repartir 4 cartas.", turno: "Abrir puerta, combatir monstruo o saquear." }, adaptacion_ep: { objetivo: "Analizar el individualismo.", preguntas: ["¿Ayudaste a otros o preferiste ganar solo?"] } },
    { id: "ciudadelas_deluxe", nombre: "Ciudadelas Deluxe", familia: "Roles Ocultos", jugadores: "2-8", icono: "fa-chess-rook", color: "#78350f", reglas: { objetivo: "Construir la ciudad más valiosa.", preparacion: "Repartir distritos y monedas.", turno: "Elegir un personaje en secreto y actuar." }, adaptacion_ep: { objetivo: "Reflexionar sobre la corrupción.", preguntas: ["¿Qué personaje representa mejor a un líder?"] } },
    { id: "root_exacto", nombre: "Root (Base)", familia: "Asimétrico", jugadores: "2-4", icono: "fa-tree", color: "#15803d", reglas: { objetivo: "Dominar el bosque.", preparacion: "Elegir facción.", turno: "Jugar cartas de acción." }, adaptacion_ep: { objetivo: "Poder asimétrico.", preguntas: ["¿Es justo que cada bando tenga reglas distintas?"] } },
    { id: "arkham_lcg", nombre: "Arkham Horror LCG", familia: "Cooperativo", jugadores: "1-4", icono: "fa-eye", color: "#1e293b", reglas: { objetivo: "Resolver el misterio.", preparacion: "Elegir investigador.", turno: "Jugar cartas, investigar." }, adaptacion_ep: { objetivo: "Enfrentar el miedo colectivo.", preguntas: ["¿Cómo se organiza la comunidad ante lo desconocido?"] } },
    { id: "la_llamada", nombre: "La Llamada (Endgame)", familia: "Rol", jugadores: "2-12", icono: "fa-key", color: "#4c1d95", reglas: { objetivo: "Encontrar las 3 llaves.", preparacion: "Repartir linajes.", turno: "Resolver acertijos." }, adaptacion_ep: { objetivo: "Búsqueda colectiva.", preguntas: ["¿Cómo se reparte el liderazgo?"] } },
    { id: "rick_morty", nombre: "Rick and Morty (D&D)", familia: "Rol", jugadores: "2-5", icono: "fa-dice-d20", color: "#b91c1c", reglas: { objetivo: "Completar la aventura.", preparacion: "Elegir personaje.", turno: "Explorar y combatir." }, adaptacion_ep: { objetivo: "Humor y crítica.", preguntas: ["¿Cómo usamos el humor para criticar?"] } },
    { id: "criaturas", nombre: "Criaturas (Monstruos)", familia: "Cartas", jugadores: "2-6", icono: "fa-dragon", color: "#78350f", reglas: { objetivo: "Capturar mortales.", preparacion: "Barajar criaturas.", turno: "Jugar cartas de ataque." }, adaptacion_ep: { objetivo: "Faroleo y engaño.", preguntas: ["¿Cuándo es justificable mentir?"] } },
    { id: "spellcrafting", nombre: "SpellCrafting", familia: "Cartas", jugadores: "2-6", icono: "fa-wand-magic-sparkles", color: "#6d28d9", reglas: { objetivo: "Formar la palabra más valiosa.", preparacion: "Repartir letras.", turno: "Elegir cartas y formar palabras." }, adaptacion_ep: { objetivo: "Poder del lenguaje.", preguntas: ["¿Qué palabras tienen más poder?"] } },
    { id: "xanathar", nombre: "D&D Xanathar", familia: "Rol", jugadores: "2-6", icono: "fa-book-sparkles", color: "#ca8a04", reglas: { objetivo: "Lanzar conjuros.", preparacion: "Repartir cartas de conjuro.", turno: "Usar conjuros en la aventura." }, adaptacion_ep: { objetivo: "Creatividad mágica.", preguntas: ["¿Qué poder elegirías y para qué?"] } },
    { id: "strixhaven", nombre: "Strixhaven (D&D)", familia: "Rol", jugadores: "2-6", icono: "fa-graduation-cap", color: "#4c1d95", reglas: { objetivo: "Aprender magia.", preparacion: "Elegir estudiante.", turno: "Asistir a clases y resolver misterios." }, adaptacion_ep: { objetivo: "Educación y poder.", preguntas: ["¿Qué se aprende en la escuela de la vida?"] } },
    { id: "carcassonne_plus", nombre: "Carcassonne Plus", familia: "Losetas", jugadores: "2-6", icono: "fa-map", color: "#15803d", reglas: { objetivo: "Construir el mapa más grande.", preparacion: "Mezclar 160 losetas.", turno: "Colocar loseta y meeple." }, adaptacion_ep: { objetivo: "Expansión territorial.", preguntas: ["¿Cómo crece la comunidad?"] } },
    { id: "catan_navegantes", nombre: "Catán Navegantes", familia: "Expansión", jugadores: "3-4", icono: "fa-ship", color: "#0284c7", reglas: { objetivo: "Explorar islas.", preparacion: "Añadir hexágonos de mar.", turno: "Construir barcos y comerciar." }, adaptacion_ep: { objetivo: "Migración y recursos.", preguntas: ["¿Qué implica llegar a un territorio nuevo?"] } },
    { id: "zombies", nombre: "Zombies!!! (2ª Ed.)", familia: "Toma Eso / Supervivencia", jugadores: "2-6", icono: "fa-biohazard", color: "#15803d", reglas: { objetivo: "Ser el primero en matar 25 zombis o llegar al helipuerto.", preparacion: "Colocar loseta inicial, repartir 3 cartas de evento y contadores.", turno: "Colocar loseta, mover, combatir zombis, jugar eventos." }, adaptacion_ep: { objetivo: "Trabajo en equipo frente a crisis.", preguntas: ["¿Cómo se organiza la comunidad ante una amenaza?", "¿Qué recursos son vitales y cuáles se malgastan?"] } },
    { id: "escape_tesoro", nombre: "Búsqueda del Tesoro", familia: "Escape Room", jugadores: "2-8", icono: "fa-map", color: "#ca8a04", reglas: { objetivo: "Encontrar el tesoro final resolviendo pistas en cadena.", preparacion: "Esconder las pistas por la casa.", turno: "Seguir las pistas hasta el premio." }, adaptacion_ep: { objetivo: "Trabajo en equipo y pensamiento lateral.", preguntas: ["¿Cómo se organizaron para encontrar las pistas?", "¿Qué pista fue la más difícil?"] } },
    { id: "escape_diy", nombre: "Escape Room DIY", familia: "Escape Room", jugadores: "2-6", icono: "fa-puzzle-piece", color: "#6d28d9", reglas: { objetivo: "Escapar de la habitación resolviendo puzzles.", preparacion: "Imprimir puzzles, preparar candados y sobres.", turno: "Resolver puzzles para obtener códigos." }, adaptacion_ep: { objetivo: "Resolución de problemas en equipo.", preguntas: ["¿Qué estrategia usaron para resolver los puzzles?", "¿Cómo se sintieron bajo presión?"] } },
    { id: "escape_caso_cerrado", nombre: "Caso Cerrado (Expediente)", familia: "Escape Room", jugadores: "2-8", icono: "fa-folder-open", color: "#1e293b", reglas: { objetivo: "Resolver un misterio analizando testimonios y pruebas.", preparacion: "Leer el expediente y organizar las pistas.", turno: "Deducir al culpable." }, adaptacion_ep: { objetivo: "Análisis crítico de la información.", preguntas: ["¿Qué contradicciones encontraron?", "¿Cómo afectan los sesgos a la investigación?"] } },
    { id: "escape_cluedo", nombre: "Cluedo en Vivo", familia: "Escape Room", jugadores: "4-12", icono: "fa-user-secret", color: "#b91c1c", reglas: { objetivo: "Descubrir al asesino entre los personajes.", preparacion: "Repartir roles y pruebas.", turno: "Interrogar y deducir." }, adaptacion_ep: { objetivo: "Role-play y empatía.", preguntas: ["¿Cómo se sintieron al interpretar un papel?", "¿Qué pistas fueron clave?"] } },
    { id: "escape_kit_generico", nombre: "Kit de Escape Genérico", familia: "Escape Room", jugadores: "2-8", icono: "fa-lock", color: "#475569", reglas: { objetivo: "Abrir el candado final resolviendo 5 puzzles.", preparacion: "Imprimir 48 puzzles, preparar candados.", turno: "Resolver puzzles de dificultad creciente." }, adaptacion_ep: { objetivo: "Pensamiento lógico y colaboración.", preguntas: ["¿Qué tipo de puzzle les resultó más fácil?", "¿Cómo se dividieron el trabajo?"] } }
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
    if(typeof mostrarLoading === 'function') mostrarLoading(`Generando ${juego.nombre}`, "Preparando todos los materiales exactos...");
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

        if (id === 'taller_ep') {
            if(typeof insertarCartaRefran === 'function' && typeof insertarTelaranaEP === 'function') {
                insertarTelaranaEP(50, 50);
                for(let i=0; i<5; i++) insertarFichaTaller('lana', 450 + i*60, 100);
                const refranes = ["Análisis de contexto", "No hay mal que dure cien años", "A quien madruga, Dios lo ayuda", "Más vale pájaro en mano que cien volando", "El que ríe último, ríe mejor", "No es oro todo lo que reluce"];
                for(let i = 0; i < refranes.length; i++) insertarCartaRefran(refranes[i], 50 + (i%3)*270, 450 + Math.floor(i/3)*360);
            }
        }
        else if (id === 'taller_vih') {
            if(typeof insertarCartaMitoVIH === 'function' && typeof insertarGuiaFacilitadorVIH === 'function') {
                insertarGuiaFacilitadorVIH(50, 50); insertarCuboReflexionVIH(500, 50);
                insertarRutaCuidadoVIH(50, 650); insertarArbolProblemasVIH(750, 50); insertarSemaforoVIH(1200, 50);
                for(let i=0; i<3; i++) insertarFichaTaller('escudo', 500, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('rayo', 600, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('corazon', 700, 450 + i*60);
                const mitos = [{ t: "El Contagio", x: "Si tengo VIH, mi pareja se va a contagiar seguro, aunque me cuide." },{ t: "El Examen", x: "El test duele, es caro y todo el pueblo se va a enterar de mi resultado." },{ t: "El Estigma", x: "Solo las personas promiscuas o los homosexuales se contagian de VIH." },{ t: "El Matrimonio", x: "Una mujer casada no necesita cuidarse, su esposo la protege de todo." },{ t: "Las ITS", x: "Si tengo una infección como sífilis o gonorrea, se me quita sola con el tiempo." },{ t: "El Futuro", x: "El VIH es una sentencia de muerte. Si me sale positivo, mi vida se acaba." }];
                for(let i = 0; i < mitos.length; i++) insertarCartaMitoVIH('mito', mitos[i].t, mitos[i].x, 50 + (i%3)*270, 850 + Math.floor(i/3)*360);
                const situaciones = [{ t: "Violencia", x: "Tu pareja se enoja y te grita porque le pediste usar condón. ¿Qué haces?" },{ t: "La Infidelidad", x: "Descubres que tu pareja te fue infiel. Tienes miedo de hacerte el test. ¿Cómo lo enfrentas?" },{ t: "La Amiga", x: "Una amiga te confiesa que tiene miedo de tener VIH, pero no va al médico por vergüenza. ¿Cómo la apoyas?" }];
                for(let i = 0; i < situaciones.length; i++) insertarCartaMitoVIH('situacion', situaciones[i].t, situaciones[i].x, 950 + i * 270, 850);
            }
        }
        else if (id === 'catan') {
            insertarTableroCompletoCatan(50, 50); insertarTableroJugadorCatan(600, 50);
            for(let i=0; i<18; i++) insertarFichasNumeroCatan(50 + i*50, 580);
            const recs = ['madera', 'trigo', 'ladrillo', 'oveja', 'piedra'];
            for(let x=0; x<19; x++) { recs.forEach((rec, i) => { insertarCartaRecursoCatan(rec, 600 + i*260, 350 + x*360); }); }
            const devs = ['caballero', 'punto', 'camino', 'abundancia', 'monopolio'];
            for(let d=0; d<5; d++) { devs.forEach((dev, i) => insertarCartaDesarrolloCatan(dev, 600 + i*260, 50)); }
            insertarKitJugadorCatan('#dc2626', 50, 680); insertarKitJugadorCatan('#0284c7', 230, 680);
            insertarKitJugadorCatan('#15803d', 410, 680); insertarKitJugadorCatan('#ca8a04', 590, 680);
            insertarDadoCatan(3, 800, 680); insertarDadoCatan(4, 860, 680); insertarLadronCatan(920, 680);
        }
        else if (id === 'pandemic') {
            insertarTableroPandemic(50, 50);
            for(let i=0; i<48; i++) { insertarCuboPandemic(600 + (i%8)*40, 50 + Math.floor(i/8)*40); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<4; i++) insertarMeeplePandemic(600 + i*60, 300);
            for(let i=0; i<7; i++) { insertarCartaRolPandemic(50 + i*260, 400); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<6; i++) insertarCentroInvestigacion(600 + i*70, 380);
            for(let i=0; i<4; i++) insertarCuraPandemic(600 + i*50, 450);
            for(let i=0; i<6; i++) insertarEventoPandemic(50 + i*260, 800);
        }
        else if (id === 'dixit') {
            for(let i=0; i<84; i++) { insertarCartaDixit(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'sushi_go') {
            const tiposSushi = ['nigiri', 'maki', 'temaki', 'sashimi', 'wasabi', 'dumpling', 'pudding'];
            for(let i=0; i<108; i++) { 
                const tipo = tiposSushi[Math.floor(Math.random() * tiposSushi.length)];
                cat_insertarCartaSushi(tipo); 
                await new Promise(r=>setTimeout(r,5)); 
            }
        }
        else if (id === 'hombres_lobo') {
            const rolesLobo = ['lobo', 'aldeano', 'vidente', 'bruja', 'cazador', 'cupido'];
            for(let i=0; i<24; i++) { 
                const rol = rolesLobo[Math.floor(Math.random() * rolesLobo.length)];
                cat_insertarCartaHombreLobo(rol); 
                await new Promise(r=>setTimeout(r,5)); 
            }
        }
        else if (id === 'codigo_secreto') {
            for(let i=0; i<25; i++) { insertarCartaCodename(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<40; i++) { insertarFichaAgenteCodenames(600 + (i%8)*50, 50 + Math.floor(i/8)*50); }
            insertarCartaClaveCodenames(800, 50);
        }
        else if (id === 'wingspan') {
            for(let i=0; i<40; i++) { insertarCartaWingspan(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'jungle') {
            for(let i=0; i<80; i++) { cat_insertarCartaJungleSpeed(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'coup') {
            for(let i=0; i<15; i++) { insertarCartaCoup(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<50; i++) { insertarMonedaCoup(600 + (i%10)*40, 50 + Math.floor(i/10)*40); }
        }
        else if (id === 'virus') {
            for(let i=0; i<32; i++) { insertarCartaVirusOrgano(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<32; i++) { insertarCartaVirusInfeccion(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<32; i++) { insertarCartaVirusMedicina(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'root') {
            insertarCartaRoot('marquesado'); insertarCartaRoot('nido'); insertarCartaRoot('alianza'); insertarCartaRoot('vagabundo');
            for(let i=0; i<50; i++) { insertarCartaRoot(['marquesado', 'nido', 'alianza', 'vagabundo'][i%4]); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'ciudadelas') {
            for(let i=0; i<8; i++) { insertarCartaCiudadelasPersonaje(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<54; i++) { insertarCartaCiudadelasDistrito(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'polilla') {
            for(let i=0; i<64; i++) { insertarCartaPolillaNum(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'bang') {
            for(let i=0; i<8; i++) insertarCartaBangRol();
            for(let i=0; i<16; i++) { insertarCartaBangPersonaje(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<5; i++) { insertarDadoBang(600 + i*60, 50); }
        }
        else if (id === 'uno') {
            for(let i=0; i<108; i++) { cat_insertarCartaUno(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'trivial') {
            cat_insertarTableroTrivial(50, 50);
        }
        else if (id === 'carcassonne') {
            for(let i=0; i<72; i++) { cat_insertarLosetaCarcassonne(50 + (i%8)*110, 50 + Math.floor(i/8)*110); await new Promise(r=>setTimeout(r,10)); }
        }
        else if (id === 'dobble') {
            for(let i=0; i<55; i++) { cat_insertarCartaDobble(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'wavelength') {
            cat_insertarDialWavelength(50, 50);
            for(let i=0; i<84; i++) { cat_insertarCartaWavelength(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'skyteam') {
            cat_insertarSkyTeam(50, 50);
            for(let i=0; i<8; i++) { insertarDadoBang(600 + i*60, 50); }
            for(let i=0; i<12; i++) { insertarFichaTaller('lana', 600 + (i%6)*40, 150 + Math.floor(i/6)*40); }
        }
        else if (id === 'hitster') {
            cat_insertarLineaTiempoHitster(50, 50);
            for(let i=0; i<30; i++) { insertarCartaCodename(50 + (i%6)*100, 150 + Math.floor(i/6)*100); await new Promise(r=>setTimeout(r,10)); }
        }
        else if (id === 'munchkin_exacto') {
            for(let i=0; i<95; i++) { cat_insertarCartaMunchkinPuerta(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<73; i++) { cat_insertarCartaMunchkinTesoro(); await new Promise(r=>setTimeout(r,5)); }
            cat_insertarDadoMunchkin(800, 50);
        }
        else if (id === 'ciudadelas_deluxe') {
            for(let i=0; i<27; i++) { cat_insertarCartaCiudadelasPersonaje(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<84; i++) { cat_insertarCartaCiudadelasDistrito(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<30; i++) { cat_insertarMonedaCiudadelas(600 + (i%10)*40, 50 + Math.floor(i/10)*40); }
        }
        else if (id === 'root_exacto') {
            for(let i=0; i<54; i++) { cat_insertarCartaRootAccion(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<16; i++) { cat_insertarCartaRootReferencia(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<16; i++) { cat_insertarFichaRoot('claro', 600 + (i%8)*40, 50 + Math.floor(i/8)*40); }
            for(let i=0; i<23; i++) { cat_insertarFichaRoot('objeto', 600 + (i%8)*40, 150 + Math.floor(i/8)*40); }
        }
        else if (id === 'arkham_lcg') {
            for(let i=0; i<5; i++) { cat_insertarCartaArkhamInvestigador(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<50; i++) { cat_insertarCartaArkhamJugador(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<30; i++) { cat_insertarCartaArkhamEscenario(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<44; i++) { cat_insertarFichaArkham('caos', 600 + (i%11)*40, 50 + Math.floor(i/11)*40); }
            for(let i=0; i<51; i++) { cat_insertarFichaArkham('recurso', 600 + (i%11)*40, 250 + Math.floor(i/11)*40); }
        }
        else if (id === 'la_llamada') {
            for(let i=0; i<12; i++) { cat_insertarCartaLaLlamada(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<3; i++) { insertarFichaTaller('corazon', 600 + i*60, 50); }
        }
        else if (id === 'rick_morty') {
            for(let i=0; i<5; i++) { cat_insertarCartaRickMorty(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<11; i++) { insertarDadoBang(600 + (i%6)*60, 50 + Math.floor(i/6)*60); }
        }
        else if (id === 'criaturas') {
            for(let i=0; i<37; i++) { cat_insertarCartaCriaturas(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<50; i++) { cat_insertarCartaCriaturas(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<9; i++) { insertarFichaTaller('lana', 600 + i*40, 50); }
        }
        else if (id === 'spellcrafting') {
            for(let i=0; i<26; i++) { cat_insertarCartaSpellCrafting(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<26; i++) { cat_insertarCartaSpellCrafting(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'xanathar') {
            for(let i=0; i<96; i++) { cat_insertarCartaXanathar(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'strixhaven') {
            for(let i=0; i<5; i++) { cat_insertarCartaStrixhaven(); await new Promise(r=>setTimeout(r,10)); }
            for(let i=0; i<2; i++) { cat_insertarCartaStrixhaven(); }
        }
        else if (id === 'carcassonne_plus') {
            for(let i=0; i<160; i++) { cat_insertarCartaCarcassonnePlus(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<12; i++) { cat_insertarCartaCarcassonnePlus(); await new Promise(r=>setTimeout(r,5)); }
        }
        else if (id === 'catan_navegantes') {
            insertarTableroCompletoCatan(50, 50);
            for(let i=0; i<60; i++) { cat_insertarCartaCatanNavegantes(); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<30; i++) { insertarCartaRecursoCatan('madera', 600 + (i%10)*80, 50 + Math.floor(i/10)*100); }
        }
        else if (id === 'zombies') {
            for(let i=0; i<30; i++) { cat_insertarLosetaZombies(50 + (i%6)*110, 50 + Math.floor(i/6)*110); await new Promise(r=>setTimeout(r,5)); }
            for(let i=0; i<50; i++) { cat_insertarCartaEventoZombies(); await new Promise(r=>setTimeout(r,3)); }
            for(let i=0; i<100; i++) { cat_insertarZombieMiniatura(600 + (i%20)*30, 50 + Math.floor(i/20)*40); }
            for(let i=0; i<6; i++) { cat_insertarPersonajeZombies(600 + (i%6)*50, 300); }
            for(let i=0; i<30; i++) { cat_insertarContadorZombies('vida', 600 + (i%10)*40, 380 + Math.floor(i/10)*40); }
            for(let i=0; i<60; i++) { cat_insertarContadorZombies('bala', 600 + (i%15)*35, 500 + Math.floor(i/15)*35); }
            for(let i=0; i<2; i++) { cat_insertarDadoZombies(600 + i*60, 650); }
        }
        // NUEVOS KITS DE ESCAPE (v232.0)
        else if (id === 'escape_tesoro') {
            for(let i=0; i<5; i++) { cat_insertarPistaEscape('acertijo', 'Pista ' + (i+1)); await new Promise(r=>setTimeout(r,10)); }
            cat_insertarMapaEscape(50, 400);
            cat_insertarTimerEscape(400, 400);
        }
        else if (id === 'escape_diy') {
            for(let i=0; i<3; i++) { cat_insertarCandadoEscape(3 + i, 50 + i*200, 50); }
            for(let i=0; i<3; i++) { cat_insertarSobreEscape(50 + i*250, 200); }
            for(let i=0; i<5; i++) { cat_insertarPistaEscape(['acertijo','codigo','cifrado','logica','observacion'][i], 'Puzzle ' + (i+1)); await new Promise(r=>setTimeout(r,10)); }
            cat_insertarTimerEscape(800, 500);
        }
        else if (id === 'escape_caso_cerrado') {
            for(let i=0; i<5; i++) { cat_insertarCartaNarrativaEscape(['detective','sospechoso','victima','testigo','gm'][i], 50 + i*260, 50); }
            for(let i=0; i<5; i++) { cat_insertarPistaEscape('logica', 'Evidencia ' + (i+1)); await new Promise(r=>setTimeout(r,10)); }
            cat_insertarHojaPistasEscape(400, 400);
        }
        else if (id === 'escape_cluedo') {
            for(let i=0; i<6; i++) { cat_insertarCartaNarrativaEscape(['detective','sospechoso','victima','testigo','gm','sospechoso'][i], 50 + (i%3)*260, 50 + Math.floor(i/3)*350); }
            for(let i=0; i<3; i++) { cat_insertarSobreEscape(850, 100 + i*150); }
            cat_insertarTimerEscape(400, 700);
        }
        else if (id === 'escape_kit_generico') {
            for(let i=0; i<5; i++) { cat_insertarPistaEscape(['acertijo','codigo','cifrado','logica','observacion'][i], 'Puzzle ' + (i+1)); await new Promise(r=>setTimeout(r,10)); }
            cat_insertarCandadoEscape(4, 50, 400);
            cat_insertarSobreEscape(300, 400);
            cat_insertarTimerEscape(550, 400);
            cat_insertarHojaPistasEscape(750, 400);
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