function switchTool(tool, btn) {
    document.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tool-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('tool-' + tool).classList.add('active');
    btn.classList.add('active');
}

function insertarCarta(data = null, notify = true) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const id = data ? data.id : 'carta_' + Date.now();
    const x = data ? data.x : '50px'; const y = data ? data.y : '50px';
    const texto = data ? data.texto : 'Escribe aquí la pregunta...';
    const instrucciones = data ? data.instrucciones : 'Instrucciones...';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.id = id; wrapper.style.left = x; wrapper.style.top = y;

    wrapper.innerHTML = `
        <div class="carta-container ${data && data.volteada ? 'flipped' : ''}">
            <div class="carta-inner">
                <div class="carta-front border-freire">
                    <div class="carta-icono"><i class="fa-solid fa-comments"></i></div>
                    <div class="carta-texto">${texto}</div>
                    <div class="carta-footer">PREGUNTA</div>
                </div>
                <div class="carta-back">
                    <div class="guia-header">⚙️ Guía Facilitador</div>
                    <div class="guia-contenido"><p class="dato-instrucciones">${instrucciones}</p></div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    if(notify) showToast("Carta insertada", "success");
}

function insertarCartaNaipe() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const id = 'naipe_' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.id = id; wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.innerHTML = `
        <div class="carta-naipe palo-negro" data-palo="trebol">
            <div class="naipe-esquina naipe-sup"><span class="naipe-num">A</span><span class="naipe-palo">♣</span></div>
            <div class="naipe-centro"><h3 contenteditable="true">Análisis de contexto</h3></div>
            <div class="naipe-esquina naipe-inf"><span class="naipe-num">A</span><span class="naipe-palo">♣</span></div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta Naipe insertada", "success");
}

function insertarCartaDuo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const id = 'duo_' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.id = id; wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.innerHTML = `
        <div class="carta-duo">
            <strong contenteditable="true">No hay mal que dure cien años</strong>
            <div class="duo-instruccion">Busca tu otra mitad</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta Duo insertada", "success");
}

function insertarCuboNet() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const widget = document.createElement('div');
    widget.className = 'doc-element widget-cubo';
    widget.style.left = '150px'; widget.style.top = '100px';
    widget.innerHTML = `
        <div class="cubo-grid">
            <div></div><div class="cubo-cara cut-top cut-left cut-right" contenteditable="true" style="background:#fef3c7;">Cara 1</div><div></div><div></div>
            <div class="cubo-cara cut-left cut-bottom" contenteditable="true" style="background:#dcfce7;">Cara 2</div>
            <div class="cubo-cara fold-left fold-right fold-bottom" contenteditable="true" style="background:#e0f2fe;">Cara 3</div>
            <div class="cubo-cara cut-right cut-bottom" contenteditable="true" style="background:#fce7f3;">Cara 4</div>
            <div class="cubo-cara cut-right cut-bottom" contenteditable="true" style="background:#f3e8ff;">Cara 5</div>
            <div></div><div class="cubo-cara cut-bottom cut-left cut-right" contenteditable="true" style="background:#fef2f2;">Cara 6</div><div></div><div></div>
            <div class="cubo-pestana pestana-top">Pegar</div><div class="cubo-pestana pestana-bottom">Pegar</div>
            <div class="cubo-pestana pestana-left">Pegar</div><div class="cubo-pestana pestana-right">Pegar</div>
        </div>`;
    document.getElementById('canvas').appendChild(widget);
    hacerArrastrable(widget);
    showToast("Cubo insertado", "success");
}

function insertarMatrizPriorizacion() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px'; wrapper.style.width = '650px';
    wrapper.innerHTML = `
        <div class="tabla-dinamica" style="background:white; padding:15px; border-radius:8px;">
            <table style="width:100%; border-collapse:collapse;" id="matriz-priorizacion">
                <thead>
                    <tr><th>Problema</th><th style="width:100px;">Gravedad</th><th style="width:100px;">Frecuencia</th><th style="width:100px;">Preocupación</th><th style="width:100px;">Puntaje Total</th></tr>
                </thead>
                <tbody>
                    <tr><td contenteditable="true">Infecciones respiratorias</td><td contenteditable="true" class="puntaje-criterio">5</td><td contenteditable="true" class="puntaje-criterio">4</td><td contenteditable="true" class="puntaje-criterio">5</td><td class="puntaje-total">14</td></tr>
                </tbody>
            </table>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    activarCalculoMatriz();
    showToast("Matriz insertada", "success");
}

function activarCalculoMatriz() {
    document.querySelectorAll('.puntaje-criterio').forEach(celda => {
        celda.addEventListener('input', function() {
            let fila = this.closest('tr');
            let celdas = fila.querySelectorAll('.puntaje-criterio');
            let totalCelda = fila.querySelector('.puntaje-total');
            let suma = 0;
            celdas.forEach(c => { suma += parseInt(c.innerText) || 0; });
            totalCelda.innerText = suma;
            if(suma >= 14) totalCelda.classList.add('puntaje-alto');
            else totalCelda.classList.remove('puntaje-alto');
        });
    });
}



// =====================================================================
// 2. ACTUALIZAR: PLANIFICADOR DE SESIÓN
// =====================================================================


