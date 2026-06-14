// State
let tables = [];
let positionsCache = {}; // table_name -> {x, y}

// Examples
const EXAMPLES = {
  ecommerce: `## clientes
- id int PK
- nombre varchar(100)
- email varchar(150)
- creado_en timestamp

## pedidos
- id int PK
- cliente_id int FK -> clientes.id
- fecha date
- total decimal(10,2)
- estado varchar(50)

## items_pedido
- id int PK
- pedido_id int FK -> pedidos.id
- producto_id int FK -> productos.id
- cantidad int
- precio_unitario decimal(10,2)

## productos
- id int PK
- nombre varchar(100)
- precio decimal(10,2)
- stock int`,

  tasks: `## usuarios
- id int PK
- nombre varchar(100)
- email varchar(150)

## proyectos
- id int PK
- nombre varchar(100)
- creador_id int FK -> usuarios.id

## tareas
- id int PK
- proyecto_id int FK -> proyectos.id
- responsable_id int FK -> usuarios.id
- titulo varchar(200)
- estado varchar(50)
- fecha_limite date`,

  social: `## usuarios
- id int PK
- username varchar(50)
- password varchar(255)
- email varchar(100)

## publicaciones
- id int PK
- usuario_id int FK -> usuarios.id
- contenido text
- fecha_creacion timestamp

## comentarios
- id int PK
- publicacion_id int FK -> publicaciones.id
- usuario_id int FK -> usuarios.id
- texto varchar(500)

## seguidores
- id int PK
- seguidor_id int FK -> usuarios.id
- seguido_id int FK -> usuarios.id`
};

// DOM Elements
const markdownTextarea = document.getElementById('markdownTextarea');
const templateList = document.getElementById('templateList');
const loadInitialExampleBtn = document.getElementById('loadInitialExampleBtn');

const welcomeState = document.getElementById('welcomeState');
const canvasShell = document.getElementById('canvasShell');
const canvas = document.getElementById('canvas');
const connectorLayer = document.getElementById('connectorLayer');

const exportSqlBtn = document.getElementById('exportSqlBtn');
const sqlDrawer = document.getElementById('sqlDrawer');
const closeSqlBtn = document.getElementById('closeSqlBtn');
const sqlCodeArea = document.getElementById('sqlCodeArea');
const copySqlBtn = document.getElementById('copySqlBtn');

// Toolbar buttons
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const helpBtn = document.getElementById('helpBtn');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const helpOverlay = document.getElementById('helpOverlay');

// Initialize
function init() {
  // Load cached positions
  const savedPos = localStorage.getItem('erd_positions');
  if (savedPos) {
    positionsCache = JSON.parse(savedPos);
  }

  const savedMd = localStorage.getItem('erd_md');
  if (savedMd) {
    markdownTextarea.value = savedMd;
    parseMarkdown(savedMd);
    showView('canvas');
  } else {
    showView('welcome');
  }

  // Theme Init
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

  setupListeners();
}

function showView(view) {
  if (view === 'welcome') {
    welcomeState.hidden = false;
    canvasShell.hidden = true;
  } else {
    welcomeState.hidden = true;
    canvasShell.hidden = false;
    renderERD();
  }
}

// Setup Event Listeners
function setupListeners() {
  // Markdown Input
  markdownTextarea.addEventListener('input', (e) => {
    const text = e.target.value;
    localStorage.setItem('erd_md', text);
    parseMarkdown(text);
    if (tables.length > 0) {
      showView('canvas');
    } else {
      showView('welcome');
    }
  });

  // Example Buttons
  templateList.addEventListener('click', (e) => {
    const btn = e.target.closest('.template');
    if (!btn) return;
    const key = btn.getAttribute('data-example');
    loadExample(key);
  });
  
  loadInitialExampleBtn.addEventListener('click', () => loadExample('ecommerce'));

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeToggleBtn.innerText = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  });

  // Help Modal
  helpBtn.addEventListener('click', () => helpOverlay.classList.add('active'));
  closeHelpBtn.addEventListener('click', () => helpOverlay.classList.remove('active'));
  helpOverlay.addEventListener('click', (e) => {
    if (e.target === helpOverlay) helpOverlay.classList.remove('active');
  });

  // Save/Load/Clear
  saveBtn.addEventListener('click', () => {
    localStorage.setItem('erd_md', markdownTextarea.value);
    localStorage.setItem('erd_positions', JSON.stringify(positionsCache));
    alert('Esquema guardado localmente.');
  });

  loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('erd_md');
    if (saved) {
      markdownTextarea.value = saved;
      const savedPos = localStorage.getItem('erd_positions');
      if (savedPos) positionsCache = JSON.parse(savedPos);
      parseMarkdown(saved);
      showView('canvas');
    } else {
      alert('No hay esquema guardado.');
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('¿Vaciar el esquema actual?')) {
      markdownTextarea.value = '';
      tables = [];
      localStorage.removeItem('erd_md');
      localStorage.removeItem('erd_positions');
      positionsCache = {};
      sqlDrawer.classList.remove('active');
      showView('welcome');
    }
  });

  // SQL Exporter Drawer
  exportSqlBtn.addEventListener('click', () => {
    if (tables.length === 0) {
      alert('Definí al menos una tabla primero.');
      return;
    }
    generateSQL();
    sqlDrawer.classList.add('active');
  });

  closeSqlBtn.addEventListener('click', () => sqlDrawer.classList.remove('active'));
  
  copySqlBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(sqlCodeArea.value);
    const originalText = copySqlBtn.innerText;
    copySqlBtn.innerText = '¡Copiado con éxito!';
    setTimeout(() => {
      copySqlBtn.innerText = originalText;
    }, 1500);
  });

  // Re-draw connections on scroll
  canvasShell.addEventListener('scroll', drawConnections);
}

