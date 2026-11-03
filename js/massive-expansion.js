// ================= GRAN EXPANSIÓN (v112.0) =================
// Inyecta nuevos botones y crea las funciones de los componentes

function inyectarBotonesExpansion() {
    const toolMazos = document.getElementById('tool-mazos');
    const toolJuegos = document.getElementById('tool-juegos');
    const toolGestion = document.getElementById('tool-gestion');
    
    if (!toolMazos || !toolJuegos || !toolGestion) { setTimeout(inyectarBotonesExpansion, 100); return; }
    if (document.getElementById('grupo-expansion')) return;

    // 1. Botones en la pestaña CARTAS (Nuevos formatos)
    const htmlCartas = `
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Formatos Especiales</h4>
        <div id="grupo-expansion" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarTopTrumps()"><i class="fa-solid fa-ranking-star"></i> Top Trumps</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarSushiGo()"><i class="fa-solid fa-utensils"></i> Sushi Go</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarCharada()"><i class="fa-solid fa-person-running"></i> Charada</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarRolOculto()"><i class="fa-solid fa-mask"></i> Rol Oculto</button>
        </div>
    `;
    toolMazos.insertAdjacentHTML('beforeend', htmlCartas);

    // 2. Botones en la pestaña JUEGOS (Tableros, Timelines, Tokens)
    const htmlJuegos = `
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Líneas de Tiempo</h4>
        <div style="display:grid; grid-template-columns: 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarTimeline()"><i class="fa-solid fa-timeline"></i> Línea de Tiempo</button>
        </div>

        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Nuevos Tableros</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarSkyTeam()"><i class="fa-solid fa-plane"></i> Sky Team</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarRollWrite()"><i class="fa-solid fa-route"></i> Roll & Write</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; grid-column: span 2;" onclick="insertarBingo()"><i class="fa-solid fa-table-cells"></i> Tablero Bingo</button>
        </div>

        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Tokens Especiales</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarTrainToken()"><i class="fa-solid fa-train"></i> Tren</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarBoatToken()"><i class="fa-solid fa-ship"></i> Barco</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarCoinToken()"><i class="fa-solid fa-coins"></i> Moneda</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px;" onclick="insertarHeartToken()"><i class="fa-solid fa-heart"></i> Vida</button>
        </div>
    `;
    toolJuegos.insertAdjacentHTML('beforeend', htmlJuegos);
}

// Iniciar inyección
inyectarBotonesExpansion();

// ================= FUNCIONES DE CREACIÓN =================
function baseCarta(html, ancho, alto) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container" style="width: ${ancho}px; height: ${alto}px; perspective: 1000px;">
            <div class="carta-inner">
                ${html}
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
    if(typeof showToast === 'function') showToast("Componente insertado", "success");
}

// NUEVAS CARTAS
function insertarTopTrumps() {
    baseCarta(`
        <div class="carta-front carta-toptrumps">
            <div class="toptrumps-header" contenteditable="true">Personaje</div>
            <div class="toptrumps-stats">
                <div class="toptrumps-stat-row"><span>Fuerza</span><span class="toptrumps-stat-value" contenteditable="true">8</span></div>
                <div class="toptrumps-stat-row"><span>Velocidad</span><span class="toptrumps-stat-value" contenteditable="true">5</span></div>
                <div class="toptrumps-stat-row"><span>Magia</span><span class="toptrumps-stat-value" contenteditable="true">3</span></div>
                <div class="toptrumps-stat-row"><span>Defensa</span><span class="toptrumps-stat-value" contenteditable="true">7</span></div>
            </div>
        </div>
        <div class="carta-back" style="background:#b91c1c;"></div>
    `, 200, 300);
}

function insertarSushiGo() {
    baseCarta(`
        <div class="carta-front carta-sushi">
            <div class="sushi-header" contenteditable="true">Nigiri</div>
            <div class="sushi-points" contenteditable="true">3</div>
            <div class="sushi-text" contenteditable="true">Salmón fresco</div>
        </div>
        <div class="carta-back" style="background:#f59e0b;"></div>
    `, 180, 260);
}

function insertarCharada() {
    baseCarta(`
        <div class="carta-front carta-charada">
            <div class="charada-cat" contenteditable="true">Oficio</div>
            <div class="charada-texto" contenteditable="true">El Alcalde</div>
        </div>
        <div class="carta-back" style="background:#ef4444;"></div>
    `, 250, 150);
}

function insertarRolOculto() {
    baseCarta(`
        <div class="carta-front carta-rol-oculto">
            <i class="fa-solid fa-paw" style="font-size:50px; color:#dc2626; margin-bottom:10px;"></i>
            <div style="font-family:'Patrick Hand'; font-size:24px; text-align:center; padding:20px;" contenteditable="true">Hombre Lobo</div>
        </div>
        <div class="carta-back" style="background:#1e1b4b;"></div>
    `, 200, 300);
}

