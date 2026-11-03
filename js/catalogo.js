// ================= CATÁLOGO MAESTRO v32.0 (Fichas Técnicas Exactas) =================
const CATALOGO_JUEGOS = [
    // --- 3.1. PANDEMIC ---
    {
        id: "pandemic", nombre: "Pandemic", familia: "Cooperativo", 
        jugadores: "2-4", duracion: "45-60 min", icono: "fa-solid fa-virus-slash", color: "#dc2626",
        componentes: { 
            tableros: [{ tipo: "perimetro", cantidad: 1 }], 
            cartas: [{ tipo: "pandemic_evento", cantidad: 59 }, { tipo: "pandemic_ciudad", cantidad: 48 }], 
            tokens: [{ tipo: "circulo", cantidad: 96 }, { tipo: "meeple", cantidad: 7 }] 
        },
        reglas: { 
            objetivo: "Cooperar para descubrir las curas de las 4 enfermedades antes de que se agoten las cartas o haya 8 brotes.", 
            preparacion: "Colocar el tablero, repartir roles, infectar 9 ciudades iniciales y preparar los mazos.", 
            turno: "Realizar 4 acciones (moverse, tratar, compartir conocimiento, curar), luego robar 2 cartas e infectar ciudades." 
        },
        adaptacion_ep: { 
            objetivo: "Simular la respuesta comunitaria ante una crisis de salud (falta de agua, desempleo). Las 'curas' son soluciones estructurales que requieren cooperación.", 
            preguntas: ["¿Cómo se organizaron para priorizar las curas?", "¿Qué pasa si cada uno juega por su lado en una crisis?"] 
        }
    },
    // --- 3.2. CATÁN (BASE) ---
    {
        id: "catan_base", nombre: "Colonos de Catán", familia: "Gestión de Recursos", 
        jugadores: "3-4", duracion: "60-120 min", icono: "fa-solid fa-hexagon", color: "#9a3412",
        componentes: { 
            tableros: [{ tipo: "hex", cantidad: 19 }, { tipo: "perimetro", cantidad: 6 }], 
            cartas: [{ tipo: "recurso_catan", cantidad: 95 }, { tipo: "evento", cantidad: 25 }], 
            tokens: [{ tipo: "circulo", cantidad: 18 }, { tipo: "meeple", cantidad: 36 }] 
        },
        reglas: { 
            objetivo: "Ser el primero en alcanzar 10 puntos de victoria mediante construcción y comercio.", 
            preparacion: "Montar el tablero hexagonal, colocar fichas numéricas y puertos. Cada jugador coloca 2 poblados y 2 carreteras.", 
            turno: "Tirar dados para producir recursos, comerciar y construir carreteras, poblados, ciudades o comprar cartas de desarrollo." 
        },
        adaptacion_ep: { 
            objetivo: "Simular la gestión de recursos comunitarios y la negociación por el bien común. Los recursos pueden ser agua, alimentos, vivienda.", 
            preguntas: ["¿Qué recursos fueron los más disputados?", "¿Cómo se relaciona esta escasez con el acceso al agua o vivienda en nuestra comunidad?"] 
        }
    },
    // --- 3.2.1. CATÁN: CIUDADES Y CABALLEROS ---
    {
        id: "catan_ciudades", nombre: "Catán: Ciudades y Caballeros", familia: "Expansión", 
        jugadores: "3-4", duracion: "90-120 min", icono: "fa-solid fa-chess-rook", color: "#b91c1c",
        componentes: { 
            tableros: [{ tipo: "loseta", cantidad: 4 }], 
            cartas: [{ tipo: "recurso_catan", cantidad: 90 }, { tipo: "evento", cantidad: 6 }], 
            tokens: [{ tipo: "cuadrado", cantidad: 60 }, { tipo: "circulo", cantidad: 24 }] 
        },
        reglas: { 
            objetivo: "Mejorar ciudades a metrópolis y defender Catán de las invasiones bárbaras.", 
            preparacion: "Requiere el juego base. Añadir el tablero de la flota bárbara y repartir los cuadros de mejora.", 
            turno: "Fase de Producción, Fase de Comercio y Construcción, y Fase de Progreso." 
        },
        adaptacion_ep: { 
            objetivo: "Reflexionar sobre la defensa colectiva y la inversión en el bien común.", 
            preguntas: ["¿Cómo decidieron qué mejoras construir?", "¿Qué pasa si la comunidad no se une ante una amenaza externa?"] 
        }
    },
    // --- 3.2.2. CATÁN: NAVEGANTES ---
    {
        id: "catan_navegantes", nombre: "Catán: Navegantes", familia: "Expansión", 
        jugadores: "3-4", duracion: "90-120 min", icono: "fa-solid fa-ship", color: "#0284c7",
        componentes: { 
            tableros: [{ tipo: "hex", cantidad: 30 }, { tipo: "perimetro", cantidad: 2 }], 
            cartas: [{ tipo: "recurso_catan", cantidad: 95 }], 
            tokens: [{ tipo: "cuadrado", cantidad: 60 }, { tipo: "circulo", cantidad: 20 }] 
        },
        reglas: { 
            objetivo: "Explorar islas desconocidas y establecer rutas marítimas.", 
            preparacion: "Requiere el juego base. Montar el tablero con hexágonos de mar y tierra.", 
            turno: "Igual que el juego base, pero puedes construir barcos en lugar de caminos." 
        },
        adaptacion_ep: { 
            objetivo: "Hablar sobre migración, exploración y límites territoriales.", 
            preguntas: ["¿Qué implica dejar tu tierra para explorar lo desconocido?", "¿Cómo se reparten los recursos en las nuevas islas?"] 
        }
    },
    // --- 3.3. DIXIT ---
    {
        id: "dixit", nombre: "Dixit", familia: "Asociación Visual", 
        jugadores: "3-8", duracion: "30 min", icono: "fa-solid fa-moon", color: "#4c1d95",
        componentes: { 
            tableros: [{ tipo: "perimetro", cantidad: 1 }], 
            cartas: [{ tipo: "dixit", cantidad: 84 }], 
            tokens: [{ tipo: "meeple", cantidad: 8 }] 
        },
        reglas: { 
            objetivo: "Obtener la mayor cantidad de puntos adivinando la carta del cuentacuentos y engañando a los demás.", 
            preparacion: "Repartir 6 cartas a cada jugador y dar los diales de votación.", 
            turno: "El cuentacuentos da una pista. Los demás eligen una carta que encaje. Se vota en secreto." 
        },
        adaptacion_ep: { 
            objetivo: "Herramienta poderosa para la comunicación asertiva y la empatía. Expresar sentimientos usando las imágenes como metáfora.", 
            preguntas: ["¿Por qué elegimos ciertas imágenes?", "¿Qué nos dicen de nuestra comunidad?"] 
        }
    },
    // --- 3.4. VIRUS! ---
    {
        id: "virus", nombre: "Virus!", familia: "Toma Eso / Gestión de Mano", 
        jugadores: "2-6", duracion: "20 min", icono: "fa-solid fa-virus", color: "#16a34a",
        componentes: { 
            tableros: [], 
            cartas: [{ tipo: "virus", cantidad: 68 }], 
            tokens: [] 
        },
        reglas: { 
            objetivo: "Construir un cuerpo sano (4 órganos) mientras infectas o destruyes los órganos de los rivales.", 
            preparacion: "Barajar el mazo y repartir 3 cartas a cada jugador.", 
            turno: "Robar una carta, jugar cartas para poner órganos o lanzar virus/medicinas a los rivales." 
        },
        adaptacion_ep: { 
            objetivo: "Visibilizar conflictos y dinámicas de poder. Los Órganos son Derechos, los Virus son recortes, las Medicinas son acciones colectivas.", 
            preguntas: ["¿Cómo defendemos lo público ante los 'recortes'?", "¿Qué alianzas hicieron para proteger sus derechos?"] 
        }
    },
    // --- 3.5. SUSHI GO! ---
    {
        id: "sushi_go", nombre: "Sushi Go!", familia: "Drafting / Colección de Sets", 
        jugadores: "2-5", duracion: "15 min", icono: "fa-solid fa-utensils", color: "#f59e0b",
        componentes: { 
            tableros: [], 
            cartas: [{ tipo: "sushi", cantidad: 108 }], 
            tokens: [] 
        },
        reglas: { 
            objetivo: "Formar el mejor menú de sushi y ganar puntos.", 
            preparacion: "Barajar y repartir 10 cartas a cada jugador.", 
            turno: "Elegir una carta, pasar el resto al jugador de la izquierda. Repetir hasta agotar." 
        },
        adaptacion_ep: { 
            objetivo: "Simula la priorización de recursos en un proyecto comunitario (Tiempo, Dinero, Voluntarios).", 
            preguntas: ["En lugar de sushi, estas cartas son Recursos. ¿Cuál drafteaste primero y por qué?"] 
        }
    },
    // --- 3.6. HOMBRES LOBO ---
    {
        id: "hombres_lobo", nombre: "Los Hombres Lobo", familia: "Roles Ocultos", 
        jugadores: "8-18", duracion: "30 min", icono: "fa-solid fa-user-secret", color: "#1e293b",
        componentes: { 
            tableros: [], 
            cartas: [{ tipo: "rol", cantidad: 47 }, { tipo: "evento", cantidad: 36 }], 
            tokens: [{ tipo: "circulo", cantidad: 29 }] 
        },
        reglas: { 
            objetivo: "Los lobos deben eliminar aldeanos; los aldeanos deben descubrir a los lobos.", 
            preparacion: "Repartir un rol secreto a cada jugador.", 
            turno: "Fase nocturna (los lobos matan, la vidente investiga) y fase diurna (debate y linchamiento)." 
        },
        adaptacion_ep: { 
            objetivo: "Analizar rumores, silencios y confianza en la comunidad.", 
            preguntas: ["¿Cómo identificamos a los 'Barras Bravas' o 'Intereses Creados' en una asamblea?"] 
        }
    },
    // --- 3.7. CODENAMES ---
    {
        id: "codenames", nombre: "Código Secreto (Codenames)", familia: "Deducción", 
        jugadores: "2-8+", duracion: "15-30 min", icono: "fa-solid fa-mask", color: "#9a3412",
        componentes: { 
            tableros: [], 
            cartas: [{ tipo: "codenames", cantidad: 200 }, { tipo: "evento", cantidad: 40 }], 
            tokens: [{ tipo: "circulo", cantidad: 25 }] 
        },
        reglas: { 
            objetivo: "Encontrar a todos los agentes de tu equipo antes que el rival.", 
            preparacion: "Colocar 25 cartas de palabras en una cuadrícula de 5x5. Los espías jefes miran la tarjeta clave.", 
            turno: "El espía jefe da una pista de una palabra y un número. Su equipo adivina cuáles son las palabras." 
        },
        adaptacion_ep: { 
            objetivo: "Analizar cómo se construyen los rumores y la desinformación en una comunidad.", 
            preguntas: ["¿Fue fácil dar pistas sin ser demasiado obvio?", "¿Cómo se sintieron al adivinar mal?"] 
        }
    },
    // --- 3.8. CARCASSONNE ---
    {
        id: "carcassonne", nombre: "Carcassonne", familia: "Colocación de Losetas", 
        jugadores: "2-5", duracion: "45 min", icono: "fa-solid fa-map", color: "#15803d",
        componentes: { 
            tableros: [{ tipo: "loseta", cantidad: 84 }], 
            cartas: [], 
            tokens: [{ tipo: "meeple", cantidad: 40 }] 
        },
        reglas: { 
            objetivo: "Construir el mejor paisaje medieval y controlar las ciudades, caminos y monasterios.", 
            preparacion: "Colocar la loseta inicial en el centro de la mesa y repartir 7 meeples a cada jugador.", 
            turno: "Robar una loseta, colocarla conectando caminos o ciudades, y opcionalmente colocar un meeple." 
        },
        adaptacion_ep: { 
            objetivo: "Simula la construcción colectiva del territorio. Cada loseta puede ser un 'actor social' o un 'recurso comunitario'.", 
            preguntas: ["¿Cómo construimos juntos el territorio?", "¿Qué partes de nuestra comunidad estamos priorizando?"] 
        }
    },
    // --- 3.9. TICKET TO RIDE ---
    {
        id: "ticket_to_ride", nombre: "Aventureros al Tren", familia: "Rutas y Conexiones", 
        jugadores: "2-5", duracion: "60 min", icono: "fa-solid fa-train", color: "#0284c7",
        componentes: { 
            tableros: [{ tipo: "perimetro", cantidad: 1 }], 
            cartas: [{ tipo: "tren_ticket", cantidad: 110 }, { tipo: "boleto_ticket", cantidad: 30 }], 
            tokens: [{ tipo: "cuadrado", cantidad: 240 }, { tipo: "meeple", cantidad: 5 }] 
        },
        reglas: { 
            objetivo: "Coleccionar cartas de colores para reclamar rutas en el tablero y conectar ciudades.", 
            preparacion: "Repartir 4 cartas de tren y 3 boletos de destino a cada jugador. Colocar los trenes en el tablero.", 
            turno: "Robar cartas de tren, reclamar una ruta conectando ciudades, o robar nuevos boletos de destino." 
        },
        adaptacion_ep: { 
            objetivo: "Mapear las rutas de transporte público y las barreras de acceso a los servicios en la comunidad.", 
            preguntas: ["¿Qué rutas son más importantes para nuestra comunidad?", "¿Qué pasa con las zonas desconectadas?"] 
        }
    }
    ,{
        id: "wingspan", nombre: "Wingspan", familia: "Eurogame / Motor de Cartas", 
        jugadores: "1-5", duracion: "40-70 min", icono: "fa-solid fa-feather", color: "#0284c7",
        componentes: { tableros: [{ tipo: "perimetro", cantidad: 1 }], cartas: [{ tipo: "wingspan", cantidad: 15 }], tokens: [{ tipo: "circulo", cantidad: 10 }] },
        reglas: { objetivo: "Atraer pájaros a tu reserva natural para obtener la mayor puntuación.", preparacion: "Colocar los tableros de acción y repartir cartas de pájaro y huevos.", turno: "Jugar un pájaro, recolectar comida o poner huevos en tu reserva." },
        adaptacion_ep: { objetivo: "Reflexionar sobre la biodiversidad y la preservación del medio ambiente.", preguntas: ["¿Qué especies de nuestro territorio estamos perdiendo?", "¿Cómo podemos proteger la fauna local?"] }
    },
    {
        id: "kingdomino", nombre: "Kingdomino", familia: "Colocación de Losetas", 
        jugadores: "2-4", duracion: "15 min", icono: "fa-solid fa-chess-board", color: "#15803d",
        componentes: { tableros: [{ tipo: "kingdomino", cantidad: 20 }], cartas: [], tokens: [{ tipo: "meeple", cantidad: 4 }] },
        reglas: { objetivo: "Construir el reino más armonioso y grande conectando losetas.", preparacion: "Repartir un castillo y un meeple a cada jugador. Barajar las losetas de dominó.", turno: "Elegir una loseta, colocarla conectando territorios iguales y colocar el meeple." },
        adaptacion_ep: { objetivo: "Simular la construcción del territorio y la conexión de redes comunitarias.", preguntas: ["¿Cómo decidimos qué tierras unir?", "¿Qué pasa cuando los territorios no conectan con la comunidad?"] }
    },
    {
        id: "munchkin", nombre: "Munchkin", familia: "Cartas / Toma Eso", 
        jugadores: "3-6", duracion: "60-120 min", icono: "fa-solid fa-hat-wizard", color: "#b91c1c",
        componentes: { tableros: [], cartas: [{ tipo: "munchkin", cantidad: 15 }], tokens: [{ tipo: "circulo", cantidad: 10 }] },
        reglas: { objetivo: "Ser el primero en llegar al nivel 10 eliminando monstruos o traicionando a tus amigos.", preparacion: "Repartir 4 cartas a cada jugador. Colocar el mazo de puertas y tesoros.", turno: "Abrir una puerta (robar carta), combatir al monstruo o saquear la sala." },
        adaptacion_ep: { objetivo: "Analizar el individualismo y las alianzas temporales.", preguntas: ["¿Ayudaste a otros o preferiste ganar solo?", "¿Cómo se siente ser traicionado por un 'compañero'?"] }
    },
    {
        id: "jungle_speed", nombre: "Jungle Speed", familia: "Reflejos / Velocidad", 
        jugadores: "2-8", duracion: "10 min", icono: "fa-solid fa-hand-fist", color: "#eab308",
        componentes: { tableros: [], cartas: [{ tipo: "jungle_speed", cantidad: 15 }], tokens: [{ tipo: "circulo", cantidad: 1 }] },
        reglas: { objetivo: "Deshacerte de todas tus cartas atrapando el tótem cuando los símbolos coincidan.", preparacion: "Repartir las cartas boca abajo. Colocar el tótem en el centro.", turno: "Voltear una carta. Si coincide con la de otro, ¡atrapa el tótem!" },
        adaptacion_ep: { objetivo: "Trabajar la atención plena, los reflejos y el manejo de impulsos.", preguntas: ["¿Cómo se sintieron al apurarse?", "¿Qué pasa en nuestra vida diaria cuando actuamos sin pensar?"] }
    },
    {
        id: "coup", nombre: "Coup", familia: "Roles Ocultos / Deducción", 
        jugadores: "2-6", duracion: "15 min", icono: "fa-solid fa-mask", color: "#9a3412",
        componentes: { tableros: [], cartas: [{ tipo: "coup", cantidad: 15 }], tokens: [{ tipo: "circulo", cantidad: 10 }] },
        reglas: { objetivo: "Ser el último jugador en pie eliminando a los demás mediante el engaño y el poder.", preparacion: "Repartir 2 cartas (roles) y 2 monedas a cada jugador.", turno: "Declarar una acción (ej. asesinar o impuestos), los demás pueden desafiarte o bloquear." },
        adaptacion_ep: { objetivo: "Visibilizar la corrupción, el abuso de poder y las fake news.", preguntas: ["¿Fue fácil mentir para ganar?", "¿Cómo detectamos a los 'líderes' que solo buscan su beneficio?"] }
    }];

