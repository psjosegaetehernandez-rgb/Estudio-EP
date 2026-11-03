let currentProjectId = null;
let proyectos = JSON.parse(localStorage.getItem('ep_proyectos_v102')) || [];
let autosaveTimer = null;
let modalCallback = null;

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    const confirmBtn = document.getElementById('modal-confirm-btn');
    if(confirmBtn) confirmBtn.onclick = () => { if (modalCallback) modalCallback(); closeModal(); };
});

function showToast(msg, type='info') {
    const c = document.getElementById('toast-container');
    if(!c) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    t.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, 3000);
}

function showConfirm(message, callback) {
    document.getElementById('modal-message').innerText = message;
    document.getElementById('modal-overlay').classList.add('active');
    modalCallback = callback;
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); modalCallback = null; }

function renderDashboard() {
    const grid = document.getElementById('projects-list');
    if(!grid) return;
    grid.innerHTML = '';
    if (proyectos.length === 0) { grid.innerHTML = '<p style="text-align:center; width:100%; color:#64748b;">No hay proyectos.</p>'; return; }
    proyectos.forEach(p => {
        let imgHtml = `<div class="project-thumbnail" style="display:flex;align-items:center;justify-content:center;color:#94a3b8; background:#f8fafc;"><i class="fa-solid fa-image" style="font-size:32px;"></i></div>`;
        if(p.thumbnail) imgHtml = `<img src="${p.thumbnail}" class="project-thumbnail">`;
        grid.innerHTML += `<div class="project-card" onclick="abrirProyecto('${p.id}')">${imgHtml}<div style="padding:15px;"><h3 style="margin-bottom:5px; font-family:'Playfair Display';">${p.nombre}</h3><p style="font-size:12px; color:#64748b;">Haz clic para editar</p></div></div>`;
    });
}

function crearNuevoProyecto() {
    const nombre = prompt("Nombre del proyecto:", "Nuevo Proyecto");
    if(!nombre) return;
    const nuevo = { id: 'proj_' + Date.now(), nombre: nombre, html: '', canvasBg: null, canvasClass: 'canvas-area' };
    proyectos.push(nuevo);
    guardarEnLocalStorage();
    abrirProyecto(nuevo.id);
}

function abrirProyecto(id) {
    currentProjectId = id;
    const proyecto = proyectos.find(p => p.id === id);
    if(!proyecto) return;

    document.getElementById('project-title-input').value = proyecto.nombre;
    document.getElementById('dashboard-view').classList.remove('active');
    document.getElementById('editor-view').classList.add('active');
    
    const canvas = document.getElementById('canvas');
    if (proyecto.html) {
        canvas.innerHTML = proyecto.html;
        let oldImg = document.getElementById('mapa-fondo-img');
        if(oldImg) oldImg.remove();
        if (proyecto.canvasBg && proyecto.canvasBg.startsWith('data:image')) {
            const img = document.createElement('img');
            img.id = 'mapa-fondo-img'; img.src = proyecto.canvasBg;
            img.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; z-index:0; pointer-events:none;';
            canvas.insertBefore(img, canvas.firstChild);
        }
        canvas.className = proyecto.canvasClass || 'canvas-area';

        document.querySelectorAll('.canvas-element, .doc-element').forEach(el => {
            if(typeof hacerArrastrable === 'function') hacerArrastrable(el);
            if (el.querySelector('.carta-container')) {
                el.addEventListener('dblclick', (e) => { 
                    if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
                        el.querySelector('.carta-container').classList.toggle('flipped'); autosave();
                    }
                });
            }
            if(el.classList.contains('token-wrapper') && typeof configurarToken === 'function') configurarToken(el);
        });
    } else {
        canvas.innerHTML = '<svg id="canvas-svg" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;"></svg><div class="canvas-hint" id="canvas-hint">Usa el menú izquierdo para añadir elementos.</div>';
        canvas.className = 'canvas-area';
    }
}

function volverAlDashboard() {
    if(document.body.classList.contains('preview-mode') && typeof toggleVistaPrevia === 'function') toggleVistaPrevia();
    try { guardarEnLocalStorage(); } catch (e) {}
    document.getElementById('editor-view').classList.remove('active');
    document.getElementById('dashboard-view').classList.add('active');
    currentProjectId = null; renderDashboard();
}

