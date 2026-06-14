/* app.js - Diagramador de Gramática y Árboles Sintácticos */

// Presets de oraciones en formato Markdown
const PRESETS = {
  "simple": `# Oración Simple (Sujeto + Predicado)
- O | Oración
  - SN | Sujeto
    - Det | El
    - N | estudiante
  - SV | Predicado
    - V | lee
    - SN | Objeto Directo
      - Det | un
      - N | libro`,

  "complex-obj": `# Oración con Objeto Directo e Indirecto
- O | Oración
  - SN | Sujeto
    - Det | La
    - N | profesora
  - SV | Predicado
    - V | entregó
    - SN | Objeto Directo
      - Det | las
      - N | notas
    - SP | Objeto Indirecto
      - Prep | a
      - SN | Término
        - Det | los
        - N | alumnos`,

  "subordinate": `# Oración Subordinada Adjetiva
- O | Oración
  - SN | Sujeto
    - Det | El
    - N | coche
    - SAdj | CN (Subord. Adjetiva)
      - Pron | que
      - SV | Predicado
        - V | compraste
  - SV | Predicado
    - V | es
    - SAdj | Atributo
      - Adj | rápido`,

  "compound": `# Oración Compuesta Coordinada
- O | Oración Compuesta
  - O1 | Coordinada 1
    - SN | Sujeto
      - N | Juan
    - SV | Predicado
      - V | trabaja
  - Nexo | conj
    - Conj | y
  - O2 | Coordinada 2
    - SN | Sujeto
      - N | María
    - SV | Predicado
      - V | estudia`,

  "morphosyntactic": `# Análisis Morfosintáctico Detallado
- O | Oración
  - SN | Sujeto
    - Det | El
    - N | gato
    - SAdj | CN
      - Adj | negro
  - SV | Predicado
    - V | duerme
    - SAdv | CC Modo
      - Adv | plácidamente
    - SP | CC Lugar
      - Prep | en
      - SN | Término
        - Det | el
        - N | sofá`
};

// State Variables
let treeRoot = null;
let wordLeaves = [];
let maxDepth = 0;
let nodeMap = new Map(); // Map ID -> Node Object

// SVG Canvas Pan & Zoom State
let panX = 0;
let panY = 0;
let zoomScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;

// Configs
const LEVEL_HEIGHT = 80;
const LEAF_SPACING = 100;
const NODE_HEIGHT = 38;
const PADDING_X = 60;
const PADDING_Y = 50;

// DOM Elements
const presetSelect = document.getElementById('preset-select');
const markdownInput = document.getElementById('markdown-input');
const layoutSelect = document.getElementById('layout-select');
const lineSelect = document.getElementById('line-select');
const colorSelect = document.getElementById('color-select');
const bracketsOutput = document.getElementById('brackets-output');
const copyBracketsBtn = document.getElementById('copy-brackets-btn');
const sentencePreview = document.getElementById('sentence-preview');

const treeSvg = document.getElementById('tree-svg');
const zoomGroup = document.getElementById('zoom-group');
const edgesGroup = document.getElementById('edges-group');
const nodesGroup = document.getElementById('nodes-group');

const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const zoomResetBtn = document.getElementById('zoom-reset-btn');
const exportSvgBtn = document.getElementById('export-svg-btn');
const exportPngBtn = document.getElementById('export-png-btn');

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  // Pre-load default preset
  markdownInput.value = PRESETS["simple"];
  
  // Set up event listeners
  presetSelect.addEventListener('change', handlePresetChange);
  markdownInput.addEventListener('input', handleEditorInput);
  layoutSelect.addEventListener('change', renderTree);
  lineSelect.addEventListener('change', renderTree);
  colorSelect.addEventListener('change', renderTree);
  
  // Copy Penn notation
  copyBracketsBtn.addEventListener('click', copyPennNotation);
  
  // Pan and Zoom Listeners
  treeSvg.addEventListener('mousedown', startPan);
  window.addEventListener('mousemove', pan);
  window.addEventListener('mouseup', endPan);
  treeSvg.addEventListener('wheel', handleWheelZoom, { passive: false });
  
  zoomInBtn.addEventListener('click', () => zoom(1.2));
  zoomOutBtn.addEventListener('click', () => zoom(0.8));
  zoomResetBtn.addEventListener('click', resetZoom);
  
  exportSvgBtn.addEventListener('click', downloadSVG);
  exportPngBtn.addEventListener('click', downloadPNG);

  // Render first tree
  parseAndRender();
});

