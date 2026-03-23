const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');
const themeStorageKey = 'annual-review-theme';
const easterEggButton = document.getElementById('easter-egg');
const easterEggMessage = document.getElementById('easter-egg-message');
const hitButton = document.getElementById('hit-button');
const tennisLayer = document.getElementById('tennis-layer');
const quoteToast = document.getElementById('quote-toast');
const easterEggLines = [
  '别急，你正在成为那个你曾经很羡慕的大人。',
  '你不是从零开始，你是带着经验再次出发。',
  '有些花开得晚，但依旧会很漂亮。'
];
const tennisQuotes = [
  '既然选择了远方，便只顾风雨兼程。',
  '真正的回归，不是回到原点，而是带着伤痕继续前进。',
  '每一次发球，都是重新掌控比赛的开始。'
];

function applyTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark', isDark);
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☾' : '☼';
  }
}

function playHitSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(280, audioContext.currentTime + 0.12);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.18);

  oscillator.onended = () => {
    audioContext.close();
  };
}

function launchTennisBall() {
  if (!tennisLayer) return;

  const ball = document.createElement('span');
  ball.className = 'tennis-ball-fly';
  ball.textContent = '🎾';
  ball.style.top = `${18 + Math.random() * 48}%`;
  ball.style.setProperty('--flight-rotate', `${-35 + Math.random() * 70}deg`);
  ball.style.setProperty('--flight-duration', `${1.4 + Math.random() * 0.8}s`);
  tennisLayer.appendChild(ball);

  ball.addEventListener('animationend', () => {
    ball.remove();
  });
}

function showQuoteToast() {
  if (!quoteToast) return;
  const quote = tennisQuotes[Math.floor(Math.random() * tennisQuotes.length)];
  quoteToast.textContent = quote;
  quoteToast.classList.add('is-visible');

  window.clearTimeout(showQuoteToast.timeoutId);
  showQuoteToast.timeoutId = window.setTimeout(() => {
    quoteToast.classList.remove('is-visible');
  }, 2600);
}
showQuoteToast.timeoutId = 0;

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme) {
  applyTheme(savedTheme);
}

themeToggle?.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});

easterEggButton?.addEventListener('click', () => {
  const line = easterEggLines[Math.floor(Math.random() * easterEggLines.length)];
  if (easterEggMessage) {
    easterEggMessage.textContent = line;
  }
});

hitButton?.addEventListener('click', () => {
  launchTennisBall();
  playHitSound();
  showQuoteToast();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});
