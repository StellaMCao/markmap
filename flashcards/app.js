// Web Audio API Sound Effects
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  if (type === 'correct') {
    // Two rapid ascending sine tones
    osc.type = 'sine';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'wrong') {
    // Low frequency descending buzz
    osc.type = 'sawtooth';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.3);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'flip') {
    // Short subtle click
    osc.type = 'triangle';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    
    osc.start(now);
    osc.stop(now + 0.06);
  }
}

// State Management
let cards = [];
let currentIndex = 0;
let mode = 'study'; // study | quiz

// Quiz State
let quizQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizTimerId = null;
const quizTimeLimit = 15; // seconds
let quizTimeLeft = quizTimeLimit;
let quizQuestionStartTime = 0;
let quizTotalTimeSpent = 0;
let quizResults = [];

// Examples/Templates Database
const EXAMPLES = {
  capitals: `# Capitales del Mundo
- España | Madrid | Pista: Península ibérica en Europa sur
- Francia | París | Pista: Ciudad de la Luz y de la Torre Eiffel
- Italia | Roma | Pista: La Ciudad Eterna con el Coliseo
- Japón | Tokio | Pista: La metrópolis del sol naciente
- Brasil | Brasilia | Pista: Ciudad planificada en forma de avión
- Canadá | Ottawa | Pista: No es Toronto ni Montreal
- Australia | Canberra | Pista: Fundada en 1913 para mediar entre Sídney y Melbourne
- Egipto | El Cairo | Pista: Cerca de las pirámides de Guiza
- India | Nueva Delhi | Pista: Gran centro del subcontinente del sur de Asia
- Sudáfrica | Pretoria | Pista: Una de las tres capitales del país`,
  
  javascript: `# Conceptos clave de JavaScript
- Closure | Una función que recuerda su entorno léxico original | Permite la encapsulación y datos privados
- Hoisting | Elevación conceptual de declaraciones de variables y funciones al inicio de su scope | Se procesa en la fase de creación
- Event Delegation | Técnica de colocar un único listener en un elemento padre en vez de muchos en los hijos | Utiliza la propagación (bubbling)
- Promise | Objeto que representa el resultado eventual de una operación asíncrona | Estados: pending, fulfilled, rejected
- IIFE | Expresión de función ejecutada inmediatamente al definirse | Útil para no contaminar el scope global
- Strict Mode | Modo restrictivo que arroja errores en malas prácticas (ej. variables globales no declaradas) | Se activa escribiendo "use strict"
- Callback | Función pasada como argumento a otra función para ser ejecutada después | Base original de la asincronía en JS`,

  english: `# Verbos Irregulares en Inglés
- Go | Went / Gone | Pista: Moverse de un lugar a otro
- Take | Took / Taken | Pista: Tomar o agarrar algo
- Write | Wrote / Written | Pista: Plasmar palabras con lápiz o teclado
- Speak | Spoke / Spoken | Pista: Hablar o comunicarse verbalmente
- Buy | Bought / Bought | Pista: Adquirir algo pagando dinero
- Make | Made / Made | Pista: Elaborar, construir o fabricar
- Find | Found / Found | Pista: Descubrir algo perdido u oculto`
};

// DOM Elements
const markdownTextarea = document.getElementById('markdownTextarea');
const templateList = document.getElementById('templateList');
const loadInitialExampleBtn = document.getElementById('loadInitialExampleBtn');

const welcomeState = document.getElementById('welcomeState');
const studyArena = document.getElementById('studyArena');
const quizArena = document.getElementById('quizArena');
const quizScoreCard = document.getElementById('quizScoreCard');

// Mode Buttons
const studyModeBtn = document.getElementById('studyModeBtn');
const quizModeBtn = document.getElementById('quizModeBtn');

// Toolbar Buttons
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const helpBtn = document.getElementById('helpBtn');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const helpOverlay = document.getElementById('helpOverlay');