// =====================================================================
// 3. ACTUALIZAR: PRESUPUESTO PARTICIPATIVO
// =====================================================================
function insertarPresupuesto() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px'; wrapper.style.width = '750px';
    
    wrapper.innerHTML = `
        <div class="tabla-dinamica" style="background:white; padding:15px; border-radius:8px;">
            <h3 style="font-family:'Playfair Display'; margin-bottom:10px; color:#15803d;">Asignación de Presupuesto</h3>
            <p style="font-size:12px; margin-bottom:10px;">Presupuesto Total Disponible: <strong contenteditable="true" id="presupuesto-base" oninput="recalcularPresupuesto(this)">$1000</strong></p>
            <table style="width:100%; border-collapse:collapse;" id="tabla-presupuesto">
                <thead>
                    <tr>
                        <th>Propuesta Comunitaria</th>
                        <th style="width:80px;">Votos</th>
                        <th style="width:120px;">Costo ($)</th>
                        <th style="width:40px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td contenteditable="true">Jornada de limpieza</td>
                        <td contenteditable="true" class="votos-celda">15</td>
                        <td contenteditable="true" class="costo-celda" oninput="recalcularPresupuesto()">300</td>
                        <td style="text-align:center;"><button onclick="eliminarFila(this)" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align:right; font-weight:bold;">Total Asignado:</td>
                        <td id="presupuesto-gastado" style="font-weight:bold; text-align:right;">300</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:right; font-weight:bold;">Saldo Restante:</td>
                        <td id="presupuesto-restante" class="presupuesto-total">700</td>
                    </tr>
                </tfoot>
            </table>
            <button class="btn btn-outline" style="margin-top:10px; width:auto; font-size:12px;" onclick="agregarFilaPresupuesto(this)">+ Añadir Propuesta</button>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Presupuesto insertado", "success");
}

function agregarFilaPresupuesto(btn) {
    const tbody = btn.closest('.tabla-dinamica').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td contenteditable="true">Nueva Propuesta</td>
        <td contenteditable="true" class="votos-celda">0</td>
        <td contenteditable="true" class="costo-celda" oninput="recalcularPresupuesto()">0</td>
        <td style="text-align:center;"><button onclick="eliminarFila(this)" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
    recalcularPresupuesto();
}

function recalcularPresupuesto() {
    const baseEl = document.getElementById('presupuesto-base');
    if(!baseEl) return;
    const base = parseInt(baseEl.innerText.replace(/[^0-9]/g, '')) || 0;
    
    let gastado = 0;
    document.querySelectorAll('.costo-celda').forEach(celda => {
        gastado += parseInt(celda.innerText) || 0;
    });
    
    const restante = base - gastado;
    const elGastado = document.getElementById('presupuesto-gastado');
    const elRestante = document.getElementById('presupuesto-restante');
    
    if(elGastado) elGastado.innerText = gastado;
    if(elRestante) {
        elRestante.innerText = restante;
        if(restante < 0) {
            elRestante.classList.add('presupuesto-alerta');
            elRestante.classList.remove('presupuesto-total');
        } else {
            elRestante.classList.remove('presupuesto-alerta');
            elRestante.classList.add('presupuesto-total');
        }
    }
    if(typeof autosave === 'function') autosave();
}

// =====================================================================
// 4. FUNCIÓN MAESTRA PARA ELIMINAR FILA
// =====================================================================
function eliminarFila(btn) {
    const tr = btn.closest('tr');
    const tabla = tr.closest('table');
    
    // Si es la tabla de presupuesto, recalcular después de borrar
    if(tabla.id === 'tabla-presupuesto') {
        tr.remove();
        recalcularPresupuesto();
    } else {
        tr.remove();
    }
    if(typeof autosave === 'function') autosave();
}
// ================= FÁBRICA DE JUEGOS =================

function insertarTableroGrid() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px';
    
    let gridHTML = '<div class="tablero-grid">';
    // Generar 100 casillas (10x10)
    for(let i = 1; i <= 100; i++) {
        gridHTML += `<div class="casilla-tablero" contenteditable="true">${i}</div>`;
    }
    gridHTML += '</div>';
    
    wrapper.innerHTML = gridHTML;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Tablero de Cuadrícula insertado (100 casillas)", "success");
}

function insertarCartaUno() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'UNO');
    wrapper.innerHTML = `
        <div class="carta-uno">
            <div class="carta-uno-ovalo"></div>
            <div class="carta-uno-texto" contenteditable="true">+2</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta UNO insertada (Doble clic para editar)", "success");
}

function insertarCartaEvento() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '250px'; wrapper.style.top = '250px';
    
    wrapper.innerHTML = `
        <div class="carta-evento">
            <div class="carta-evento-header">¡Evento Inesperado!</div>
            <div class="carta-evento-texto">Una tormenta azota la comunidad. ¿Cómo se organizan para ayudar a los afectados?</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-evento-texto');
    showToast("Carta de Evento insertada", "success");
}

function insertarFichas() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.style.display = 'flex';
    wrapper.style.flexWrap = 'wrap';
    wrapper.style.gap = '10px';
    wrapper.style.width = '300px';
    
    let fichasHTML = '';
    // Generar 10 fichas en una hoja para imprimir
    for(let i = 0; i < 10; i++) {
        fichasHTML += `<div class="ficha-token" contenteditable="true">${i+1}</div>`;
    }
    
    wrapper.innerHTML = fichasHTML;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Hoja de Fichas insertada", "success");
}

function insertarDadoNet() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '200px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="dado-net">
            <div class="dado-cara dado-cara-1">⚀</div>
            <div class="dado-cara dado-cara-2">⚁</div>
            <div class="dado-cara dado-cara-3">⚂</div>
            <div class="dado-cara dado-cara-4">⚃</div>
            <div class="dado-cara dado-cara-5">⚄</div>
            <div class="dado-cara dado-cara-6">⚅</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Dado Recortable insertado", "success");
}
// ================= CARTAS DE ROL OCULTO =================
function insertarCartaRol() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '150px';
    
    wrapper.innerHTML = `
        <div class="carta-rol">
            <div class="carta-rol-texto" contenteditable="true">Eres el Líder Comunitario.<br><span style="font-size:14px; opacity:0.7;">(No reveles tu rol)</span></div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta de Rol insertada", "success");
}

