// ================= PWA, LIVE MODE Y IA (v109.0) =================

// 1. MODO PROYECTOR (Live Mode)
function toggleLiveMode() {
    document.body.classList.toggle('live-mode');
    const icon = document.querySelector('button[onclick="toggleLiveMode()"] i');
    if(icon) {
        icon.className = document.body.classList.contains('live-mode') ? 'fa-solid fa-compress' : 'fa-solid fa-tv';
    }
    
    if(document.body.classList.contains('live-mode')) {
        // Si entramos, ocultamos paneles y agrandamos el canvas
        document.getElementById('widget-timer').style.transform = 'translateX(-50%) scale(1.5)';
        document.getElementById('widget-timer').style.bottom = '50px';
        showToast("Modo Proyector Activado. Presiona ESC para salir.", "info");
    } else {
        document.getElementById('widget-timer').style.transform = 'translateX(-50%) scale(1)';
        document.getElementById('widget-timer').style.bottom = '20px';
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && document.body.classList.contains('live-mode')) {
        toggleLiveMode();
    }
});

// 2. PUENTE IA (Generador de Mazos)
function abrirPuenteIA() {
    document.getElementById('modal-ia').classList.add('active');
}

function generarPromptIA() {
    const tema = document.getElementById('ia-tema').value;
    if(!tema) { showToast("Por favor escribe un tema", "error"); return; }
    
    const prompt = `Actúa como un facilitador experto en Educación Popular. Necesito crear un mazo de 10 cartas sobre el tema: "${tema}".
Por favor, devuélveme ÚNICAMENTE un arreglo JSON válido con el siguiente formato, sin texto adicional:
[
  {"frente": "Pregunta o Mito 1", "dorso": "Respuesta o Realidad 1"},
  {"frente": "Pregunta o Mito 2", "dorso": "Respuesta o Realidad 2"}
]
Usa un lenguaje sencillo y adaptado a comunidades populares de Chile.`;
    
    navigator.clipboard.writeText(prompt).then(() => {
        showToast("Prompt copiado. Pégalo en ChatGPT o Gemini.", "success");
    }).catch(() => {
        showToast("No se pudo copiar. Copia el texto manualmente.", "error");
    });
}

function procesarJSONIA() {
    const jsonStr = document.getElementById('ia-json-input').value;
    if(!jsonStr) { showToast("Pega el JSON generado por la IA", "error"); return; }
    
    try {
        const mazo = JSON.parse(jsonStr);
        if(!Array.isArray(mazo)) throw new Error("El JSON debe ser un arreglo.");
        
        document.getElementById('modal-ia').classList.remove('active');
        document.getElementById('ia-json-input').value = '';
        document.getElementById('ia-tema').value = '';
        
        mostrarLoading("Creando mazo con IA...", `Generando ${mazo.length} cartas.`);
        
        let index = 0;
        const generarSiguiente = () => {
            if(index >= mazo.length) {
                ocultarLoading();
                showToast(`¡Mazo de ${mazo.length} cartas generado con éxito!`, "success");
                return;
            }
            
            const item = mazo[index];
            if(typeof insertarCartaCSV === 'function') {
                insertarCartaCSV(item.frente || 'Sin texto', item.dorso || 'Sin texto');
            }
            
            index++;
            setTimeout(generarSiguiente, 50);
        };
        
        setTimeout(generarSiguiente, 100);
        
    } catch (error) {
        showToast("Error al leer el JSON. Asegúrate de copiar solo el arreglo.", "error");
        console.error(error);
    }
}

// 3. COMPRESIÓN DE IMÁGENES (Evitar colapso de LocalStorage)
// Sobrescribimos la función global de subida de imágenes para usar compresión
async function comprimirYSubir(file, callback) {
    try {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 800, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = function(e) { callback(e.target.result); };
        reader.readAsDataURL(compressedFile);
    } catch (error) {
        console.error("Error comprimiendo imagen:", error);
        showToast("Error al procesar la imagen", "error");
    }
}