// Event Handlers
function handlePresetChange() {
  const selected = presetSelect.value;
  if (PRESETS[selected]) {
    markdownInput.value = PRESETS[selected];
    parseAndRender();
  }
}

function handleEditorInput() {
  parseAndRender();
}

function updateTransform() {
  zoomGroup.setAttribute('transform', `translate(${panX}, ${panY}) scale(${zoomScale})`);
}

function startPan(e) {
  if (e.target.closest('.tree-node')) return; // Avoid drag on nodes
  isDragging = true;
  startX = e.clientX - panX;
  startY = e.clientY - panY;
  treeSvg.style.cursor = 'grabbing';
}

function pan(e) {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  updateTransform();
}

function endPan() {
  if (!isDragging) return;
  isDragging = false;
  treeSvg.style.cursor = 'grab';
}

function handleWheelZoom(e) {
  e.preventDefault();
  const zoomFactor = 1.1;
  const oldScale = zoomScale;
  
  if (e.deltaY < 0) {
    zoomScale = Math.min(zoomScale * zoomFactor, 3);
  } else {
    zoomScale = Math.max(zoomScale / zoomFactor, 0.3);
  }

  // Zoom to mouse cursor
  const rect = treeSvg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  panX = mouseX - (mouseX - panX) * (zoomScale / oldScale);
  panY = mouseY - (mouseY - panY) * (zoomScale / oldScale);
  
  updateTransform();
}

function zoom(factor) {
  const oldScale = zoomScale;
  zoomScale = Math.min(Math.max(zoomScale * factor, 0.3), 3);
  
  const rect = treeSvg.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  panX = centerX - (centerX - panX) * (zoomScale / oldScale);
  panY = centerY - (centerY - panY) * (zoomScale / oldScale);
  
  updateTransform();
}

function resetZoom() {
  if (!treeRoot) return;
  
  // Calculate bounding box of the tree nodes
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  nodeMap.forEach(node => {
    minX = Math.min(minX, node.x - 60);
    maxX = Math.max(maxX, node.x + 60);
    minY = Math.min(minY, node.y - 30);
    maxY = Math.max(maxY, node.y + 30);
  });
  
  if (minX === Infinity) return;
  
  const treeWidth = maxX - minX;
  const treeHeight = maxY - minY;
  
  const svgRect = treeSvg.getBoundingClientRect();
  const scaleX = (svgRect.width - PADDING_X * 2) / treeWidth;
  const scaleY = (svgRect.height - PADDING_Y * 2) / treeHeight;
  
  zoomScale = Math.min(Math.min(scaleX, scaleY), 1.2); // limit max scale
  
  panX = (svgRect.width - treeWidth * zoomScale) / 2 - minX * zoomScale;
  panY = (svgRect.height - treeHeight * zoomScale) / 2 - minY * zoomScale;
  
  updateTransform();
}

