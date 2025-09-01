// Enhanced JavaScript for SprintMatrix

// Wait for the page DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SprintMatrix...');
    
    // Theme toggle functionality
    initializeThemeToggle();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Form handling
    initializeFormHandling();
    
    // Intersection Observer for animations
    initializeAnimations();
    
    // Stats counter animation
    initializeStatsCounter();
    
    // Mobile menu toggle
    initializeMobileMenu();
    
    // Enhanced button interactions
    initializeButtonInteractions();
    
    // FAQ functionality
    initializeFAQ();
    
    console.log('SprintMatrix initialization complete');
  });
  
  // FAQ toggle functionality
  function initializeFAQ() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFAQ(button);
      });
    });
  }
  
  // Global FAQ toggle function
  function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Toggle content visibility
    content.classList.toggle('hidden');
    
    // Rotate icon
    if (content.classList.contains('hidden')) {
      icon.style.transform = 'rotate(0deg)';
    } else {
      icon.style.transform = 'rotate(180deg)';
    }
  }
  
  // Make toggleFAQ globally available
  window.toggleFAQ = toggleFAQ;
  
  // Theme toggle functionality
  function initializeThemeToggle() {
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const moonIcon = themeToggleBtn.querySelector('.fa-moon');
    const sunIcon = themeToggleBtn.querySelector('.fa-sun');
  
    console.log('Theme toggle initialization:', {
      htmlElement: htmlElement,
      themeToggleBtn: themeToggleBtn,
      savedTheme: savedTheme
    });
  
    // Check if theme toggle button exists
    if (!themeToggleBtn) {
      console.error('Theme toggle button not found!');
      return;
    }
  
    // Function to update icon visibility
    function updateIconVisibility(isDarkMode) {
      if (isDarkMode) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  
    // Determine whether to enable dark mode
    // Default to light mode if no saved preference
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.setAttribute('data-theme', 'dark');
      updateIconVisibility(true);
      console.log('Dark mode enabled on load');
    } else {
      // Default to light mode
      htmlElement.classList.remove('dark');
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // Set default
      updateIconVisibility(false);
      console.log('Light mode enabled on load (default)');
    }
  
    // Listen for clicks on the toggle button
    themeToggleBtn.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      const isDarkMode = htmlElement.classList.toggle('dark');
      
      // Also set data attribute for fallback
      htmlElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      
      // Update icon visibility
      updateIconVisibility(isDarkMode);
      
      console.log('Theme toggled:', isDarkMode ? 'dark' : 'light');
      
      // Add loading animation
      themeToggleBtn.classList.add('loading');
      
      // Save the user's choice
      if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      
      // Remove loading animation after a short delay
      setTimeout(() => {
        themeToggleBtn.classList.remove('loading');
      }, 300);
    });
  
    console.log('Theme toggle initialization complete');
  }
  
  // Test function for debugging theme toggle
  function testThemeToggle() {
    console.log('Testing theme toggle...');
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    console.log('Current theme:', currentTheme);
    
    // Toggle theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.classList.toggle('dark');
    htmlElement.setAttribute('data-theme', newTheme);
    
    console.log('Theme toggled to:', newTheme);
    return newTheme;
  }
  
  // Make test function globally available
  window.testThemeToggle = testThemeToggle;
  
  // Smooth scrolling for navigation links
  function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Form handling
  function initializeFormHandling() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.classList.remove('loading');
          
          // Reset form
          contactForm.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }, 2000);
      });
    }
  }
  
  // Intersection Observer for animations
  function initializeAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
  
  // Stats counter animation
  function initializeStatsCounter() {
    const statsSection = document.querySelector('#stats');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            animateCounter(counter, 0, target, suffix);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
  
  // Animate counter function
  function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Mobile menu toggle
  function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      });
      
      // Close menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          mobileMenuToggle.setAttribute('aria-expanded', false);
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuToggle.setAttribute('aria-expanded', false);
        }
      });
    }
  }
  
  // Enhanced button interactions
  function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('button, a[href="#pricing"]');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
      
      button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  // Add ripple effect styles
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    button, a[href="#pricing"] {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
  
  // Utility function to debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Add scroll-based header styling
  window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 10));
  
  // Add CSS for scrolled header
  const headerStyle = document.createElement('style');
  headerStyle.textContent = `
    header.scrolled {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .dark header.scrolled {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(headerStyle);
  