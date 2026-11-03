// ================= MOTOR DE COMPONENTES v95.0 (Bóveda Completa) =================

// 1. INYECCIÓN DE INTERFAZ CON TEMPORIZADOR (Anti-fallos)
function inyectarBotonesJuegos() {
    const toolJuegos = document.getElementById('tool-juegos');
    if (!toolJuegos) { setTimeout(inyectarBotonesJuegos, 100); return; }
    if (document.getElementById('grupo-pandemia-ticket')) return; // Si ya están inyectados

    const htmlBotones = `
        <!-- GRUPO CATÁN -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Catán (Hexágonos)</h4>
        <div id="grupo-catan-hex" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2e7d32;" onclick="insertarHexCatan('Bosque', '#2e7d32', 'fa-tree')"><i class="fa-solid fa-tree"></i> Bosque</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#78909c;" onclick="insertarHexCatan('Montaña', '#78909c', 'fa-mountain')"><i class="fa-solid fa-mountain"></i> Montaña</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#fbc02d;" onclick="insertarHexCatan('Trigo', '#fbc02d', 'fa-wheat-awn')"><i class="fa-solid fa-wheat-awn"></i> Trigo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#d84315;" onclick="insertarHexCatan('Ladrillo', '#d84315', 'fa-cubes')"><i class="fa-solid fa-cubes"></i> Ladrillo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#81c784;" onclick="insertarHexCatan('Oveja', '#81c784', 'fa-cloud')"><i class="fa-solid fa-cloud"></i> Oveja</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#e0e0e0;" onclick="insertarHexCatan('Desierto', '#e0e0e0', 'fa-sun')"><i class="fa-solid fa-sun"></i> Desierto</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; grid-column: span 2; color:#78350f;" onclick="insertarFichaNumericaCatan()"><i class="fa-solid fa-circle"></i> Ficha Numérica</button>
        </div>

        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Catán (Piezas de Madera)</h4>
        <div id="grupo-catan-piezas" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#78350f;" onclick="insertarPobladoCatan()"><i class="fa-solid fa-house"></i> Poblado</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#78350f;" onclick="insertarCiudadCatan()"><i class="fa-solid fa-city"></i> Ciudad</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#78350f;" onclick="insertarCaminoCatan()"><i class="fa-solid fa-road"></i> Camino</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#0284c7;" onclick="insertarBarcoCatan()"><i class="fa-solid fa-ship"></i> Barco</button>
        </div>

        <!-- GRUPO CARCASSONNE -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Carcassonne</h4>
        <div id="grupo-carcassonne" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d;" onclick="insertarLosetaCarcassonne('Ciudad')"><i class="fa-solid fa-building"></i> Ciudad</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d;" onclick="insertarLosetaCarcassonne('Camino')"><i class="fa-solid fa-road"></i> Camino</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d; grid-column: span 2;" onclick="insertarMeeple()"><i class="fa-solid fa-person"></i> Meeple (SVG)</button>
        </div>

        <!-- GRUPO HOMBRES LOBO -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Hombres Lobo</h4>
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

        <!-- GRUPO SUSHI -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Sushi Go!</h4>
        <div id="grupo-sushi" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#f59e0b;" onclick="insertarCartaSushi('Nigiri')"><i class="fa-solid fa-fish"></i> Nigiri</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#f59e0b;" onclick="insertarCartaSushi('Maki')"><i class="fa-solid fa-egg"></i> Maki</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#f59e0b;" onclick="insertarCartaSushi('Sashimi')"><i class="fa-solid fa-fish-fins"></i> Sashimi</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#f59e0b;" onclick="insertarCartaSushi('Tempura')"><i class="fa-solid fa-shrimp"></i> Tempura</button>
        </div>

        <!-- GRUPO PANDEMIC -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Pandemic</h4>
        <div id="grupo-pandemia-ticket" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="generarMultiples('cuboPandemic', 12)"><i class="fa-solid fa-cube"></i> Cubo Rojo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#0284c7;" onclick="generarMultiples('cuboPandemicAzul', 12)"><i class="fa-solid fa-cube"></i> Cubo Azul</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#eab308; grid-column: span 2;" onclick="generarMultiples('cuboPandemicAmarillo', 12)"><i class="fa-solid fa-cube"></i> Cubo Amarillo (12)</button>
        </div>

        <!-- GRUPO TICKET TO RIDE -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Ticket to Ride</h4>
        <div id="grupo-ticket" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="insertarCartaTrenTicket('#dc2626')"><i class="fa-solid fa-train"></i> Vagón Rojo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2563eb;" onclick="insertarCartaTrenTicket('#2563eb')"><i class="fa-solid fa-train"></i> Vagón Azul</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#1e293b; grid-column: span 2;" onclick="insertarBoletoTicket()"><i class="fa-solid fa-route"></i> Boleto de Destino</button>
        </div>

        <!-- GRUPO CODENAMES -->
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Codenames</h4>
        <div id="grupo-codenames" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="insertarFichaAgente('#dc2626')"><i class="fa-solid fa-square"></i> Agente Rojo</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2563eb;" onclick="insertarFichaAgente('#2563eb')"><i class="fa-solid fa-square"></i> Agente Azul</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#1e293b; grid-column: span 2;" onclick="insertarFichaAgente('#1e293b')"><i class="fa-solid fa-skull"></i> Asesino (Negro)</button>
        </div>
    `;
    toolJuegos.insertAdjacentHTML('beforeend', htmlBotones);
}

