let elementoSeleccionado = null;
let tokenSeleccionado = null;

function seleccionarElemento(elmnt) {
    if(elementoSeleccionado) {
        elementoSeleccionado.classList.remove('selected');
        const oldMenu = elementoSeleccionado.querySelector('.floating-actions');
        if(oldMenu) oldMenu.remove();
    }
    elementoSeleccionado = elmnt; elmnt.classList.add('selected');
    
    // Mostrar el menú flotante de acciones (v114.0)
    mostrarMenuFlotante(elmnt);
    
    // Ocultar el Anexo si estaba abierto
    const anexo = document.getElementById('anexo-facilitacion');
    if(anexo) anexo.style.display = 'none';

    document.getElementById('props-empty').style.display = 'none';
    document.getElementById('props-content').style.display = 'block';
    document.getElementById('props-actions').style.display = 'block';
    
    document.getElementById('grupo-token').style.display = 'none';
    document.getElementById('grupo-uno').style.display = 'none';
    document.getElementById('props-carta').style.display = 'none';
    document.getElementById('props-especifico').style.display = 'none';
    document.getElementById('grupo-dorso-universal').style.display = 'none';
    document.getElementById('grupo-tablero').style.display = 'none'; // Ocultar tablero por defecto

    // ¿Es un tablero de Eurogame o Party?
    if (elmnt.classList.contains('board-hexagono') || elmnt.classList.contains('board-mapa') || elmnt.classList.contains('board-player') || elmnt.classList.contains('board-mercado') || elmnt.classList.contains('board-dial') || elmnt.classList.contains('board-trivial') || elmnt.classList.contains('board-grid') || elmnt.classList.contains('board-dobble') || elmnt.classList.contains('board-perimetro')) {
        document.getElementById('grupo-tablero').style.display = 'block';
        document.getElementById('props-content').style.display = 'block'; // Asegurar que el contenedor padre esté visible
        const bg = elmnt.style.backgroundImage;
        if(bg && bg !== 'none') {
            document.getElementById('controles-img-tablero').style.display = 'block';
        } else {
            document.getElementById('controles-img-tablero').style.display = 'none';
        }
        return; // Salir para no cargar las propiedades de carta/token
    }

    if (elmnt.classList.contains('qr-wrapper')) {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('lbl-especifico').innerText = "Enlace del Código QR";
        document.getElementById('prop-especifico-text').value = elmnt.dataset.qrText || 'https://ejemplo.com';
        return;
    }
    if (elmnt.classList.contains('token-wrapper') || elmnt.classList.contains('token-meeple-css') || elmnt.classList.contains('token-cube-3d')) {
        document.getElementById('grupo-token').style.display = 'block';
        seleccionarToken(elmnt);
    } 
    else if (elmnt.querySelector('.carta-uno')) {
        document.getElementById('grupo-uno').style.display = 'block';
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('lbl-especifico').innerText = "Texto UNO";
        const txt = elmnt.querySelector('.carta-uno-texto');
        if(txt) document.getElementById('prop-especifico-text').value = txt.innerText;
        mostrarDorsoUniversal(elmnt);
    }
    else if (elmnt.querySelector('.carta-container')) {
        document.getElementById('props-carta').style.display = 'block';
        
        if(elmnt.querySelector('.carta-reflexion-front')) {
            // ES UNA TARJETA DE REFLEXIÓN
            document.getElementById('prop-text').value = elmnt.querySelector('.titulo-reflexion').innerText;
            const lista = Array.from(elmnt.querySelectorAll('.lista-reflexion li')).map(li => li.innerText).join('\n');
            document.getElementById('prop-instrucciones').value = lista;
            
            // Mostrar selector de ícono
            const gIcono = document.getElementById('grupo-icono-reflexion');
            if(gIcono) {
                gIcono.style.display = 'block';
                const iconoActual = elmnt.querySelector('.icon-svg').className.split(' ').pop();
                document.getElementById('prop-icono-reflexion').value = iconoActual;
            }
        } else {
            // CARTA COMÚN
            if(elmnt.querySelector('.carta-texto')) document.getElementById('prop-text').value = elmnt.querySelector('.carta-texto').innerText;
            if(elmnt.querySelector('.dato-instrucciones')) document.getElementById('prop-instrucciones').value = elmnt.querySelector('.dato-instrucciones').innerText;
            const gIcono = document.getElementById('grupo-icono-reflexion');
            if(gIcono) gIcono.style.display = 'none';
        }
        mostrarDorsoUniversal(elmnt);
    }
    else {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('prop-especifico-text').disabled = false;
        
        if(elmnt.querySelector('.carta-naipe')) { document.getElementById('lbl-especifico').innerText = "Título Central"; document.getElementById('prop-especifico-text').value = elmnt.querySelector('.naipe-centro h3').innerText; }
        else if(elmnt.querySelector('.carta-duo')) { document.getElementById('lbl-especifico').innerText = "Texto del Refrán"; document.getElementById('prop-especifico-text').value = elmnt.querySelector('.carta-duo strong').innerText; }
        else if(elmnt.querySelector('.carta-evento')) { document.getElementById('lbl-especifico').innerText = "Texto del Evento"; document.getElementById('prop-especifico-text').value = elmnt.querySelector('.carta-evento-texto').innerText; mostrarDorsoUniversal(elmnt); }
        else if(elmnt.querySelector('.carta-rol')) { document.getElementById('lbl-especifico').innerText = "Rol Oculto"; document.getElementById('prop-especifico-text').value = elmnt.querySelector('.carta-rol-texto').innerText; mostrarDorsoUniversal(elmnt); }
        else if(elmnt.classList.contains('nota-adhesiva')) { document.getElementById('lbl-especifico').innerText = "Contenido"; document.getElementById('prop-especifico-text').value = elmnt.innerText; }
        else { document.getElementById('lbl-especifico').innerText = "Contenido"; document.getElementById('prop-especifico-text').value = elmnt.innerText; }
    }
}

