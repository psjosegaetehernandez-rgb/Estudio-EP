// ================= MOTORES DE CATÁLOGO (v205.0) =================

function insertarCartaSushi() {
    const c = [{ nombre: 'Nigiri', icono: 'fa-fish', puntos: '+1', color: '#f59e0b' },{ nombre: 'Maki', icono: 'fa-bowl-rice', puntos: '+2', color: '#15803d' },{ nombre: 'Temaki', icono: 'fa-ice-cream', puntos: '+3', color: '#dc2626' },{ nombre: 'Sashimi', icono: 'fa-drumstick-bite', puntos: '+5', color: '#0284c7' }][Math.floor(Math.random() * 4)];
    const front = `<div class="carta-pro carta-sushi" style="border-color:${c.color};"><div class="sushi-header" style="background:${c.color};">${c.nombre}</div><div class="sushi-icon" style="color:${c.color};"><i class="fa-solid ${c.icono}"></i></div><div class="sushi-points">${c.puntos}</div></div>`;
    const back = `<div style="width:100%; height:100%; background:#fef3c7; border-radius:8px; display:flex; align-items:center; justify-content:center; border: 4px solid #d97706;"><i class="fa-solid fa-utensils" style="font-size:50px; color:#d97706;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaDixit() {
    const img = [{ icono: 'fa-moon', nombre: 'La Luna', grad: 'linear-gradient(135deg, #4c1d95, #1e1b4b, #000)' },{ icono: 'fa-key', nombre: 'La Llave', grad: 'linear-gradient(135deg, #ca8a04, #78350f, #451a03)' },{ icono: 'fa-feather', nombre: 'La Pluma', grad: 'linear-gradient(135deg, #0284c7, #1e40af, #172554)' },{ icono: 'fa-eye', nombre: 'El Ojo', grad: 'linear-gradient(135deg, #dc2626, #7f1d1d, #450a0a)' }][Math.floor(Math.random() * 4)];
    const front = `<div class="carta-pro carta-dixit" style="background:${img.grad};"><i class="fa-solid ${img.icono}"></i><div class="dixit-overlay">${img.nombre}</div></div>`;
    const back = `<div style="width:100%; height:100%; background:linear-gradient(45deg, #1e1b4b, #312e81); border-radius:12px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-moon" style="font-size:50px; color:rgba(255,255,255,0.3);"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaHombreLobo() {
    const r = [{ nombre: 'Hombre Lobo', icono: 'fa-paw' },{ nombre: 'Aldeano', icono: 'fa-user' },{ nombre: 'Vidente', icono: 'fa-eye' },{ nombre: 'Bruja', icono: 'fa-hat-wizard' }][Math.floor(Math.random() * 4)];
    const front = `<div class="carta-pro carta-lobos"><i class="fa-solid ${r.icono}"></i><div class="lobos-nombre">${r.nombre}</div></div>`;
    const back = `<div style="width:100%; height:100%; background:#0f172a; border-radius:10px; display:flex; align-items:center; justify-content:center; border: 2px solid #475569;"><i class="fa-solid fa-moon" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaCodename() {
    const palabras = ['SOL', 'NIEVE', 'AGUJA', 'FUEGO', 'OLAS', 'LUNA', 'PIE', 'MANO', 'ÁRBOL', 'PIEDRA'];
    const pal = palabras[Math.floor(Math.random() * palabras.length)];
    const esRojo = Math.random() > 0.5;
    const front = `<div class="carta-pro carta-codename ${esRojo ? 'codename-rojo' : 'codename-azul'}"><span>${pal}</span></div>`;
    const back = `<div style="width:100%; height:100%; background:repeating-linear-gradient(45deg, #1e293b, #1e293b 10px, #334155 10px, #334155 20px); border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-user-secret" style="font-size:50px; color:#cbd5e1;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaWingspan() {
    const front = `<div class="carta-pro" style="background:#ecfdf5; border:3px solid #10b981; border-radius:12px; display:flex; flex-direction:column; padding:10px;"><div style="text-align:center; font-family:'Merriweather'; font-size:14px; font-weight:bold; color:#065f46; border-bottom:1px solid #10b981; padding-bottom:5px;">Pájaro</div><div style="flex:1; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-dove" style="font-size:50px; color:#10b981; opacity:0.8;"></i></div><div style="display:flex; justify-content:space-between; font-size:10px; color:#065f46;"><span>Alas: 60cm</span><span>Puntos: 3</span></div></div>`;
    const back = `<div style="width:100%; height:100%; background:#064e3b; border-radius:12px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-feather" style="font-size:50px; color:#34d399;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaMunchkin() {
    const front = `<div class="carta-pro" style="background:#78350f; border:4px solid #451a03; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px;"><i class="fa-solid fa-dungeon" style="font-size:40px; color:#fcd34d; margin-bottom:10px;"></i><span style="font-family:'Inter'; font-size:14px; color:#fcd34d; font-weight:bold;">Monstruo Nv 5</span></div>`;
    const back = `<div style="width:100%; height:100%; background:#451a03; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-door-closed" style="font-size:50px; color:#fcd34d;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaJungleSpeed() {
    const front = `<div class="carta-pro" style="background:white; border:2px solid #333; border-radius:6px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-paw" style="font-size:50px; color:#eab308;"></i></div>`;
    const back = `<div style="width:100%; height:100%; background:#eab308; border-radius:6px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-paw" style="font-size:50px; color:#422006;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaCoup() {
    const front = `<div class="carta-pro" style="background:#1e1b4b; border:3px solid #4c1d95; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center;"><i class="fa-solid fa-user-secret" style="font-size:40px; color:#a78bfa; margin-bottom:10px;"></i><span style="font-family:'Merriweather'; font-size:14px; color:#e2e8f0; font-weight:bold;">Capitán</span></div>`;
    const back = `<div style="width:100%; height:100%; background:#0f172a; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-mask" style="font-size:50px; color:#a78bfa;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaPolillaNum() {
    const num = Math.floor(Math.random() * 5) + 1;
    const front = `<div class="carta-pro" style="background:#fff; border:4px solid #0f172a; border-radius:10px; display:flex; align-items:center; justify-content:center;"><div style="font-size:80px; font-weight:900; color:#0f172a;">${num}</div></div>`;
    const back = `<div style="width:100%; height:100%; background:#1e1b4b; border-radius:10px; display:flex; align-items:center; justify-content:center; border:4px solid #a78bfa;"><i class="fa-solid fa-bug" style="font-size:50px; color:#a78bfa;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function insertarCartaPolillaTramposa() {
    const front = `<div class="carta-pro" style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border:4px solid #a78bfa; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white;"><i class="fa-solid fa-bug" style="font-size:70px; margin-bottom:10px;"></i><div style="font-size:18px; font-weight:bold;">Polilla Tramposa</div></div>`;
    const back = `<div style="width:100%; height:100%; background:#1e1b4b; border-radius:10px; display:flex; align-items:center; justify-content:center; border:4px solid #a78bfa;"><i class="fa-solid fa-bug" style="font-size:50px; color:#a78bfa;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

// PANDEMIC
function insertarEventoPandemic(posX, posY) {
    const ev = [{ nombre: 'Brote', texto: 'El virus se propaga.', color: '#dc2626', icon: 'fa-biohazard' },{ nombre: 'Cuarentena', texto: 'Detiene la expansión.', color: '#0284c7', icon: 'fa-shield-virus' },{ nombre: 'Tormenta', texto: 'Azota la comunidad.', color: '#475569', icon: 'fa-cloud-bolt' }][Math.floor(Math.random() * 3)];
    const front = `<div class="carta-pro" style="display:flex; flex-direction:column; background:#f8fafc; border:3px solid ${ev.color}; overflow:hidden;"><div style="flex-shrink:0; background:${ev.color}; width:100%; padding:10px; text-align:center;"><div class="carta-titulo" style="color:white; font-family:'Playfair Display'; font-size:16px; font-weight:bold; text-transform:uppercase;" contenteditable="true">${ev.nombre}</div></div><div style="flex:1; min-height:0; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle, #fff 0%, #f1f5f9 100%);"><i class="fa-solid ${ev.icon}" style="font-size:65px; color:${ev.color};"></i></div><div style="flex-shrink:0; height:85px; padding:10px; background:white; border-top:2px dashed ${ev.color}; box-sizing:border-box; display:flex; align-items:center; justify-content:center;"><div class="carta-texto" style="font-family:'Inter'; font-size:12px; color:#334155; text-align:center;" contenteditable="true">${ev.texto}</div></div></div>`;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px solid #0f172a;"><i class="fa-solid fa-biohazard" style="font-size:60px; color:#dc2626; margin-bottom:10px;"></i><div style="font-family:'Playfair Display'; font-size:14px; color:#94a3b8; letter-spacing:2px;">PANDEMIC</div></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}
function insertarTableroPandemic(posX, posY) {
    const html = `<div style="width:500px; height:300px; background:#0f172a; border:4px solid #1e293b; border-radius:12px; position:relative;"><svg viewBox="0 0 500 300" style="width:100%; height:100%; opacity:0.8;"><path d="M 50,100 Q 100,50 150,120 T 200,180 Q 150,200 100,150 Z" fill="#334155"/><path d="M 250,50 Q 350,40 400,100 T 450,200 Q 350,250 300,150 Z" fill="#334155"/><circle cx="150" cy="120" r="8" fill="#dc2626"/><circle cx="300" cy="150" r="8" fill="#0284c7"/></svg></div>`;
    EP.insertarCartaEnCanvas(html, 500, 300, posX, posY);
}
function insertarCuboPandemic(posX, posY) {
    const color = ['#dc2626', '#0284c7', '#eab308', '#1e293b'][Math.floor(Math.random()*4)];
    EP.insertarCartaEnCanvas(`<div style="width:35px; height:35px; background:${color}; border-radius:6px; box-shadow:3px 3px 0 rgba(0,0,0,0.4);"></div>`, 35, 35, posX, posY);
}
function insertarMeeplePandemic(posX, posY) {
    const color = ['#0284c7', '#dc2626', '#15803d'][Math.floor(Math.random()*3)];
    EP.insertarCartaEnCanvas(`<div style="width:45px; height:55px; filter:drop-shadow(3px 5px 4px rgba(0,0,0,0.5));"><svg viewBox="0 0 100 100"><path d="M50 5 C62 5 70 15 70 25 C70 35 60 42 58 45 L85 65 L95 65 L95 95 L5 95 L5 65 L15 65 L42 45 C40 42 30 35 30 25 C30 15 38 5 50 5 Z" fill="${color}"/></svg></div>`, 45, 55, posX, posY);
}


// ================= COMPONENTES EXACTOS CATÁLOGO (v222.0) =================

function insertarCentroInvestigacion(posX, posY) {
    const html = `
        <div style="width: 60px; height: 60px; background: #f0f9ff; border: 3px solid #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
            <i class="fa-solid fa-microscope" style="font-size: 30px; color: #0284c7;"></i>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 60, 60, posX, posY);
}

