// ================= CATÁN Y EXPANSIONES (v205.0) =================

function insertarTableroCompletoCatan(posX, posY) {
    const rows = [3, 4, 5, 4, 3];
    let html = '<div style="display:flex; flex-direction:column; align-items:center; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.4));">';
    const types = ['bosque','bosque','bosque','bosque','trigo','trigo','trigo','trigo','ladrillo','ladrillo','ladrillo','oveja','oveja','oveja','oveja','montana','montana','montana','desierto'].sort(()=>Math.random()-0.5);
    let idx = 0;
    rows.forEach(cant => {
        html += `<div style="display:flex; justify-content:center; margin-bottom:-28px;">`;
        for(let i=0; i<cant; i++) {
            const t = types[idx % 19];
            let bg='#2e7d32', icon='fa-tree', color='#fff';
            if(t==='trigo') { bg='#ca8a04'; icon='fa-wheat-awn'; }
            if(t==='ladrillo') { bg='#b91c1c'; icon='fa-cubes'; }
            if(t==='oveja') { bg='#15803d'; icon='fa-cloud'; }
            if(t==='montana') { bg='#475569'; icon='fa-mountain'; }
            if(t==='desierto') { bg='#e2e8f0'; icon='fa-sun'; color='#333'; }
            html += `<div style="width:100px; height:115px; position:relative; margin:0 2px; display:flex; align-items:center; justify-content:center;">
                <svg viewBox="0 0 100 115" style="position:absolute; top:0; left:0; width:100%; height:100%; filter:drop-shadow(0 2px 2px rgba(0,0,0,0.3));"><polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="${bg}" stroke="#fff" stroke-width="2"/></svg>
                <i class="fa-solid ${icon}" style="position:relative; z-index:1; font-size:35px; color:${color};"></i>
            </div>`;
            idx++;
        }
        html += `</div>`;
    });
    html += '</div>';
    EP.insertarCartaEnCanvas(html, 500, 500, posX, posY);
}

function insertarTableroJugadorCatan(posX, posY) {
    const html = `<div style="width:350px; height:250px; background:#fdf6e3; border:4px solid #8B4513; border-radius:12px; padding:15px; display:flex; flex-direction:column; box-sizing:border-box;">
        <div style="text-align:center; font-family:'Merriweather'; font-size:18px; font-weight:bold; color:#8B4513; border-bottom:2px solid #8B4513; padding-bottom:5px;">Tablero de Jugador</div>
        <div style="display:flex; gap:10px; flex:1; margin-top:10px;">
            <div style="flex:1; border:2px dashed #cbd5e1; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:11px; background:rgba(255,255,255,0.5);">Recursos</div>
            <div style="flex:1; border:2px dashed #cbd5e1; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:11px; background:rgba(255,255,255,0.5);">Desarrollo</div>
        </div>
        <div style="margin-top:10px; border:2px dashed #cbd5e1; border-radius:8px; height:60px; display:flex; align-items:center; justify-content:space-around; background:rgba(255,255,255,0.5);">
            <i class="fa-solid fa-house" style="color:#8B4513; font-size:20px;"></i><i class="fa-solid fa-city" style="color:#8B4513; font-size:24px;"></i><i class="fa-solid fa-road" style="color:#8B4513; font-size:20px;"></i>
        </div>
    </div>`;
    EP.insertarCartaEnCanvas(html, 350, 250, posX, posY);
}

function insertarFichasNumeroCatan(posX, posY) {
    const numeros = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
    let html = '<div style="display:flex; flex-wrap:wrap; gap:6px; width:220px; background:rgba(255,255,255,0.8); padding:10px; border-radius:8px; border:1px dashed #cbd5e1;">';
    numeros.forEach(num => {
        const esRojo = (num===6 || num===8);
        html += `<div style="width:35px; height:35px; background:${esRojo?'#dc2626':'#fef3c7'}; border:2px solid #78350f; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display'; font-size:14px; font-weight:bold; color:${esRojo?'#fff':'#1e293b'}; box-shadow:0 2px 3px rgba(0,0,0,0.3);">${num}</div>`;
    });
    html += '</div>';
    EP.insertarCartaEnCanvas(html, 240, 150, posX, posY);
}

