let currentProjectId = null;
let proyectos = JSON.parse(localStorage.getItem('ep_proyectos_v13')) || [];
let autosaveTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    document.getElementById('modal-confirm-btn').onclick = () => { if (modalCallback) modalCallback(); closeModal(); };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            const activeEl = document.activeElement;
            if (!(activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable) && elementoSeleccionado) {
                e.preventDefault(); pedirEliminar();
            }
        }
    });
});

function showToast(msg, type='info') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    t.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, 3000);
}

let modalCallback = null;
function showConfirm(message, callback) {
    document.getElementById('modal-message').innerText = message;
    document.getElementById('modal-overlay').classList.add('active');
    modalCallback = callback;
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); modalCallback = null; }

function renderDashboard() {
    const grid = document.getElementById('projects-list');
    grid.innerHTML = '';
    if (proyectos.length === 0) { grid.innerHTML = '<p style="text-align:center; width:100%; color:#64748b;">No hay proyectos.</p>'; return; }
    proyectos.forEach(p => {
        grid.innerHTML += `<div class="project-card" onclick="abrirProyecto('${p.id}')"><h3>${p.nombre}</h3><p>${p.elementos ? p.elementos.length : 0} elementos</p></div>`;
    });
}

function crearNuevoProyecto() {
    const nombre = prompt("Nombre del proyecto:", "Nuevo Proyecto");
    if(!nombre) return;
    const nuevo = { id: 'proj_' + Date.now(), nombre: nombre, elementos: [] };
    proyectos.push(nuevo);
    guardarEnLocalStorage();
    abrirProyecto(nuevo.id);
}

function abrirProyecto(id) {
    currentProjectId = id;
    const proyecto = proyectos.find(p => p.id === id);
    document.getElementById('project-title-input').value = proyecto.nombre;
    document.getElementById('dashboard-view').classList.remove('active');
    document.getElementById('editor-view').classList.add('active');
    document.getElementById('canvas').innerHTML = '<svg id="canvas-svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></svg><div class="canvas-hint" id="canvas-hint">Usa el menÃº izquierdo para aÃ±adir elementos.</div>';
    
    if(proyecto.elementos) {
        proyecto.elementos.forEach(el => {
            if(el.tipo === 'carta') insertarCarta(el.data, false);
            if(el.tipo === 'naipe') insertarCartaNaipe(el.data, false);
            if(el.tipo === 'duo') insertarCartaDuo(el.data, false);
            if(el.tipo === 'imagen') crearElementoImagen(el.data.src, el.data.x, el.data.y);
        });
    }
}

function volverAlDashboard() {
    guardarEnLocalStorage();
    document.getElementById('editor-view').classList.remove('active');
    document.getElementById('dashboard-view').classList.add('active');
    currentProjectId = null;
    renderDashboard();
}

function guardarEnLocalStorage() { 
    if(currentProjectId) {
        const proyecto = proyectos.find(p => p.id === currentProjectId);
        const canvas = document.getElementById('canvas');
        
        // Guardamos TODO el HTML del lienzo. Esto evita errores de lectura de textos.
        proyecto.html = canvas.innerHTML;
        proyecto.nombre = document.getElementById('project-title-input').value;
    }
    localStorage.setItem('ep_proyectos_v13', JSON.stringify(proyectos)); 
}

function actualizarTituloProyecto(nuevoTitulo) {
    if(!currentProjectId) return;
    const proyecto = proyectos.find(p => p.id === currentProjectId);
    proyecto.nombre = nuevoTitulo;
    guardarEnLocalStorage();
}

function autosave() {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => { guardarEnLocalStorage(); }, 1500);
}

