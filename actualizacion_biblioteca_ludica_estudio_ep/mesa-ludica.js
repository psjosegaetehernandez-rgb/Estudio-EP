/* Estudio EP — Biblioteca lúdica incremental v1.0
   Extensión aislada: no reemplaza app.js, herramientas.js ni panel-derecho.js.
   Las mecánicas son referencias para prototipos originales. */
(function () {
  "use strict";
  if (window.EPLudoteca) return;

  const STORAGE_KEY = "ep_ludoteca_prototipos_v1";
  const CATALOG = [
    ["7 Wonders","Civilización / drafting","Drafting, desarrollo, recursos y puntuación"],
    ["Agricola","Gestión de recursos","Colocación de trabajadores, agricultura y alimentación"],
    ["Ark Nova","Construcción de motor","Cartas, objetivos y desarrollo de instalaciones"],
    ["¡Aventureros al tren!","Rutas y conexiones","Colección de cartas y construcción de rutas"],
    ["Betrayal at House on the Hill","Exploración / traidor","Exploración modular y objetivos asimétricos"],
    ["Brass: Birmingham","Economía / redes","Producción, redes y gestión económica"],
    ["Carcassonne","Colocación de losetas","Losetas, áreas conectadas y control de zonas"],
    ["Código secreto","Deducción por equipos","Pistas, asociación de palabras y equipos"],
    ["Coimbra","Eurogame / dados","Selección de dados, recursos e influencia"],
    ["Colonos de Catán","Gestión de recursos","Producción, comercio y construcción"],
    ["Dead of Winter","Supervivencia","Cooperación, objetivos personales y eventos"],
    ["Descent: Viaje a las tinieblas","Aventura táctica","Escenarios, movimiento y combate"],
    ["Dixit","Asociación creativa","Cartas ilustrativas, pistas y votación"],
    ["Dominion: Intriga","Construcción de mazos","Comprar cartas, robar, descartar y combinar efectos"],
    ["Dune: Imperium","Deck-building / colocación","Cartas, agentes, recursos y conflicto"],
    ["Exploding Kittens","Cartas / riesgo","Robo, gestión de mano y cartas de reacción"],
    ["Eldritch Horror","Aventura cooperativa","Pistas, pruebas, eventos y amenazas globales"],
    ["Feudum","Economía / roles","Gestión de recursos, roles y cadenas de acciones"],
    ["Gaia Project","Desarrollo estratégico","Facciones, tecnología y expansión"],
    ["Gloomhaven","Campaña táctica","Misiones, personajes, cartas de acción y progreso"],
    ["El Grande","Control de áreas","Mayorías, unidades y puntuación regional"],
    ["Guerra del Anillo","Conflicto asimétrico","Bandos, objetivos y avance de campaña"],
    ["Hanabi","Cooperativo / información limitada","Información parcial, pistas y secuenciación"],
    ["Juego de Tronos: el juego de tablero","Diplomacia / territorio","Alianzas, órdenes y control territorial"],
    ["King of Tokyo","Dados / combate","Tiradas, riesgo, combate y puntos"],
    ["Lords of Waterdeep","Colocación de trabajadores","Misiones, recursos y objetivos secretos"],
    ["Las Mansiones de la locura","Investigación narrativa","Escenarios, pistas y exploración"],
    ["Mysterium","Deducción cooperativa","Pistas ambiguas, interpretación y deducción"],
    ["Nemesis","Supervivencia / objetivos","Amenazas, exploración y objetivos variables"],
    ["Pandemic Legacy","Cooperación / campaña","Amenaza compartida y cambios entre partidas"],
    ["Patchwork","Colocación espacial","Piezas, espacio limitado y optimización"],
    ["Puerto Rico","Gestión económica","Roles, producción y embarque de mercancías"],
    ["Robinson Crusoe: Aventuras en la isla maldita","Supervivencia cooperativa","Recursos, eventos y objetivos de escenario"],
    ["Root","Facciones / territorio","Asimetría, control de áreas y objetivos propios"],
    ["Sherlock Holmes: Detective Asesor","Investigación deductiva","Pistas, hipótesis, rutas de investigación y casos"],
    ["Star Wars: Imperial Assault","Escaramuzas / campaña","Escenarios, unidades y objetivos asimétricos"],
    ["Through the Ages","Desarrollo de civilización","Tecnología, cultura, economía y progreso"],
    ["Tigris y Éufrates","Control de regiones","Conflictos, líderes y equilibrio de puntuaciones"],
    ["Twilight Imperium","Estrategia galáctica","Diplomacia, facciones, tecnología y control"],
    ["Twilight Struggle","Influencia / conflicto histórico","Influencia, eventos y control de regiones"],
    ["Wingspan","Construcción de motor","Cartas, combinaciones y objetivos de puntuación"]
  ].map((x, i) => ({ id: "xataka-" + (i + 1), name: x[0], family: x[1], mechanics: x[2] }));

  const $ = (s, root = document) => root.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
  const loadDrafts = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch (_) { return []; }
  };
  const saveDrafts = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  function injectStyles() {
    if ($("#ep-ludoteca-style")) return;
    const link = document.createElement("link");
    link.id = "ep-ludoteca-style";
    link.rel = "stylesheet";
    link.href = "css/mesa-ludica.css";
    document.head.appendChild(link);
  }

  function addLaunchButton() {
    if ($("#ep-ludoteca-open")) return;
    const host = $(".topbar-actions") || $(".editor-topbar") || $("header");
    if (!host) return;
    const b = document.createElement("button");
    b.id = "ep-ludoteca-open";
    b.className = "btn btn-primary";
    b.type = "button";
    b.innerHTML = "🎲 Biblioteca lúdica";
    b.addEventListener("click", openLibrary);
    host.appendChild(b);
  }

  function ensureModal() {
    if ($("#ep-ludoteca-modal")) return;
    const el = document.createElement("div");
    el.id = "ep-ludoteca-modal";
    el.className = "ep-ludoteca-overlay";
    el.innerHTML = `
      <section class="ep-ludoteca-window" role="dialog" aria-modal="true" aria-labelledby="ep-ludo-title">
        <header class="ep-ludoteca-head">
          <div><p class="ep-kicker">ESTUDIO EP · MÓDULO EXPERIMENTAL</p><h2 id="ep-ludo-title">Biblioteca lúdica</h2>
          <p class="ep-muted">Referencias de mecánicas para diseñar juegos originales.</p></div>
          <button type="button" class="ep-close" aria-label="Cerrar">×</button>
        </header>
        <nav class="ep-ludo-tabs">
          <button data-tab="catalog" class="active">Catálogo</button>
          <button data-tab="drafts">Mis prototipos</button>
        </nav>
        <div class="ep-ludo-body">
          <section id="ep-ludo-catalog">
            <div class="ep-ludo-filters">
              <input id="ep-ludo-search" type="search" placeholder="Buscar juego o mecánica…" aria-label="Buscar"/>
              <select id="ep-ludo-family" aria-label="Filtrar por familia"><option value="">Todas las familias</option></select>
            </div>
            <p class="ep-muted ep-count" id="ep-ludo-count"></p>
            <div class="ep-ludo-grid" id="ep-ludo-grid"></div>
          </section>
          <section id="ep-ludo-drafts" hidden>
            <div id="ep-ludo-draft-list"></div>
          </section>
          <section id="ep-ludo-detail" hidden></section>
          <section id="ep-ludo-play" hidden></section>
        </div>
        <footer class="ep-ludo-footer"><span>Los títulos son referencias de catálogo; crea componentes, textos y arte propios.</span>
          <button type="button" class="ep-secondary" id="ep-ludo-close">Cerrar</button></footer>
      </section>`;
    document.body.appendChild(el);
    el.querySelector(".ep-close").addEventListener("click", closeLibrary);
    $("#ep-ludo-close", el).addEventListener("click", closeLibrary);
    el.addEventListener("click", e => { if (e.target === el) closeLibrary(); });
    el.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
    $("#ep-ludo-search", el).addEventListener("input", renderCatalog);
    $("#ep-ludo-family", el).addEventListener("change", renderCatalog);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLibrary(); });
  }

  function openLibrary() {
    injectStyles(); ensureModal(); addLaunchButton();
    $("#ep-ludoteca-modal").classList.add("open");
    populateFamilies(); renderCatalog(); renderDrafts(); showTab("catalog");
  }
  function closeLibrary() {
    const el = $("#ep-ludoteca-modal");
    if (el) el.classList.remove("open");
  }
  function showTab(tab) {
    const modal = $("#ep-ludoteca-modal");
    if (!modal) return;
    modal.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    $("#ep-ludo-catalog", modal).hidden = tab !== "catalog";
    $("#ep-ludo-drafts", modal).hidden = tab !== "drafts";
    $("#ep-ludo-detail", modal).hidden = true;
    $("#ep-ludo-play", modal).hidden = true;
  }
  function populateFamilies() {
    const select = $("#ep-ludo-family");
    if (!select || select.options.length > 1) return;
    [...new Set(CATALOG.map(g => g.family))].sort().forEach(f => {
      const o = document.createElement("option"); o.value = f; o.textContent = f; select.appendChild(o);
    });
  }
  function renderCatalog() {
    const q = ($("#ep-ludo-search")?.value || "").toLowerCase().trim();
    const family = $("#ep-ludo-family")?.value || "";
    const rows = CATALOG.filter(g => (!family || g.family === family) &&
      (!q || (g.name + " " + g.family + " " + g.mechanics).toLowerCase().includes(q)));
    $("#ep-ludo-count").textContent = `${rows.length} referencias disponibles`;
    $("#ep-ludo-grid").innerHTML = rows.map(g => `
      <article class="ep-game-card">
        <div class="ep-game-symbol">🎲</div><div class="ep-game-family">${esc(g.family)}</div>
        <h3>${esc(g.name)}</h3><p>${esc(g.mechanics)}</p>
        <button class="ep-primary" data-design="${esc(g.id)}">Crear prototipo</button>
        <button class="ep-secondary" data-play="${esc(g.id)}">Probar modo digital</button>
      </article>`).join("") || '<p class="ep-muted">No hay coincidencias. Prueba otra búsqueda.</p>';
    $("#ep-ludo-grid").querySelectorAll("[data-design]").forEach(b => b.addEventListener("click", () => openDraftForm(CATALOG.find(g => g.id === b.dataset.design))));
    $("#ep-ludo-grid").querySelectorAll("[data-play]").forEach(b => b.addEventListener("click", () => openPlay(CATALOG.find(g => g.id === b.dataset.play))));
  }

  function openDraftForm(game, existing) {
    const draft = existing || {
      id: "draft-" + Date.now(), title: "Mi juego original", referenceId: game.id,
      reference: game.name, family: game.family, mechanics: game.mechanics,
      players: 2, duration: 30, objective: "", rules: "", components: "Tablero, cartas, fichas y reglamento",
      updatedAt: new Date().toISOString()
    };
    const detail = $("#ep-ludo-detail");
    detail.hidden = false; $("#ep-ludo-catalog").hidden = true; $("#ep-ludo-drafts").hidden = true; $("#ep-ludo-play").hidden = true;
    detail.innerHTML = `
      <button class="ep-back" id="ep-ludo-back">← Volver al catálogo</button>
      <h3>${existing ? "Editar prototipo" : "Nuevo prototipo original"}</h3>
      <p class="ep-muted">Referencia mecánica: ${esc(game.name)}. Cambia el tema, los nombres, el arte y las reglas para crear tu propio juego.</p>
      <form id="ep-ludo-form" class="ep-ludo-form">
        <label>Nombre del juego<input name="title" required maxlength="100" value="${esc(draft.title)}"></label>
        <div class="ep-form-row"><label>Jugadores<input name="players" type="number" min="1" max="12" value="${Number(draft.players)||2}"></label>
        <label>Duración estimada (minutos)<input name="duration" type="number" min="5" max="600" value="${Number(draft.duration)||30}"></label></div>
        <label>Objetivo del juego<textarea name="objective" rows="2" placeholder="¿Qué deben lograr los jugadores?">${esc(draft.objective)}</textarea></label>
        <label>Mecánicas de referencia<input name="mechanics" value="${esc(draft.mechanics)}"></label>
        <label>Componentes previstos<textarea name="components" rows="2">${esc(draft.components)}</textarea></label>
        <label>Reglas iniciales<textarea name="rules" rows="5" placeholder="Preparación, turno, acciones, puntuación y final de partida">${esc(draft.rules)}</textarea></label>
        <div class="ep-actions"><button class="ep-primary" type="submit">Guardar prototipo</button>
        <button class="ep-secondary" type="button" id="ep-ludo-print">Preparar impresión</button>
        <button class="ep-secondary" type="button" id="ep-ludo-export">Exportar JSON</button></div>
      </form>`;
    $("#ep-ludo-back").addEventListener("click", () => { detail.hidden = true; $("#ep-ludo-catalog").hidden = false; });
    $("#ep-ludo-form").addEventListener("submit", e => {
      e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const item = {...draft, ...data, players: Number(data.players), duration: Number(data.duration), updatedAt: new Date().toISOString()};
      const all = loadDrafts(); const idx = all.findIndex(x => x.id === item.id);
      if (idx >= 0) all[idx] = item; else all.unshift(item);
      saveDrafts(all); renderDrafts(); notify("Prototipo guardado en este navegador.");
      openDraftForm(game, item);
    });
    $("#ep-ludo-print").addEventListener("click", () => {
      const data = Object.fromEntries(new FormData($("#ep-ludo-form")).entries());
      printPrototype({...draft, ...data, players: Number(data.players), duration: Number(data.duration)});
    });
    $("#ep-ludo-export").addEventListener("click", () => {
      const data = Object.fromEntries(new FormData($("#ep-ludo-form")).entries());
      downloadJSON({...draft, ...data, players: Number(data.players), duration: Number(data.duration)});
    });
  }

  function renderDrafts() {
    const list = $("#ep-ludo-draft-list"); if (!list) return;
    const drafts = loadDrafts();
    list.innerHTML = drafts.length ? drafts.map(d => `
      <article class="ep-draft-row"><div><h3>${esc(d.title)}</h3><p>${esc(d.family)} · ${esc(d.players)} jugadores · ${esc(d.duration)} min</p></div>
      <div class="ep-actions"><button class="ep-secondary" data-edit="${esc(d.id)}">Editar</button><button class="ep-secondary" data-print="${esc(d.id)}">Imprimir</button><button class="ep-danger" data-delete="${esc(d.id)}">Eliminar</button></div></article>`).join("") : '<p class="ep-muted">Todavía no has guardado prototipos.</p>';
    list.querySelectorAll("[data-edit]").forEach(b => {
      b.addEventListener("click", () => { const d = loadDrafts().find(x => x.id === b.dataset.edit); const g = CATALOG.find(x => x.id === d.referenceId) || {name:d.reference, id:d.referenceId, family:d.family, mechanics:d.mechanics}; openDraftForm(g,d); });
    });
    list.querySelectorAll("[data-print]").forEach(b => b.addEventListener("click", () => { const d=loadDrafts().find(x=>x.id===b.dataset.print); if(d) printPrototype(d); }));
    list.querySelectorAll("[data-delete]").forEach(b => b.addEventListener("click", () => {
      if (!confirm("¿Eliminar este prototipo guardado?")) return;
      saveDrafts(loadDrafts().filter(x=>x.id!==b.dataset.delete)); renderDrafts();
    }));
  }

  function openPlay(game) {
    const play = $("#ep-ludo-play");
    $("#ep-ludo-catalog").hidden = true; $("#ep-ludo-drafts").hidden = true; $("#ep-ludo-detail").hidden = true; play.hidden = false;
    const state = { game, count: 2, turn: 0, rounds: 1, players: [], log: [] };
    const draw = () => {
      play.innerHTML = `
        <button class="ep-back" id="ep-play-back">← Volver al catálogo</button>
        <h3>Prueba digital: ${esc(game.name)}</h3>
        <p class="ep-muted">Prototipo de turno genérico para probar el flujo de juego; todavía no aplica las reglas comerciales específicas de esta referencia.</p>
        <div class="ep-play-setup"><label>Jugadores<select id="ep-play-count"><option>2</option><option>3</option><option>4</option></select></label><button class="ep-primary" id="ep-play-start">Iniciar partida de prueba</button></div>
        ${state.players.length ? `<div class="ep-score-grid">${state.players.map((p,i)=>`<article class="ep-score ${i===state.turn?'current':''}"><strong>${esc(p.name)}</strong><span>${p.points} puntos</span><small>${p.resources} recursos</small></article>`).join("")}</div>
        <div class="ep-play-actions"><button class="ep-primary" id="ep-play-roll">🎲 Tirar dado</button><button class="ep-secondary" id="ep-play-resource">+1 recurso</button><button class="ep-secondary" id="ep-play-point">+1 punto</button><button class="ep-primary" id="ep-play-next">Finalizar turno →</button></div>
        <p class="ep-muted">Ronda ${state.rounds} · Turno de ${esc(state.players[state.turn]?.name || "—")}</p>
        <ol class="ep-log">${state.log.slice(-12).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
        <button class="ep-secondary" id="ep-play-reset">Reiniciar prueba</button>` : ""}
      `;
      $("#ep-play-back").addEventListener("click",()=>{play.hidden=true;$("#ep-ludo-catalog").hidden=false;});
      $("#ep-play-start").addEventListener("click",()=>{
        state.count=Number($("#ep-play-count").value); state.turn=0; state.rounds=1;
        state.players=Array.from({length:state.count},(_,i)=>({name:"Jugador "+(i+1),points:0,resources:2}));
        state.log=["Partida de prueba iniciada."]; draw();
      });
      if (!state.players.length) return;
      $("#ep-play-roll").addEventListener("click",()=>{const n=1+Math.floor(Math.random()*6);state.log.push(`${state.players[state.turn].name} obtuvo ${n} en el dado.`);draw();});
      $("#ep-play-resource").addEventListener("click",()=>{state.players[state.turn].resources++;state.log.push(`${state.players[state.turn].name} obtiene 1 recurso.`);draw();});
      $("#ep-play-point").addEventListener("click",()=>{state.players[state.turn].points++;state.log.push(`${state.players[state.turn].name} suma 1 punto.`);draw();});
      $("#ep-play-next").addEventListener("click",()=>{state.turn++;if(state.turn>=state.players.length){state.turn=0;state.rounds++;}state.log.push(`Comienza el turno de ${state.players[state.turn].name}.`);draw();});
      $("#ep-play-reset").addEventListener("click",()=>{state.players=[];state.log=[];state.turn=0;state.rounds=1;draw();});
    };
    draw();
  }

  function printPrototype(d) {
    const win = window.open("", "_blank");
    if (!win) { notify("El navegador bloqueó la ventana de impresión. Permite ventanas emergentes e inténtalo de nuevo."); return; }
    win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(d.title)}</title>
      <style>body{font:14px Arial,sans-serif;color:#111;margin:18mm}h1{font-size:26px}h2{font-size:17px;margin-top:24px}.meta{color:#555}.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8mm;margin-top:12mm}.card{border:1px solid #222;border-radius:4mm;min-height:45mm;padding:6mm;break-inside:avoid}.blank{height:25mm;border-bottom:1px dashed #aaa;margin:5mm 0}@media print{button{display:none}.pagebreak{break-before:page}}</style></head><body>
      <h1>${esc(d.title)}</h1><p class="meta">Prototipo original · ${esc(d.players)} jugadores · ${esc(d.duration)} minutos</p>
      <h2>Objetivo</h2><p>${esc(d.objective || "Pendiente de definir.")}</p><h2>Mecánicas</h2><p>${esc(d.mechanics)}</p>
      <h2>Componentes</h2><p>${esc(d.components || "Pendiente de definir.")}</p><h2>Reglas</h2><p style="white-space:pre-wrap">${esc(d.rules || "Pendiente de definir.")}</p>
      <div class="pagebreak"></div><h2>Cartas y fichas — hoja de prototipado</h2><div class="card-grid">${Array.from({length:9},(_,i)=>`<div class="card"><strong>Componente ${i+1}</strong><div class="blank"></div><small>Nombre / efecto / coste</small></div>`).join("")}</div>
      <p class="meta">Hoja de trabajo para prototipado. Ajusta escala y márgenes en el diálogo de impresión.</p><script>window.onload=()=>window.print();</script></body></html>`);
    win.document.close();
  }
  function downloadJSON(data) {
    const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=(data.title||"prototipo").replace(/[\\/:*?"<>|]+/g,"_")+".json"; a.click(); URL.revokeObjectURL(a.href);
  }
  function notify(message) {
    if (typeof window.showToast === "function") { window.showToast(message, "success"); return; }
    const n=document.createElement("div");n.className="ep-ludo-notice";n.textContent=message;document.body.appendChild(n);setTimeout(()=>n.remove(),3200);
  }

  window.EPLudoteca = { catalog: CATALOG, open: openLibrary, version: "1.0" };
  function init() { injectStyles(); addLaunchButton(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  // Algunos proyectos renderizan la barra superior después de cargar el DOM.
  setTimeout(addLaunchButton, 800);
})();