let proyectos = JSON.parse(localStorage.getItem('ep_proyectos')) || [];
let currentProjectId = null;
let autosaveTimeout = null;

function guardarEnLocalStorage() { localStorage.setItem('ep_proyectos', JSON.stringify(proyectos)); }

function cargarProyectos() {
    const list = document.getElementById('projects-list');
    if(!list) return;
    list.innerHTML = '';
    proyectos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => abrirProyecto(p.id);
        card.innerHTML = `<div class="project-thumbnail" style="display:flex;align-items:center;justify-content:center;color:#cbd5e1;"><i class="fa-solid fa-file-lines fa-3x"></i></div><div style="padding:15px;"><h4 style="font-family:'Playfair Display'; font-size:18px; margin-bottom:5px;">${p.nombre}</h4><p style="font-size:12px; color:#64748b;">Proyecto de Taller</p></div>`;
        list.appendChild(card);
    });
}

function crearNuevoProyecto() {
    const nuevo = { id: 'proj_' + Date.now(), nombre: 'Nuevo Proyecto', html: '', canvasBg: null, canvasClass: 'canvas-area' };
    proyectos.push(nuevo); guardarEnLocalStorage(); abrirProyecto(nuevo.id);
}

function abrirProyecto(id) {
    const proy = proyectos.find(p => p.id === id);
    if(!proy) return;
    currentProjectId = id;
    document.getElementById('dashboard-view').classList.remove('active');
    document.getElementById('editor-view').classList.add('active');
    document.getElementById('project-title-input').value = proy.nombre;
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '<svg id="canvas-svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></svg><div class="canvas-hint" id="canvas-hint">Usa el menú izquierdo para añadir elementos.</div>';
    if(proy.html) canvas.innerHTML += proy.html;
    canvas.querySelectorAll('.canvas-element').forEach(el => {
        if(typeof hacerArrastrable === 'function') hacerArrastrable(el);
        if(typeof seleccionarElemento === 'function') {
            el.addEventListener('mousedown', (e) => {
                if(e.target.getAttribute('contenteditable') === 'true' || e.target.closest('.btn') || e.target.tagName === 'INPUT') return;
                seleccionarElemento(el);
            });
        }
    });
}

function volverAlDashboard() {
    if(currentProjectId) { const proy = proyectos.find(p => p.id === currentProjectId); if(proy) { proy.html = document.getElementById('canvas').innerHTML; guardarEnLocalStorage(); } }
    document.getElementById('editor-view').classList.remove('active'); document.getElementById('dashboard-view').classList.add('active');
    currentProjectId = null; cargarProyectos();
}

function actualizarTituloProyecto(val) {
    if(!currentProjectId) return;
    const proy = proyectos.find(p => p.id === currentProjectId);
    if(proy) { proy.nombre = val; guardarEnLocalStorage(); }
}

function autosave() {
    const status = document.getElementById('autosave-status');
    if(status) { status.innerText = 'Guardando...'; status.style.color = '#ca8a04'; }
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(() => {
        if(currentProjectId) {
            const proy = proyectos.find(p => p.id === currentProjectId);
            if(proy) { proy.html = document.getElementById('canvas').innerHTML; guardarEnLocalStorage(); if(status) { status.innerText = 'Guardado ✔'; status.style.color = '#15803d'; } }
        }
    }, 1000);
}

function showToast(msg, type) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type || 'info'}`;
    toast.innerHTML = `<i class="fa-solid ${type==='success'?'fa-check-circle':type==='error'?'fa-exclamation-circle':'fa-info-circle'}"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 300); }, 3000);
}

function mostrarLoading(msg, sub) {
    const overlay = document.getElementById('loading-overlay');
    if(!overlay) return;
    overlay.querySelector('.loader-text').innerText = msg || 'Cargando...';
    overlay.querySelector('.loader-subtext').innerText = sub || '';
    overlay.style.display = 'flex';
}
function ocultarLoading() { const overlay = document.getElementById('loading-overlay'); if(overlay) overlay.style.display = 'none'; }

// BARRA SUPERIOR
function limpiarLienzo() {
    if (confirm("¿Estás seguro de que quieres limpiar todo el lienzo?")) {
        document.querySelectorAll('#canvas > .canvas-element').forEach(el => el.remove());
        const hint = document.getElementById('canvas-hint');
        if(!hint) {
            const newHint = document.createElement('div'); newHint.className = 'canvas-hint'; newHint.id = 'canvas-hint';
            newHint.innerText = 'Usa el menú izquierdo para añadir elementos.'; document.getElementById('canvas').appendChild(newHint);
        } else { hint.style.display = 'block'; }
        autosave(); showToast("Lienzo limpiado", "info");
    }
}
function toggleTema() { document.body.classList.toggle('dark-mode'); }
function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
    const tools = document.querySelector('.tools-panel'); const props = document.querySelector('.properties-panel');
    if(tools && props) {
        if (document.body.classList.contains('focus-mode')) { tools.style.display = 'none'; props.style.display = 'none'; }
        else { tools.style.display = 'flex'; props.style.display = 'flex'; }
    }
}
function toggleLiveMode() { document.body.classList.toggle('live-mode'); showToast("Modo Proyector " + (document.body.classList.contains('live-mode') ? "Activado" : "Desactivado"), "info"); }
function activarPanico() { const pantalla = document.getElementById('pantalla-panico'); if(pantalla) pantalla.style.display = 'flex'; }
function abrirRuleta() { const modal = document.getElementById('modal-ruleta'); if(modal) modal.classList.add('active'); }
function exportarImagenPNG() {
    mostrarLoading("Capturando imagen...", "Espera un momento.");
    const canvasArea = document.getElementById('canvas');
    html2canvas(canvasArea, { scale: 2, useCORS: true, backgroundColor: '#F9F6F0' }).then(canvas => {
        const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'Estudio_EP_Lienzo.png'; a.click();
        ocultarLoading(); showToast("Imagen descargada", "success");
    }).catch(err => { console.error(err); ocultarLoading(); showToast("Error al capturar imagen", "error"); });
}
function descargarJSON() {
    if(!currentProjectId) return;
    const proy = proyectos.find(p => p.id === currentProjectId); if(!proy) return;
    proy.html = document.getElementById('canvas').innerHTML;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(proy));
    const dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", proy.nombre + ".json"); dlAnchorElem.click();
    showToast("Proyecto exportado a JSON", "success");
}
function importarProyecto(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.html) { showToast("El archivo no es válido", "error"); return; }
            const nuevo = { id: 'proj_' + Date.now(), nombre: (data.nombre || 'Proyecto Importado') + ' (Copia)', html: data.html, canvasBg: null, canvasClass: 'canvas-area' };
            proyectos.push(nuevo); guardarEnLocalStorage(); abrirProyecto(nuevo.id); showToast("¡Proyecto importado!", "success");
        } catch (err) { showToast("Error al leer el JSON", "error"); }
    };
    reader.readAsText(file);
}