// EXPORTACIÃ“N BÃSICA (Corregida para v13)
async function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    showToast("Generando PDF...", "info");
    
    const elementos = Array.from(document.querySelectorAll('.canvas-element, .doc-element'));
    for(let i=0; i<elementos.length; i++) {
        if(i > 0) pdf.addPage();
        const clone = elementos[i].cloneNode(true);
        clone.style.position = 'relative'; clone.style.left = '0'; clone.style.top = '0'; clone.style.boxShadow = 'none';
        const temp = document.createElement('div'); temp.style.position = 'absolute'; temp.style.left = '-9999px'; temp.style.background = 'white'; temp.appendChild(clone); document.body.appendChild(temp);
        
        const canvasImg = await html2canvas(clone, { scale: 2, backgroundColor: '#ffffff' });
        document.body.removeChild(temp);
        
        const imgData = canvasImg.toDataURL('image/jpeg', 0.9);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = 210 - 20; // Margen
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let finalWidth = pdfWidth; let finalHeight = pdfHeight;
        if(finalHeight > 297 - 20) { finalHeight = 297 - 20; finalWidth = (imgProps.width * finalHeight) / imgProps.height; }
        
        pdf.addImage(imgData, 'JPEG', (210 - finalWidth)/2, (297 - finalHeight)/2, finalWidth, finalHeight);
    }
        // GUÍA DE ENSAMBLAJE (Se añade si hay cartas o recortables)
    if(document.querySelectorAll('.carta-container').length > 0 || document.querySelector('.cubo-grid') || document.querySelector('.dado-net')) {
        pdf.addPage();
        pdf.setFontSize(22);
        pdf.setTextColor(154, 52, 18); 
        pdf.text("Guia de Ensamblaje del Kit", 20, 30);
        
        pdf.setFontSize(14);
        pdf.setTextColor(50, 50, 50);
        let y = 60;
        
        pdf.text("Paso 1: Recorta", 20, y);
        pdf.setFontSize(11);
        pdf.text("Usa tijeras para recortar todas las cartas, fichas y plantillas 3D.", 20, y + 7);
        pdf.text("Sigue las lineas negras continuas (lineas de corte).", 20, y + 13);
        
        y += 30;
        pdf.setFontSize(14);
        pdf.text("Paso 2: Dobla", 20, y);
        pdf.setFontSize(11);
        pdf.text("En las plantillas 3D (cubos y dados), dobla por las lineas grises punteadas.", 20, y + 7);
        
        y += 30;
        pdf.setFontSize(14);
        pdf.text("Paso 3: Pega", 20, y);
        pdf.setFontSize(11);
        pdf.text("Usa pegamento o cinta adhesiva en las pestanas para armar las figuras.", 20, y + 7);
        
        y += 30;
        pdf.setFontSize(14);
        pdf.text("Paso 4: Juega y Aprende", 20, y);
        pdf.setFontSize(11);
        pdf.text("Ya tienes tu kit listo! Reune a tu grupo y comienza la dinamica.", 20, y + 7);
    }
    pdf.save("Estudio_EP_Export.pdf");
    showToast("PDF generado", "success");
}
// ================= TEMPORIZADOR =================
let timerInterval = null;
let timeLeft = 15 * 60;
let isTimerRunning = false;

function actualizarTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
    el.innerText = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}
function iniciarTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) { timeLeft--; actualizarTimerDisplay(); }
        else {
            pausarTimer();
            showToast('¡Tiempo terminado!', 'error');
            const el = document.getElementById('timer-display');
            if (el) el.style.color = '#ef4444';
        }
    }, 1000);
}
function pausarTimer() { isTimerRunning = false; clearInterval(timerInterval); }
function resetTimer() {
    pausarTimer();
    timeLeft = 15 * 60;
    const el = document.getElementById('timer-display');
    if (el) el.style.color = 'white';
    actualizarTimerDisplay();
}

