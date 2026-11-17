// ===================== RadiantRoots — site script =====================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open-mobile');
      toggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#FBF9F4;padding:1.5rem 2rem;gap:1.2rem;border-bottom:1px solid rgba(15,30,58,0.1);';
      } else {
        links.removeAttribute('style');
      }
    });
  }

  // Toast helper available site-wide
  window.rrToast = function (message) {
    let toast = document.querySelector('.rr-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'rr-toast';
      toast.innerHTML = '<span class="dot"></span><span class="msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('.msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__rrToastTimer);
    window.__rrToastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  // Contact form (Join / Contact page)
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('#contactStatus');
      const name = contactForm.querySelector('#cf-name').value.trim();
      if (!name) {
        status.textContent = 'Please share your name so we know who to welcome.';
        status.className = 'form-status';
        return;
      }
      status.textContent = `Thank you, ${name.split(' ')[0]} — we'll reply within one business day.`;
      status.className = 'form-status success';
      contactForm.reset();
      window.rrToast('Message sent — see you on the mat soon 🌿');
    });
  }

  // Newsletter form (footer)
  const newsletterForm = document.querySelector('#newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      window.rrToast('You\'re subscribed to Sunday Stillness ✦');
    });
  }

  // ---------------- Auth page ----------------
  const authTabs = document.querySelectorAll('.auth-tabs button');
  if (authTabs.length) {
    authTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        authTabs.forEach((t) => t.classList.remove('active'));
        document.querySelectorAll('.auth-panel').forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`#${tab.dataset.target}`).classList.add('active');
      });
    });
  }

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#login-email').value.trim();
      const alertBox = document.querySelector('#loginAlert');
      alertBox.classList.add('show');
      alertBox.textContent = `Welcome back${email ? ', ' + email.split('@')[0] : ''} — redirecting to your studio home…`;
      setTimeout(() => { window.location.href = 'index.html'; }, 1400);
    });
  }

  const signupForm = document.querySelector('#signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#signup-name').value.trim();
      const alertBox = document.querySelector('#signupAlert');
      alertBox.classList.add('show');
      alertBox.textContent = `Account created for ${name || 'you'} — welcome to RadiantRoots!`;
      setTimeout(() => { window.location.href = 'index.html'; }, 1400);
    });
  }

  // Password visibility toggles
  document.querySelectorAll('.pw-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.querySelector(btn.dataset.for);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
  });

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .8s ease, transform .8s ease';
      io.observe(el);
    });
  }

  // Active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