// NUEVOS TABLEROS
function insertarTimeline() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    const count = document.querySelectorAll('#canvas > .doc-element').length;
    wrapper.style.left = '100px'; wrapper.style.top = (100 + count * 40) + 'px';
    wrapper.innerHTML = `
        <div class="timeline-widget">
            <div class="timeline-slot" contenteditable="true">1950</div>
            <div class="timeline-slot" contenteditable="true">1970</div>
            <div class="timeline-slot" contenteditable="true">1990</div>
            <div class="timeline-slot" contenteditable="true">2010</div>
            <div class="timeline-slot" contenteditable="true">HOY</div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Línea de Tiempo insertada", "success");
}

function insertarSkyTeam() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.innerHTML = `
        <div class="board-skyteam">
            <div class="skyteam-col"><h4>Piloto</h4><div class="skyteam-slots"><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div></div></div>
            <div class="skyteam-col"><h4>Copiloto</h4><div class="skyteam-slots"><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div><div class="skyteam-slot">Dado</div></div></div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Sky Team insertado", "success");
}

function insertarRollWrite() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    wrapper.innerHTML = `<div class="board-rollwrite"><div class="rollwrite-text" contenteditable="true">Dibuja tu ruta aquí</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Roll & Write insertado", "success");
}

function insertarBingo() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'doc-element';
    wrapper.style.left = '100px'; wrapper.style.top = '100px';
    let html = '<div class="board-bingo">';
    for(let i=0; i<25; i++) { 
        if(i===12) html += `<div class="bingo-cell libre">Libre</div>`; 
        else html += `<div class="bingo-cell" contenteditable="true">${Math.floor(Math.random()*75)+1}</div>`; 
    }
    html += '</div>';
    wrapper.innerHTML = html;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Bingo insertado", "success");
}

// NUEVOS TOKENS
function baseToken(html, ancho, alto) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; 
    wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = ancho + 'px'; wrapper.style.height = alto + 'px';
    wrapper.innerHTML = html;
    document.getElementById('canvas').appendChild(wrapper); 
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof showToast === 'function') showToast("Token insertado", "success");
}

function insertarTrainToken() { baseToken(`<div class="token-train"><i class="fa-solid fa-train"></i></div>`, 50, 35); }
function insertarBoatToken() { baseToken(`<div class="token-boat"></div>`, 50, 25); }
function insertarCoinToken() { baseToken(`<div class="token-coin">$</div>`, 40, 40); }
function insertarHeartToken() { 
    const svg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="#dc2626" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    baseToken(svg, 40, 40); 
}
// ================= NUEVOS MOTORES VISUALES (v128.0) =================

function insertarCartaWingspan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container" style="width: 140px; height: 200px; perspective: 1000px;">
            <div class="carta-inner">
                <div class="carta-front" style="background: #ecfdf5; border: 3px solid #10b981; border-radius: 12px; display: flex; flex-direction: column; padding: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    <div style="text-align: center; font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: #065f46; border-bottom: 1px solid #10b981; padding-bottom: 5px;">Pájaro</div>
                    <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-dove" style="font-size: 50px; color: #10b981; opacity: 0.8;"></i>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-family: 'Inter'; font-size: 10px; color: #065f46;">
                        <span>Alas: 60cm</span>
                        <span>Puntos: 3</span>
                    </div>
                </div>
                <div class="carta-back" style="background: #065f46; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-feather" style="font-size: 40px; color: rgba(255,255,255,0.2);"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast("Carta de Pájaro (Wingspan) insertada", "success");
}

function insertarLosetaKingdomino() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div style="width: 100px; height: 100px; background: #fef3c7; border: 3px solid #78350f; border-radius: 8px; display: flex; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative; overflow: hidden;">
            <div style="flex: 1; background: #86efac; border-right: 2px dashed #78350f; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-tree" style="color: #166534; font-size: 24px;"></i></div>
            <div style="flex: 1; background: #fcd34d; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-wheat-awn" style="color: #78350f; font-size: 24px;"></i></div>
            <div style="position: absolute; top: 2px; left: 2px; background: #fff; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 1px solid #333;">2</div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    showToast("Loseta (Kingdomino) insertada", "success");
}

function insertarCartaMunchkin() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container" style="width: 120px; height: 180px; perspective: 1000px;">
            <div class="carta-inner">
                <div class="carta-front" style="background: #78350f; border: 4px solid #451a03; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
                    <i class="fa-solid fa-dungeon" style="font-size: 40px; color: #fcd34d; margin-bottom: 10px;"></i>
                    <span style="font-family: 'Inter'; font-size: 14px; color: #fcd34d; font-weight: bold; text-align: center;">Monstruo Nivel 5</span>
                </div>
                <div class="carta-back" style="background: #451a03; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-door-closed" style="font-size: 40px; color: #78350f;"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast("Carta de Puerta (Munchkin) insertada", "success");
}

function insertarCartaJungleSpeed() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div style="width: 80px; height: 120px; background: white; border: 2px solid #333; border-radius: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            <i class="fa-solid fa-paw" style="font-size: 40px; color: #eab308;"></i>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    showToast("Carta (Jungle Speed) insertada", "success");
}

function insertarCartaCoup() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="carta-container" style="width: 100px; height: 150px; perspective: 1000px;">
            <div class="carta-inner">
                <div class="carta-front" style="background: #1e1b4b; border: 3px solid #4c1d95; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
                    <i class="fa-solid fa-user-secret" style="font-size: 30px; color: #a78bfa; margin-bottom: 10px;"></i>
                    <span style="font-family: 'Merriweather'; font-size: 12px; color: #e2e8f0; font-weight: bold;">Capitán</span>
                </div>
                <div class="carta-back" style="background: #0f172a; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-mask" style="font-size: 30px; color: #334155;"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast("Carta de Rol (Coup) insertada", "success");
}