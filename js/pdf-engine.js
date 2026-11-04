// ================= MOTOR PDF v1.2 – Estudio EP =================

const PDF_CONFIG = {
    A4_WIDTH_MM: 210,
    A4_HEIGHT_MM: 297,
    MARGIN_MM: 10,
    GAP_MM: 2,
    CROP_LENGTH_MM: 3,
    CROP_OFFSET_MM: 1
};

const PRINT_LAYOUTS = {
    small:  { cols: 3, rows: 4, label: 'Pequeño' },
    medium: { cols: 3, rows: 3, label: 'Mediano' },
    large:  { cols: 2, rows: 2, label: 'Grande' }
};

function _pdfToast(msg, type) {
    if (typeof showToast === 'function') { showToast(msg, type); }
    else { console.log('[PDF ' + (type || 'info') + '] ' + msg); }
}

function obtenerCartasImprimibles() {
    const nodes = document.querySelectorAll(
        '#canvas > .canvas-element, #canvas > .carta-3d, #canvas > .card'
    );
    return Array.from(nodes).filter(el => {
        if (el.id === 'scenario-background') return false;
        if (el.tagName === 'SVG') return false;
        if (el.classList.contains('scenario') || el.classList.contains('fondo')) return false;
        return true;
    });
}

function calcularLayoutPDF() {
    const sizeKey = (document.getElementById('print-size') || {}).value || 'medium';
    const cfg = PRINT_LAYOUTS[sizeKey] || PRINT_LAYOUTS.medium;
    const usableW = PDF_CONFIG.A4_WIDTH_MM - 2 * PDF_CONFIG.MARGIN_MM;
    const usableH = PDF_CONFIG.A4_HEIGHT_MM - 2 * PDF_CONFIG.MARGIN_MM;
    const cardW = (usableW - (cfg.cols - 1) * PDF_CONFIG.GAP_MM) / cfg.cols;
    const cardH = (usableH - (cfg.rows - 1) * PDF_CONFIG.GAP_MM) / cfg.rows;
    return { cols: cfg.cols, rows: cfg.rows, cardW: cardW, cardH: cardH, usableW: usableW, usableH: usableH };
}

function abrirVistaPrevia() {
    const modal = document.getElementById('print-modal');
    if (!modal) { _pdfToast('No existe el modal de impresión', 'error'); return; }
    modal.style.display = 'flex';
    actualizarVistaPrevia();
}

function cerrarVistaPrevia() {
    const modal = document.getElementById('print-modal');
    if (modal) modal.style.display = 'none';
}

function actualizarVistaPrevia() {
    const container = document.getElementById('print-preview-area');
    const stats = document.getElementById('print-stats');
    if (!container) return;

    const cartas = obtenerCartasImprimibles();
    const layout = calcularLayoutPDF();
    const porHoja = layout.cols * layout.rows;
    const hojas = Math.max(1, Math.ceil(cartas.length / porHoja));

    if (stats) {
        stats.textContent = cartas.length + ' carta(s) · ' + hojas + ' hoja(s) A4 · ' + layout.cols + '×' + layout.rows;
    }

    container.innerHTML = '';

    if (cartas.length === 0) {
        container.innerHTML = '<p style="color:#64748b; text-align:center; padding:40px; font-size:13px;">No hay cartas en el lienzo.<br>Añade elementos desde el menú izquierdo para imprimir.</p>';
        return;
    }

    const hoja = document.createElement('div');
    hoja.style.cssText = 'width: 100%; max-width: 480px; aspect-ratio: 210/297; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.25); display: grid; grid-template-columns: repeat(' + layout.cols + ', 1fr); grid-template-rows: repeat(' + layout.rows + ', 1fr); gap: 6px; padding: 18px; box-sizing: border-box;';

    for (let i = 0; i < porHoja; i++) {
        const slot = document.createElement('div');
        slot.style.cssText = 'position: relative; overflow: hidden; border: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-size: 10px; color: #94a3b8;';

        if (i < cartas.length) {
            const thumb = cartas[i].cloneNode(true);
            thumb.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.35); transform-origin: center; pointer-events: none; opacity: 0.95;';
            slot.appendChild(thumb);
        } else {
            slot.textContent = '—';
        }
        hoja.appendChild(slot);
    }

    container.appendChild(hoja);

    if (hojas > 1) {
        const info = document.createElement('p');
        info.style.cssText = 'color:#475569; font-size:12px; text-align:center; margin-top:10px; font-weight:bold;';
        info.textContent = '+ ' + (hojas - 1) + ' hoja(s) adicional(es) en el PDF';
        container.appendChild(info);
    }
}

