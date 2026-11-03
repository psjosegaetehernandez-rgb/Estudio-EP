// ================= SALTO CUALITATIVO v111.0 =================

// ---- 1. MATRIZ DE PRIORIZACIÓN DINÁMICA ----
function insertarMatrizDinamica() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="matrix-container">
            <div class="matrix-header">Matriz de Priorización</div>
            <table class="matrix-table" id="tabla-matriz-${Date.now()}">
                <thead>
                    <tr><th>Problema</th><th>Gravedad</th><th>Frecuencia</th><th>Preocupación</th><th>Total</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td contenteditable="true">Problema 1</td>
                        <td contenteditable="true" oninput="recalcularFila(this)">5</td>
                        <td contenteditable="true" oninput="recalcularFila(this)">4</td>
                        <td contenteditable="true" oninput="recalcularFila(this)">5</td>
                        <td class="matrix-total">14</td>
                    </tr>
                </tbody>
            </table>
            <button class="matrix-btn-add" onclick="agregarFilaMatriz(this)"><i class="fa-solid fa-plus"></i> Añadir Problema</button>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Matriz Dinámica insertada", "success");
}

function recalcularFila(celda) {
    const fila = celda.closest('tr');
    const celdas = fila.querySelectorAll('td');
    let suma = 0;
    // Sumar gravedad (1), frecuencia (2), preocupación (3)
    for(let i = 1; i <= 3; i++) {
        let val = parseInt(celdas[i].innerText) || 0;
        suma += val;
    }
    celdas[4].innerText = suma;
    if(typeof autosave === 'function') autosave();
}

function agregarFilaMatriz(btn) {
    const tbody = btn.closest('.matrix-container').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td contenteditable="true">Nuevo Problema</td>
        <td contenteditable="true" oninput="recalcularFila(this)">0</td>
        <td contenteditable="true" oninput="recalcularFila(this)">0</td>
        <td contenteditable="true" oninput="recalcularFila(this)">0</td>
        <td class="matrix-total">0</td>
    `;
    tbody.appendChild(tr);
    if(typeof autosave === 'function') autosave();
}

// ---- 2. CONSOLA DEL GAME MASTER ----
function insertarConsolaGM() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (300 + (count * 20) % 200) + 'px'; wrapper.style.top = (100 + (count * 20) % 200) + 'px';
    
    wrapper.innerHTML = `
        <div class="gm-console">
            <div class="gm-header"><span><i class="fa-solid fa-gamepad"></i> Consola GM</span> <span style="color:#4ade80; font-size:12px;">ONLINE</span></div>
            <div class="gm-body">
                <div class="gm-player-row"><input type="text" value="Jugador 1"><input type="number" value="0"></div>
                <div class="gm-player-row"><input type="text" value="Jugador 2"><input type="number" value="0"></div>
                <div class="gm-player-row"><input type="text" value="Jugador 3"><input type="number" value="0"></div>
                <div class="gm-dice-area">
                    <button class="gm-dice-btn" onclick="lanzarDadoGM(this)">Lanzar Dado (D6)</button>
                    <div class="gm-dice-result">-</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Consola GM insertada", "success");
}

function lanzarDadoGM(btn) {
    const resultDiv = btn.closest('.gm-body').querySelector('.gm-dice-result');
    resultDiv.innerText = "...";
    if(typeof playSound === 'function') playSound('dice');
    
    setTimeout(() => {
        const num = Math.floor(Math.random() * 6) + 1;
        resultDiv.innerText = num;
        if(typeof playSound === 'function') playSound('pop');
    }, 300);
}

// ---- 3. MAPA CON PINES INTERACTIVOS ----
function insertarPinMapa(x, y) {
    const canvas = document.getElementById('canvas');
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = x + 'px';
    wrapper.style.top = y + 'px';
    
    wrapper.innerHTML = `
        <div class="mapa-pin" onclick="abrirTooltipPin(this)"></div>
        <div class="pin-tooltip">Punto Crítico</div>
    `;
    canvas.appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
}

function abrirTooltipPin(pin) {
    const tooltip = pin.nextElementSibling;
    const textoActual = tooltip.innerText;
    const nuevoTexto = prompt("Describe este punto crítico o actor social:", textoActual);
    if(nuevoTexto !== null && nuevoTexto.trim() !== "") {
        tooltip.innerText = nuevoTexto;
        if(typeof autosave === 'function') autosave();
    }
}

// ---- 4. AÑADIR JUEGO PERSONALIZADO AL CATÁLOGO ----
function abrirModalNuevoJuego() {
    const nombre = prompt("Nombre del nuevo juego:");
    if(!nombre) return;
    const familia = prompt("Familia/Mecánica (Ej: Cartas, Cooperativo):");
    if(!familia) return;
    
    // Generar un juego base
    const id = 'custom_' + Date.now();
    const nuevoJuego = {
        id: id, nombre: nombre, familia: familia, 
        jugadores: "2-4", duracion: "Variable", 
        icono: "fa-solid fa-star", color: "#8B3A3A",
        componentes: { 
            tableros: [{ tipo: "doc-element", cantidad: 1 }], 
            cartas: [{ tipo: "naipe", cantidad: 10 }], 
            tokens: [{ tipo: "circulo", cantidad: 10 }] 
        },
        reglas: { 
            objetivo: "Objetivo personalizado.", 
            preparacion: "Preparación personalizada.", 
            turno: "Turno personalizado." 
        },
        adaptacion_ep: { 
            objetivo: "Adaptación EP personalizada.", 
            preguntas: ["¿Cómo aplicamos esto en la comunidad?"] 
        }
    };
    
    // Inyectar en el catálogo global (si existe)
    if(typeof CATALOGO_JUEGOS !== 'undefined') {
        CATALOGO_JUEGOS.push(nuevoJuego);
        if(typeof renderCatalogo === 'function') renderCatalogo();
        if(typeof showToast === 'function') showToast(`Juego "${nombre}" añadido al Catálogo`, "success");
    } else {
        alert("Error: No se encontró la base de datos del catálogo.");
    }
}