// Markdown Parser
function parseAndRender() {
  const text = markdownInput.value;
  
  try {
    const lines = text.split('\n');
    const listLines = [];
    
    for (let line of lines) {
      // Ignore comment/header lines starting with # or empty lines
      if (line.trim().startsWith('#') || line.trim() === '') continue;
      
      const match = line.match(/^(\s*)([-*+]\s|\d+\.\s)?(.*)$/);
      if (match) {
        const indent = match[1].length;
        const content = match[3].trim();
        if (content) {
          listLines.push({ indent, content });
        }
      }
    }
    
    if (listLines.length === 0) {
      renderError("Ingresa una lista en Markdown para generar el árbol.");
      return;
    }
    
    // Map indentation levels to integers
    const uniqueIndents = [...new Set(listLines.map(l => l.indent))].sort((a, b) => a - b);
    listLines.forEach(l => {
      l.depth = uniqueIndents.indexOf(l.indent);
    });
    
    // Build Hierarchical Tree
    const rootNodes = [];
    const stack = [];
    let idCounter = 0;
    
    listLines.forEach(lineNode => {
      const node = {
        id: `node-${idCounter++}`,
        rawText: lineNode.content,
        depth: lineNode.depth,
        children: [],
        isLeaf: true,
        parent: null
      };
      
      while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
        stack.pop();
      }
      
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        node.parent = parent;
        parent.children.push(node);
        parent.isLeaf = false;
      } else {
        rootNodes.push(node);
      }
      
      stack.push(node);
    });
    
    // We expect a single root, but let's take the first one
    if (rootNodes.length === 0) {
      renderError("No se encontraron nodos válidos.");
      return;
    }
    
    treeRoot = rootNodes[0];
    
    // Extract label parts: Category | Word (or Role)
    nodeMap.clear();
    processNodeLabels(treeRoot);
    
    // Refine leaf node values and structure
    refineTreeStructure(treeRoot);
    
    // Calculate max depth & list of words
    maxDepth = 0;
    wordLeaves = [];
    traverseTree(treeRoot, (node) => {
      nodeMap.set(node.id, node);
      if (node.depth > maxDepth) maxDepth = node.depth;
      if (node.isLeaf) {
        wordLeaves.push(node);
      }
    });
    
    // Render
    renderTree();
    resetZoom();
    
  } catch (err) {
    console.error(err);
    renderError("Error al procesar la sintaxis de la lista. Revisa la tabulación.");
  }
}

function processNodeLabels(node) {
  const parts = node.rawText.split('|').map(s => s.trim());
  node.primaryLabel = parts[0] || '';
  node.secondaryLabel = parts[1] || '';
  node.children.forEach(processNodeLabels);
}

function refineTreeStructure(node) {
  if (node.children.length === 0) {
    if (node.secondaryLabel) {
      // Case like: - Det | El -> creates parent category "Det" and leaf "El"
      const leafChild = {
        id: `${node.id}-leaf`,
        primaryLabel: node.secondaryLabel,
        secondaryLabel: '',
        depth: node.depth + 1,
        children: [],
        isLeaf: true,
        isVirtualWord: true,
        parent: node
      };
      node.children = [leafChild];
      node.isLeaf = false;
    } else {
      // Case like: - El -> terminal leaf word directly
      node.isLeaf = true;
    }
  } else {
    node.isLeaf = false;
    node.children.forEach(refineTreeStructure);
  }
}

function traverseTree(node, callback) {
  callback(node);
  node.children.forEach(c => traverseTree(c, callback));
}

// Tree Layout Calculations
function calculateLayout(mode) {
  // 1. Position all leaf nodes sequentially on the horizontal axis
  wordLeaves.forEach((leaf, idx) => {
    leaf.x = PADDING_X + idx * LEAF_SPACING;
    if (mode === 'bottom') {
      leaf.y = PADDING_Y + maxDepth * LEVEL_HEIGHT;
    } else {
      leaf.y = PADDING_Y + leaf.depth * LEVEL_HEIGHT;
    }
  });
  
  // 2. Position internal nodes as the mathematical average of their children's x coordinates
  // We do this bottom-up. A simple recursive post-order traversal works perfectly.
  calculateCoordinates(treeRoot, mode);
}

function calculateCoordinates(node, mode) {
  if (node.isLeaf) {
    return { x: node.x, y: node.y };
  }
  
  let sumX = 0;
  node.children.forEach(child => {
    const coords = calculateCoordinates(child, mode);
    sumX += coords.x;
  });
  
  node.x = sumX / node.children.length;
  node.y = PADDING_Y + node.depth * LEVEL_HEIGHT;
  
  return { x: node.x, y: node.y };
}