function insertarKitJugadorCatan(color, posX, posY) {
    let piezas = '';
    for(let i=0; i<5; i++) piezas += `<div style="width:22px; height:20px;"><svg viewBox="0 0 100 100"><polygon points="50,0 100,35 100,100 0,100 0,35" fill="${color}"/></svg></div>`;
    for(let i=0; i<4; i++) piezas += `<div style="width:30px; height:28px;"><svg viewBox="0 0 100 100"><polygon points="50,0 100,30 100,100 0,100 0,30" fill="${color}"/></svg></div>`;
    let caminos = '';
    for(let i=0; i<15; i++) caminos += `<div style="width:25px; height:6px; background:${color}; border-radius:2px;"></div>`;
    const html = `<div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:8px; width:170px;">
        <div style="font-family:'Inter'; font-size:12px; font-weight:bold; text-align:center; border-bottom:1px solid #cbd5e1;">Kit de Jugador</div>
        <div style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center;">${piezas}</div>
        <div style="display:flex; flex-wrap:wrap; gap:3px; justify-content:center; border-top:1px dashed #cbd5e1; padding-top:5px;">${caminos}</div>
    </div>`;
    EP.insertarCartaEnCanvas(html, 170, 150, posX, posY);
}

function insertarCartaRecursoCatan(tipo, posX, posY) {
    const rec = { madera:{n:'Madera',c:'#2e7d32',b:'#e8f5e9',i:'fa-tree'}, trigo:{n:'Trigo',c:'#ca8a04',b:'#fef9c3',i:'fa-wheat-awn'}, ladrillo:{n:'Ladrillo',c:'#b91c1c',b:'#fee2e2',i:'fa-cubes'}, oveja:{n:'Oveja',c:'#15803d',b:'#dcfce7',i:'fa-cloud'}, piedra:{n:'Piedra',c:'#475569',b:'#f1f5f9',i:'fa-mountain'} }[tipo] || {n:'Madera',c:'#2e7d32',b:'#e8f5e9',i:'fa-tree'};
    const front = `<div class="carta-pro" style="background:${rec.b}; border:4px solid ${rec.c}; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center;"><i class="fa-solid ${rec.i}" style="font-size:60px; color:${rec.c}; margin-bottom:15px;"></i><div style="font-family:'Merriweather'; font-size:18px; font-weight:bold; color:${rec.c}; text-transform:uppercase;">${rec.n}</div></div>`;
    const back = `<div style="width:100%; height:100%; background:#8B4513; border-radius:12px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-hand-holding-droplet" style="font-size:50px; color:#fdf6e3;"></i></div>`;
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}

function insertarLadronCatan(posX, posY) {
    const html = `<div style="width:30px; height:40px;"><svg viewBox="0 0 100 100"><polygon points="50,0 80,20 100,100 0,100 20,20" fill="#0f172a"/><circle cx="50" cy="80" r="5" fill="#94a3b8"/></svg></div>`;
    EP.insertarCartaEnCanvas(html, 30, 40, posX, posY);
}

function insertarPuertoCatan(posX, posY) {
    const puertos = [{ tipo: '3:1', color: '#1e293b' },{ tipo: '2:1', recurso: 'Madera', color: '#2e7d32' },{ tipo: '2:1', recurso: 'Trigo', color: '#ca8a04' },{ tipo: '2:1', recurso: 'Ladrillo', color: '#b91c1c' },{ tipo: '2:1', recurso: 'Oveja', color: '#15803d' },{ tipo: '2:1', recurso: 'Piedra', color: '#475569' }];
    const p = puertos[Math.floor(Math.random() * puertos.length)];
    const html = `<div style="width:50px; height:50px; background:#fdf6e3; border:3px solid #8B4513; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center;"><span style="font-family:'Playfair Display'; font-size:14px; font-weight:bold; color:${p.color};">${p.tipo}</span>${p.recurso ? `<span style="font-size:8px; color:#64748b;">${p.recurso}</span>` : ''}</div>`;
    EP.insertarCartaEnCanvas(html, 50, 50, posX, posY);
}