// ================= LÓGICA DE RENDERIZADO Y MODAL =================
function asegurarModalCompleto() {
    if (!document.getElementById('modal-catalogo') || !document.getElementById('cat-regla-objetivo')) {
        let modal = document.getElementById('modal-catalogo');
        if(!modal) { modal = document.createElement('div'); modal.id = 'modal-catalogo'; modal.className = 'modal-overlay'; modal.style.cssText = 'z-index: 10000; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px);'; document.body.appendChild(modal); }
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 30px;">
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:20px;">
                    <div style="display:flex; gap:15px; align-items:center;">
                        <div id="cat-detalle-icono" style="font-size:30px; padding:15px; border-radius:12px;"></div>
                        <div><h2 id="cat-detalle-nombre" style="font-family:'Playfair Display'; margin:0;">Nombre</h2><span id="cat-detalle-familia" style="font-size:12px; color:#64748b; font-weight:bold; text-transform:uppercase;"></span></div>
                    </div>
                    <button onclick="cerrarDetalleJuego()" style="background:none; border:none; font-size:24px; cursor:pointer; color:#ef4444;">&times;</button>
                </div>
                <div style="display:flex; gap:20px; margin-bottom:20px; font-size:13px; font-weight:bold; color:#333; background:#e0f2fe; padding:10px 15px; border-radius:8px;">
                    <span><i class="fa-solid fa-users" style="color:#0284c7;"></i> <span id="cat-detalle-jugadores"></span></span>
                    <span><i class="fa-regular fa-clock" style="color:#0284c7;"></i> <span id="cat-detalle-duracion"></span></span>
                </div>
                <div style="margin-bottom:20px;"><h4 style="font-size:14px; color:#333; margin-bottom:10px;"><i class="fa-solid fa-puzzle-piece"></i> Componentes del Juego</h4><div id="cat-detalle-componentes" style="font-size:13px; color:#475569; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #64748b;"></div></div>
                <div style="margin-bottom:20px;"><h4 style="font-size:14px; color:#333; margin-bottom:10px;"><i class="fa-solid fa-scroll"></i> Reglas Básicas</h4><div id="cat-detalle-reglas" style="font-size:13px; color:#475569; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #64748b;"><p style="margin-bottom:8px;"><strong>Objetivo:</strong> <span id="cat-regla-objetivo"></span></p><p style="margin-bottom:8px;"><strong>Preparación:</strong> <span id="cat-regla-preparacion"></span></p><p><strong>Turno:</strong> <span id="cat-regla-turno"></span></p></div></div>
                <div style="margin-bottom:20px; border-left:4px solid #9a3412; padding-left:15px; background:#fff7ed; padding:10px 15px; border-radius:0 8px 8px 0;"><h4 style="font-size:14px; color:#9a3412; margin-bottom:10px;"><i class="fa-solid fa-hands-holding-circle"></i> Adaptación EP</h4><p id="cat-detalle-ep" style="font-size:13px; color:#333; line-height:1.5; font-style:italic;"></p></div>
                <div style="text-align:right;"><button id="cat-btn-cargar" class="btn btn-primary" style="padding:12px 24px; font-size:14px; box-shadow:0 4px 10px rgba(154,52,18,0.3);"><i class="fa-solid fa-wand-magic-sparkles"></i> Cargar Componentes</button></div>
            </div>`;
    }
}

function renderCatalogo(filtro = '') {
    asegurarModalCompleto();
    const contenedor = document.getElementById('catalogo-grid');
    if(!contenedor) return;
    contenedor.innerHTML = '';
    
    const filtroLower = filtro.toLowerCase();
    const juegosFiltrados = CATALOGO_JUEGOS.filter(j => 
        j.nombre.toLowerCase().includes(filtroLower) || 
        j.familia.toLowerCase().includes(filtroLower)
    );

    if (juegosFiltrados.length === 0) {
        contenedor.innerHTML = '<p style="font-size:12px; color:#64748b; text-align:center;">No se encontraron juegos.</p>';
        return;
    }

    juegosFiltrados.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'catalogo-card';
        card.onclick = () => abrirDetalleJuego(juego.id);
        card.innerHTML = `
            <div class="catalogo-icon" style="background:${juego.color}20; color:${juego.color};"><i class="${juego.icono}"></i></div>
            <div class="catalogo-info">
                <h4>${juego.nombre}</h4><p>${juego.familia}</p>
                <span class="catalogo-badge" style="background:${juego.color}; color:white;">${juego.jugadores}</span>
            </div>
            <div class="cargar-hover-btn"><i class="fa-solid fa-plus"></i> Cargar</div>
        `;
        contenedor.appendChild(card);
    });
}

function filtrarCatalogo(valor) {
    renderCatalogo(valor);
}

function abrirDetalleJuego(id) {
    const juego = CATALOGO_JUEGOS.find(j => j.id === id);
    if(!juego) return;
    const modal = document.getElementById('modal-catalogo');
    
    document.getElementById('cat-detalle-nombre').innerText = juego.nombre;
    document.getElementById('cat-detalle-familia').innerText = juego.familia;
    document.getElementById('cat-detalle-jugadores').innerText = juego.jugadores;
    document.getElementById('cat-detalle-duracion').innerText = juego.duracion;
    document.getElementById('cat-detalle-icono').className = juego.icono;
    document.getElementById('cat-detalle-icono').style.color = juego.color;
    document.getElementById('cat-detalle-icono').style.background = juego.color + '20';
    
    document.getElementById('cat-regla-objetivo').innerText = juego.reglas.objetivo;
    document.getElementById('cat-regla-preparacion').innerText = juego.reglas.preparacion;
    document.getElementById('cat-regla-turno').innerText = juego.reglas.turno;
    
    let epHtml = `<strong>${juego.adaptacion_ep.objetivo}</strong><ul style="margin-top:5px; padding-left:15px; font-style:normal;">`;
    juego.adaptacion_ep.preguntas.forEach(p => epHtml += `<li>${p}</li>`);
    epHtml += '</ul>';
    document.getElementById('cat-detalle-ep').innerHTML = epHtml;

    let compHtml = '<ul>';
    if(juego.componentes.tableros && juego.componentes.tableros.length > 0) juego.componentes.tableros.forEach(t => compHtml += `<li>${t.cantidad}x Tablero (${t.tipo})</li>`);
    if(juego.componentes.cartas && juego.componentes.cartas.length > 0) juego.componentes.cartas.forEach(c => compHtml += `<li>${c.cantidad}x Cartas (${c.tipo})</li>`);
    if(juego.componentes.tokens && juego.componentes.tokens.length > 0) juego.componentes.tokens.forEach(t => compHtml += `<li>${t.cantidad}x Fichas (${t.tipo})</li>`);
    compHtml += '</ul>';
    document.getElementById('cat-detalle-componentes').innerHTML = compHtml;
    
    document.getElementById('cat-btn-cargar').onclick = () => cargarComponentesJuego(id);
    modal.classList.add('active');
}

function cerrarDetalleJuego() { document.getElementById('modal-catalogo').classList.remove('active'); }

// ================= GENERACIÓN DE COMPONENTES =================
async function cargarComponentesJuego(id) {
    const juego = CATALOGO_JUEGOS.find(j => j.id === id);
    if(!juego) return;
    cerrarDetalleJuego();
    mostrarAnexoFacilitacion(juego);
    
    // MOSTRAR SKELETON LOADER (v35.0)
    if(typeof mostrarLoading === 'function') mostrarLoading(`Generando ${juego.nombre}`, "Por favor, espera...");
    
    // Pequeña pausa para que el DOM dibuje el loader antes de colapsar el hilo principal
    await new Promise(r => setTimeout(r, 100)); 
    
    const delay = ms => new Promise(r => setTimeout(r, 50));

    if(juego.componentes.tableros) { 
        for(let t of juego.componentes.tableros) { 
            for(let i=0; i<t.cantidad; i++) { 
                if(t.tipo === 'kingdomino' && typeof insertarLosetaKingdomino === 'function') insertarLosetaKingdomino();
                else if(t.tipo === 'hex' && typeof insertarLosetaHex === 'function') insertarLosetaHex(); 
                else if (t.tipo === 'loseta' && typeof insertarLosetaCarcassonne === 'function') insertarLosetaCarcassonne(); 
                else if (t.tipo === 'perimetro' && typeof insertarTableroJugador === 'function') insertarTableroJugador(); 
                await delay(50); 
            } 
        } 
    }
    if(juego.componentes.cartas) { 
        for(let c of juego.componentes.cartas) { 
            for(let i=0; i<c.cantidad; i++) { 
                if(c.tipo === 'wingspan' && typeof insertarCartaWingspan === 'function') insertarCartaWingspan();
                else if(c.tipo === 'munchkin' && typeof insertarCartaMunchkin === 'function') insertarCartaMunchkin();
                else if(c.tipo === 'jungle_speed' && typeof insertarCartaJungleSpeed === 'function') insertarCartaJungleSpeed();
                else if(c.tipo === 'coup' && typeof insertarCartaCoup === 'function') insertarCartaCoup();
                else if(c.tipo === 'recurso_catan' && typeof insertarCartaRecursoCatan === 'function') {
                    const recs = ['Madera', 'Ladrillo', 'Oveja', 'Trigo', 'Mineral'];
                    const rec = recs[i % recs.length];
                    insertarCartaRecursoCatan(rec, '#8B5A2B');
                }
                else if(c.tipo === 'tren_ticket' && typeof insertarCartaTrenTicket === 'function') {
                    const colores = ['#dc2626', '#2563eb', '#16a34a', '#eab308', '#1e293b', '#ffffff', '#f97316', '#a855f7'];
                    const col = colores[i % colores.length];
                    insertarCartaTrenTicket(col);
                }
                else if(c.tipo === 'boleto_ticket' && typeof insertarBoletoTicket === 'function') insertarBoletoTicket();
                else if(c.tipo === 'pandemic_ciudad' && typeof insertarCartaPandemic === 'function') insertarCartaPandemic('#dc2626');
                else if(c.tipo === 'pandemic_evento' && typeof insertarCartaEvento === 'function') insertarCartaEvento();
                else if(c.tipo === 'codenames' && typeof insertarCartaCodenames === 'function') insertarCartaCodenames();
                else if(c.tipo === 'naipe' && typeof insertarCartaNaipe === 'function') insertarCartaNaipe(); 
                else if (c.tipo === 'dixit' && typeof insertarCartaDixit === 'function') insertarCartaDixit(); 
                else if (c.tipo === 'uno' && typeof insertarCartaUno === 'function') insertarCartaUno(); 
                else if (c.tipo === 'evento' && typeof insertarCartaEvento === 'function') insertarCartaEvento(); 
                else if (c.tipo === 'virus' && typeof insertarCartaVirus === 'function') insertarCartaVirus(); 
                else if (c.tipo === 'sushi' && typeof insertarCartaSushi === 'function') insertarCartaSushi(); 
                else if (c.tipo === 'rol' && typeof insertarCartaRol === 'function') insertarCartaRol(); 
                await delay(50); 
            } 
        } 
    }
    if(juego.componentes.tokens) { 
        for(let t of juego.componentes.tokens) { 
            for(let i=0; i<t.cantidad; i++) { 
                if(t.tipo === 'meeple' && typeof insertarMeeple === 'function') insertarMeeple(); 
                else if (t.tipo === 'cuadrado' && typeof insertarCuboPandemic === 'function') insertarCuboPandemic(); 
                else if (typeof insertarGeneradorTokens === 'function') insertarGeneradorTokens(); 
                await delay(50); 
            } 
        } 
    }
    // OCULTAR SKELETON LOADER
    if(typeof ocultarLoading === 'function') ocultarLoading();
    showToast(`¡Materiales de ${juego.nombre} cargados!`, "success");
}

// ================= ANEXO DE FACILITACIÓN =================
function mostrarAnexoFacilitacion(juego) {
    document.getElementById('props-empty').style.display = 'none';
    document.getElementById('props-content').style.display = 'none';
    document.getElementById('props-actions').style.display = 'none';

    let anexo = document.getElementById('anexo-facilitacion');
    if(!anexo) {
        anexo = document.createElement('div');
        anexo.id = 'anexo-facilitacion';
        anexo.style.cssText = 'padding: 0 5px;';
        document.querySelector('.properties-panel div[style*="overflow-y"]').appendChild(anexo);
    }
    
    let epHtml = `<ul style="margin-top:5px; padding-left:20px; font-style:italic; color:#475569;">`;
    juego.adaptacion_ep.preguntas.forEach(p => epHtml += `<li style="margin-bottom:8px;">${p}</li>`);
    epHtml += '</ul>';

    anexo.innerHTML = `
        <h3 style="font-family:'Playfair Display'; color:#9a3412; border-bottom:2px solid #ffedd5; padding-bottom:10px; margin-bottom:15px;"><i class="fa-solid fa-clipboard-list"></i> Anexo de Facilitación</h3>
        <div style="background:#f8fafc; border-left:4px solid #64748b; padding:10px; margin-bottom:15px; border-radius:0 4px 4px 0;">
            <h4 style="font-size:13px; color:#1e293b; margin-bottom:5px;">Reglas de ${juego.nombre}</h4>
            <p style="font-size:12px; color:#475569; margin-bottom:5px;"><strong>Objetivo:</strong> ${juego.reglas.objetivo}</p>
            <p style="font-size:12px; color:#475569; margin-bottom:5px;"><strong>Preparación:</strong> ${juego.reglas.preparacion}</p>
            <p style="font-size:12px; color:#475569;"><strong>Turno:</strong> ${juego.reglas.turno}</p>
        </div>
        <div style="background:#fff7ed; border-left:4px solid #9a3412; padding:10px; border-radius:0 4px 4px 0;">
            <h4 style="font-size:13px; color:#9a3412; margin-bottom:5px;">Adaptación EP</h4>
            <p style="font-size:12px; color:#333; margin-bottom:10px;"><strong>${juego.adaptacion_ep.objetivo}</strong></p>
            <span style="font-size:11px; font-weight:bold; color:#9a3412; text-transform:uppercase;">Preguntas de Debriefing:</span>
            ${epHtml}
        </div>
        <button class="btn btn-outline" style="width:100%; margin-top:20px; font-size:11px;" onclick="document.getElementById('anexo-facilitacion').style.display='none'; document.getElementById('props-empty').style.display='block';"><i class="fa-solid fa-xmark"></i> Cerrar Anexo</button>
    `;
    anexo.style.display = 'block';
}