// Main Render Function
function renderTree() {
  if (!treeRoot) return;
  
  const layoutMode = layoutSelect.value;
  const lineStyle = lineSelect.value;
  const colorPal = colorSelect.value;
  
  calculateLayout(layoutMode);
  
  // Clear groups
  edgesGroup.innerHTML = '';
  nodesGroup.innerHTML = '';
  
  // Render Links
  nodeMap.forEach(node => {
    if (node.parent) {
      const parent = node.parent;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'tree-edge');
      path.setAttribute('id', `edge-${parent.id}-to-${node.id}`);
      path.setAttribute('data-parent', parent.id);
      path.setAttribute('data-child', node.id);
      
      const x1 = parent.x;
      const y1 = parent.y + NODE_HEIGHT / 2;
      const x2 = node.x;
      const y2 = node.y - NODE_HEIGHT / 2;
      
      let d = '';
      if (lineStyle === 'bezier') {
        const midY = y1 + (y2 - y1) / 2;
        d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
      } else {
        d = `M ${x1} ${y1} L ${x2} ${y2}`;
      }
      
      path.setAttribute('d', d);
      edgesGroup.appendChild(path);
    }
  });
  
  // Render Nodes
  nodeMap.forEach(node => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let classList = ['tree-node'];
    if (node.isLeaf) classList.push('leaf-node');
    group.setAttribute('class', classList.join(' '));
    group.setAttribute('id', node.id);
    group.setAttribute('transform', `translate(${node.x}, ${node.y})`);
    
    // Add interactions
    group.addEventListener('mouseenter', () => highlightSubtree(node.id, true));
    group.addEventListener('mouseleave', () => highlightSubtree(node.id, false));
    
    // Card Background
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('class', 'node-bg');
    
    const textLabel = node.primaryLabel;
    const wordWidth = Math.max(76, textLabel.length * 8 + 24);
    
    rect.setAttribute('x', -wordWidth / 2);
    rect.setAttribute('y', -NODE_HEIGHT / 2);
    rect.setAttribute('width', wordWidth);
    rect.setAttribute('height', NODE_HEIGHT);
    
    // Category specific coloring
    if (colorPal === 'colored' && !node.isLeaf) {
      const cat = node.primaryLabel.toUpperCase();
      if (cat === 'O' || cat === 'S') rect.classList.add('colored-o');
      else if (cat.startsWith('SN') || cat === 'NP') rect.classList.add('colored-sn');
      else if (cat.startsWith('SV') || cat === 'VP') rect.classList.add('colored-sv');
      else if (cat.startsWith('SP') || cat === 'PP') rect.classList.add('colored-sp');
      else if (cat.startsWith('SADJ') || cat === 'ADJP') rect.classList.add('colored-sadj');
      else if (cat.startsWith('SADV') || cat === 'ADVP') rect.classList.add('colored-sadv');
    }
    
    group.appendChild(rect);
    
    // Text Labels
    if (node.isLeaf) {
      // Terminal word node
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'leaf-text');
      text.textContent = node.primaryLabel;
      group.appendChild(text);
    } else {
      // Syntactic Category (with optional Grammatical Role)
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = node.primaryLabel;
      
      if (node.secondaryLabel) {
        // Offset text slightly up to fit role underneath
        text.setAttribute('class', 'node-text');
        text.setAttribute('y', -5);
        
        const role = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        role.setAttribute('class', 'node-role');
        role.setAttribute('y', 10);
        role.textContent = node.secondaryLabel;
        group.appendChild(role);
      } else {
        text.setAttribute('class', 'node-text');
        text.setAttribute('y', 0);
      }
      
      group.appendChild(text);
    }
    
    nodesGroup.appendChild(group);
  });
  
  // Render Bracket Notation (Penn Treebank)
  bracketsOutput.textContent = generateBracketsNotation(treeRoot);
  
  // Render Bottom Sentence Preview
  renderSentencePreview();
}

function renderError(msg) {
  edgesGroup.innerHTML = '';
  nodesGroup.innerHTML = '';
  bracketsOutput.textContent = '';
  sentencePreview.innerHTML = '';
  
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', 50);
  text.setAttribute('y', 50);
  text.setAttribute('fill', '#ef4444');
  text.setAttribute('font-family', 'Inter');
  text.setAttribute('font-weight', '500');
  text.textContent = msg;
  nodesGroup.appendChild(text);
}

