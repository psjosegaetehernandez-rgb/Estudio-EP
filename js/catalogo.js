// ================= CATÁLOGO MAESTRO v82.0 =================
const CATALOGO_JUEGOS = [
    {
        id: "uno", nombre: "UNO", familia: "Cartas / Combos", 
        jugadores: "2-10", duracion: "15 min", icono: "fa-solid fa-clone", color: "#dc2626",
        componentes: { tableros: [], cartas: [{ tipo: "uno", cantidad: 108 }], tokens: [] },
        reglas: { objetivo: "Quedarse sin cartas en la mano.", preparacion: "Se reparten 7 cartas a cada jugador.", turno: "Emparejar por color, número o símbolo. Usa cartas de acción." },
        adaptacion_ep: { objetivo: "Simula el flujo de poder y las alianzas.", preguntas: ["¿Quién tenía el poder en el juego?", "¿Cómo se sintieron cuando los bloquearon con un '+2'?"] }
    },
    {
        id: "dixit", nombre: "Dixit", familia: "Asociación / Narrativa", 
        jugadores: "3-8", duracion: "30 min", icono: "fa-solid fa-moon", color: "#4c1d95",
        componentes: { tableros: [{ tipo: "perimetro", cantidad: 1 }], cartas: [{ tipo: "dixit", cantidad: 84 }], tokens: [{ tipo: "meeple", cantidad: 8 }] },
        reglas: { objetivo: "Adivinar la carta del cuentacuentos.", preparacion: "Repartir cartas y dar los diales de votación.", turno: "El cuentacuentos da una pista. Los demás eligen una carta que encaje. Se vota en secreto." },
        adaptacion_ep: { objetivo: "Comunicación asertiva y empatía usando imágenes como metáfora.", preguntas: ["¿Por qué elegimos ciertas imágenes?", "¿Qué nos dicen de nuestra comunidad?"] }
    },
    {
        id: "carcassonne", nombre: "Carcassonne", familia: "Colocación de Losetas", 
        jugadores: "2-5", duracion: "45 min", icono: "fa-solid fa-map", color: "#15803d",
        componentes: { tableros: [{ tipo: "loseta", cantidad: 84 }], cartas: [], tokens: [{ tipo: "meeple", cantidad: 40 }] },
        reglas: { objetivo: "Formar un mapa medieval y desplegar meeples.", preparacion: "Colocar la loseta inicial. Repartir 7 meeples.", turno: "Robar loseta, colocarla conectando caminos/ciudades y desplegar meeple para puntuar." },
        adaptacion_ep: { objetivo: "Simula la construcción colectiva del territorio.", preguntas: ["¿Cómo construimos juntos el territorio?", "¿Qué partes de nuestra comunidad estamos priorizando?"] }
    },
    {
        id: "virus", nombre: "Virus!", familia: "Toma Eso / Gestión de Mano", 
        jugadores: "2-6", duracion: "20 min", icono: "fa-solid fa-virus", color: "#16a34a",
        componentes: { tableros: [], cartas: [{ tipo: "virus", cantidad: 68 }], tokens: [] },
        reglas: { objetivo: "Construir un cuerpo sano (4 órganos) mientras infectas o destruyes los rivales.", preparacion: "Barajar el mazo y repartir 3 cartas a cada jugador.", turno: "Robar una carta, jugar cartas para poner órganos o lanzar virus/medicinas a los rivales." },
        adaptacion_ep: { objetivo: "Visibilizar conflictos y dinámicas de poder.", preguntas: ["Los 'Órganos' son Derechos. Los 'Virus' son recortes. ¿Cómo defendemos lo público?"] }
    },
    {
        id: "sushi_go", nombre: "Sushi Go!", familia: "Drafting / Colección de Sets", 
        jugadores: "2-5", duracion: "15 min", icono: "fa-solid fa-utensils", color: "#f59e0b",
        componentes: { tableros: [], cartas: [{ tipo: "sushi", cantidad: 108 }], tokens: [] },
        reglas: { objetivo: "Formar el mejor menú de sushi y ganar puntos.", preparacion: "Barajar y repartir 10 cartas a cada jugador.", turno: "Elegir una carta, pasar el resto al jugador de la izquierda. Repetir hasta agotar." },
        adaptacion_ep: { objetivo: "Simula la priorización de recursos en un proyecto.", preguntas: ["En lugar de sushi, estas cartas son Recursos Comunitarios. ¿Cuál drafteaste primero y por qué?"] }
    },
    {
        id: "hombres_lobo", nombre: "Los Hombres Lobo", familia: "Roles Ocultos / Deducción", 
        jugadores: "8-18", duracion: "30 min", icono: "fa-solid fa-user-secret", color: "#1e293b",
        componentes: { tableros: [], cartas: [{ tipo: "rol", cantidad: 25 }], tokens: [] },
        reglas: { objetivo: "Los lobos deben eliminar aldeanos; los aldeanos deben descubrir a los lobos.", preparacion: "Repartir un rol secreto a cada jugador.", turno: "Fase nocturna (los lobos matan, la vidente investiga) y fase diurna (debate y linchamiento)." },
        adaptacion_ep: { objetivo: "Analizar rumores, silencios y confianza en la comunidad.", preguntas: ["¿Cómo identificamos a los 'Barras Bravas' o 'Intereses Creados' en una asamblea?"] }
    },
    // --- MANTENEMOS CATÁN Y PANDEMIC DE LA VERSIÓN ANTERIOR ---
    {
        id: "catan_base", nombre: "Colonos de Catán", familia: "Gestión de Recursos", jugadores: "3-4", duracion: "60-120 min", icono: "fa-solid fa-hexagon", color: "#9a3412",
        componentes: { tableros: [{ tipo: "hex", cantidad: 19 }], cartas: [{ tipo: "recurso_catan", cantidad: 95 }], tokens: [{ tipo: "circulo", cantidad: 60 }] },
        reglas: { objetivo: "Alcanzar 10 puntos de victoria.", preparacion: "Montar el tablero hexagonal y colocar poblados iniciales.", turno: "Tirar dados, producir recursos, comerciar y construir." },
        adaptacion_ep: { objetivo: "Simular la gestión de recursos comunitarios.", preguntas: ["¿Qué recursos fueron los más disputados?", "¿Cómo se relaciona con el acceso al agua o vivienda?"] }
    },
    {
        id: "pandemic", nombre: "Pandemic", familia: "Cooperativo", jugadores: "2-4", duracion: "45-60 min", icono: "fa-solid fa-virus-slash", color: "#dc2626",
        componentes: { tableros: [{ tipo: "perimetro", cantidad: 1 }], cartas: [{ tipo: "evento", cantidad: 15 }], tokens: [{ tipo: "circulo", cantidad: 24 }] },
        reglas: { objetivo: "Cooperar para erradicar enfermedades.", preparacion: "Colocar el tablero y repartir roles.", turno: "Realizar 4 acciones y luego robar e infectar ciudades." },
        adaptacion_ep: { objetivo: "Enseñar la acción colectiva frente a crisis.", preguntas: ["¿Qué pasa si cada uno juega por su lado?"] }
    }
];

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
                <div style="margin-bottom:20px;"><h4 style="font-size:14px; color:#333; margin-bottom:10px;"><i class="fa-solid fa-puzzle-piece"></i> Componentes</h4><div id="cat-detalle-componentes" style="font-size:13px; color:#475569; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #64748b;"></div></div>
                <div style="margin-bottom:20px;"><h4 style="font-size:14px; color:#333; margin-bottom:10px;"><i class="fa-solid fa-scroll"></i> Reglas Básicas</h4><div id="cat-detalle-reglas" style="font-size:13px; color:#475569; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #64748b;"><p style="margin-bottom:8px;"><strong>Objetivo:</strong> <span id="cat-regla-objetivo"></span></p><p style="margin-bottom:8px;"><strong>Preparación:</strong> <span id="cat-regla-preparacion"></span></p><p><strong>Turno:</strong> <span id="cat-regla-turno"></span></p></div></div>
                <div style="margin-bottom:20px; border-left:4px solid #9a3412; padding-left:15px; background:#fff7ed; padding:10px 15px; border-radius:0 8px 8px 0;"><h4 style="font-size:14px; color:#9a3412; margin-bottom:10px;"><i class="fa-solid fa-hands-holding-circle"></i> Adaptación EP</h4><p id="cat-detalle-ep" style="font-size:13px; color:#333; line-height:1.5; font-style:italic;"></p></div>
                <div style="text-align:right;"><button id="cat-btn-cargar" class="btn btn-primary" style="padding:12px 24px; font-size:14px; box-shadow:0 4px 10px rgba(154,52,18,0.3);"><i class="fa-solid fa-wand-magic-sparkles"></i> Cargar Componentes</button></div>
            </div>`;
    }
}

function renderCatalogo() {
    asegurarModalCompleto();
    const contenedor = document.getElementById('catalogo-grid');
    if(!contenedor) return;
    contenedor.innerHTML = '';
    CATALOGO_JUEGOS.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'catalogo-card';
        card.onclick = () => abrirDetalleJuego(juego.id);
        card.innerHTML = `<div class="catalogo-icon" style="background:${juego.color}20; color:${juego.color};"><i class="${juego.icono}"></i></div><div class="catalogo-info"><h4>${juego.nombre}</h4><p>${juego.familia}</p><span class="catalogo-badge" style="background:${juego.color}; color:white;">${juego.jugadores}</span></div>`;
        contenedor.appendChild(card);
    });
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
    if(juego.componentes.tableros) juego.componentes.tableros.forEach(t => compHtml += `<li>${t.cantidad}x Tablero/Loseta (${t.tipo})</li>`);
    if(juego.componentes.cartas) juego.componentes.cartas.forEach(c => compHtml += `<li>${c.cantidad}x Cartas (${c.tipo})</li>`);
    if(juego.componentes.tokens) juego.componentes.tokens.forEach(t => compHtml += `<li>${t.cantidad}x Fichas (${t.tipo})</li>`);
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
    showToast(`Preparando ${juego.nombre}...`, "info");
    
    const delay = ms => new Promise(r => setTimeout(r, 50));

    if(juego.componentes.tableros) { 
        for(let t of juego.componentes.tableros) { 
            for(let i=0; i<t.cantidad; i++) { 
                if(t.tipo === 'hex' && typeof insertarLosetaHex === 'function') insertarLosetaHex(); 
                else if (t.tipo === 'loseta' && typeof insertarLosetaCarcassonne === 'function') insertarLosetaCarcassonne(); 
                else if (t.tipo === 'perimetro' && typeof insertarTableroJugador === 'function') insertarTableroJugador(); 
                await delay(50); 
            } 
        } 
    }
    if(juego.componentes.cartas) { 
        for(let c of juego.componentes.cartas) { 
            for(let i=0; i<c.cantidad; i++) { 
                if(c.tipo === 'naipe' && typeof insertarCartaNaipe === 'function') insertarCartaNaipe(); 
                else if (c.tipo === 'dixit' && typeof insertarCartaDixit === 'function') insertarCartaDixit(); 
                else if (c.tipo === 'uno' && typeof insertarCartaUno === 'function') insertarCartaUno(); 
                else if (c.tipo === 'evento' && typeof insertarCartaEvento === 'function') insertarCartaEvento(); 
                else if (c.tipo === 'virus' && typeof insertarCartaVirus === 'function') insertarCartaVirus(); 
                else if (c.tipo === 'sushi' && typeof insertarCartaSushi === 'function') insertarCartaSushi(); 
                else if (c.tipo === 'rol' && typeof insertarCartaRol === 'function') insertarCartaRol(); 
                else if (c.tipo === 'recurso_catan' && typeof insertarCartaNaipe === 'function') insertarCartaNaipe(); 
                await delay(50); 
            } 
        } 
    }
    if(juego.componentes.tokens) { 
        for(let t of juego.componentes.tokens) { 
            for(let i=0; i<t.cantidad; i++) { 
                if(t.tipo === 'meeple' && typeof insertarMeeple === 'function') insertarMeeple(); 
                else if (typeof insertarGeneradorTokens === 'function') insertarGeneradorTokens(); 
                await delay(50); 
            } 
        } 
    }
    showToast(`¡Materiales cargados!`, "success");
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