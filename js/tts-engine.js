// ================= EXPORTADOR PARA TABLETOP SIMULATOR =================

async function exportarTTS() {
    if (typeof JSZip === 'undefined' || typeof html2canvas === 'undefined') {
        if(typeof showToast === 'function') showToast("Librerías de exportación no cargadas. Revisa tu conexión.", "error");
        return;
    }

    if(typeof showToast === 'function') showToast("Generando paquete para Tabletop Simulator...", "info");

    const zip = new JSZip();
    const elements = document.querySelectorAll('#canvas > .canvas-element, #canvas > .carta-3d, #canvas > .card');
    
    if (elements.length === 0) {
        if(typeof showToast === 'function') showToast("No hay elementos en el lienzo para exportar.", "error");
        return;
    }

    const canvasRect = document.getElementById('canvas').getBoundingClientRect();
    const ttsObjects = [];

    // Ocultar cuadrícula y hints para las capturas
    const svgGrid = document.getElementById('canvas-svg');
    const hint = document.getElementById('canvas-hint');
    if(svgGrid) svgGrid.style.display = 'none';
    if(hint) hint.style.display = 'none';

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        
        // Obtener posición y tamaño
        const rect = el.getBoundingClientRect();
        const x = rect.left - canvasRect.left;
        const y = rect.top - canvasRect.top;
        const width = rect.width;
        const height = rect.height;

        try {
            // Capturar la imagen del elemento
            const capture = await html2canvas(el, { 
                scale: 2, 
                backgroundColor: null, 
                useCORS: true,
                logging: false 
            });
            
            const imgData = capture.toDataURL('image/png');
            const base64Data = imgData.split(',')[1];
            const fileName = `obj_${i}.png`;
            
            // Añadir imagen al ZIP
            zip.file(fileName, base64Data, {base64: true});

            // Crear el objeto para el JSON de TTS
            ttsObjects.push({
                Name: "Custom_Object",
                Transform: {
                    posX: (x / 100).toFixed(2),
                    posY: 1.5, // Altura sobre la mesa
                    posZ: (y / 100).toFixed(2),
                    rotX: 0,
                    rotY: 180,
                    rotZ: 0,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1
                },
                Nickname: el.innerText.substring(0, 20) || `Objeto_${i}`,
                Description: "Creado en Estudio EP",
                GMNotes: "",
                AltLookAngle: { x: 0, y: 0, z: 0 },
                ColorDiffuse: { r: 1, g: 1, b: 1 },
                CustomImage: {
                    ImageURL: fileName,
                    ImageSecondaryURL: fileName,
                    WidthScale: 0,
                    CustomMesh: {
                        MeshURL: "",
                        DiffuseURL: fileName,
                        NormalURL: "",
                        ColliderURL: ""
                    }
                },
                Tooltip: true,
                Grid: true,
                Locked: false
            });
        } catch (err) {
            console.error("Error capturando objeto para TTS", err);
        }
    }

    // Restaurar UI
    if(svgGrid) svgGrid.style.display = '';
    if(hint) hint.style.display = '';

    // Crear estructura base de TTS
    const ttsData = {
        SaveName: "Estudio_EP_Export",
        Date: new Date().toISOString(),
        VersionNumber: "v13.1",
        GameMode: "Tabletop",
        GameType: "Custom",
        Gravity: 0.5,
        PlayArea: 0.5,
        Table: "Table_Custom",
        Sky: "Sky_Museum",
        Note: "Tablero exportado desde Estudio EP",
        Rules: "",
        XmlUI: "",
        ObjectStates: ttsObjects
    };

    zip.file("Tabletop_Save.json", JSON.stringify(ttsData, null, 2));

    // Generar y descargar ZIP
    zip.generateAsync({ type: "blob" }).then(function(content) {
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Estudio_EP_TTS_${new Date().getTime()}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        if(typeof showToast === 'function') showToast("✓ Paquete TTS descargado. Descomprime y carga el JSON en el juego.", "success");
    });
}