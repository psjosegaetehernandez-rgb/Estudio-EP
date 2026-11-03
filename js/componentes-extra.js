// ================= MOTOR DE COMPONENTES v91.0 (Anti-Fallos) =================

// 1. INYECCIÓN DE INTERFAZ CON TEMPORIZADOR (Solución al problema de carga)
function inyectarBotonesJuegos() {
    const toolJuegos = document.getElementById('tool-juegos');
    
    // Si el panel de juegos aún no está en el DOM, esperamos 100ms y volvemos a intentar
    if (!toolJuegos) {
        setTimeout(inyectarBotonesJuegos, 100);
        return;
    }

    // Si ya inyectamos los botones previamente, no hacemos nada
    if (document.getElementById('grupo-catan')) return;

    const htmlBotones = `
        <!-- GRUPO CATÁN -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Catán (Componentes)</h4>
        <div id="grupo-catan" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2e7d32;" onclick="insertarHexCatan('Bosque', '#2e7d32', 'fa-tree')"><i class="fa-solid fa-tree"></i> Bosque</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#78909c;" onclick="insertarHexCatan('Montaña', '#78909c', 'fa-mountain')"><i class="fa-solid fa-mountain"></i> Montaña</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#fbc02d;" onclick="insertarHexCatan('Trigo', '#fbc02d', 'fa-wheat-awn')"><i class="fa-solid fa-wheat-awn"></i> Trigo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#d84315;" onclick="insertarHexCatan('Ladrillo', '#d84315', 'fa-cubes')"><i class="fa-solid fa-cubes"></i> Ladrillo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#81c784;" onclick="insertarHexCatan('Oveja', '#81c784', 'fa-cloud')"><i class="fa-solid fa-cloud"></i> Oveja</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#e0e0e0;" onclick="insertarHexCatan('Desierto', '#e0e0e0', 'fa-sun')"><i class="fa-solid fa-sun"></i> Desierto</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; grid-column: span 2; color:#78350f;" onclick="insertarFichaNumericaCatan()"><i class="fa-solid fa-circle"></i> Ficha Numérica</button>
        </div>

        <!-- GRUPO CARCASSONNE -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Carcassonne (Componentes)</h4>
        <div id="grupo-carcassonne" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d;" onclick="insertarLosetaCarcassonne('Ciudad')"><i class="fa-solid fa-building"></i> Ciudad</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d;" onclick="insertarLosetaCarcassonne('Camino')"><i class="fa-solid fa-road"></i> Camino</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d; grid-column: span 2;" onclick="insertarMeeple()"><i class="fa-solid fa-person"></i> Meeple (SVG)</button>
        </div>

        <!-- GRUPO HOMBRES LOBO -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Hombres Lobo (Roles)</h4>
        <div id="grupo-lobos" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="insertarRolLobo('Hombre Lobo')"><i class="fa-solid fa-paw"></i> Lobo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#475569;" onclick="insertarRolLobo('Aldeano')"><i class="fa-solid fa-user"></i> Aldeano</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#4c1d95; grid-column: span 2;" onclick="insertarRolLobo('Vidente')"><i class="fa-solid fa-eye"></i> Vidente</button>
        </div>

        <!-- GRUPO VIRUS -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Virus! (Órganos)</h4>
        <div id="grupo-virus-org" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:10px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#16a34a;" onclick="insertarOrganoVirus('Corazón', 'fa-heart-pulse')"><i class="fa-solid fa-heart-pulse"></i> Corazón</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#16a34a;" onclick="insertarOrganoVirus('Estómago', 'fa-drumstick-bite')"><i class="fa-solid fa-drumstick-bite"></i> Estómago</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#16a34a;" onclick="insertarOrganoVirus('Cerebro', 'fa-brain')"><i class="fa-solid fa-brain"></i> Cerebro</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#16a34a;" onclick="insertarOrganoVirus('Hueso', 'fa-bone')"><i class="fa-solid fa-bone"></i> Hueso</button>
        </div>
        <h4 style="font-size:11px; color:#64748b; margin-top:10px; margin-bottom:10px;">Virus! (Ataques)</h4>
        <div id="grupo-virus-atk" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="insertarCartaVirus()"><i class="fa-solid fa-virus"></i> Virus</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#0284c7;" onclick="insertarMedicinaVirus()"><i class="fa-solid fa-pills"></i> Medicina</button>
        </div>

        <!-- GRUPO UNO -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">UNO (Alta Fidelidad)</h4>
        <div id="grupo-uno-hf" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="insertarCartaUNOHF('#dc2626', '5')"><i class="fa-solid fa-clone"></i> UNO Rojo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2563eb;" onclick="insertarCartaUNOHF('#2563eb', '7')"><i class="fa-solid fa-clone"></i> UNO Azul</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626; grid-column: span 2;" onclick="insertarCartaUNOHF('#dc2626', '+2')"><i class="fa-solid fa-plus"></i> UNO Acción +2</button>
        </div>
    `;
    toolJuegos.insertAdjacentHTML('beforeend', htmlBotones);
}

// 3. INICIAR LA INYECCIÓN
inyectarBotonesJuegos();

// 4. CSS DE ALTA FIDELIDAD PARA EL UNO
if (!document.getElementById('estilos-componentes-v91')) {
    const style = document.createElement('style');
    style.id = 'estilos-componentes-v91';
    style.innerHTML = `
        .naipe-uno-v87 {
            width: 140px; height: 200px; border-radius: 12px; position: relative;
            box-shadow: 0 8px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;
            border: 6px solid #fff; font-family: 'Inter', sans-serif;
        }
        .naipe-uno-ovalo {
            width: 90px; height: 130px; background: #fff; border-radius: 50%; transform: rotate(-20deg);
            display: flex; align-items: center; justify-content: center;
        }
        .naipe-uno-texto {
            font-size: 55px; font-weight: 900; transform: rotate(-20deg);
            text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
        }
        .naipe-uno-esquina {
            position: absolute; font-size: 16px; font-weight: bold; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
    `;
    document.head.appendChild(style);
}