// Subtree Hover Highlights
function highlightSubtree(nodeId, highlight) {
  const node = nodeMap.get(nodeId);
  if (!node) return;
  
  // Find all descendant node IDs and connecting edge IDs
  const descNodeIds = [];
  const edgeIds = [];
  
  function collectDescendants(n) {
    descNodeIds.push(n.id);
    n.children.forEach(child => {
      edgeIds.push(`edge-${n.id}-to-${child.id}`);
      collectDescendants(child);
    });
  }
  
  collectDescendants(node);
  
  // Apply classes in SVG
  descNodeIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (highlight) el.classList.add('highlighted');
      else el.classList.remove('highlighted');
    }
  });
  
  edgeIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (highlight) el.classList.add('highlighted');
      else el.classList.remove('highlighted');
    }
  });
  
  // Highlight sentence tokens corresponding to leaf nodes in this subtree
  descNodeIds.forEach(id => {
    const subNode = nodeMap.get(id);
    if (subNode && subNode.isLeaf) {
      // Find the preview span and highlight it
      const span = document.getElementById(`preview-word-${subNode.id}`);
      if (span) {
        if (highlight) span.classList.add('highlighted');
        else span.classList.remove('highlighted');
      }
    }
  });
}

// Bottom Sentence Preview Rendering
function renderSentencePreview() {
  sentencePreview.innerHTML = '';
  
  wordLeaves.forEach(leaf => {
    const span = document.createElement('span');
    span.id = `preview-word-${leaf.id}`;
    span.textContent = leaf.primaryLabel;
    
    // Add hover highlight from sentence words back to tree branches
    span.addEventListener('mouseenter', () => {
      // Highlight the leaf node itself, and propagate highlight up if wanted?
      // For simplicity, highlight just the word node
      highlightSubtree(leaf.id, true);
    });
    
    span.addEventListener('mouseleave', () => {
      highlightSubtree(leaf.id, false);
    });
    
    sentencePreview.appendChild(span);
    
    // Add space between words
    sentencePreview.appendChild(document.createTextNode(' '));
  });
}

// Generate Penn Treebank format
function generateBracketsNotation(node) {
  if (!node) return '';
  
  let label = node.primaryLabel;
  if (node.secondaryLabel && !node.isLeaf) {
    label = `${node.primaryLabel}-${node.secondaryLabel}`;
  }
  
  if (node.isLeaf) {
    return label;
  }
  
  const childrenStr = node.children.map(c => generateBracketsNotation(c)).join(' ');
  return `[${label} ${childrenStr}]`;
}

function copyPennNotation() {
  const text = bracketsOutput.textContent;
  if (!text) return;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = copyBracketsBtn.textContent;
    copyBracketsBtn.textContent = '¡Copiado!';
    copyBracketsBtn.style.background = 'rgba(52, 211, 153, 0.2)';
    copyBracketsBtn.style.color = '#34d399';
    setTimeout(() => {
      copyBracketsBtn.textContent = originalText;
      copyBracketsBtn.style.background = '';
      copyBracketsBtn.style.color = '';
    }, 1500);
  }).catch(err => {
    console.error('Error copying text: ', err);
  });
}

