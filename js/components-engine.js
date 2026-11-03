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

    // --- TABLEROS FALTANTES (v101.0) ---
    
    function crearTableroPerimetro() {
        const board = document.createElement('div');
        board.className = 'canvas-element board-perimetro';
        board.style.left = '100px'; board.style.top = '100px';
        
        // Crear las 24 casillas del perímetro para un grid 7x7
        for(let i=0; i<49; i++) {
            const row = Math.floor(i / 7);
            const col = i % 7;
            if (row > 0 && row < 6 && col > 0 && col < 6) continue; // Hueco central
            
            const casilla = document.createElement('div');
            casilla.className = 'casilla-perimetro';
            casilla.innerText = i;
            casilla.contentEditable = "true";
            board.appendChild(casilla);
        }
        
        const centro = document.createElement('div');
        centro.className = 'perimetro-centro';
        centro.contentEditable = "true";
        centro.innerText = "OBJETIVO COMÚN";
        board.appendChild(centro);
        
        document.getElementById('canvas').appendChild(board);
        makeDraggable(board);
        if(typeof showToast === 'function') showToast("Tablero de Perímetro insertado", "success");
    }

    function crearTableroCarcassonne() {
        const board = document.createElement('div');
        board.className = 'canvas-element';
        board.style.cssText = 'left: 100px; top: 100px; display: grid; grid-template-columns: repeat(4, 50px); gap: 2px; background: #333; padding: 2px; border-radius: 4px;';
        
        for(let i=0; i<16; i++) {
            const loseta = document.createElement('div');
            loseta.style.cssText = 'width: 50px; height: 50px; background: #95d5b2; position: relative; cursor: pointer;';
            // Simular caminos
            loseta.innerHTML = `<div style="position:absolute; top:50%; left:0; width:100%; height:10px; background:#d4a373; transform:translateY(-50%);"></div><div style="position:absolute; top:0; left:50%; width:10px; height:100%; background:#d4a373; transform:translateX(-50%);"></div>`;
            board.appendChild(loseta);
        }
        
        document.getElementById('canvas').appendChild(board);
        makeDraggable(board);
        if(typeof showToast === 'function') showToast("Losetas de Carcassonne insertadas", "success");
    }

    window.EPComponentsEngine.insertarPerimetro = crearTableroPerimetro;
    window.EPComponentsEngine.insertarCarcassonne = crearTableroCarcassonne;


// ================= EVENT BUS (Arquitectura v35.0) =================
// Escucha eventos para generar juegos sin acoplar el menú al motor
document.addEventListener('EP:generateGame', function(e) {
    const gameId = e.detail.gameId;
    
    if (gameId === 'catan' && typeof crearTableroHexagono === 'function') crearTableroHexagono();
    else if (gameId === 'pandemic' && typeof crearTableroMapa === 'function') crearTableroMapa();
    else if (gameId === 'perimetro' && typeof crearTableroPerimetro === 'function') crearTableroPerimetro();
    else if (gameId === 'carcassonne' && typeof crearTableroCarcassonne === 'function') crearTableroCarcassonne();
    else if (gameId === 'player-board' && typeof crearTableroJugador === 'function') crearTableroJugador();
    else if (gameId === 'mercado' && typeof crearMercado === 'function') crearMercado();
    else if (gameId === 'dial' && typeof crearDialWavelength === 'function') crearDialWavelength();
    else if (gameId === 'trivial' && typeof crearTrivial === 'function') crearTrivial();
    else if (gameId === 'grid' && typeof crearGrid === 'function') crearGrid();
    else if (gameId === 'dobble' && typeof crearDobble === 'function') crearDobble();
    
    if(typeof showToast === 'function') showToast("Juego generado vía Event Bus", "success");
});

})();