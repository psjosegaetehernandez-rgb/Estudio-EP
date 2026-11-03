function switchTool(tool, btn) {
    document.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tool-tab').forEach(b => b.classList.remove('active'));

    const content = document.getElementById('tool-' + tool);
    if (content) content.classList.add('active');
    if (btn) btn.classList.add('active');

    if (tool === 'catalogo' && typeof renderCatalogo === 'function') {
        renderCatalogo();
    }
}

function insertarCarta() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-container"><div class="carta-inner"><div class="carta-front border-freire"><div class="carta-icono"><i class="fa-solid fa-comments"></i></div><div class="carta-texto">Pregunta...</div><div class="carta-footer">PREGUNTA</div></div><div class="carta-back"><div class="guia-header">Guía</div><div class="guia-contenido"><p class="dato-instrucciones">Instrucciones...</p></div></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast("Carta insertada", "success");
}

function insertarCartaUno() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-uno" style="border-color:#dc2626; color:#dc2626;"><div class="carta-uno-ovalo" style="background:#dc2626;"></div><div class="carta-uno-texto" contenteditable="true" style="color:white;">+2</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta UNO insertada", "success");
}

function insertarCartaUnoReversa() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-uno" style="border-color:#2563eb; color:#2563eb;"><div class="carta-uno-ovalo" style="background:#2563eb;"></div><div class="carta-uno-texto" contenteditable="true" style="color:white;">⤾</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Reversa insertada", "success");
}

function insertarCartaUnoBloqueo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-uno" style="border-color:#16a34a; color:#16a34a;"><div class="carta-uno-ovalo" style="background:#16a34a;"></div><div class="carta-uno-texto" contenteditable="true" style="color:white;">⊘</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Bloqueo insertado", "success");
}

function insertarCartaNaipe() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-naipe palo-negro" data-palo="trebol"><div class="naipe-esquina naipe-sup"><span class="naipe-num">A</span><span class="naipe-palo">♣</span></div><div class="naipe-centro"><h3 contenteditable="true">Análisis</h3></div><div class="naipe-esquina naipe-inf"><span class="naipe-num">A</span><span class="naipe-palo">♣</span></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Naipe insertado", "success");
}

function insertarCartaDuo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-duo"><strong contenteditable="true">No hay mal que dure cien años</strong><div style="position:absolute; bottom:5px; font-size:10px;">Busca tu mitad</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Duo insertada", "success");
}

function insertarCartaEvento() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-evento"><div class="carta-evento-header">¡Evento!</div><div class="carta-evento-texto" contenteditable="true">Una tormenta azota la comunidad.</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Evento insertado", "success");
}

function insertarCartaRol() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-rol"><div class="carta-rol-texto" contenteditable="true">Eres el Líder Comunitario.<br><span style="font-size:14px; opacity:0.7;">(No reveles)</span></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Rol insertado", "success");
}

function insertarNotaAdhesiva() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element nota-adhesiva';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px'; wrapper.innerText = 'Idea...';
    wrapper.setAttribute('contenteditable', 'false'); wrapper.addEventListener('dblclick', () => { wrapper.setAttribute('contenteditable', 'true'); wrapper.focus(); });
    wrapper.addEventListener('blur', () => { wrapper.setAttribute('contenteditable', 'false'); autosave(); });
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); 
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper); showToast("Nota insertada", "success");
}

