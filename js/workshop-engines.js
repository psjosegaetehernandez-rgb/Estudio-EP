// ================= MOTORES DE TALLERES (v218.0) =================

// --- CARTAS DE REFRÁN (Kit Taller EP) ---
function insertarCartaRefran(texto, posX, posY) {
    const front = `
        <div class="carta-pro" style="background: #ffffff; border: 3px dashed #d97706; border-radius: 12px; display: flex; flex-direction: column; box-sizing: border-box; width: 100%; height: 100%;">
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 30px 20px;">
                <div style="font-family: 'Merriweather', serif; font-size: 22px; font-weight: bold; color: #b45309; text-align: center; line-height: 1.4;" contenteditable="true">${texto}</div>
            </div>
            <div style="padding: 15px; text-align: center; font-family: 'Inter', sans-serif; font-size: 10px; color: #d97706; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
                BUSCA TU OTRA MITAD
            </div>
        </div>
    `;
    const back = `<div style="width:100%; height:100%; background:#fef3c7; border-radius:12px; display:flex; align-items:center; justify-content:center; border: 3px dashed #d97706;"><i class="fa-solid fa-puzzle-piece" style="font-size:50px; color:#d97706; opacity:0.5;"></i></div>`;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}

// --- CARTAS VIH TARAPACÁ (Mitos y Situaciones) ---
function insertarCartaMitoVIH(tipo, titulo, texto, posX, posY) {
    let headerColor = "#8B3A3A"; // Rojo vino del PDF
    let headerText = "MITO O VERDAD";
    let headerFont = "Merriweather";
    
    if (tipo === 'situacion') {
        headerText = "SITUACIÓN";
    }

    const front = `
        <div class="carta-pro" style="background: #fdfbf7; border: 2px solid #8B3A3A; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; width: 100%; height: 100%;">
            <div style="background: ${headerColor}; color: white; padding: 12px; text-align: center; font-family: '${headerFont}', serif; font-size: 14px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">${headerText}</div>
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; text-align: center;">
                <div style="font-family: 'Merriweather', serif; font-size: 18px; font-weight: bold; color: #5c1a1b; margin-bottom: 10px;" contenteditable="true">${titulo}</div>
                <div style="font-family: 'Inter', sans-serif; font-size: 12px; color: #334155; line-height: 1.4;" contenteditable="true">${texto}</div>
            </div>
            <div style="border-top: 1px solid #8B3A3A; padding: 8px; text-align: center; font-family: 'Inter', sans-serif; font-size: 9px; color: #8B3A3A; text-transform: uppercase;">Tarapacá · Cuidado Colectivo</div>
        </div>
    `;
    
    // Dorso con la diana (círculos) tal como en el PDF
    const back = `
        <div style="width:100%; height:100%; background:#5c1a1b; border-radius:8px; display:flex; align-items:center; justify-content:center;">
            <div style="width: 70px; height: 70px; border: 2px solid #fdfbf7; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <div style="width: 45px; height: 45px; border: 2px dashed #fdfbf7; border-radius: 50%;"></div>
            </div>
        </div>
    `;
    
    EP.insertarCartaEnCanvas(EP.wrapIn3D(front, back, 240, 330), 240, 330, posX, posY);
}

