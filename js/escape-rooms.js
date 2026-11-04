// ================= MÓDULO DE ESCAPE ROOMS =================

const ESCAPE_ROOMS_DATA = {
    laboratorio: {
        nombre: "Laboratorio Secreto",
        pistas: [
            "Un frasco roto tiene una nota: 'El primer dígito es el número de átomos de hidrógeno en el agua (H2O)'.",
            "La computadora muestra un error: 'Error 12 de 18 sistemas en falla. Resta para obtener el segundo dígito'.",
            "Un calendario marca el mes de diciembre. ¿Cuál es el número del mes?",
            "La fórmula química de la adrenalina es C9H13NO3. Suma todos los subíndices."
        ],
        codigo: "1218",
        pistaExtra: "Resta los últimos dos dígitos del año en curso."
    },
    mansion: {
        nombre: "Mansión del Mayordomo",
        pistas: [
            "El reloj de la sala está detenido a las 3:00.",
            "El libro favorito del mayordomo tiene 14 páginas.",
            "El retrato del fundador dice: 'Nacido el 3 de enero'.",
            "Una nota bajo la alfombra: 'Mira la hora, las páginas y el mes'."
        ],
        codigo: "314",
        pistaExtra: "El orden es Hora-Páginas-Mes."
    },
    tiempo: {
        nombre: "Máquina del Tiempo",
        pistas: [
            "El engranaje principal marca la era victoriana. Busca el año de la primera máquina de vapor (1712).",
            "Una carta cifrada: 'El año en que se hundió el Titanic'.",
            "La rueda de cifrado César (desplazamiento 3) revela: 'Año del primer viaje a la luna (1969)'.",
            "El manual dice: 'Alinea los engranajes en orden cronológico histórico y toma el último año'."
        ],
        codigo: "1885",
        pistaExtra: "El código es el año en que se estableció la primera zona horaria estándar."
    }
};

let currentEscapeRoom = null;
let currentPistaIndex = 0;

function insertarKitEscape(tipo) {
    const data = ESCAPE_ROOMS_DATA[tipo];
    if (!data) return;

    const html = `
        <div class="canvas-element" style="width: 600px; background: #1e293b; border-radius: 12px; padding: 20px; color: white; font-family: 'Courier New', monospace; border: 4px solid #475569; position: absolute; top: 100px; left: 100px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" id="kit-escape-${tipo}">
            <div style="border-bottom: 2px dashed #64748b; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; color: #38bdf8; font-size: 24px; font-family: 'Inter', sans-serif;"><i class="fa-solid fa-lock"></i> ${data.nombre}</h2>
                <span style="background: #dc2626; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">CANDADO ACTIVO</span>
            </div>
            <p style="font-size: 14px; margin-bottom: 15px; font-family: 'Inter', sans-serif; color: #cbd5e1;">Resuelve el enigma para escapar. Usa el botón de abajo para iniciar el modo de juego interactivo.</p>
            <div style="background: #0f172a; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center; font-size: 32px; letter-spacing: 15px; border: 1px solid #334155;">
                _ _ _ _
            </div>
            <button onclick="iniciarEscapeRoom('${tipo}')" style="width: 100%; padding: 12px; background: #16a34a; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer; font-family: 'Inter', sans-serif;"><i class="fa-solid fa-play"></i> Iniciar Desafío</button>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const canvas = document.getElementById('canvas');
    const element = wrapper.firstElementChild;
    canvas.appendChild(element);

    if(typeof window.makeDraggable === 'function') makeDraggable(element);
    if(typeof showToast === 'function') showToast(`Kit de Escape "${data.nombre}" insertado`, 'success');
    if(typeof autosave === 'function') autosave();
}

function iniciarEscapeRoom(tipo) {
    const data = ESCAPE_ROOMS_DATA[tipo];
    if (!data) return;

    currentEscapeRoom = data;
    currentPistaIndex = 0;

    // Configurar el modal de juego existente en el HTML
    document.getElementById('game-timer-display').innerText = '60:00';
    document.getElementById('game-clues-list').innerHTML = '';
    document.getElementById('game-code-input').value = '';
    document.getElementById('game-code-result').innerText = '';
    
    // Cambiar el título del modal
    const titleEl = document.querySelector('#game-mode-overlay h1');
    if(titleEl) titleEl.innerHTML = `<i class="fa-solid fa-door-closed"></i> ${data.nombre}`;

    document.getElementById('game-mode-overlay').style.display = 'flex';
}

// Sobrescribir las funciones del game-mode.js para que respondan a los Escape Rooms
window.revelarPistaJuego = function() {
    if (!currentEscapeRoom) {
        if(typeof showToast === 'function') showToast("Primero inicia un desafío de escape", "error");
        return;
    }
    if (currentPistaIndex >= currentEscapeRoom.pistas.length) {
        const list = document.getElementById('game-clues-list');
        list.innerHTML += `<div style="color: #ef4444; font-size: 13px; padding: 5px; font-family: 'Inter', sans-serif;">¡No hay más pistas! Usa la lógica y el código.</div>`;
        list.scrollTop = list.scrollHeight;
        return;
    }

    const pista = currentEscapeRoom.pistas[currentPistaIndex];
    const list = document.getElementById('game-clues-list');
    list.innerHTML += `<div style="background: #334155; padding: 10px; border-radius: 4px; margin-bottom: 5px; font-size: 13px; color: #cbd5e1; font-family: 'Inter', sans-serif;">
        <b>Pista ${currentPistaIndex + 1}:</b> ${pista}
    </div>`;
    list.scrollTop = list.scrollHeight;
    currentPistaIndex++;
};

window.verificarCodigoJuego = function() {
    if (!currentEscapeRoom) return;
    const input = document.getElementById('game-code-input').value.trim();
    const result = document.getElementById('game-code-result');
    
    if (input === currentEscapeRoom.codigo) {
        result.innerHTML = '<span style="color: #22c55e; font-weight: bold; font-family: \'Inter\', sans-serif;"><i class="fa-solid fa-lock-open"></i> ¡CÓDIGO CORRECTO! HAS ESCAPADO.</span>';
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    } else {
        result.innerHTML = '<span style="color: #ef4444; font-family: \'Inter\', sans-serif;"><i class="fa-solid fa-xmark"></i> Código incorrecto. Intenta de nuevo.</span>';
        if (navigator.vibrate) navigator.vibrate(200);
    }
};