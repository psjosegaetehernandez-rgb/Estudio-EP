function abrirAyuda() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.style.display = 'flex';
        renderAyuda();
    }
}

function cerrarAyuda() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.style.display = 'none';
}

function renderAyuda(filtro = '') {
    const container = document.getElementById('help-list-container');
    const detail = document.getElementById('help-detail-content');
    if (!container || !detail) return;

    container.innerHTML = '';
    detail.innerHTML = '<p style="color:#64748b; text-align:center; margin-top:50px;">Selecciona un juego del menú de la izquierda para ver sus reglas y componentes.</p>';

    const filtroLower = filtro.toLowerCase();
    
    if (typeof CATALOGO_JUEGOS !== 'undefined') {
        CATALOGO_JUEGOS.forEach(juego => {
            if (filtro && !juego.nombre.toLowerCase().includes(filtroLower)) return;

            const item = document.createElement('div');
            item.style.cssText = 'padding: 10px; border-bottom: 1px solid #e2e8f0; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;';
            item.onmouseover = () => item.style.background = '#f1f5f9';
            item.onmouseout = () => item.style.background = 'transparent';
            item.onclick = () => mostrarDetalleAyuda(juego.id, juego.nombre);
            
            item.innerHTML = `
                <div style="width: 30px; height: 30px; background: ${juego.color}20; color: ${juego.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid ${juego.icono}" style="font-size: 14px;"></i>
                </div>
                <div style="font-size: 13px; font-weight: bold; color: #1e293b;">${juego.nombre}</div>
            `;
            container.appendChild(item);
        });
    }
}

function mostrarDetalleAyuda(id, nombre) {
    const detail = document.getElementById('help-detail-content');
    if (!detail) return;

    const data = typeof AYUDA_JUEGOS !== 'undefined' ? AYUDA_JUEGOS[id] : null;

    if (data) {
        detail.innerHTML = `
            <h2 style="font-family: 'Playfair Display'; color: #8B3A3A; margin-bottom: 5px;">${nombre}</h2>
            <hr style="border: none; border-top: 2px solid #8B3A3A; margin-bottom: 20px;">
            
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #0284c7; margin-bottom: 10px; font-size: 14px;"><i class="fa-solid fa-boxes-stacked"></i> Imprimibles / Componentes</h4>
                <p style="font-size: 13px; color: #0f172a;">${data.componentes}</p>
            </div>

            <div style="background: #fdfbf7; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1;">
                <h4 style="color: #1e293b; margin-bottom: 10px; font-size: 14px;"><i class="fa-solid fa-book-open"></i> Reglas y Cómo Jugar</h4>
                <p style="font-size: 13px; color: #334155; line-height: 1.6;">${data.reglas}</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <button class="btn btn-primary" style="background: #8B3A3A; border: none;" onclick="cerrarAyuda(); switchTool('catalogo', document.querySelector('.tool-tab[onclick*=catalogo]')); mostrarDetalleJuego(CATALOGO_JUEGOS.find(j => j.id === '${id}'));">
                    <i class="fa-solid fa-cloud-arrow-down"></i> Ir a este juego en el Catálogo
                </button>
            </div>
        `;
    } else {
        detail.innerHTML = `
            <h2 style="font-family: 'Playfair Display'; color: #8B3A3A; margin-bottom: 5px;">${nombre}</h2>
            <p style="color: #64748b; margin-top: 20px;">Aún no hay un manual detallado para este juego en la base de datos.</p>
        `;
    }
}