// ================= MOTOR DE COMPONENTES v33.0 =================
(function() {
    "use strict";

    // Función auxiliar para arrastrar (Usa la función global de tu app)
    function makeDraggable(el) {
        if (typeof hacerArrastrable === 'function') {
            hacerArrastrable(el);
        }
    }

    // --- CONSTRUCTORES DE TABLEROS ---
    function crearTableroHexagono() {
        const board = document.createElement('div');
        board.className = 'canvas-element board-hexagono';
        board.style.left = '100px'; board.style.top = '100px';
        
        // Distribución de 19 hexágonos (3-4-5-4-3)
        const filas = [3, 4, 5, 4, 3];
        const tipos = ['bosque', 'trigo', 'oveja', 'ladrillo', 'montana', 'desierto'];
        
        let count = 0;
        filas.forEach(cant => {
            const row = document.createElement('div');
            row.className = 'hex-row';
            for(let i=0; i<cant; i++) {
                const hex = document.createElement('div');
                const tipo = tipos[count % tipos.length];
                hex.className = `hex-tile hex-${tipo}`;
                hex.innerText = tipo.charAt(0).toUpperCase() + tipo.slice(1);
                row.appendChild(hex);
                count++;
            }
            board.appendChild(row);
        });
        
        document.getElementById('canvas').appendChild(board);
        makeDraggable(board);
        if(typeof showToast === 'function') showToast("Tablero Hexagonal insertado", "success");
    }

    function crearTableroMapa() {
        const board = document.createElement('div');
        board.className = 'canvas-element board-mapa';
        board.style.left = '100px'; board.style.top = '100px';
        
        // Un SVG simple simulando un mapa con nodos
        board.innerHTML = `
            <svg viewBox="0 0 600 350">
                <path d="M 50,150 Q 150,50 300,150 T 550,200" fill="none" class="mapa-conexion" />
                <path d="M 100,250 Q 200,300 400,250 T 500,100" fill="none" class="mapa-conexion" />
                <path d="M 200,100 Q 250,200 350,100" fill="none" class="mapa-conexion" />
                
                <circle cx="150" cy="150" r="15" class="mapa-nodo" />
                <circle cx="300" cy="150" r="15" class="mapa-nodo" />
                <circle cx="450" cy="200" r="15" class="mapa-nodo" />
                <circle cx="200" cy="300" r="15" class="mapa-nodo" />
                <circle cx="400" cy="250" r="15" class="mapa-nodo" />
                <circle cx="350" cy="100" r="15" class="mapa-nodo" />
            </svg>
        `;
        document.getElementById('canvas').appendChild(board);
        makeDraggable(board);
        if(typeof showToast === 'function') showToast("Mapa de Pandemic insertado", "success");
    }

    function crearTableroPerimetro() {
        const board = document.createElement('div');
        board.className = 'canvas-element board-perimetro';
        board.style.left = '100px'; board.style.top = '100px';
        
        // Creamos las casillas del borde (usando grid)
        // Un grid de 7x7, el centro es 2/6.
        for(let i=0; i<49; i++) {
            const row = Math.floor(i / 7);
            const col = i % 7;
            // Si es el centro, omitimos
            if (row > 0 && row < 6 && col > 0 && col < 6) continue;
            
            const casilla = document.createElement('div');
            casilla.className = 'casilla-perimetro';
            casilla.innerText = i;
            casilla.contentEditable = "true";
            board.appendChild(casilla);
        }
        
        // Centro
        const centro = document.createElement('div');
        centro.className = 'perimetro-centro';
        centro.contentEditable = "true";
        centro.innerText = "OBJETIVO COMÚN";
        board.appendChild(centro);
        
        document.getElementById('canvas').appendChild(board);
        makeDraggable(board);
        if(typeof showToast === 'function') showToast("Tablero de Perímetro insertado", "success");
    }

    // --- CONSTRUCTORES DE TOKENS ---
    function crearCubo3D(color) {
        const token = document.createElement('div');
        token.className = 'canvas-element token-cube-3d';
        token.style.setProperty('--cube-color', color);
        token.style.left = (200 + Math.random() * 100) + 'px';
        token.style.top = (200 + Math.random() * 100) + 'px';
        document.getElementById('canvas').appendChild(token);
        makeDraggable(token);
    }

    function crearMeepleCSS(color) {
        const token = document.createElement('div');
        token.className = 'canvas-element token-meeple-css';
        token.style.setProperty('--meeple-color', color);
        token.style.left = (200 + Math.random() * 100) + 'px';
        token.style.top = (200 + Math.random() * 100) + 'px';
        document.getElementById('canvas').appendChild(token);
        makeDraggable(token);
    }

    // --- EXPORTAR API ---
    window.EPComponentsEngine = {
        insertarHex: crearTableroHexagono,
        insertarMapa: crearTableroMapa,
        insertarPerimetro: crearTableroPerimetro,
        insertarCubo: function(color) { crearCubo3D(color || '#dc2626'); },
        insertarMeepleCSS: function(color) { crearMeepleCSS(color || '#8B3A3A'); }
    };
})();