function insertarGeneradorTokens() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px'; wrapper.style.width = '70px'; wrapper.style.height = '70px';
    wrapper.innerHTML = `<div class="token-container"><div class="token-inner"><div class="token-face token-front token-circulo" style="background-color:#fff; color:#333;"><span class="token-text" contenteditable="false" style="font-size:20px; font-weight:bold;">?</span></div><div class="token-face token-back token-circulo"></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); configurarToken(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper); showToast("Ficha insertada", "success");
}

function configurarToken(t) {
    const txt = t.querySelector('.token-text'); if(txt) txt.setAttribute('contenteditable', 'false');
    t.addEventListener('dblclick', (e) => { e.stopPropagation(); const img = t.querySelector('.token-img'); if(txt && !img) { txt.setAttribute('contenteditable', 'true'); txt.focus(); document.execCommand('selectAll', false, null); } else { const c = t.querySelector('.token-container'); if(c) c.classList.toggle('flipped'); autosave(); } });
    t.addEventListener('blur', (e) => { if(e.target.classList.contains('token-text')) { e.target.setAttribute('contenteditable', 'false'); autosave(); } }, true);
}

// --- GESTIÓN ---
function insertarMuroPostits() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:8px; padding:20px; width:400px;"><h3 style="text-align:center; color:#1e293b; margin-bottom:15px;">Muro de Post-its</h3><div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;"><div style="background:#fef08a; padding:15px; border-radius:4px; box-shadow:2px 2px 5px rgba(0,0,0,0.1); font-family:'Patrick Hand'; color:#333; min-height:100px;" contenteditable="true">Idea 1...</div><div style="background:#fef08a; padding:15px; border-radius:4px; box-shadow:2px 2px 5px rgba(0,0,0,0.1); font-family:'Patrick Hand'; color:#333; min-height:100px;" contenteditable="true">Idea 2...</div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Muro insertado", "success");
}

function insertarTableroIAP() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#fff; padding:20px; border:2px solid #9a3412; border-radius:8px;"><h3 style="text-align:center; color:#9a3412; margin-bottom:15px; font-family:'Playfair Display';">Tablero IAP</h3><div style="display:flex; gap:10px;"><div style="flex:1; border:2px dashed #9a3412; padding:15px; text-align:center; background:#ffedd5;" contenteditable="true"><strong>1. Pre-investigación</strong><br><br>Contenido...</div><div style="flex:1; border:2px dashed #9a3412; padding:15px; text-align:center; background:#ffedd5;" contenteditable="true"><strong>2. Diagnóstico</strong><br><br>Contenido...</div><div style="flex:1; border:2px dashed #9a3412; padding:15px; text-align:center; background:#ffedd5;" contenteditable="true"><strong>3. Programación</strong><br><br>Contenido...</div><div style="flex:1; border:2px dashed #9a3412; padding:15px; text-align:center; background:#ffedd5;" contenteditable="true"><strong>4. Conclusiones</strong><br><br>Contenido...</div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Tablero IAP insertado", "success");
}

function insertarSemaforo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="semaforo-epes"><div class="semaforo-col"><div class="semaforo-color semaforo-rojo"></div><div class="semaforo-titulo" style="color:#dc2626;">Dejaré de hacer</div><div class="semaforo-texto" contenteditable="true"></div></div><div class="semaforo-col"><div class="semaforo-color semaforo-amarillo"></div><div class="semaforo-titulo" style="color:#ca8a04;">Seguiré haciendo</div><div class="semaforo-texto" contenteditable="true"></div></div><div class="semaforo-col"><div class="semaforo-color semaforo-verde"></div><div class="semaforo-titulo" style="color:#15803d;">Empezaré a hacer</div><div class="semaforo-texto" contenteditable="true"></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Semáforo insertado", "success");
}

function insertarMatrizPriorizacion() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#fff; padding:15px; border:2px solid #cbd5e1; border-radius:8px;"><table style="width:100%; border-collapse:collapse;"><thead><tr style="background:#1e293b; color:white;"><th style="padding:10px; border:1px solid #ccc;">Problema</th><th style="padding:10px; border:1px solid #ccc;">Gravedad</th><th style="padding:10px; border:1px solid #ccc;">Frecuencia</th><th style="padding:10px; border:1px solid #ccc;">Preocupación</th><th style="padding:10px; border:1px solid #ccc;">Total</th></tr></thead><tbody><tr><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">Problema 1</td><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">5</td><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">4</td><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">5</td><td style="padding:10px; border:1px solid #ccc; text-align:center; font-weight:bold;">14</td></tr></tbody></table></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Matriz insertada", "success");
}

function insertarPlanificador() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#fff; padding:15px; border:2px solid #cbd5e1; border-radius:8px;"><table style="width:100%; border-collapse:collapse;"><thead><tr style="background:#1e293b; color:white;"><th style="padding:10px; border:1px solid #ccc;">Tiempo</th><th style="padding:10px; border:1px solid #ccc;">Contenido</th><th style="padding:10px; border:1px solid #ccc;">Metodología</th></tr></thead><tbody><tr><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">09:00</td><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">Bienvenida</td><td style="padding:10px; border:1px solid #ccc;" contenteditable="true">Dinámica</td></tr></tbody></table></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Planificador insertado", "success");
}

function insertarArbolProblemas() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:400px; display:flex; flex-direction:column; align-items:center; background:#fff; border-radius:10px; padding:10px; border:3px solid #9a3412;"><div style="width:100%; height:150px; background:#dcfce7; border-radius:50% 50% 10% 10%; border:2px dashed #15803d; display:flex; align-items:center; justify-content:center; text-align:center; font-family:'Patrick Hand'; font-size:18px; color:#15803d; padding:20px;" contenteditable="true">Efectos / Consecuencias</div><div style="width:80px; height:100px; background:#78350f; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-family:'Patrick Hand'; font-size:18px; text-align:center; padding:5px;" contenteditable="true">Problema Central</div><div style="width:100%; height:120px; background:#fef3c7; border-radius:10% 10% 50% 50%; border:2px dashed #b45309; display:flex; align-items:center; justify-content:center; text-align:center; font-family:'Patrick Hand'; font-size:18px; color:#b45309; padding:20px;" contenteditable="true">Causas / Raíces</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Árbol insertado", "success");
}

function insertarFlorEvaluacion() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:300px; height:300px; border-radius:50%; background:#fdf2f8; border:3px solid #be123c; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; padding:20px; text-align:center;"><div style="width:50%; height:50%; border:1px dashed #be123c; display:flex; align-items:center; justify-content:center; font-family:'Patrick Hand'; color:#be123c; font-size:14px; padding:10px; box-sizing:border-box;" contenteditable="true">Plenario</div><div style="width:50%; height:50%; border:1px dashed #be123c; display:flex; align-items:center; justify-content:center; font-family:'Patrick Hand'; color:#be123c; font-size:14px; padding:10px; box-sizing:border-box;" contenteditable="true">Participación</div><div style="width:50%; height:50%; border:1px dashed #be123c; display:flex; align-items:center; justify-content:center; font-family:'Patrick Hand'; color:#be123c; font-size:14px; padding:10px; box-sizing:border-box;" contenteditable="true">Grupo</div><div style="width:50%; height:50%; border:1px dashed #be123c; display:flex; align-items:center; justify-content:center; font-family:'Patrick Hand'; color:#be123c; font-size:14px; padding:10px; box-sizing:border-box;" contenteditable="true">Aprendizaje</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Flor insertada", "success");
}

function insertarNodoRed() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (300 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:90px; height:90px; background:white; border:4px solid #0369a1; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:#0369a1; font-size:14px; text-align:center; padding:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); cursor:grab;" contenteditable="true">Actor</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Nodo insertado", "success");
}

function insertarCuboNet() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const widget = document.createElement('div'); widget.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    widget.style.left = (150 + (count * 30) % 400) + 'px'; widget.style.top = (100 + (count * 30) % 300) + 'px';
    widget.innerHTML = `<div style="background:white; padding:20px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1); display:inline-block;"><div style="display:grid; grid-template-columns:repeat(4, 50px); grid-template-rows:repeat(3, 50px); gap:0; position:relative;">
        <div></div><div class="cubo-cara" contenteditable="true" style="background:#fef3c7; border:1px solid #333;">Cara 1</div><div></div><div></div>
        <div class="cubo-cara" contenteditable="true" style="background:#dcfce7; border:1px solid #333;">Cara 2</div>
        <div class="cubo-cara" contenteditable="true" style="background:#e0f2fe; border:1px solid #333;">Cara 3</div>
        <div class="cubo-cara" contenteditable="true" style="background:#fce7f3; border:1px solid #333;">Cara 4</div>
        <div class="cubo-cara" contenteditable="true" style="background:#f3e8ff; border:1px solid #333;">Cara 5</div>
        <div></div><div class="cubo-cara" contenteditable="true" style="background:#fef2f2; border:1px solid #333;">Cara 6</div><div></div><div></div>
    </div></div>`;
    document.getElementById('canvas').appendChild(widget); hacerArrastrable(widget); showToast("Cubo insertado", "success");
}

// --- JUEGOS ---
function insertarTableroTrivial() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="tablero-trivial"><div class="trivial-centro" contenteditable="true">Título del Quiz</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Trivial insertado", "success");
}

function insertarTableroBingo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    let html = '<div class="tablero-bingo">';
    for(let i=0; i<25; i++) { if(i===12) html += `<div class="casilla-bingo bingo-libre">Libre</div>`; else html += `<div class="casilla-bingo" contenteditable="true">${Math.floor(Math.random()*75)+1}</div>`; }
    html += '</div>';
    wrapper.innerHTML = html; document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Bingo insertado", "success");
}

function insertarCodigoSecreto() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    let html = '<div class="codenames-grid">'; const palabras = ['Salud', 'Poder', 'Comunidad', 'Miedo', 'Historia', 'Lucha', 'Barrio', 'Agua', 'Educación', 'Calle', 'Futuro', 'Vecinos', 'Fiesta', 'Trabajo', 'Esperanza', 'Red', 'Crisis', 'Cultura', 'Niñez', 'Tierra', 'Mujer', 'Memoria', 'Rumor', 'Territorio', 'Cambio'];
    for(let i=0; i<25; i++) html += `<div class="codenames-card" contenteditable="true">${palabras[i]}</div>`; html += '</div>'; wrapper.innerHTML = html; document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Codenames insertado", "success");
}

function insertarLosetaCarcassonne(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    // Si se llama sin parámetro (botón viejo), por defecto es Camino
    const tipoReal = tipo || 'Camino';
    let diseño = '';
    
    if (tipoReal === 'Ciudad') {
        diseño = `<div style="width: 100%; height: 100%; background: #d4a373; position: relative; overflow: hidden; border: 2px solid #333; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fa-solid fa-building" style="position: absolute; bottom: 10px; right: 10px; font-size: 40px; color: #8b5a2b;"></i><i class="fa-solid fa-tower-observation" style="position: absolute; top: 10px; left: 10px; font-size: 30px; color: #8b5a2b;"></i></div>`;
    } else {
        diseño = `<div style="width: 100%; height: 100%; background: #95d5b2; position: relative; overflow: hidden; border: 2px solid #333; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><div style="position: absolute; top: 50%; left: 0; width: 100%; height: 20px; background: #d4a373; transform: translateY(-50%);"></div></div>`;
    }
    
    // IMPORTANTE: Sin contenteditable para que se pueda arrastrar
    wrapper.innerHTML = `<div style="width: 100px; height: 100px; cursor: grab;">${diseño}</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Loseta insertada", "success");
}

function insertarTableroDobble() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    const iconos = ['fa-heart', 'fa-star', 'fa-bolt', 'fa-leaf', 'fa-globe', 'fa-sun', 'fa-moon', 'fa-cloud'];
    let iconosHTML = '';
    for(let i=0; i<12; i++) { const icon = iconos[i % iconos.length]; const angle = (i / 12) * Math.PI * 2; const radius = 35; const x = 50 + radius * Math.cos(angle); const y = 50 + radius * Math.sin(angle); iconosHTML += `<i class="fa-solid ${icon} dobble-simbolo" style="top: ${y}%; left: ${x}%;"></i>`; }
    iconosHTML += `<i class="fa-solid fa-heart dobble-simbolo" style="top: 50%; left: 50%; color: #ef4444; font-size: 32px;"></i>`;
    wrapper.innerHTML = `<div class="tablero-dobble">${iconosHTML}</div>`; document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Dobble insertado", "success");
}

function insertarTableroGrid() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px';
    let gridHTML = '<div class="tablero-grid">';
    for(let i = 1; i <= 100; i++) gridHTML += `<div class="casilla-tablero" contenteditable="true">${i}</div>`;
    gridHTML += '</div>'; wrapper.innerHTML = gridHTML; document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Grid insertado", "success");
}

function insertarCartaDixit() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-dixit"><div contenteditable="true">Escribe la pista...</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Dixit insertada", "success");
}

function insertarCartaDrafting() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-drafting"><div class="drafting-header" contenteditable="true">Educación</div><div class="drafting-puntos" contenteditable="true">3</div><div class="drafting-texto" contenteditable="true">Proyecto</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Drafting insertada", "success");
}

function insertarCartaCharada() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (250 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-charada"><div class="carta-charada-categoria" contenteditable="true">Oficio</div><div class="carta-charada-texto" contenteditable="true">El Alcalde</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Charada insertada", "success");
}

function insertarCartaConversacional() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-conversacional"><div class="carta-conversacional-texto" contenteditable="true">¿Qué sueños tenemos para nuestro barrio?</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Conversacional insertada", "success");
}

function insertarCartaMemoria() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (250 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-memoria"><div class="carta-memoria-header" contenteditable="true">Junta de Vecinos</div><div class="carta-memoria-texto" contenteditable="true">Cuenta una historia...</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Memoria insertada", "success");
}

function insertarCartaDilema() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (300 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-dilema"><div class="carta-dilema-header">Situación Crítica</div><div class="carta-dilema-texto" contenteditable="true">Llegas sin dinero y te ofrecen trabajo ilegal.</div><div class="carta-dilema-opciones"><div class="dilema-opcion" contenteditable="true"><div><strong>A</strong> Aceptar.</div></div><div class="dilema-opcion" contenteditable="true"><div><strong>B</strong> Rechazar.</div></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Dilema insertado", "success");
}

function insertarCartaTetralema() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-tetralema"><div class="tetra-cuadrante tetra-1" contenteditable="true"><strong>A:</strong><br>Individualismo</div><div class="tetra-cuadrante tetra-2" contenteditable="true"><strong>B:</strong><br>Colectivismo</div><div class="tetra-cuadrante tetra-3" contenteditable="true"><strong>Ni A ni B:</strong><br>Redes</div><div class="tetra-cuadrante tetra-4" contenteditable="true"><strong>A y B:</strong><br>Autonomía</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Tetralema insertado", "success");
}

function insertarCartaTinderblox() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-tinderblox"><div class="tinderblox-pieza" contenteditable="true">🪵</div><div class="tinderblox-texto" contenteditable="true">Pon 1 tronco usando solo la mano izquierda.</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Tinderblox insertado", "success");
}

function insertarPanelSkyTeam() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="panel-skyteam"><div class="skyteam-col"><h4>Piloto</h4><div class="skyteam-slots"><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div></div></div><div class="skyteam-col"><h4>Copiloto</h4><div class="skyteam-slots"><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Sky Team insertado", "success");
}

function insertarLineaTiempoHitster() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="linea-tiempo"><div class="linea-tiempo-slot" contenteditable="true">1950</div><div class="linea-tiempo-slot" contenteditable="true">1970</div><div class="linea-tiempo-slot" contenteditable="true">1990</div><div class="linea-tiempo-slot" contenteditable="true">2010</div><div class="linea-tiempo-slot" contenteditable="true">HOY</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Hitster insertado", "success");
}

function insertarHojaRollWrite() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="hoja-roll-write"><div class="hoja-roll-write-texto" contenteditable="true">Dibuja rutas para conectar los puntos.</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Roll & Write insertado", "success");
}

function insertarCartaAtaque() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-ataque"><div class="carta-ataque-num" contenteditable="true">-3</div><div class="carta-ataque-texto" contenteditable="true">Recorte de presupuesto.</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta Ataque insertada", "success");
}

function insertarRastreadorCoop() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="tracker-coop"><h4 contenteditable="true">Amenaza: Brote</h4><div class="tracker-barra"><div class="tracker-progreso" style="width: 60%;"></div><div class="tracker-texto-abs">60% Avance</div></div><div style="display:flex; gap:5px; margin-top:10px;"><button class="btn btn-outline" style="flex:1; font-size:11px;" onclick="moverTracker(this, -10)">- Avanza</button><button class="btn btn-primary" style="flex:1; font-size:11px; background:#15803d;" onclick="moverTracker(this, 10)">+ Retrocede</button></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Rastreador insertado", "success");
}

function moverTracker(btn, cambio) {
    const barra = btn.closest('.tracker-coop').querySelector('.tracker-progreso'); const texto = btn.closest('.tracker-coop').querySelector('.tracker-texto-abs');
    let actual = parseInt(barra.style.width) || 0; actual += cambio; if(actual < 0) actual = 0; if(actual > 100) actual = 100;
    barra.style.width = actual + '%'; texto.innerText = actual + '% Avance';
    if(actual >= 80) barra.style.background = '#dc2626'; else barra.style.background = '#15803d';
}

function insertarMercadoDeckBuilding() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (50 + (count * 30) % 400) + 'px'; wrapper.style.top = (50 + (count * 30) % 300) + 'px'; wrapper.style.width = '600px';
    wrapper.innerHTML = `<div style="background:white; padding:15px; border-radius:8px;"><h3 style="font-family:'Playfair Display'; margin-bottom:10px; color:#ca8a04;">Mercado Social</h3><table class="mercado-deck"><thead><tr><th>Carta / Recurso</th><th>Costo</th><th>Efecto</th></tr></thead><tbody><tr><td contenteditable="true">Cooperativa Agrícola</td><td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">3</td><td contenteditable="true">+2 Recursos por turno</td></tr><tr><td contenteditable="true">Trueque</td><td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">1</td><td contenteditable="true">Intercambia 1 carta</td></tr></tbody></table><button class="btn btn-outline" style="margin-top:10px; font-size:12px;" onclick="agregarFilaMercado(this)">+ Añadir Carta</button></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Mercado insertado", "success");
}

