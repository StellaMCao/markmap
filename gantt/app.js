// State
let tasks = [];
let zoomMode = 'days'; // days | weeks | months
let selectedTaskId = null;
let projectStart = new Date();
let projectEnd = new Date();
let totalDays = 30;

// Pixel Width Constants
const ZOOM_PIXELS = {
  days: 40,      // pixels per day
  weeks: 14,     // pixels per day (approx 100px per week)
  months: 5.3    // pixels per day (approx 160px per month)
};

// Examples
const EXAMPLES = {
  launch: `# Lanzamiento de Producto
- Planificación del Proyecto [2026-06-01 a 2026-06-05] @Ana 100%
- Estudio de Mercado [2026-06-04 a 2026-06-09] @Pedro 80%
- Diseño de Marca UI [2026-06-06 a 2026-06-12] @Marta 60% [dep: Planificación del Proyecto]
- Campaña de Marketing [2026-06-10 a 2026-06-18] @Pedro 20% [dep: Estudio de Mercado]
- Desarrollo Landing Page [2026-06-13 a 2026-06-22] @Sofía 15% [dep: Diseño de Marca UI]
- Pruebas A/B [2026-06-23 a 2026-06-27] @Sofía 0% [dep: Desarrollo Landing Page]
- Evento de Lanzamiento [2026-06-28 a 2026-06-30] @Ana 0% [dep: Campaña de Marketing]`,

  software: `# Desarrollo de App Móvil
- Definición de Requerimientos [2026-06-01 a 2026-06-05] @Carlos 100%
- Prototipado y Wireframes [2026-06-06 a 2026-06-12] @Elena 90% [dep: Definición de Requerimientos]
- Configuración de Servidores [2026-06-08 a 2026-06-12] @David 75% [dep: Definición de Requerimientos]
- Desarrollo UI Front-end [2026-06-13 a 2026-06-28] @Elena 40% [dep: Prototipado y Wireframes]
- Desarrollo Backend API [2026-06-13 a 2026-06-28] @David 50% [dep: Configuración de Servidores]
- Integración y QA [2026-06-29 a 2026-07-06] @Tomás 0% [dep: Desarrollo UI Front-end]
- Publicación en Tiendas App [2026-07-07 a 2026-07-10] @Elena 0% [dep: Integración y QA]`
};

// DOM Elements
const markdownTextarea = document.getElementById('markdownTextarea');
const templateList = document.getElementById('templateList');
const loadInitialExampleBtn = document.getElementById('loadInitialExampleBtn');

const welcomeState = document.getElementById('welcomeState');
const ganttWorkspace = document.getElementById('ganttWorkspace');

// Toolbar
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const helpBtn = document.getElementById('helpBtn');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const helpOverlay = document.getElementById('helpOverlay');

// Scale Buttons
const zoomDaysBtn = document.getElementById('zoomDaysBtn');
const zoomWeeksBtn = document.getElementById('zoomWeeksBtn');
const zoomMonthsBtn = document.getElementById('zoomMonthsBtn');

// Chart Elements
const ganttScrollable = document.getElementById('ganttScrollable');
const ganttChart = document.getElementById('ganttChart');
const ganttHeader = document.getElementById('ganttHeader');
const ganttRowsContainer = document.getElementById('ganttRowsContainer');
const ganttSvgLayer = document.getElementById('ganttSvgLayer');

// Inspector Elements
const inspectorSection = document.getElementById('inspectorSection');
const inspectTitle = document.getElementById('inspectTitle');
const inspectStart = document.getElementById('inspectStart');
const inspectEnd = document.getElementById('inspectEnd');
const inspectAssignee = document.getElementById('inspectAssignee');
const inspectProgress = document.getElementById('inspectProgress');
const inspectDep = document.getElementById('inspectDep');
const inspectUpdateBtn = document.getElementById('inspectUpdateBtn');
const inspectCloseBtn = document.getElementById('inspectCloseBtn');

// Initialize
function init() {
  const savedMd = localStorage.getItem('gantt_md');
  if (savedMd) {
    markdownTextarea.value = savedMd;
    parseMarkdown(savedMd);
    showView('chart');
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
    ganttWorkspace.hidden = true;
  } else {
    welcomeState.hidden = true;
    ganttWorkspace.hidden = false;
    renderGantt();
  }
}

