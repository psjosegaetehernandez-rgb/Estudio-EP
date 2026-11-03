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