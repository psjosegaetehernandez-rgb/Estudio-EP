function insertarPlantilla(tipo) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'doc-element';
    wrapper.style.left = '100px';
    wrapper.style.top = '100px';
    wrapper.style.background = 'white';
    wrapper.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    
    if (tipo === 'triptico') {
        wrapper.style.width = '800px';
        wrapper.style.height = '400px';
        wrapper.style.display = 'grid';
        wrapper.style.gridTemplateColumns = '1fr 1fr 1fr';
        wrapper.innerHTML = `
            <div style="border-right: 2px dashed #ccc; padding: 20px;">
                <h3 style="font-family:'Playfair Display'; color:#9a3412;">Portada</h3>
                <p style="font-size:12px; color:#666;">Título del material...</p>
            </div>
            <div style="border-right: 2px dashed #ccc; padding: 20px;">
                <h3 style="font-family:'Playfair Display'; color:#9a3412;">Cuerpo</h3>
                <p style="font-size:12px; color:#666;">Contenido principal...</p>
            </div>
            <div style="padding: 20px;">
                <h3 style="font-family:'Playfair Display'; color:#9a3412;">Contraportada</h3>
                <p style="font-size:12px; color:#666;">Contacto / Info...</p>
            </div>
        `;
    } else if (tipo === 'comic') {
        wrapper.style.width = '600px';
        wrapper.style.height = '800px';
        wrapper.style.display = 'grid';
        wrapper.style.gridTemplateColumns = '1fr 1fr';
        wrapper.style.gridTemplateRows = '1fr 1fr 1fr';
        wrapper.style.gap = '10px';
        wrapper.style.padding = '20px';
        wrapper.style.background = '#f8fafc';
        wrapper.innerHTML = Array(6).fill('<div style="border:2px solid #333; background:white; display:flex; align-items:center; justify-content:center; font-family:\'Patrick Hand\'; color:#999;">Viñeta</div>').join('');
    } else if (tipo === 'cuaderno') {
        wrapper.style.width = '210mm';
        wrapper.style.minHeight = '297mm';
        wrapper.style.padding = '20mm';
        wrapper.innerHTML = `
            <h1 style="font-family:'Playfair Display'; color:#9a3412; border-bottom:2px solid #9a3412; padding-bottom:10px;">Mi Historia</h1>
            <p style="font-family:'Merriweather'; font-size:16px; margin-top:20px; line-height:2;">Yo sentí...</p>
            <p style="font-family:'Merriweather'; font-size:16px; line-height:2;">Lo que más recuerdo es...</p>
            <div style="border:2px dashed #ccc; height:200px; margin-top:20px; display:flex; align-items:center; justify-content:center; color:#999;">Dibuja aquí</div>
        `;
    }
    
    document.getElementById('canvas').appendChild(wrapper);
    hacerArrastrable(wrapper);
    showToast("Plantilla insertada", "success");
}

function insertarPlantillaArchivo(event) {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
        const wrapper = document.createElement('div');
        wrapper.className = 'doc-element';
        wrapper.style.left = '100px';
        wrapper.style.top = '100px';
        wrapper.innerHTML = e.target.result;
        document.getElementById('canvas').appendChild(wrapper);
        hacerArrastrable(wrapper);
        showToast("Plantilla HTML insertada", "success");
    };
    reader.readAsText(file);
}