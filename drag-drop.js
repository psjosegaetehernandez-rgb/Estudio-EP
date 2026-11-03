function hacerArrastrable(el) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    el.addEventListener('mousedown', (e) => {
        if(e.target.isContentEditable || e.target.tagName.toLowerCase() === 'textarea' || e.target.closest('.btn')) return;
        isDragging = true;
        el.classList.add('dragging');
        document.querySelectorAll('.canvas-element, .doc-element').forEach(c => c.style.zIndex = 2);
        el.style.zIndex = 100;
        if(typeof seleccionarElemento === 'function') seleccionarElemento(el);
        startX = e.clientX; startY = e.clientY;
        initialLeft = el.offsetLeft; initialTop = el.offsetTop;
        e.preventDefault(); 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX; const dy = e.clientY - startY;
        let newLeft = initialLeft + dx; let newTop = initialTop + dy;
        if(newLeft < 0) newLeft = 0; if(newTop < 0) newTop = 0;
        el.style.left = `${newLeft}px`; el.style.top = `${newTop}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            el.classList.remove('dragging');
            if(typeof autosave === 'function') autosave();
        }
    });
}