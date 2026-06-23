// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a nav link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Set current year in footer
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    // Update button state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('opacity-75');

    try {
      // For now, simulate sending. In production, replace with actual API endpoint.
      // const response = await fetch('/api/contact', { ... });
      await new Promise(resolve => setTimeout(resolve, 1000));

      formStatus.classList.remove('hidden', 'text-red-600');
      formStatus.classList.add('text-green-600');
      formStatus.textContent = 'Thank you! We\'ll be in touch shortly.';
      contactForm.reset();
    } catch (err) {
      formStatus.classList.remove('hidden', 'text-green-600');
      formStatus.classList.add('text-red-600');
      formStatus.textContent = 'Something went wrong. Please try again or call us directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('opacity-75');

      // Hide status after 5 seconds
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    }
  });
}