// ================= ROMPECABEZAS =================
function insertarRompecabezas() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    let piezas = '';
    for(let i=0; i<9; i++) {
        piezas += `<div class="puzzle-piece" ondragover="event.preventDefault()" ondrop="soltarImagenEnPieza(event, this)"></div>`;
    }
    
    wrapper.innerHTML = `<div class="puzzle-box">${piezas}</div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Rompecabezas 3x3 insertado. Suelta una imagen en él.", "success");
}

// Extensión de la función para soltar imágenes dentro de las piezas del rompecabezas
function soltarImagenEnPieza(event, pieza) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0 && files[0].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Aplicar la imagen a TODAS las piezas del rompecabezas para que encaje perfecto
            const puzzleBox = pieza.closest('.puzzle-box');
            puzzleBox.querySelectorAll('.puzzle-piece').forEach(p => {
                p.innerHTML = `<img src="${e.target.result}" alt="Puzzle">`;
                // Usamos background-position para que cada pieza muestre su parte de la imagen
                const index = Array.from(puzzleBox.children).indexOf(p);
                const row = Math.floor(index / 3);
                const col = index % 3;
                p.style.backgroundImage = `url(${e.target.result})`;
                p.style.backgroundSize = '300% 300%'; // 3x3
                p.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
                p.innerHTML = ''; // Quitar la etiqueta img para usar background
            });
            showToast("Imagen insertada en el rompecabezas", "success");
            if(typeof autosave === 'function') autosave();
        };
        reader.readAsDataURL(files[0]);
    }
}
// ================= NUEVOS MOTORES DE JUEGO =================

function insertarCartaAtaque() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="carta-ataque">
            <div class="carta-ataque-num" contenteditable="true">-3</div>
            <div class="carta-ataque-texto" contenteditable="true">Recorte de presupuesto a la salud pública.</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta de Ataque insertada", "success");
}

function insertarRastreadorCoop() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="tracker-coop">
            <h4 contenteditable="true">Amenaza: Brote Epidémico</h4>
            <div class="tracker-barra">
                <div class="tracker-progreso" style="width: 60%;"></div>
                <div class="tracker-texto-abs">60% de Avance</div>
            </div>
            <div style="display:flex; gap:5px; margin-top:10px;">
                <button class="btn btn-outline" style="flex:1; font-size:11px;" onclick="moverTracker(this, -10)">- Avanza Problema</button>
                <button class="btn btn-primary" style="flex:1; font-size:11px; background:#15803d;" onclick="moverTracker(this, 10)">+ Retrocede Problema</button>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Rastreador Co-op insertado", "success");
}

function moverTracker(btn, cambio) {
    const barra = btn.closest('.tracker-coop').querySelector('.tracker-progreso');
    const texto = btn.closest('.tracker-coop').querySelector('.tracker-texto-abs');
    let actual = parseInt(barra.style.width) || 0;
    actual += cambio;
    if(actual < 0) actual = 0;
    if(actual > 100) actual = 100;
    barra.style.width = actual + '%';
    texto.innerText = actual + '% de Avance';
    if(actual >= 80) barra.style.background = '#dc2626';
    else barra.style.background = '#15803d';
}

function insertarMercadoDeckBuilding() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px'; wrapper.style.width = '600px';
    
    wrapper.innerHTML = `
        <div style="background:white; padding:15px; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h3 style="font-family:'Playfair Display'; margin-bottom:10px; color:#ca8a04;">Mercado Social (Deck-Building)</h3>
            <table class="mercado-deck">
                <thead>
                    <tr>
                        <th>Carta / Recurso</th>
                        <th style="width:80px;">Costo</th>
                        <th>Efecto / Beneficio</th>
                        <th style="width:40px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td contenteditable="true">Cooperativa Agrícola</td>
                        <td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">3</td>
                        <td contenteditable="true">+2 Recursos por turno</td>
                        <td style="text-align:center;"><button onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                    <tr>
                        <td contenteditable="true">Trueque Comunitario</td>
                        <td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">1</td>
                        <td contenteditable="true">Intercambia 1 carta con otro jugador</td>
                        <td style="text-align:center;"><button onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-outline" style="margin-top:10px; font-size:12px;" onclick="agregarFilaMercado(this)">+ Añadir Carta al Mercado</button>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Mercado Deck-Building insertado", "success");
}

function agregarFilaMercado(btn) {
    const tbody = btn.closest('div').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td contenteditable="true">Nueva Carta</td>
        <td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">1</td>
        <td contenteditable="true">Efecto...</td>
        <td style="text-align:center;"><button onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}
// ================= NUEVOS MOTORES NARRATIVOS (v13.0) =================







function insertarDiarioCampana() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="diario-campana">
            <h4>Diario de Campaña - Sesión 1</h4>
            <p style="font-size:11px; color:#666; margin-bottom:10px;">Anota los cambios en el "mundo" para la próxima partida.</p>
            <textarea placeholder="Ej: La comunidad perdió -1 de confianza, pero ganó acceso al centro de salud..."></textarea>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Diario de Campaña insertado", "success");
}
// ================= NUEVO: ASISTENTE DE REGLAS =================


