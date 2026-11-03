// ================= REESTRUCTURACIÓN NATIVA (v115.0) =================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Limpieza de nodos de texto basura en el body
    Array.from(document.body.childNodes).forEach(node => {
        if (node.nodeType === 3) { // Si es un nodo de texto
            const txt = node.textContent;
            if (txt.includes("n '") || txt.includes("n'")) {
                node.remove();
            }
        }
    });

    // 2. Transformar el panel izquierdo usando etiquetas <details> nativas
    const toolContents = document.querySelectorAll('.tool-content');
    
    toolContents.forEach(toolContent => {
        const children = Array.from(toolContent.children);
        let currentDetails = null;
        
        children.forEach(child => {
            // Si es un H4 (título), creamos la etiqueta <details>
            if (child.tagName === 'H4') {
                currentDetails = document.createElement('details');
                currentDetails.className = 'ux-details';
                
                const summary = document.createElement('summary');
                summary.innerText = child.innerText;
                currentDetails.appendChild(summary);
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'ux-details-content';
                currentDetails.appendChild(contentDiv);
                
                // Insertar el details antes del H4 y borrar el H4 original
                toolContent.insertBefore(currentDetails, child);
                child.remove();
            } 
            // Si es un botón, lo metemos dentro del contentDiv del details actual
            else {
                if (currentDetails) {
                    const contentDiv = currentDetails.querySelector('.ux-details-content');
                    contentDiv.appendChild(child);
                }
            }
        });
        
        // Si hay botones sueltos al inicio (sin H4), los metemos en un details general
        const looseButtons = Array.from(toolContent.children).filter(c => c.classList.contains('tool-card') || c.classList.contains('matrix-container'));
        if (looseButtons.length > 0) {
             const generalDetails = document.createElement('details');
             generalDetails.className = 'ux-details';
             generalDetails.open = true; // Abierto por defecto
             generalDetails.innerHTML = `
                <summary>Herramientas Base</summary>
                <div class="ux-details-content"></div>
             `;
             const contentDiv = generalDetails.querySelector('.ux-details-content');
             looseButtons.forEach(btn => contentDiv.appendChild(btn));
             toolContent.insertBefore(generalDetails, toolContent.firstChild);
        }
    });
});