/**
 * Portfolio Navigation Script
 * Handles mobile menu toggling and scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // Theme State
  let isLightMode = localStorage.getItem('theme') === 'light';

  // Apply initial theme
  if (isLightMode) {
    document.body.classList.add('light-mode');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  const toggleTheme = () => {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
    
    if (sunIcon && moonIcon) {
      if (isLightMode) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // State
  let isMenuOpen = false;

  /**
   * Toggles the mobile navigation menu
   */
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    
    // Toggle CSS classes for animation
    drawer.classList.toggle('open', isMenuOpen);
    navbar.classList.toggle('open', isMenuOpen);
    
    // Switch hamburger icons
    iconOpen.style.display = isMenuOpen ? 'none' : 'block';
    iconClose.style.display = isMenuOpen ? 'block' : 'none';
  };

  /**
   * Adds a shadow to the navbar when scrolling down
   */
  const handleScroll = () => {
    // Add 'scrolled' class if scrolled past 20px
    const isScrolled = window.scrollY > 20;
    navbar.classList.toggle('scrolled', isScrolled);
  };

  // Event Listeners
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 100; // Account for fixed navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Scroll Reveal Animation
   */
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
  });

  document.querySelectorAll('.reveal-item').forEach(item => {
    revealObserver.observe(item);
  });

  window.addEventListener('scroll', handleScroll);
});