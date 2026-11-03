let elementoSeleccionado = null;
let tokenSeleccionado = null;

function seleccionarElemento(elmnt) {
    // 1. Limpiar selecciones anteriores
    if (elementoSeleccionado) {
        elementoSeleccionado.classList.remove('selected');
        const oldMenu = elementoSeleccionado.querySelector('.floating-actions');
        if (oldMenu) oldMenu.remove();
    }
    elementoSeleccionado = elmnt; 
    elmnt.classList.add('selected');
    
    // 2. Ocultar todos los grupos de propiedades para evitar conflictos visuales
    const grupos = ['grupo-token', 'grupo-uno', 'props-carta', 'props-especifico', 'grupo-dorso-universal', 'grupo-tablero', 'grupo-icono-reflexion'];
    grupos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 3. Mostrar el contenedor base de propiedades
    document.getElementById('props-empty').style.display = 'none';
    document.getElementById('props-content').style.display = 'block';
    document.getElementById('props-actions').style.display = 'block';

    // --- LÓGICA DE DETECCIÓN DE ELEMENTOS ---

    // A) ES UN TABLERO (Catán, Pandemic, Monopoly, etc.)
    if (elmnt.classList.contains('board-hexagono') || elmnt.classList.contains('board-mapa') || elmnt.classList.contains('board-perimetro') || elmnt.classList.contains('board-player') || elmnt.classList.contains('board-mercado') || elmnt.classList.contains('board-dial') || elmnt.classList.contains('board-trivial') || elmnt.classList.contains('board-grid') || elmnt.classList.contains('board-dobble')) {
        const gt = document.getElementById('grupo-tablero');
        if (gt) gt.style.display = 'block';
        
        const bg = elmnt.style.backgroundImage;
        const controles = document.getElementById('controles-img-tablero');
        if (controles) controles.style.display = (bg && bg !== 'none') ? 'block' : 'none';
        
        mostrarMenuFlotante(elmnt);
        return; // Detener ejecución aquí
    }

    // B) ES UNA FICHA 3D (Cubo o Meeple)
    if (elmnt.classList.contains('token-meeple-css') || elmnt.classList.contains('token-cube-3d')) {
        const pe = document.getElementById('props-especifico');
        if (pe) pe.style.display = 'block';
        
        document.getElementById('lbl-especifico').innerText = "Color de la ficha (HEX)";
        const colorVar = elmnt.classList.contains('token-meeple-css') ? '--meeple-color' : '--cube-color';
        const currentColor = elmnt.style.getPropertyValue(colorVar) || (elmnt.classList.contains('token-meeple-css') ? '#8B3A3A' : '#dc2626');
        document.getElementById('prop-especifico-text').value = currentColor;
        
        mostrarMenuFlotante(elmnt);
        return; // Detener ejecución aquí
    }

    // C) ES UN TOKEN TRADICIONAL (Fichas genéricas)
    if (elmnt.classList.contains('token-wrapper')) {
        document.getElementById('grupo-token').style.display = 'block';
        seleccionarToken(elmnt);
        mostrarMenuFlotante(elmnt);
        return;
    }

    // D) ES UNA CARTA (Normal o de Reflexión)
    if (elmnt.querySelector('.carta-container')) {
        document.getElementById('props-carta').style.display = 'block';
        
        if (elmnt.querySelector('.carta-reflexion-front')) {
            // Carta de Reflexión
            document.getElementById('prop-text').value = elmnt.querySelector('.titulo-reflexion').innerText;
            const lista = Array.from(elmnt.querySelectorAll('.lista-reflexion li')).map(li => li.innerText).join('\n');
            document.getElementById('prop-instrucciones').value = lista;
            
            const gIcono = document.getElementById('grupo-icono-reflexion');
            if (gIcono) {
                gIcono.style.display = 'block';
                const iconoActual = elmnt.querySelector('.icon-svg').className.split(' ').pop();
                document.getElementById('prop-icono-reflexion').value = iconoActual;
            }
        } else {
            // Carta Normal
            if (elmnt.querySelector('.carta-texto')) document.getElementById('prop-text').value = elmnt.querySelector('.carta-texto').innerText;
            if (elmnt.querySelector('.dato-instrucciones')) document.getElementById('prop-instrucciones').value = elmnt.querySelector('.dato-instrucciones').innerText;
        }
        
        mostrarDorsoUniversal(elmnt);
        mostrarMenuFlotante(elmnt);
        return;
    }

    // E) OTROS (Notas, Muros, Tableros viejos)
    document.getElementById('props-especifico').style.display = 'block';
    document.getElementById('lbl-especifico').innerText = "Contenido de Texto";
    let textoActual = elmnt.innerText || '';
    const editable = elmnt.querySelector('[contenteditable="true"]');
    if (editable) textoActual = editable.innerText;
    document.getElementById('prop-especifico-text').value = textoActual;

    mostrarMenuFlotante(elmnt);
}