function agregarFilaMercado(btn) {
    const tbody = btn.closest('div').querySelector('tbody'); const tr = document.createElement('tr');
    tr.innerHTML = `<td contenteditable="true">Nueva Carta</td><td contenteditable="true" style="text-align:center; font-weight:bold; color:#ca8a04;">1</td><td contenteditable="true">Efecto...</td>`; tbody.appendChild(tr);
}

function insertarDiarioCampana() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="diario-campana"><h4>Diario de Campaña</h4><p style="font-size:11px; color:#666; margin-bottom:10px;">Anota los cambios en el "mundo".</p><textarea placeholder="Ej: La comunidad perdió -1 de confianza..."></textarea></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Diario insertado", "success");
}

// --- MAPEO Y NUEVOS MOTORES ---
function activarModoMapa() { document.getElementById('canvas').classList.toggle('modo-mapa'); }
function subirMapaBase(event) {
    const reader = new FileReader(); reader.onload = function(e) {
        const canvas = document.getElementById('canvas'); canvas.classList.add('mapa-personalizado'); canvas.classList.remove('modo-mapa');
        let oldImg = document.getElementById('mapa-fondo-img'); if(oldImg) oldImg.remove();
        const img = document.createElement('img'); img.id = 'mapa-fondo-img'; img.src = e.target.result; img.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; z-index:0; pointer-events:none;';
        canvas.insertBefore(img, canvas.firstChild); autosave();
    }; reader.readAsDataURL(event.target.files[0]);
}