function insertarFichaCaballeroCatan(posX, posY) {
    const color = ['#dc2626', '#0284c7', '#15803d', '#ca8a04'][Math.floor(Math.random()*4)];
    const html = `<div style="width:35px; height:45px; background:linear-gradient(180deg, ${color} 0%, #1e293b 100%); border-radius:8px 8px 4px 4px; display:flex; align-items:center; justify-content:center; position:relative;"><i class="fa-solid fa-chess-knight" style="color:white; font-size:20px; position:absolute; top:8px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 35, 45, posX, posY);
}

function insertarFichaMetropoliCatan(posX, posY) {
    const html = `<div style="width:50px; height:55px;"><svg viewBox="0 0 100 100"><polygon points="50,0 100,30 100,100 0,100 0,30" fill="#b45309"/><circle cx="50" cy="50" r="20" fill="#fef3c7"/><text x="50" y="58" font-family="Arial" font-size="20" font-weight="bold" fill="#b45309" text-anchor="middle">M</text></svg></div>`;
    EP.insertarCartaEnCanvas(html, 50, 55, posX, posY);
}

function insertarFichaMercanciaCatan(posX, posY) {
    const m = [{ icon: 'fa-scroll', color: '#fcd34d', nombre: 'Papel' },{ icon: 'fa-coins', color: '#fbbf24', nombre: 'Moneda' },{ icon: 'fa-tshirt', color: '#60a5fa', nombre: 'Tela' }][Math.floor(Math.random()*3)];
    const html = `<div style="width:40px; height:40px; background:${m.color}; border-radius:6px; border:2px solid #1e293b; display:flex; align-items:center; justify-content:center;"><i class="fa-solid ${m.icon}" style="color:#1e293b; font-size:20px;"></i></div>`;
    EP.insertarCartaEnCanvas(html, 40, 40, posX, posY);
}

function insertarBarcoNavegante(posX, posY) {
    const html = `<div style="position:relative; width:60px; height:35px;"><div style="width:60px; height:20px; background:linear-gradient(180deg, #a0522d 0%, #451a03 100%); border-radius:0 0 15px 15px; position:absolute; bottom:0;"></div><div style="position:absolute; bottom:15px; left:28px; width:4px; height:25px; background:#451a03;"></div><div style="position:absolute; bottom:20px; left:30px; width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:20px solid #fef3c7;"></div></div>`;
    EP.insertarCartaEnCanvas(html, 60, 35, posX, posY);
}


// ================= COMPONENTES EXACTOS CATÁN (v222.0) =================

function insertarDadoCatan(valor, posX, posY) {
    const html = `
        <div style="width: 50px; height: 50px; background: white; border: 2px solid #cbd5e1; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <span style="font-family: 'Playfair Display'; font-size: 28px; font-weight: bold; color: #1e293b;">${valor || '?'}</span>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 50, 50, posX, posY);
}

function insertarCartaDesarrolloCatan(tipo, posX, posY) {
    const tipos = {
        'caballero': { n: 'Caballero', i: 'fa-chess-knight', c: '#b91c1c' },
        'punto': { n: 'Punto de Victoria', i: 'fa-trophy', c: '#ca8a04' },
        'camino': { n: 'Construcción de Caminos', i: 'fa-road', c: '#15803d' },
        'abundancia': { n: 'Año de la Abundancia', i: 'fa-wheat-awn', c: '#d97706' },
        'monopolio': { n: 'Monopolio', i: 'fa-hand-holding-dollar', c: '#4c1d95' }
    };
    const t = tipos[tipo] || tipos['caballero'];
    
    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 2px solid ${t.c}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;">
            <i class="fa-solid ${t.i}" style="font-size: 50px; color: ${t.c}; margin-bottom: 15px;"></i>
            <div style="font-family: 'Merriweather'; font-size: 14px; font-weight: bold; color: ${t.c}; text-align: center;">${t.n}</div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#8B4513; border-radius:8px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-scroll" style="font-size:50px; color:#fdf6e3;"></i></div>`;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}