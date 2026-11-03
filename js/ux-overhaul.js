// ================= REESTRUCTURACIÓN UX (v113.0) =================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TRANSFORMAR EL PANEL IZQUIERDO EN ACORDEONES
    const toolContents = document.querySelectorAll('.tool-content');
    
    toolContents.forEach(toolContent => {
        // Encontrar todos los hijos (botones y títulos h4)
        const children = Array.from(toolContent.children);
        let currentAccordion = null;
        let currentContent = null;
        
        children.forEach(child => {
            // Si es un H4 (título de sección), creamos un nuevo acordeón
            if (child.tagName === 'H4') {
                currentAccordion = document.createElement('div');
                currentAccordion.className = 'ux-accordion';
                
                const header = document.createElement('div');
                header.className = 'ux-accordion-header';
                header.innerHTML = `<span>${child.innerText}</span> <i class="fa-solid fa-chevron-down"></i>`;
                header.onclick = () => currentAccordion.classList.toggle('active');
                
                currentContent = document.createElement('div');
                currentContent.className = 'ux-accordion-content';
                
                currentAccordion.appendChild(header);
                currentAccordion.appendChild(currentContent);
                
                toolContent.insertBefore(currentAccordion, child);
                child.remove(); // Quitar el H4 original
            } 
            // Si no es H4, es un botón. Lo metemos en el acordeón actual.
            else {
                if (currentAccordion && currentContent) {
                    currentContent.appendChild(child);
                }
            }
        });
        
        // Si quedaron botones sueltos al principio (sin H4), los metemos en un acordeón general
        const firstAccordion = toolContent.querySelector('.ux-accordion');
        const looseButtons = Array.from(toolContent.children).filter(c => c !== firstAccordion && c.classList.contains('tool-card'));
        
        if (looseButtons.length > 0 && !toolContent.querySelector('.ux-accordion-header')) {
             const generalAcc = document.createElement('div');
             generalAcc.className = 'ux-accordion active';
             generalAcc.innerHTML = `
                <div class="ux-accordion-header"><span>Herramientas Base</span> <i class="fa-solid fa-chevron-down"></i></div>
                <div class="ux-accordion-content"></div>
             `;
             const accContent = generalAcc.querySelector('.ux-accordion-content');
             looseButtons.forEach(btn => accContent.appendChild(btn));
             toolContent.insertBefore(generalAcc, toolContent.firstChild);
             generalAcc.querySelector('.ux-accordion-header').onclick = () => generalAcc.classList.toggle('active');
        }
    });

    // Abrir el primer acordeón de cada pestaña por defecto
    const firstAcc = document.querySelector('.ux-accordion');
    if(firstAcc) firstAcc.classList.add('active');

    // 2. REDISEÑO DE LA NOTA ADHESIVA
    // Sobrescribimos la función global
    window.insertarNotaAdhesiva = function() {
        const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
        const wrapper = document.createElement('div'); 
        wrapper.className = 'canvas-element nota-adhesiva';
        const count = document.querySelectorAll('#canvas > .canvas-element').length;
        wrapper.style.left = (150 + (count * 30) % 400) + 'px'; 
        wrapper.style.top = (150 + (count * 30) % 300) + 'px'; 
        wrapper.innerText = 'Escribe aquí...';
        
        wrapper.setAttribute('contenteditable', 'false'); 
        wrapper.addEventListener('dblclick', () => { 
            wrapper.setAttribute('contenteditable', 'true'); 
            wrapper.focus(); 
            document.execCommand('selectAll', false, null);
        });
        wrapper.addEventListener('blur', () => { 
            wrapper.setAttribute('contenteditable', 'false'); 
            if(typeof autosave === 'function') autosave(); 
        });
        
        document.getElementById('canvas').appendChild(wrapper); 
        if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
        if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
        if(typeof showToast === 'function') showToast("Nota insertada", "success");
    };
});