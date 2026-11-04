// ================= ESCENARIOS DE FONDO =================
const ESCENARIOS = {
    'catan': {
        nombre: 'Isla de Catán',
        html: `<div style="width: 1200px; height: 800px; background: radial-gradient(circle, #38bdf8 0%, #0284c7 100%); border-radius: 20px; position: relative; overflow: hidden; box-shadow: inset 0 0 50px rgba(0,0,0,0.3);">
            <svg viewBox="0 0 1200 800" style="width:100%; height:100%; opacity:0.2;"><pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M0,50 Q25,25 50,50 T100,50" stroke="#fff" stroke-width="2" fill="none"/></pattern><rect width="100%" height="100%" fill="url(#waves)"/></svg>
            <div style="position: absolute; top: 20px; left: 20px; font-family:'Merriweather'; color:white; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Colonos de Catán</div>
        </div>`
    },
    'pandemic': {
        nombre: 'Mundo Pandemic',
        html: `<div style="width: 1200px; height: 800px; background: #0f172a; border-radius: 20px; position: relative; overflow: hidden;">
            <div style="position: absolute; top:0; left:0; width:100%; height:100%; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px;"></div>
            <div style="position: absolute; top: 20px; left: 20px; font-family:'Merriweather'; color:#dc2626; font-size: 24px; text-shadow: 0 0 10px rgba(220,38,38,0.5);">PANDEMIC</div>
        </div>`
    },
    'tavern': {
        nombre: 'Taberna Medieval (D&D)',
        html: `<div style="width: 1200px; height: 800px; background: #451a03; border-radius: 20px; position: relative; overflow: hidden; background-image: repeating-linear-gradient(45deg, #451a03 0, #451a03 10px, #3d1502 10px, #3d1502 20px);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; height: 400px; background: radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
            <div style="position: absolute; bottom: 20px; right: 20px; font-family:'Merriweather'; color:#fcd34d; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">La Taberna del Dragón</div>
        </div>`
    },
    'space': {
        nombre: 'Espacio Profundo (Sci-Fi)',
        html: `<div style="width: 1200px; height: 800px; background: #000; border-radius: 20px; position: relative; overflow: hidden;">
            <div style="position: absolute; width:100%; height:100%; background: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px); background-size: 550px 550px, 350px 350px, 250px 250px; background-position: 0 0, 40px 60px, 130px 270px; opacity: 0.8;"></div>
            <div style="position: absolute; top: 20px; left: 20px; font-family:'Merriweather'; color:#a855f7; font-size: 24px; text-shadow: 0 0 10px rgba(168,85,247,0.5);">SECTOR 7G</div>
        </div>`
    },
    'classroom': {
        nombre: 'Sala de Clases',
        html: `<div style="width: 1200px; height: 800px; background: #fef3c7; border-radius: 20px; position: relative; overflow: hidden;">
            <div style="position: absolute; bottom: 0; width: 100%; height: 150px; background: #78350f; border-top: 5px solid #451a03;"></div>
            <div style="position: absolute; bottom: 150px; left: 50%; transform: translateX(-50%); width: 600px; height: 30px; background: #f1f5f9; border-radius: 10px 10px 0 0;"></div>
            <div style="position: absolute; top: 50px; left: 50px; width: 300px; height: 200px; background: #15803d; border: 10px solid #451a03; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Playfair Display'; font-size: 20px; text-align: center;">Aprender es un acto político</div>
            <div style="position: absolute; bottom: 20px; right: 20px; font-family:'Merriweather'; color:#451a03; font-size: 24px;">Taller de Educación Popular</div>
        </div>`
    }
};

function insertarEscenario(tipo) {
    const esc = ESCENARIOS[tipo];
    if (!esc) return;
    
    // Eliminar escenario anterior si existe
    const oldScenary = document.getElementById('scenario-background');
    if (oldScenary) oldScenary.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'scenario-background';
    wrapper.className = 'canvas-element'; 
    wrapper.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0; pointer-events: none; opacity: 0.9;';
    wrapper.innerHTML = esc.html;
    
    const canvas = document.getElementById('canvas');
    canvas.insertBefore(wrapper, canvas.firstChild);
    
    if(typeof showToast === 'function') showToast(`Escenario "${esc.nombre}" cargado`, "success");
    if(typeof autosave === 'function') autosave();
}