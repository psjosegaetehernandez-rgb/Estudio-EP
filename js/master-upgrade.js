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

// ================= CONSOLA DEL GAME MASTER (v38.0) =================
function insertarConsolaGM() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div style="background: #1e293b; color: white; border-radius: 12px; width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 2px solid #334155; overflow: hidden; font-family: 'Inter';">
            <div style="background: #0f172a; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155;">
                <span style="font-weight: bold; color: #e2e8f0;"><i class="fa-solid fa-gamepad"></i> Game Master</span>
                <span style="font-size: 12px; color: #4ade80;"><i class="fa-solid fa-circle" style="font-size:8px;"></i> EN VIVO</span>
            </div>
            
            <!-- Turno -->
            <div style="padding: 10px 15px; background: #334155; text-align: center; border-bottom: 1px solid #475569;">
                <span style="font-size: 12px; color: #94a3b8;">Turno Actual:</span> <span id="gm-turno-display" style="font-size: 18px; font-weight: bold; color: #fbbf24;">1</span>
            </div>

            <!-- Jugadores -->
            <div style="padding: 15px; display: flex; flex-direction: column; gap: 10px;">
                <!-- Jugador 1 -->
                <div style="display:flex; align-items:center; gap:10px; background:#1e293b; padding:8px; border-radius:8px; border:1px solid #334155;">
                    <input type="text" value="Vecino A" style="flex:1; background:transparent; border:none; color:white; font-weight:bold; outline:none;" contenteditable="true">
                    <button onclick="gmModificarPuntos(this, -1)" style="background:#dc2626; border:none; color:white; width:24px; height:24px; border-radius:4px; cursor:pointer;">-</button>
                    <span class="gm-puntos" style="font-weight:bold; color:#4ade80; width:30px; text-align:center;">0</span>
                    <button onclick="gmModificarPuntos(this, 1)" style="background:#16a34a; border:none; color:white; width:24px; height:24px; border-radius:4px; cursor:pointer;">+</button>
                </div>
                <!-- Jugador 2 -->
                <div style="display:flex; align-items:center; gap:10px; background:#1e293b; padding:8px; border-radius:8px; border:1px solid #334155;">
                    <input type="text" value="Vecino B" style="flex:1; background:transparent; border:none; color:white; font-weight:bold; outline:none;" contenteditable="true">
                    <button onclick="gmModificarPuntos(this, -1)" style="background:#dc2626; border:none; color:white; width:24px; height:24px; border-radius:4px; cursor:pointer;">-</button>
                    <span class="gm-puntos" style="font-weight:bold; color:#4ade80; width:30px; text-align:center;">0</span>
                    <button onclick="gmModificarPuntos(this, 1)" style="background:#16a34a; border:none; color:white; width:24px; height:24px; border-radius:4px; cursor:pointer;">+</button>
                </div>
            </div>

            <!-- Acciones -->
            <div style="padding: 0 15px 15px 15px; display: flex; gap: 10px;">
                <button onclick="gmSiguienteTurno(this)" style="flex: 1; background: #0284c7; border: none; padding: 10px; border-radius: 6px; color: white; font-weight: bold; cursor: pointer;"><i class="fa-solid fa-arrow-right"></i> Siguiente</button>
                <button onclick="gmLanzarDado(this)" style="flex: 1; background: #ca8a04; border: none; padding: 10px; border-radius: 6px; color: white; font-weight: bold; cursor: pointer;"><i class="fa-solid fa-dice"></i> Dado</button>
            </div>

            <!-- Resultado Dado -->
            <div id="gm-dado-result" style="text-align:center; font-size:24px; font-weight:bold; color:#fbbf24; height:30px; display:none;">-</div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    if(typeof showToast === 'function') showToast("Consola GM insertada", "success");
}

function gmModificarPuntos(btn, cambio) {
    const span = btn.parentElement.querySelector('.gm-puntos');
    let val = parseInt(span.innerText) || 0;
    val += cambio;
    if(val < 0) val = 0;
    span.innerText = val;
    if(typeof playSound === 'function') playSound('pop');
    if(typeof autosave === 'function') autosave();
}

function gmSiguienteTurno(btn) {
    const display = btn.closest('div').parentElement.querySelector('#gm-turno-display');
    let turno = parseInt(display.innerText) || 1;
    display.innerText = turno + 1;
    if(typeof playSound === 'function') playSound('pop');
    if(typeof autosave === 'function') autosave();
}

function gmLanzarDado(btn) {
    const resultDiv = btn.closest('div').parentElement.querySelector('#gm-dado-result');
    resultDiv.style.display = 'block';
    resultDiv.innerText = "...";
    
    if(typeof playSound === 'function') playSound('dice');
    
    setTimeout(() => {
        const num = Math.floor(Math.random() * 6) + 1;
        resultDiv.innerText = `🎲 ${num}`;
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