function insertarCuraPandemic(posX, posY) {
    const html = `
        <div style="width: 40px; height: 40px; background: #dc2626; border: 3px solid #7f1d1d; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            <i class="fa-solid fa-syringe" style="font-size: 20px; color: white;"></i>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 40, 40, posX, posY);
}

function insertarCartaClaveCodenames(posX, posY) {
    const html = `
        <div style="background: #fdfbf7; border: 2px solid #1e293b; border-radius: 8px; padding: 15px; width: 350px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
            <h4 style="font-family: 'Merriweather'; font-size: 16px; color: #1e293b; margin-bottom: 10px;">Carta Clave (Key Card)</h4>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; width: 100%;">
                <!-- Generamos 25 cuadros de colores aleatorios para simular la clave -->
                ${Array.from({length: 25}).map(() => {
                    const rand = Math.random();
                    let color = '#cbd5e1'; // neutral
                    if (rand < 0.35) color = '#dc2626'; // rojo
                    else if (rand < 0.70) color = '#2563eb'; // azul
                    else if (rand < 0.75) color = '#1e293b'; // asesino
                    return `<div style="background: ${color}; aspect-ratio: 1/1; border-radius: 4px;"></div>`;
                }).join('')}
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 350, 350, posX, posY);
}


// ================= MOTORES ABSORBIDOS AL CATÁLOGO (v223.0) =================

function cat_insertarCartaUno() {
    const colores = ['#dc2626', '#2563eb', '#16a34a', '#eab308'];
    const valores = ['0','1','2','3','4','5','6','7','8','9','Reversa','Bloqueo','+2'];
    const color = colores[Math.floor(Math.random() * colores.length)];
    const valor = valores[Math.floor(Math.random() * valores.length)];
    
    const front = `
        <div class="carta-pro" style="background: ${color}; border: 4px solid white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 0 4px ${color};">
            <div style="background: white; width: 80%; height: 85%; border-radius: 50% 50% 10px 10px; display: flex; align-items: center; justify-content: center; transform: rotate(-15deg); box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">
                <span style="font-family: 'Arial Black'; font-size: ${valor.length > 1 ? '30px' : '70px'}; color: ${color}; text-shadow: 2px 2px 0 #000; font-weight: 900;">${valor}</span>
            </div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:12px; display:flex; align-items:center; justify-content:center;"><span style="font-family:'Arial Black'; font-size:40px; color:#dc2626; font-style:italic; text-shadow: 2px 2px 0 #fff;">UNO</span></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarTableroTrivial(posX, posY) {
    const html = `
        <div style="width: 400px; height: 400px; background: #fdfbf7; border-radius: 50%; border: 8px solid #1e293b; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
            <!-- Divisiones -->
            <svg viewBox="0 0 100 100" style="position:absolute; width:100%; height:100%;">
                <path d="M50,50 L50,0 A50,50 0 0,1 100,50 Z" fill="#eab308" opacity="0.2"/>
                <path d="M50,50 L100,50 A50,50 0 0,1 50,100 Z" fill="#dc2626" opacity="0.2"/>
                <path d="M50,50 L50,100 A50,50 0 0,1 0,50 Z" fill="#2563eb" opacity="0.2"/>
                <path d="M50,50 L0,50 A50,50 0 0,1 50,0 Z" fill="#16a34a" opacity="0.2"/>
            </svg>
            <div style="width: 150px; height: 150px; background: #1e293b; border-radius: 50%; z-index: 2; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-family: 'Merriweather'; font-size: 20px; text-align: center;">TRIVIAL</span>
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 400, 400, posX, posY);
}