// B. Modificar la función insertarPlanificador (Reemplazo de la Metodología por un select)
function insertarPlanificador() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px'; wrapper.style.width = '850px';
    
    wrapper.innerHTML = `
        <div class="tabla-dinamica" style="background:white; padding:15px; border-radius:8px;">
            <table style="width:100%; border-collapse:collapse;" id="tabla-planificador">
                <thead>
                    <tr>
                        <th style="width:70px;">Tiempo</th>
                        <th style="width:150px;">Contenido</th>
                        <th style="width:200px;">Técnica / Motor de Juego</th>
                        <th>Descripción de la Actividad</th>
                        <th style="width:40px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td contenteditable="true">09:00</td>
                        <td contenteditable="true">Bienvenida</td>
                        <td>
                            <select style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:12px;">
                                <option>Ninguna</option>
                                <option>Carta UNO</option>
                                <option>Tablero Grid</option>
                                <option>Carta Conversacional</option>
                                <option>Carta de Memoria</option>
                                <option>Carta de Dilema</option>
                                <option>Rastreador Co-op</option>
                                <option>Mercado Deck-building</option>
                            </select>
                        </td>
                        <td contenteditable="true">Presentación y encuadre del taller.</td>
                        <td style="text-align:center;"><button onclick="eliminarFila(this)" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-outline" style="margin-top:10px; width:auto; font-size:12px;" onclick="agregarFilaPlanificador(this)">+ Añadir Momento</button>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Planificador vinculado a los juegos", "success");
}

function agregarFilaPlanificador(btn) {
    const tbody = btn.closest('.tabla-dinamica').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td contenteditable="true">10:00</td>
        <td contenteditable="true">Nuevo Momento</td>
        <td>
            <select style="width:100%; padding:4px; border:1px solid #ccc; border-radius:4px; font-size:12px;">
                <option>Ninguna</option>
                <option>Carta UNO</option>
                <option>Tablero Grid</option>
                <option>Carta Conversacional</option>
                <option>Carta de Memoria</option>
                <option>Carta de Dilema</option>
                <option>Rastreador Co-op</option>
                <option>Mercado Deck-building</option>
            </select>
        </td>
        <td contenteditable="true">Descripción de la actividad...</td>
        <td style="text-align:center;"><button onclick="eliminarFila(this)" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}
// Helper para hacer cualquier elemento editable con doble clic (para que se pueda arrastrar)
function habilitarEdicionDobleClic(wrapper, selectores) {
    wrapper.querySelectorAll(selectores).forEach(el => {
        el.setAttribute('contenteditable', 'false');
        el.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            el.setAttribute('contenteditable', 'true');
            el.focus();
            document.execCommand('selectAll', false, null);
        });
        el.addEventListener('blur', () => {
            el.setAttribute('contenteditable', 'false');
            if(typeof autosave === 'function') autosave();
        });
    });
}
// ================= MOTORES DE EXPRESIÓN Y RAPIDEZ (v14.0) =================







function insertarHojaRollWrite() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="hoja-roll-write">
            <div class="hoja-roll-write-texto" contenteditable="false">Instrucciones: Dibuja rutas para conectar los puntos.</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.hoja-roll-write-texto');
    showToast("Hoja Roll & Write insertada", "success");
}

function insertarTableroDobble() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '150px'; wrapper.style.top = '100px';
    
    // Crear un círculo con varios iconos esparcidos
    const iconos = ['fa-heart', 'fa-star', 'fa-bolt', 'fa-leaf', 'fa-globe', 'fa-sun', 'fa-moon', 'fa-cloud'];
    let iconosHTML = '';
    for(let i=0; i<12; i++) {
        const icon = iconos[i % iconos.length];
        const angle = (i / 12) * Math.PI * 2;
        const radius = 35; // Porcentaje
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        iconosHTML += `<i class="fa-solid ${icon} dobble-simbolo" style="top: ${y}%; left: ${x}%;"></i>`;
    }
    // Añadir uno en el centro
    iconosHTML += `<i class="fa-solid fa-heart dobble-simbolo" style="top: 50%; left: 50%; color: #ef4444; font-size: 32px;"></i>`;
    
    wrapper.innerHTML = `<div class="tablero-dobble">${iconosHTML}</div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Tablero Dobble insertado", "success");
}
// Helper para crear el cascarón Flip 3D y mantener el diseño original intacto
function crearCartaFlip(frontHTML, width, height, backTitulo) {
    return `
        <div class="carta-container" style="width: ${width}px; height: ${height}px;">
            <div class="carta-inner">
                <div class="carta-front" style="padding:0; background:transparent; border:none; box-shadow:none;">
                    ${frontHTML}
                </div>
                <div class="carta-back">
                    <div class="guia-header">${backTitulo}</div>
                    <div class="guia-contenido">
                        <p><strong>Dorso Personalizable</strong></p>
                        <p style="font-size:11px; color:#94a3b8;">Usa el panel derecho para cambiar el diseño o escribir notas.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 1. Carta Conversacional
function insertarCartaConversacional() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '100px';
    
    const front = `
        <div class="carta-conversacional">
            <div class="carta-conversacional-texto" contenteditable="false">¿Qué sueños tenemos para nuestro barrio en los próximos 10 años?</div>
        </div>`;
    
    wrapper.innerHTML = crearCartaFlip(front, 220, 320, "Diálogo Freiriano");
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-conversacional-texto');
    
    // Habilitar el flip 3D
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta Conversacional insertada", "success");
}

// 2. Carta de Memoria
function insertarCartaMemoria() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '250px'; wrapper.style.top = '150px';
    
    const front = `
        <div class="carta-memoria">
            <div class="carta-memoria-header" contenteditable="false">Junta de Vecinos</div>
            <div class="carta-memoria-texto" contenteditable="false">Cuenta una historia sobre cómo esta organización ayudó a resolver un problema en tu comunidad.</div>
        </div>`;
        
    wrapper.innerHTML = crearCartaFlip(front, 220, 320, "Memoria Histórica");
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-memoria-header, .carta-memoria-texto');
    
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta de Memoria insertada", "success");
}

// 3. Carta de Dilema
function insertarCartaDilema() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '300px'; wrapper.style.top = '100px';
    
    const front = `
        <div class="carta-dilema">
            <div class="carta-dilema-header">Situación Crítica</div>
            <div class="carta-dilema-texto" contenteditable="false">Llegas a un nuevo país sin dinero y te ofrecen un trabajo mal pagado pero ilegal. ¿Qué haces?</div>
            <div class="carta-dilema-opciones">
                <div class="dilema-opcion" contenteditable="false"><div><strong>Opción A</strong> Aceptar el trabajo para sobrevivir.</div></div>
                <div class="dilema-opcion" contenteditable="false"><div><strong>Opción B</strong> Rechazarlo y buscar ayuda legal.</div></div>
            </div>
        </div>`;
        
    wrapper.innerHTML = crearCartaFlip(front, 250, 350, "Dilema Ético");
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-dilema-texto, .dilema-opcion');
    
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta de Dilema insertada", "success");
}

// 4. Carta Dixit
function insertarCartaDixit() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '150px'; wrapper.style.top = '100px';
    wrapper.setAttribute('data-juego', 'Dixit');
    const front = `
        <div class="carta-dixit">
            <div class="carta-dixit-texto" contenteditable="false">Escribe la pista aquí...</div>
        </div>`;
    wrapper.innerHTML = crearCartaFlip(front, 220, 320, "Asociación Visual");
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-dixit-texto');
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta Dixit insertada", "success");
}

// 5. Carta Drafting (Sushi Go)
function insertarCartaDrafting() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '150px';
    wrapper.setAttribute('data-juego', 'Sushi Go');
    const front = `
        <div class="carta-drafting">
            <div class="drafting-header" contenteditable="false">Educación</div>
            <div class="drafting-puntos" contenteditable="false">3</div>
            <div class="drafting-texto" contenteditable="false">Construye una Escuela Popular</div>
            <div class="drafting-footer">Proyecto Comunitario</div>
        </div>`;
    wrapper.innerHTML = crearCartaFlip(front, 180, 260, "Proyecto Comunitario");
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.drafting-header, .drafting-puntos, .drafting-texto');
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta Drafting insertada", "success");
}

// 6. Carta Charada
function insertarCartaCharada() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '250px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'Charadas');
    const front = `
        <div class="carta-charada">
            <div class="carta-charada-categoria" contenteditable="false">Personaje / Oficio</div>
            <div class="carta-charada-texto" contenteditable="false">El Alcalde</div>
        </div>`;
    wrapper.innerHTML = crearCartaFlip(front, 250, 150, "Mímica / Expresión");
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.carta-charada-categoria, .carta-charada-texto');
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
            if(typeof autosave === 'function') autosave();
        }
    });
    showToast("Carta Charada insertada", "success");
}
// ================= MÓDULO PRESENTACIÓN (RESTAURADO) =================
function insertarSlide() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="slide-canvas">
            <div class="slide-text-overlay" contenteditable="true">
                "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo." - Paulo Freire
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Diapositiva insertada", "success");
}

function insertarLaminaGeneradora() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '50px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="lamina-split">
            <div class="lamina-lado">
                <div class="lamina-titulo" contenteditable="true">1982</div>
                <div class="lamina-zona-dibujo" ondragover="event.preventDefault()" ondrop="soltarImagen(event)">Suelta una imagen aquí</div>
            </div>
            <div class="lamina-lado">
                <div class="lamina-titulo" contenteditable="true">HOY</div>
                <div class="lamina-zona-dibujo" ondragover="event.preventDefault()" ondrop="soltarImagen(event)">Suelta una imagen aquí</div>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Lámina Generadora insertada", "success");
}
// ================= PLANTILLAS LÚDICAS AVANZADAS (v15.0) =================

function insertarTableroTrivial() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="tablero-trivial">
            <div class="trivial-centro" contenteditable="false">Título del Quiz</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.trivial-centro');
    showToast("Tablero Trivial insertado", "success");
}

function insertarTableroBingo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '150px'; wrapper.style.top = '150px';
    
    let gridHTML = '<div class="tablero-bingo">';
    // Generar 25 casillas
    for(let i=0; i<25; i++) {
        if(i === 12) {
            gridHTML += `<div class="casilla-bingo bingo-libre">Libre</div>`;
        } else {
            // Números aleatorios para simular el cartón
            const num = Math.floor(Math.random() * 75) + 1; 
            gridHTML += `<div class="casilla-bingo" contenteditable="false">${num}</div>`;
        }
    }
    gridHTML += '</div>';
    
    wrapper.innerHTML = gridHTML;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.casilla-bingo');
    showToast("Cartón de Bingo insertado", "success");
}

function insertarCartaTinderblox() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="carta-tinderblox">
            <div class="tinderblox-pieza" contenteditable="false">🪵</div>
            <div class="tinderblox-texto" contenteditable="false">Pon 1 tronco usando solo la mano izquierda.</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.tinderblox-pieza, .tinderblox-texto');
    showToast("Carta Tinderblox insertada", "success");
}

function insertarPanelSkyTeam() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="panel-skyteam">
            <div class="skyteam-col">
                <h4>Piloto</h4>
                <div class="skyteam-slots">
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                </div>
            </div>
            <div class="skyteam-col">
                <h4>Copiloto</h4>
                <div class="skyteam-slots">
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                </div>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Panel Sky Team insertado", "success");
}

function insertarLineaTiempoHitster() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '200px';
    
    wrapper.innerHTML = `
        <div class="linea-tiempo">
            <div class="linea-tiempo-slot" contenteditable="false">1950</div>
            <div class="linea-tiempo-slot" contenteditable="false">1970</div>
            <div class="linea-tiempo-slot" contenteditable="false">1990</div>
            <div class="linea-tiempo-slot" contenteditable="false">2010</div>
            <div class="linea-tiempo-slot" contenteditable="false">HOY</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.linea-tiempo-slot');
    showToast("Línea de Tiempo insertada", "success");
}
// ================= PLANTILLAS LÚDICAS AVANZADAS (v15.0) =================