// VOLTEO GLOBAL
document.addEventListener('dblclick', function(e) {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    const container = e.target.closest('.carta-container');
    if (container) container.classList.toggle('flipped');
});

// ================= MOTOR DE IMPRESIÓN (v202.0) =================

function abrirVistaPrevia() {
    const modal = document.getElementById('print-modal');
    if (modal) { modal.style.display = 'flex'; actualizarVistaPrevia(); }
}
function cerrarVistaPrevia() { const modal = document.getElementById('print-modal'); if (modal) modal.style.display = 'none'; }

function clasificarElementos() {
    const elements = Array.from(document.querySelectorAll('#canvas > .canvas-element')).filter(el => el.offsetWidth > 0);
    const cards = []; const largeBoards = []; const smallTokens = [];
    elements.forEach(el => {
        if (el.querySelector('.carta-container') || el.querySelector('.carta-pro') || el.querySelector('.carta-sushi') || el.querySelector('.carta-dixit') || el.querySelector('.carta-lobos') || el.querySelector('.carta-codename')) cards.push(el);
        else if (el.offsetWidth > 250 || el.offsetHeight > 250) largeBoards.push(el);
        else smallTokens.push(el);
    });
    return { cards, largeBoards, smallTokens };
}

// VISTA PREVIA: Rápida, usando wrappers CSS (Sin html2canvas)
function crearMiniaturaPreview(elementoOriginal, targetWidth, isBack = false, isBW = false) {
    let visual = elementoOriginal.querySelector('.carta-container') || elementoOriginal.querySelector('.carta-pro') || elementoOriginal.firstElementChild || elementoOriginal;
    const scale = targetWidth / 240; // Las cartas base miden 240
    
    const wrapper = document.createElement('div');
    wrapper.style.width = targetWidth + 'px';
    wrapper.style.height = (330 * scale) + 'px'; // Altura proporcional (330 es base)
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '6px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';

    const clone = visual.cloneNode(true);
    const menu = clone.querySelector('.floating-actions');
    if(menu) menu.remove();
    clone.classList.remove('selected');

    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.margin = '0';
    clone.style.transform = `scale(${scale})`;
    clone.style.transformOrigin = 'top left';
    
    if (isBack) clone.classList.add('flipped');
    else clone.classList.remove('flipped');
    if (isBW) clone.style.filter = 'grayscale(100%)';

    wrapper.appendChild(clone);
    return wrapper;
}

