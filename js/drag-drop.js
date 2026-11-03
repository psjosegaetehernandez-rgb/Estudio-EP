function hacerArrastrable(el) {
    let isDragging = false, startX, startY, initialLeft, initialTop;
    el.addEventListener('mousedown', (e) => {
        if(e.target.getAttribute('contenteditable') === 'true' || e.target.closest('.btn') || e.target.tagName === 'INPUT') return;
        isDragging = true; el.classList.add('dragging');
        document.querySelectorAll('.canvas-element, .doc-element').forEach(c => c.style.zIndex = 2);
        el.style.zIndex = 100;
        if(typeof seleccionarElemento === 'function') { try { seleccionarElemento(el); } catch (err) { console.error("Error al abrir propiedades:", err); } }
        startX = e.clientX; startY = e.clientY; initialLeft = el.offsetLeft; initialTop = el.offsetTop; e.preventDefault(); 
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newLeft = initialLeft + (e.clientX - startX); let newTop = initialTop + (e.clientY - startY);
        if(newLeft < 0) newLeft = 0; if(newTop < 0) newTop = 0;
        if (!el.classList.contains('token-wrapper')) { newLeft = Math.round(newLeft / 20) * 20; newTop = Math.round(newTop / 20) * 20; }
        el.style.left = `${newLeft}px`; el.style.top = `${newTop}px`;
    });
    document.addEventListener('mouseup', () => {
        if (isDragging) { isDragging = false; el.classList.remove('dragging'); if(typeof autosave === 'function') autosave(); }
    });
}