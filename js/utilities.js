// ================= KIT DEL FACILITADOR (v105.0) =================

// 1. EXPORTAR LIENZO A PNG
function exportarImagenPNG() {
    const canvas = document.getElementById('canvas');
    if(!canvas.querySelector('.canvas-element, .doc-element')) {
        showToast("No hay nada en el lienzo para exportar", "error");
        return;
    }
    
    showToast("Generando imagen...", "info");
    // Ocultar el hint si existe
    const hint = document.getElementById('canvas-hint'); if(hint) hint.style.display = 'none';

    html2canvas(canvas, { scale: 2, backgroundColor: '#FDFBF7', useCORS: true }).then(imgCanvas => {
        const a = document.createElement('a');
        a.href = imgCanvas.toDataURL("image/png");
        a.download = `EstudioEP_Lienzo_${new Date().getTime()}.png`;
        a.click();
        showToast("Imagen exportada", "success");
        if(hint) hint.style.display = 'block';
    });
}

// 2. DADO 3D INTERACTIVO
function insertarDado3D() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `<div class="dado-3d">?</div>`;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    
    const dado = wrapper.querySelector('.dado-3d');
    dado.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        dado.classList.add('rolling');
        if(typeof playSound === 'function') playSound('dice');
        
        setTimeout(() => {
            dado.classList.remove('rolling');
            const num = Math.floor(Math.random() * 6) + 1;
            dado.innerText = num;
            if(typeof playSound === 'function') playSound('pop');
        }, 500);
    });
    
    showToast("Dado insertado. Haz DOBLE CLIC para lanzarlo.", "success");
}