function insertarTableroTrivial() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="tablero-trivial">
            <div class="trivial-centro" contenteditable="false">Título del Quiz</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.trivial-centro');
    showToast("Tablero Trivial insertado", "success");
}

function insertarTableroBingo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '150px'; wrapper.style.top = '150px';
    
    let gridHTML = '<div class="tablero-bingo">';
    // Generar 25 casillas
    for(let i=0; i<25; i++) {
        if(i === 12) {
            gridHTML += `<div class="casilla-bingo bingo-libre">Libre</div>`;
        } else {
            // Números aleatorios para simular el cartón
            const num = Math.floor(Math.random() * 75) + 1; 
            gridHTML += `<div class="casilla-bingo" contenteditable="false">${num}</div>`;
        }
    }
    gridHTML += '</div>';
    
    wrapper.innerHTML = gridHTML;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.casilla-bingo');
    showToast("Cartón de Bingo insertado", "success");
}

function insertarCartaTinderblox() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="carta-tinderblox">
            <div class="tinderblox-pieza" contenteditable="false">🪵</div>
            <div class="tinderblox-texto" contenteditable="false">Pon 1 tronco usando solo la mano izquierda.</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.tinderblox-pieza, .tinderblox-texto');
    showToast("Carta Tinderblox insertada", "success");
}

