const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const themeToggle = document.getElementById('theme-toggle');
const themeStorageKey = 'annual-theme';

function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
}

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme) applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  localStorage.setItem(themeStorageKey, next);
  applyTheme(next);
});

const milestones = document.querySelectorAll('.milestone');
const projectTitle = document.getElementById('project-title');
const projectSubtitle = document.getElementById('project-subtitle');
const projectDesc = document.getElementById('project-desc');
const projectDetail = document.getElementById('project-detail');

function activateMilestone(button) {
  milestones.forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-selected', 'false');
  });

  button.classList.add('is-active');
  button.setAttribute('aria-selected', 'true');

  projectTitle.textContent = button.dataset.title;
  projectSubtitle.textContent = button.dataset.subtitle;
  projectDesc.textContent = button.dataset.desc;
  projectDetail.textContent = button.dataset.detail;
}

milestones.forEach((button) => {
  button.addEventListener('click', () => activateMilestone(button));
});

const photoCards = [
  ['year-photo', 'year-photo-card'],
  ['slot-t1', 'slot-t1-card'],
  ['slot-t2', 'slot-t2-card'],
  ['slot-t3', 'slot-t3-card'],
];

photoCards.forEach(([imgId, cardId]) => {
  const img = document.getElementById(imgId);
  const card = document.getElementById(cardId);
  if (!img || !card) return;

  const setLoaded = () => card.classList.add('has-image');
  const setMissing = () => card.classList.remove('has-image');

  img.addEventListener('load', setLoaded);
  img.addEventListener('error', setMissing);

  if (img.complete && img.naturalWidth > 0) {
    setLoaded();
  }
});
