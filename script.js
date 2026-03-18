/**
 * Victor Robles Portfolio - script.js
 * Handles: navbar scroll, mobile menu, scroll animations, contact form
 */

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for blur effect
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link on scroll
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  const isOpen = navLinksList.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinksList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
  });
});

/* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if the parent has multiple cards
      const delay = entry.target.closest('.skills-grid, .projects-grid, .about-cards')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => observer.observe(el));

/* ===== SKILL CARDS STAGGER ===== */
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skillCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 70);
    });
    skillObserver.unobserve(entries[0].target);
  }
}, { threshold: 0.1 });

if (skillCards.length) {
  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });
  skillObserver.observe(skillCards[0].closest('.skills-grid') || skillCards[0]);
}

/* ===== PROJECT CARDS STAGGER ===== */
const projectCards = document.querySelectorAll('.project-card');
const projObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    projectCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 100);
    });
    projObserver.unobserve(entries[0].target);
  }
}, { threshold: 0.1 });

if (projectCards.length) {
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease, box-shadow 0.25s ease';
  });
  projObserver.observe(projectCards[0].closest('.projects-grid') || projectCards[0]);
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate async send
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      btnText.textContent = 'Enviar Mensaje';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1500);
  });
}

/* ===== SMOOTH ANCHOR SCROLLING (offset for fixed navbar) ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

/* ===== TYPING CURSOR EFFECT (Hero subtitle) ===== */
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const originalText = heroDesc.textContent;
  heroDesc.textContent = '';
  let i = 0;
  const speed = 18; // ms per char

  function typeChar() {
    if (i < originalText.length) {
      heroDesc.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }

  // Start typing after a brief delay
  setTimeout(typeChar, 800);
}

/* ===== GLOW FOLLOW MOUSE (hero section) ===== */
const hero = document.querySelector('.hero');
const heroBgGlow = document.querySelector('.hero-bg-glow');

if (hero && heroBgGlow) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - 350;
    const y = e.clientY - rect.top - 350;
    heroBgGlow.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
}