async function generarPDFFinal() {
    const cartas = obtenerCartasImprimibles();
    if (cartas.length === 0) {
        _pdfToast('No hay cartas para imprimir', 'error');
        return;
    }

    if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        _pdfToast('Librerías PDF no cargadas. Revisa la conexión.', 'error');
        return;
    }

    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const layout = calcularLayoutPDF();
    const porHoja = layout.cols * layout.rows;
    const hojas = Math.ceil(cartas.length / porHoja);

    _pdfToast('Generando ' + hojas + ' hoja(s) de cartas...', 'info');

    for (let h = 0; h < hojas; h++) {
        if (h > 0) doc.addPage();
        const cartasHoja = cartas.slice(h * porHoja, (h + 1) * porHoja);

        for (let i = 0; i < cartasHoja.length; i++) {
            const col = i % layout.cols;
            const row = Math.floor(i / layout.cols);
            const x = PDF_CONFIG.MARGIN_MM + col * (layout.cardW + PDF_CONFIG.GAP_MM);
            const y = PDF_CONFIG.MARGIN_MM + row * (layout.cardH + PDF_CONFIG.GAP_MM);

            try {
                const canvas = await html2canvas(cartasHoja[i], {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    useCORS: true,
                    allowTaint: true,
                    logging: false
                });
                const imgData = canvas.toDataURL('image/jpeg', 0.92);
                doc.addImage(imgData, 'JPEG', x, y, layout.cardW, layout.cardH);
                dibujarMarcasCorte(doc, x, y, layout.cardW, layout.cardH);
            } catch (err) {
                console.error('[PDF] Error capturando carta ' + i, err);
            }
        }
    }

    const stamp = new Date().toISOString().slice(0, 10);
    doc.save('Estudio_EP_Cartas_' + stamp + '.pdf');
    _pdfToast('✓ PDF de cartas descargado', 'success');
}

function dibujarMarcasCorte(doc, x, y, w, h) {
    const l = PDF_CONFIG.CROP_LENGTH_MM;
    const o = PDF_CONFIG.CROP_OFFSET_MM;
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.1);
    doc.line(x - o, y, x - o - l, y);
    doc.line(x, y - o, x, y - o - l);
    doc.line(x + w + o, y, x + w + o + l, y);
    doc.line(x + w, y - o, x + w, y - o - l);
    doc.line(x - o, y + h, x - o - l, y + h);
    doc.line(x, y + h + o, x, y + h + o + l);
    doc.line(x + w + o, y + h, x + w + o + l, y + h);
    doc.line(x + w, y + h + o, x + w, y + h + o + l);
}

// ================= EXPORTAR MOSAICO A3/A2 CORREGIDO =================
async function exportarMosaico() {
    if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        _pdfToast('Librerías PDF no cargadas', 'error');
        return;
    }

    const canvasEl = document.getElementById('canvas');
    const svgGrid = document.getElementById('canvas-svg');
    const hint = document.getElementById('canvas-hint');
    
    // Ocultar la cuadrícula y la pista
    if(svgGrid) svgGrid.style.display = 'none';
    if(hint) hint.style.display = 'none';

    _pdfToast('Generando Mosaico (esto puede tardar unos segundos)...', 'info');

    // Guardar estilos originales del canvas para restaurarlos después
    const originalStyle = canvasEl.getAttribute('style') || '';
    
    // Expandir temporalmente el canvas para asegurar que se capture todo el contenido
    canvasEl.style.width = 'max-content';
    canvasEl.style.height = 'max-content';
    canvasEl.style.minWidth = '2000px';
    canvasEl.style.minHeight = '2000px';
    canvasEl.style.overflow = 'visible';

    try {
        const canvasImage = await html2canvas(canvasEl, {
            scale: 1, // Escala 1 para evitar que el navegador se quede sin memoria
            backgroundColor: '#ffffff',
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: canvasEl.scrollWidth,
            height: canvasEl.scrollHeight
        });

        // Restaurar UI
        canvasEl.setAttribute('style', originalStyle);
        if(svgGrid) svgGrid.style.display = '';
        if(hint) hint.style.display = '';

        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const pageW = 210;
        const pageH = 297;
        const cols = 2;
        const rows = 2;

        const imgWidth = canvasImage.width;
        const imgHeight = canvasImage.height;
        const tileW = imgWidth / cols;
        const tileH = imgHeight / rows;

        for(let r=0; r<rows; r++) {
            for(let c=0; c<cols; c++) {
                if(r > 0 || c > 0) doc.addPage();
                
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');
                tempCanvas.width = tileW;
                tempCanvas.height = tileH;
                
                // Recortar la porción del canvas
                ctx.drawImage(
                    canvasImage, 
                    c * tileW, r * tileH, tileW, tileH, // origen
                    0, 0, tileW, tileH // destino
                );
                
                doc.addImage(tempCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, pageW, pageH);
                
                // Añadir texto guía
                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text(`Sección ${r+1}-${c+1} (Imprimir en A4 y unir)`, 10, pageH - 10);
            }
        }

        doc.save('Estudio_EP_Tablero_A2_Mosaico.pdf');
        _pdfToast('✓ Mosaico A2 descargado (4 hojas A4)', 'success');

    } catch (err) {
        canvasEl.setAttribute('style', originalStyle);
        if(svgGrid) svgGrid.style.display = '';
        if(hint) hint.style.display = '';
        console.error(err);
        _pdfToast('Error al generar mosaico', 'error');
    }
}