// Study Controls
const flashcard = document.getElementById('flashcard');
const frontText = document.getElementById('frontText');
const backText = document.getElementById('backText');
const backDesc = document.getElementById('backDesc');
const frontPista = document.getElementById('frontPista');
const cardCounter = document.getElementById('cardCounter');
const progressBarFill = document.getElementById('progressBarFill');
const prevBtn = document.getElementById('prevBtn');
const flipBtn = document.getElementById('flipBtn');
const nextBtn = document.getElementById('nextBtn');
const markLearnedBtn = document.getElementById('markLearnedBtn');
const markResetBtn = document.getElementById('markResetBtn');
const learnedCountDisplay = document.getElementById('learnedCount');
const successRateDisplay = document.getElementById('successRate');

// Quiz Elements
const quizTimerText = document.getElementById('quizTimerText');
const quizTimerFill = document.getElementById('quizTimerFill');
const quizScoreText = document.getElementById('quizScoreText');
const quizProgressText = document.getElementById('quizProgressText');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsContainer = document.getElementById('quizOptionsContainer');
const exitQuizBtn = document.getElementById('exitQuizBtn');

// Quiz Scorecard Elements
const finalScoreNum = document.getElementById('finalScoreNum');
const finalScoreLabel = document.getElementById('finalScoreLabel');
const quizCorrectCount = document.getElementById('quizCorrectCount');
const quizTimeAverage = document.getElementById('quizTimeAverage');
const quizReviewContainer = document.getElementById('quizReviewContainer');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const backToStudyBtn = document.getElementById('backToStudyBtn');

// Initialize App
function init() {
  // Load last saved session or default
  const savedMd = localStorage.getItem('flashcards_md');
  const savedStats = localStorage.getItem('flashcards_learned_stats');
  
  if (savedMd) {
    markdownTextarea.value = savedMd;
    parseMarkdown(savedMd);
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      cards.forEach((card, idx) => {
        if (stats.includes(card.front)) {
          card.learned = true;
        }
      });
    }
    updateStats();
    showView('study');
  } else {
    // Show welcome state
    showView('welcome');
  }
  
  // Theme init
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';
  
  setupListeners();
}

// Navigation / Views Manager
function showView(view) {
  welcomeState.hidden = true;
  studyArena.hidden = true;
  quizArena.hidden = true;
  quizScoreCard.hidden = true;
  
  if (view === 'welcome') {
    welcomeState.hidden = false;
  } else if (view === 'study') {
    if (cards.length === 0) {
      welcomeState.hidden = false;
      return;
    }
    studyArena.hidden = false;
    studyModeBtn.classList.add('primary');
    quizModeBtn.classList.remove('primary');
    mode = 'study';
    flashcard.classList.remove('flipped');
    renderCard();
  } else if (view === 'quiz') {
    if (cards.length === 0) {
      welcomeState.hidden = false;
      return;
    }
    quizArena.hidden = false;
    studyModeBtn.classList.remove('primary');
    quizModeBtn.classList.add('primary');
    mode = 'quiz';
    startQuiz();
  } else if (view === 'score') {
    quizScoreCard.hidden = false;
  }
}

// Markdown Parser
function parseMarkdown(md) {
  cards = [];
  const lines = md.split('\n');
  
  lines.forEach(line => {
    let clean = line.trim();
    if (!clean) return;
    
    // Check if it's a heading to ignore or keep as context
    if (clean.startsWith('#')) return;
    
    // Clean bullet points
    if (clean.startsWith('- ') || clean.startsWith('* ') || clean.startsWith('+ ')) {
      clean = clean.substring(2).trim();
    } else if (/^\d+\.\s/.test(clean)) {
      clean = clean.replace(/^\d+\.\s/, '').trim();
    }
    
    const parts = clean.split('|').map(p => p.trim());
    if (parts.length >= 2) {
      cards.push({
        front: parts[0],
        back: parts[1],
        hint: parts[2] || '',
        learned: false
      });
    }
  });
  
  currentIndex = 0;
}