function insertarPanelSkyTeam() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="panel-skyteam">
            <div class="skyteam-col">
                <h4>Piloto</h4>
                <div class="skyteam-slots">
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                </div>
            </div>
            <div class="skyteam-col">
                <h4>Copiloto</h4>
                <div class="skyteam-slots">
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                    <div class="skyteam-slot">Dado</div>
                </div>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Panel Sky Team insertado", "success");
}

function insertarLineaTiempoHitster() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '200px';
    
    wrapper.innerHTML = `
        <div class="linea-tiempo">
            <div class="linea-tiempo-slot" contenteditable="false">1950</div>
            <div class="linea-tiempo-slot" contenteditable="false">1970</div>
            <div class="linea-tiempo-slot" contenteditable="false">1990</div>
            <div class="linea-tiempo-slot" contenteditable="false">2010</div>
            <div class="linea-tiempo-slot" contenteditable="false">HOY</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.linea-tiempo-slot');
    showToast("Línea de Tiempo insertada", "success");
}
// ================= ANEXO DE FACILITACIÓN (v24.0) =================
function insertarAsistenteReglas() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '50px'; wrapper.style.top = '50px';
    
    wrapper.innerHTML = `
        <div class="hoja-facilitacion" contenteditable="true">
            <div class="header-epes">
                <h1>Anexo de Facilitación</h1>
                <div class="logo">Estudio EP</div>
            </div>
            
            <div class="ficha-grid">
                <div class="ficha-item">
                    <strong>Nombre del Juego</strong>
                    <p>Escribe el título aquí...</p>
                </div>
                <div class="ficha-item">
                    <strong>Motor / Mecánica Base</strong>
                    <p>(Ej. Dixit, UNO, Tinderblox)</p>
                </div>
            </div>

            <h2>1. Objetivo Lúdico</h2>
            <p>¿Cómo se gana el juego? (Ej. Construir el proyecto con más puntos, adivinar la palabra, etc.)</p>

            <h2>2. Objetivo Pedagógico (Educación Popular)</h2>
            <p>¿Qué problemática comunitaria vamos a visibilizar con esta mecánica? (Ej. Las relaciones de poder, la falta de recursos, la memoria del barrio).</p>

            <h2>3. Adaptación EP (Paso a Paso)</h2>
            <p>Explica cómo cambiar las reglas o los textos de las cartas para que reflejen la realidad local. (Ej. "Reemplaza las cartas de ataque por recortes presupuestarios").</p>

            <h2>4. Círculo de Diálogo (Debriefing)</h2>
            <div class="pregunta-box">
                <div class="pregunta-num">1</div>
                <p><strong>VER:</strong> ¿Qué pasó durante el juego? ¿Qué te sorprendió o te frustró?</p>
            </div>
            <div class="pregunta-box">
                <div class="pregunta-num">2</div>
                <p><strong>JUZGAR:</strong> ¿Cómo se parece esto a lo que pasa en nuestra comunidad o en el mundo real?</p>
            </div>
            <div class="pregunta-box">
                <div class="pregunta-num">3</div>
                <p><strong>ACTUAR:</strong> ¿Qué podemos hacer diferente en nuestra organización para cambiar esto?</p>
            </div>

            <h2>5. Decálogo del Facilitador</h2>
            <p style="font-size: 11px; color: #64748b; line-height: 1.4;">
                1. No des el diagnóstico (el grupo lo tiene).<br>
                2. No des las soluciones (el grupo las construye).<br>
                3. No personalices el conflicto (es el sistema, no la persona).<br>
                4. No llenes los silencios (deja procesar).<br>
                5. No sacrifiques la evaluación (cierra con un compromiso de acción).
            </p>

            <div class="compromiso-box">
                <h3>Compromiso de Acción del Grupo</h3>
                <p>¿Qué haremos diferente mañana en nuestro territorio?</p>
                <br><br>
                <div class="linea-firma"></div>
                <p style="font-size: 10px; margin-top: 5px; color:#9a3412;">Firma del Facilitador / Colectivo</p>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Anexo de Facilitación insertado", "success");
}


