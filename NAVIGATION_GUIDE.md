# Navigation Guide for index.html

## Overview
This document explains where each button and link in your index.html should take users.

---

## 1. HEADER NAVIGATION LINKS (Lines 19-23)
These are **anchor links** that scroll to sections on the same page:

### Code:
```html
<nav class="nav-links">
  <a href="#hero">Home</a>           <!-- Scrolls to top/hero section -->
  <a href="#about">About</a>         <!-- Scrolls to About section -->
  <a href="#portfolio">Portfolio</a> <!-- Scrolls to Portfolio section -->
  <a href="#services">Services</a>   <!-- Scrolls to Services section -->
  <a href="#contact">Contact</a>     <!-- Scrolls to Contact section -->
</nav>
```

### How it works:
- Uses **hash links** (`#section-id`) to scroll to sections on the same page
- Each section has a matching `id` attribute (e.g., `<section id="hero">`)
- Smooth scrolling is enabled via CSS: `html { scroll-behavior: smooth; }`

---

## 2. HERO SECTION BUTTONS (Lines 40-41)
These buttons are also anchor links that scroll to sections:

### Code:
```html
<div class="cta">
  <a href="#portfolio" class="btn">Explore Our Work</a>  <!-- Scrolls to Portfolio -->
  <a href="#contact" class="btn alt">Get Free Quote</a>  <!-- Scrolls to Contact -->
</div>
```

### Navigation:
- **"Explore Our Work"** → Scrolls to `#portfolio` section (line 195)
- **"Get Free Quote"** → Scrolls to `#contact` section (line 281)

---

## 3. FOOTER QUICK LINKS (Lines 332-335)
These are also anchor links for quick navigation:

### Code:
```html
<div class="footer-links">
  <a href="#about">About Us</a>      <!-- Scrolls to About section -->
  <a href="#services">Services</a>   <!-- Scrolls to Services section -->
  <a href="#portfolio">Portfolio</a> <!-- Scrolls to Portfolio section -->
  <a href="#contact">Contact</a>     <!-- Scrolls to Contact section -->
</div>
```

---

## 4. SOCIAL MEDIA LINKS (Lines 341-344)
These open external websites in new tabs:

### Code:
```html
<div class="links">
  <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
  <a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
  <a href="https://twitter.com/" target="_blank" rel="noopener">Twitter</a>
  <a href="mailto:calebngiciri075@gmail.com">Email</a>
</div>
```

### Navigation:
- **GitHub** → Opens `https://github.com/` in new tab
- **LinkedIn** → Opens `https://www.linkedin.com/` in new tab
- **Twitter** → Opens `https://twitter.com/` in new tab
- **Email** → Opens email client with `calebngiciri075@gmail.com`

### ⚠️ ACTION NEEDED:
**Update these URLs with your actual social media profiles:**
```html
<a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener">GitHub</a>
<a href="https://www.linkedin.com/in/YOUR_PROFILE" target="_blank" rel="noopener">LinkedIn</a>
<a href="https://twitter.com/YOUR_HANDLE" target="_blank" rel="noopener">Twitter</a>
```

---

## 5. CONTACT FORM SUBMIT BUTTON (Line 304)
This submits the form to a PHP file:

### Code:
```html
<form class="contact" action="contact.php" method="POST" novalidate>
  <!-- form fields -->
  <button type="submit" class="btn">Send Message</button>
</form>
```

### Navigation:
- **"Send Message"** → Submits form data to `contact.php` via POST method
- Form data is sent to the server, not to another page
- You need to create `contact.php` to handle the form submission

---

## 6. CONTACT EMAIL LINK (Line 311)
Opens email client:

### Code:
```html
<a href="mailto:calebngiciri075@gmail.com">calebngiciri075@gmail.com</a>
```

### Navigation:
- Opens user's default email client with `calebngiciri075@gmail.com` as recipient

---

## 7. CONTROL BUTTONS (Lines 26-27)
These are JavaScript-controlled buttons:

### Code:
```html
<button class="icon" id="langToggle" aria-label="Toggle language">EN</button>
<button class="icon menu-toggle" id="menuToggle" aria-label="Toggle menu">Menu</button>
```

### Navigation:
- **"EN" (Language Toggle)** → Requires JavaScript in `script.js` to toggle language
- **"Menu" (Mobile Menu)** → Requires JavaScript in `script.js` to toggle mobile navigation

### ⚠️ ACTION NEEDED:
**You need to add JavaScript functionality in `script.js`:**

```javascript
// Language Toggle
document.getElementById('langToggle').addEventListener('click', function() {
  // Add your language switching logic here
  console.log('Language toggle clicked');
});

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('open');
});
```

---

## SUMMARY TABLE

| Button/Link | Location | Destination | Type |
|------------|----------|-------------|------|
| Home | Header nav | `#hero` (top of page) | Anchor link |
| About | Header nav | `#about` section | Anchor link |
| Portfolio | Header nav | `#portfolio` section | Anchor link |
| Services | Header nav | `#services` section | Anchor link |
| Contact | Header nav | `#contact` section | Anchor link |
| Explore Our Work | Hero section | `#portfolio` section | Anchor link |
| Get Free Quote | Hero section | `#contact` section | Anchor link |
| About Us | Footer | `#about` section | Anchor link |
| Services | Footer | `#services` section | Anchor link |
| Portfolio | Footer | `#portfolio` section | Anchor link |
| Contact | Footer | `#contact` section | Anchor link |
| GitHub | Footer | `https://github.com/` | External link (needs update) |
| LinkedIn | Footer | `https://www.linkedin.com/` | External link (needs update) |
| Twitter | Footer | `https://twitter.com/` | External link (needs update) |
| Email | Footer | `mailto:calebngiciri075@gmail.com` | Email link |
| Email | Contact section | `mailto:calebngiciri075@gmail.com` | Email link |
| Send Message | Contact form | `contact.php` (form submission) | Form submit |
| EN (Language) | Header | JavaScript function needed | Button (needs JS) |
| Menu | Header | JavaScript function needed | Button (needs JS) |

---

## SECTION IDs REFERENCE

Make sure these IDs exist in your HTML for anchor links to work:

- `#hero` → Line 33: `<section id="hero" class="hero">`
- `#about` → Line 62: `<section id="about">`
- `#services` → Line 119: `<section id="services">`
- `#portfolio` → Line 195: `<section id="portfolio">`
- `#contact` → Line 281: `<section id="contact">`
- `#testimonials` → Line 244: `<section id="testimonials">` (not linked, but exists)

---

## RECOMMENDED ACTIONS

1. ✅ **Update Social Media URLs** - Replace placeholder URLs with your actual profiles
2. ✅ **Create contact.php** - Handle form submissions
3. ✅ **Add JavaScript** - Implement language toggle and mobile menu functionality
4. ✅ **Test all links** - Ensure all anchor links scroll correctly