function insertarIconoMapa(icono, color) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element mapa-icono';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px'; wrapper.style.color = color; wrapper.style.borderColor = color;
    wrapper.innerHTML = `<i class="fa-solid fa-${icono}"></i>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Icono insertado", "success");
}

function insertarZonaCalor(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element zona-calor ' + tipo;
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Zona insertada", "success");
}

function insertarTableroJugador() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#f8fafc; border:3px solid #9a3412; border-radius:12px; padding:20px; width:400px; box-shadow:0 10px 20px rgba(0,0,0,0.1);"><h3 style="font-family:'Playfair Display'; color:#9a3412; text-align:center; margin-bottom:15px;">Tablero de Jugador</h3><div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;"><div style="border:2px dashed #cbd5e1; padding:15px; text-align:center; background:white; border-radius:8px;" contenteditable="true"><strong>Acción 1</strong><br><small>Espacio para Token</small></div><div style="border:2px dashed #cbd5e1; padding:15px; text-align:center; background:white; border-radius:8px;" contenteditable="true"><strong>Acción 2</strong><br><small>Espacio para Token</small></div><div style="border:2px dashed #cbd5e1; padding:15px; text-align:center; background:white; border-radius:8px;" contenteditable="true"><strong>Acción 3</strong><br><small>Espacio para Token</small></div><div style="border:2px dashed #cbd5e1; padding:15px; text-align:center; background:white; border-radius:8px;" contenteditable="true"><strong>Acción 4</strong><br><small>Espacio para Token</small></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Player Board insertado", "success");
}

function insertarMercadoCartas() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:white; border:2px solid #ca8a04; border-radius:12px; padding:15px; box-shadow:0 10px 20px rgba(0,0,0,0.1);"><h3 style="font-family:'Playfair Display'; color:#ca8a04; text-align:center; margin-bottom:10px;">Mercado Central</h3><div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px;"><div style="min-width:120px; height:160px; border:2px solid #333; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#fffbeb; padding:10px;" contenteditable="true"><strong>Carta 1</strong><br><span style="color:#ca8a04; font-weight:bold;">Costo: 2</span></div><div style="min-width:120px; height:160px; border:2px solid #333; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#fffbeb; padding:10px;" contenteditable="true"><strong>Carta 2</strong><br><span style="color:#ca8a04; font-weight:bold;">Costo: 3</span></div><div style="min-width:120px; height:160px; border:2px solid #333; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#fffbeb; padding:10px;" contenteditable="true"><strong>Carta 3</strong><br><span style="color:#ca8a04; font-weight:bold;">Costo: 1</span></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Mercado insertado", "success");
}

function insertarTrackerRecursos() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#fff; border:2px solid #15803d; border-radius:12px; padding:20px; width:300px; box-shadow:0 10px 20px rgba(0,0,0,0.1);"><h4 style="font-family:'Playfair Display'; color:#15803d; text-align:center; margin-bottom:15px;">Gestor de Recursos</h4><div style="margin-bottom:10px;"><label style="font-size:12px; font-weight:bold; color:#333;">Madera</label><input type="range" min="0" max="10" value="5" style="width:100%;" oninput="this.nextElementSibling.innerText=this.value"><div style="text-align:center; font-weight:bold; color:#15803d;">5</div></div><div style="margin-bottom:10px;"><label style="font-size:12px; font-weight:bold; color:#333;">Agua</label><input type="range" min="0" max="10" value="3" style="width:100%;" oninput="this.nextElementSibling.innerText=this.value"><div style="text-align:center; font-weight:bold; color:#0284c7;">3</div></div><div style="margin-bottom:10px;"><label style="font-size:12px; font-weight:bold; color:#333;">Comida</label><input type="range" min="0" max="10" value="7" style="width:100%;" oninput="this.nextElementSibling.innerText=this.value"><div style="text-align:center; font-weight:bold; color:#ca8a04;">7</div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Tracker insertado", "success");
}

function insertarLosetaHex() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:100px; height:100px; background:#fef3c7; border:4px solid #78350f; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display:flex; align-items:center; justify-content:center; font-family:'Patrick Hand'; font-size:16px; color:#78350f; text-align:center; padding:10px;" contenteditable="true">Bosque</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Loseta Hex insertada", "success");
}

function insertarMeeple() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    // SVG vectorial (Sin contenteditable, 100% arrastrable)
    wrapper.innerHTML = `
        <svg width="50" height="60" viewBox="0 0 100 100" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.4)); cursor: grab;">
            <path d="M50 0 C60 0 65 10 65 20 C65 30 55 35 55 40 L85 70 L100 70 L100 100 L0 100 L0 70 L15 70 L45 40 C45 35 35 30 35 20 C35 10 40 0 50 0 Z" fill="#8B3A3A"/>
        </svg>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Meeple insertado", "success");
}

