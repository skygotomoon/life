const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');
const themeStorageKey = 'annual-review-theme';
const easterEggButton = document.getElementById('easter-egg');
const easterEggMessage = document.getElementById('easter-egg-message');
const easterEggLines = [
  '别急，你正在成为那个你曾经很羡慕的大人。',
  '你不是从零开始，你是带着经验再次出发。',
  '有些花开得晚，但依旧会很漂亮。'
];

function applyTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark', isDark);
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☾' : '☼';
  }
}

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
