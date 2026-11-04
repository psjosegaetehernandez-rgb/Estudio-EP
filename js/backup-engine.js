// ================= SISTEMA DE BACKUP Y RESTAURACIÓN =================

function descargarBackupTotal() {
    const data = {};
    // Extraer todos los datos de LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    
    if (Object.keys(data).length === 0) {
        if(typeof showToast === 'function') showToast("No hay proyectos para respaldar aún.", "info");
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Estudio_EP_BACKUP_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (typeof showToast === 'function') showToast("✓ Copia de seguridad descargada. Guárdala en un lugar seguro.", "success");
}

function restaurarBackupTotal(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm("⚠️ ¿Estás seguro? Esto BORRARÁ los proyectos actuales y restaurará los de la copia de seguridad.")) {
                localStorage.clear();
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        localStorage.setItem(key, data[key]);
                    }
                }
                if (typeof showToast === 'function') showToast("✓ Copia restaurada. Recargando la app...", "success");
                setTimeout(() => location.reload(), 1500);
            }
        } catch (err) {
            if (typeof showToast === 'function') showToast("Error: El archivo no es una copia válida.", "error");
            console.error(err);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Limpiar input
}