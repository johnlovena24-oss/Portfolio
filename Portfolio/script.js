document.addEventListener('DOMContentLoaded', () => {

  const words = ['Web Developer', 'Musician'];
  const el = document.querySelector('.typing-text');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = words[wordIndex];
    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 100);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
      }
      setTimeout(typeEffect, 50);
    }
  }

  typeEffect();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .stat-card, .about-text, .about-image, .section-header, .category-header, .hero-image').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#64ffda';
    btn.style.color = '#0a192f';
    this.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });

  const toggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  if (localStorage.getItem('theme') === 'light') {
    html.removeAttribute('data-theme');
    toggle.textContent = '🌙';
  } else {
    html.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }

  toggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '☀️';
    }
  });

});
