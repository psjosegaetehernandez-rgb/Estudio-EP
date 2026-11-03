const CATALOGO_JUEGOS = [
    { id: "taller_ep", nombre: "Kit Taller EP", familia: "Educación Popular", jugadores: "10-30", icono: "fa-hands-holding-circle", color: "#ca8a04",
      reglas: { objetivo: "Facilitar la reflexión sobre el contexto comunitario.", preparacion: "Imprimir cartas de refranes.", turno: "Los participantes buscan su otra mitad." },
      adaptacion_ep: { objetivo: "Visibilizar problemáticas locales.", preguntas: ["¿Qué refrán se parece a tu realidad?", "¿Cómo se vive el contexto en tu barrio?"] }
    },
    { id: "taller_vih", nombre: "Taller VIH Tarapacá", familia: "Salud y Género", jugadores: "10-25", icono: "fa-heart-pulse", color: "#8B3A3A",
      reglas: { objetivo: "Derribar mitos y reflexionar sobre la violencia de género.", preparacion: "Descargar guía, cartas y cubo.", turno: "Seguir las 5 fases del facilitador." },
      adaptacion_ep: { objetivo: "Tejer una red de cuidado colectivo.", preguntas: ["¿Qué mitos sobre el VIH conocías?", "¿Cómo se manifiesta la violencia en la pareja?"] }
    },
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
    },
    { id: "sushi_go", nombre: "Sushi Go!", familia: "Drafting", jugadores: "2-5", icono: "fa-utensils", color: "#ca8a04",
      reglas: { objetivo: "Formar el mejor menú.", preparacion: "Repartir cartas.", turno: "Elegir una carta y pasar el mazo." },
      adaptacion_ep: { objetivo: "Reflexionar sobre la elección bajo presión.", preguntas: ["¿Cómo afectan las decisiones individuales al grupo?", "¿Qué es el consumo responsable?"] }
    },
    { id: "hombres_lobo", nombre: "Los Hombres Lobo", familia: "Roles Ocultos", jugadores: "3-18", icono: "fa-paw", color: "#1e293b",
      reglas: { objetivo: "Aldeanos: eliminar lobos. Lobos: comerse a los aldeanos.", preparacion: "Repartir roles secretos.", turno: "Noche (ataque), Día (debate y votación)." },
      adaptacion_ep: { objetivo: "Trabajar la argumentación y los prejuicios.", preguntas: ["¿Cómo se desenmascara a un mentiroso?", "¿Cómo se manipula a la comunidad?"] }
    },
    { id: "codigo_secreto", nombre: "Código Secreto", familia: "Deducción", jugadores: "2-8", icono: "fa-user-secret", color: "#dc2626",
      reglas: { objetivo: "Encontrar a los agentes antes que el rival.", preparacion: "Colocar 25 palabras.", turno: "El jefe espía da pistas de una palabra." },
      adaptacion_ep: { objetivo: "Analizar el lenguaje y las fake news.", preguntas: ["¿Cómo cambia el significado de una palabra?", "¿Quién controla el código?"] }
    },
    { id: "root", nombre: "Root", familia: "Asimétrico", jugadores: "2-4", icono: "fa-tree", color: "#15803d",
      reglas: { objetivo: "Cada facción busca dominar el bosque.", preparacion: "Elegir facción y desplegar tropas.", turno: "Jugar cartas de acción según tu facción." },
      adaptacion_ep: { objetivo: "Analizar el poder asimétrico.", preguntas: ["¿Es justo que cada bando tenga reglas distintas?", "¿Cómo se organiza la resistencia?"] }
    },
    { id: "ciudadelas", nombre: "Ciudadelas", familia: "Roles Ocultos", jugadores: "2-8", icono: "fa-chess-rook", color: "#78350f",
      reglas: { objetivo: "Construir la ciudad más valiosa.", preparacion: "Repartir distritos y monedas.", turno: "Elegir un personaje en secreto y actuar." },
      adaptacion_ep: { objetivo: "Reflexionar sobre la corrupción.", preguntas: ["¿Qué personaje representa mejor a un líder?", "¿Cómo se usa el poder?"] }
    },
    { id: "polilla", nombre: "Polilla Tramposa", familia: "Fiesta", jugadores: "2-6", icono: "fa-bug", color: "#6d28d9",
      reglas: { objetivo: "Deshacerte de tus cartas haciendo trampa.", preparacion: "Repartir cartas.", turno: "Jugar en orden ascendente." },
      adaptacion_ep: { objetivo: "Visibilizar las reglas implícitas.", preguntas: ["¿Qué pasa cuando las reglas no están claras?", "¿Es justo hacer trampa?"] }
    },
    { id: "bang", nombre: "Bang! Dados", familia: "Dados", jugadores: "3-8", icono: "fa-cowboy", color: "#b91c1c",
      reglas: { objetivo: "Eliminar a los enemigos según tu rol.", preparacion: "Repartir un rol secreto.", turno: "Lanzar dados, disparar o recuperar vida." },
      adaptacion_ep: { objetivo: "Analizar los bandos y la lealtad.", preguntas: ["¿Cómo decides en quién confiar?", "¿Qué hace a un líder legítimo?"] }
    },
    { id: "wingspan", nombre: "Wingspan", familia: "Eurogame", jugadores: "1-5", icono: "fa-feather", color: "#0284c7",
      reglas: { objetivo: "Atraer pájaros a tu reserva.", preparacion: "Colocar tableros y repartir cartas.", turno: "Jugar pájaros, recolectar comida o poner huevos." },
      adaptacion_ep: { objetivo: "Reflexionar sobre la biodiversidad.", preguntas: ["¿Qué especies estamos perdiendo?", "¿Cómo protegemos la fauna local?"] }
    },
    { id: "munchkin", nombre: "Munchkin", familia: "Cartas", jugadores: "3-6", icono: "fa-hat-wizard", color: "#b91c1c",
      reglas: { objetivo: "Llegar al nivel 10.", preparacion: "Repartir 4 cartas.", turno: "Abrir puerta, combatir monstruo o saquear." },
      adaptacion_ep: { objetivo: "Analizar el individualismo.", preguntas: ["¿Ayudaste a otros o preferiste ganar solo?", "¿Cómo se siente ser traicionado?"] }
    },
    { id: "jungle", nombre: "Jungle Speed", familia: "Reflejos", jugadores: "2-8", icono: "fa-hand-fist", color: "#eab308",
      reglas: { objetivo: "Deshacerte de tus cartas atrapando el tótem.", preparacion: "Repartir cartas, tótem al centro.", turno: "Voltear carta. Si coincide, atrapa el tótem." },
      adaptacion_ep: { objetivo: "Trabajar los reflejos y el manejo de impulsos.", preguntas: ["¿Cómo se sintieron al apurarse?", "¿Qué pasa cuando actuamos sin pensar?"] }
    },
    { id: "coup", nombre: "Coup", familia: "Deducción", jugadores: "2-6", icono: "fa-mask", color: "#9a3412",
      reglas: { objetivo: "Ser el último en pie mediante el engaño.", preparacion: "Repartir 2 roles y 2 monedas.", turno: "Declarar una acción, los demás pueden desafiarte." },
      adaptacion_ep: { objetivo: "Visibilizar la corrupción y las fake news.", preguntas: ["¿Fue fácil mentir para ganar?", "¿Cómo detectamos a los líderes corruptos?"] }
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
        
        // CARGA DE COMPONENTES ESPECÍFICOS
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

                if (id === 'taller_ep') {
            if(typeof insertarCartaRefran === 'function' && typeof insertarTelaranaEP === 'function') {
                // Tablero y Fichas
                insertarTelaranaEP(50, 50);
                for(let i=0; i<5; i++) insertarFichaTaller('lana', 450 + i*60, 100);
                
                // Cartas de Refranes
                const refranes = [
                    "Análisis de contexto",
                    "No hay mal que dure cien años",
                    "A quien madruga, Dios lo ayuda",
                    "Más vale pájaro en mano que cien volando",
                    "El que ríe último, ríe mejor",
                    "No es oro todo lo que reluce"
                ];
                refranes.forEach((refran, i) => {
                    const col = i % 3;
                    const row = Math.floor(i / 3);
                    insertarCartaRefran(refran, 50 + col * 270, 450 + row * 360);
                });
            }
        }
        else if (id === 'taller_vih') {
            if(typeof insertarCartaMitoVIH === 'function' && typeof insertarGuiaFacilitadorVIH === 'function') {
                // Guía y Tableros Principales
                insertarGuiaFacilitadorVIH(50, 50);
                insertarCuboReflexionVIH(500, 50);
                insertarRutaCuidadoVIH(50, 650);
                insertarArbolProblemasVIH(750, 50);
                insertarSemaforoVIH(1200, 50);
                
                // Fichas de Poder
                for(let i=0; i<3; i++) insertarFichaTaller('escudo', 500, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('rayo', 600, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('corazon', 700, 450 + i*60);
                
                // Mazo de Mitos
                const mitos = [
                    { t: "El Contagio", x: "Si tengo VIH, mi pareja se va a contagiar seguro, aunque me cuide." },
                    { t: "El Examen", x: "El test duele, es caro y todo el pueblo se va a enterar de mi resultado." },
                    { t: "El Estigma", x: "Solo las personas promiscuas o los homosexuales se contagian de VIH." },
                    { t: "El Matrimonio", x: "Una mujer casada no necesita cuidarse, su esposo la protege de todo." },
                    { t: "Las ITS", x: "Si tengo una infección como sífilis o gonorrea, se me quita sola con el tiempo." },
                    { t: "El Futuro", x: "El VIH es una sentencia de muerte. Si me sale positivo, mi vida se acaba." }
                ];
                mitos.forEach((mito, i) => {
                    const col = i % 3;
                    const row = Math.floor(i / 3);
                    insertarCartaMitoVIH('mito', mito.t, mito.x, 50 + col * 270, 850 + row * 360);
                });

                // Mazo de Situaciones
                const situaciones = [
                    { t: "Violencia", x: "Tu pareja se enoja y te grita porque le pediste usar condón. ¿Qué haces?" },
                    { t: "La Infidelidad", x: "Descubres que tu pareja te fue infiel. Tienes miedo de hacerte el test. ¿Cómo lo enfrentas?" },
                    { t: "La Amiga", x: "Una amiga te confiesa que tiene miedo de tener VIH, pero no va al médico por vergüenza. ¿Cómo la apoyas?" }
                ];
                situaciones.forEach((sit, i) => {
                    insertarCartaMitoVIH('situacion', sit.t, sit.x, 950 + i * 270, 850);
                });
            }
        }
        if(typeof ocultarLoading === 'function') ocultarLoading();
        if(typeof showToast === 'function') showToast(`¡Materiales de ${juego.nombre} cargados!`, "success");
    } catch (error) {
        console.error("Error cargando juego:", error);         if (id === 'taller_ep') {
            if(typeof insertarCartaRefran === 'function' && typeof insertarTelaranaEP === 'function') {
                // Tablero y Fichas
                insertarTelaranaEP(50, 50);
                for(let i=0; i<5; i++) insertarFichaTaller('lana', 450 + i*60, 100);
                
                // Cartas de Refranes
                const refranes = [
                    "Análisis de contexto",
                    "No hay mal que dure cien años",
                    "A quien madruga, Dios lo ayuda",
                    "Más vale pájaro en mano que cien volando",
                    "El que ríe último, ríe mejor",
                    "No es oro todo lo que reluce"
                ];
                refranes.forEach((refran, i) => {
                    const col = i % 3;
                    const row = Math.floor(i / 3);
                    insertarCartaRefran(refran, 50 + col * 270, 450 + row * 360);
                });
            }
        }
        else if (id === 'taller_vih') {
            if(typeof insertarCartaMitoVIH === 'function' && typeof insertarGuiaFacilitadorVIH === 'function') {
                // Guía y Tableros Principales
                insertarGuiaFacilitadorVIH(50, 50);
                insertarCuboReflexionVIH(500, 50);
                insertarRutaCuidadoVIH(50, 650);
                insertarArbolProblemasVIH(750, 50);
                insertarSemaforoVIH(1200, 50);
                
                // Fichas de Poder
                for(let i=0; i<3; i++) insertarFichaTaller('escudo', 500, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('rayo', 600, 450 + i*60);
                for(let i=0; i<3; i++) insertarFichaTaller('corazon', 700, 450 + i*60);
                
                // Mazo de Mitos
                const mitos = [
                    { t: "El Contagio", x: "Si tengo VIH, mi pareja se va a contagiar seguro, aunque me cuide." },
                    { t: "El Examen", x: "El test duele, es caro y todo el pueblo se va a enterar de mi resultado." },
                    { t: "El Estigma", x: "Solo las personas promiscuas o los homosexuales se contagian de VIH." },
                    { t: "El Matrimonio", x: "Una mujer casada no necesita cuidarse, su esposo la protege de todo." },
                    { t: "Las ITS", x: "Si tengo una infección como sífilis o gonorrea, se me quita sola con el tiempo." },
                    { t: "El Futuro", x: "El VIH es una sentencia de muerte. Si me sale positivo, mi vida se acaba." }
                ];
                mitos.forEach((mito, i) => {
                    const col = i % 3;
                    const row = Math.floor(i / 3);
                    insertarCartaMitoVIH('mito', mito.t, mito.x, 50 + col * 270, 850 + row * 360);
                });

                // Mazo de Situaciones
                const situaciones = [
                    { t: "Violencia", x: "Tu pareja se enoja y te grita porque le pediste usar condón. ¿Qué haces?" },
                    { t: "La Infidelidad", x: "Descubres que tu pareja te fue infiel. Tienes miedo de hacerte el test. ¿Cómo lo enfrentas?" },
                    { t: "La Amiga", x: "Una amiga te confiesa que tiene miedo de tener VIH, pero no va al médico por vergüenza. ¿Cómo la apoyas?" }
                ];
                situaciones.forEach((sit, i) => {
                    insertarCartaMitoVIH('situacion', sit.t, sit.x, 950 + i * 270, 850);
                });
            }
        }
        if(typeof ocultarLoading === 'function') ocultarLoading();
    }
}

document.addEventListener('DOMContentLoaded', () => { renderCatalogo(); });