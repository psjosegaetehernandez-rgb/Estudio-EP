// ================= MOTOR DE CARTAS: MITOS DE AMÉRICA =================

function insertarCartaMitos(tipo) {
    // 1. Usamos la función original de la app para crear la carta base.
    //    Esto asegura que se pueda arrastrar y que el panel derecho la reconozca.
    if (typeof insertarCarta !== 'function') return;
    insertarCarta();

    // 2. Esperamos un momento a que la app termine de dibujarla.
    setTimeout(() => {
        // Buscamos la última carta creada
        const cartas = document.querySelectorAll('#canvas > .canvas-element');
        const nuevaCarta = cartas[cartas.length - 1];
        
        if (!nuevaCarta) return;

        const front = nuevaCarta.querySelector('.carta-front');
        const back = nuevaCarta.querySelector('.carta-back');
        if (!front || !back) return;

        // 3. Le aplicamos el diseño visual de "Mitos de América"
        let titulo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        let icono = 'fa-scroll';
        if(tipo === 'territorio') icono = 'fa-mountain';
        if(tipo === 'desafio') icono = 'fa-triangle-exclamation';
        if(tipo === 'memoria') icono = 'fa-brain';
        if(tipo === 'personaje') icono = 'fa-user-astronaut';

        front.innerHTML = `
            <i class="fa-solid ${icono}" style="font-size: 30px; color: #D4AF37; margin-bottom: 5px; z-index: 10;"></i>
            <h3 style="color: #D4AF37; font-family: 'Playfair Display'; font-size: 16px; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; z-index: 10;">${titulo}</h3>
            <div class="carta-texto" style="color: #e2e8f0; font-family: 'Merriweather'; font-size: 13px; text-align: center; padding: 0 10px; z-index: 10;">Haz clic en "Propiedades" para editar el texto...</div>
        `;
        
        front.style.background = '#0f172a';
        front.style.border = '3px solid #D4AF37';
        front.style.justifyContent = 'flex-start';
        front.style.alignItems = 'center';
        front.style.paddingTop = '20px';
        front.style.boxShadow = 'inset 0 0 20px rgba(212,175,55,0.2)';

        back.innerHTML = `
            <div style="width: 100%; text-align: center; color: #D4AF37; font-family: 'Playfair Display'; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 5px; z-index: 10;">MITOS DE AMÉRICA</div>
            <div class="carta-texto" style="color: #94a3b8; font-size: 12px; font-style: italic; z-index: 10;">Escribe la fuente, versión o instrucciones aquí...</div>
        `;
        back.style.background = '#1e293b';
        back.style.border = '1px solid #0f172a';

        if(typeof showToast === 'function') showToast('Carta ' + titulo + ' creada', 'success');
        if(typeof autosave === 'function') autosave();
    }, 100);
}