function loadExample(key) {
  const md = EXAMPLES[key];
  if (md) {
    markdownTextarea.value = md;
    localStorage.setItem('erd_md', md);
    parseMarkdown(md);
    showView('canvas');
  }
}

// Markdown Parser
function parseMarkdown(md) {
  tables = [];
  const lines = md.split('\n');
  let currentTable = null;

  lines.forEach((line) => {
    const clean = line.trim();
    if (!clean) return;

    // Table Header match
    if (clean.startsWith('##') || clean.startsWith('#')) {
      const name = clean.replace(/^#+\s*/, '').toLowerCase();
      currentTable = {
        name,
        columns: [],
        x: positionsCache[name]?.x || 0,
        y: positionsCache[name]?.y || 0
      };
      tables.push(currentTable);
      return;
    }

    // Column List Match
    if (currentTable && (clean.startsWith('- ') || clean.startsWith('* '))) {
      const colStr = clean.substring(2).trim();
      
      // Parse PK
      const isPK = /\bPK\b/i.test(colStr);
      
      // Parse FK -> targetTable.targetCol
      const fkMatch = colStr.match(/\bFK\s*->\s*([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/i);
      const isFK = !!fkMatch;
      const fkRef = isFK ? { table: fkMatch[1].toLowerCase(), column: fkMatch[2].toLowerCase() } : null;

      // Extract raw column details (exclude PK/FK references)
      let detail = colStr.replace(/\bPK\b/gi, '').trim();
      if (isFK) {
        detail = detail.substring(0, detail.indexOf(fkMatch[0])).trim();
      }

      // Extract column name and type
      const parts = detail.split(/\s+/);
      const name = parts[0];
      const type = parts.slice(1).join(' ') || 'int'; // default datatype to int if omitted

      currentTable.columns.push({
        name,
        type,
        isPK,
        isFK,
        fkRef
      });
    }
  });

  // Assign grid layout coordinates to tables that don't have cached positions
  let gridIndex = 0;
  tables.forEach(t => {
    if (t.x === 0 && t.y === 0) {
      t.x = 40 + (gridIndex % 3) * 280;
      t.y = 40 + Math.floor(gridIndex / 3) * 340;
      gridIndex++;
    }
  });
}

// Render Table Cards and Drag Handles
function renderERD() {
  // Clear existing cards
  canvas.querySelectorAll('.table-card').forEach(card => card.remove());

  tables.forEach((table) => {
    const card = document.createElement('div');
    card.className = 'table-card';
    card.id = `table-card-${table.name}`;
    card.style.left = `${table.x}px`;
    card.style.top = `${table.y}px`;

    // Card Title Bar
    const header = document.createElement('div');
    header.className = 'table-header';
    header.innerHTML = `<span>${table.name}</span>`;
    card.appendChild(header);

    // Columns Body
    const body = document.createElement('div');
    body.className = 'table-body';

    table.columns.forEach((col) => {
      const row = document.createElement('div');
      row.className = 'col-row';

      let keyBadge = '';
      if (col.isPK) keyBadge = '<span class="key-badge pk">PK</span>';
      else if (col.isFK) keyBadge = '<span class="key-badge fk">FK</span>';

      row.innerHTML = `
        <div class="col-name-container">
          ${keyBadge}
          <span style="${col.isPK ? 'font-weight: 700;' : ''}">${col.name}</span>
        </div>
        <div class="col-type">${col.type}</div>
      `;
      body.appendChild(row);
    });

    card.appendChild(body);
    canvas.appendChild(card);

    // Table drag setup
    setupCardDragging(card, header, table);
  });

  // Draw connectors
  setTimeout(drawConnections, 100);
}

// Interactive Card Drag Handlers
function setupCardDragging(card, header, table) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let originalX = 0;
  let originalY = 0;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    originalX = parseFloat(card.style.left) || table.x;
    originalY = parseFloat(card.style.top) || table.y;

    // Bring card to front
    document.querySelectorAll('.table-card').forEach(c => c.style.zIndex = 10);
    card.style.zIndex = 20;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newX = originalX + deltaX;
    let newY = originalY + deltaY;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;

    card.style.left = `${newX}px`;
    card.style.top = `${newY}px`;

    // Save live position to model
    table.x = newX;
    table.y = newY;

    // Redraw SVG connections live
    drawConnections();
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Save position in cache
    positionsCache[table.name] = { x: table.x, y: table.y };
    localStorage.setItem('erd_positions', JSON.stringify(positionsCache));
  }
}

// Draw Relationship Connections (SVG Crow's Foot)
function drawConnections() {
  // Clear paths
  canvas.querySelectorAll('.erd-link').forEach(p => p.remove());

  tables.forEach((childTable) => {
    childTable.columns.forEach((col) => {
      if (!col.isFK || !col.fkRef) return;

      const parentTable = tables.find(t => t.name === col.fkRef.table);
      if (!parentTable) return;

      const parentCard = document.getElementById(`table-card-${parentTable.name}`);
      const childCard = document.getElementById(`table-card-${childTable.name}`);

      if (!parentCard || !childCard) return;

      const parentRect = {
        left: parentTable.x,
        top: parentTable.y,
        width: parentCard.offsetWidth,
        height: parentCard.offsetHeight
      };

      const childRect = {
        left: childTable.x,
        top: childTable.y,
        width: childCard.offsetWidth,
        height: childCard.offsetHeight
      };

      // Calculate connection sides based on horizontal positioning
      let startX, startY, endX, endY;
      let parentSide = 'right';
      let childSide = 'left';

      if (parentRect.left + parentRect.width < childRect.left) {
        // Parent is on the Left of Child
        startX = parentRect.left + parentRect.width;
        startY = parentRect.top + parentRect.height / 2;
        endX = childRect.left;
        endY = childRect.top + childRect.height / 2;
        parentSide = 'right';
        childSide = 'left';
      } else if (childRect.left + childRect.width < parentRect.left) {
        // Parent is on the Right of Child
        startX = parentRect.left;
        startY = parentRect.top + parentRect.height / 2;
        endX = childRect.left + childRect.width;
        endY = childRect.top + childRect.height / 2;
        parentSide = 'left';
        childSide = 'right';
      } else {
        // Overlapping horizontally, connect via closest top/bottom or just default right-left
        startX = parentRect.left + parentRect.width / 2;
        startY = parentRect.top + parentRect.height;
        endX = childRect.left + childRect.width / 2;
        endY = childRect.top;
      }

      // Draw connection path (orthogonal line)
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.className.baseVal = 'erd-link';

      // Intermediate offsets for clean routing
      let pathD = '';
      if (Math.abs(startY - endY) < 10) {
        // Near-straight line
        pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
      } else {
        // Z-bend line
        const midX = startX + (endX - startX) / 2;
        pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
      }

      path.setAttribute('d', pathD);
      
      // Marker attachments: 
      // Parent PK side (one): marker-start
      // Child FK side (many): marker-end
      // If parent is on the left, line goes startX -> endX. Start is Parent, End is Child.
      // If we use marker-start and marker-end, we must adjust marker direction orientation or order:
      // SVG marker-start points in opposite direction of path. Let's orient them correctly.
      path.setAttribute('marker-start', 'url(#crowsfoot-one)');
      path.setAttribute('marker-end', 'url(#crowsfoot-many)');

      connectorLayer.appendChild(path);
    });
  });
}

// Generate SQL DDL
function generateSQL() {
  let sql = `-- Script SQL DDL Generado por ERD Database Studio\n`;
  sql += `-- Fecha: ${new Date().toLocaleDateString()}\n\n`;

  // 1. Create Tables
  tables.forEach((table) => {
    sql += `CREATE TABLE ${table.name} (\n`;
    
    const colStrings = table.columns.map((col) => {
      let str = `  ${col.name} ${col.type.toUpperCase()}`;
      if (col.isPK) {
        str += ` PRIMARY KEY`;
      }
      return str;
    });

    sql += colStrings.join(',\n');
    sql += `\n);\n\n`;
  });

  // 2. Add Foreign Keys (Alter Tables)
  let fkCount = 0;
  tables.forEach((table) => {
    table.columns.forEach((col) => {
      if (col.isFK && col.fkRef) {
        fkCount++;
        sql += `ALTER TABLE ${table.name}\n`;
        sql += `  ADD CONSTRAINT fk_${table.name}_${col.name}\n`;
        sql += `  FOREIGN KEY (${col.name}) REFERENCES ${col.fkRef.table}(${col.fkRef.column});\n\n`;
      }
    });
  });

  if (fkCount === 0) {
    sql += `-- No se detectaron llaves foráneas para relacionar las tablas.\n`;
  }

  sqlCodeArea.value = sql;
}

// Start everything
window.addEventListener('DOMContentLoaded', init);