function insertarDialWavelength() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="background:#fff; border:2px solid #be123c; border-radius:50%; width:300px; height:300px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(0,0,0,0.1);"><div style="width:200px; height:200px; border-radius:50%; background:conic-gradient(from 180deg, #be123c, #fcd34d, #be123c); position:relative;"><div style="position:absolute; top:50%; left:50%; width:4px; height:100px; background:#333; transform-origin:bottom center; transform:translate(-50%, -100%) rotate(45deg);"></div></div><p style="font-family:'Patrick Hand'; font-size:20px; color:#be123c; margin-top:10px;">0 — 100</p></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Dial insertado", "success");
}

function insertarLineaTiempo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:600px; height:100px; background:#f8fafc; border:4px solid #0284c7; border-radius:12px; display:flex; align-items:center; padding:10px; gap:10px;"><div style="flex:1; height:100%; border:2px dashed #94a3b8; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#0284c7; font-family:'Playfair Display'; font-weight:bold;" contenteditable="true">1800</div><div style="flex:1; height:100%; border:2px dashed #94a3b8; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#0284c7; font-family:'Playfair Display'; font-weight:bold;" contenteditable="true">1900</div><div style="flex:1; height:100%; border:2px dashed #94a3b8; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#0284c7; font-family:'Playfair Display'; font-weight:bold;" contenteditable="true">2000</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Línea de Tiempo insertada", "success");
}