function actualizarVistaPrevia() {
    const previewArea = document.getElementById('print-preview-area');
    const stats = document.getElementById('print-stats');
    if (!previewArea || !stats) return;

    const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
    const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
    const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
    const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

    const { cards, largeBoards, smallTokens } = clasificarElementos();
    let activeLargeBoards = isMosaico ? largeBoards : [];
    let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

    const totalElements = cards.length + activeLargeBoards.length + activeSmallTokens.length;
    if (totalElements === 0) { previewArea.innerHTML = '<p style="color:#666; text-align:center; width:100%; margin-top:50px;">No hay elementos.</p>'; stats.innerHTML = '0 hojas.'; return; }

    let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
    const itemsPerPage = cols * rows;
    const frontPages = Math.ceil(cards.length / itemsPerPage);
    const backPages = isDuplex ? frontPages : 0;
    const tokenPages = Math.ceil(activeSmallTokens.length / 20);
    const boardPages = activeLargeBoards.length;

    stats.innerHTML = `Cartas: <b>${cards.length}</b> | Tableros: <b>${activeLargeBoards.length}</b> | Fichas: <b>${activeSmallTokens.length}</b><br>Hojas totales: <b>${frontPages + backPages + tokenPages + boardPages}</b>`;
    previewArea.innerHTML = '';

    const targetW = size === 'large' ? 140 : (size === 'small' ? 75 : 95);

    const crearHoja = (titulo, esGrid, customCols, customRows) => {
        const div = document.createElement('div');
        div.style.cssText = `width:100%; max-width:450px; aspect-ratio:1/1.414; background:white; padding:20px; margin: 0 auto 20px auto; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.2); box-sizing:border-box; display:${esGrid ? 'grid' : 'flex'}; `;
        if (esGrid) div.style.cssText += `grid-template-columns: repeat(${customCols}, 1fr); grid-template-rows: repeat(${customRows}, 1fr); gap:10px; place-items:center;`;
        else div.style.cssText += `align-items:center; justify-content:center;`;
        
        const t = document.createElement('div');
        t.style.cssText = 'position:absolute; top:5px; left:10px; font-size:10px; color:#999; font-weight:bold; z-index:10;';
        t.innerText = titulo;
        div.appendChild(t);
        return div;
    };

    // 1. Frentes
    for (let p = 0; p < frontPages; p++) {
        const page = crearHoja(`Hoja ${p + 1} (Cartas)`, true, cols, rows);
        for (let i = 0; i < itemsPerPage; i++) {
            const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
            page.appendChild(crearMiniaturaPreview(cards[idx], targetW, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 2. Dorsos
    if (isDuplex) {
        for (let p = 0; p < backPages; p++) {
            const page = crearHoja(`Hoja ${frontPages + p + 1} (Dorsos)`, true, cols, rows);
            for (let i = 0; i < itemsPerPage; i++) {
                const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
                page.appendChild(crearMiniaturaPreview(cards[idx], targetW, true, isBW));
            }
            previewArea.appendChild(page);
        }
    }

    // 3. Fichas
    for (let p = 0; p < tokenPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + p + 1} (Fichas)`, true, 4, 5);
        for (let i = 0; i < 20; i++) {
            const idx = p * 20 + i; if (idx >= activeSmallTokens.length) break;
            page.appendChild(crearMiniaturaPreview(activeSmallTokens[idx], 50, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 4. Tableros
    for (let p = 0; p < boardPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + tokenPages + p + 1} (Tablero)`, false);
        const boardW = activeLargeBoards[p].offsetWidth || 500;
        const boardH = activeLargeBoards[p].offsetHeight || 500;
        const scale = Math.min(380 / boardW, 500 / boardH, 1);
        
        const boardDiv = document.createElement('div');
        boardDiv.style.width = (boardW * scale) + 'px';
        boardDiv.style.height = (boardH * scale) + 'px';
        boardDiv.style.position = 'relative';
        boardDiv.style.overflow = 'hidden';

        const clone = activeLargeBoards[p].cloneNode(true);
        const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
        clone.classList.remove('selected');
        clone.style.position = 'absolute'; clone.style.top='0'; clone.style.left='0'; clone.style.margin='0';
        clone.style.transform = `scale(${scale})`;
        clone.style.transformOrigin = 'top left';
        if (isBW) clone.style.filter = 'grayscale(100%)';
        
        boardDiv.appendChild(clone);
        page.appendChild(boardDiv);
        previewArea.appendChild(page);
    }
}

// PDF: Usa html2canvas estrictamente aislado para evitar el bucle infinito
window.generarPDFFinal = async function() {
    try {
        mostrarLoading("Generando PDF...", "Esto puede tardar unos segundos.");
        const printModal = document.getElementById('print-modal');
        if (printModal) printModal.style.display = 'none';

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
        const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
        const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
        const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

        const { cards, largeBoards, smallTokens } = clasificarElementos();
        let activeLargeBoards = isMosaico ? largeBoards : [];
        let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

        let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
        const itemsPerPage = cols * rows;

        const capturarParaPDF = async (element, isBack, anchoBase, altoBase) => {
            const stage = document.createElement('div');
            stage.style.position = 'fixed';
            stage.style.left = '-9999px';
            stage.style.top = '0';
            stage.style.width = anchoBase + 'px';
            stage.style.height = altoBase + 'px';
            stage.style.overflow = 'hidden';
            stage.style.background = 'white';
            stage.style.zIndex = '-9999';

            let visual = element.querySelector('.carta-container') || element.querySelector('.carta-pro') || element.firstElementChild || element;
            
            const clone = visual.cloneNode(true);
            const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
            clone.classList.remove('selected');
            
            // BLINDAJE ANTI-BUCLE Y ANTI-VOLTEO
            clone.style.position = 'relative';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.margin = '0';
            clone.style.width = anchoBase + 'px';
            clone.style.height = altoBase + 'px';
            clone.style.boxSizing = 'border-box';
            clone.style.transform = 'none'; // Quitar rotateY
            
            // Para el dorso, si tiene la clase flipped, mostramos la parte de atrás sin rotación
            if (isBack) {
                const front = clone.querySelector('.carta-front');
                const back = clone.querySelector('.carta-back');
                if (front && back) {
                    front.style.display = 'none';
                    back.style.display = 'flex';
                    back.style.transform = 'none'; 
                    back.style.position = 'relative';
                    back.style.width = '100%';
                    back.style.height = '100%';
                }
            }
            if (isBW) clone.style.filter = 'grayscale(100%)';

            stage.appendChild(clone);
            document.body.appendChild(stage);

            await new Promise(r => setTimeout(r, 50)); // Dar tiempo de cargar fuentes

            const canvas = await html2canvas(stage, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                width: anchoBase,
                height: altoBase
            });

            document.body.removeChild(stage);
            return canvas.toDataURL('image/jpeg', 0.95);
        };

        // 1. Frentes
        if (cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, false, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        // 2. Dorsos
        if (isDuplex && cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, true, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        // 3. Fichas
        if (activeSmallTokens.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let token of activeSmallTokens) {
                const img = await capturarParaPDF(token, false, 60, 60);
                const w = 25; const h = 25;
                const col = idx % 4; const row = Math.floor(idx / 4) % 5;
                const x = 20 + col * (w + 15); const y = 20 + row * (h + 15);
                pdf.addImage(img, 'JPEG', x, y, w, h);
                idx++;
                if (idx % 20 === 0 && idx < activeSmallTokens.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        // 4. Tableros
        if (activeLargeBoards.length > 0) {
            for (let board of activeLargeBoards) {
                pdf.addPage();
                const bW = board.offsetWidth || 500;
                const bH = board.offsetHeight || 500;
                const img = await capturarParaPDF(board, false, bW, bH);
                const p = pdf.getImageProperties(img);
                let w = 180; let h = (p.height * w) / p.width;
                if (h > 260) { h = 260; w = (p.width * h) / p.height; }
                const x = (210 - w) / 2; const y = (297 - h) / 2;
                pdf.addImage(img, 'JPEG', x, y, w, h);
                await new Promise(r => setTimeout(r, 50));
            }
        }

        pdf.save('Estudio_EP_Export.pdf');
        if (printModal) printModal.style.display = 'flex';
        ocultarLoading();
        showToast("PDF generado correctamente", "success");

    } catch (error) {
        console.error("Error generando PDF:", error);
        if (document.getElementById('print-modal')) document.getElementById('print-modal').style.display = 'flex';
        ocultarLoading();
        showToast("Error: " + error.message, "error");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarProyectos();
});


// ================= MOTOR DE IMPRESIÓN PLANAR DEFINITIVO (v204.0) =================
// Sobrescribimos las funciones anteriores para usar caras planas (sin 3D)
// y evitar que html2canvas entre en bucles infinitos.

window.crearMiniaturaPreview = function(elementoOriginal, targetWidth, isBack = false, isBW = false) {
    let origW = 240;
    let origH = 330;
    let clone;

    const cartaContainer = elementoOriginal.querySelector('.carta-container');
    
    if (cartaContainer) {
        // Es una carta 3D: extraemos solo la cara frontal o trasera
        if (isBack) {
            const backContent = cartaContainer.querySelector('.carta-back');
            clone = backContent ? backContent.cloneNode(true) : cartaContainer.cloneNode(true);
        } else {
            const frontContent = cartaContainer.querySelector('.carta-front');
            clone = frontContent ? frontContent.cloneNode(true) : cartaContainer.cloneNode(true);
        }
    } else {
        // Es un tablero o ficha: extraemos el elemento visual
        let visual = elementoOriginal.querySelector('.carta-pro') || elementoOriginal.firstElementChild || elementoOriginal;
        clone = visual.cloneNode(true);
        origW = elementoOriginal.offsetWidth || 240;
        origH = elementoOriginal.offsetHeight || 330;
    }

    // Limpiar el clon
    const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
    clone.classList.remove('selected');
    clone.classList.remove('flipped'); // Asegurar que no tenga rotación

    const scale = targetWidth / origW;

    // Crear Wrapper exacto
    const wrapper = document.createElement('div');
    wrapper.style.width = targetWidth + 'px';
    wrapper.style.height = (origH * scale) + 'px';
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '6px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';

    // Forzar al clon a tener el tamaño original antes de escalar
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = origW + 'px';
    clone.style.height = origH + 'px';
    clone.style.transform = `scale(${scale})`;
    clone.style.transformOrigin = 'top left';
    clone.style.boxSizing = 'border-box';
    clone.style.margin = '0';
    
    if (isBW) clone.style.filter = 'grayscale(100%)';

    wrapper.appendChild(clone);
    return wrapper;
};

window.actualizarVistaPrevia = function() {
    const previewArea = document.getElementById('print-preview-area');
    const stats = document.getElementById('print-stats');
    if (!previewArea || !stats) return;

    const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
    const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
    const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
    const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

    const { cards, largeBoards, smallTokens } = clasificarElementos();
    let activeLargeBoards = isMosaico ? largeBoards : [];
    let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

    const totalElements = cards.length + activeLargeBoards.length + activeSmallTokens.length;
    if (totalElements === 0) { previewArea.innerHTML = '<p style="color:#666; text-align:center; width:100%; margin-top:50px;">No hay elementos.</p>'; stats.innerHTML = '0 hojas.'; return; }

    let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
    const itemsPerPage = cols * rows;
    const frontPages = Math.ceil(cards.length / itemsPerPage);
    const backPages = isDuplex ? frontPages : 0;
    const tokenPages = Math.ceil(activeSmallTokens.length / 20);
    const boardPages = activeLargeBoards.length;

    stats.innerHTML = `Cartas: <b>${cards.length}</b> | Tableros: <b>${activeLargeBoards.length}</b> | Fichas: <b>${activeSmallTokens.length}</b><br>Hojas totales: <b>${frontPages + backPages + tokenPages + boardPages}</b>`;
    previewArea.innerHTML = '';

    const targetW = size === 'large' ? 140 : (size === 'small' ? 75 : 95);

    const crearHoja = (titulo, esGrid, customCols, customRows) => {
        const div = document.createElement('div');
        div.style.cssText = `width:100%; max-width:450px; aspect-ratio:1/1.414; background:white; padding:20px; margin: 0 auto 20px auto; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.2); box-sizing:border-box; display:${esGrid ? 'grid' : 'flex'}; `;
        if (esGrid) div.style.cssText += `grid-template-columns: repeat(${customCols}, 1fr); grid-template-rows: repeat(${customRows}, 1fr); gap:10px; place-items:center;`;
        else div.style.cssText += `align-items:center; justify-content:center;`;
        
        const t = document.createElement('div');
        t.style.cssText = 'position:absolute; top:5px; left:10px; font-size:10px; color:#999; font-weight:bold; z-index:10;';
        t.innerText = titulo;
        div.appendChild(t);
        return div;
    };

    // 1. Frentes
    for (let p = 0; p < frontPages; p++) {
        const page = crearHoja(`Hoja ${p + 1} (Cartas)`, true, cols, rows);
        for (let i = 0; i < itemsPerPage; i++) {
            const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
            page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 2. Dorsos
    if (isDuplex) {
        for (let p = 0; p < backPages; p++) {
            const page = crearHoja(`Hoja ${frontPages + p + 1} (Dorsos)`, true, cols, rows);
            for (let i = 0; i < itemsPerPage; i++) {
                const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
                page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, true, isBW));
            }
            previewArea.appendChild(page);
        }
    }

    // 3. Fichas
    for (let p = 0; p < tokenPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + p + 1} (Fichas)`, true, 4, 5);
        for (let i = 0; i < 20; i++) {
            const idx = p * 20 + i; if (idx >= activeSmallTokens.length) break;
            page.appendChild(window.crearMiniaturaPreview(activeSmallTokens[idx], 50, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 4. Tableros
    for (let p = 0; p < boardPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + tokenPages + p + 1} (Tablero)`, false);
        page.appendChild(window.crearMiniaturaPreview(activeLargeBoards[p], 380, false, isBW));
        previewArea.appendChild(page);
    }
}

window.generarPDFFinal = async function() {
    try {
        mostrarLoading("Generando PDF...", "Esto puede tardar unos segundos.");
        const printModal = document.getElementById('print-modal');
        if (printModal) printModal.style.display = 'none';

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
        const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
        const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
        const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

        const { cards, largeBoards, smallTokens } = clasificarElementos();
        let activeLargeBoards = isMosaico ? largeBoards : [];
        let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

        let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
        const itemsPerPage = cols * rows;

        const capturarParaPDF = async (element, isBack, anchoBase, altoBase) => {
            // Aislamiento absoluto para evitar el bucle de html2canvas
            const stage = document.createElement('div');
            stage.style.position = 'fixed';
            stage.style.left = '-9999px';
            stage.style.top = '0';
            stage.style.width = anchoBase + 'px';
            stage.style.height = altoBase + 'px';
            stage.style.overflow = 'hidden';
            stage.style.background = 'white';

            let clone;
            const cartaContainer = element.querySelector('.carta-container');
            
            if (cartaContainer) {
                if (isBack) {
                    const back = cartaContainer.querySelector('.carta-back');
                    clone = back ? back.cloneNode(true) : cartaContainer.cloneNode(true);
                } else {
                    const front = cartaContainer.querySelector('.carta-front');
                    clone = front ? front.cloneNode(true) : cartaContainer.cloneNode(true);
                }
                clone.style.width = '100%';
                clone.style.height = '100%';
                clone.style.transform = 'none';
                clone.style.position = 'relative';
            } else {
                let visual = element.querySelector('.carta-pro') || element.firstElementChild || element;
                clone = visual.cloneNode(true);
                clone.style.width = '100%';
                clone.style.height = '100%';
                clone.style.transform = 'none';
                clone.style.position = 'relative';
            }

            const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
            clone.classList.remove('selected');
            clone.style.boxSizing = 'border-box';
            if (isBW) clone.style.filter = 'grayscale(100%)';

            stage.appendChild(clone);
            document.body.appendChild(stage);

            await new Promise(r => setTimeout(r, 50));

            const canvas = await html2canvas(stage, {
                scale: 2,
                useCors: true,
                backgroundColor: null,
                logging: false,
                width: anchoBase,
                height: altoBase
            });

            document.body.removeChild(stage);
            return canvas.toDataURL('image/jpeg', 0.95);
        };

        if (cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, false, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (isDuplex && cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, true, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeSmallTokens.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let token of activeSmallTokens) {
                const img = await capturarParaPDF(token, false, 60, 60);
                const w = 25; const h = 25;
                const col = idx % 4; const row = Math.floor(idx / 4) % 5;
                const x = 20 + col * (w + 15); const y = 20 + row * (h + 15);
                pdf.addImage(img, 'JPEG', x, y, w, h);
                idx++;
                if (idx % 20 === 0 && idx < activeSmallTokens.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeLargeBoards.length > 0) {
            for (let board of activeLargeBoards) {
                pdf.addPage();
                const bW = board.offsetWidth || 500;
                const bH = board.offsetHeight || 500;
                const img = await capturarParaPDF(board, false, bW, bH);
                const p = pdf.getImageProperties(img);
                let w = 180; let h = (p.height * w) / p.width;
                if (h > 260) { h = 260; w = (p.width * h) / p.height; }
                const x = (210 - w) / 2; const y = (297 - h) / 2;
                pdf.addImage(img, 'JPEG', x, y, w, h);
                await new Promise(r => setTimeout(r, 50));
            }
        }

        pdf.save('Estudio_EP_Export.pdf');
        if (printModal) printModal.style.display = 'flex';
        ocultarLoading();
        showToast("PDF generado correctamente", "success");

    } catch (error) {
        console.error("Error generando PDF:", error);
        if (document.getElementById('print-modal')) document.getElementById('print-modal').style.display = 'flex';
        ocultarLoading();
        showToast("Error: " + error.message, "error");
    }
};


// ================= MOTOR DE IMPRESIÓN DEFINITIVO (v206.0) =================
// Sobrescribimos para anular los !important del CSS que ocultaban los dorsos.

window.crearMiniaturaPreview = function(elementoOriginal, targetWidth, isBack = false, isBW = false) {
    let origW = 240;
    let origH = 330;
    let clone;

    const cartaContainer = elementoOriginal.querySelector('.carta-container');
    
    if (cartaContainer) {
        if (isBack) {
            const backContent = cartaContainer.querySelector('.carta-back');
            clone = backContent ? backContent.cloneNode(true) : cartaContainer.cloneNode(true);
        } else {
            const frontContent = cartaContainer.querySelector('.carta-front');
            clone = frontContent ? frontContent.cloneNode(true) : cartaContainer.cloneNode(true);
        }
    } else {
        let visual = elementoOriginal.querySelector('.carta-pro') || elementoOriginal.firstElementChild || elementoOriginal;
        clone = visual.cloneNode(true);
        origW = elementoOriginal.offsetWidth || 240;
        origH = elementoOriginal.offsetHeight || 330;
    }

    const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
    clone.classList.remove('selected');
    clone.classList.remove('flipped');

    const scale = targetWidth / origW;

    const wrapper = document.createElement('div');
    wrapper.style.width = targetWidth + 'px';
    wrapper.style.height = (origH * scale) + 'px';
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '6px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';

    // FORZAR ESTILOS CON !important PARA ANULAR EL CSS DE .carta-back
    clone.style.setProperty('position', 'absolute', 'important');
    clone.style.setProperty('top', '0', 'important');
    clone.style.setProperty('left', '0', 'important');
    clone.style.setProperty('width', origW + 'px', 'important');
    clone.style.setProperty('height', origH + 'px', 'important');
    clone.style.setProperty('transform', `scale(${scale})`, 'important'); 
    clone.style.setProperty('transform-origin', 'top left', 'important');
    clone.style.setProperty('box-sizing', 'border-box', 'important');
    clone.style.setProperty('margin', '0', 'important');
    clone.style.setProperty('backface-visibility', 'visible', 'important');
    clone.style.setProperty('-webkit-backface-visibility', 'visible', 'important');
    
    if (isBW) clone.style.setProperty('filter', 'grayscale(100%)', 'important');

    wrapper.appendChild(clone);
    return wrapper;
};

window.actualizarVistaPrevia = function() {
    const previewArea = document.getElementById('print-preview-area');
    const stats = document.getElementById('print-stats');
    if (!previewArea || !stats) return;

    const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
    const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
    const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
    const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

    const { cards, largeBoards, smallTokens } = clasificarElementos();
    let activeLargeBoards = isMosaico ? largeBoards : [];
    let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

    const totalElements = cards.length + activeLargeBoards.length + activeSmallTokens.length;
    if (totalElements === 0) { previewArea.innerHTML = '<p style="color:#666; text-align:center; width:100%; margin-top:50px;">No hay elementos.</p>'; stats.innerHTML = '0 hojas.'; return; }

    let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
    const itemsPerPage = cols * rows;
    const frontPages = Math.ceil(cards.length / itemsPerPage);
    const backPages = isDuplex ? frontPages : 0;
    const tokenPages = Math.ceil(activeSmallTokens.length / 20);
    const boardPages = activeLargeBoards.length;

    stats.innerHTML = `Cartas: <b>${cards.length}</b> | Tableros: <b>${activeLargeBoards.length}</b> | Fichas: <b>${activeSmallTokens.length}</b><br>Hojas totales: <b>${frontPages + backPages + tokenPages + boardPages}</b>`;
    previewArea.innerHTML = '';

    // Aumentamos el tamaño base de las cartas para que se vean mejor
    const targetW = size === 'large' ? 170 : (size === 'small' ? 90 : 130);

    const crearHoja = (titulo, esGrid, customCols, customRows) => {
        const div = document.createElement('div');
        div.style.cssText = `width:100%; max-width:500px; aspect-ratio:1/1.414; background:white; padding:20px; margin: 0 auto 20px auto; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.2); box-sizing:border-box; display:${esGrid ? 'grid' : 'flex'}; `;
        if (esGrid) div.style.cssText += `grid-template-columns: repeat(${customCols}, 1fr); grid-template-rows: repeat(${customRows}, 1fr); gap:10px; place-items:center;`;
        else div.style.cssText += `align-items:center; justify-content:center;`;
        
        const t = document.createElement('div');
        t.style.cssText = 'position:absolute; top:5px; left:10px; font-size:10px; color:#999; font-weight:bold; z-index:10;';
        t.innerText = titulo;
        div.appendChild(t);
        return div;
    };

    // 1. Frentes
    for (let p = 0; p < frontPages; p++) {
        const page = crearHoja(`Hoja ${p + 1} (Cartas)`, true, cols, rows);
        for (let i = 0; i < itemsPerPage; i++) {
            const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
            page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 2. Dorsos
    if (isDuplex) {
        for (let p = 0; p < backPages; p++) {
            const page = crearHoja(`Hoja ${frontPages + p + 1} (Dorsos)`, true, cols, rows);
            for (let i = 0; i < itemsPerPage; i++) {
                const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
                page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, true, isBW));
            }
            previewArea.appendChild(page);
        }
    }

    // 3. Fichas
    for (let p = 0; p < tokenPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + p + 1} (Fichas)`, true, 4, 5);
        for (let i = 0; i < 20; i++) {
            const idx = p * 20 + i; if (idx >= activeSmallTokens.length) break;
            page.appendChild(window.crearMiniaturaPreview(activeSmallTokens[idx], 60, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 4. Tableros
    for (let p = 0; p < boardPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + tokenPages + p + 1} (Tablero)`, false);
        page.appendChild(window.crearMiniaturaPreview(activeLargeBoards[p], 420, false, isBW));
        previewArea.appendChild(page);
    }
}

window.generarPDFFinal = async function() {
    try {
        mostrarLoading("Generando PDF...", "Esto puede tardar unos segundos.");
        const printModal = document.getElementById('print-modal');
        if (printModal) printModal.style.display = 'none';

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
        const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
        const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
        const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

        const { cards, largeBoards, smallTokens } = clasificarElementos();
        let activeLargeBoards = isMosaico ? largeBoards : [];
        let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

        let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
        const itemsPerPage = cols * rows;

        const capturarParaPDF = async (element, isBack, anchoBase, altoBase) => {
            const stage = document.createElement('div');
            stage.style.position = 'fixed';
            stage.style.left = '-9999px';
            stage.style.top = '0';
            stage.style.width = anchoBase + 'px';
            stage.style.height = altoBase + 'px';
            stage.style.overflow = 'hidden';
            stage.style.background = 'white';

            let clone;
            const cartaContainer = element.querySelector('.carta-container');
            
            if (cartaContainer) {
                if (isBack) {
                    const back = cartaContainer.querySelector('.carta-back');
                    clone = back ? back.cloneNode(true) : cartaContainer.cloneNode(true);
                } else {
                    const front = cartaContainer.querySelector('.carta-front');
                    clone = front ? front.cloneNode(true) : cartaContainer.cloneNode(true);
                }
            } else {
                let visual = element.querySelector('.carta-pro') || element.firstElementChild || element;
                clone = visual.cloneNode(true);
            }

            const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
            clone.classList.remove('selected');
            clone.classList.remove('flipped');
            
            // FORZAR ESTILOS CON !important
            clone.style.setProperty('position', 'relative', 'important');
            clone.style.setProperty('top', 'auto', 'important');
            clone.style.setProperty('left', 'auto', 'important');
            clone.style.setProperty('margin', '0', 'important');
            clone.style.setProperty('width', anchoBase + 'px', 'important');
            clone.style.setProperty('height', altoBase + 'px', 'important');
            clone.style.setProperty('transform', 'none', 'important'); 
            clone.style.setProperty('box-sizing', 'border-box', 'important');
            clone.style.setProperty('backface-visibility', 'visible', 'important');
            clone.style.setProperty('-webkit-backface-visibility', 'visible', 'important');
            
            if (isBW) clone.style.setProperty('filter', 'grayscale(100%)', 'important');

            stage.appendChild(clone);
            document.body.appendChild(stage);

            await new Promise(r => setTimeout(r, 50));

            const canvas = await html2canvas(stage, {
                scale: 2,
                useCors: true,
                backgroundColor: null,
                logging: false,
                width: anchoBase,
                height: altoBase
            });

            document.body.removeChild(stage);
            return canvas.toDataURL('image/jpeg', 0.95);
        };

        if (cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, false, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (isDuplex && cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, true, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeSmallTokens.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let token of activeSmallTokens) {
                const img = await capturarParaPDF(token, false, 60, 60);
                const w = 25; const h = 25;
                const col = idx % 4; const row = Math.floor(idx / 4) % 5;
                const x = 20 + col * (w + 15); const y = 20 + row * (h + 15);
                pdf.addImage(img, 'JPEG', x, y, w, h);
                idx++;
                if (idx % 20 === 0 && idx < activeSmallTokens.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeLargeBoards.length > 0) {
            for (let board of activeLargeBoards) {
                pdf.addPage();
                const bW = board.offsetWidth || 500;
                const bH = board.offsetHeight || 500;
                const img = await capturarParaPDF(board, false, bW, bH);
                const p = pdf.getImageProperties(img);
                let w = 180; let h = (p.height * w) / p.width;
                if (h > 260) { h = 260; w = (p.width * h) / p.height; }
                const x = (210 - w) / 2; const y = (297 - h) / 2;
                pdf.addImage(img, 'JPEG', x, y, w, h);
                await new Promise(r => setTimeout(r, 50));
            }
        }

        pdf.save('Estudio_EP_Export.pdf');
        if (printModal) printModal.style.display = 'flex';
        ocultarLoading();
        showToast("PDF generado correctamente", "success");

    } catch (error) {
        console.error("Error generando PDF:", error);
        if (document.getElementById('print-modal')) document.getElementById('print-modal').style.display = 'flex';
        ocultarLoading();
        showToast("Error: " + error.message, "error");
    }
};


// ================= NAVEGACIÓN DE PESTAÑAS (v209.0) =================
function switchTool(tabName, btn) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.tool-content').forEach(el => el.classList.remove('active'));
    // Quitar clase activa a todos los botones
    document.querySelectorAll('.tool-tab').forEach(el => el.classList.remove('active'));
    
    // Mostrar el contenido seleccionado y activar el botón
    const targetContent = document.getElementById('tool-' + tabName);
    if(targetContent) targetContent.classList.add('active');
    if(btn) btn.classList.add('active');
}


// ================= MOTOR DE IMPRESIÓN DEFINITIVO (v220.0) =================
// Sobrescribimos para ignorar el scroll, forzar tamaños y mantener colores.

window.crearMiniaturaPreview = function(elementoOriginal, targetWidth, isBack = false, isBW = false) {
    let origW = 240;
    let origH = 330;
    let clone;

    const cartaContainer = elementoOriginal.querySelector('.carta-container');

    if (cartaContainer) {
        if (isBack) {
            const backContent = cartaContainer.querySelector('.carta-back');
            clone = backContent ? backContent.cloneNode(true) : cartaContainer.cloneNode(true);
        } else {
            const frontContent = cartaContainer.querySelector('.carta-front');
            clone = frontContent ? frontContent.cloneNode(true) : cartaContainer.cloneNode(true);
        }
    } else {
        let visual = elementoOriginal.querySelector('.carta-pro') || elementoOriginal.firstElementChild || elementoOriginal;
        clone = visual.cloneNode(true);
        origW = elementoOriginal.offsetWidth || 240;
        origH = elementoOriginal.offsetHeight || 330;
    }

    const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
    clone.classList.remove('selected');
    clone.classList.remove('flipped');

    const scale = targetWidth / origW;

    const wrapper = document.createElement('div');
    wrapper.style.width = targetWidth + 'px';
    wrapper.style.height = (origH * scale) + 'px';
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '6px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';

    // FORZAR ESTILOS CON !important PARA ANULAR EL CSS Y EL SCROLL
    clone.style.setProperty('position', 'absolute', 'important');
    clone.style.setProperty('top', '0', 'important');
    clone.style.setProperty('left', '0', 'important');
    clone.style.setProperty('width', origW + 'px', 'important');
    clone.style.setProperty('height', origH + 'px', 'important');
    clone.style.setProperty('transform', `scale(${scale})`, 'important');
    clone.style.setProperty('transform-origin', 'top left', 'important');
    clone.style.setProperty('box-sizing', 'border-box', 'important');
    clone.style.setProperty('margin', '0', 'important');
    clone.style.setProperty('overflow', 'hidden', 'important'); // APAGA EL SCROLL
    clone.style.setProperty('backface-visibility', 'visible', 'important');
    clone.style.setProperty('-webkit-backface-visibility', 'visible', 'important');

    if (isBW) clone.style.setProperty('filter', 'grayscale(100%)', 'important');

    wrapper.appendChild(clone);
    return wrapper;
};

window.actualizarVistaPrevia = function() {
    const previewArea = document.getElementById('print-preview-area');
    const stats = document.getElementById('print-stats');
    if (!previewArea || !stats) return;

    const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
    const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
    const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
    const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

    const { cards, largeBoards, smallTokens } = clasificarElementos();
    let activeLargeBoards = isMosaico ? largeBoards : [];
    let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

    const totalElements = cards.length + activeLargeBoards.length + activeSmallTokens.length;
    if (totalElements === 0) { previewArea.innerHTML = '<p style="color:#666; text-align:center; width:100%; margin-top:50px;">No hay elementos.</p>'; stats.innerHTML = '0 hojas.'; return; }

    let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
    const itemsPerPage = cols * rows;
    const frontPages = Math.ceil(cards.length / itemsPerPage);
    const backPages = isDuplex ? frontPages : 0;
    const tokenPages = Math.ceil(activeSmallTokens.length / 20);
    const boardPages = activeLargeBoards.length;

    stats.innerHTML = `Cartas: <b>${cards.length}</b> | Tableros: <b>${activeLargeBoards.length}</b> | Fichas: <b>${activeSmallTokens.length}</b><br>Hojas totales: <b>${frontPages + backPages + tokenPages + boardPages}</b>`;
    previewArea.innerHTML = '';

    const targetW = size === 'large' ? 170 : (size === 'small' ? 90 : 130);

    const crearHoja = (titulo, esGrid, customCols, customRows) => {
        const div = document.createElement('div');
        div.style.cssText = `width:100%; max-width:500px; aspect-ratio:1/1.414; background:white; padding:20px; margin: 0 auto 20px auto; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.2); box-sizing:border-box; display:${esGrid ? 'grid' : 'flex'}; `;
        if (esGrid) div.style.cssText += `grid-template-columns: repeat(${customCols}, 1fr); grid-template-rows: repeat(${customRows}, 1fr); gap:10px; place-items:center;`;
        else div.style.cssText += `align-items:center; justify-content:center;`;

        const t = document.createElement('div');
        t.style.cssText = 'position:absolute; top:5px; left:10px; font-size:10px; color:#999; font-weight:bold; z-index:10;';
        t.innerText = titulo;
        div.appendChild(t);
        return div;
    };

    // 1. Frentes
    for (let p = 0; p < frontPages; p++) {
        const page = crearHoja(`Hoja ${p + 1} (Cartas)`, true, cols, rows);
        for (let i = 0; i < itemsPerPage; i++) {
            const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
            page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 2. Dorsos
    if (isDuplex) {
        for (let p = 0; p < backPages; p++) {
            const page = crearHoja(`Hoja ${frontPages + p + 1} (Dorsos)`, true, cols, rows);
            for (let i = 0; i < itemsPerPage; i++) {
                const idx = p * itemsPerPage + i; if (idx >= cards.length) break;
                page.appendChild(window.crearMiniaturaPreview(cards[idx], targetW, true, isBW));
            }
            previewArea.appendChild(page);
        }
    }

    // 3. Fichas
    for (let p = 0; p < tokenPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + p + 1} (Fichas)`, true, 4, 5);
        for (let i = 0; i < 20; i++) {
            const idx = p * 20 + i; if (idx >= activeSmallTokens.length) break;
            page.appendChild(window.crearMiniaturaPreview(activeSmallTokens[idx], 60, false, isBW));
        }
        previewArea.appendChild(page);
    }

    // 4. Tableros Complejos
    for (let p = 0; p < boardPages; p++) {
        const page = crearHoja(`Hoja ${frontPages + backPages + tokenPages + p + 1} (Tablero)`, false);
        
        // Calculamos escala proporcional para que el tablero quepa en la hoja
        const bW = activeLargeBoards[p].offsetWidth || 500;
        const bH = activeLargeBoards[p].offsetHeight || 500;
        const scale = Math.min(420 / bW, 550 / bH, 1);

        const boardDiv = document.createElement('div');
        boardDiv.style.width = (bW * scale) + 'px';
        boardDiv.style.height = (bH * scale) + 'px';
        boardDiv.style.position = 'relative';
        boardDiv.style.overflow = 'hidden';

        const clone = activeLargeBoards[p].cloneNode(true);
        const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
        clone.classList.remove('selected');
        clone.style.setProperty('position', 'absolute', 'important'); 
        clone.style.setProperty('top', '0', 'important'); 
        clone.style.setProperty('left', '0', 'important'); 
        clone.style.setProperty('margin', '0', 'important');
        clone.style.setProperty('transform', `scale(${scale})`, 'important');
        clone.style.setProperty('transform-origin', 'top left', 'important');
        clone.style.setProperty('overflow', 'hidden', 'important');
        
        if (isBW) clone.style.filter = 'grayscale(100%)';

        boardDiv.appendChild(clone);
        page.appendChild(boardDiv);
        previewArea.appendChild(page);
    }
}

window.generarPDFFinal = async function() {
    try {
        mostrarLoading("Generando PDF...", "Optimizando tamaños y colores...");
        const printModal = document.getElementById('print-modal');
        if (printModal) printModal.style.display = 'none';

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        const size = document.getElementById('print-size') ? document.getElementById('print-size').value : 'medium';
        const isBW = document.getElementById('print-bw') ? document.getElementById('print-bw').checked : false;
        const isDuplex = document.getElementById('print-dorsos') ? document.getElementById('print-dorsos').checked : false;
        const isMosaico = document.getElementById('print-mosaico') ? document.getElementById('print-mosaico').checked : false;

        const { cards, largeBoards, smallTokens } = clasificarElementos();
        let activeLargeBoards = isMosaico ? largeBoards : [];
        let activeSmallTokens = isMosaico ? smallTokens : [...smallTokens, ...largeBoards];

        let cols = 3, rows = 3; if (size === 'small') { cols = 4; rows = 3; } if (size === 'large') { cols = 2; rows = 2; }
        const itemsPerPage = cols * rows;

        const capturarParaPDF = async (element, isBack, anchoBase, altoBase) => {
            const stage = document.createElement('div');
            stage.style.position = 'fixed';
            stage.style.left = '-9999px';
            stage.style.top = '0';
            stage.style.width = anchoBase + 'px';
            stage.style.height = altoBase + 'px';
            stage.style.overflow = 'hidden';
            stage.style.background = 'white';

            let clone;
            const cartaContainer = element.querySelector('.carta-container');

            if (cartaContainer) {
                if (isBack) {
                    const back = cartaContainer.querySelector('.carta-back');
                    clone = back ? back.cloneNode(true) : cartaContainer.cloneNode(true);
                } else {
                    const front = cartaContainer.querySelector('.carta-front');
                    clone = front ? front.cloneNode(true) : cartaContainer.cloneNode(true);
                }
            } else {
                let visual = element.querySelector('.carta-pro') || element.firstElementChild || element;
                clone = visual.cloneNode(true);
            }

            const menu = clone.querySelector('.floating-actions'); if(menu) menu.remove();
            clone.classList.remove('selected');
            clone.classList.remove('flipped');

            // FORZAR ESTILOS PLANOS Y SIN SCROLL
            clone.style.setProperty('position', 'relative', 'important');
            clone.style.setProperty('top', 'auto', 'important');
            clone.style.setProperty('left', 'auto', 'important');
            clone.style.setProperty('margin', '0', 'important');
            clone.style.setProperty('width', anchoBase + 'px', 'important');
            clone.style.setProperty('height', altoBase + 'px', 'important');
            clone.style.setProperty('transform', 'none', 'important');
            clone.style.setProperty('box-sizing', 'border-box', 'important');
            clone.style.setProperty('overflow', 'hidden', 'important'); // Previene bucle infinito
            clone.style.setProperty('background', '#ffffff', 'important'); // Fuerza fondo blanco sólido

            // Forzar que los hijos con scroll se muestren completos
            clone.querySelectorAll('*').forEach(child => {
                if (child.style.overflow === 'auto' || child.style.overflowY === 'auto') {
                    child.style.setProperty('overflow', 'hidden', 'important');
                }
            });

            if (isBW) clone.style.setProperty('filter', 'grayscale(100%)', 'important');

            stage.appendChild(clone);
            document.body.appendChild(stage);

            await new Promise(r => setTimeout(r, 50));

            const canvas = await html2canvas(stage, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: anchoBase,
                height: altoBase,
                scrollX: 0,
                scrollY: 0
            });

            document.body.removeChild(stage);
            return canvas.toDataURL('image/jpeg', 0.95);
        };

        if (cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, false, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (isDuplex && cards.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let item of cards) {
                const img = await capturarParaPDF(item, true, 240, 330);
                const width = 63.5; const height = 88;
                const col = idx % cols; const row = Math.floor(idx / cols);
                const offsetX = (210 - (cols * (width + 5))) / 2;
                const offsetY = (297 - (rows * (height + 5))) / 2;
                const x = offsetX + col * (width + 5); const y = offsetY + row * (height + 5);
                pdf.addImage(img, 'JPEG', x, y, width, height);
                idx++;
                if (idx % itemsPerPage === 0 && idx < cards.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeSmallTokens.length > 0) {
            pdf.addPage();
            let idx = 0;
            for (let token of activeSmallTokens) {
                const img = await capturarParaPDF(token, false, 60, 60);
                const w = 25; const h = 25;
                const col = idx % 4; const row = Math.floor(idx / 4) % 5;
                const x = 20 + col * (w + 15); const y = 20 + row * (h + 15);
                pdf.addImage(img, 'JPEG', x, y, w, h);
                idx++;
                if (idx % 20 === 0 && idx < activeSmallTokens.length) pdf.addPage();
                await new Promise(r => setTimeout(r, 50));
            }
        }

        if (activeLargeBoards.length > 0) {
            for (let board of activeLargeBoards) {
                pdf.addPage();
                const bW = board.offsetWidth || 500;
                const bH = board.offsetHeight || 500;
                const img = await capturarParaPDF(board, false, bW, bH);
                const p = pdf.getImageProperties(img);
                let w = 180; let h = (p.height * w) / p.width;
                if (h > 260) { h = 260; w = (p.width * h) / p.height; }
                const x = (210 - w) / 2; const y = (297 - h) / 2;
                pdf.addImage(img, 'JPEG', x, y, w, h);
                await new Promise(r => setTimeout(r, 50));
            }
        }

        pdf.save('Estudio_EP_Export.pdf');
        if (printModal) printModal.style.display = 'flex';
        ocultarLoading();
        showToast("PDF generado correctamente", "success");

    } catch (error) {
        console.error("Error generando PDF:", error);
        if (document.getElementById('print-modal')) document.getElementById('print-modal').style.display = 'flex';
        ocultarLoading();
        showToast("Error: " + error.message, "error");
    }
};