// Iniciar inyección
inyectarBotonesJuegos();

// CSS de Alta Fidelidad para el UNO
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

// ================= FUNCIONES DE MULTIPLICACIÓN =================
function generarMultiples(tipoFuncion, cantidadPorDefecto) {
    const input = prompt("¿Cuántas piezas quieres generar?", cantidadPorDefecto);
    if (!input) return;
    const cantidad = parseInt(input);
    if (isNaN(cantidad) || cantidad <= 0) return;

    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            if (tipoFuncion === 'cuboPandemic') insertarCuboPandemic('#dc2626');
            else if (tipoFuncion === 'cuboPandemicAzul') insertarCuboPandemic('#0284c7');
            else if (tipoFuncion === 'cuboPandemicAmarillo') insertarCuboPandemic('#eab308');
        }, i * 50);
    }
}

// ================= FUNCIONES DE CREACIÓN =================

// CATÁN: HEXÁGONOS Y FICHAS
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
            <span style="font-family: 'Inter'; font-size: 20px; font-weight: bold; color: #333;" contenteditable="true">8</span>
        </div>
    `;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Ficha numérica insertada", "success");
}

// CATÁN: PIEZAS DE MADERA
function insertarPobladoCatan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = '40px'; wrapper.style.height = '40px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: #8B5A2B; clip-path: polygon(50% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%); display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.3); color: white; font-size: 12px; font-weight: bold; padding-bottom: 3px;">P</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Poblado insertado", "success");
}

function insertarCiudadCatan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = '60px'; wrapper.style.height = '50px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: #8B5A2B; clip-path: polygon(50% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%); display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.3); color: white; font-size: 14px; font-weight: bold; padding-bottom: 5px;">C</div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Ciudad insertada", "success");
}

function insertarCaminoCatan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = '60px'; wrapper.style.height = '15px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: #8B5A2B; border-radius: 4px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Camino insertado", "success");
}

function insertarBarcoCatan() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = '50px'; wrapper.style.height = '20px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: #0284c7; border-radius: 8px 8px 2px 2px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Barco insertado", "success");
}

// CARCASSONNE
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
    wrapper.innerHTML = `<svg width="50" height="60" viewBox="0 0 100 100" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.4)); cursor: grab;"><path d="M50 0 C60 0 65 10 65 20 C65 30 55 35 55 40 L85 70 L100 70 L100 100 L0 100 L0 70 L15 70 L45 40 C45 35 35 30 35 20 C35 10 40 0 50 0 Z" fill="#8B3A3A"/></svg>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Meeple insertado", "success");
}

// HOMBRES LOBO
function insertarRolLobo(rol) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    const isLobo = rol === 'Hombre Lobo';
    const bgColor = isLobo ? '#1e1b4b' : '#f8fafc';
    const textColor = isLobo ? '#dc2626' : '#1e293b';
    const icono = isLobo ? 'fa-paw' : (rol === 'Vidente' ? 'fa-eye' : 'fa-user');
    wrapper.innerHTML = `<div style="width: 140px; height: 200px; background: ${bgColor}; border: 4px solid ${isLobo ? '#4c1d95' : '#cbd5e1'}; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.2);"><i class="fa-solid ${icono}" style="font-size: 50px; color: ${textColor}; margin-bottom: 10px;"></i><span style="font-family: 'Patrick Hand'; font-size: 22px; color: ${textColor}; font-weight: bold; text-align: center;">${rol}</span></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast(`Carta ${rol} insertada`, "success");
}

// VIRUS!
function insertarOrganoVirus(nombreOrgano, icono) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    const nombre = nombreOrgano || 'Corazón';
    const ico = icono || 'fa-heart-pulse';
    wrapper.innerHTML = `<div style="width: 120px; height: 180px; background: #fff; border: 4px solid #16a34a; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);"><i class="fa-solid ${ico}" style="font-size: 45px; color: #16a34a; margin-bottom: 10px;"></i><span style="font-family: 'Patrick Hand'; font-size: 22px; color: #16a34a; font-weight: bold; text-align: center;" contenteditable="true">${nombre}</span></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast(`${nombre} insertado`, "success");
}