// --- GUÍA DEL FACILITADOR ---
function insertarGuiaFacilitadorVIH(posX, posY) {
    const front = `
        <div class="carta-pro" style="background: #fff; border: 4px solid #8B3A3A; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; box-sizing: border-box; width: 100%; height: 100%; overflow-y: auto;">
            <h3 style="color: #8B3A3A; font-family: 'Merriweather', serif; font-size: 18px; text-align: center; margin-bottom: 10px;">Guion del Facilitador</h3>
            <p style="font-size: 10px; color: #475569; margin-bottom: 15px; font-style: italic; text-align: center;">Educación Popular y Género. Tejemos una red de cuidado.</p>
            
            <div style="margin-bottom: 12px;">
                <h4 style="color: #b45309; font-size: 12px; margin-bottom: 4px;">Fase 1: Encuadre (20 min)</h4>
                <p style="font-size: 10px; color: #334155;">Técnica: La Telaraña. Hablemos de lo que nos da miedo y cómo nos sostenemos.</p>
            </div>
            
            <div style="margin-bottom: 12px;">
                <h4 style="color: #b45309; font-size: 12px; margin-bottom: 4px;">Fase 2: Árbol de Mitos (40 min)</h4>
                <p style="font-size: 10px; color: #334155;">Raíces (mitos), Tronco (miedos), Hojas (consecuencias del silencio).</p>
            </div>

            <div style="margin-bottom: 12px;">
                <h4 style="color: #b45309; font-size: 12px; margin-bottom: 4px;">Fase 3: Vínculos y Violencia (40 min)</h4>
                <p style="font-size: 10px; color: #334155;">Teatro Foro: Negociar el condón. El autocuidado es un acto político.</p>
            </div>

            <div style="margin-bottom: 12px;">
                <h4 style="color: #b45309; font-size: 12px; margin-bottom: 4px;">Fase 4: Ruta del Cuidado (45 min)</h4>
                <p style="font-size: 10px; color: #334155;">Usen el Cubo y el Mazo de Cartas para dialogar sin juicios.</p>
            </div>

            <div style="margin-bottom: 12px;">
                <h4 style="color: #b45309; font-size: 12px; margin-bottom: 4px;">Fase 5: Semáforo (15 min)</h4>
                <p style="font-size: 10px; color: #334155;">Verde (haré), Amarillo (seguiré), Rojo (dejaré de hacer).</p>
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(front, 400, 550, posX, posY);
}

// --- CUBO DE REFLEXIÓN ---
function insertarCuboReflexionVIH(posX, posY) {
    const front = `
        <div style="background: #fdfbf7; border: 2px solid #8B3A3A; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; width: 450px; box-sizing: border-box;">
            <h4 style="color: #8B3A3A; text-align: center; margin-bottom: 15px; font-family: 'Merriweather'; font-size: 16px;">Cubo de Reflexión</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; border: 2px dashed #8B3A3A; padding: 10px; background: #fdfbf7;">
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">Saca una Carta</div>
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">Comparte una experiencia</div>
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">¿Cómo cuidas a otros?</div>
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">Saca una Carta</div>
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">Cambia de lugar</div>
                <div style="border: 1px solid #8B3A3A; padding: 30px 10px; text-align: center; font-size: 11px; font-weight: bold; color: #5c1a1b; display:flex; align-items:center; justify-content:center;">Saca una Carta</div>
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(front, 450, 350, posX, posY);
}
// ================= TABLEROS Y FICHAS (v219.0) =================

// --- RUTA DEL CUIDADO (Timeline VIH) ---
function insertarRutaCuidadoVIH(posX, posY) {
    const fases = [
        { num: 1, nombre: "Encuadre", icon: "fa-users" },
        { num: 2, nombre: "Árbol de Mitos", icon: "fa-tree" },
        { num: 3, nombre: "Vínculos", icon: "fa-heart-crack" },
        { num: 4, nombre: "Ruta del Cuidado", icon: "fa-shield-virus" },
        { num: 5, nombre: "Compromiso", icon: "fa-traffic-light" }
    ];
    
    let html = `<div style="background: #fdfbf7; border: 3px solid #8B3A3A; border-radius: 12px; padding: 20px; width: 650px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
        <h3 style="color: #8B3A3A; font-family: 'Merriweather'; font-size: 20px; margin-bottom: 20px;">Ruta del Cuidado Colectivo</h3>
        <div style="display: flex; justify-content: space-between; width: 100%; position: relative;">`;
    
    // Línea conectora
    html += `<div style="position: absolute; top: 25px; left: 30px; right: 30px; height: 4px; background: #8B3A3A; z-index: 1;"></div>`;

    fases.forEach(f => {
        html += `<div style="display: flex; flex-direction: column; align-items: center; z-index: 2; width: 100px;">
            <div style="width: 50px; height: 50px; background: #8B3A3A; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; border: 3px solid #fdfbf7; margin-bottom: 10px;">${f.num}</div>
            <div style="font-size: 11px; font-weight: bold; color: #5c1a1b; text-align: center; font-family: 'Inter';">${f.nombre}</div>
            <i class="fa-solid ${f.icon}" style="color: #8B3A3A; margin-top: 5px; opacity: 0.6;"></i>
        </div>`;
    });
    html += `</div></div>`;
    
    EP.insertarCartaEnCanvas(html, 650, 150, posX, posY);
}