function mostrarDorsoUniversal(elmnt) {
    const gDorso = document.getElementById('grupo-dorso-universal');
    if(gDorso) {
        gDorso.style.display = 'block';
        const back = elmnt.querySelector('.carta-back') || elmnt.querySelector('.dorso-universal');
        if(back) {
            document.getElementById('prop-dorso-color').value = rgbToHex(back.style.backgroundColor || '#1e293b');
            const controles = document.getElementById('controles-img-dorso');
            if(controles) {
                // Si la carta ya tiene una imagen en el dorso, mostramos los controles
                if(back.style.backgroundImage && back.style.backgroundImage !== 'none') {
                    controles.style.display = 'block';
                } else {
                    controles.style.display = 'none';
                }
            }
        }
    }
}

function actualizarPropiedad(prop, valor) {
    if(!elementoSeleccionado) return;
    if(prop === 'texto') { 
        const d = elementoSeleccionado.querySelector('.carta-texto'); if(d) d.innerText = valor; 
        const dr = elementoSeleccionado.querySelector('.titulo-reflexion'); if(dr) dr.innerText = valor;
    }
    else if(prop === 'instrucciones') { 
        const d = elementoSeleccionado.querySelector('.dato-instrucciones'); if(d) d.innerText = valor; 
        const dr = elementoSeleccionado.querySelector('.lista-reflexion');
        if(dr) {
            const lineas = valor.split('\n').filter(l => l.trim() !== '');
            dr.innerHTML = lineas.map(l => `<li style="margin-bottom: 8px; font-size: 12px; text-align: left; color: #475569;">${l}</li>`).join('');
        }
    }
    else if(prop === 'especifico') {
        if(elementoSeleccionado.querySelector('.carta-naipe')) elementoSeleccionado.querySelector('.naipe-centro h3').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-uno-texto')) elementoSeleccionado.querySelector('.carta-uno-texto').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-duo')) elementoSeleccionado.querySelector('.carta-duo strong').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-evento')) elementoSeleccionado.querySelector('.carta-evento-texto').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-rol')) elementoSeleccionado.querySelector('.carta-rol-texto').innerText = valor;
        else if(elementoSeleccionado.classList.contains('nota-adhesiva')) elementoSeleccionado.innerText = valor;
        else if(elementoSeleccionado.classList.contains('token-wrapper')) { const txt = elementoSeleccionado.querySelector('.token-text'); if(txt) txt.innerText = valor; }
        else if(elementoSeleccionado.classList.contains('token-meeple-css')) { elementoSeleccionado.style.setProperty('--meeple-color', valor); }
        else if(elementoSeleccionado.classList.contains('qr-wrapper')) {
            elementoSeleccionado.dataset.qrText = valor;
            const divId = elementoSeleccionado.dataset.qrDivId;
            if(divId && typeof QRCode !== 'undefined') {
                const div = document.getElementById(divId);
                if(div) {
                    div.innerHTML = ''; // Limpiar QR viejo
                    new QRCode(div, { text: valor, width: 100, height: 100, colorDark: "#1e293b", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
                }
            }
        }
        else if(elementoSeleccionado.classList.contains('token-cube-3d')) { elementoSeleccionado.style.setProperty('--cube-color', valor); }
    }
    autosave();
}

