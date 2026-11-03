let elementoSeleccionado = null;

function seleccionarElemento(elmnt) {
    if(elementoSeleccionado) elementoSeleccionado.classList.remove('selected');
    elementoSeleccionado = elmnt;
    elmnt.classList.add('selected');
    
    document.getElementById('props-empty').style.display = 'none';
    document.getElementById('props-content').style.display = 'block';
    
    // Ocultar todos los bloques primero
    document.getElementById('props-carta').style.display = 'none';
    document.getElementById('props-especifico').style.display = 'none';
    const grupoToken = document.getElementById('grupo-token');
    if(grupoToken) grupoToken.style.display = 'none';

    if(elmnt.querySelector('.carta-container')) {
        document.getElementById('props-carta').style.display = 'block';
        if(elmnt.querySelector('.carta-texto')) document.getElementById('prop-text').value = elmnt.querySelector('.carta-texto').innerText;
        if(elmnt.querySelector('.dato-instrucciones')) document.getElementById('prop-instrucciones').value = elmnt.querySelector('.dato-instrucciones').innerText;
        document.getElementById('grupo-color-juego').style.display = 'none';
    } 
    else if(elmnt.querySelector('.carta-naipe')) {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('grupo-palo').style.display = 'block';
        document.getElementById('lbl-especifico').innerText = "Título Central";
        document.getElementById('prop-especifico-text').value = elmnt.querySelector('.naipe-centro h3').innerText;
        document.getElementById('grupo-color-juego').style.display = 'none';
    }
    else if(elmnt.querySelector('.carta-duo')) {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('grupo-palo').style.display = 'none';
        document.getElementById('lbl-especifico').innerText = "Texto del Refrán";
        document.getElementById('prop-especifico-text').value = elmnt.querySelector('.carta-duo strong').innerText;
        document.getElementById('grupo-color-juego').style.display = 'none';
    }
    else if(elmnt.querySelector('.carta-poker')) {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('grupo-palo').style.display = 'none';
        document.getElementById('lbl-especifico').innerText = "Carta de Póker";
        document.getElementById('prop-especifico-text').value = "Usa el lienzo o doble clic para editar los números.";
        document.getElementById('grupo-color-juego').style.display = 'none';
    }
    else if(elmnt.querySelector('.carta-uno')) {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('grupo-palo').style.display = 'none';
        document.getElementById('lbl-especifico').innerText = "Texto de la Carta UNO";
        document.getElementById('prop-especifico-text').value = elmnt.querySelector('.carta-uno-texto').innerText;
        
        // Mostrar controles de UNO
        const grupoColor = document.getElementById('grupo-color-juego');
        const paletaUno = document.getElementById('paleta-uno');
        const grupoSimbolos = document.getElementById('grupo-simbolos-uno');
        
        if(grupoColor) {
            grupoColor.style.display = 'block';
            grupoColor.style.visibility = 'visible';
            grupoColor.style.opacity = '1';
        }
        if(paletaUno) paletaUno.style.display = 'flex';
        if(grupoSimbolos) grupoSimbolos.style.display = 'block';
        
        const colorActual = elmnt.querySelector('.carta-uno').style.borderColor || '#dc2626';
        const propColor = document.getElementById('prop-color-juego');
        if(propColor) propColor.value = rgbToHex(colorActual);
    }
    else {
        document.getElementById('props-especifico').style.display = 'block';
        document.getElementById('grupo-palo').style.display = 'none';
        const grupoColorElse = document.getElementById('grupo-color-juego');
        if(grupoColorElse) grupoColorElse.style.display = 'none';
        
        if(elmnt.classList.contains('nota-adhesiva')) {
            document.getElementById('lbl-especifico').innerText = "Contenido de la Nota";
            document.getElementById('prop-especifico-text').value = elmnt.innerText;
        } else {
            document.getElementById('lbl-especifico').innerText = "Contenido";
            document.getElementById('prop-especifico-text').value = elmnt.innerText;
        }
    }
}

function actualizarPropiedad(prop, valor) {
    if(!elementoSeleccionado) return;
    if(prop === 'texto') { const d = elementoSeleccionado.querySelector('.carta-texto'); if(d) d.innerText = valor; }
    else if(prop === 'instrucciones') { const d = elementoSeleccionado.querySelector('.dato-instrucciones'); if(d) d.innerText = valor; }
    else if(prop === 'especifico') {
        if(elementoSeleccionado.querySelector('.carta-naipe')) elementoSeleccionado.querySelector('.naipe-centro h3').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-duo')) elementoSeleccionado.querySelector('.carta-duo strong').innerText = valor;
        else if(elementoSeleccionado.querySelector('.carta-uno-texto')) elementoSeleccionado.querySelector('.carta-uno-texto').innerText = valor;
        else if(elementoSeleccionado.classList.contains('nota-adhesiva')) elementoSeleccionado.innerText = valor;
    }
    autosave();
}

