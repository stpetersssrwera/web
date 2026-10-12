(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
    toggle.textContent = opened ? '×' : '☰';
  });
  document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Open navigation'); }
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const toTop = document.querySelector('.to-top');
  const updateTop = () => toTop?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateTop, { passive: true });
  updateTop();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  // Rotate through real school photos every five seconds.
  const heroPhoto = document.querySelector('.hero-photo');
  const heroImages = ['assets/learners-01.jpeg','assets/learners-02.jpeg','assets/learners-03.jpeg','assets/learners-05.jpeg','assets/learners-07.jpeg','assets/learners-10.jpeg','assets/learners-12.jpeg'];
  heroImages.forEach(src => { const img = new Image(); img.src = src; });
  let heroIndex = 0;
  if (heroPhoto && heroImages.length > 1) {
    window.setInterval(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroPhoto.style.backgroundImage = `url("${heroImages[heroIndex]}")`;
    }, 5000);
  }

  // Contact form opens WhatsApp with a prepared message; it does not store submissions.
  const contactForm = document.getElementById('whatsapp-contact-form');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const phone = document.getElementById('sender-phone').value.trim();
    const topic = document.getElementById('message-topic').value;
    const message = document.getElementById('sender-message').value.trim();
    const text = `St. Peter’s SS Rwera website enquiry\nName: ${name}\nPhone: ${phone || 'Not provided'}\nSubject: ${topic}\nMessage: ${message}`;
    window.open(`https://wa.me/256776747621?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  const dialog = document.getElementById('lightbox');
  const dialogImage = dialog?.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = item.dataset.full;
    dialogImage.alt = item.querySelector('img')?.alt || 'School photograph';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(item.dataset.full, '_blank', 'noopener');
  }));
  dialog?.querySelector('.close-lightbox')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