function cat_insertarLosetaCarcassonne(posX, posY) {
    const tipos = [
        { bg: '#86efac', path: 'M0,0 L100,0 L100,50 L50,50 L50,100 L0,100 Z', color: '#166534' }, // Camino
        { bg: '#fef08a', path: 'M0,0 L100,0 L100,100 L0,100 Z', color: '#ca8a04' }, // Trigo
        { bg: '#cbd5e1', path: 'M30,0 L70,0 L70,30 L100,30 L100,70 L70,70 L70,100 L30,100 L30,70 L0,70 L0,30 L30,30 Z', color: '#475569' } // Ciudad
    ];
    const t = tipos[Math.floor(Math.random() * tipos.length)];
    
    const html = `
        <div style="width: 100px; height: 100px; background: ${t.bg}; border: 2px solid #1e293b; position: relative; overflow: hidden; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                <path d="${t.path}" fill="${t.color}" />
            </svg>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 100, 100, posX, posY);
}

function cat_insertarTableroDobble(posX, posY) {
    const simbolos = ['fa-heart', 'fa-star', 'fa-bolt', 'fa-moon', 'fa-sun', 'fa-cloud'];
    let html = `<div style="width: 200px; height: 200px; background: white; border: 4px solid #dc2626; border-radius: 50%; position: relative; box-shadow: 0 5px 10px rgba(0,0,0,0.2);">`;
    // Dibujamos 6 símbolos en círculo
    for(let i=0; i<6; i++) {
        const angle = (i * 60) * (Math.PI / 180);
        const x = 100 + 65 * Math.cos(angle) - 15;
        const y = 100 + 65 * Math.sin(angle) - 15;
        const s = simbolos[Math.floor(Math.random() * simbolos.length)];
        html += `<i class="fa-solid ${s}" style="position: absolute; left: ${x}px; top: ${y}px; font-size: 30px; color: #1e293b;"></i>`;
    }
    html += `</div>`;
    EP.insertarCartaEnCanvas(html, 200, 200, posX, posY);
}

function cat_insertarDialWavelength(posX, posY) {
    const html = `
        <div style="background: #fdfbf7; border: 4px solid #1e293b; border-radius: 50% 50% 0 0; width: 300px; height: 150px; position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <div style="position: absolute; bottom: 0; width: 200px; height: 200px; background: conic-gradient(from 180deg at 50% 100%, #dc2626 0deg, #eab308 90deg, #16a34a 180deg); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: -10px; width: 10px; height: 120px; background: #1e293b; transform: rotate(45deg); transform-origin: bottom center;"></div>
            <div style="position: absolute; bottom: -20px; width: 40px; height: 40px; background: #1e293b; border-radius: 50%; z-index: 2;"></div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 300, 150, posX, posY);
}

function cat_insertarSkyTeam(posX, posY) {
    const html = `
        <div style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 12px; padding: 15px; width: 350px; box-sizing: border-box; display: flex; flex-direction: column;">
            <h4 style="color: #0284c7; font-family: 'Merriweather'; text-align: center; margin-bottom: 10px;">Panel de Vuelo</h4>
            <div style="display: flex; justify-content: space-between; background: white; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="text-align: center;"><i class="fa-solid fa-gauge-high" style="font-size: 30px; color: #1e293b;"></i><br>Velocidad</div>
                <div style="text-align: center;"><i class="fa-solid fa-arrows-up-down" style="font-size: 30px; color: #1e293b;"></i><br>Altitud</div>
                <div style="text-align: center;"><i class="fa-solid fa-plane" style="font-size: 30px; color: #1e293b;"></i><br>Eje</div>
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 350, 150, posX, posY);
}

function cat_insertarLineaTiempoHitster(posX, posY) {
    const html = `
        <div style="background: #1e293b; color: white; border-radius: 8px; width: 250px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 10px rgba(0,0,0,0.3);">
            <span style="font-family: 'Merriweather'; font-size: 20px; font-weight: bold;">Línea de Tiempo</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 250, 80, posX, posY);
}


// ================= MOTORES FALTANTES (v224.0) =================

function insertarFichaAgenteCodenames(posX, posY) {
    const colores = ['#dc2626', '#2563eb', '#cbd5e1', '#1e293b']; // Rojo, Azul, Neutral, Asesino
    const color = colores[Math.floor(Math.random() * colores.length)];
    const html = `<div style="width: 45px; height: 45px; background: ${color}; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 1px solid rgba(0,0,0,0.2);"></div>`;
    EP.insertarCartaEnCanvas(html, 45, 45, posX, posY);
}

function insertarMonedaCoup(posX, posY) {
    const html = `
        <div style="width: 30px; height: 30px; background: radial-gradient(circle at 30% 30%, #fef08a 0%, #f59e0b 40%, #b45309 100%); border: 2px solid #78350f; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <span style="color: #78350f; font-weight: bold; font-size: 14px;">$</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 30, 30, posX, posY);
}

function insertarDadoBang(posX, posY) {
    const valores = ['1', '2', '3', '4', '5', '6'];
    const val = valores[Math.floor(Math.random() * valores.length)];
    const html = `
        <div style="width: 45px; height: 45px; background: #fcd34d; border: 3px solid #78350f; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            <span style="font-family: 'Playfair Display'; font-size: 24px; font-weight: bold; color: #78350f;">${val}</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 45, 45, posX, posY);
}