// Setup Event Listeners
function setupListeners() {
  // Markdown Textarea Input
  markdownTextarea.addEventListener('input', (e) => {
    parseMarkdown(e.target.value);
    localStorage.setItem('flashcards_md', e.target.value);
    updateStats();
    if (cards.length > 0 && welcomeState.hidden === false) {
      showView('study');
    } else if (cards.length === 0) {
      showView('welcome');
    } else if (mode === 'study') {
      renderCard();
    }
  });
  
  // Example Templates Loading
  templateList.addEventListener('click', (e) => {
    const btn = e.target.closest('.template');
    if (!btn) return;
    const templateKey = btn.getAttribute('data-example');
    loadTemplate(templateKey);
  });
  
  loadInitialExampleBtn.addEventListener('click', () => loadTemplate('capitals'));
  
  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });
  
  // Help Overlay
  helpBtn.addEventListener('click', () => {
    helpOverlay.classList.add('active');
  });
  closeHelpBtn.addEventListener('click', () => {
    helpOverlay.classList.remove('active');
  });
  helpOverlay.addEventListener('click', (e) => {
    if (e.target === helpOverlay) helpOverlay.classList.remove('active');
  });
  
  // Save/Load/Clear
  const exportFileBtn = document.getElementById('exportFileBtn');
  if (exportFileBtn) {
    exportFileBtn.addEventListener('click', () => {
      const text = markdownTextarea.value;
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mazo_estudio.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('flashcards_md', markdownTextarea.value);
    alert('Mazo guardado localmente en este navegador.');
  });
  
  loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('flashcards_md');
    if (saved) {
      markdownTextarea.value = saved;
      parseMarkdown(saved);
      updateStats();
      showView('study');
    } else {
      alert('No hay mazo guardado.');
    }
  });
  
  clearBtn.addEventListener('click', () => {
    if (confirm('¿Vaciar el mazo actual?')) {
      markdownTextarea.value = '';
      cards = [];
      localStorage.removeItem('flashcards_md');
      localStorage.removeItem('flashcards_learned_stats');
      updateStats();
      showView('welcome');
    }
  });
  
  // Mode Selection
  studyModeBtn.addEventListener('click', () => showView('study'));
  quizModeBtn.addEventListener('click', () => showView('quiz'));
  
  // Study Navigation
  flipBtn.addEventListener('click', toggleFlip);
  flashcard.addEventListener('click', toggleFlip);
  
  prevBtn.addEventListener('click', () => {
    if (cards.length === 0) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    flashcard.classList.remove('flipped');
    setTimeout(renderCard, 150);
  });
  
  nextBtn.addEventListener('click', () => {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    flashcard.classList.remove('flipped');
    setTimeout(renderCard, 150);
  });
  
  markLearnedBtn.addEventListener('click', () => {
    if (cards.length === 0) return;
    cards[currentIndex].learned = !cards[currentIndex].learned;
    updateStats();
    saveStatsToLocalStorage();
    // Auto advance to next card if marked learned
    if (cards[currentIndex].learned) {
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        flashcard.classList.remove('flipped');
        setTimeout(renderCard, 150);
      }, 300);
    } else {
      renderCard();
    }
  });
  
  markResetBtn.addEventListener('click', () => {
    if (confirm('¿Reiniciar el estado de todas las tarjetas?')) {
      cards.forEach(c => c.learned = false);
      updateStats();
      saveStatsToLocalStorage();
      renderCard();
    }
  });
  
  // Keyboard Events
  window.addEventListener('keydown', (e) => {
    if (document.activeElement === markdownTextarea) return;
    if (mode === 'study' && !studyArena.hidden) {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleFlip();
      } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    }
  });
  
  // Quiz Actions
  exitQuizBtn.addEventListener('click', () => {
    clearInterval(quizTimerId);
    showView('study');
  });
  
  restartQuizBtn.addEventListener('click', () => {
    showView('quiz');
  });
  
  backToStudyBtn.addEventListener('click', () => {
    showView('study');
  });
}

