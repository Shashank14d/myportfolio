// Navbar toggle for mobile with animation
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

// Sticky navbar smooth scroll with offset
const navbarHeight = document.querySelector('header').offsetHeight;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const targetPosition = target.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll-to-top button with enhanced visibility
const scrollBtn = document.getElementById('scrollToTop');
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
      isScrolling = false;
    });
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
});

// Show a custom thank you message after Formspree AJAX submission
const form = document.getElementById('contact-form');
const overlay = document.getElementById('message-overlay');
const closeOverlayBtn = document.getElementById('close-overlay');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const formMsg = document.getElementById('form-message');
    if (formMsg) {
      formMsg.style.opacity = 0;
      formMsg.style.display = 'flex';
      formMsg.classList.remove('error', 'visible');
      formMsg.innerHTML = '';
    }
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        // Show overlay
        if (overlay) {
          overlay.classList.add('active');
        }
        // Hide overlay after 4 seconds
        setTimeout(() => {
          if (overlay) overlay.classList.remove('active');
        }, 4000);
      } else {
        if (formMsg) {
          formMsg.innerHTML = '<span class="msg-icon">❌</span> Oops! There was a problem sending your message.';
          formMsg.classList.add('error', 'visible');
          formMsg.style.color = '#e63946';
          formMsg.style.background = 'rgba(230, 57, 70, 0.08)';
          setTimeout(() => {
            formMsg.style.opacity = 1;
            formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    } catch (error) {
      if (formMsg) {
        formMsg.innerHTML = '<span class="msg-icon">❌</span> Oops! There was a problem sending your message.';
        formMsg.classList.add('error', 'visible');
        formMsg.style.color = '#e63946';
        formMsg.style.background = 'rgba(230, 57, 70, 0.08)';
        setTimeout(() => {
          formMsg.style.opacity = 1;
          formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  });
}

if (closeOverlayBtn && overlay) {
  closeOverlayBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});