function guardarEnLocalStorage() { 
    if(currentProjectId) {
        const proyecto = proyectos.find(p => p.id === currentProjectId);
        const canvas = document.getElementById('canvas');
        proyecto.html = canvas.innerHTML;
        proyecto.nombre = document.getElementById('project-title-input').value;
        const mapaImg = document.getElementById('mapa-fondo-img');
        proyecto.canvasBg = mapaImg ? mapaImg.src : null;
        proyecto.canvasClass = canvas.className;
        localStorage.setItem('ep_proyectos_v102', JSON.stringify(proyectos));
        
        if(canvas.querySelector('.canvas-element, .doc-element') && typeof html2canvas !== 'undefined') {
            setTimeout(() => {
                try {
                    html2canvas(canvas, { scale: 0.1, backgroundColor: '#ffffff', logging: false }).then(smallCanvas => {
                        proyecto.thumbnail = smallCanvas.toDataURL('image/jpeg', 0.5);
                        localStorage.setItem('ep_proyectos_v102', JSON.stringify(proyectos));
                    });
                } catch(e) {}
            }, 500);
        }
    } else { localStorage.setItem('ep_proyectos_v102', JSON.stringify(proyectos)); }
}

function autosave() {
    clearTimeout(autosaveTimer);
    const status = document.getElementById('autosave-status');
    if(status) status.innerText = 'Guardando...';
    autosaveTimer = setTimeout(() => { 
        guardarEnLocalStorage(); 
        if(status) { const now = new Date(); status.innerText = 'Guardado ✔ ' + now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0'); }
    }, 1500);
}

function actualizarTituloProyecto(nuevoTitulo) {
    if(!currentProjectId) return;
    const proyecto = proyectos.find(p => p.id === currentProjectId);
    proyecto.nombre = nuevoTitulo; guardarEnLocalStorage();
}

function toggleVistaPrevia() {
    document.body.classList.toggle('preview-mode');
    const icon = document.querySelector('button[onclick="toggleVistaPrevia()"] i');
    if(icon) icon.className = document.body.classList.contains('preview-mode') ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
}

function toggleTema() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('button[onclick="toggleTema()"] i');
    if(icon) icon.className = document.body.classList.contains('dark-mode') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function limpiarLienzo() {
    showConfirm("¿Borrar todo el contenido del lienzo?", () => {
        const canvas = document.getElementById('canvas');
        Array.from(canvas.children).forEach(c => { if(c.id !== 'canvas-svg' && c.id !== 'canvas-hint') c.remove(); });
        showToast("Lienzo limpio", "success"); autosave();
    });
}

function descargarJSON() {
    if(!currentProjectId) return;
    const proyecto = proyectos.find(p => p.id === currentProjectId);
    const blob = new Blob([JSON.stringify(proyecto, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = proyecto.nombre + '.json'; a.click();
    showToast("JSON exportado", "success");
}

function toggleMesa() {
    const canvas = document.getElementById('canvas');
    if(canvas.dataset.mesa === 'madera') {
        canvas.style.background = '#1e293b'; canvas.style.backgroundImage = 'radial-gradient(#475569 1px, transparent 1px)';
        canvas.dataset.mesa = 'fieltro'; showToast("Mesa de Fieltro", "info");
    } else {
        canvas.style.background = ''; canvas.style.backgroundImage = '';
        canvas.dataset.mesa = 'madera'; showToast("Mesa de Madera", "info");
    }
}

function toggleSoundboard() { if(typeof playSound === 'function') playSound('pop'); showToast("Sonido de prueba", "info"); }
function abrirRuleta() { document.getElementById('modal-ruleta').classList.add('active'); girarRuleta(); }
function girarRuleta() {
    const wheel = document.getElementById('ruleta-wheel'); if(!wheel) return;
    wheel.style.background = 'conic-gradient(#ef4444 0 60deg, #3b82f6 60deg 120deg, #eab308 120deg 180deg, #22c55e 180deg 240deg, #a855f7 240deg 300deg, #f97316 300deg 360deg)';
    const randomDeg = Math.floor(Math.random() * 360) + 1440; wheel.style.transform = `rotate(${randomDeg}deg)`;
}
function activarPanico() { document.getElementById('pantalla-panico').style.display = 'flex'; }

function abrirVistaPrevia() { document.getElementById('print-modal').style.display = 'flex'; actualizarVistaPrevia(); }
function cerrarVistaPrevia() { document.getElementById('print-modal').style.display = 'none'; }

function esElementoCarta(el) {
    return el.querySelector('.carta-container') || el.querySelector('.carta-uno') || el.querySelector('.carta-rol') || 
           el.querySelector('.carta-evento') || el.querySelector('.carta-conversacional') || el.querySelector('.carta-memoria') || 
           el.querySelector('.carta-dilema') || el.querySelector('.carta-dixit') || el.querySelector('.carta-drafting') || 
           el.querySelector('.carta-charada') || el.querySelector('.carta-tetralema') || el.querySelector('.carta-naipe') || 
           el.querySelector('.carta-duo');
}

function actualizarVistaPrevia() {
    const size = document.getElementById('print-size').value;
    const isBW = document.getElementById('print-bw').checked;
    const isEco = document.getElementById('print-eco') ? document.getElementById('print-eco').checked : false;
    const isDuplex = document.getElementById('print-dorsos').checked;
    const previewArea = document.getElementById('print-preview-area'); previewArea.innerHTML = '';

    const elements = Array.from(document.querySelectorAll('#canvas > .canvas-element, #canvas > .doc-element')).filter(el => el.offsetWidth > 0);
    const cards = elements.filter(el => esElementoCarta(el));
    const others = elements.filter(el => !esElementoCarta(el));

    if(elements.length === 0) { previewArea.innerHTML = '<p style="color:#666; text-align:center; width:100%; margin-top:50px;">No hay elementos en el lienzo.</p>'; document.getElementById('print-stats').innerText = '0 hojas necesarias.'; return; }

    let cols = 3, rows = 3; if(size === 'small') { cols = 4; rows = 3; } if(size === 'large') { cols = 2; rows = 2; }

    const itemsPerPage = cols * rows;
    const frontPages = Math.ceil(cards.length / itemsPerPage);
    const backPages = isDuplex ? frontPages : 0;
    const otherPages = Math.ceil(others.length / itemsPerPage);

    document.getElementById('print-stats').innerHTML = `Cartas: <b>${cards.length}</b> | Otros: <b>${others.length}</b><br>Hojas totales: <b>${frontPages + backPages + otherPages}</b>`;

    function crearHoja(titulo, cols, rows) {
        const pageDiv = document.createElement('div');
        pageDiv.style.cssText = `width:100%; max-width:500px; aspect-ratio:1/1.414; background:white; display:grid; grid-template-columns:repeat(${cols},1fr); grid-template-rows:repeat(${rows},1fr); gap:5px; padding:20px; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.2);`;
        const title = document.createElement('div'); title.style.cssText = 'position:absolute; top:2px; left:5px; font-size:10px; color:#999;'; title.innerText = titulo; pageDiv.appendChild(title);
        for (let i = 0; i < cols * rows; i++) { const cell = document.createElement('div'); cell.style.cssText = 'width:100%; height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative;'; pageDiv.appendChild(cell); }
        return pageDiv;
    }

    function clonarVisual(el, isBW, isEco, isBack = false) {
        const clone = el.cloneNode(true);
        clone.style.position = 'relative'; clone.style.left = '0'; clone.style.top = '0';
        clone.style.margin = '0'; clone.style.transform = 'scale(0.25)'; clone.style.transformOrigin = 'center center';
        clone.style.boxShadow = 'none'; clone.style.cursor = 'default';
        if (isBW) clone.style.filter = 'grayscale(100%)';
        if (isEco) clone.classList.add('eco-mode-filter');

        if (isBack) {
            const inner = clone.querySelector('.carta-inner');
            if (inner) { inner.style.transform = 'rotateY(180deg)'; const front = clone.querySelector('.carta-front'); if (front) front.style.display = 'none'; }
            else {
                const dorso = clone.querySelector('.dorso-universal');
                if (dorso) { Array.from(clone.children).forEach(child => { if(!child.classList.contains('dorso-universal')) child.style.display = 'none'; }); dorso.style.display = 'flex'; }
            }
        }
        return clone;
    }

    for(let p=0; p<frontPages; p++) {
        const page = crearHoja(`Hoja ${p+1} - Frentes`, cols, rows); const cells = page.querySelectorAll('div:not(:first-child)');
        for(let i=0; i<itemsPerPage; i++) { const idx = p * itemsPerPage + i; if(idx >= cards.length) break; cells[i].appendChild(clonarVisual(cards[idx], isBW, isEco, false)); }
        previewArea.appendChild(page);
    }

    if (isDuplex) {
        for(let p=0; p<backPages; p++) {
            const page = crearHoja(`Hoja ${frontPages+p+1} - Dorsos`, cols, rows); const cells = Array.from(page.querySelectorAll('div:not(:first-child)'));
            for(let i=0; i<itemsPerPage; i++) {
                const idx = p * itemsPerPage + i; if(idx >= cards.length) break;
                const col = (cols - 1) - (i % cols); const row = Math.floor(i / cols); const gridIdx = row * cols + col;
                cells[gridIdx].appendChild(clonarVisual(cards[idx], isBW, isEco, true));
            }
            previewArea.appendChild(page);
        }
    }

    for(let p=0; p<otherPages; p++) {
        const page = crearHoja(`Hoja ${frontPages+backPages+p+1} - Otros`, cols, rows); const cells = page.querySelectorAll('div:not(:first-child)');
        for(let i=0; i<itemsPerPage; i++) { const idx = p * itemsPerPage + i; if(idx >= others.length) break; const clone = clonarVisual(others[idx], isBW, isEco, false); clone.style.transform = 'scale(0.15)'; cells[i].appendChild(clone); }
        previewArea.appendChild(page);
    }
}

async function generarPDFFinal() {
    const elements = Array.from(document.querySelectorAll('#canvas > .canvas-element, #canvas > .doc-element')).filter(el => el.offsetWidth > 0);
    if(elements.length === 0) return;
    const size = document.getElementById('print-size').value; 
    const isBW = document.getElementById('print-bw').checked; 
    const isEco = document.getElementById('print-eco') ? document.getElementById('print-eco').checked : false;
    const isDuplex = document.getElementById('print-dorsos').checked;
    cerrarVistaPrevia(); showToast("Generando PDF... (Esto puede tardar)", "info");
    const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
    let cols = 3, rows = 3; if(size === 'small') { cols = 4; rows = 3; } if(size === 'large') { cols = 2; rows = 2; }
    const margin = 10, availW = 190, availH = 277; const cellW = availW / cols, cellH = availH / rows; const itemsPerPage = cols * rows;

    async function capturar(el, isBack = false) {
        let target = el; if (el.querySelector('.carta-container') || el.classList.contains('carta-container')) target = el.classList.contains('carta-container') ? el : el.querySelector('.carta-container');
        const clone = target.cloneNode(true);
        clone.style.position = 'relative'; clone.style.left = '0'; clone.style.top = '0'; clone.style.margin = '0'; clone.style.transform = 'none'; clone.style.boxShadow = 'none';
        
        if (isBack && clone.querySelector('.carta-inner')) {
            const front = clone.querySelector('.carta-front'); const back = clone.querySelector('.carta-back'); if(front) front.style.display = 'none'; if(back) back.style.display = 'flex';
        } else if (isBack) {
            const dorso = clone.querySelector('.dorso-universal');
            if (dorso) { Array.from(clone.children).forEach(child => { if(!child.classList.contains('dorso-universal')) child.style.display = 'none'; }); dorso.style.display = 'flex'; }
            else { const whiteCanvas = document.createElement('canvas'); whiteCanvas.width = 260; whiteCanvas.height = 380; const ctx = whiteCanvas.getContext('2d'); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 260, 380); return whiteCanvas.toDataURL('image/jpeg', 0.95); }
        }
        
        const temp = document.createElement('div'); temp.style.cssText = 'position:absolute; left:-9999px; top:-9999px; background:white;';
        if(target.classList.contains('carta-container')) temp.style.cssText += 'width:260px; height:380px;';
        if(isBW) temp.style.filter = 'grayscale(100%)';
        if(isEco) temp.classList.add('eco-mode-filter');
        temp.appendChild(clone); document.body.appendChild(temp);
        const canvasImg = await html2canvas(clone, { scale: 2, backgroundColor:'#fff', useCORS:true });
        document.body.removeChild(temp); return canvasImg.toDataURL('image/jpeg', 0.95);
    }

    async function añadir(imgData, index, mirror=false) {
        if (index > 0 && index % itemsPerPage === 0) pdf.addPage();
        const p = pdf.getImageProperties(imgData); let w = cellW - 4, h = (p.height * w) / p.width;
        if (h > cellH - 4) { h = cellH - 4; w = (p.width * h) / p.height; }
        const c = mirror ? (cols - 1) - (index % cols) : (index % cols); const r = Math.floor((index % itemsPerPage) / cols);
        
        const x = margin + c * cellW + (cellW - w) / 2;
        const y = margin + r * cellH + (cellH - h) / 2;
        
        pdf.addImage(imgData, 'JPEG', x, y, w, h);

        // --- MARCAS DE CORTE (CROP MARKS) - v35.0 ---
        pdf.setDrawColor(150, 150, 150);
        pdf.setLineWidth(0.2);
        const markSize = 3; // mm
        const offset = 1; // mm
        
        // Esquina Superior Izquierda
        pdf.line(x - offset - markSize, y - offset, x - offset, y - offset);
        pdf.line(x - offset, y - offset - markSize, x - offset, y - offset);
        
        // Esquina Superior Derecha
        pdf.line(x + w + offset, y - offset, x + w + offset + markSize, y - offset);
        pdf.line(x + w + offset, y - offset - markSize, x + w + offset, y - offset);
        
        // Esquina Inferior Izquierda
        pdf.line(x - offset - markSize, y + h + offset, x - offset, y + h + offset);
        pdf.line(x - offset, y + h + offset, x - offset, y + h + offset + markSize);
        
        // Esquina Inferior Derecha
        pdf.line(x + w + offset, y + h + offset, x + w + offset + markSize, y + h + offset);
        pdf.line(x + w + offset, y + h + offset, x + w + offset, y + h + offset + markSize);
    }

    const cards = elements.filter(el => esElementoCarta(el)); const others = elements.filter(el => !esElementoCarta(el));
    
    const processBatch = async (items, isBackMode, mirror) => {
        pdf.addPage();
        let idx = 0;
        for (let item of items) {
            const img = await capturar(item, isBackMode);
            await añadir(img, idx, mirror);
            idx++;
            if (idx % 10 === 0) await new Promise(r => requestAnimationFrame(r));
        }
    };

    if (cards.length > 0) await processBatch(cards, false, false);
    if (isDuplex && cards.length > 0) await processBatch(cards, true, true);
    if (others.length > 0) await processBatch(others, false, false);
    
    pdf.save("Estudio_EP_Export.pdf"); showToast("PDF generado", "success");
}

// ================= TIMER =================
let timerInterval, timeLeft = 900, isTimerRunning = false;
function actualizarTimerDisplay() { const m = Math.floor(timeLeft/60), s = timeLeft%60; const d = document.getElementById('timer-display'); if(d) d.innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`; }
function iniciarTimer() { if(isTimerRunning) return; isTimerRunning = true; timerInterval = setInterval(() => { if(timeLeft > 0) { timeLeft--; actualizarTimerDisplay(); } else { pausarTimer(); showToast('¡Tiempo!', 'error'); } }, 1000); }
function pausarTimer() { isTimerRunning = false; clearInterval(timerInterval); }
function resetTimer() { pausarTimer(); timeLeft = 900; actualizarTimerDisplay(); }
function toggleFullscreenTimer() { document.getElementById('widget-timer').classList.toggle('fullscreen-timer'); }
// ================= MODO ENFOQUE (v34.0) =================
function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
    const icon = document.querySelector('button[onclick="toggleFocusMode()"] i');
    if(icon) {
        icon.className = document.body.classList.contains('focus-mode') ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
    }
    if(typeof showToast === 'function') {
        if(document.body.classList.contains('focus-mode')) showToast("Modo Enfoque activado. Presiona Esc o el botón para salir.", "info");
    }
}

// Salir del modo enfoque con la tecla Escape
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && document.body.classList.contains('focus-mode')) {
        toggleFocusMode();
    }
});