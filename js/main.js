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

// ======================
// SIMPLE SOCIAL ICONS ANIMATION
// ======================

// Set initial state
gsap.set(".social-link", {
  scale: 0,
  opacity: 0,
});

// Animate on scroll - simple and smooth
gsap.to(".social-link", {
  scrollTrigger: {
    trigger: ".social-icons",
    start: "top 85%",
    toggleActions: "play none none reverse",
    once: false,
  },
  scale: 1,
  opacity: 1,
  duration: 0.6,
  stagger: 0.15,
  ease: "back.out(1.7)",
});

// Simple hover effect
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

console.log("✨ Simple Social Icons Animation Loaded");
// ======================
// PROJECTS SECTION - IZUMI DRESS STYLE
// ======================

// ======================
// LARGE HERO CAROUSEL (Infinite Scroll)
// ======================

const heroCarouselTrack = document.querySelector(".hero-carousel-track");

if (heroCarouselTrack) {
  const heroSlides = Array.from(
    heroCarouselTrack.querySelectorAll(".hero-slide"),
  );
  const slideWidth = window.innerWidth;
  const totalSlides = heroSlides.length / 2; // Half because we duplicate
  const totalWidth = slideWidth * totalSlides;

  // Adjust animation speed based on screen size
  let duration = 60; // Desktop default
  if (window.innerWidth <= 768) {
    duration = 45; // Faster on mobile
  } else if (window.innerWidth <= 1024) {
    duration = 52; // Medium speed on tablet
  }

  // GSAP infinite horizontal scroll
  gsap.to(heroCarouselTrack, {
    x: -totalWidth,
    duration: duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  // Pause on hover (desktop) and touch (mobile)
  const heroContainer = document.querySelector(".hero-carousel-container");

  // Desktop hover
  heroContainer.addEventListener("mouseenter", () => {
    gsap.to(heroCarouselTrack, {
      timeScale: 0.2, // Very slow on hover
      duration: 0.8,
      ease: "power2.out",
    });
  });

  heroContainer.addEventListener("mouseleave", () => {
    gsap.to(heroCarouselTrack, {
      timeScale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Mobile touch support
  let touchStartX = 0;
  let touchEndX = 0;

  heroContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    gsap.to(heroCarouselTrack, {
      timeScale: 0.1,
      duration: 0.3,
    });
  });

  heroContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    gsap.to(heroCarouselTrack, {
      timeScale: 1,
      duration: 0.5,
    });
  });

  heroContainer.addEventListener("touchmove", (e) => {
    // Allow natural scrolling feel
    touchEndX = e.changedTouches[0].screenX;
  });

  // Update slide width on resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlideWidth = window.innerWidth;
      const newTotalWidth = newSlideWidth * totalSlides;

      // Adjust animation speed based on screen size
      let duration = 60; // Desktop default
      if (window.innerWidth <= 768) {
        duration = 45; // Faster on mobile
      } else if (window.innerWidth <= 1024) {
        duration = 52; // Medium speed on tablet
      }

      gsap.killTweensOf(heroCarouselTrack);
      gsap.set(heroCarouselTrack, { x: 0 });
      gsap.to(heroCarouselTrack, {
        x: -newTotalWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % newTotalWidth),
        },
      });
    }, 250);
  });
}

// ======================
// FEATURES SECTION ANIMATIONS
// ======================

// Features title animation
gsap.from(".features-title", {
  scrollTrigger: {
    trigger: ".projects-features",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// Feature items animation
const featureItems = document.querySelectorAll(".feature-item");

featureItems.forEach((item, index) => {
  const isReverse = item.querySelector(".feature-content.reverse");

  // Animate number
  const number = item.querySelector(".feature-number");
  gsap.from(number, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // Animate text content
  const text = item.querySelector(".feature-text");
  gsap.from(text, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    x: isReverse ? 100 : -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Animate image
  const image = item.querySelector(".feature-image");
  gsap.from(image, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    x: isReverse ? -100 : 100,
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "power3.out",
  });

  // Animate tags with stagger
  const tags = item.querySelectorAll(".tag");
  gsap.from(tags, {
    scrollTrigger: {
      trigger: item,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    y: 20,
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)",
  });

  // Parallax effect on feature images
  gsap.to(image, {
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -30,
    ease: "none",
  });
});

// ======================
// HERO CAROUSEL ENTRANCE
// ======================

gsap.from(".hero-carousel-container", {
  opacity: 0,
  scale: 1.1,
  duration: 1.5,
  ease: "power3.out",
  delay: 0.5,
});

// Add slide-in animation for hero slides
const heroSlides = document.querySelectorAll(".hero-slide");
heroSlides.forEach((slide, index) => {
  if (index < 6) {
    // Only first set, not duplicates
    gsap.from(slide, {
      x: window.innerWidth,
      opacity: 0,
      duration: 1.2,
      delay: 0.8 + index * 0.1,
      ease: "power3.out",
    });
  }
});

console.log("🎨 IZUMI-Style Projects Loaded");

// ======================
// CURSOR
// ======================

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.12; // controls stickiness

// Track mouse movement
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate sticky cursor
function animate() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();

// Optional: scale cursor on click
window.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
});

window.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

// ======================
// SMOOTH SCROLLING
// ======================

gsap.registerPlugin(ScrollToPlugin);

let target = window.scrollY;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault(); // prevent default jump
    target += e.deltaY; // update desired scroll position

    // limit scroll between top and bottom
    target = Math.max(
      0,
      Math.min(target, document.body.scrollHeight - window.innerHeight),
    );

    gsap.to(window, {
      duration: 3, // smooth scroll speed
      scrollTo: target,
      ease: "power3.out",
      overwrite: "auto", // prevents queueing too many animations
    });
  },
  { passive: false },
);
// ======================
// SCROLL PROGRESS INDICATOR with GSAP
// ======================

