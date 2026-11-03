let gameTimerInterval = null;
let gameTimeLeft = 3600; // 60 minutos
let pistasReveladas = 0;
const pistasJuego = [
    "Pista 1: Mira debajo de las mesas. Allí hay un papel con un número.",
    "Pista 2: El código de la caja fuerte está relacionado con los elementos químicos.",
    "Pista 3: La palabra clave es 'H2O'.",
    "Pista 4: El candado final es 1-2-1-8."
];

function iniciarModoJuego() {
    const overlay = document.getElementById('game-mode-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        gameTimeLeft = 3600;
        pistasReveladas = 0;
        actualizarTimerDisplay();
        document.getElementById('game-clues-list').innerHTML = '<p style="color:#64748b; font-style:italic;">Aún no hay pistas reveladas.</p>';
        document.getElementById('game-code-input').value = '';
        document.getElementById('game-code-result').innerHTML = '';
        
        if (gameTimerInterval) clearInterval(gameTimerInterval);
        gameTimerInterval = setInterval(() => {
            gameTimeLeft--;
            actualizarTimerDisplay();
            if (gameTimeLeft <= 0) {
                clearInterval(gameTimerInterval);
                document.getElementById('game-timer-display').innerText = "¡TIEMPO AGOTADO!";
                document.getElementById('game-timer-display').style.color = "#dc2626";
            }
        }, 1000);
    }
}

function cerrarModoJuego() {
    const overlay = document.getElementById('game-mode-overlay');
    if (overlay) overlay.style.display = 'none';
    if (gameTimerInterval) clearInterval(gameTimerInterval);
}

function actualizarTimerDisplay() {
    const mins = Math.floor(gameTimeLeft / 60).toString().padStart(2, '0');
    const secs = (gameTimeLeft % 60).toString().padStart(2, '0');
    const display = document.getElementById('game-timer-display');
    if (display) {
        display.innerText = `${mins}:${secs}`;
        display.style.color = gameTimeLeft < 300 ? "#dc2626" : "#22c55e"; // Rojo si queda menos de 5 min
    }
}

function revelarPistaJuego() {
    if (pistasReveladas < pistasJuego.length) {
        const list = document.getElementById('game-clues-list');
        if (pistasReveladas === 0) list.innerHTML = '';
        const p = document.createElement('p');
        p.style.cssText = 'background: #fef3c7; border-left: 3px solid #d97706; padding: 8px; margin-bottom: 5px; font-size: 12px; color: #92400e;';
        p.innerText = pistasJuego[pistasReveladas];
        list.appendChild(p);
        pistasReveladas++;
        
        if (pistasReveladas === pistasJuego.length) {
            document.getElementById('game-reveal-btn').innerText = 'No hay más pistas';
            document.getElementById('game-reveal-btn').disabled = true;
        }
    }
}

function verificarCodigoJuego() {
    const val = document.getElementById('game-code-input').value.trim();
    const result = document.getElementById('game-code-result');
    if (val === '1218') {
        result.innerHTML = '<span style="color: #22c55e; font-weight: bold;"><i class="fa-solid fa-check"></i> ¡CÓDIGO CORRECTO! ¡Han escapado!</span>';
        clearInterval(gameTimerInterval);
    } else {
        result.innerHTML = '<span style="color: #dc2626; font-weight: bold;"><i class="fa-solid fa-xmark"></i> Código incorrecto. Sigan intentando.</span>';
    }
}