// ================= ACTUALIZACIÓN DE PROPIEDADES =================
function actualizarPropiedad(prop, valor) {
    if (!elementoSeleccionado) return;
    
    if (prop === 'especifico') {
        if (elementoSeleccionado.classList.contains('token-meeple-css')) {
            elementoSeleccionado.style.setProperty('--meeple-color', valor);
        } else if (elementoSeleccionado.classList.contains('token-cube-3d')) {
            elementoSeleccionado.style.setProperty('--cube-color', valor);
        } else {
            // Es texto genérico
            const editable = elementoSeleccionado.querySelector('[contenteditable="true"]');
            if (editable) editable.innerText = valor;
            else elementoSeleccionado.innerText = valor;
        }
    } 
    else if (prop === 'texto') { 
        const d = elementoSeleccionado.querySelector('.carta-texto'); if (d) d.innerText = valor; 
        const dr = elementoSeleccionado.querySelector('.titulo-reflexion'); if (dr) dr.innerText = valor;
    }
    else if (prop === 'instrucciones') { 
        const d = elementoSeleccionado.querySelector('.dato-instrucciones'); if (d) d.innerText = valor; 
        const dr = elementoSeleccionado.querySelector('.lista-reflexion');
        if (dr) {
            const lineas = valor.split('\n').filter(l => l.trim() !== '');
            dr.innerHTML = lineas.map(l => `<li style="margin-bottom: 8px; font-size: 12px; text-align: left; color: #475569;">${l}</li>`).join('');
        }
    }
    autosave();
}

function cambiarIconoReflexion(nuevoIcono) {
    if (!elementoSeleccionado) return;
    const icono = elementoSeleccionado.querySelector('.icon-svg');
    if (icono) {
        icono.className = `fa-solid ${nuevoIcono} icon-svg`;
        autosave();
    }
}

// ================= IMAGEN PARA TABLEROS =================
function subirImagenTablero(event) {
    const file = event.target.files[0]; if (!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        elementoSeleccionado.style.backgroundImage = `url(${e.target.result})`;
        elementoSeleccionado.style.backgroundSize = 'cover';
        elementoSeleccionado.style.backgroundPosition = 'center';
        
        const controles = document.getElementById('controles-img-tablero');
        if (controles) controles.style.display = 'block';
        
        autosave(); showToast("Imagen de tablero cargada", "success");
    };
    reader.readAsDataURL(file);
}