function cambiarPalo(palo) {
    if(!elementoSeleccionado) return;
    const naipe = elementoSeleccionado.querySelector('.carta-naipe');
    if(!naipe) return;
    naipe.classList.remove('palo-rojo', 'palo-negro');
    const palos = { trebol: '♣', diamante: '♦', corazon: '♥', pica: '♠' };
    naipe.querySelectorAll('.naipe-palo').forEach(s => s.innerText = palos[palo]);
    if(palo === 'diamante' || palo === 'corazon') naipe.classList.add('palo-rojo');
    else naipe.classList.add('palo-negro');
    autosave();
}

function cambiarColorJuego(color) {
    if(!elementoSeleccionado) return;
    const uno = elementoSeleccionado.querySelector('.carta-uno');
    if(uno) {
        uno.style.borderColor = color;
        const ovalo = uno.querySelector('.carta-uno-ovalo');
        if(ovalo) ovalo.style.backgroundColor = color;
        document.getElementById('prop-color-juego').value = color;
    }
    autosave();
}

function insertarSimboloUno(simbolo) {
    const txt = document.getElementById('prop-especifico-text');
    if(txt) {
        txt.value = simbolo;
        actualizarPropiedad('especifico', simbolo);
    }
}

function rgbToHex(rgb) {
    if (!rgb || !rgb.startsWith('rgb')) return rgb || '#dc2626';
    const a = rgb.split("(")[1].split(")")[0].split(",");
    const b = a.map(x => {
        x = parseInt(x).toString(16);
        return (x.length == 1) ? "0" + x : x;
    });
    return "#" + b.join("");
}

function pedirEliminar() {
    if(!elementoSeleccionado) return;
    if(confirm("¿Eliminar este elemento?")) {
        elementoSeleccionado.remove();
        elementoSeleccionado = null;
        document.getElementById('props-empty').style.display = 'block';
        document.getElementById('props-content').style.display = 'none';
        autosave();
    }
}

function duplicarElemento() {
    if(!elementoSeleccionado) return;
    const clone = elementoSeleccionado.cloneNode(true);
    clone.classList.remove('selected');
    clone.style.left = (parseInt(elementoSeleccionado.style.left) + 30) + 'px';
    clone.style.top = (parseInt(elementoSeleccionado.style.top) + 30) + 'px';
    document.getElementById('canvas').appendChild(clone);
    hacerArrastrable(clone);
    seleccionarElemento(clone);
    autosave();
}

function voltearCarta() {
    if(!elementoSeleccionado) return;
    const c = elementoSeleccionado.querySelector('.carta-container');
    if(c) c.classList.toggle('flipped');
    autosave();
}

// Selección de Tokens
function seleccionarToken(token) {
    if(typeof elementoSeleccionado !== 'undefined' && elementoSeleccionado) {
        elementoSeleccionado.classList.remove('selected');
    }
    document.getElementById('props-empty').style.display = 'none';
    document.getElementById('props-content').style.display = 'block';
    document.getElementById('props-carta').style.display = 'none';
    document.getElementById('props-especifico').style.display = 'none';
    document.getElementById('grupo-token').style.display = 'block';
    
    const iconoActual = token.querySelector('i') ? Array.from(token.querySelector('i').classList).find(c => c.startsWith('fa-') && c !== 'fa-solid') : 'fa-star';
    document.getElementById('prop-token-icono').value = iconoActual || 'fa-star';
    const colorActual = token.style.color;
    if(colorActual) document.getElementById('prop-token-color').value = rgbToHex(colorActual);
}
// ================= TEXTO ENRIQUECIDO =================
function formatearTexto(comando) {
    if(!elementoSeleccionado) return;
    
    let target = null;
    if(elementoSeleccionado.querySelector('.carta-texto')) target = elementoSeleccionado.querySelector('.carta-texto');
    else if(elementoSeleccionado.querySelector('.carta-conversacional-texto')) target = elementoSeleccionado.querySelector('.carta-conversacional-texto');
    else if(elementoSeleccionado.querySelector('.carta-uno-texto')) target = elementoSeleccionado.querySelector('.carta-uno-texto');
    else if(elementoSeleccionado.classList.contains('nota-adhesiva')) target = elementoSeleccionado;
    
    if(target) {
        target.focus();
        document.execCommand(comando, false, null);
        autosave();
    }
}