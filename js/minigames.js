// ================= RULETA Y PÁNICO =================

function abrirRuleta() {
    let modal = document.getElementById('modal-ruleta');
    if (!modal) {
        const html = `
        <div id="modal-ruleta" class="modal-overlay" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 100002; align-items: center; justify-content: center;">
            <div style="background: #fdfbf7; padding: 30px; border-radius: 50%; width: 400px; height: 400px; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div id="ruleta-wheel" style="width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(#dc2626 0deg 60deg, #2563eb 60deg 120deg, #16a34a 120deg 180deg, #ca8a04 180deg 240deg, #9333ea 240deg 300deg, #ea580c 300deg 360deg); transition: transform 4s cubic-bezier(0.25, 0.1, 0.25, 1); position: absolute;"></div>
                <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 30px solid #1e293b; z-index: 2;"></div>
                <div style="width: 80px; height: 80px; background: #1e293b; border-radius: 50%; z-index: 1; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; cursor: pointer;" onclick="girarRuleta()">GIRAR</div>
                <button onclick="document.getElementById('modal-ruleta').style.display='none'" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
        modal = document.getElementById('modal-ruleta');
    }
    modal.style.display = 'flex';
}

function girarRuleta() {
    const wheel = document.getElementById('ruleta-wheel');
    if (wheel) {
        const grados = Math.floor(Math.random() * 360) + 1440;
        wheel.style.transform = `rotate(${grados}deg)`;
    }
}

function activarPanico() {
    let overlay = document.getElementById('pantalla-panico');
    if (!overlay) {
        const html = `
        <div id="pantalla-panico" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #dc2626; z-index: 100003; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Playfair Display'; font-size: 80px; text-transform: uppercase; animation: pulse 0.5s infinite alternate;">
            <h1 style="text-shadow: 4px 4px 0 #000; margin-bottom: 20px;">¡TIEMPO!</h1>
            <i class="fa-solid fa-bell" style="font-size: 150px; text-shadow: 4px 4px 0 #000;"></i>
            <button onclick="document.getElementById('pantalla-panico').style.display='none'" style="margin-top: 50px; padding: 15px 40px; font-size: 20px; background: black; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: 'Inter';">APAGAR ALARMA</button>
        </div>
        <style>@keyframes pulse { from { background: #dc2626; } to { background: #991b1b; } }</style>`;
        document.body.insertAdjacentHTML('beforeend', html);
        overlay = document.getElementById('pantalla-panico');
    }
    overlay.style.display = 'flex';
}

function toggleSoundboard() { if(typeof showToast === 'function') showToast("🎵 Sonidos del taller activados", "info"); }
function toggleMesa() { if(typeof showToast === 'function') showToast("🌲 Modo Mesa activado", "info"); }