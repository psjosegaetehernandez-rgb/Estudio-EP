let elementoSeleccionado = null;
let tokenSeleccionado = null;

function seleccionarElemento(elmnt) {
    // 1. Ocultar panel de catálogo si estaba abierto
    const cPanel = document.getElementById('catalogo-detalle-panel');
    if(cPanel) cPanel.style.display = 'none';

    // 2. Limpiar selección anterior
    if(elementoSeleccionado) {
        elementoSeleccionado.classList.remove('selected');
        const oldMenu = elementoSeleccionado.querySelector('.floating-actions');
        if (oldMenu) oldMenu.remove();
    }
    elementoSeleccionado = elmnt; 
    elmnt.classList.add('selected');

    // 3. Ocultar todos los grupos
    const grupos = ['grupo-token', 'grupo-uno', 'props-carta', 'props-especifico', 'grupo-dorso-universal', 'grupo-tablero', 'grupo-icono-reflexion'];
    grupos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 4. Mostrar contenedor base
    if(document.getElementById('props-empty')) document.getElementById('props-empty').style.display = 'none';
    if(document.getElementById('props-content')) document.getElementById('props-content').style.display = 'block';
    if(document.getElementById('props-actions')) document.getElementById('props-actions').style.display = 'block';

    // --- LÓGICA DE DETECCIÓN ---

    // A) ES UN TABLERO
    if (elmnt.classList.contains('board-hexagono') || elmnt.classList.contains('board-mapa') || elmnt.classList.contains('board-perimetro') || elmnt.classList.contains('board-player')) {
        document.getElementById('grupo-tablero').style.display = 'block';
        const bg = elmnt.style.backgroundImage;
        const controles = document.getElementById('controles-img-tablero');
        if(controles) controles.style.display = (bg && bg !== 'none') ? 'block' : 'none';
        mostrarMenuFlotante(elmnt);
        return;
    }

    // B) ES UNA CARTA (Normal o Reflexión)
    if (elmnt.querySelector('.carta-container')) {
        document.getElementById('props-carta').style.display = 'block';
        if (elmnt.querySelector('.carta-texto')) document.getElementById('prop-text').value = elmnt.querySelector('.carta-texto').innerText;
        if (elmnt.querySelector('.dato-instrucciones')) document.getElementById('prop-instrucciones').value = elmnt.querySelector('.dato-instrucciones').innerText;
        
        const gIcono = document.getElementById('grupo-icono-reflexion');
        if (gIcono && elmnt.querySelector('.titulo-reflexion')) gIcono.style.display = 'block';
        
        mostrarMenuFlotante(elmnt);
        return;
    }

    // C) ES UN TOKEN GENÉRICO (Con texto)
    if (elmnt.classList.contains('token-wrapper')) {
        document.getElementById('grupo-token').style.display = 'block';
        tokenSeleccionado = elmnt;
        const front = elmnt.querySelector('.token-front');
        if(front) document.getElementById('prop-token-color').value = rgbToHex(front.style.backgroundColor || '#ffffff');
        mostrarMenuFlotante(elmnt);
        return;
    }

    // D) OTROS (Notas, Meeples 3D, Cubos 3D)
    document.getElementById('props-especifico').style.display = 'block';
    document.getElementById('lbl-especifico').innerText = "Contenido / Color HEX";
    let textoActual = elmnt.innerText || '';
    if(elmnt.classList.contains('token-cube-3d')) textoActual = elmnt.style.getPropertyValue('--cube-color') || '#dc2626';
    if(elmnt.classList.contains('token-meeple-css')) textoActual = elmnt.style.getPropertyValue('--meeple-color') || '#8B3A3A';
    
    document.getElementById('prop-especifico-text').value = textoActual;

    mostrarMenuFlotante(elmnt);
}

// ================= ACTUALIZACIÓN DE PROPIEDADES =================
function actualizarPropiedad(prop, valor) {
    if (!elementoSeleccionado) return;
    
    if (prop === 'especifico') {
        if (elementoSeleccionado.classList.contains('token-cube-3d')) {
            elementoSeleccionado.style.setProperty('--cube-color', valor);
        } else if (elementoSeleccionado.classList.contains('token-meeple-css')) {
            elementoSeleccionado.style.setProperty('--meeple-color', valor);
        } else {
            const editable = elementoSeleccionado.querySelector('[contenteditable="true"]');
            if (editable) editable.innerText = valor;
            else elementoSeleccionado.innerText = valor;
        }
    } 
    else if (prop === 'texto') { 
        const d = elementoSeleccionado.querySelector('.carta-texto'); if (d) d.innerText = valor; 
    }
    else if (prop === 'instrucciones') { 
        const d = elementoSeleccionado.querySelector('.dato-instrucciones'); if (d) d.innerText = valor; 
    }
    autosave();
}