function insertarGeneradorDobble() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    const iconos = ['fa-heart', 'fa-star', 'fa-bolt', 'fa-leaf', 'fa-globe', 'fa-sun', 'fa-moon', 'fa-cloud'];
    let iconosHTML = '';
    for(let i=0; i<8; i++) { const icon = iconos[i]; const angle = (i / 8) * Math.PI * 2; const radius = 35; const x = 50 + radius * Math.cos(angle); const y = 50 + radius * Math.sin(angle); iconosHTML += `<i class="fa-solid ${icon} dobble-simbolo" style="top: ${y}%; left: ${x}%;"></i>`; }
    wrapper.innerHTML = `<div style="width:250px; height:250px; background:white; border-radius:50%; border:4px solid #dc2626; position:relative;">${iconosHTML}</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Dobble insertado", "success");
}

function insertarCartaRolOculto() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width:200px; height:300px; background:#1e1b4b; border:4px solid #4c1d95; border-radius:10px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 10px 20px rgba(0,0,0,0.3); color:white;"><div style="font-family:'Patrick Hand'; font-size:28px; text-align:center; padding:20px; text-shadow:0 2px 4px rgba(0,0,0,0.5);" contenteditable="true">Eres el Líder.<br><span style="font-size:14px; opacity:0.7;">(No reveles)</span></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Rol Oculto insertado", "success");
}


// ================= NUEVAS PLANTILLAS VISUALES (v82.0) =================

function insertarCartaVirus() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    // Plantilla visual de Virus! (Órgano verde)
    wrapper.innerHTML = `
        <div style="width: 160px; height: 220px; background: #fff; border: 4px solid #16a34a; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
            <div style="font-size: 50px; color: #16a34a; margin-bottom: 10px;"><i class="fa-solid fa-heart-pulse"></i></div>
            <div style="font-family: 'Patrick Hand'; font-size: 24px; color: #16a34a; font-weight: bold; text-align: center;" contenteditable="true">Órgano Sano</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta Virus insertada", "success");
}