// Create the scroll progress HTML structure
function createScrollProgress() {
  const progressHTML = `
    <div class="scroll-progress">
      <div class="scroll-progress__bar"></div>
    </div>
    <div class="scroll-progress__percentage">0%</div>
  `;

  document.body.insertAdjacentHTML("afterbegin", progressHTML);
}

// Initialize scroll progress
createScrollProgress();

// Get elements
const progressBar = document.querySelector(".scroll-progress__bar");
const percentageDisplay = document.querySelector(
  ".scroll-progress__percentage",
);

// Set initial state
gsap.set(progressBar, { scaleX: 0, transformOrigin: "left" });
gsap.set(percentageDisplay, { scale: 0, opacity: 0 });

// Entrance animation for percentage display
gsap.to(percentageDisplay, {
  scale: 1,
  opacity: 1,
  duration: 0.8,
  ease: "back.out(1.7)",
  delay: 1,
});

// Update progress on scroll
function updateScrollProgress() {
  // Calculate scroll percentage
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const trackLength = documentHeight - windowHeight;
  const scrollPercentage = (scrollTop / trackLength) * 100;

  // Clamp between 0 and 100
  const percentage = Math.min(100, Math.max(0, scrollPercentage));

  // Update progress bar with GSAP
  gsap.to(progressBar, {
    scaleX: percentage / 100,
    duration: 0.3,
    ease: "power2.out",
  });

  // Update percentage text with animation
  const currentPercentage = parseInt(percentageDisplay.textContent);
  if (Math.abs(percentage - currentPercentage) > 1) {
    gsap.to(percentageDisplay, {
      innerText: Math.round(percentage),
      duration: 0.3,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        percentageDisplay.textContent =
          Math.round(this.targets()[0].innerText) + "%";
      },
    });

    // Scale bounce effect when percentage updates
    gsap.fromTo(
      percentageDisplay,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      },
    );
  }

  // Color transition effect based on progress
  const hue = percentage * 3.6; // 0-360 degrees
  progressBar.style.filter = `hue-rotate(${hue}deg)`;
}

// Throttled scroll event
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      updateScrollProgress();
      scrollTimeout = null;
    }, 10);
  }
});

// Initial update
updateScrollProgress();

// Pulsing animation when reaching milestones
function triggerMilestone(percentage) {
  if (
    percentage === 25 ||
    percentage === 50 ||
    percentage === 75 ||
    percentage === 100
  ) {
    // Burst effect
    gsap.to(progressBar, {
      boxShadow:
        "0 0 40px rgba(255, 0, 110, 1), 0 0 80px rgba(255, 107, 53, 0.8)",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Percentage bounce
    gsap.fromTo(
      percentageDisplay,
      { scale: 1 },
      {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
    );
  }
}

// Track milestones
let lastMilestone = 0;
window.addEventListener("scroll", () => {
  const percentage = Math.round(
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
      100,
  );
  const currentMilestone = Math.floor(percentage / 25) * 25;

  if (currentMilestone > lastMilestone && currentMilestone > 0) {
    triggerMilestone(currentMilestone);
    lastMilestone = currentMilestone;
  }
});

console.log("✨ Scroll Progress Indicator Loaded");

// ======================
// CONTACT SECTION ANIMATIONS
// ======================

// Marquee entrance animation
gsap.from(".marquee", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// Email title animation - split and stagger letters
const emailTitle = document.querySelector(".contact h1");
if (emailTitle) {
  const text = emailTitle.textContent;
  emailTitle.innerHTML = text
    .split("")
    .map((char) => `<span class="char">${char}</span>`)
    .join("");

  gsap.from(".contact h1 .char", {
    scrollTrigger: {
      trigger: ".contact h1",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    rotationX: -90,
    duration: 0.8,
    stagger: 0.03,
    ease: "back.out(1.7)",
  });
}

// Contact container background animation
gsap.from(".contact-container", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

console.log("🎨 All Animations Loaded");