function insertarCartaVirus() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width: 120px; height: 180px; background: #fef2f2; border: 4px solid #dc2626; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);"><i class="fa-solid fa-virus" style="font-size: 45px; color: #dc2626; margin-bottom: 10px;"></i><span style="font-family: 'Patrick Hand'; font-size: 20px; color: #dc2626; font-weight: bold;" contenteditable="true">Virus</span></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Virus insertado", "success");
}

function insertarMedicinaVirus() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div style="width: 120px; height: 180px; background: #f0f9ff; border: 4px solid #0284c7; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15);"><i class="fa-solid fa-pills" style="font-size: 45px; color: #0284c7; margin-bottom: 10px;"></i><span style="font-family: 'Patrick Hand'; font-size: 20px; color: #0284c7; font-weight: bold;" contenteditable="true">Medicina</span></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Medicina insertada", "success");
}

// UNO
function insertarCartaUNOHF(color, valor) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="naipe-uno-v87" style="background-color: ${color};"><div class="naipe-uno-esquina" style="top: 10px; left: 10px;">${valor}</div><div class="naipe-uno-ovalo"><div class="naipe-uno-texto" style="color: ${color};">${valor}</div></div><div class="naipe-uno-esquina" style="bottom: 10px; right: 10px; transform: rotate(180deg);">${valor}</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Carta UNO insertada", "success");
}

// SUSHI
function insertarCartaSushi(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (150 + (count * 30) % 400) + 'px'; wrapper.style.top = (150 + (count * 30) % 300) + 'px';
    let icono = 'fa-fish'; let color = '#f59e0b';
    if(tipo === 'Maki') { icono = 'fa-egg'; color = '#10b981'; }
    else if (tipo === 'Sashimi') { icono = 'fa-fish-fins'; color = '#ef4444'; }
    else if (tipo === 'Tempura') { icono = 'fa-shrimp'; color = '#d97706'; }
    wrapper.innerHTML = `<div style="width: 100px; height: 150px; background: #fffbeb; border: 3px solid ${color}; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.15); position: relative;"><i class="fa-solid ${icono}" style="font-size: 35px; color: ${color}; margin-bottom: 5px;"></i><span style="font-family: 'Patrick Hand'; font-size: 16px; color: #92400e; font-weight: bold; text-align: center;" contenteditable="true">${tipo}</span><div style="position: absolute; bottom: 8px; right: 8px; background: ${color}; color: white; font-weight: bold; padding: 2px 6px; border-radius: 10px; font-size: 12px;" contenteditable="true">+1</div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Sushi insertado", "success");
}

// PANDEMIC
function insertarCuboPandemic(color) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    wrapper.style.left = (200 + Math.random() * 200) + 'px'; wrapper.style.top = (200 + Math.random() * 200) + 'px';
    wrapper.style.width = '25px'; wrapper.style.height = '25px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: ${color}; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.3); border: 1px solid rgba(0,0,0,0.5);"></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Cubo insertado", "success");
}

// TICKET TO RIDE
function insertarCartaTrenTicket(colorHex) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-container" style="width: 120px; height: 180px; perspective: 1000px;"><div class="carta-inner"><div class="carta-front" style="background: ${colorHex}; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border: 4px solid rgba(0,0,0,0.2);"><i class="fa-solid fa-train" style="font-size: 60px; color: rgba(255,255,255,0.9); text-shadow: 1px 1px 3px rgba(0,0,0,0.4);"></i></div><div class="carta-back" style="background: #1e293b; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-train" style="font-size: 40px; color: #475569;"></i></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast(`Carta de Vagón insertada`, "success");
}

function insertarBoletoTicket() {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.innerHTML = `<div class="carta-container" style="width: 220px; height: 140px; perspective: 1000px;"><div class="carta-inner"><div class="carta-front" style="background: #fffbeb; display: flex; flex-direction: column; justify-content: space-between; padding: 15px; border-radius: 4px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border: 2px solid #cbd5e1;"><div style="display: flex; justify-content: space-between; align-items: center; width: 100%; font-weight: bold; font-family: 'Inter'; color: #1e293b;"><span contenteditable="true">Nueva York</span><span>➔</span><span contenteditable="true">Los Ángeles</span></div><div style="width: 100%; height: 2px; background: #cbd5e1; margin: 10px 0;"></div><div style="display: flex; justify-content: space-between; align-items: center; width: 100%; font-family: 'Inter';"><span style="font-size: 12px; color: #64748b;">Valor</span><span style="font-size: 20px; font-weight: bold; color: #1e293b;" contenteditable="true">+ 20</span></div></div><div class="carta-back" style="background: #1e293b; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-route" style="font-size: 40px; color: #475569;"></i></div></div></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper);
    wrapper.addEventListener('dblclick', (e) => { if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') wrapper.querySelector('.carta-container').classList.toggle('flipped'); });
    showToast(`Boleto de Destino insertado`, "success");
}

// CODENAMES
function insertarFichaAgente(color) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div'); wrapper.className = 'canvas-element token-wrapper';
    const count = document.querySelectorAll('#canvas > .canvas-element').length;
    wrapper.style.left = (200 + (count * 30) % 400) + 'px'; wrapper.style.top = (200 + (count * 30) % 300) + 'px';
    wrapper.style.width = '30px'; wrapper.style.height = '20px';
    wrapper.innerHTML = `<div style="width: 100%; height: 100%; background: ${color}; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`;
    document.getElementById('canvas').appendChild(wrapper); hacerArrastrable(wrapper); showToast("Ficha insertada", "success");
}