// ================= FUNCIONES DE CREACIÓN =================

// 1. CATÁN
function insertarHexCatan(nombre, color, icono) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    const textColor = nombre === 'Desierto' ? '#333' : '#fff';
    wrapper.innerHTML = `
        <div style="width: 120px; height: 120px; background: ${color}; border: 3px solid #333; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <i class="fa-solid ${icono}" style="font-size: 32px; color: rgba(255,255,255,0.8); margin-bottom: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"></i>
            <span style="font-family: 'Patrick Hand'; font-size: 18px; color: ${textColor}; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-weight: bold;">${nombre}</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast(`Hexágono ${nombre} insertado`, "success");
}

function insertarFichaNumericaCatan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `
        <div style="width: 50px; height: 50px; background: #fffbeb; border-radius: 50%; border: 2px solid #78350f; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            <span style="font-family: 'Inter'; font-size: 20px; font-weight: bold; color: #333;">8</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Ficha numérica insertada", "success");
}

// 2. CARCASSONNE (Arreglado para arrastrar)
function insertarLosetaCarcassonne(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (100 + (count * 30) % 400) + 'px'; wrapper.style.top = (100 + (count * 30) % 300) + 'px';
    
    let diseño = '';
    if (tipo === 'Ciudad') {
        diseño = `<div style="width: 100%; height: 100%; background: #d4a373; position: relative; overflow: hidden; border: 2px solid #333; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fa-solid fa-building" style="position: absolute; bottom: 10px; right: 10px; font-size: 40px; color: #8b5a2b;"></i><i class="fa-solid fa-tower-observation" style="position: absolute; top: 10px; left: 10px; font-size: 30px; color: #8b5a2b;"></i></div>`;
    } else {
        diseño = `<div style="width: 100%; height: 100%; background: #95d5b2; position: relative; overflow: hidden; border: 2px solid #333; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><div style="position: absolute; top: 50%; left: 0; width: 100%; height: 20px; background: #d4a373; transform: translateY(-50%);"></div></div>`;
    }
    wrapper.innerHTML = `<div style="width: 100px; height: 100px; cursor: grab;">${diseño}</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Loseta insertada", "success");
}

function insertarMeeple() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `
        <svg width="50" height="60" viewBox="0 0 100 100" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.4)); cursor: grab;">
            <path d="M50 0 C60 0 65 10 65 20 C65 30 55 35 55 40 L85 70 L100 70 L100 100 L0 100 L0 70 L15 70 L45 40 C45 35 35 30 35 20 C35 10 40 0 50 0 Z" fill="#8B3A3A"/>
        </svg>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Meeple insertado", "success");
}

// 3. HOMBRES LOBO
function insertarRolLobo(rol) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    const isLobo = rol === 'Hombre Lobo';
    const bgColor = isLobo ? '#1e1b4b' : '#f8fafc';
    const textColor = isLobo ? '#dc2626' : '#1e293b';
    const icono = isLobo ? 'fa-paw' : (rol === 'Vidente' ? 'fa-eye' : 'fa-user');
    wrapper.innerHTML = `
        <div style="width: 140px; height: 200px; background: ${bgColor}; border: 4px solid ${isLobo ? '#4c1d95' : '#cbd5e1'}; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
            <i class="fa-solid ${icono}" style="font-size: 50px; color: ${textColor}; margin-bottom: 10px;"></i>
            <span style="font-family: 'Patrick Hand'; font-size: 22px; color: ${textColor}; font-weight: bold; text-align: center;">${rol}</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast(`Carta ${rol} insertada`, "success");
}

// 4. VIRUS!
function insertarOrganoVirus(nombreOrgano, icono) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
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

function insertarCartaVirus() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `
        <div style="width: 120px; height: 180px; background: #fef2f2; border: 4px solid #dc2626; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
            <i class="fa-solid fa-virus" style="font-size: 45px; color: #dc2626; margin-bottom: 10px;"></i>
            <span style="font-family: 'Patrick Hand'; font-size: 20px; color: #dc2626; font-weight: bold;" contenteditable="true">Virus</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Virus insertado", "success");
}

function insertarMedicinaVirus() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `
        <div style="width: 120px; height: 180px; background: #f0f9ff; border: 4px solid #0284c7; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);">
            <i class="fa-solid fa-pills" style="font-size: 45px; color: #0284c7; margin-bottom: 10px;"></i>
            <span style="font-family: 'Patrick Hand'; font-size: 20px; color: #0284c7; font-weight: bold;" contenteditable="true">Medicina</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Medicina insertada", "success");
}

// 5. UNO ALTA FIDELIDAD
function insertarCartaUNOHF(color, valor) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    
    wrapper.innerHTML = `
        <div class="naipe-uno-v87" style="background-color: ${color};">
            <div class="naipe-uno-esquina" style="top: 10px; left: 10px;">${valor}</div>
            <div class="naipe-uno-ovalo">
                <div class="naipe-uno-texto" style="color: ${color};">${valor}</div>
            </div>
            <div class="naipe-uno-esquina" style="bottom: 10px; right: 10px; transform: rotate(180deg);">${valor}</div>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta UNO insertada", "success");
}