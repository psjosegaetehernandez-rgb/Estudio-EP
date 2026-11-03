// ================= MODULO CSV Y QR (v103.0) =================

// 1. FUNCIÓN PARA IMPORTAR CSV (Generación Masiva)
function procesarArchivoCSV(event) {
    const file = event.target.files[0]; 
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        // Dividir por saltos de línea y filtrar vacíos
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if(lines.length === 0) { showToast("El archivo está vacío", "error"); return; }
        
        showToast(`Generando ${lines.length} cartas... (No cierres la ventana)`, "info");
        
        let index = 0;
        let count = 0;
        
        // Usamos requestAnimationFrame o setTimeout para no colapsar el navegador
        const generarSiguiente = () => {
            if(index >= lines.length) {
                showToast(`¡Se generaron ${count} cartas exitosamente!`, "success");
                // Limpiar el input para permitir subir otro archivo
                document.getElementById('input-csv').value = '';
                return;
            }
            
            // Separar por coma (Asumiendo formato: Frente, Dorso)
            const parts = lines[index].split(',').map(p => p.trim());
            const frente = parts[0] || 'Sin Texto';
            const dorso = parts[1] || 'Sin Instrucciones';
            
            // Crear la carta usando la función core
            insertarCartaCSV(frente, dorso);
            
            index++;
            count++;
            
            // Pausa de 50ms entre cartas
            setTimeout(generarSiguiente, 50);
        };
        
        generarSiguiente();
    };
    reader.readAsText(file);
}

function insertarCartaCSV(frente, dorso) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    
    // Posicionamiento aleatorio suave en cascada para no amontonar
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (50 + (count * 20) % 600) + 'px';
    wrapper.style.top = (50 + (count * 20) % 400) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container">
            <div class="carta-inner">
                <div class="carta-front border-freire">
                    <div class="carta-icono"><i class="fa-solid fa-comments"></i></div>
                    <div class="carta-texto">${frente}</div>
                    <div class="carta-footer">PREGUNTA</div>
                </div>
                <div class="carta-back">
                    <div class="guia-header">Guía</div>
                    <div class="guia-contenido"><p class="dato-instrucciones">${dorso}</p></div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper);
    
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
        }
    });
}

// 2. FUNCIÓN PARA INSERTAR CÓDIGO QR
function insertarCodigoQR() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); 
    wrapper.className = 'canvas-element qr-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.background = 'white';
    wrapper.style.padding = '10px';
    wrapper.style.borderRadius = '8px';
    wrapper.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    
    const divId = 'qr-' + Date.now();
    wrapper.innerHTML = `<div id="${divId}"></div><p style="text-align:center; font-size:10px; color:#666; margin-top:5px;">Enlace</p>`;
    
    document.getElementById('canvas').appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    
    // Generar el QR usando la librería qrcode.js
    if(typeof QRCode !== 'undefined') {
        new QRCode(document.getElementById(divId), {
            text: "https://ejemplo.com",
            width: 100,
            height: 100,
            colorDark : "#1e293b",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        wrapper.dataset.qrText = "https://ejemplo.com";
        wrapper.dataset.qrDivId = divId;
    } else {
        wrapper.innerHTML = 'Error: Librería QR no cargada';
    }
    
    if(typeof showToast === 'function') showToast("Código QR insertado", "success");
}