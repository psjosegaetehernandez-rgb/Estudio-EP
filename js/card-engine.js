window.EP = window.EP || {};

EP.wrapIn3D = function(frontHtml, backHtml, ancho, alto) {
    return `
        <div class="carta-container" style="width: ${ancho}px; height: ${alto}px;">
            <div class="carta-inner">
                <div class="carta-front">${frontHtml}</div>
                <div class="carta-back" style="display:flex; align-items:center; justify-content:center;">${backHtml}</div>
            </div>
        </div>
    `;
};

EP.insertarCartaEnCanvas = function(html, ancho, alto, posX, posY) {
    const hint = document.getElementById('canvas-hint'); if(hint) hint.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element';
    
    if (posX !== undefined && posY !== undefined) {
        wrapper.style.left = posX + 'px'; wrapper.style.top = posY + 'px';
    } else {
        const count = document.querySelectorAll('#canvas > .canvas-element').length;
        wrapper.style.left = (60 + (count % 4) * (ancho + 20)) + 'px';
        wrapper.style.top = (60 + Math.floor(count / 4) * (alto + 20)) + 'px';
    }
    
    wrapper.innerHTML = html;
    document.getElementById('canvas').appendChild(wrapper);
    if(typeof hacerArrastrable === 'function') hacerArrastrable(wrapper);
    if(typeof seleccionarElemento === 'function') seleccionarElemento(wrapper);
    return wrapper;
};