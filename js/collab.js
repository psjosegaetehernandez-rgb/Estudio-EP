// Colaboración Local (BroadcastChannel)
// Permite sincronizar el lienzo en múltiples pestañas del mismo navegador
const collabChannel = new BroadcastChannel('estudio_ep_collab');

function iniciarColaboracionLocal() {
    if(typeof showToast === 'function') showToast("Modo Colaboración Local Activado (Sincroniza pestañas)", "info");
    
    // Cuando movemos un elemento, enviamos el estado
    document.getElementById('canvas').addEventListener('mouseup', () => {
        if(typeof currentProjectId !== 'undefined') {
            const proy = proyectos.find(p => p.id === currentProjectId);
            if(proy) {
                proy.html = document.getElementById('canvas').innerHTML;
                collabChannel.postMessage({ type: 'SYNC_CANVAS', html: proy.html });
            }
        }
    });

    // Escuchamos cambios de otras pestañas
    collabChannel.onmessage = (event) => {
        if (event.data.type === 'SYNC_CANVAS') {
            const canvas = document.getElementById('canvas');
            if (canvas) {
                // Guardamos el SVG y el hint para no perderlos
                const svg = canvas.querySelector('#canvas-svg').outerHTML;
                const hint = canvas.querySelector('#canvas-hint') ? canvas.querySelector('#canvas-hint').outerHTML : '';
                canvas.innerHTML = svg + hint + event.data.html;
                canvas.querySelectorAll('.canvas-element').forEach(el => {
                    if(typeof hacerArrastrable === 'function') hacerArrastrable(el);
                });
            }
        }
    };
}