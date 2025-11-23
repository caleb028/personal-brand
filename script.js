// =========================
// Interactivity & UX
// =========================

const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const year = document.getElementById('year');
const formStatus = document.getElementById('formStatus');
const statusDiv = document.getElementById('status');

year.textContent = new Date().getFullYear();

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Contact form progressive enhancement
const form = document.querySelector('form.contact');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (statusDiv) {
      statusDiv.innerHTML = '<p style="color: #ffffff; padding: 15px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; margin-bottom: 20px;">Sending message...</p>';
    }
    if (formStatus) {
      formStatus.textContent = '';
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.ok) {
        if (statusDiv) {
          statusDiv.innerHTML = '<p style="color: green; padding: 15px; background: rgba(0, 255, 0, 0.1); border: 1px solid green; border-radius: 8px; margin-bottom: 20px;">✓ Message sent successfully! We\'ll get back to you shortly.</p>';
        }
        if (formStatus) {
          formStatus.textContent = '';
        }
        form.reset();
      } else {
        if (statusDiv) {
          statusDiv.innerHTML = '<p style="color: red; padding: 15px; background: rgba(255, 0, 0, 0.1); border: 1px solid red; border-radius: 8px; margin-bottom: 20px;">✗ ' + (result.error || 'Something went wrong. Please try again.') + '</p>';
        }
        if (formStatus) {
          formStatus.textContent = '';
        }
      }
    } catch (err) {
      if (statusDiv) {
        statusDiv.innerHTML = '<p style="color: red; padding: 15px; background: rgba(255, 0, 0, 0.1); border: 1px solid red; border-radius: 8px; margin-bottom: 20px;">✗ Something went wrong. Please try again or email us directly at calebngiciri075@gmail.com</p>';
      }
      if (formStatus) {
        formStatus.textContent = '';
      }
    }
    return false;
  });
}