// ================= MOTOR v33.0 (TABLEROS COMPLEJOS) =================
function inyectarBotonesV33() {
    const toolJuegos = document.getElementById('tool-juegos');
    if (!toolJuegos) { setTimeout(inyectarBotonesV33, 100); return; }
    if (document.getElementById('grupo-v33')) return;

    const htmlBotones = `
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Motores v33.0 (Tableros)</h4>
        <div id="grupo-v33" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#2e7d32;" onclick="document.dispatchEvent(new CustomEvent('EP:generateGame', {detail:{gameId:'catan'}}))"><i class="fa-solid fa-hexagon"></i> Tablero Catán</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#0284c7;" onclick="document.dispatchEvent(new CustomEvent('EP:generateGame', {detail:{gameId:'pandemic'}}))"><i class="fa-solid fa-map"></i> Mapa Pandemic</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#9a3412; grid-column: span 2;" onclick="document.dispatchEvent(new CustomEvent('EP:generateGame', {detail:{gameId:'perimetro'}}))"><i class="fa-solid fa-border-all"></i> Tablero Perímetro</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#dc2626;" onclick="EPComponentsEngine.insertarCubo('#dc2626')"><i class="fa-solid fa-cube"></i> Cubo 3D</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#8B3A3A;" onclick="EPComponentsEngine.insertarMeepleCSS()"><i class="fa-solid fa-person"></i> Meeple CSS</button>
        </div>
    `;
    toolJuegos.insertAdjacentHTML('beforeend', htmlBotones);
}
inyectarBotonesV33();


// ================= BOTONES MAESTROS (v101.0) =================
function inyectarBotonesV101() {
    const toolJuegos = document.getElementById('tool-juegos');
    if (!toolJuegos) { setTimeout(inyectarBotonesV101, 100); return; }
    if (document.getElementById('grupo-v101')) return;

    const htmlBotones = `
        <h4 style="font-size:11px; color:#64748b; margin-top:15px; margin-bottom:10px;">Tableros Maestros</h4>
        <div id="grupo-v101" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:15px;">
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#9a3412; grid-column: span 2;" onclick="document.dispatchEvent(new CustomEvent('EP:generateGame', {detail:{gameId:'perimetro'}}))"><i class="fa-solid fa-ring"></i> Tablero Perímetro</button>
            <button class="btn btn-outline" style="font-size:11px; padding:6px; color:#15803d; grid-column: span 2;" onclick="document.dispatchEvent(new CustomEvent('EP:generateGame', {detail:{gameId:'carcassonne'}}))"><i class="fa-solid fa-th"></i> Losetas (Carcassonne)</button>
        </div>
    `;
    toolJuegos.insertAdjacentHTML('beforeend', htmlBotones);
}
inyectarBotonesV101();