// --- ÁRBOL DE PROBLEMAS (Lienzo para Post-its) ---
function insertarArbolProblemasVIH(posX, posY) {
    const html = `
        <div style="background: #fdfbf7; border: 3px solid #8B3A3A; border-radius: 12px; width: 400px; height: 500px; display: flex; flex-direction: column; box-sizing: border-box; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
            <div style="flex: 1; background: #dcfce7; border-bottom: 2px dashed #15803d; padding: 15px; position: relative;">
                <span style="position: absolute; top: 10px; left: 15px; font-weight: bold; color: #15803d; font-family: 'Inter';">HOJAS: Consecuencias del silencio</span>
            </div>
            <div style="height: 200px; background: #fef3c7; border-bottom: 2px dashed #b45309; padding: 15px; position: relative;">
                <span style="position: absolute; top: 10px; left: 15px; font-weight: bold; color: #b45309; font-family: 'Inter';">TRONCO: ¿Cómo nos hace sentir?</span>
            </div>
            <div style="flex: 1; background: #78350f; padding: 15px; position: relative;">
                <span style="position: absolute; bottom: 10px; left: 15px; font-weight: bold; color: #fef3c7; font-family: 'Inter';">RAÍCES: Mitos y prejuicios</span>
            </div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 400, 500, posX, posY);
}

// --- SEMÁFORO DEL COMPROMISO ---
function insertarSemaforoVIH(posX, posY) {
    const html = `
        <div style="background: #1e293b; border: 4px solid #0f172a; border-radius: 20px; width: 150px; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: space-around; padding: 20px; box-sizing: border-box; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
            <div style="width: 90px; height: 90px; background: #ef4444; border-radius: 50%; border: 3px solid #7f1d1d; box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);"></div>
            <div style="width: 90px; height: 90px; background: #eab308; border-radius: 50%; border: 3px solid #713f12; box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);"></div>
            <div style="width: 90px; height: 90px; background: #22c55e; border-radius: 50%; border: 3px solid #14532d; box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);"></div>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 150, 350, posX, posY);
}

// --- FICHAS TEMÁTICAS (Tokens) ---
function insertarFichaTaller(tipo, posX, posY) {
    let color, icon, bg;
    if (tipo === 'escudo') { color = '#0284c7'; icon = 'fa-shield-halved'; bg = '#e0f2fe'; } // Cuidado
    else if (tipo === 'rayo') { color = '#dc2626'; icon = 'fa-bolt'; bg = '#fee2e2'; } // Riesgo
    else if (tipo === 'corazon') { color = '#be123c'; icon = 'fa-heart-pulse'; bg = '#ffe4e6'; } // Salud
    else if (tipo === 'lana') { color = '#d97706'; icon = 'fa-circle-nodes'; bg = '#fef3c7'; } // Telaraña EP
    
    const html = `
        <div style="width: 50px; height: 50px; background: ${bg}; border: 3px solid ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
            <i class="fa-solid ${icon}" style="color: ${color}; font-size: 24px;"></i>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 50, 50, posX, posY);
}

// --- TELARAÑA DE CUIDADOS (Tablero EP) ---
function insertarTelaranaEP(posX, posY) {
    const html = `
        <div style="background: #fdfbf7; border: 3px solid #d97706; border-radius: 12px; width: 350px; height: 350px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; position: absolute; opacity: 0.1;">
                <circle cx="50" cy="50" r="40" stroke="#d97706" stroke-width="1" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#d97706" stroke-width="1" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#d97706" stroke-width="1" fill="none" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#d97706" stroke-width="1" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#d97706" stroke-width="1" />
                <line x1="22" y1="22" x2="78" y2="78" stroke="#d97706" stroke-width="1" />
                <line x1="22" y1="78" x2="78" y2="22" stroke="#d97706" stroke-width="1" />
            </svg>
            <h3 style="color: #b45309; font-family: 'Merriweather'; font-size: 18px; z-index: 1; text-align: center; background: rgba(255,255,255,0.8); padding: 10px; border-radius: 8px;">La Telaraña de los Cuidados</h3>
        </div>
    `;
    EP.insertarCartaEnCanvas(html, 350, 350, posX, posY);
}