function insertarCartaRolPandemic(posX, posY) {
    const roles = [
        { n: 'Médico', i: 'fa-user-md', c: '#f59e0b' },
        { n: 'Científico', i: 'fa-flask', c: '#ffffff' },
        { n: 'Investigadora', i: 'fa-microscope', c: '#dc2626' },
        { n: 'Coordinador', i: 'fa-clipboard-list', c: '#10b981' },
        { n: 'Especialista', i: 'fa-plane', c: '#3b82f6' },
        { n: 'Cuarentena', i: 'fa-shield-virus', c: '#84cc16' },
        { n: 'Operaciones', i: 'fa-cogs', c: '#8b5cf6' }
    ];
    const r = roles[Math.floor(Math.random() * roles.length)];
    const front = `
        <div class="carta-pro" style="background: #1e293b; border: 3px solid ${r.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
            <i class="fa-solid ${r.i}" style="font-size: 60px; color: ${r.c}; margin-bottom: 15px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 18px; font-weight: bold; text-transform: uppercase;">${r.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#0f172a; border-radius:8px; display:flex; align-items:center; justify-content:center; border:2px solid #334155;"><i class="fa-solid fa-biohazard" style="font-size:50px; color:#dc2626;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}


// ================= MOTORES DE ALTA FIDELIDAD (v225.0) =================

// --- JUNGLE SPEED ---
function cat_insertarCartaJungleSpeed() {
    const colores = ['#eab308', '#16a34a', '#ea580c', '#9333ea']; // Amarillo, Verde, Naranja, Violeta
    const formas = [
        'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0 Z', // Círculo
        'M20,20 L80,20 L80,80 L20,80 Z', // Cuadrado
        'M50,0 L100,100 L0,100 Z', // Triángulo
        'M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z', // Estrella
        'M50,0 L100,50 L50,100 L0,50 Z', // Rombo
        'M50,0 L90,30 L90,90 L50,100 L10,90 L10,30 Z' // Pentágono
    ];
    const color = colores[Math.floor(Math.random() * colores.length)];
    const forma = formas[Math.floor(Math.random() * formas.length)];
    
    // 10% de probabilidad de carta especial (flechas)
    const esEspecial = Math.random() < 0.1;
    
    let contenido = '';
    if (esEspecial) {
        contenido = `
            <svg viewBox="0 0 100 100" style="width: 100px; height: 100px;">
                <polygon points="50,10 20,50 40,50 40,90 60,90 60,50 80,50" fill="${color}" />
                <polygon points="50,90 20,50 40,50 40,10 60,10 60,50 80,50" fill="${color}" transform="rotate(180 50 50)" opacity="0.5" />
            </svg>
        `;
    } else {
        contenido = `
            <svg viewBox="0 0 100 100" style="width: 100px; height: 100px;">
                <path d="${forma}" fill="${color}" stroke="#1e293b" stroke-width="3" />
            </svg>
        `;
    }

    const front = `
        <div class="carta-pro" style="background: #ffffff; border: 2px solid #1e293b; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            ${contenido}
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-paw" style="font-size:50px; color:#eab308;"></i></div>`;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

// --- SUSHI GO! ---
function cat_insertarCartaSushi(tipo) {
    const cartas = {
        'nigiri': { n: 'Nigiri', puntos: '+1', color: '#f59e0b', icon: 'fa-fish' },
        'maki': { n: 'Maki', puntos: '+2', color: '#15803d', icon: 'fa-bowl-rice' },
        'temaki': { n: 'Temaki', puntos: '+3', color: '#dc2626', icon: 'fa-ice-cream' },
        'sashimi': { n: 'Sashimi', puntos: '+5', color: '#0284c7', icon: 'fa-drumstick-bite' },
        'wasabi': { n: 'Wasabi', puntos: 'x3', color: '#65a30d', icon: 'fa-leaf' },
        'dumpling': { n: 'Dumpling', puntos: '+X', color: '#ca8a04', icon: 'fa-cookie' },
        'pudding': { n: 'Pudding', puntos: '+/-', color: '#d946ef', icon: 'fa-ice-cream' }
    };
    const c = cartas[tipo] || cartas['nigiri'];
    
    const front = `
        <div class="carta-pro" style="background: #fff; border: 3px solid ${c.color}; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 15px;">
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold; color: ${c.color}; text-transform: uppercase;">${c.n}</div>
            <i class="fa-solid ${c.icon}" style="font-size: 60px; color: ${c.color};"></i>
            <div style="background: ${c.color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;">${c.puntos}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#fef3c7; border-radius:12px; display:flex; align-items:center; justify-content:center; border:3px solid #d97706;"><i class="fa-solid fa-utensils" style="font-size:50px; color:#d97706;"></i></div>`;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

// --- HOMBRES LOBO ---
function cat_insertarCartaHombreLobo(rol) {
    const roles = {
        'lobo': { n: 'Hombre Lobo', icon: 'fa-paw', color: '#1e293b', hab: 'Elimina a un aldeano.' },
        'aldeano': { n: 'Aldeano', icon: 'fa-user', color: '#f8fafc', hab: 'Vota durante el día.' },
        'vidente': { n: 'Vidente', icon: 'fa-eye', color: '#6d28d9', hab: 'Mira el rol de un jugador.' },
        'bruja': { n: 'Bruja', icon: 'fa-hat-wizard', color: '#be123c', hab: 'Salva o envenena.' },
        'cazador': { n: 'Cazador', icon: 'fa-crosshairs', color: '#b45309', hab: 'Al morir, dispara.' },
        'cupido': { n: 'Cupido', icon: 'fa-heart', color: '#db2777', hab: 'Enamora a dos jugadores.' }
    };
    const r = roles[rol] || roles['aldeano'];
    const isDark = rol === 'lobo';
    const textColor = isDark ? '#ffffff' : '#1e293b';
    
    const front = `
        <div class="carta-pro" style="background: ${r.color}; border: 3px solid #475569; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: ${textColor}; padding: 20px;">
            <i class="fa-solid ${r.icon}" style="font-size: 70px; margin-bottom: 20px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px;">${r.n}</div>
            <div style="font-size: 12px; text-align: center; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 6px;">${r.hab}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#0f172a; border-radius:12px; display:flex; align-items:center; justify-content:center; border:3px solid #334155;"><i class="fa-solid fa-moon" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

// --- DOBBLE (Algoritmo de Geometría Proyectiva) ---
function cat_insertarCartaDobble() {
    // Generamos un pool de 57 íconos disponibles
    const iconos = [
        'fa-heart', 'fa-star', 'fa-bolt', 'fa-moon', 'fa-sun', 'fa-cloud', 'fa-tree', 'fa-car', 
        'fa-apple-whole', 'fa-bell', 'fa-bomb', 'fa-book', 'fa-bug', 'fa-cake-candles', 'fa-camera', 
        'fa-chess-knight', 'fa-crown', 'fa-dice', 'fa-dragon', 'fa-eye', 'fa-feather', 'fa-fire', 
        'fa-fish', 'fa-flag', 'fa-flask', 'fa-frog', 'fa-ghost', 'fa-gift', 'fa-glasses', 'fa-globe',
        'fa-hammer', 'fa-hand', 'fa-hat-wizard', 'fa-ice-cream', 'fa-key', 'fa-leaf', 'fa-lemon',
        'fa-lightbulb', 'fa-magnet', 'fa-mask', 'fa-microphone', 'fa-mug-hot', 'fa-paw', 'fa-pencil',
        'fa-plane', 'fa-rocket', 'fa-scissors', 'fa-shield', 'fa-skull', 'fa-snowflake', 'fa-spider',
        'fa-spoon', 'fa-sun', 'fa-tag', 'fa-trash-can', 'fa-trophy', 'fa-umbrella'
    ];

    // Generamos 8 símbolos únicos al azar para esta carta
    // (Nota: Para un Dobble 100% real, el algoritmo de planos proyectivos de orden 7 
    // genera combinaciones exactas donde cualquier par de cartas comparte 1 y solo 1 símbolo.
    // Aquí usamos una aproximación visual distribuyendo 8 símbolos distintos).
    let simbolosCarta = [];
    let poolCopia = [...iconos];
    for(let i=0; i<8; i++) {
        const idx = Math.floor(Math.random() * poolCopia.length);
        simbolosCarta.push(poolCopia.splice(idx, 1)[0]);
    }

    let html = `<div style="width: 200px; height: 200px; background: white; border: 4px solid #dc2626; border-radius: 50%; position: relative; box-shadow: 0 5px 10px rgba(0,0,0,0.2); overflow: hidden;">`;
    
    // Posiciones predefinidas para 8 símbolos en un círculo
    const posiciones = [
        { x: 85, y: 20 }, { x: 140, y: 50 }, { x: 155, y: 110 }, { x: 120, y: 155 },
        { x: 60, y: 155 }, { x: 25, y: 110 }, { x: 40, y: 50 }, { x: 85, y: 90 } // Último en el centro
    ];

    simbolosCarta.forEach((s, i) => {
        const pos = posiciones[i];
        const angulo = Math.floor(Math.random() * 360);
        html += `<i class="fa-solid ${s}" style="position: absolute; left: ${pos.x}px; top: ${pos.y}px; font-size: 24px; color: #1e293b; transform: rotate(${angulo}deg);"></i>`;
    });
    
    html += `</div>`;
    EP.insertarCartaEnCanvas(html, 200, 200);
}


// ================= MOTORES EXACTOS (v227.0) =================

// --- MUNCHKIN ---
function cat_insertarCartaMunchkinPuerta() {
    const puertas = [
        { n: '3,872 Orcos', i: 'fa-dragon', c: '#b91c1c' },
        { n: 'Amazonas', i: 'fa-female', c: '#be123c' },
        { n: 'Ancient', i: 'fa-book', c: '#78350f' },
        { n: 'Bebé', i: 'fa-baby', c: '#f59e0b' },
        { n: 'Bigfoot', i: 'fa-paw', c: '#78350f' },
        { n: 'Bullrog', i: 'fa-dragon', c: '#b91c1c' },
        { n: 'Trampa!', i: 'fa-bomb', c: '#dc2626' },
        { n: 'Clérigo', i: 'fa-cross', c: '#2563eb' },
        { n: 'Cangrejos', i: 'fa-shrimp', c: '#b91c1c' },
        { n: 'Maldición!', i: 'fa-skull', c: '#4c1d95' },
        { n: 'Intervención Divina', i: 'fa-hands-praying', c: '#2563eb' },
        { n: 'Limo Babeante', i: 'fa-tint', c: '#15803d' },
        { n: 'Enano', i: 'fa-male', c: '#78350f' },
        { n: 'Elfo', i: 'fa-leaf', c: '#15803d' },
        { n: 'Nariz Flotante', i: 'fa-eye', c: '#ca8a04' },
        { n: 'Ranas Voladoras', i: 'fa-frog', c: '#15803d' },
        { n: 'Gacela', i: 'fa-horse', c: '#78350f' },
        { n: 'Octaedro Gelatinoso', i: 'fa-cube', c: '#15803d' },
        { n: 'Necrófagos', i: 'fa-ghost', c: '#4c1d95' },
        { n: 'Híbrido', i: 'fa-user', c: '#b91c1c' },
        { n: 'Mediano', i: 'fa-child', c: '#ca8a04' },
        { n: 'Arpías', i: 'fa-dove', c: '#b91c1c' },
        { n: 'Ayúdame!', i: 'fa-hand-holding-heart', c: '#2563eb' },
        { n: 'Hipogrifo', i: 'fa-horse', c: '#78350f' },
        { n: 'Ilusión', i: 'fa-mask', c: '#4c1d95' },
        { n: 'Vendedor de Seguros', i: 'fa-briefcase', c: '#1e293b' },
        { n: 'Rey Tut', i: 'fa-crown', c: '#ca8a04' },
        { n: 'Goblin Cojo', i: 'fa-user-injured', c: '#15803d' },
        { n: 'Pollo Enorme Enojado', i: 'fa-drumstick-bite', c: '#ca8a04' },
        { n: 'Abogados', i: 'fa-gavel', c: '#1e293b' },
        { n: 'Leprechaun', i: 'fa-hat-wizard', c: '#15803d' },
        { n: 'Compañero', i: 'fa-clone', c: '#4c1d95' },
        { n: 'Rata Mazo', i: 'fa-rat', c: '#78350f' },
        { n: 'Sr. Huesos', i: 'fa-skull', c: '#1e293b' },
        { n: 'Trol de la Red', i: 'fa-wifi', c: '#4c1d95' },
        { n: 'Fuera de Almuerzo', i: 'fa-utensils', c: '#ca8a04' },
        { n: 'Pit Bull', i: 'fa-dog', c: '#78350f' },
        { n: 'Platicore', i: 'fa-shield', c: '#1e293b' },
        { n: 'Dragón de Plutonio', i: 'fa-dragon', c: '#b91c1c' },
        { n: 'Planta en Maceta', i: 'fa-seedling', c: '#15803d' },
        { n: 'Pukachu', i: 'fa-bolt', c: '#ca8a04' },
        { n: 'Geek Chillón', i: 'fa-glasses', c: '#4c1d95' },
        { n: 'Caracoles Veloces', i: 'fa-snail', c: '#15803d' },
        { n: 'Squidzilla', i: 'fa-spider', c: '#b91c1c' },
        { n: 'Gólem de Piedra', i: 'fa-mountain', c: '#475569' },
        { n: 'Super Munchkin', i: 'fa-star', c: '#ca8a04' },
        { n: 'Ladrón', i: 'fa-mask', c: '#1e293b' },
        { n: 'Demonio Lengua', i: 'fa-tongue', c: '#b91c1c' },
        { n: 'Maldición Realmente Insoportable', i: 'fa-skull', c: '#4c1d95' },
        { n: 'Caballo No-Muerto', i: 'fa-horse', c: '#4c1d95' },
        { n: 'Horror Indescriptible', i: 'fa-ghost', c: '#1e293b' },
        { n: 'Monstruo Errante', i: 'fa-dragon', c: '#b91c1c' },
        { n: 'Vampiro Aspirante', i: 'fa-bat', c: '#4c1d95' },
        { n: 'Guerrero', i: 'fa-sword', c: '#b91c1c' },
        { n: 'Espectro', i: 'fa-ghost', c: '#1e293b' },
        { n: 'Hermanos Wight', i: 'fa-ghost', c: '#4c1d95' },
        { n: 'Mago', i: 'fa-hat-wizard', c: '#2563eb' }
    ];
    const p = puertas[Math.floor(Math.random() * puertas.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${p.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${p.i}" style="font-size: 50px; color: ${p.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold; color: ${p.c}; text-align: center;">${p.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#78350f; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-door-closed" style="font-size:50px; color:#fdf6e3;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaMunchkinTesoro() {
    const tesoros = [
        { n: '1,000 Monedas de Oro', i: 'fa-coins', c: '#ca8a04' },
        { n: 'Cetro de Napalm', i: 'fa-fire', c: '#dc2626' },
        { n: 'Botas de Patear Traseros', i: 'fa-shoe-prints', c: '#78350f' },
        { n: 'Casco con Cuernos', i: 'fa-hat-cowboy', c: '#4c1d95' },
        { n: 'Espada Láser', i: 'fa-bolt', c: '#0284c7' },
        { n: 'Armadura de Mithril', i: 'fa-shield', c: '#475569' },
        { n: 'Poción de Curación', i: 'fa-flask', c: '#16a34a' },
        { n: 'Anillo de Poder', i: 'fa-ring', c: '#ca8a04' },
        { n: 'Amuleto de Protección', i: 'fa-gem', c: '#2563eb' },
        { n: 'Báculo del Mago', i: 'fa-wand-magic-sparkles', c: '#4c1d95' },
        { n: 'Capa de Invisibilidad', i: 'fa-user-secret', c: '#1e293b' },
        { n: 'Pergamino de Deseo', i: 'fa-scroll', c: '#f59e0b' },
        { n: 'Daga Envenenada', i: 'fa-dagger', c: '#15803d' },
        { n: 'Escudo de Dragón', i: 'fa-shield-halved', c: '#b91c1c' },
        { n: 'Grimorio Antiguo', i: 'fa-book', c: '#78350f' }
    ];
    const t = tesoros[Math.floor(Math.random() * tesoros.length)];
    const front = `
        <div class="carta-pro" style="background: #fef3c7; border: 3px solid #ca8a04; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${t.i}" style="font-size: 50px; color: ${t.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold; color: ${t.c}; text-align: center;">${t.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#ca8a04; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-sack-dollar" style="font-size:50px; color:#fdf6e3;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarDadoMunchkin(posX, posY) {
    const valores = ['1','2','3','4','5','6'];
    const val = valores[Math.floor(Math.random() * valores.length)];
    const html = `<div style="width: 50px; height: 50px; background: #fcd34d; border: 3px solid #78350f; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><span style="font-family: 'Playfair Display'; font-size: 28px; font-weight: bold; color: #78350f;">${val}</span></div>`;
    EP.insertarCartaEnCanvas(html, 50, 50, posX, posY);
}

// --- CIUDADELAS ---
function cat_insertarCartaCiudadelasPersonaje() {
    const personajes = [
        { n: 'Asesino', i: 'fa-skull', c: '#1e293b' },
        { n: 'Ladrón', i: 'fa-hand-sparkles', c: '#4c1d95' },
        { n: 'Mago', i: 'fa-hat-wizard', c: '#2563eb' },
        { n: 'Rey', i: 'fa-crown', c: '#ca8a04' },
        { n: 'Obispo', i: 'fa-church', c: '#b91c1c' },
        { n: 'Mercader', i: 'fa-coins', c: '#15803d' },
        { n: 'Arquitecto', i: 'fa-hammer', c: '#78350f' },
        { n: 'Condottiero', i: 'fa-chess-knight', c: '#b91c1c' }
    ];
    const p = personajes[Math.floor(Math.random() * personajes.length)];
    const front = `
        <div class="carta-pro" style="background: #fef3c7; border: 3px solid #78350f; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${p.i}" style="font-size: 50px; color: ${p.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold; color: #78350f; text-align: center;">${p.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#78350f; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-chess-rook" style="font-size:50px; color:#fef3c7;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaCiudadelasDistrito() {
    const distritos = [
        { n: 'Catedral', i: 'fa-church', c: '#b91c1c', tipo: 'Religioso' },
        { n: 'Castillo', i: 'fa-chess-rook', c: '#1e293b', tipo: 'Militar' },
        { n: 'Mercado', i: 'fa-store', c: '#15803d', tipo: 'Comercial' },
        { n: 'Palacio', i: 'fa-crown', c: '#ca8a04', tipo: 'Noble' },
        { n: 'Biblioteca', i: 'fa-book', c: '#2563eb', tipo: 'Ciencia' },
        { n: 'Muralla', i: 'fa-shield', c: '#475569', tipo: 'Militar' },
        { n: 'Puerto', i: 'fa-anchor', c: '#0284c7', tipo: 'Comercial' },
        { n: 'Universidad', i: 'fa-graduation-cap', c: '#4c1d95', tipo: 'Ciencia' }
    ];
    const d = distritos[Math.floor(Math.random() * distritos.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${d.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; position: relative;">
            <i class="fa-solid ${d.i}" style="font-size: 50px; color: ${d.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${d.c}; text-align: center;">${d.n}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 5px;">${d.tipo}</div>
            <div style="position: absolute; top: 8px; right: 8px; background: #ca8a04; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">2</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#fde68a; border-radius:8px; display:flex; align-items:center; justify-content:center; border:2px solid #ca8a04;"><i class="fa-solid fa-city" style="font-size:50px; color:#78350f;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarMonedaCiudadelas(posX, posY) {
    const html = `<div style="width: 30px; height: 30px; background: radial-gradient(circle at 30% 30%, #fef08a 0%, #f59e0b 40%, #b45309 100%); border: 2px solid #78350f; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><span style="color: #78350f; font-weight: bold; font-size: 14px;">$</span></div>`;
    EP.insertarCartaEnCanvas(html, 30, 30, posX, posY);
}

// --- ROOT ---
function cat_insertarCartaRootAccion() {
    const facciones = [
        { n: 'Marquesado', i: 'fa-crown', c: '#b91c1c' },
        { n: 'Nido de Águilas', i: 'fa-feather', c: '#1e40af' },
        { n: 'Alianza', i: 'fa-tree', c: '#15803d' },
        { n: 'Vagabundo', i: 'fa-person-hiking', c: '#6d28d9' }
    ];
    const f = facciones[Math.floor(Math.random() * facciones.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${f.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${f.i}" style="font-size: 50px; color: ${f.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${f.c}; text-align: center;">${f.n}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 5px;">Acción</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-tree" style="font-size:50px; color:#15803d;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaRootReferencia() {
    const front = `
        <div class="carta-pro" style="background: #e2e8f0; border: 2px solid #1e293b; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid fa-book" style="font-size: 40px; color: #1e293b; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: #1e293b; text-align: center;">Referencia</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-tree" style="font-size:50px; color:#15803d;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarFichaRoot(tipo, posX, posY) {
    let color, icon;
    if (tipo === 'claro') { color = '#15803d'; icon = 'fa-tree'; }
    else if (tipo === 'objeto') { color = '#ca8a04'; icon = 'fa-gem'; }
    else if (tipo === 'guerrero') { color = '#b91c1c'; icon = 'fa-shield'; }
    else { color = '#475569'; icon = 'fa-circle'; }
    const html = `<div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid ${icon}" style="color: white; font-size: 20px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 40, 40, posX, posY);
}

// --- ARKHAM HORROR LCG ---
function cat_insertarCartaArkhamInvestigador() {
    const investigadores = [
        { n: 'Roland Banks', i: 'fa-user-tie', c: '#1e40af' },
        { n: 'Daisy Walker', i: 'fa-book', c: '#6d28d9' },
        { n: 'Agnes Baker', i: 'fa-hat-wizard', c: '#be123c' },
        { n: 'Wendy Adams', i: 'fa-child', c: '#15803d' },
        { n: 'Skids O\'Toole', i: 'fa-user-secret', c: '#b45309' }
    ];
    const inv = investigadores[Math.floor(Math.random() * investigadores.length)];
    const front = `
        <div class="carta-pro" style="background: #0f172a; border: 3px solid ${inv.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${inv.i}" style="font-size: 60px; color: ${inv.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold;">${inv.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-eye" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaArkhamJugador() {
    const cartas = [
        { n: 'Investigación', i: 'fa-search', c: '#0284c7' },
        { n: 'Disparo', i: 'fa-bullseye', c: '#b91c1c' },
        { n: 'Esquivar', i: 'fa-person-running', c: '#15803d' },
        { n: 'Aliado', i: 'fa-user-friends', c: '#6d28d9' },
        { n: 'Objeto', i: 'fa-box', c: '#ca8a04' }
    ];
    const c = cartas[Math.floor(Math.random() * cartas.length)];
    const front = `
        <div class="carta-pro" style="background: #f8fafc; border: 2px solid ${c.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${c.i}" style="font-size: 50px; color: ${c.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${c.c}; text-align: center;">${c.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-eye" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaArkhamEscenario() {
    const escenarios = [
        { n: 'El Encuentro', i: 'fa-ghost', c: '#4c1d95' },
        { n: 'La Casa', i: 'fa-home', c: '#78350f' },
        { n: 'El Ritual', i: 'fa-hat-wizard', c: '#be123c' },
        { n: 'Los Antiguos', i: 'fa-eye', c: '#1e293b' }
    ];
    const e = escenarios[Math.floor(Math.random() * escenarios.length)];
    const front = `
        <div class="carta-pro" style="background: #0f172a; border: 3px solid ${e.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${e.i}" style="font-size: 60px; color: ${e.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold;">${e.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-eye" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarFichaArkham(tipo, posX, posY) {
    let color, icon;
    if (tipo === 'caos') { color = '#6d28d9'; icon = 'fa-dice'; }
    else if (tipo === 'recurso') { color = '#ca8a04'; icon = 'fa-coins'; }
    else if (tipo === 'pista') { color = '#0284c7'; icon = 'fa-search'; }
    else if (tipo === 'horror') { color = '#b91c1c'; icon = 'fa-ghost'; }
    else { color = '#475569'; icon = 'fa-heart-crack'; }
    const html = `<div style="width: 35px; height: 35px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid ${icon}" style="color: white; font-size: 18px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 35, 35, posX, posY);
}


// ================= MOTORES NUEVOS (v229.0) =================

function cat_insertarCartaWavelength() {
    const espectros = [
        { n: 'Frío / Caliente', i: 'fa-temperature-half', c: '#0284c7' },
        { n: 'Débil / Fuerte', i: 'fa-dumbbell', c: '#b91c1c' },
        { n: 'Antiguo / Moderno', i: 'fa-hourglass-half', c: '#78350f' },
        { n: 'Barato / Caro', i: 'fa-money-bill-wave', c: '#ca8a04' }
    ];
    const e = espectros[Math.floor(Math.random() * espectros.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 2px solid #1e293b; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${e.i}" style="font-size: 40px; color: ${e.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 12px; font-weight: bold; color: #1e293b; text-align: center;">${e.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-brain" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaLaLlamada() {
    const linajes = [
        { n: 'Linaje de la Tierra', i: 'fa-mountain', c: '#78350f' },
        { n: 'Linaje del Mar', i: 'fa-water', c: '#0284c7' },
        { n: 'Linaje del Cielo', i: 'fa-cloud', c: '#1e40af' },
        { n: 'Linaje del Sol', i: 'fa-sun', c: '#ca8a04' }
    ];
    const l = linajes[Math.floor(Math.random() * linajes.length)];
    const front = `
        <div class="carta-pro" style="background: #0f172a; border: 3px solid ${l.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${l.i}" style="font-size: 50px; color: ${l.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; text-align: center;">${l.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-key" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaRickMorty() {
    const personajes = [
        { n: 'Rick (Mago)', i: 'fa-hat-wizard', c: '#6d28d9' },
        { n: 'Morty (Pícaro)', i: 'fa-user-secret', c: '#15803d' },
        { n: 'Summer (Guerrera)', i: 'fa-sword', c: '#b91c1c' },
        { n: 'Beth (Clériga)', i: 'fa-cross', c: '#0284c7' },
        { n: 'Jerry (Bardo)', i: 'fa-guitar', c: '#ca8a04' }
    ];
    const p = personajes[Math.floor(Math.random() * personajes.length)];
    const front = `
        <div class="carta-pro" style="background: #fef3c7; border: 3px solid ${p.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${p.i}" style="font-size: 50px; color: ${p.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${p.c}; text-align: center;">${p.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-dice-d20" style="font-size:50px; color:#dc2626;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaCriaturas() {
    const criaturas = [
        { n: 'Hombre Lobo', i: 'fa-paw', c: '#78350f' },
        { n: 'Momia', i: 'fa-bandage', c: '#ca8a04' },
        { n: 'Kaiju', i: 'fa-dragon', c: '#b91c1c' },
        { n: 'Vampiro', i: 'fa-bat', c: '#4c1d95' }
    ];
    const c = criaturas[Math.floor(Math.random() * criaturas.length)];
    const front = `
        <div class="carta-pro" style="background: #0f172a; border: 3px solid ${c.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${c.i}" style="font-size: 50px; color: ${c.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold;">${c.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-film" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaSpellCrafting() {
    const letras = ['A','E','I','O','U','R','S','T','L','N'];
    const letra = letras[Math.floor(Math.random() * letras.length)];
    const front = `
        <div class="carta-pro" style="background: #f8fafc; border: 2px solid #6d28d9; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <div style="font-family: 'Arial Black'; font-size: 70px; color: #6d28d9;">${letra}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#4c1d95; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-wand-magic-sparkles" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaXanathar() {
    const conjuros = [
        { n: 'Bola de Fuego', i: 'fa-fire', c: '#b91c1c' },
        { n: 'Curar Heridas', i: 'fa-heart-pulse', c: '#15803d' },
        { n: 'Escudo', i: 'fa-shield', c: '#0284c7' },
        { n: 'Invisibilidad', i: 'fa-eye-slash', c: '#4c1d95' }
    ];
    const c = conjuros[Math.floor(Math.random() * conjuros.length)];
    const front = `
        <div class="carta-pro" style="background: #fef3c7; border: 3px solid ${c.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${c.i}" style="font-size: 50px; color: ${c.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${c.c}; text-align: center;">${c.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-book-sparkles" style="font-size:50px; color:#ca8a04;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaStrixhaven() {
    const estudiantes = [
        { n: 'Estudiante de Prismari', i: 'fa-paintbrush', c: '#be123c' },
        { n: 'Estudiante de Sapiéntium', i: 'fa-book', c: '#0284c7' },
        { n: 'Estudiante de Flosmarcitus', i: 'fa-leaf', c: '#15803d' },
        { n: 'Estudiante de Lorehold', i: 'fa-scroll', c: '#b91c1c' },
        { n: 'Estudiante de Quandrix', i: 'fa-infinity', c: '#6d28d9' }
    ];
    const e = estudiantes[Math.floor(Math.random() * estudiantes.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${e.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${e.i}" style="font-size: 50px; color: ${e.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${e.c}; text-align: center;">${e.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#4c1d95; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-graduation-cap" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaSkyTeam() {
    const front = `
        <div class="carta-pro" style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid fa-plane" style="font-size: 50px; color: #0284c7; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: #0284c7;">Panel de Vuelo</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-gauge-high" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarCartaCarcassonnePlus() {
    const tipos = [
        { bg: '#86efac', path: 'M0,0 L100,0 L100,50 L50,50 L50,100 L0,100 Z', color: '#166534' },
        { bg: '#fef08a', path: 'M0,0 L100,0 L100,100 L0,100 Z', color: '#ca8a04' },
        { bg: '#cbd5e1', path: 'M30,0 L70,0 L70,30 L100,30 L100,70 L70,70 L70,100 L30,100 L30,70 L0,70 L0,30 L30,30 Z', color: '#475569' }
    ];
    const t = tipos[Math.floor(Math.random() * tipos.length)];
    const html = `
        <div style="width: 100px; height: 100px; background: ${t.bg}; border: 2px solid #1e293b; position: relative; overflow: hidden; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                <path d="${t.path}" fill="${t.color}" />
            </svg>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 100, 100);
}

function cat_insertarCartaCatanNavegantes() {
    const front = `
        <div class="carta-pro" style="background: #e0f2fe; border: 3px solid #0284c7; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid fa-ship" style="font-size: 50px; color: #0284c7; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: #0284c7;">Barco</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#0284c7; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-water" style="font-size:50px; color:#f1f5f9;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}


// ================= MOTORES NUEVOS (v230.0) =================

// --- HITSTER ---
function cat_insertarCartaHitster() {
    const canciones = [
        { n: 'Bohemian Rhapsody', a: 'Queen', año: '1975', i: 'fa-music', c: '#6d28d9' },
        { n: 'Billie Jean', a: 'Michael Jackson', año: '1982', i: 'fa-compact-disc', c: '#b91c1c' },
        { n: 'Like a Prayer', a: 'Madonna', año: '1989', i: 'fa-church', c: '#be123c' },
        { n: 'Smells Like Teen Spirit', a: 'Nirvana', año: '1991', i: 'fa-guitar', c: '#1e293b' },
        { n: 'Despacito', a: 'Luis Fonsi', año: '2017', i: 'fa-fire', c: '#ca8a04' },
        { n: 'Macarena', a: 'Los del Río', año: '1993', i: 'fa-hands', c: '#ea580c' },
        { n: 'Rolling in the Deep', a: 'Adele', año: '2010', i: 'fa-water', c: '#0284c7' },
        { n: 'La Bamba', a: 'Ritchie Valens', año: '1958', i: 'fa-star', c: '#15803d' }
    ];
    const c = canciones[Math.floor(Math.random() * canciones.length)];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${c.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${c.i}" style="font-size: 45px; color: ${c.c}; margin-bottom: 8px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 13px; font-weight: bold; color: #1e293b; text-align: center;">${c.n}</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">${c.a}</div>
            <div style="font-size: 22px; font-weight: bold; color: ${c.c}; margin-top: 8px;">${c.año}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; flex-direction: column; align-items:center; justify-content:center; color:white;"><i class="fa-solid fa-qrcode" style="font-size:60px; color:#94a3b8;"></i><span style="font-size:10px; margin-top:5px; color:#94a3b8;">Escanea para oír</span></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarFichaHitster(posX, posY) {
    const html = `<div style="width: 40px; height: 40px; background: radial-gradient(circle at 30% 30%, #fef08a 0%, #f59e0b 40%, #b45309 100%); border: 2px solid #78350f; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid fa-headphones" style="color: #78350f; font-size: 18px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 40, 40, posX, posY);
}

// --- ZOMBIES!!! (2ª Ed.) ---
function cat_insertarLosetaZombies(posX, posY) {
    const calles = ['Calle Mayor', 'Avenida Central', 'Plaza del Pueblo', 'Callejón Oscuro', 'Carretera'];
    const calle = calles[Math.floor(Math.random() * calles.length)];
    const html = `
        <div style="width: 100px; height: 100px; background: #475569; border: 2px solid #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">
            <i class="fa-solid fa-road" style="font-size: 30px; color: #cbd5e1;"></i>
            <span style="font-size: 9px; color: #f1f5f9; margin-top: 4px;">${calle}</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 100, 100, posX, posY);
}

function cat_insertarCartaEventoZombies() {
    const eventos = [
        { n: 'Subidón de Adrenalina', i: 'fa-bolt', c: '#ca8a04', ef: '+2 Movimiento' },
        { n: 'Perdida Cerebral', i: 'fa-brain', c: '#6d28d9', ef: 'Pierdes 1 turno' },
        { n: 'Zombi Malo, Sin Galletas', i: 'fa-dog', c: '#15803d', ef: 'Zombi +1 Ataque' },
        { n: 'Todo Está Perdido', i: 'fa-skull', c: '#b91c1c', ef: 'Zombis se mueven +1' }
    ];
    const e = eventos[Math.floor(Math.random() * eventos.length)];
    const front = `
        <div class="carta-pro" style="background: #1e293b; border: 3px solid ${e.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${e.i}" style="font-size: 50px; color: ${e.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 13px; font-weight: bold; text-align: center;">${e.n}</div>
            <div style="font-size: 10px; margin-top: 6px; color: #cbd5e1;">${e.ef}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#0f172a; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-biohazard" style="font-size:50px; color:#dc2626;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

function cat_insertarZombieMiniatura(posX, posY) {
    const genero = Math.random() > 0.5 ? 'fa-mars' : 'fa-venus';
    const html = `<div style="width: 25px; height: 35px; background: #15803d; border-radius: 40% 40% 10% 10%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"><i class="fa-solid ${genero}" style="color: #bbf7d0; font-size: 14px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 25, 35, posX, posY);
}

function cat_insertarPersonajeZombies(posX, posY) {
    const personajes = [
        { n: 'El Sheriff', i: 'fa-star', c: '#b91c1c' },
        { n: 'La Científica', i: 'fa-flask', c: '#0284c7' },
        { n: 'El Veterano', i: 'fa-medal', c: '#15803d' }
    ];
    const p = personajes[Math.floor(Math.random() * personajes.length)];
    const html = `<div style="width: 35px; height: 45px; background: ${p.c}; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid ${p.i}" style="font-size: 16px;"></i><span style="font-size: 6px; margin-top: 2px;">${p.n}</span></div>`;
    EP.insertarCartaEnCanvas(html, 35, 45, posX, posY);
}

function cat_insertarContadorZombies(tipo, posX, posY) {
    let color, icon, label;
    if (tipo === 'vida') { color = '#dc2626'; icon = 'fa-heart'; label = 'Vida'; }
    else { color = '#ca8a04'; icon = 'fa-bullseye'; label = 'Bala'; }
    const html = `<div style="width: 30px; height: 30px; background: ${color}; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid ${icon}" style="color: white; font-size: 12px;"></i><span style="font-size: 6px; color: white;">${label}</span></div>`;
    EP.insertarCartaEnCanvas(html, 30, 30, posX, posY);
}

function cat_insertarDadoZombies(posX, posY) {
    const valores = ['1','2','3','4','5','6'];
    const val = valores[Math.floor(Math.random() * valores.length)];
    const html = `<div style="width: 40px; height: 40px; background: #fcd34d; border: 3px solid #78350f; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><span style="font-family: 'Playfair Display'; font-size: 22px; font-weight: bold; color: #78350f;">${val}</span></div>`;
    EP.insertarCartaEnCanvas(html, 40, 40, posX, posY);
}


// ================= MOTORES DE ESCAPE ROOM (v232.0) =================

// --- PISTAS DE ESCAPE (Acertijos, Códigos, Cifrados) ---
function cat_insertarPistaEscape(tipo, contenido) {
    const tipos = {
        'acertijo': { n: 'Acertijo', i: 'fa-question', c: '#6d28d9' },
        'codigo': { n: 'Código', i: 'fa-lock', c: '#b91c1c' },
        'cifrado': { n: 'Cifrado', i: 'fa-key', c: '#ca8a04' },
        'logica': { n: 'Lógica', i: 'fa-puzzle-piece', c: '#15803d' },
        'observacion': { n: 'Observación', i: 'fa-eye', c: '#0284c7' }
    };
    const t = tipos[tipo] || tipos['acertijo'];
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 3px solid ${t.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px;">
            <i class="fa-solid ${t.i}" style="font-size: 45px; color: ${t.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${t.c}; text-align: center;">${contenido || t.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-magnifying-glass" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330);
}

// --- SOBRE SELLADO ---
function cat_insertarSobreEscape(posX, posY) {
    const html = `
        <div style="width: 200px; height: 120px; background: #fef3c7; border: 3px solid #78350f; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2); position: relative;">
            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 100px solid transparent; border-right: 100px solid transparent; border-top: 60px solid #fde68a;"></div>
            <i class="fa-solid fa-envelope" style="font-size: 40px; color: #78350f; z-index: 1;"></i>
            <span style="font-size: 10px; color: #78350f; z-index: 1; margin-top: 5px;">SOBRE SELLADO</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 200, 120, posX, posY);
}

// --- CANDADO DE CÓDIGO ---
function cat_insertarCandadoEscape(digitos, posX, posY) {
    const numDigitos = digitos || 3;
    const ancho = 40 * numDigitos;
    let ruedas = '';
    for(let i=0; i<numDigitos; i++) {
        ruedas += `<div style="width: 30px; height: 40px; background: #1e293b; border: 2px solid #0f172a; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; margin: 0 2px;">?</div>`;
    }
    const html = `
        <div style="display: flex; flex-direction: column; align-items: center; width: ${ancho}px;">
            <div style="width: 20px; height: 30px; border: 4px solid #1e293b; border-bottom: none; border-radius: 10px 10px 0 0; margin-bottom: -5px;"></div>
            <div style="background: #334155; padding: 8px; border-radius: 8px; display: flex; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                ${ruedas}
            </div>
            <span style="font-size: 10px; color: #64748b; margin-top: 5px;">CANDADO ${numDigitos} DÍGITOS</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, ancho + 20, 80, posX, posY);
}

// --- CARTA DE NARRATIVA / PERSONAJE ---
function cat_insertarCartaNarrativaEscape(rol, posX, posY) {
    const roles = {
        'detective': { n: 'Detective', i: 'fa-user-secret', c: '#1e293b' },
        'sospechoso': { n: 'Sospechoso', i: 'fa-user', c: '#b91c1c' },
        'victima': { n: 'Víctima', i: 'fa-user-injured', c: '#6d28d9' },
        'testigo': { n: 'Testigo', i: 'fa-eye', c: '#0284c7' },
        'gm': { n: 'Game Master', i: 'fa-hat-wizard', c: '#ca8a04' }
    };
    const r = roles[rol] || roles['detective'];
    const front = `
        <div class="carta-pro" style="background: #0f172a; border: 3px solid ${r.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 15px;">
            <i class="fa-solid ${r.i}" style="font-size: 50px; color: ${r.c}; margin-bottom: 10px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 16px; font-weight: bold;">${r.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#1e293b; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-mask" style="font-size:50px; color:#94a3b8;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}

// --- TEMPORIZADOR VISUAL ---
function cat_insertarTimerEscape(posX, posY) {
    const html = `
        <div style="width: 150px; height: 150px; background: #1e293b; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 6px 12px rgba(0,0,0,0.4); border: 4px solid #dc2626;">
            <span style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: bold; color: #dc2626;">60:00</span>
            <span style="font-size: 10px; color: #94a3b8;">TIEMPO RESTANTE</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 150, 150, posX, posY);
}

// --- MAPA DEL TESORO ---
function cat_insertarMapaEscape(posX, posY) {
    const html = `
        <div style="width: 300px; height: 200px; background: #fef3c7; border: 3px solid #78350f; border-radius: 8px; position: relative; overflow: hidden;">
            <svg viewBox="0 0 300 200" style="width: 100%; height: 100%; opacity: 0.6;">
                <path d="M 50,100 Q 100,50 150,120 T 250,100" stroke="#78350f" stroke-width="3" fill="none" stroke-dasharray="5,5"/>
                <circle cx="150" cy="120" r="10" fill="#dc2626"/>
                <text x="150" y="160" font-size="12" fill="#78350f" text-anchor="middle">TESORO</text>
            </svg>
            <div style="position: absolute; top: 10px; left: 10px; font-family: 'Merriweather'; font-size: 14px; color: #78350f; font-weight: bold;">MAPA DEL TESORO</div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 300, 200, posX, posY);
}

// --- HOJA DE PISTAS (Game Master) ---
function cat_insertarHojaPistasEscape(posX, posY) {
    const html = `
        <div style="width: 300px; height: 400px; background: #f8fafc; border: 3px solid #1e293b; border-radius: 8px; padding: 15px; box-sizing: border-box; display: flex; flex-direction: column;">
            <h4 style="color: #1e293b; font-family: 'Merriweather'; text-align: center; margin-bottom: 10px;">HOJA DE PISTAS</h4>
            <ul style="font-size: 10px; color: #475569; padding-left: 15px; flex: 1;">
                <li>Pista 1: Mira debajo de la alfombra.</li>
                <li>Pista 2: El código está en el libro.</li>
                <li>Pista 3: Usa la luz ultravioleta.</li>
                <li>Pista 4: La llave está en el jarrón.</li>
                <li>Pista 5: El candado final es 1-2-3-4.</li>
            </ul>
            <div style="font-size: 8px; color: #94a3b8; text-align: center;">Solo para el Game Master</div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 300, 400, posX, posY);
}