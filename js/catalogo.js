const CATALOGO_JUEGOS = [
    // TALLERES EP
    { id: "taller_ep", nombre: "Kit Taller EP", familia: "Educación Popular", jugadores: "10-30", icono: "fa-hands-holding-circle", color: "#ca8a04", reglas: { objetivo: "Facilitar la reflexión.", preparacion: "Imprimir cartas.", turno: "Buscar la mitad." }, adaptacion_ep: { objetivo: "Visibilizar problemáticas.", preguntas: ["¿Qué refrán se parece a tu realidad?"] } },
    { id: "taller_vih", nombre: "Taller VIH Tarapacá", familia: "Salud y Género", jugadores: "10-25", icono: "fa-heart-pulse", color: "#8B3A3A", reglas: { objetivo: "Derribar mitos.", preparacion: "Descargar guía.", turno: "Seguir fases." }, adaptacion_ep: { objetivo: "Tejer red de cuidado.", preguntas: ["¿Qué mitos conocías?"] } },
    
    // JUEGOS BASE Y EXPANSIONES
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
    { id: "hitster", nombre: "Hitster", familia: "Música", jugadores: "2-10", icono: "fa-timeline", color: "#be123c", reglas: { objetivo: "Ordenar canciones.", preparacion: "Línea de tiempo.", turno: "Adivinar año de canción." }, adaptacion_ep: { objetivo: "Memoria histórica.", preguntas: ["¿Qué canciones marcaron el barrio?"] } },
    
    // NUEVOS JUEGOS EXACTOS
    { id: "munchkin_exacto", nombre: "Munchkin (Exacto)", familia: "Cartas", jugadores: "3-6", icono: "fa-hat-wizard", color: "#b91c1c", reglas: { objetivo: "Llegar al nivel 10.", preparacion: "Repartir 4 cartas.", turno: "Abrir puerta, combatir monstruo o saquear." }, adaptacion_ep: { objetivo: "Analizar el individualismo.", preguntas: ["¿Ayudaste a otros o preferiste ganar solo?"] } },
    { id: "ciudadelas_deluxe", nombre: "Ciudadelas Deluxe", familia: "Roles Ocultos", jugadores: "2-8", icono: "fa-chess-rook", color: "#78350f", reglas: { objetivo: "Construir la ciudad más valiosa.", preparacion: "Repartir distritos y monedas.", turno: "Elegir un personaje en secreto y actuar." }, adaptacion_ep: { objetivo: "Reflexionar sobre la corrupción.", preguntas: ["¿Qué personaje representa mejor a un líder?"] } },
    { id: "root_exacto", nombre: "Root (Base)", familia: "Asimétrico", jugadores: "2-4", icono: "fa-tree", color: "#15803d", reglas: { objetivo: "Dominar el bosque.", preparacion: "Elegir facción.", turno: "Jugar cartas de acción." }, adaptacion_ep: { objetivo: "Poder asimétrico.", preguntas: ["¿Es justo que cada bando tenga reglas distintas?"] } },
    { id: "arkham_lcg", nombre: "Arkham Horror LCG", familia: "Cooperativo", jugadores: "1-4", icono: "fa-eye", color: "#1e293b", reglas: { objetivo: "Resolver el misterio.", preparacion: "Elegir investigador.", turno: "Jugar cartas, investigar." }, adaptacion_ep: { objetivo: "Enfrentar el miedo colectivo.", preguntas: ["¿Cómo se organiza la comunidad ante lo desconocido?"] } }
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

        // --- CARGA EXHAUSTIVA EXACTA ---
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
        }
        else if (id === 'skyteam') {
            cat_insertarSkyTeam(50, 50);
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

        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast(`¡Materiales de ${juego.nombre} cargados!`, "success");
    } catch (error) {
        console.error("Error cargando juego:", error);
        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast("Error al cargar: " + error.message, "error");
    }
}

document.addEventListener('DOMContentLoaded', () => { renderCatalogo(); });