// ================= EXPORTAR HTML INTERACTIVO =================
function exportarHTMLInteractivo() {
    const cartas = Array.from(document.querySelectorAll('.canvas-element'))
        .filter(el => el.querySelector('.carta-container'));
    if (cartas.length === 0) { showToast('No hay cartas para exportar.', 'error'); return; }
    let cards = '';
    cartas.forEach(c => {
        const t = c.querySelector('.carta-texto')?.innerText || '';
        const i = c.querySelector('.dato-instrucciones')?.innerText || '';
        cards += '<div class="flip-card" onclick="this.classList.toggle(\'flipped\')">'
            + '<div class="flip-card-inner">'
            + '<div class="flip-card-front"><h2>' + t + '</h2><p style="position:absolute;bottom:20px;font-size:12px;color:#94a3b8;">Toca para voltear</p></div>'
            + '<div class="flip-card-back"><h3>Guía Facilitador</h3><p>' + i + '</p></div>'
            + '</div></div>';
    });
    const style = 'body{font-family:Inter,sans-serif;background:#f8fafc;display:flex;flex-wrap:wrap;gap:20px;padding:20px;justify-content:center}'
        + '.flip-card{background-color:transparent;width:300px;height:400px;perspective:1000px;cursor:pointer}'
        + '.flip-card-inner{position:relative;width:100%;height:100%;text-align:center;transition:transform .6s;transform-style:preserve-3d;box-shadow:0 10px 20px rgba(0,0,0,.1);border-radius:12px}'
        + '.flip-card.flipped .flip-card-inner{transform:rotateY(180deg)}'
        + '.flip-card-front,.flip-card-back{position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px;box-sizing:border-box}'
        + '.flip-card-front{background:#fff;border:2px solid #9a3412;color:#1e293b}'
        + '.flip-card-front h2{font-family:serif;font-size:24px}'
        + '.flip-card-back{background:#1e293b;color:#fff;transform:rotateY(180deg);text-align:left}'
        + '.flip-card-back h3{color:#38bdf8;font-size:14px;margin-bottom:10px;text-transform:uppercase}'
        + '.flip-card-back p{font-size:16px;line-height:1.6}';
    const doc = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Mazo Interactivo - Estudio EP</title><style>' + style + '</style></head><body>'
        + '<div style="width:100%;text-align:center;margin-bottom:20px;"><h1 style="color:#9a3412;">Mazo Interactivo</h1><p>Haz clic en cada carta para ver la guía.</p></div>'
        + cards + '</body></html>';
    const blob = new Blob([doc], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Mazo_Interactivo.html';
    a.click();
    showToast('HTML Interactivo descargado', 'success');
}

// ================= INICIALIZACIÓN v14.0 =================
document.addEventListener('DOMContentLoaded', () => {
    actualizarTimerDisplay();
    const topbar = document.querySelector('.topbar-actions');
    if (topbar && !document.getElementById('btn-html-export')) {
        const btn = document.createElement('button');
        btn.id = 'btn-html-export';
        btn.className = 'btn btn-outline';
        btn.innerHTML = '<i class="fa-brands fa-html5"></i> HTML';
        btn.onclick = exportarHTMLInteractivo;
        const prim = topbar.querySelector('.btn-primary');
        if (prim) topbar.insertBefore(btn, prim);
        else topbar.appendChild(btn);
    }
});
// ================= NUEVO: SISTEMATIZACIÓN AUTOMÁTICA (Auto-Acta) =================
function generarActaSistematizacion() {
    showToast("Sistematizando taller...", "info");
    
    let actaHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Acta de Taller - Estudio EP</title>
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
            h1 { color: #9a3412; border-bottom: 2px solid #9a3412; padding-bottom: 10px; }
            h2 { color: #1e293b; margin-top: 30px; border-bottom: 1px solid #ccc; }
            .card { background: #f8fafc; border-left: 4px solid #9a3412; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
            .card h3 { margin: 0 0 10px 0; font-size: 18px; }
            .meta { font-size: 12px; color: #666; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1e293b; color: white; }
        </style>
    </head>
    <body>
        <h1>Acta de Sistematización - Estudio EP</h1>
        <p><strong>Proyecto:</strong> ${document.getElementById('project-title-input').value || 'Sin título'}</p>
        <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
    `;

    // 1. Extraer Cartas
    actaHTML += `<h2>1. Mazo de Cartas (Reflexiones / Problemas)</h2>`;
    const cartas = document.querySelectorAll('.canvas-element');
    let tieneCartas = false;
    cartas.forEach(c => {
        if(c.querySelector('.carta-container')) {
            tieneCartas = true;
            const t = c.querySelector('.carta-texto')?.innerText || '';
            const i = c.querySelector('.dato-instrucciones')?.innerText || '';
            actaHTML += `<div class="card"><h3>${t}</h3><div class="meta">Nota / Instrucción: ${i}</div></div>`;
        }
    });
    if(!tieneCartas) actaHTML += `<p><em>No se registraron cartas.</em></p>`;

    // 2. Extraer Tablas (Matriz, Planificador, Presupuesto)
    actaHTML += `<h2>2. Matrices y Planificadores</h2>`;
    const tablas = document.querySelectorAll('.tabla-dinamica table');
    let tieneTablas = false;
    tablas.forEach((tabla, idx) => {
        tieneTablas = true;
        actaHTML += `<h3>Tabla ${idx + 1}</h3><table>`;
        tabla.querySelectorAll('tr').forEach(tr => {
            actaHTML += '<tr>';
            tr.querySelectorAll('th, td').forEach(celda => {
                const tag = celda.tagName.toLowerCase();
                actaHTML += `<${tag}>${celda.innerText.replace(/\n/g, '<br>')}</${tag}>`;
            });
            actaHTML += '</tr>';
        });
        actaHTML += `</table><br>`;
    });
    if(!tieneTablas) actaHTML += `<p><em>No se registraron tablas.</em></p>`;

    // 3. Extraer Notas Adhesivas
    actaHTML += `<h2>3. Lluvia de Ideas (Notas Adhesivas)</h2><ul>`;
    const notas = document.querySelectorAll('.nota-adhesiva');
    let tieneNotas = false;
    notas.forEach(n => {
        tieneNotas = true;
        actaHTML += `<li>${n.innerText}</li>`;
    });
    if(!tieneNotas) actaHTML += `<p><em>No se registraron notas.</em></p>`;
    actaHTML += `</ul>`;

    // 4. Extraer Nodos de Red (Sociograma)
    actaHTML += `<h2>4. Mapeo de Actores (Sociograma)</h2><ul>`;
    const nodos = document.querySelectorAll('.network-node');
    let tieneNodos = false;
    nodos.forEach(n => {
        tieneNodos = true;
        actaHTML += `<li><strong>${n.innerText}</strong></li>`;
    });
    if(!tieneNodos) actaHTML += `<p><em>No se registraron actores.</em></p>`;
    actaHTML += `</ul>`;

    actaHTML += `</body></html>`;

    // Descargar
    const blob = new Blob([actaHTML], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Acta_Taller_EP.html';
    a.click();
    showToast("Acta generada con éxito. ¡Puedes imprimirla a PDF!", "success");
}
// ================= LIMPIAR LIENZO =================
function limpiarLienzo() {
    showConfirm("¿Estás seguro de que quieres borrar TODO el contenido del lienzo? Esta acción no se puede deshacer.", () => {
        const canvas = document.getElementById('canvas');
        
        // 1. Eliminar todos los elementos (cartas, tablas, notas, etc.)
        Array.from(canvas.children).forEach(child => {
            if(child.id !== 'canvas-svg' && child.id !== 'canvas-hint' && child.id !== 'document-pages-container') {
                child.remove();
            }
        });

        // 2. Limpiar las líneas del sociograma (SVG)
        const svg = document.getElementById('canvas-svg');
        if(svg) svg.innerHTML = '';

        // 3. Limpiar el contenedor de documentos A4 si estuviera visible
        const docContainer = document.getElementById('document-pages-container');
        if(docContainer) docContainer.innerHTML = '';

        // 4. Restaurar el mensaje de bienvenida (Hint)
        let hint = document.getElementById('canvas-hint');
        if(!hint) {
            hint = document.createElement('div');
            hint.className = 'canvas-hint';
            hint.id = 'canvas-hint';
            hint.innerText = 'Usa el menú izquierdo para añadir elementos.';
            canvas.appendChild(hint);
        }
        hint.style.display = 'block';

        // 5. Limpiar el Panel Derecho (Propiedades)
        document.getElementById('props-empty').style.display = 'block';
        document.getElementById('props-content').style.display = 'none';
        
        // 6. Deseleccionar cualquier elemento activo
        if(typeof elementoSeleccionado !== 'undefined' && elementoSeleccionado) {
            elementoSeleccionado.classList.remove('selected');
            elementoSeleccionado = null;
        }

        // 7. Guardar el estado vacío
        if(typeof autosave === 'function') autosave();
        
        showToast("Lienzo limpio. ¡Listo para un nuevo taller!", "success");
    });
}
// ================= MODO OSCURO =================
function toggleTema() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    const icon = document.querySelector('#btn-tema i');
    if(icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    localStorage.setItem('ep_tema_oscuro', isDark);
}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('ep_tema_oscuro') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#btn-tema i');
        if(icon) icon.className = 'fa-solid fa-sun';
    }
});