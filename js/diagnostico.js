// ================= SISTEMA DE DIAGNÓSTICO Y AUTOTEST =================

function ejecutarDiagnostico() {
    const results = [];
    const checkScript = (name, condition) => {
        results.push({ name, status: condition ? 'OK' : 'ERROR' });
    };

    // Comprobar variables globales y dependencias críticas
    checkScript('Core Engine (app.js)', typeof actualizarTituloProyecto !== 'undefined');
    checkScript('Catálogo de Juegos (catalogo.js)', typeof CATALOGO_JUEGOS !== 'undefined');
    checkScript('Manual de Ayuda (help.js)', typeof abrirAyuda !== 'undefined');
    checkScript('Motor PDF (pdf-engine.js)', typeof generarPDFFinal !== 'undefined');
    checkScript('Exportador TTS (tts-engine.js)', typeof exportarTTS !== 'undefined');
    checkScript('Escape Rooms (escape-rooms.js)', typeof insertarKitEscape !== 'undefined');
    checkScript('Escenarios de Fondo (scenarios.js)', typeof insertarEscenario !== 'undefined');
    checkScript('Minijuegos / Ruleta (minigames.js)', typeof abrirRuleta !== 'undefined');
    checkScript('Backup Local (backup-engine.js)', typeof descargarBackupTotal !== 'undefined');
    checkScript('Librería jsPDF (CDN)', typeof window.jspdf !== 'undefined');
    checkScript('Librería html2canvas (CDN)', typeof window.html2canvas !== 'undefined');
    checkScript('Librería JSZip (CDN)', typeof window.JSZip !== 'undefined');
    checkScript('Almacenamiento Local (LocalStorage)', typeof localStorage !== 'undefined');

    // Construir interfaz visual
    let html = `<div style="font-family: 'Inter', sans-serif; background: #1e293b; color: #f8fafc; padding: 25px; border-radius: 12px; width: 450px; max-width: 90vw; box-shadow: 0 10px 40px rgba(0,0,0,0.6); border: 1px solid #334155;">`;
    html += `<h2 style="color: #38bdf8; margin-top:0; font-family: 'Playfair Display'; border-bottom: 2px solid #334155; padding-bottom: 10px; margin-bottom: 15px;"><i class="fa-solid fa-heart-pulse"></i> Diagnóstico del Sistema</h2>`;
    html += `<ul style="list-style: none; padding: 0; margin: 0; max-height: 300px; overflow-y: auto;">`;
    
    let errors = 0;
    results.forEach(r => {
        if (r.status === 'ERROR') errors++;
        const color = r.status === 'OK' ? '#22c55e' : '#ef4444';
        const icon = r.status === 'OK' ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>';
        html += `<li style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #334155; font-size: 12px;">
            <span>${r.name}</span>
            <span style="color: ${color}; font-weight: bold;">${icon} ${r.status}</span>
        </li>`;
    });
    html += `</ul>`;
    
    if (errors === 0) {
        html += `<div style="color: #22c55e; text-align: center; margin-top: 20px; background: rgba(34, 197, 94, 0.1); padding: 10px; border-radius: 6px; font-weight: bold;">✅ Todos los módulos cargaron correctamente.<br><span style="font-size: 11px; font-weight: normal;">La arquitectura es estable.</span></div>`;
    } else {
        html += `<div style="color: #ef4444; text-align: center; margin-top: 20px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; font-weight: bold;">⚠️ Se encontraron ${errors} errores.<br><span style="font-size: 11px; font-weight: normal;">Revisa la consola (F12) o recarga la página.</span></div>`;
    }
    
    html += `<button onclick="this.parentElement.parentElement.remove()" style="width: 100%; margin-top: 20px; padding: 12px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.2s;"><i class="fa-solid fa-xmark"></i> Cerrar Diagnóstico</button></div>`;

    const div = document.createElement('div');
    div.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999999;';
    div.innerHTML = html;
    document.body.appendChild(div);
}