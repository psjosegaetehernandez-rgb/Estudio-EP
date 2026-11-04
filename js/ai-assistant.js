// ================= ASISTENTE FREIRE Y PROMPTS BING (v2) =================

function abrirAI() {
    const drawer = document.getElementById('ai-drawer');
    if (drawer) {
        drawer.style.display = 'flex';
        cambiarTabAI('pedagogico');
    }
}

function cerrarAI() {
    const drawer = document.getElementById('ai-drawer');
    if (drawer) drawer.style.display = 'none';
}

function cambiarTabAI(tab) {
    document.getElementById('ai-tab-pedagogico').style.display = tab === 'pedagogico' ? 'flex' : 'none';
    document.getElementById('ai-tab-imagenes').style.display = tab === 'imagenes' ? 'flex' : 'none';
    
    const btnPed = document.getElementById('btn-tab-pedagogico');
    const btnImg = document.getElementById('btn-tab-imagenes');
    
    if (tab === 'pedagogico') {
        btnPed.style.borderBottom = '3px solid #8B3A3A'; btnPed.style.color = '#8B3A3A';
        btnImg.style.borderBottom = '3px solid transparent'; btnImg.style.color = '#64748b';
    } else {
        btnImg.style.borderBottom = '3px solid #8B3A3A'; btnImg.style.color = '#8B3A3A';
        btnPed.style.borderBottom = '3px solid transparent'; btnPed.style.color = '#64748b';
    }
}

// --- Lógica del Generador de Prompts ---
function generarPromptBing() {
    const idea = document.getElementById('ai-img-idea').value.trim();
    const estilo = document.getElementById('ai-img-estilo').value;
    const tipo = document.getElementById('ai-img-tipo').value;
    
    if (!idea) {
        alert("Por favor, escribe una idea básica (ej. 'Un mago anciano').");
        return;
    }

    const estilos = {
        'cartoon': 'vibrant vector art, board game illustration, clean lines, colorful flat design, white background',
        'acuarela': 'beautiful watercolor painting, soft edges, paper texture, educational illustration, white background',
        'vintage': 'vintage etching style, sepia tone, detailed linework, old book illustration, clean paper background',
        'realista': 'photorealistic, cinematic lighting, 8k resolution, highly detailed, dramatic shadows',
        'epico': 'epic fantasy art, digital painting, dramatic lighting, highly detailed, concept art style',
        'minimalista': 'minimalist flat illustration, simple geometric shapes, pastel colors, clean background'
    };

    const tipos = {
        'carta': 'centered composition, suitable for a card game, 2:3 aspect ratio, high quality',
        'token': 'isolated on a pure white background, top-down view, icon design, simple and recognizable',
        'tablero': 'wide panoramic view, detailed background, suitable for a board game map',
        'personaje': 'full body character design, clear silhouette, white background, character sheet'
    };

    const estiloTecnico = estilos[estilo] || estilos['cartoon'];
    const tipoTecnico = tipos[tipo] || tipos['carta'];

    const promptFinal = `A ${idea}, ${estiloTecnico}, ${tipoTecnico}, no text, no words, no letters, high resolution, masterpiece.`;

    document.getElementById('ai-img-result-container').style.display = 'block';
    document.getElementById('ai-img-result').value = promptFinal;
}

function copiarPrompt() {
    const textarea = document.getElementById('ai-img-result');
    textarea.select();
    document.execCommand('copy');
    
    const btn = document.getElementById('btn-copiar-prompt');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    btn.style.background = '#16a34a';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '#0284c7';
    }, 2000);
}