function cambiarColorJuego(color) {
    if(!elementoSeleccionado) return;
    const uno = elementoSeleccionado.querySelector('.carta-uno');
    if(uno) { uno.style.borderColor = color; const ovalo = uno.querySelector('.carta-uno-ovalo'); if(ovalo) ovalo.style.backgroundColor = color; }
    autosave();
}
function insertarSimboloUno(simbolo) { const txt = document.getElementById('prop-especifico-text'); if(txt) { txt.value = simbolo; actualizarPropiedad('especifico', simbolo); } }

// ================= DORSO UNIVERSAL =================
function obtenerContenedorCarta(el) {
    const inner = el.querySelector('.carta-uno, .carta-rol, .carta-evento, .carta-container');
    return inner ? inner : el;
}

function cambiarColorDorsoUniversal(color) {
    if(!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    const back = card.querySelector('.carta-back');
    if(back) { 
        back.style.backgroundColor = color; 
    } 
    else {
        let dorso = card.querySelector('.dorso-universal');
        if(!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.appendChild(dorso); }
        dorso.style.backgroundColor = color;
    }
    autosave();
}

function subirImagenDorsoUniversal(event) {
    const file = event.target.files[0]; if(!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    comprimirYSubir(file, (base64) => {
        const card = obtenerContenedorCarta(elementoSeleccionado);
        const nativeBack = card.querySelector('.carta-back');
        
        if (nativeBack) {
            // Carta 3D (Boleto, Tren, Catán, etc.)
            nativeBack.style.backgroundImage = `url(${e.target.result})`;
            nativeBack.style.backgroundSize = 'cover';
            nativeBack.style.backgroundPosition = 'center';
            // Ocultar el contenido por defecto (textos o íconos) para que se vea la foto
            Array.from(nativeBack.children).forEach(child => child.style.display = 'none');
            
            // Voltear automáticamente para que veas la imagen
            if(!card.classList.contains('flipped')) card.classList.add('flipped');
        } else {
            // Cartas legacy (rol, evento) que usan capa superpuesta
            let dorso = card.querySelector('.dorso-universal');
            if(!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.appendChild(dorso); }
            dorso.style.backgroundImage = `url(${e.target.result})`;
            dorso.style.backgroundSize = 'cover';
            dorso.style.backgroundPosition = 'center';
            if(dorso.style.display !== 'flex') voltearCartaUniversal();
        }

        const controles = document.getElementById('controles-img-dorso');
        if(controles) controles.style.display = 'block';
        
        autosave(); showToast("Imagen de dorso cargada", "success");
    };
    reader.readAsDataURL(file);
}

function ajustarImagenDorso(tipo, valor) {
    if(!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    const dorso = card.querySelector('.carta-back') || card.querySelector('.dorso-universal');
    if(!dorso) return;
    
    if(tipo === 'zoom') dorso.style.backgroundSize = (valor * 100) + '%';
    else if (tipo === 'x' || tipo === 'y') {
        let currentPos = dorso.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if(tipo === 'x') x = valor + '%'; if(tipo === 'y') y = valor + '%';
        dorso.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

function voltearCartaUniversal() {
    if(!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    
    if(card.classList.contains('carta-container')) { 
        card.classList.toggle('flipped'); 
        autosave();
        return;
    } 
    
    let dorso = card.querySelector('.dorso-universal');
    if(!dorso) {
        dorso = document.createElement('div'); dorso.className = 'dorso-universal';
        dorso.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; border-radius:inherit; display:none; align-items:center; justify-content:center; font-family:"Patrick Hand"; font-size:24px; color:white; background:#1e293b;';
        dorso.innerText = 'Dorso';
        card.appendChild(dorso);
    }
    
    if(dorso.style.display === 'none' || dorso.style.display === '') {
        dorso.style.display = 'flex';
        Array.from(card.children).forEach(child => {
            if(!child.classList.contains('dorso-universal')) {
                child.dataset.oldDisplay = child.style.display || 'block';
                child.style.display = 'none';
            }
        });
    } else {
        dorso.style.display = 'none';
        Array.from(card.children).forEach(child => {
            if(!child.classList.contains('dorso-universal')) {
                child.style.display = child.dataset.oldDisplay || '';
            }
        });
    }
    autosave();
}

// ================= TOKEN BUILDER (v34.0) =================
function seleccionarToken(tokenWrapper) {
    tokenSeleccionado = tokenWrapper;
    const color = tokenWrapper.style.backgroundColor || '#3b82f6';
    document.getElementById('prop-token-color').value = rgbToHex(color);
    
    const txt = tokenWrapper.querySelector('.token-txt-overlay');
    if(txt) document.getElementById('prop-token-texto').value = txt.innerText;
    
    // Detectar forma actual
    const formas = ['shape-circle', 'shape-square', 'shape-hex', 'shape-star', 'shape-meeple'];
    let formaActual = 'shape-circle';
    formas.forEach(f => { if(tokenWrapper.classList.contains(f)) formaActual = f; });
    document.getElementById('prop-token-forma').value = formaActual;
}

function cambiarFormaToken(forma) {
    if(!tokenSeleccionado) return;
    const formas = ['shape-circle', 'shape-square', 'shape-hex', 'shape-star', 'shape-meeple'];
    formas.forEach(f => tokenSeleccionado.classList.remove(f));
    tokenSeleccionado.classList.add(forma);
    autosave();
}

function cambiarColorToken(color) {
    if(!tokenSeleccionado) return;
    tokenSeleccionado.style.backgroundColor = color;
    autosave();
}

function cambiarTextoToken(texto) {
    if(!tokenSeleccionado) return;
    let txt = tokenSeleccionado.querySelector('.token-txt-overlay');
    if(!txt) {
        txt = document.createElement('span');
        txt.className = 'token-txt-overlay';
        tokenSeleccionado.appendChild(txt);
    }
    txt.innerText = texto;
    autosave();
}

function subirImagenToken(event) {
    const file = event.target.files[0]; if(!file || !tokenSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        tokenSeleccionado.style.backgroundImage = `url(${e.target.result})`;
        const txt = tokenSeleccionado.querySelector('.token-txt-overlay');
        if(txt) txt.style.display = 'none'; // Ocultar texto si hay imagen
        autosave(); showToast("Imagen aplicada", "success");
    }; reader.readAsDataURL(file);
}

function quitarImagenToken() {
    if(!tokenSeleccionado) return;
    tokenSeleccionado.style.backgroundImage = 'none';
    const txt = tokenSeleccionado.querySelector('.token-txt-overlay');
    if(txt) txt.style.display = 'block';
    autosave();
}

// ================= ACCIONES GENERALES =================

// ================= MENÚ FLOTANTE DE ACCIONES (v114.0) =================
function mostrarMenuFlotante(elmnt) {
    // Eliminar menús anteriores
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
    if(!elementoSeleccionado) return;
    let target = elementoSeleccionado.querySelector('[contenteditable="true"]') || elementoSeleccionado;
    
    if(target) {
        target.setAttribute('contenteditable', 'true');
        target.focus();
        // Seleccionar todo el texto
        if (window.getSelection && document.createRange) {
            var range = document.createRange();
            range.selectNodeContents(target);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
function pedirEliminar() {
    if(!elementoSeleccionado) return;
    if(confirm("¿Eliminar este elemento del lienzo?")) {
        elementoSeleccionado.remove(); elementoSeleccionado = null; tokenSeleccionado = null;
        document.getElementById('props-empty').style.display = 'block'; document.getElementById('props-content').style.display = 'none'; document.getElementById('props-actions').style.display = 'none'; autosave(); showToast("Elemento eliminado", "success");
    document.querySelectorAll('.floating-actions').forEach(m => m.remove());
    }
}

function duplicarElemento() {
    if(!elementoSeleccionado) return;
    const clone = elementoSeleccionado.cloneNode(true); clone.classList.remove('selected');
    const currentLeft = parseInt(elementoSeleccionado.style.left) || 0; const currentTop = parseInt(elementoSeleccionado.style.top) || 0;
    clone.style.left = (currentLeft + 30) + 'px'; clone.style.top = (currentTop + 30) + 'px';
    document.getElementById('canvas').appendChild(clone); hacerArrastrable(clone); seleccionarElemento(clone); autosave(); showToast("Elemento duplicado", "success");
}

function voltearCarta() { if(!elementoSeleccionado) return; const c = elementoSeleccionado.querySelector('.carta-container'); if(c) c.classList.toggle('flipped'); autosave(); }

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return rgb || '#1e293b';
    const a = rgb.split("(")[1].split(")")[0].split(",");
    const b = a.map(x => { x = parseInt(x).toString(16); return (x.length == 1) ? "0" + x : x; });
    return "#" + b.join("");
}


// ================= IMAGEN PARA CARTAS (v93.0) =================
function subirImagenCarta(event) {
    const file = event.target.files[0]; if(!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const front = elementoSeleccionado.querySelector('.carta-front');
        if(front) {
            front.style.backgroundImage = `url(${e.target.result})`;
            front.style.backgroundSize = 'cover';
            front.style.backgroundPosition = 'center';
            front.classList.add('con-imagen-fondo');
            
            const controles = document.getElementById('controles-img-carta');
            if(controles) controles.style.display = 'block';
            
            autosave(); showToast("Imagen añadida a la carta", "success");
        }
    };
    reader.readAsDataURL(file);
}

function ajustarImagenCarta(tipo, valor) {
    if(!elementoSeleccionado) return;
    const front = elementoSeleccionado.querySelector('.carta-front');
    if(!front) return;
    
    if(tipo === 'zoom') {
        // Como estamos usando cover, el zoom se simula escalando el fondo, 
        // pero para ser precisos, usamos background-size
        front.style.backgroundSize = (valor * 100) + '%';
    }
    else if (tipo === 'x' || tipo === 'y') {
        let currentPos = front.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if(tipo === 'x') x = valor + '%'; if(tipo === 'y') y = valor + '%';
        front.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}


// ================= IMAGEN PARA TABLEROS (v99.0) =================
function subirImagenTablero(event) {
    const file = event.target.files[0]; if(!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        // Aplicamos la imagen al fondo del tablero
        elementoSeleccionado.style.backgroundImage = `url(${e.target.result})`;
        elementoSeleccionado.style.backgroundSize = 'cover';
        elementoSeleccionado.style.backgroundPosition = 'center';
        
        // Hacemos que los colores originales sean semi-transparentes para que se vea la imagen
        // Pero manteniendo la forma (clip-path) intacta.
        
        const controles = document.getElementById('controles-img-tablero');
        if(controles) controles.style.display = 'block';
        
        autosave(); showToast("Imagen de tablero cargada", "success");
    };
    reader.readAsDataURL(file);
}

function ajustarImagenTablero(tipo, valor) {
    if(!elementoSeleccionado) return;
    
    if(tipo === 'zoom') {
        elementoSeleccionado.style.backgroundSize = (valor * 100) + '%';
    }
    else if (tipo === 'x' || tipo === 'y') {
        let currentPos = elementoSeleccionado.style.backgroundPosition || '50% 50%';
        let parts = currentPos.split(' ');
        let x = parts[0]; let y = parts[1] || '50%';
        if(tipo === 'x') x = valor + '%'; if(tipo === 'y') y = valor + '%';
        elementoSeleccionado.style.backgroundPosition = `${x} ${y}`;
    }
    autosave();
}

function quitarImagenTablero() {
    if(!elementoSeleccionado) return;
    elementoSeleccionado.style.backgroundImage = 'none';
    const controles = document.getElementById('controles-img-tablero');
    if(controles) controles.style.display = 'none';
    autosave(); showToast("Imagen del tablero eliminada", "info");
}
// ================= CAMBIAR ICONO DE REFLEXIÓN =================
function cambiarIconoReflexion(nuevoIcono) {
    if(!elementoSeleccionado) return;
    const icono = elementoSeleccionado.querySelector('.icon-svg');
    if(icono) {
        // Limpiar clases de fontawesome viejas
        icono.className = `fa-solid ${nuevoIcono} icon-svg`;
        autosave();
    }
}