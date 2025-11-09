// ...existing JS code from <script> tag in portfolio.html...
// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const theme = body.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Scroll Effect
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Skill Bar Animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars =
          entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".skill-category").forEach((category) => {
  skillObserver.observe(category);
});

// Form Submission - Updated to actually send email
document
  .querySelector(".contact-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Option 1: Simple mailto fallback (opens user's email client)
    const mailtoLink = `mailto:syedmdfawaz@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    
    // Clear form after a short delay
    setTimeout(() => {
      e.target.reset();
      alert("Your email client should open. If not, please email me directly at syedmdfawaz@gmail.com");
    }, 500);
    
    // Option 2: Use EmailJS (free service) - Uncomment and configure if you prefer
    // First, sign up at emailjs.com and add this script to your HTML head:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    // Then replace the mailto code above with:
    /*
    emailjs.init("YOUR_PUBLIC_KEY"); // Get from emailjs.com
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: name,
      from_email: email,
      message: message,
    }).then(() => {
      alert("Thank you! Your message has been sent successfully.");
      e.target.reset();
    }).catch(() => {
      alert("Failed to send message. Please email me directly at syedmdfawaz@gmail.com");
    });
    */
  });

// Typing Effect for Hero Section (Optional Enhancement)
const roles = [
  "Developer",
  "Problem Solver",
  "Tech Enthusiast",
  "Quick Learner",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
  const heroP = document.querySelector(".hero-text p");
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  const displayText = currentRole.substring(0, charIndex);
  heroP.innerHTML = `Pre-Final Year Engineering Student | Passionate ${displayText}${
    !isDeleting && charIndex === currentRole.length ? "" : "|"
  }`;

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    timeout = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, timeout);
}

// Uncomment to enable typing effect
// setTimeout(typeRole, 1000);

// Profile image 3D tilt effect following cursor
const profileImg = document.querySelector(".profile-img");
if (profileImg) {
  profileImg.addEventListener("mousemove", (e) => {
    const rect = profileImg.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X relative to image
    const y = e.clientY - rect.top;  // cursor Y relative to image
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (-20 to +20 degrees)
    const rotateX = ((y - centerY) / centerY) * -15; // inverted for natural feel
    const rotateY = ((x - centerX) / centerX) * 15;
    
    profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
  });
  
  profileImg.addEventListener("mouseleave", () => {
    profileImg.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  });
}
