// Register GSAP plugins (do this once at the top)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ======================
// BURGER MENU
// ======================

const burgerMenu = document.getElementById("burger-menu");
const navMain = document.getElementById("nav-main");
const navLinks = document.querySelectorAll(".nav_link");

if (burgerMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    navMain.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (navMain.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burgerMenu.classList.remove("active");
      navMain.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!burgerMenu.contains(e.target) && !navMain.contains(e.target)) {
      burgerMenu.classList.remove("active");
      navMain.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ======================
// SMOOTH SCROLLING FOR NAV LINKS
// ======================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: target,
          offsetY: 0,
        },
        ease: "power3.inOut",
      });
    }
  });
});

// ======================
// NAV LINKS ENTRANCE ANIMATION
// ======================

// Set initial state for nav links
gsap.set(".nav_link", {
  y: 30,
  opacity: 0,
});

// Animate nav links sliding UP from below with stagger
gsap.to(".nav_link", {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out",
  delay: 0.5,
});

// ======================
// NAV LINK HOVER ANIMATIONS
// ======================

document.querySelectorAll(".nav_link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      y: -5,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// ======================
// HERO SECTION ANIMATIONS
// ======================

// Create a timeline for hero animations
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

// Animate hero title "PORTFOLIO"
heroTimeline.from(".hero h1", {
  scale: 0.5,
  opacity: 0,
  duration: 1.2,
  ease: "back.out(1.7)",
  delay: 0.5,
});

// Animate hero subtitle "Graphic"
heroTimeline.from(
  ".hero h2",
  {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  },
  "-=0.6",
);

// Animate overlays
heroTimeline.from(
  ".grunge-overlay",
  {
    opacity: 0,
    duration: 1.5,
  },
  "-=1",
);

heroTimeline.from(
  ".halftone-overlay",
  {
    opacity: 0,
    scale: 1.2,
    duration: 1.5,
  },
  "-=1.3",
);

// ======================
// SCROLL INDICATOR ANIMATIONS
// ======================

const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
  // Set initial state
  gsap.set(scrollIndicator, {
    y: 50,
    opacity: 0,
  });

  // Animate scroll indicator entrance
  gsap.to(scrollIndicator, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    delay: 1.5,
  });

  // Continuous bounce animation
  gsap.to(scrollIndicator, {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 2.5,
  });

  // Animate scroll arrows in sequence
  gsap.to(".scroll-arrow span", {
    opacity: 0,
    y: 10,
    duration: 1,
    stagger: 0.2,
    repeat: -1,
    ease: "power1.inOut",
    delay: 2.5,
  });

  // Smooth scroll on indicator click
  scrollIndicator.addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: aboutSection,
          offsetY: 0,
        },
        ease: "power3.inOut",
      });
    }
  });

  // Hide scroll indicator after scrolling past hero
  window.addEventListener("scroll", () => {
    const heroHeight = document.querySelector(".hero").offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroHeight * 0.3) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          scrollIndicator.style.pointerEvents = "none";
        },
      });
    } else {
      gsap.to(scrollIndicator, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onStart: () => {
          scrollIndicator.style.pointerEvents = "all";
        },
      });
    }
  });
}

// ======================
// ABOUT SECTION ANIMATIONS
// ======================

// About title animation
gsap.from(".about h1", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// About paragraph animation
gsap.from(".about p", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Doodles animation with stagger
gsap.from('.about-container > div[class$="-doodle"]', {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  scale: 0,
  rotation: 360,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: "back.out(1.7)",
});

// Floating animation for doodles
const doodles = document.querySelectorAll(
  '.about-container > div[class$="-doodle"]',
);
doodles.forEach((doodle, index) => {
  gsap.to(doodle, {
    y: -20,
    rotation: 5,
    duration: 2 + index * 0.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: index * 0.2,
  });
});

// // Social icons animation
// gsap.from(".social-link", {
//   scrollTrigger: {
//     trigger: ".social-icons",
//     start: "top 90%",
//     toggleActions: "play none none reverse",
//     once: false,
//   },
//   scale: 0,
//   opacity: 0,
//   duration: 0.6,
//   stagger: 0.1,
//   ease: "back.out(2)",
// });

// ======================
// PROJECTS SECTION ANIMATIONS
// ======================

// Projects title animation
gsap.from(".projects h1", {
  scrollTrigger: {
    trigger: ".projects",
    start: "top 80%",
    toggleActions: "play none none reverse",
    once: false,
  },
  scale: 0.5,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)",
});

// Project gallery entrance animation
gsap.from(".projects-gallery", {
  scrollTrigger: {
    trigger: ".projects-gallery",
    start: "top 80%",
    toggleActions: "play none none reverse",
    once: false,
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

console.log("🎨 All Animations Loaded");
