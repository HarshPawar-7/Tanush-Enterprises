/*
  Tanush Enterprises - Main JavaScript (Updated for Modal Interactivity)
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // 3. Scroll Animations (Intersection Observer)
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach(el => observer.observe(el));

  // 4. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-box .number');
  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target, 0, parseInt(entry.target.dataset.target), 2000);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => statObserver.observe(stat));
  
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      obj.innerHTML = Math.floor(easeProgress * (end - start) + start) + (obj.dataset.suffix || "");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // 5. Quote Modal Logic
  const modal = document.getElementById('quoteModal');
  const openModalBtns = document.querySelectorAll('.trigger-quote');
  const closeModalBtn = document.getElementById('closeModal');
  
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind all trigger buttons
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Bind close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Click outside modal content to close
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handling Form Submission visually (prevent page reload)
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = 'Sending...';
      btn.style.backgroundColor = 'var(--success)';
      
      // Simulate API call delay
      setTimeout(() => {
        btn.innerHTML = '✔️ Sent Successfully';
        setTimeout(() => {
          closeModal();
          form.reset();
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 2000);
      }, 1000);
    });
  }
});