// Setup Listeners
function setupListeners() {
  // Markdown Input
  markdownTextarea.addEventListener('input', (e) => {
    const text = e.target.value;
    localStorage.setItem('gantt_md', text);
    parseMarkdown(text);
    if (tasks.length > 0) {
      showView('chart');
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
  
  loadInitialExampleBtn.addEventListener('click', () => loadExample('launch'));

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

  // Toolbar Actions
  const exportFileBtn = document.getElementById('exportFileBtn');
  if (exportFileBtn) {
    exportFileBtn.addEventListener('click', () => {
      const text = markdownTextarea.value;
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'roadmap_proyecto.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('gantt_md', markdownTextarea.value);
    alert('Proyecto guardado localmente.');
  });

  loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('gantt_md');
    if (saved) {
      markdownTextarea.value = saved;
      parseMarkdown(saved);
      showView('chart');
    } else {
      alert('No hay proyecto guardado.');
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('¿Vaciar el proyecto actual?')) {
      markdownTextarea.value = '';
      tasks = [];
      localStorage.removeItem('gantt_md');
      inspectorSection.hidden = true;
      showView('welcome');
    }
  });

  // Zoom Buttons
  zoomDaysBtn.addEventListener('click', () => changeZoom('days'));
  zoomWeeksBtn.addEventListener('click', () => changeZoom('weeks'));
  zoomMonthsBtn.addEventListener('click', () => changeZoom('months'));

  // Inspector Buttons
  inspectUpdateBtn.addEventListener('click', updateTaskFromInspector);
  inspectCloseBtn.addEventListener('click', () => {
    inspectorSection.hidden = true;
    selectedTaskId = null;
    document.querySelectorAll('.gantt-task-bar').forEach(b => b.style.outline = 'none');
  });

  // Redraw dependencies on scroll to maintain alignments
  ganttScrollable.addEventListener('scroll', drawDependencies);
}

function loadExample(key) {
  const md = EXAMPLES[key];
  if (md) {
    markdownTextarea.value = md;
    localStorage.setItem('gantt_md', md);
    parseMarkdown(md);
    showView('chart');
  }
}

function changeZoom(mode) {
  zoomMode = mode;
  [zoomDaysBtn, zoomWeeksBtn, zoomMonthsBtn].forEach(btn => btn.classList.remove('primary'));
  if (mode === 'days') zoomDaysBtn.classList.add('primary');
  if (mode === 'weeks') zoomWeeksBtn.classList.add('primary');
  if (mode === 'months') zoomMonthsBtn.classList.add('primary');
  renderGantt();
}

// Markdown Parser
function parseMarkdown(md) {
  tasks = [];
  const lines = md.split('\n');
  
  // Clean lists and parse
  lines.forEach((line, idx) => {
    let clean = line.trim();
    if (!clean || clean.startsWith('#')) return;

    if (clean.startsWith('- ') || clean.startsWith('* ') || clean.startsWith('+ ')) {
      clean = clean.substring(2).trim();
    } else if (/^\d+\.\s/.test(clean)) {
      clean = clean.replace(/^\d+\.\s/, '').trim();
    }

    // Regex elements
    const dateMatch = clean.match(/\[\s*(\d{4}-\d{2}-\d{2})\s*(?:a|to|-)\s*(\d{4}-\d{2}-\d{2})\s*\]/);
    if (!dateMatch) return;

    const startStr = dateMatch[1];
    const endStr = dateMatch[2];
    
    // Extricate task name (everything before dates)
    const dateIndex = clean.indexOf(dateMatch[0]);
    const name = clean.substring(0, dateIndex).trim();
    
    // Assignee
    const assigneeMatch = clean.match(/@([a-zA-ZáéíóúÁÉÍÓÚñÑ\w_]+)/);
    const assignee = assigneeMatch ? assigneeMatch[1] : '';

    // Progress
    const progressMatch = clean.match(/(\d+)\%/);
    const progress = progressMatch ? parseInt(progressMatch[1]) : 0;

    // Dependency
    const depMatch = clean.match(/\[\s*(?:dep|depende):\s*([^\]]+)\]/i);
    const dependency = depMatch ? depMatch[1].trim() : '';

    const id = name.replace(/\s+/g, '-').toLowerCase();

    tasks.push({
      id,
      name,
      start: new Date(startStr + 'T00:00:00'),
      end: new Date(endStr + 'T00:00:00'),
      assignee,
      progress,
      dependency
    });
  });

  calculateProjectBounds();
}

function calculateProjectBounds() {
  if (tasks.length === 0) return;

  let min = new Date(tasks[0].start);
  let max = new Date(tasks[0].end);

  tasks.forEach(t => {
    if (t.start < min) min = new Date(t.start);
    if (t.end > max) max = new Date(t.end);
  });

  // Buffers: pad start with 3 days, end with 7 days
  min.setDate(min.getDate() - 3);
  max.setDate(max.getDate() + 7);

  projectStart = min;
  projectEnd = max;

  const diffTime = Math.abs(projectEnd - projectStart);
  totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// Convert Date to horizontal pixel offset
function getXOffset(date) {
  const diffTime = date - projectStart;
  const days = diffTime / (1000 * 60 * 60 * 24);
  return days * ZOOM_PIXELS[zoomMode];
}

// Render Timeline Header Grid
function renderTimelineHeader() {
  ganttHeader.innerHTML = '';
  const step = new Date(projectStart);
  
  // Total Grid Columns count
  ganttHeader.style.paddingLeft = '200px'; // Offset for task list panel
  
  if (zoomMode === 'days') {
    for (let i = 0; i < totalDays; i++) {
      const col = document.createElement('div');
      col.className = 'time-slot-header';
      col.style.width = `${ZOOM_PIXELS.days}px`;
      
      const day = step.getDate();
      const month = step.toLocaleDateString('es', { month: 'short' });
      col.innerHTML = `<strong>${day}</strong><br><span style="font-size: 9px;">${month}</span>`;
      
      ganttHeader.appendChild(col);
      step.setDate(step.getDate() + 1);
    }
  } else if (zoomMode === 'weeks') {
    // Week by week
    let dayCount = 0;
    while (dayCount < totalDays) {
      const col = document.createElement('div');
      col.className = 'time-slot-header';
      col.style.width = `${ZOOM_PIXELS.weeks * 7}px`;
      
      const day = step.getDate();
      const month = step.toLocaleDateString('es', { month: 'short' });
      col.innerHTML = `<strong>Sem ${Math.floor(dayCount / 7) + 1}</strong><br><span style="font-size: 9px;">${day} ${month}</span>`;
      
      ganttHeader.appendChild(col);
      step.setDate(step.getDate() + 7);
      dayCount += 7;
    }
  } else {
    // Months
    let dayCount = 0;
    while (dayCount < totalDays) {
      const col = document.createElement('div');
      col.className = 'time-slot-header';
      col.style.width = `${ZOOM_PIXELS.months * 30}px`;
      
      const month = step.toLocaleDateString('es', { month: 'long' });
      col.innerHTML = `<strong style="text-transform: capitalize;">${month}</strong><br><span style="font-size: 9px;">${step.getFullYear()}</span>`;
      
      ganttHeader.appendChild(col);
      step.setDate(step.getDate() + 30);
      dayCount += 30;
    }
  }
}

// Render Gantt Tasks Grid & Bars
function renderGantt() {
  if (tasks.length === 0) return;

  calculateProjectBounds();
  renderTimelineHeader();

  // Grid background setup
  ganttRowsContainer.innerHTML = '';
  
  const totalWidth = totalDays * ZOOM_PIXELS[zoomMode];
  ganttChart.style.width = `${totalWidth + 200}px`;

  // Draw background grid lines
  const gridBg = document.createElement('div');
  gridBg.className = 'gantt-grid-bg';
  gridBg.style.paddingLeft = '200px';
  
  const stepDays = zoomMode === 'days' ? 1 : (zoomMode === 'weeks' ? 7 : 30);
  const colWidth = ZOOM_PIXELS[zoomMode] * stepDays;
  const numCols = Math.ceil(totalDays / stepDays);
  
  for (let i = 0; i < numCols; i++) {
    const col = document.createElement('div');
    col.className = 'grid-col';
    col.style.width = `${colWidth}px`;
    gridBg.appendChild(col);
  }
  ganttRowsContainer.appendChild(gridBg);

  // Render Rows
  tasks.forEach((task) => {
    const row = document.createElement('div');
    row.className = 'gantt-row';
    
    // Left Task Info Column
    const info = document.createElement('div');
    info.className = 'gantt-task-info';
    info.innerHTML = `
      <div class="gantt-task-title" title="${task.name}">${task.name}</div>
      <div class="gantt-task-meta">${task.assignee ? '@' + task.assignee : ''} ${task.progress}%</div>
    `;
    row.appendChild(info);

    // Right Bar Container Column
    const barContainer = document.createElement('div');
    barContainer.className = 'gantt-bar-container';
    
    // Draw Bar
    const bar = document.createElement('div');
    bar.className = 'gantt-task-bar';
    if (task.dependency) bar.classList.add('has-dependency');
    bar.setAttribute('data-id', task.id);
    
    // Calculate layout
    const xStart = getXOffset(task.start);
    const xEnd = getXOffset(task.end);
    const barWidth = Math.max(20, xEnd - xStart);
    
    bar.style.left = `${xStart}px`;
    bar.style.width = `${barWidth}px`;
    
    // Inner Elements
    const progressFill = document.createElement('div');
    progressFill.className = 'gantt-task-progress';
    progressFill.style.width = `${task.progress}%`;
    bar.appendChild(progressFill);
    
    const label = document.createElement('div');
    label.className = 'gantt-task-label';
    label.innerText = task.name;
    bar.appendChild(label);

    // Resize handles
    const leftHandle = document.createElement('div');
    leftHandle.className = 'resize-handle resize-handle-left';
    bar.appendChild(leftHandle);

    const rightHandle = document.createElement('div');
    rightHandle.className = 'resize-handle resize-handle-right';
    bar.appendChild(rightHandle);
    
    barContainer.appendChild(bar);
    row.appendChild(barContainer);
    ganttRowsContainer.appendChild(row);

    // Bind Interaction Events
    setupBarDragging(bar, task);
  });

  // Selected indicator persistent check
  if (selectedTaskId) {
    const activeBar = document.querySelector(`.gantt-task-bar[data-id="${selectedTaskId}"]`);
    if (activeBar) activeBar.style.outline = '2px solid var(--violet)';
  }

  // Draw connections
  setTimeout(drawDependencies, 100);
}

// Drag & Resize Mouse Interactivity
function setupBarDragging(bar, task) {
  let isDragging = false;
  let isResizingLeft = false;
  let isResizingRight = false;
  let startX = 0;
  let originalLeft = 0;
  let originalWidth = 0;
  
  bar.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    
    // Highlight selected task bar
    document.querySelectorAll('.gantt-task-bar').forEach(b => b.style.outline = 'none');
    bar.style.outline = '2px solid var(--violet)';
    selectedTaskId = task.id;
    openInspector(task);

    startX = e.clientX;
    originalLeft = parseFloat(bar.style.left);
    originalWidth = parseFloat(bar.style.width);
    
    if (e.target.classList.contains('resize-handle-left')) {
      isResizingLeft = true;
    } else if (e.target.classList.contains('resize-handle-right')) {
      isResizingRight = true;
    } else {
      isDragging = true;
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  
  function onMouseMove(e) {
    const deltaX = e.clientX - startX;
    const pxPerDay = ZOOM_PIXELS[zoomMode];
    
    if (isDragging) {
      let newLeft = originalLeft + deltaX;
      if (newLeft < 0) newLeft = 0;
      bar.style.left = `${newLeft}px`;
    } else if (isResizingLeft) {
      let newLeft = originalLeft + deltaX;
      let newWidth = originalWidth - deltaX;
      if (newWidth < 15) {
        newWidth = 15;
        newLeft = originalLeft + originalWidth - 15;
      }
      bar.style.left = `${newLeft}px`;
      bar.style.width = `${newWidth}px`;
    } else if (isResizingRight) {
      let newWidth = originalWidth + deltaX;
      if (newWidth < 15) newWidth = 15;
      bar.style.width = `${newWidth}px`;
    }
    
    drawDependencies();
  }
  
  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    
    const pxPerDay = ZOOM_PIXELS[zoomMode];
    const leftPx = parseFloat(bar.style.left);
    const widthPx = parseFloat(bar.style.width);
    
    // Translate pixel offsets back to dates
    const daysFromStartLeft = leftPx / pxPerDay;
    const durationDays = widthPx / pxPerDay;
    
    const newStart = new Date(projectStart);
    newStart.setDate(newStart.getDate() + Math.round(daysFromStartLeft));
    
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + Math.round(durationDays));
    
    task.start = newStart;
    task.end = newEnd;
    
    // Update Inspector inputs
    inspectStart.value = formatDateString(newStart);
    inspectEnd.value = formatDateString(newEnd);
    
    isDragging = false;
    isResizingLeft = false;
    isResizingRight = false;
    
    // Synchronize updates back to Markdown and re-render
    updateMarkdownFromTasks();
    renderGantt();
  }
}

// Draw Predecessor Connection Lines (SVG)
function drawDependencies() {
  // Clear SVG layer
  const paths = ganttSvgLayer.querySelectorAll('.dep-line');
  paths.forEach(p => p.remove());

  tasks.forEach((task) => {
    if (!task.dependency) return;

    // Find parent task
    const parentId = task.dependency.replace(/\s+/g, '-').toLowerCase();
    const parentTask = tasks.find(t => t.id === parentId);
    if (!parentTask) return;

    // Get DOM elements bounding boxes
    const parentBar = document.querySelector(`.gantt-task-bar[data-id="${parentTask.id}"]`);
    const childBar = document.querySelector(`.gantt-task-bar[data-id="${task.id}"]`);
    
    if (!parentBar || !childBar) return;

    const parentRect = parentBar.getBoundingClientRect();
    const childRect = childBar.getBoundingClientRect();
    const containerRect = ganttChart.getBoundingClientRect();
    const scrollableRect = ganttScrollable.getBoundingClientRect();

    // Offset calculations inside scrollable workspace
    const scrollLeft = ganttScrollable.scrollLeft;
    const scrollTop = ganttScrollable.scrollTop;

    const startX = parentRect.right - containerRect.left;
    const startY = (parentRect.top + parentRect.height / 2) - containerRect.top;

    const endX = childRect.left - containerRect.left;
    const endY = (childRect.top + childRect.height / 2) - containerRect.top;

    // Build curved pathway or orthogonal lines
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.className.baseVal = 'dep-line';
    
    // Points: Start -> Right 12px -> Down/Up to child Y -> End X
    const midX = startX + 12;
    const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    
    line.setAttribute('d', pathD);
    line.setAttribute('marker-end', 'url(#arrow)');
    ganttSvgLayer.appendChild(line);
  });
}

// Inspector Details Setup
function openInspector(task) {
  inspectorSection.hidden = false;
  inspectTitle.value = task.name;
  inspectStart.value = formatDateString(task.start);
  inspectEnd.value = formatDateString(task.end);
  inspectAssignee.value = task.assignee;
  inspectProgress.value = task.progress;
  inspectDep.value = task.dependency;
}

function updateTaskFromInspector() {
  if (!selectedTaskId) return;
  const task = tasks.find(t => t.id === selectedTaskId);
  if (!task) return;

  task.name = inspectTitle.value;
  task.start = new Date(inspectStart.value + 'T00:00:00');
  task.end = new Date(inspectEnd.value + 'T00:00:00');
  task.assignee = inspectAssignee.value;
  task.progress = parseInt(inspectProgress.value) || 0;
  task.dependency = inspectDep.value;

  // Rebuild slug ID
  const oldId = task.id;
  task.id = task.name.replace(/\s+/g, '-').toLowerCase();
  
  if (selectedTaskId === oldId) {
    selectedTaskId = task.id;
  }

  // Rewrite model to editor and re-render
  updateMarkdownFromTasks();
  renderGantt();
}

// Format Date objects to YYYY-MM-DD
function formatDateString(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  return `${yyyy}-${mm}-${dd}`;
}

// Synchronize Task Model edits back into the Markdown Editor Textarea
function updateMarkdownFromTasks() {
  let md = '# Ruta del Proyecto\n';
  tasks.forEach(task => {
    const startStr = formatDateString(task.start);
    const endStr = formatDateString(task.end);
    let line = `- ${task.name} [${startStr} a ${endStr}]`;
    if (task.assignee) line += ` @${task.assignee}`;
    if (task.progress !== undefined) line += ` ${task.progress}%`;
    if (task.dependency) line += ` [dep: ${task.dependency}]`;
    md += line + '\n';
  });
  
  markdownTextarea.value = md;
  localStorage.setItem('gantt_md', md);
}

// Start everything
window.addEventListener('DOMContentLoaded', init);