function insertarCartaSushi() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    // Plantilla visual de Sushi Go! (Carta amarilla con puntaje)
    wrapper.innerHTML = `
        <div style="width: 140px; height: 200px; background: #fef08a; border: 3px solid #ca8a04; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
            <div style="font-size: 40px; color: #ca8a04; margin-bottom: 5px;"><i class="fa-solid fa-utensils"></i></div>
            <div style="font-family: 'Patrick Hand'; font-size: 20px; color: #713f12; text-align: center;" contenteditable="true">Nigiri</div>
            <div style="position: absolute; bottom: 10px; right: 10px; background: #ca8a04; color: white; font-weight: bold; padding: 2px 8px; border-radius: 10px; font-size: 14px;" contenteditable="true">+3</div>
        </div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta Sushi insertada", "success");
}

function insertarOrganoVirus(nombreOrgano, icono) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    // Por defecto, si se llama sin parámetros, usamos Corazón
    const nombre = nombreOrgano || 'Corazón';
    const ico = icono || 'fa-heart-pulse';

    wrapper.innerHTML = `
        <div style="width: 120px; height: 180px; background: #fff; border: 4px solid #16a34a; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
            <i class="fa-solid ${ico}" style="font-size: 45px; color: #16a34a; margin-bottom: 10px;"></i>
            <span style="font-family: 'Patrick Hand'; font-size: 22px; color: #16a34a; font-weight: bold; text-align: center; cursor: text;" contenteditable="true">${nombre}</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast(`${nombre} insertado`, "success");
}