// ================= IMAGEN PARA TABLEROS =================
function subirImagenTablero(event) {
    const file = event.target.files[0]; if (!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        elementoSeleccionado.style.backgroundImage = `url(${e.target.result})`;
        elementoSeleccionado.style.backgroundSize = 'cover';
        elementoSeleccionado.style.backgroundPosition = 'center';
        if(document.getElementById('controles-img-tablero')) document.getElementById('controles-img-tablero').style.display = 'block';
        autosave(); showToast("Imagen de tablero cargada", "success");
    };
    reader.readAsDataURL(file);
}
function ajustarImagenTablero(tipo, valor) {
    if (!elementoSeleccionado) return;
    if (tipo === 'zoom') elementoSeleccionado.style.backgroundSize = (valor * 100) + '%';
    else if (tipo === 'x' || tipo === 'y') {
        let pos = elementoSeleccionado.style.backgroundPosition || '50% 50%';
        let parts = pos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if (tipo === 'x') x = valor + '%'; if (tipo === 'y') y = valor + '%';
        elementoSeleccionado.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

// ================= IMAGEN PARA CARTAS =================
function subirImagenCarta(event) {
    const file = event.target.files[0]; if (!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const front = elementoSeleccionado.querySelector('.carta-front');
        if (front) {
            front.style.backgroundImage = `url(${e.target.result})`;
            front.style.backgroundSize = 'cover';
            front.style.backgroundPosition = 'center';
            if(document.getElementById('controles-img-carta')) document.getElementById('controles-img-carta').style.display = 'block';
            autosave(); showToast("Imagen añadida a la carta", "success");
        }
    };
    reader.readAsDataURL(file);
}
function ajustarImagenCarta(tipo, valor) {
    if (!elementoSeleccionado) return;
    const front = elementoSeleccionado.querySelector('.carta-front');
    if (!front) return;
    if (tipo === 'zoom') front.style.backgroundSize = (valor * 100) + '%';
    else if (tipo === 'x' || tipo === 'y') {
        let pos = front.style.backgroundPosition || '50% 50%';
        let parts = pos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if (tipo === 'x') x = valor + '%'; if (tipo === 'y') y = valor + '%';
        front.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

// ================= TOKENS =================
function cambiarColorToken(color) {
    if(!tokenSeleccionado) return;
    const front = tokenSeleccionado.querySelector('.token-front');
    if(front) front.style.backgroundColor = color;
    autosave();
}
function cambiarTextoToken(texto) {
    if(!tokenSeleccionado) return;
    const txt = tokenSeleccionado.querySelector('.token-text');
    if(txt) txt.innerText = texto;
    autosave();
}
function subirImagenToken(event) {
    const file = event.target.files[0]; if(!file || !tokenSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const front = tokenSeleccionado.querySelector('.token-front');
        if(front) {
            const txt = front.querySelector('.token-text'); if(txt) txt.style.display = 'none';
            let img = front.querySelector('.token-img'); if(!img) { img = document.createElement('img'); img.className = 'token-img'; front.insertBefore(img, front.firstChild); }
            img.src = e.target.result; img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
            autosave();
        }
    }; reader.readAsDataURL(file);
}

// ================= ACCIONES GENERALES =================
function mostrarMenuFlotante(elmnt) {
    document.querySelectorAll('.floating-actions').forEach(m => m.remove());
    const menu = document.createElement('div');
    menu.className = 'floating-actions';
    menu.style.cssText = 'position:absolute; top:-40px; left:50%; transform:translateX(-50%); background:white; padding:5px; border-radius:5px; display:flex; gap:5px; box-shadow:0 2px 5px rgba(0,0,0,0.2); z-index:1000;';
    menu.innerHTML = `
        <button onclick="event.stopPropagation(); duplicarElemento()" title="Duplicar" style="border:none; background:none; cursor:pointer; color:#475569;"><i class="fa-regular fa-clone"></i></button>
        <button onclick="event.stopPropagation(); pedirEliminar()" title="Eliminar" style="border:none; background:none; cursor:pointer; color:#ef4444;"><i class="fa-regular fa-trash-can"></i></button>
    `;
    elmnt.appendChild(menu);
}

function pedirEliminar() {
    if (!elementoSeleccionado) return;
    if (confirm("¿Eliminar este elemento del lienzo?")) eliminarElemento();
}
function eliminarElemento() {
    if (!elementoSeleccionado) return;
    elementoSeleccionado.remove();
    elementoSeleccionado = null;
    if(document.getElementById('props-empty')) document.getElementById('props-empty').style.display = 'block';
    if(document.getElementById('props-content')) document.getElementById('props-content').style.display = 'none';
    if(document.getElementById('props-actions')) document.getElementById('props-actions').style.display = 'none';
    autosave();
}

function duplicarElemento() {
    if (!elementoSeleccionado) return;
    const clone = elementoSeleccionado.cloneNode(true);
    let left = parseFloat(elementoSeleccionado.style.left) || 0;
    let top = parseFloat(elementoSeleccionado.style.top) || 0;
    clone.style.left = (left + 30) + 'px';
    clone.style.top = (top + 30) + 'px';
    clone.classList.remove('selected');
    clone.querySelectorAll('.floating-actions').forEach(m => m.remove());
    document.getElementById('canvas').appendChild(clone);
    if (typeof hacerArrastrable === 'function') hacerArrastrable(clone);
    seleccionarElemento(clone);
    autosave();
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return rgb || '#1e293b';
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return '#1e293b';
    const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
}