// ================= GENERADOR DE TOKENS =================
function insertarGeneradorTokens() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element token-sheet-wrapper';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    
    wrapper.innerHTML = `
        <div class="token-sheet" id="token-grid-${Date.now()}">
            <div class="token-item token-circulo" data-tipo="circulo" style="color:#333; border-color:#333;">1</div>
            <div class="token-item token-circulo" data-tipo="circulo" style="color:#333; border-color:#333;">2</div>
            <div class="token-item token-circulo" data-tipo="circulo" style="color:#333; border-color:#333;">3</div>
            <div class="token-item token-circulo" data-tipo="circulo" style="color:#333; border-color:#333;">4</div>
            <div class="token-item token-hexagono" data-tipo="hexagono" style="color:#ca8a04; border-color:#ca8a04; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-house"></i></div>
            <div class="token-item token-cuadrado" data-tipo="cuadrado" style="color:#dc2626; border-color:#dc2626;"><i class="fa-solid fa-heart"></i></div>
            <div class="token-item token-cuadrado" data-tipo="cuadrado" style="color:#0284c7; border-color:#0284c7;"><i class="fa-solid fa-users"></i></div>
            <div class="token-item token-cuadrado" data-tipo="cuadrado" style="color:#15803d; border-color:#15803d;"><i class="fa-solid fa-tree"></i></div>
            <div class="token-item token-cuadrado" data-tipo="cuadrado" style="color:#ca8a04; border-color:#ca8a04;"><i class="fa-solid fa-bolt"></i></div>
        </div>
        <button class="btn btn-outline" style="margin-top:10px; font-size:12px;" onclick="agregarToken(this)"><i class="fa-solid fa-plus"></i> Añadir Ficha</button>
    `;
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    
    // Habilitar selección de tokens
    wrapper.querySelectorAll('.token-item').forEach(t => configurarToken(t));
    
    showToast("Hoja de Tokens insertada. Clic en una ficha para editarla.", "success");
}

function agregarToken(btn) {
    const grid = btn.previousElementSibling;
    const nuevo = document.createElement('div');
    nuevo.className = 'token-item token-circulo';
    nuevo.setAttribute('data-tipo', 'circulo');
    nuevo.style.color = '#333'; nuevo.style.borderColor = '#333';
    nuevo.innerText = '?';
    
    grid.appendChild(nuevo);
    configurarToken(nuevo);
    if(typeof autosave === 'function') autosave();
}

function configurarToken(t) {
    t.setAttribute('contenteditable', 'false');
    
    // Clic para SELECCIONAR (no editar)
    t.addEventListener('click', (e) => {
        e.stopPropagation();
        // Deseleccionar otros
        document.querySelectorAll('.token-item').forEach(el => el.classList.remove('token-seleccionado'));
        t.classList.add('token-seleccionado');
        
        // Abrir el panel de propiedades
        if(typeof seleccionarToken === 'function') seleccionarToken(t);
    });

    // Doble clic para editar texto (si no tiene ícono)
    t.addEventListener('dblclick', (e) => {
        if(!t.querySelector('i')) {
            t.setAttribute('contenteditable', 'true');
            t.focus();
            document.execCommand('selectAll', false, null);
        }
    });
    
    t.addEventListener('blur', () => {
        t.setAttribute('contenteditable', 'false');
        if(typeof autosave === 'function') autosave();
    });
}

// Funciones de personalización
function cambiarIconoToken(icono) {
    const token = document.querySelector('.token-item.token-seleccionado');
    if(!token) return;
    token.innerText = ''; // Borrar el número o texto
    token.innerHTML = `<i class="fa-solid ${icono}"></i>`;
    if(typeof autosave === 'function') autosave();
}

function cambiarColorToken(color) {
    const token = document.querySelector('.token-item.token-seleccionado');
    if(!token) return;
    token.style.color = color;
    token.style.borderColor = color;
    if(typeof autosave === 'function') autosave();
}
function insertarCartaUnoReversa() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'UNO');
    wrapper.innerHTML = `
        <div class="carta-uno" style="border-color:#2563eb; color:#2563eb;">
            <div class="carta-uno-ovalo" style="background:#2563eb;"></div>
            <div class="carta-uno-texto" contenteditable="true" style="color:white;">⤾</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta Reversa insertada", "success");
}

function insertarCartaUnoBloqueo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'UNO');
    wrapper.innerHTML = `
        <div class="carta-uno" style="border-color:#16a34a; color:#16a34a;">
            <div class="carta-uno-ovalo" style="background:#16a34a;"></div>
            <div class="carta-uno-texto" contenteditable="true" style="color:white;">⊘</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta Bloqueo insertada", "success");
}
// ================= COMPONENTES MODULARES (v16.0) =================



function insertarPlayerBoard() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.setAttribute('data-juego', 'Player Board');
    
    wrapper.innerHTML = `
        <div class="player-board">
            <div class="pb-header" contenteditable="false">Nombre del Jugador / Rol</div>
            <div class="pb-row">
                <div class="pb-action" contenteditable="false">Investigar</div>
                <div class="pb-slots"><div class="pb-slot"></div><div class="pb-slot"></div></div>
            </div>
            <div class="pb-row">
                <div class="pb-action" contenteditable="false">Capacitar</div>
                <div class="pb-slots"><div class="pb-slot"></div><div class="pb-slot"></div><div class="pb-slot"></div></div>
            </div>
            <div class="pb-row">
                <div class="pb-action" contenteditable="false">Difundir</div>
                <div class="pb-slots"><div class="pb-slot"></div></div>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.pb-header, .pb-action');
    showToast("Player Board insertado", "success");
}

function insertarTrackerEstado() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.setAttribute('data-juego', 'Tracker');
    
    wrapper.innerHTML = `
        <div class="tracker-bar">
            <div class="tracker-fill" style="width: 50%;"></div>
            <div class="tracker-marker" style="left: 50%;" onmousedown="arrastrarTracker(event, this)"></div>
            <div class="tracker-label" contenteditable="false">Confianza: 50%</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Tracker de Estado insertado (Arrastra el marcador rojo)", "success");
}

function arrastrarTracker(e, marker) {
    e.stopPropagation();
    const bar = marker.parentElement;
    const rect = bar.getBoundingClientRect();
    
    const move = (ev) => {
        let x = ev.clientX - rect.left;
        if(x < 0) x = 0;
        if(x > rect.width) x = rect.width;
        
        const pct = Math.round((x / rect.width) * 100);
        marker.style.left = pct + '%';
        
        const fill = bar.querySelector('.tracker-fill');
        if(fill) fill.style.width = pct + '%';
        
        const label = bar.querySelector('.tracker-label');
        if(label) label.innerText = 'Confianza: ' + pct + '%';
    };
    
    const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        if(typeof autosave === 'function') autosave();
    };
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
}