function ajustarImagenTablero(tipo, valor) {
    if (!elementoSeleccionado) return;
    if (tipo === 'zoom') {
        elementoSeleccionado.style.backgroundSize = (valor * 100) + '%';
    } else if (tipo === 'x' || tipo === 'y') {
        let currentPos = elementoSeleccionado.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if (tipo === 'x') x = valor + '%'; if (tipo === 'y') y = valor + '%';
        elementoSeleccionado.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

function quitarImagenTablero() {
    if (!elementoSeleccionado) return;
    elementoSeleccionado.style.backgroundImage = 'none';
    const controles = document.getElementById('controles-img-tablero');
    if (controles) controles.style.display = 'none';
    autosave(); showToast("Imagen del tablero eliminada", "info");
}

// ================= IMAGEN PARA CARTAS =================
function subirImagenCarta(event) {
    const file = event.target.files[0]; if (!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const front = elementoSeleccionado.querySelector('.carta-front') || elementoSeleccionado.querySelector('.carta-reflexion-front');
        if (front) {
            front.style.backgroundImage = `url(${e.target.result})`;
            front.style.backgroundSize = 'cover';
            front.style.backgroundPosition = 'center';
            
            const controles = document.getElementById('controles-img-carta');
            if (controles) controles.style.display = 'block';
            
            autosave(); showToast("Imagen añadida a la carta", "success");
        }
    };
    reader.readAsDataURL(file);
}

function ajustarImagenCarta(tipo, valor) {
    if (!elementoSeleccionado) return;
    const front = elementoSeleccionado.querySelector('.carta-front') || elementoSeleccionado.querySelector('.carta-reflexion-front');
    if (!front) return;
    
    if (tipo === 'zoom') {
        front.style.backgroundSize = (valor * 100) + '%';
    } else if (tipo === 'x' || tipo === 'y') {
        let currentPos = front.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if (tipo === 'x') x = valor + '%'; if (tipo === 'y') y = valor + '%';
        front.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

// ================= DORSO DE CARTAS =================
function mostrarDorsoUniversal(elmnt) {
    const gDorso = document.getElementById('grupo-dorso-universal');
    if (gDorso) {
        gDorso.style.display = 'block';
        const back = elmnt.querySelector('.carta-back') || elmnt.querySelector('.dorso-universal');
        if (back) {
            document.getElementById('prop-dorso-color').value = rgbToHex(back.style.backgroundColor || '#1e293b');
            const controles = document.getElementById('controles-img-dorso');
            if (controles) {
                if (back.style.backgroundImage && back.style.backgroundImage !== 'none') {
                    controles.style.display = 'block';
                } else {
                    controles.style.display = 'none';
                }
            }
        }
    }
}

function subirImagenDorsoUniversal(event) {
    const file = event.target.files[0]; if (!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const card = obtenerContenedorCarta(elementoSeleccionado);
        const nativeBack = card.querySelector('.carta-back');
        
        if (nativeBack) {
            nativeBack.style.backgroundImage = `url(${e.target.result})`;
            nativeBack.style.backgroundSize = 'cover';
            nativeBack.style.backgroundPosition = 'center';
            Array.from(nativeBack.children).forEach(child => child.style.display = 'none');
            if (!card.classList.contains('flipped')) card.classList.add('flipped');
        } else {
            let dorso = card.querySelector('.dorso-universal');
            if (!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.appendChild(dorso); }
            dorso.style.backgroundImage = `url(${e.target.result})`;
            dorso.style.backgroundSize = 'cover';
            dorso.style.backgroundPosition = 'center';
            if (dorso.style.display !== 'flex') voltearCartaUniversal();
        }
        const controles = document.getElementById('controles-img-dorso');
        if (controles) controles.style.display = 'block';
        autosave(); showToast("Imagen de dorso cargada", "success");
    };
    reader.readAsDataURL(file);
}

function ajustarImagenDorso(tipo, valor) {
    if (!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    const dorso = card.querySelector('.carta-back') || card.querySelector('.dorso-universal');
    if (!dorso) return;
    
    if (tipo === 'zoom') dorso.style.backgroundSize = (valor * 100) + '%';
    else if (tipo === 'x' || tipo === 'y') {
        let currentPos = dorso.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if (tipo === 'x') x = valor + '%'; if (tipo === 'y') y = valor + '%';
        dorso.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

function cambiarColorDorsoUniversal(color) {
    if (!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    const back = card.querySelector('.carta-back');
    if (back) { back.style.backgroundColor = color; } 
    else {
        let dorso = card.querySelector('.dorso-universal');
        if (!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.appendChild(dorso); }
        dorso.style.backgroundColor = color;
    }
    autosave();
}

function voltearCartaUniversal() {
    if (!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    if (card.classList.contains('carta-container')) { 
        card.classList.toggle('flipped'); 
        autosave();
        return;
    } 
    const dorso = card.querySelector('.dorso-universal');
    if (dorso) {
        if (dorso.style.display === 'flex') dorso.style.display = 'none';
        else dorso.style.display = 'flex';
    }
}

function obtenerContenedorCarta(el) {
    const inner = el.querySelector('.carta-uno, .carta-rol, .carta-evento, .carta-container');
    return inner ? inner : el;
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return rgb || '#1e293b';
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return '#1e293b';
    const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

// ================= ACCIONES FLOTANTES =================
function mostrarMenuFlotante(elmnt) {
    document.querySelectorAll('.floating-actions').forEach(m => m.remove());
    const menu = document.createElement('div');
    menu.className = 'floating-actions';
    menu.innerHTML = `
        <button onclick="event.stopPropagation(); activarEdicionInline()" title="Editar Texto"><i class="fa-solid fa-pen"></i></button>
        <button onclick="event.stopPropagation(); duplicarElemento()" title="Duplicar"><i class="fa-regular fa-clone"></i></button>
        <button class="btn-del" onclick="event.stopPropagation(); pedirEliminar()" title="Eliminar"><i class="fa-regular fa-trash-can"></i></button>
    `;
    elmnt.appendChild(menu);
}

function activarEdicionInline() {
    if (!elementoSeleccionado) return;
    let target = elementoSeleccionado.querySelector('[contenteditable="true"]') || elementoSeleccionado;
    if (target) {
        target.setAttribute('contenteditable', 'true');
        target.focus();
        if (window.getSelection && document.createRange) {
            var range = document.createRange();
            range.selectNodeContents(target);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}


// ================= ACCIONES DE ELEMENTOS (v124.0) =================

function pedirEliminar() {
    if (!elementoSeleccionado) return;
    if (typeof showConfirm === 'function') {
        showConfirm("¿Estás seguro de que quieres eliminar este elemento del lienzo?", () => {
            eliminarElemento();
        });
    } else {
        // Fallback de seguridad si el modal falla
        if (confirm("¿Eliminar este elemento?")) eliminarElemento();
    }
}

function eliminarElemento() {
    if (!elementoSeleccionado) return;
    elementoSeleccionado.remove();
    elementoSeleccionado = null;
    
    // Limpiar el panel derecho
    document.getElementById('props-empty').style.display = 'block';
    document.getElementById('props-content').style.display = 'none';
    document.getElementById('props-actions').style.display = 'none';
    document.querySelectorAll('.floating-actions').forEach(m => m.remove());
    
    if (typeof autosave === 'function') autosave();
    if (typeof showToast === 'function') showToast("Elemento eliminado", "success");
}

function duplicarElemento() {
    if (!elementoSeleccionado) return;
    const clone = elementoSeleccionado.cloneNode(true);
    
    // Desplazar un poco la copia
    let left = parseFloat(elementoSeleccionado.style.left) || 0;
    let top = parseFloat(elementoSeleccionado.style.top) || 0;
    clone.style.left = (left + 30) + 'px';
    clone.style.top = (top + 30) + 'px';
    
    // Limpiar clases de selección en el clon
    clone.classList.remove('selected');
    clone.querySelectorAll('.floating-actions').forEach(m => m.remove());

    document.getElementById('canvas').appendChild(clone);
    
    if (typeof hacerArrastrable === 'function') hacerArrastrable(clone);
    
    // Reactivar el doble clic (para voltear cartas) si aplica
    if (clone.querySelector('.carta-container')) {
        clone.addEventListener('dblclick', (e) => {
            if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
                clone.querySelector('.carta-container').classList.toggle('flipped');
            }
        });
    }
    
    if (typeof seleccionarElemento === 'function') seleccionarElemento(clone);
    if (typeof autosave === 'function') autosave();
    if (typeof showToast === 'function') showToast("Elemento duplicado", "success");
}

// ================= EDICIÓN DE TOKENS TRADICIONALES (v124.0) =================

function seleccionarToken(tokenWrapper) {
    tokenSeleccionado = tokenWrapper;
    const front = tokenWrapper.querySelector('.token-front');
    if(front) { document.getElementById('prop-token-color').value = rgbToHex(front.style.backgroundColor || '#ffffff'); }
}

function cambiarFormaToken(forma) {
    if (!elementoSeleccionado) return;
    
    // Limpiar clases viejas de forma en el contenedor y sus hijos
    const formas = ['shape-circle', 'shape-square', 'shape-hex', 'shape-star', 'shape-meeple'];
    const elementos = [
        elementoSeleccionado,
        elementoSeleccionado.querySelector('.token-front'),
        elementoSeleccionado.querySelector('.token-back'),
        elementoSeleccionado.querySelector('.token-container')
    ].filter(Boolean);

    elementos.forEach(el => {
        formas.forEach(f => el.classList.remove(f));
        el.classList.add(forma);
    });

    // Forzar recorte para que las caras internas tomen la forma
    if(elementoSeleccionado.classList.contains('token-wrapper')) {
        elementoSeleccionado.style.overflow = 'hidden';
        elementoSeleccionado.style.borderRadius = (forma === 'shape-circle') ? '50%' : '4px';
        if (forma === 'shape-hex') elementoSeleccionado.style.borderRadius = '0';
    }

    autosave();
}

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
            img.src = e.target.result; autosave();
        }
    }; reader.readAsDataURL(file);
}

function quitarImagenToken() { 
    if(!tokenSeleccionado) return; 
    const front = tokenSeleccionado.querySelector('.token-front'); 
    if(front) { 
        const img = front.querySelector('.token-img'); if(img) img.remove(); 
        const txt = front.querySelector('.token-text'); if(txt) txt.style.display = 'block'; 
        autosave(); 
    } 
}
// ================= EDITOR VISUAL DE TOKENS (v127.0) =================
function cambiarFormaToken(forma) {
    if (!elementoSeleccionado) return;
    
    // Limpiar clases viejas de forma en el contenedor y sus hijos
    const formas = ['shape-circle', 'shape-square', 'shape-hex', 'shape-star', 'shape-meeple'];
    const elementos = [
        elementoSeleccionado,
        elementoSeleccionado.querySelector('.token-front'),
        elementoSeleccionado.querySelector('.token-back'),
        elementoSeleccionado.querySelector('.token-container')
    ].filter(Boolean);

    elementos.forEach(el => {
        formas.forEach(f => el.classList.remove(f));
        el.classList.add(forma);
    });

    // Forzar recorte para que las caras internas tomen la forma
    if(elementoSeleccionado.classList.contains('token-wrapper')) {
        elementoSeleccionado.style.overflow = 'hidden';
        elementoSeleccionado.style.borderRadius = (forma === 'shape-circle') ? '50%' : '4px';
        if (forma === 'shape-hex') elementoSeleccionado.style.borderRadius = '0';
    }

    autosave();
}

function cambiarColorToken(color) {
    if (!elementoSeleccionado) return;
    
    // Si es un Meeple o Cubo 3D (usan variables CSS)
    if (elementoSeleccionado.classList.contains('token-meeple-css')) {
        elementoSeleccionado.style.setProperty('--meeple-color', color);
    } else if (elementoSeleccionado.classList.contains('token-cube-3d')) {
        elementoSeleccionado.style.setProperty('--cube-color', color);
    } else {
        // Es un token genérico
        elementoSeleccionado.style.backgroundColor = color;
    }
    
    // Actualizar el input de color
    const inputColor = document.getElementById('prop-token-color');
    if(inputColor) inputColor.value = color;
    
    autosave();
}