function loadTemplate(key) {
  const md = EXAMPLES[key];
  if (md) {
    markdownTextarea.value = md;
    localStorage.setItem('flashcards_md', md);
    parseMarkdown(md);
    updateStats();
    showView('study');
  }
}

// Flip Card Action
function toggleFlip() {
  if (cards.length === 0) return;
  playSound('flip');
  flashcard.classList.toggle('flipped');
}

// Render Card in Study Mode
function renderCard() {
  if (cards.length === 0) return;
  
  const card = cards[currentIndex];
  frontText.innerText = card.front;
  backText.innerText = card.back;
  
  if (card.hint) {
    frontPista.innerText = card.hint;
    frontPista.style.visibility = 'visible';
    backDesc.innerText = card.hint;
    backDesc.hidden = false;
  } else {
    frontPista.style.visibility = 'hidden';
    backDesc.hidden = true;
  }
  
  cardCounter.innerText = `Tarjeta ${currentIndex + 1} de ${cards.length}`;
  const progress = ((currentIndex + 1) / cards.length) * 100;
  progressBarFill.style.width = `${progress}%`;
  
  // Mark learned button UI toggle
  if (card.learned) {
    markLearnedBtn.innerText = '✓ Aprendida';
    markLearnedBtn.style.background = 'var(--green)';
    markLearnedBtn.style.color = '#fff';
  } else {
    markLearnedBtn.innerText = 'Marcar Aprendida';
    markLearnedBtn.style.background = 'var(--panel)';
    markLearnedBtn.style.color = 'var(--ink)';
  }
}

// Update Stats display
function updateStats() {
  if (cards.length === 0) {
    learnedCountDisplay.innerText = '0 / 0';
    successRateDisplay.innerText = '0%';
    return;
  }
  const learned = cards.filter(c => c.learned).length;
  learnedCountDisplay.innerText = `${learned} / ${cards.length}`;
  const rate = Math.round((learned / cards.length) * 100);
  successRateDisplay.innerText = `${rate}%`;
}

function saveStatsToLocalStorage() {
  const learnedList = cards.filter(c => c.learned).map(c => c.front);
  localStorage.setItem('flashcards_learned_stats', JSON.stringify(learnedList));
}

// --- Quiz System ---
function startQuiz() {
  if (cards.length < 2) {
    alert('Necesitás al menos 2 tarjetas para jugar un Quiz.');
    showView('study');
    return;
  }
  
  // Shuffle cards and select up to 10 questions
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  quizQuestions = shuffled.slice(0, Math.min(10, cards.length));
  
  currentQuizIndex = 0;
  quizScore = 0;
  quizResults = [];
  quizTotalTimeSpent = 0;
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (currentQuizIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }
  
  clearInterval(quizTimerId);
  const qCard = quizQuestions[currentQuizIndex];
  
  quizProgressText.innerText = `${currentQuizIndex + 1} de ${quizQuestions.length}`;
  quizScoreText.innerText = quizScore;
  quizQuestionText.innerText = qCard.front;
  
  // Distractor generation: pick other random answers
  const correctAns = qCard.back;
  const incorrectCandidates = cards
    .filter(c => c.back !== correctAns)
    .map(c => c.back);
  
  const distractors = [...new Set(incorrectCandidates)].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  // Ensure we have 4 options or fill
  while (distractors.length < 3) {
    distractors.push("Opción adicional " + (distractors.length + 1));
  }
  
  // Combine & Shuffle Options
  const options = [correctAns, ...distractors].sort(() => 0.5 - Math.random());
  
  quizOptionsContainer.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerText = opt;
    btn.addEventListener('click', () => selectQuizOption(btn, opt, correctAns));
    quizOptionsContainer.appendChild(btn);
  });
  
  // Timer settings
  quizTimeLeft = quizTimeLimit;
  quizTimerFill.style.width = '100%';
  quizTimerText.innerText = `${quizTimeLeft}s`;
  quizQuestionStartTime = Date.now();
  
  quizTimerId = setInterval(() => {
    quizTimeLeft--;
    quizTimerText.innerText = `${quizTimeLeft}s`;
    quizTimerFill.style.width = `${(quizTimeLeft / quizTimeLimit) * 100}%`;
    
    if (quizTimeLeft <= 0) {
      clearInterval(quizTimerId);
      // Timeout counts as incorrect
      handleQuizAnswerTimeout(correctAns);
    }
  }, 1000);
}