function insertarCartaPoker() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'Póker');
    
    wrapper.innerHTML = `
        <div class="carta-poker palo-negro">
            <div class="poker-esquina poker-sup"><span class="poker-num">A</span><span class="poker-palo">♠</span></div>
            <div class="poker-centro">♠</div>
            <div class="poker-esquina poker-inf"><span class="poker-num">A</span><span class="poker-palo">♠</span></div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta de Póker insertada", "success");
}

function insertarCartaUnoNumero() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '200px'; wrapper.style.top = '200px';
    wrapper.setAttribute('data-juego', 'UNO');
    wrapper.innerHTML = `
        <div class="carta-uno" style="border-color:#ca8a04; color:#ca8a04;">
            <div class="carta-uno-ovalo" style="background:#ca8a04;"></div>
            <div class="carta-uno-texto" contenteditable="true" style="color:white;">7</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta UNO (Número) insertada", "success");
}
// ================= TABLERO DESDE IMAGEN (v28.0) =================
function insertarTableroImagen() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.setAttribute('data-juego', 'Playmat');
    
    wrapper.innerHTML = `
        <div class="tablero-imagen" ondragover="event.preventDefault()" ondrop="soltarImagenTablero(event, this)">
            <div class="tablero-imagen-drop">
                <i class="fa-solid fa-map-location-dot"></i>
                <span>Suelta tu mapa aquí</span>
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Mesa de juego insertada. Suelta una imagen.", "success");
}

function soltarImagenTablero(event, tablero) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            tablero.style.backgroundImage = `url(${e.target.result})`;
            tablero.classList.add('con-imagen');
            if(typeof autosave === 'function') autosave();
            showToast("Mapa cargado en el tablero", "success");
        };
        reader.readAsDataURL(file);
    }
}

// ================= HEXÁGONOS CORREGIDOS =================
function insertarTableroHexagonal() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.setAttribute('data-juego', 'Hexágonos');

    // Estructura de colmena perfecta (3 - 4 - 3) como Catan
    wrapper.innerHTML = `
        <div class="hex-board">
            <div class="hex-row">
                <div class="hex-tile" contenteditable="false">Sector A</div>
                <div class="hex-tile" contenteditable="false">Sector B</div>
                <div class="hex-tile" contenteditable="false">Sector C</div>
            </div>
            <div class="hex-row offset">
                <div class="hex-tile" contenteditable="false">Salud</div>
                <div class="hex-tile" contenteditable="false">Educación</div>
                <div class="hex-tile" contenteditable="false">Vivienda</div>
                <div class="hex-tile" contenteditable="false">Recursos</div>
            </div>
            <div class="hex-row">
                <div class="hex-tile" contenteditable="false">Actor 1</div>
                <div class="hex-tile" contenteditable="false">Actor 2</div>
                <div class="hex-tile" contenteditable="false">Meta</div>
            </div>
        </div>`;
        
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    habilitarEdicionDobleClic(wrapper, '.hex-tile');
    showToast("Tablero Hexagonal insertado", "success");
}


// ================= ASSETS Y PLANTILLAS (v30.0) =================

function insertarPlantillaCarta() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.style.width = '220px'; wrapper.style.height = '320px';
    
    wrapper.innerHTML = `
        <div style="width:100%; height:100%; background-image:url('assets/img/carta_ornamental.jpg'); background-size:cover; background-position:center; border-radius:8px; border:1px solid #ccc; box-shadow:0 4px 10px rgba(0,0,0,0.2); display:flex; flex-direction:column; padding:30px; box-sizing:border-box; position:relative;">
            <div contenteditable="true" style="font-family:'Merriweather'; font-size:16px; text-align:center; color:#333; margin-top:40px; outline:none;">
                Título de la Carta
            </div>
            <div contenteditable="true" style="font-family:'Patrick Hand'; font-size:14px; text-align:center; color:#555; margin-top:20px; outline:none;">
                Describe aquí el poder o la acción de esta carta.
            </div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Carta Ornamental insertada", "success");
}

function insertarMapaHex() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '150px'; wrapper.style.top = '150px';
    wrapper.style.width = '800px'; wrapper.style.height = '533px';
    
    wrapper.innerHTML = `
        <div style="width:100%; height:100%; background-image:url('assets/img/mapa_hexagonal.jpg'); background-size:cover; background-position:center; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.2); border:2px solid #333;"></div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Mapa Hexagonal insertado", "success");
}

function insertarTableroSerpientes() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.style.width = '600px'; wrapper.style.height = '600px';
    
    wrapper.innerHTML = `
        <div style="width:100%; height:100%; background-image:url('assets/img/tablero_serpientes.jpg'); background-size:cover; background-position:center; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.2); border:2px solid #333;"></div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Tablero Serpientes insertado", "success");
}

function insertarTableroCircular() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.style.width = '700px'; wrapper.style.height = '466px';
    
    wrapper.innerHTML = `
        <div style="width:100%; height:100%; background-image:url('assets/img/tablero_circular.jpg'); background-size:cover; background-position:center; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.2); border:2px solid #333;"></div>`;
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Tablero Circular insertado", "success");
}

function insertarIlustracionComunidad(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element img-wrapper';
    wrapper.style.left = '200px'; wrapper.style.top = '150px';
    
    const imgSrc = tipo === 1 ? 'assets/img/comunidad1.jpg' : 'assets/img/comunidad2.jpg';
    wrapper.innerHTML = `<img src="${imgSrc}" class="img-canvas" style="max-width:300px; border-radius:8px;">`;
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    showToast("Ilustración insertada", "success");
}