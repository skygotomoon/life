const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');
const themeStorageKey = 'annual-review-theme';
const easterEggButton = document.getElementById('easter-egg');
const easterEggMessage = document.getElementById('easter-egg-message');
const easterEggText =
  '这一年，不仅是在华东交大的英语决赛中捧回1等奖，更是在零件、代码与仿真数据中找到了属于机械人的浪漫。从图书馆的文献综述到实验室的机床轰鸣，每一步都是对复杂系统的解构。接下来，是走向工业现场的星辰大海——offer 在手，未来可期！';

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
  if (easterEggMessage) {
    easterEggMessage.textContent = easterEggText;
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