function selectQuizOption(btnElement, selectedOpt, correctAns) {
  clearInterval(quizTimerId);
  const timeTaken = ((Date.now() - quizQuestionStartTime) / 1000).toFixed(1);
  quizTotalTimeSpent += parseFloat(timeTaken);
  
  // Disable all options
  const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option');
  allBtns.forEach(b => b.disabled = true);
  
  const isCorrect = (selectedOpt === correctAns);
  
  if (isCorrect) {
    btnElement.classList.add('correct');
    quizScore += 10;
    playSound('correct');
  } else {
    btnElement.classList.add('wrong');
    // Highlight correct one
    allBtns.forEach(b => {
      if (b.innerText === correctAns) b.classList.add('correct');
    });
    playSound('wrong');
  }
  
  quizResults.push({
    question: quizQuestions[currentQuizIndex].front,
    correctAnswer: correctAns,
    userAnswer: selectedOpt,
    timeSpent: timeTaken,
    isCorrect: isCorrect
  });
  
  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 1200);
}

function handleQuizAnswerTimeout(correctAns) {
  quizTotalTimeSpent += quizTimeLimit;
  
  // Disable all options and show correct
  const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option');
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.innerText === correctAns) b.classList.add('correct');
  });
  
  playSound('wrong');
  
  quizResults.push({
    question: quizQuestions[currentQuizIndex].front,
    correctAnswer: correctAns,
    userAnswer: "[Tiempo Agotado]",
    timeSpent: quizTimeLimit,
    isCorrect: false
  });
  
  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 1200);
}

function endQuiz() {
  clearInterval(quizTimerId);
  showView('score');
  
  const correctCount = quizResults.filter(r => r.isCorrect).length;
  const avgTime = (quizTotalTimeSpent / quizQuestions.length).toFixed(1);
  
  finalScoreNum.innerText = quizScore;
  quizCorrectCount.innerText = `${correctCount} / ${quizQuestions.length}`;
  quizTimeAverage.innerText = `${avgTime}s`;
  
  // Set grade label
  const percent = (correctCount / quizQuestions.length) * 100;
  if (percent === 100) finalScoreLabel.innerText = "¡Perfecto! Dominás este mazo";
  else if (percent >= 80) finalScoreLabel.innerText = "¡Excelente trabajo!";
  else if (percent >= 60) finalScoreLabel.innerText = "¡Buen esfuerzo, seguí estudiando!";
  else finalScoreLabel.innerText = "Necesitás repasar un poco más";
  
  // Populate review list
  quizReviewContainer.innerHTML = '';
  quizResults.forEach(res => {
    const div = document.createElement('div');
    div.className = `review-item ${res.isCorrect ? 'correct-item' : 'wrong-item'}`;
    
    div.innerHTML = `
      <div class="review-q">${res.question}</div>
      <div class="review-a">Tu respuesta: <span style="text-decoration: ${res.isCorrect ? 'none' : 'line-through'}">${res.userAnswer}</span> ${res.isCorrect ? '' : ` | Correcta: <strong>${res.correctAnswer}</strong>`} (${res.timeSpent}s)</div>
    `;
    quizReviewContainer.appendChild(div);
  });
}

// Start everything
window.addEventListener('DOMContentLoaded', init);
