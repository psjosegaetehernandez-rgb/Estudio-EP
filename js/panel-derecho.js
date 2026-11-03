let elementoSeleccionado = null;
let tokenSeleccionado = null;

function seleccionarElemento(elmnt) {
    if(elementoSeleccionado) elementoSeleccionado.classList.remove('selected');
    elementoSeleccionado = elmnt; elmnt.classList.add('selected');
    
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

    if (elmnt.classList.contains('token-wrapper')) {
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
        if(elmnt.querySelector('.carta-texto')) document.getElementById('prop-text').value = elmnt.querySelector('.carta-texto').innerText;
        if(elmnt.querySelector('.dato-instrucciones')) document.getElementById('prop-instrucciones').value = elmnt.querySelector('.dato-instrucciones').innerText;
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
        const back = elmnt.querySelector('.dorso-universal');
        if(back) document.getElementById('prop-dorso-color').value = rgbToHex(back.style.backgroundColor || '#1e293b');
    }
}

function actualizarPropiedad(prop, valor) {
    if(!elementoSeleccionado) return;
    if(prop === 'texto') { const d = elementoSeleccionado.querySelector('.carta-texto'); if(d) d.innerText = valor; }
    else if(prop === 'instrucciones') { const d = elementoSeleccionado.querySelector('.dato-instrucciones'); if(d) d.innerText = valor; }
    else if(prop === 'especifico') {
        if(elementoSeleccionado.querySelector('.carta-naipe')) elementoSeleccionado.querySelector('.naipe-centro h3').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-uno-texto')) elementoSeleccionado.querySelector('.carta-uno-texto').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-duo')) elementoSeleccionado.querySelector('.carta-duo strong').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-evento')) elementoSeleccionado.querySelector('.carta-evento-texto').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-rol')) elementoSeleccionado.querySelector('.carta-rol-texto').innerText = valor;
        else if(elementoSeleccionado.classList.contains('nota-adhesiva')) elementoSeleccionado.innerText = valor;
        else if(elementoSeleccionado.classList.contains('token-wrapper')) { const txt = elementoSeleccionado.querySelector('.token-text'); if(txt) txt.innerText = valor; }
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
    if(back) { back.style.backgroundColor = color; } 
    else {
        let dorso = card.querySelector('.dorso-universal');
        if(!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.insertBefore(dorso, card.firstChild); }
        dorso.style.backgroundColor = color;
    }
    autosave();
}

function subirImagenDorsoUniversal(event) {
    const file = event.target.files[0]; if(!file || !elementoSeleccionado) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const card = obtenerContenedorCarta(elementoSeleccionado);
        let dorso = card.querySelector('.dorso-universal');
        if(!dorso) { dorso = document.createElement('div'); dorso.className = 'dorso-universal'; card.insertBefore(dorso, card.firstChild); }
        dorso.style.backgroundImage = `url(${e.target.result})`;
        const controles = document.getElementById('controles-img-dorso');
        if(controles) controles.style.display = 'block';
        
        // Cambiar a vista de dorso si no está activo
        if(dorso.style.display !== 'flex') voltearCartaUniversal();
        
        autosave(); showToast("Imagen de dorso cargada", "success");
    };
    reader.readAsDataURL(file);
}

function ajustarImagenDorso(tipo, valor) {
    if(!elementoSeleccionado) return;
    const card = obtenerContenedorCarta(elementoSeleccionado);
    const dorso = card.querySelector('.dorso-universal');
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

// ================= TOKENS =================
function seleccionarToken(tokenWrapper) {
    tokenSeleccionado = tokenWrapper;
    const front = tokenWrapper.querySelector('.token-front');
    if(front) { document.getElementById('prop-token-color').value = rgbToHex(front.style.backgroundColor || '#ffffff'); }
}
function cambiarFormaToken(forma) { if(!tokenSeleccionado) return; [tokenSeleccionado.querySelector('.token-front'), tokenSeleccionado.querySelector('.token-back')].forEach(el => { if(el) { el.classList.remove('token-circulo', 'token-cuadrado', 'token-hexagono', 'token-estrella'); el.classList.add(forma); } }); autosave(); }
function cambiarColorToken(color) { if(!tokenSeleccionado) return; const front = tokenSeleccionado.querySelector('.token-front'); if(front) front.style.backgroundColor = color; autosave(); }
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
function quitarImagenToken() { if(!tokenSeleccionado) return; const front = tokenSeleccionado.querySelector('.token-front'); if(front) { const img = front.querySelector('.token-img'); if(img) img.remove(); const txt = front.querySelector('.token-text'); if(txt) txt.style.display = 'block'; autosave(); } }

// ================= ACCIONES GENERALES =================
function pedirEliminar() {
    if(!elementoSeleccionado) return;
    if(confirm("¿Eliminar este elemento del lienzo?")) {
        elementoSeleccionado.remove(); elementoSeleccionado = null; tokenSeleccionado = null;
        document.getElementById('props-empty').style.display = 'block'; document.getElementById('props-content').style.display = 'none'; document.getElementById('props-actions').style.display = 'none'; autosave(); showToast("Elemento eliminado", "success");
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