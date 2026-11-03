// ================= ASISTENTE DE TALLER (v34.0) =================

const DINAMICAS_WIZARD = {
    "diagnostico": [
        { id: "arbol", nombre: "Árbol de Problemas", desc: "Analiza las causas y efectos de un problema comunitario. Inserta el lienzo de Árbol.", icon: "fa-tree" },
        { id: "flor", nombre: "Flor de la Evaluación", desc: "Identifica los pétalos del conflicto. Inserta el lienzo de la Flor.", icon: "fa-fan" },
        { id: "dixit", nombre: "Dixit / Metáforas", desc: "Usa imágenes para expresar emociones. Inserta 10 cartas Dixit.", icon: "fa-moon" }
    ],
    "evaluacion": [
        { id: "semaforo", nombre: "Semáforo de Cierre", desc: "Evalúa qué dejamos, qué seguimos y qué empezamos. Inserta el Semáforo.", icon: "fa-traffic-light" },
        { id: "muro", nombre: "Muro de Post-its", desc: "Recoge ideas rápidas del grupo. Inserta el Muro de Post-its.", icon: "fa-note-sticky" },
        { id: "uno", nombre: "UNO de los Derechos", desc: "Usa cartas de UNO adaptadas a derechos. Inserta varias cartas.", icon: "fa-clone" }
    ],
    "accion": [
        { id: "iap", nombre: "Tablero IAP", desc: "Planifica la acción: Investigación, Acción y Participación.", icon: "fa-list-check" },
        { id: "plan", nombre: "Planificador", desc: "Diseña el guion del taller paso a paso.", icon: "fa-calendar-days" },
        { id: "matriz", nombre: "Matriz de Priorización", desc: "Decide qué problema resolver primero. Inserta la Matriz.", icon: "fa-table-list" }
    ]
};

function abrirWizard() {
    document.getElementById('modal-wizard').classList.add('active');
    actualizarWizard();
}

function actualizarWizard() {
    const objetivo = document.getElementById('wizard-objetivo').value;
    const selectDinamica = document.getElementById('wizard-dinamica');
    selectDinamica.innerHTML = '';

    DINAMICAS_WIZARD[objetivo].forEach(din => {
        const option = document.createElement('option');
        option.value = din.id;
        option.innerText = din.nombre;
        selectDinamica.appendChild(option);
    });

    selectDinamica.onchange = () => mostrarDescripcionWizard();
    mostrarDescripcionWizard();
}

function mostrarDescripcionWizard() {
    const objetivo = document.getElementById('wizard-objetivo').value;
    const dinId = document.getElementById('wizard-dinamica').value;
    const din = DINAMICAS_WIZARD[objetivo].find(d => d.id === dinId);
    
    if(din) {
        document.getElementById('wizard-desc-titulo').innerText = din.nombre;
        document.getElementById('wizard-desc-texto').innerText = din.desc;
    }
}

function generarMaterialWizard() {
    const objetivo = document.getElementById('wizard-objetivo').value;
    const dinId = document.getElementById('wizard-dinamica').value;
    
    document.getElementById('modal-wizard').classList.remove('active');
    
    // Inyectar el componente correspondiente en el canvas
    if (dinId === 'arbol' && typeof insertarArbolProblemas === 'function') insertarArbolProblemas();
    else if (dinId === 'flor' && typeof insertarFlorEvaluacion === 'function') insertarFlorEvaluacion();
    else if (dinId === 'dixit' && typeof insertarCartaDixit === 'function') {
        for(let i=0; i<5; i++) insertarCartaDixit();
    }
    else if (dinId === 'semaforo' && typeof insertarSemaforo === 'function') insertarSemaforo();
    else if (dinId === 'muro' && typeof insertarMuroPostits === 'function') insertarMuroPostits();
    else if (dinId === 'uno' && typeof insertarCartaUno === 'function') {
        for(let i=0; i<5; i++) insertarCartaUno();
    }
    else if (dinId === 'iap' && typeof insertarTableroIAP === 'function') insertarTableroIAP();
    else if (dinId === 'plan' && typeof insertarPlanificador === 'function') insertarPlanificador();
    else if (dinId === 'matriz' && typeof insertarMatrizPriorizacion === 'function') insertarMatrizPriorizacion();

    if(typeof showToast === 'function') showToast("¡Materiales generados por el Asistente!", "success");
}