// 3. TARJETAS DE REFLEXIÓN 3D (Pedagogía v35.0)
function insertarTarjetaReflexion(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    let titulo = "", preguntas = [], icono = "", colorBorde = "";
    
    if(tipo === 'inicio') {
        titulo = "Antes de comenzar";
        icono = "fa-sun";
        colorBorde = "#D4A373";
        preguntas = [
            "¿Qué espero de este taller?",
            "¿Cómo llego hoy? (Emocionalmente)",
            "¿Qué es lo que más me preocupa de nuestra comunidad?"
        ];
    } else {
        titulo = "Para cerrar";
        icono = "fa-moon";
        colorBorde = "#8B3A3A";
        preguntas = [
            "¿Qué me llevo de lo aprendido hoy?",
            "¿Qué fue lo más difícil de escuchar?",
            "¿Qué acción concreta puedo tomar mañana?"
        ];
    }

    let htmlPreguntas = preguntas.map(p => `<li style="margin-bottom: 8px; font-size: 12px; text-align: left; color: #475569;">${p}</li>`).join('');

    // Estructura de carta 3D para que herede las propiedades (Dorso, Imagen, etc.)
    wrapper.innerHTML = `
        <div class="carta-container" style="width: 220px; height: 300px;">
            <div class="carta-inner">
                <div class="carta-front carta-reflexion-front" style="background: #FDFBF7; border: 2px dashed ${colorBorde}; padding: 20px; display: flex; flex-direction: column; border-radius: 8px;">
                    <div class="icon-reflexion" style="text-align: center; margin-bottom: 10px; color: ${colorBorde};">
                        <i class="fa-solid ${icono} icon-svg" style="font-size: 30px; pointer-events: none;"></i>
                    </div>
                    <h3 class="titulo-reflexion" style="font-size: 16px; margin-bottom: 15px; font-family: 'Playfair Display'; color: ${colorBorde}; text-align: center;">${titulo}</h3>
                    <ul class="lista-reflexion" style="padding-left: 15px; margin: 0; flex: 1;">${htmlPreguntas}</ul>
                </div>
                <div class="carta-back" style="background: ${colorBorde}; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-hands-holding-circle" style="font-size: 50px; color: rgba(255,255,255,0.3);"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
        }
    });
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    showToast("Tarjeta de reflexión insertada", "success");
}

// 4. GENERADOR DE GRUPOS ALEATORIOS
function abrirGeneradorGrupos() {
    document.getElementById('modal-grupos').classList.add('active');
    document.getElementById('resultado-grupos').innerHTML = '';
}

function procesarGrupos() {
    const inputNombres = document.getElementById('input-nombres-grupos').value;
    const cantGrupos = parseInt(document.getElementById('input-cant-grupos').value) || 2;
    
    let nombres = inputNombres.split('\n').map(n => n.trim()).filter(n => n !== "");
    if(nombres.length < cantGrupos) {
        showToast("Necesitas al menos 1 participante por grupo", "error");
        return;
    }

    // Algoritmo de Fisher-Yates para mezclar
    for (let i = nombres.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
    }

    let grupos = Array.from({ length: cantGrupos }, () => []);
    nombres.forEach((nombre, index) => {
        grupos[index % cantGrupos].push(nombre);
    });

    const resultadoDiv = document.getElementById('resultado-grupos');
    resultadoDiv.innerHTML = '';

    grupos.forEach((grupo, index) => {
        const box = document.createElement('div');
        box.className = 'grupo-box';
        let lis = grupo.map(n => `<li><i class="fa-solid fa-user" style="color:#cbd5e1; margin-right:5px;"></i> ${n}</li>`).join('');
        box.innerHTML = `<h4><i class="fa-solid fa-users"></i> Grupo ${index + 1}</h4><ul>${lis}</ul>`;
        resultadoDiv.appendChild(box);
    });
    
    if(typeof playSound === 'function') playSound('pop');
}

// 5. SONIDO BÁSICO (Web Audio API)
let audioCtx = null;
function playSound(tipo) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (tipo === 'dice') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }
}
// ================= LOADER Y COMPROMISO (v107.0) =================

function mostrarLoading(mensaje, subtexto) {
    const overlay = document.getElementById('loading-overlay');
    if(!overlay) return;
    overlay.querySelector('.loader-text').innerText = mensaje || "Preparando materiales...";
    overlay.querySelector('.loader-subtext').innerText = subtexto || "Esto puede tardar unos segundos.";
    overlay.style.display = 'flex';
}

function ocultarLoading() {
    const overlay = document.getElementById('loading-overlay');
    if(overlay) overlay.style.display = 'none';
}

function insertarCartaCompromiso() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-compromiso">
            <div class="carta-compromiso-header" contenteditable="true">Mi Compromiso</div>
            <div class="carta-compromiso-body" contenteditable="true">Yo, ____________________, me comprometo a...</div>
            <div class="carta-compromiso-firma">Firma aquí</div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    if(typeof showToast === 'function') showToast("Carta de Compromiso insertada", "success");
}

function exportarTTS() {
    if(!currentProjectId) return;
    const proyecto = proyectos.find(p => p.id === currentProjectId);
    
    // Crear una estructura básica JSON para Tabletop Simulator
    const ttsData = {
        SaveName: proyecto.nombre,
        Date: new Date().toLocaleDateString(),
        VersionNumber: "1.0",
        GameMode: "Educación Popular",
        ObjectStates: []
    };

    const elements = document.querySelectorAll('#canvas > .canvas-element, #canvas > .doc-element');
    
    // Si no hay elementos, agregar una nota
    if(elements.length === 0) {
        ttsData.ObjectStates.push({
            Name: "Nota",
            Transform: { posX: 0, posY: 2, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
            Nickname: "Sin elementos en el lienzo",
            Description: "No se encontraron componentes en el lienzo."
        });
    } else {
        // Convertir cada elemento del DOM a un objeto básico de TTS
        elements.forEach((el, index) => {
            const x = parseFloat(el.style.left) || 0;
            const y = parseFloat(el.style.top) || 0;
            
            // Intentar detectar si es una carta o una ficha por sus clases
            let tipo = "Card";
            let nick = "Componente";
            let description = "";
            
            if(el.querySelector('.carta-container')) {
                tipo = "Card";
                nick = el.querySelector('.carta-front') ? "Carta" : "Ficha";
                if(el.querySelector('.carta-texto')) description = el.querySelector('.carta-texto').innerText;
            } else if(el.classList.contains('token-wrapper') || el.classList.contains('token-meeple-css') || el.classList.contains('token-cube-3d')) {
                tipo = "Chip";
                nick = "Ficha";
            } else if(el.classList.contains('doc-element')) {
                tipo = "Notecard";
                nick = "Tablero / Documento";
            }

            // TTS usa una escala en centímetros (1 unidad = 1cm aprox)
            ttsData.ObjectStates.push({
                Name: tipo,
                Transform: {
                    posX: (x - 500) / 30, // Centrar en el tablero virtual
                    posY: 2 + (index * 0.1), // Apilar ligeramente hacia arriba
                    posZ: (y - 300) / 30,
                    rotX: 0, rotY: 180, rotZ: 0, // Cartas boca abajo (rotadas 180 grados)
                    scaleX: 1, scaleY: 1, scaleZ: 1
                },
                Nickname: nick,
                Description: description,
                GMNotes: "Exportado desde Estudio EP",
                ColorDiffuse: { r: 1, g: 1, b: 1 }
            });
        });
    }

    const blob = new Blob([JSON.stringify(ttsData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = proyecto.nombre + '_TabletopSim.json';
    a.click();
    
    if(typeof showToast === 'function') showToast("Archivo para Tabletop Simulator exportado", "success");
}
// ================= PIZARRA, MITO Y ATAJOS (v108.0) =================

function insertarPizarraFacilitador() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="pizarra-facilitador">
            <textarea placeholder="Escribe el guion del taller aquí...&#10;- Bienvenida (10 min)&#10;- Dinámica de apertura&#10;- Preguntas clave..."></textarea>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    if(typeof showToast === 'function') showToast("Pizarra insertada", "success");
}

function insertarCartaMitoRealidad() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container" style="width: 260px; height: 380px; perspective: 1000px;">
            <div class="carta-inner">
                <div class="carta-front carta-mito">
                    <div class="carta-mito-header">Mito</div>
                    <div class="carta-mito-texto" contenteditable="true">Escribe aquí el mito o creencia popular...</div>
                </div>
                <div class="carta-back carta-realidad">
                    <div class="carta-realidad-header">Realidad</div>
                    <div class="carta-realidad-texto" contenteditable="true">Escribe aquí la realidad o dato verificado...</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    
    wrapper.addEventListener('dblclick', (e) => { 
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
            wrapper.querySelector('.carta-container').classList.toggle('flipped'); 
        }
    });
    
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    if(typeof showToast === 'function') showToast("Carta Mito/Realidad insertada", "success");
}

// --- ATAJOS DE TECLADO (Pro UX v35.0) ---
document.addEventListener('keydown', function(e) {
    // Ignorar si estamos escribiendo en un input o textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    // Eliminar con Delete o Backspace
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (typeof elementoSeleccionado !== 'undefined' && elementoSeleccionado) {
            e.preventDefault();
            if(typeof pedirEliminar === 'function') pedirEliminar();
        }
    }

    // Duplicar con Ctrl+D
    if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        if (typeof elementoSeleccionado !== 'undefined' && elementoSeleccionado) {
            e.preventDefault();
            if(typeof duplicarElemento === 'function') duplicarElemento();
        }
    }

    // Deseleccionar con Escape
    if (e.key === 'Escape') {
        if (typeof elementoSeleccionado !== 'undefined' && elementoSeleccionado) {
            elementoSeleccionado.classList.remove('selected');
            // @ts-ignore
            elementoSeleccionado = null;
            const propsEmpty = document.getElementById('props-empty');
            const propsContent = document.getElementById('props-content');
            const propsActions = document.getElementById('props-actions');
            if(propsEmpty) propsEmpty.style.display = 'block';
            if(propsContent) propsContent.style.display = 'none';
            if(propsActions) propsActions.style.display = 'none';
        }
        // Cerrar modales
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
});