// Exporters
function downloadSVG() {
  // Create a copy of the SVG elements centered and padded
  // Find actual bounds of tree root
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  nodeMap.forEach(node => {
    minX = Math.min(minX, node.x - 60);
    maxX = Math.max(maxX, node.x + 60);
    minY = Math.min(minY, node.y - 30);
    maxY = Math.max(maxY, node.y + 30);
  });
  
  if (minX === Infinity) return;
  
  const width = maxX - minX;
  const height = maxY - minY;
  
  // Duplicate SVG styles as inline style block
  const styleContent = `
    .tree-edge { fill: none; stroke: #374151; stroke-width: 2px; }
    .node-bg { fill: #1f2937; stroke: #4b5563; stroke-width: 1.5px; rx: 8px; ry: 8px; }
    .node-text { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; fill: #f3f4f6; text-anchor: middle; dominant-baseline: middle; }
    .node-role { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; fill: #9ca3af; text-anchor: middle; dominant-baseline: middle; text-transform: uppercase; letter-spacing: 0.05em; }
    .leaf-node .node-bg { fill: #fdf2f8; stroke: #f472b6; rx: 6px; ry: 6px; }
    .leaf-text { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; fill: #be185d; text-anchor: middle; dominant-baseline: middle; }
    .colored-o { fill: #eef2ff; stroke: #818cf8; }
    .colored-o .node-text { fill: #3730a3; }
    .colored-sn { fill: #f0f9ff; stroke: #38bdf8; }
    .colored-sn .node-text { fill: #075985; }
    .colored-sv { fill: #ecfdf5; stroke: #34d399; }
    .colored-sv .node-text { fill: #065f46; }
    .colored-sp { fill: #faf5ff; stroke: #c084fc; }
    .colored-sp .node-text { fill: #6b21a8; }
    .colored-sadj { fill: #fff7ed; stroke: #fb923c; }
    .colored-sadj .node-text { fill: #9a3412; }
    .colored-sadv { fill: #fefce8; stroke: #facc15; }
    .colored-sadv .node-text { fill: #854d0e; }
  `;
  
  // Clone SVG node
  const svgClone = treeSvg.cloneNode(true);
  svgClone.setAttribute('width', width + 100);
  svgClone.setAttribute('height', height + 80);
  svgClone.setAttribute('viewBox', `${minX - 50} ${minY - 40} ${width + 100} ${height + 80}`);
  
  // Clear transform on cloned zoom-group
  const cloneZoomGroup = svgClone.querySelector('#zoom-group');
  cloneZoomGroup.removeAttribute('transform');
  
  // Inject style block
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = styleContent;
  svgClone.insertBefore(styleEl, svgClone.firstChild);
  
  // Serialize
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgClone);
  
  // Create Blob
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `arbol_sintactico_${Date.now()}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadPNG() {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  nodeMap.forEach(node => {
    minX = Math.min(minX, node.x - 60);
    maxX = Math.max(maxX, node.x + 60);
    minY = Math.min(minY, node.y - 30);
    maxY = Math.max(maxY, node.y + 30);
  });
  
  if (minX === Infinity) return;
  
  const width = maxX - minX + 100;
  const height = maxY - minY + 80;
  
  // Create SVG string as before
  const styleContent = `
    .tree-edge { fill: none; stroke: #374151; stroke-width: 2px; }
    .node-bg { fill: #1f2937; stroke: #4b5563; stroke-width: 1.5px; rx: 8px; ry: 8px; }
    .node-text { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; fill: #f3f4f6; text-anchor: middle; dominant-baseline: middle; }
    .node-role { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; fill: #9ca3af; text-anchor: middle; dominant-baseline: middle; text-transform: uppercase; letter-spacing: 0.05em; }
    .leaf-node .node-bg { fill: #fdf2f8; stroke: #f472b6; rx: 6px; ry: 6px; }
    .leaf-text { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; fill: #be185d; text-anchor: middle; dominant-baseline: middle; }
    .colored-o { fill: #eef2ff; stroke: #818cf8; }
    .colored-o .node-text { fill: #3730a3; }
    .colored-sn { fill: #f0f9ff; stroke: #38bdf8; }
    .colored-sn .node-text { fill: #075985; }
    .colored-sv { fill: #ecfdf5; stroke: #34d399; }
    .colored-sv .node-text { fill: #065f46; }
    .colored-sp { fill: #faf5ff; stroke: #c084fc; }
    .colored-sp .node-text { fill: #6b21a8; }
    .colored-sadj { fill: #fff7ed; stroke: #fb923c; }
    .colored-sadj .node-text { fill: #9a3412; }
    .colored-sadv { fill: #fefce8; stroke: #facc15; }
    .colored-sadv .node-text { fill: #854d0e; }
  `;
  
  const svgClone = treeSvg.cloneNode(true);
  svgClone.setAttribute('width', width);
  svgClone.setAttribute('height', height);
  svgClone.setAttribute('viewBox', `${minX - 50} ${minY - 40} ${width} ${height}`);
  
  const cloneZoomGroup = svgClone.querySelector('#zoom-group');
  cloneZoomGroup.removeAttribute('transform');
  
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = styleContent;
  svgClone.insertBefore(styleEl, svgClone.firstChild);
  
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgClone);
  
  const img = new Image();
  const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = width * 2; // double resolution for retina/high quality
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    
    // Draw background color
    ctx.fillStyle = '#080b11'; // dark background matching app canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0);
    
    URL.revokeObjectURL(url);
    
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `arbol_sintactico_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  img.src = url;
}
