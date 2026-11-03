function abrirAI() {
    const drawer = document.getElementById('ai-drawer');
    if (drawer) {
        drawer.style.display = 'flex';
        // Simulamos que la IA escribe
        const chat = document.getElementById('ai-chat-messages');
        chat.innerHTML = '<div style="color:#64748b; font-size:12px; text-align:center;">Analizando el lienzo...</div>';
        
        setTimeout(() => {
            chat.innerHTML = `
                <div style="background:#e0f2fe; padding:10px; border-radius:8px; margin-bottom:10px; font-size:12px; color:#0284c7;">
                    <b>Asistente Freire:</b> He revisado tu proyecto. Veo que estás usando un Escape Room. 
                    <br><br>
                    <b>Sugerencia Pedagógica:</b> Para que los participantes reflexionen sobre el trabajo en equipo bajo presión, puedes hacer esta pregunta al finalizar:
                    <br><br>
                    <i>"¿Cómo se sintieron al no poder ver todo a simple vista? ¿Qué roles asumió cada uno cuando el tiempo se agotaba?"</i>
                </div>
                <div style="background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #cbd5e1; font-size:11px; color:#475569;">
                    <i>Nota: Para conectar una IA real (OpenAI/Gemini), ingresa tu API Key en los ajustes del sistema.</i>
                </div>
            `;
        }, 1500);
    }
}

function cerrarAI() {
    const drawer = document.getElementById('ai-drawer');
    if (drawer) drawer.style.display = 'none';
}