let mazoActual = [];
let indiceMazo = 0;

function abrirModoMazo() {
    document.getElementById('editor-view').classList.remove('active');
    document.getElementById('deck-view').classList.add('active');
    document.body.style.background = '#0f172a';
    
    // Obtener todas las cartas del lienzo
    mazoActual = Array.from(document.querySelectorAll('#canvas > .canvas-element')).filter(el => 
        el.querySelector('.carta-container') || el.querySelector('.carta-uno') || 
        el.querySelector('.carta-rol') || el.querySelector('.carta-evento') ||
        el.querySelector('.carta-dixit') || el.querySelector('.carta-drafting')
    );
    
    barajarMazo();
    renderizarMazoVacio();
}

function cerrarModoMazo() {
    document.getElementById('deck-view').classList.remove('active');
    document.getElementById('editor-view').classList.add('active');
    document.body.style.background = '';
}

function barajarMazo() {
    for (let i = mazoActual.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazoActual[i], mazoActual[j]] = [mazoActual[j], mazoActual[i]];
    }
    indiceMazo = 0;
    showToast("Mazo barajado", "success");
    renderizarMazoVacio();
}

function renderizarMazoVacio() {
    const stack = document.getElementById('deck-stack');
    stack.innerHTML = '';
    if (mazoActual.length === 0) {
        stack.innerHTML = '<p style="color:white; text-align:center;">No hay cartas en el lienzo.</p>';
        return;
    }
    // Crear una pila visual de las cartas
    mazoActual.forEach((carta, index) => {
        const clone = carta.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '0'; clone.style.top = '0';
        clone.style.transform = `translate(${index * 0.5}px, ${index * 0.5}px) scale(1)`;
        clone.style.zIndex = index;
        clone.style.display = index === 0 ? 'block' : 'none'; // Solo mostrar la primera
        stack.appendChild(clone);
    });
}

function robarCarta() {
    if (mazoActual.length === 0) return;
    
    // Si ya hay una carta en pantalla, la quitamos
    const stack = document.getElementById('deck-stack');
    const frontCard = stack.querySelector('div[style*="display: block"]');
    if (frontCard) frontCard.remove();
    
    // Tomar la siguiente carta
    if (indiceMazo >= mazoActual.length) {
        indiceMazo = 0; // Reiniciar mazo
        barajarMazo();
    }
    
    const carta = mazoActual[indiceMazo];
    const clone = carta.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '50%'; clone.style.top = '50%';
    clone.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Hacerla más grande
    clone.style.zIndex = 1000;
    clone.style.transition = 'all 0.5s ease';
    clone.style.display = 'block';
    stack.appendChild(clone);
    
    // Voltear la carta con doble clic en modo mazo
    clone.addEventListener('dblclick', () => {
        const container = clone.querySelector('.carta-container');
        if(container) container.classList.toggle('flipped');
    });
    
    indiceMazo++;
    showToast(`Carta ${indiceMazo}/${mazoActual.length}`, "info");
}