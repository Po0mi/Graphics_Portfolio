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

// Social icons animation
// Set initial state
gsap.set(".social-link", {
  scale: 0,
  opacity: 0,
});

// Animate on scroll
gsap.to(".social-link", {
  scrollTrigger: {
    trigger: ".social-icons",
    start: "top 90%",
    toggleActions: "play none none reverse",
    once: false,
  },
  scale: 1,
  opacity: 1,
  y: 0,
  duration: 0.2,
  stagger: 0.5,
  ease: "elastic.out(1, 5)",
});
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
// RADIAL BOUNCY WHEEL PROGRESS INDICATOR
// ======================

// Create wheel container
const wheelContainer = document.createElement("div");
wheelContainer.className = "progress-wheel-container";

// Create SVG wheel
const wheelSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
wheelSVG.setAttribute("class", "progress-wheel");
wheelSVG.setAttribute("viewBox", "0 0 150 150");

// Define gradient
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const gradient = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "linearGradient",
);
gradient.setAttribute("id", "wheelGradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "0%");
gradient.setAttribute("y2", "100%");

const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
stop1.setAttribute("offset", "0%");
stop1.setAttribute("style", "stop-color:rgb(255,140,0);stop-opacity:0.8");

const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
stop2.setAttribute("offset", "100%");
stop2.setAttribute("style", "stop-color:rgb(255,0,102);stop-opacity:1");

gradient.appendChild(stop1);
gradient.appendChild(stop2);
defs.appendChild(gradient);
wheelSVG.appendChild(defs);

// Create background circle
const bgCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle",
);
bgCircle.setAttribute("class", "wheel-bg");
bgCircle.setAttribute("cx", "75");
bgCircle.setAttribute("cy", "75");
bgCircle.setAttribute("r", "70");
wheelSVG.appendChild(bgCircle);

// Create track circle
const trackCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle",
);
trackCircle.setAttribute("class", "wheel-track");
trackCircle.setAttribute("cx", "75");
trackCircle.setAttribute("cy", "75");
trackCircle.setAttribute("r", "70");
wheelSVG.appendChild(trackCircle);

// Create progress circle
const progressCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle",
);
progressCircle.setAttribute("class", "wheel-progress");
progressCircle.setAttribute("cx", "75");
progressCircle.setAttribute("cy", "75");
progressCircle.setAttribute("r", "70");

const circumference = 2 * Math.PI * 70;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

wheelSVG.appendChild(progressCircle);
wheelContainer.appendChild(wheelSVG);

// Create center dot
const centerDot = document.createElement("div");
centerDot.className = "wheel-center";
wheelContainer.appendChild(centerDot);

// Section data (including Contact)
const sections = [
  { id: "hero", name: "Home", number: "" },
  { id: "about", name: "About", number: "" },
  { id: "projects", name: "Work", number: "" },
  { id: "contact", name: "Contact", number: "" },
];

// Create section labels container
const labelsContainer = document.createElement("div");
labelsContainer.className = "section-labels";

// Create radial labels
sections.forEach((section, index) => {
  const label = document.createElement("div");
  label.className = "section-label";
  label.setAttribute("data-section", section.id);

  // Set rotation angle
  const angle = -60 + index * 60; // Distribute evenly: -60, 0, 60, 120
  label.style.setProperty("--angle", `${angle}deg`);

  const content = document.createElement("div");
  content.className = "label-content";
  content.style.setProperty("--rotation", `${-angle}deg`);

  const text = document.createElement("div");
  text.className = "label-text";
  text.textContent = section.name;

  const number = document.createElement("div");
  number.className = "label-number";
  number.textContent = section.number;

  content.appendChild(text);
  content.appendChild(number);
  label.appendChild(content);
  labelsContainer.appendChild(label);
});

wheelContainer.appendChild(labelsContainer);
document.body.appendChild(wheelContainer);

// Track current active section
let activeIndex = -1;

// Update wheel on scroll
function updateRadialWheel() {
  // Determine current section
  const windowHeight = window.innerHeight;
  const labels = labelsContainer.querySelectorAll(".section-label");

  let newActiveIndex = -1;

  sections.forEach((section, index) => {
    const sectionElement = document.getElementById(section.id);

    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      const sectionMiddle = rect.top + rect.height / 2;

      // Section is in the middle of viewport
      if (
        sectionMiddle >= windowHeight * 0.2 &&
        sectionMiddle <= windowHeight * 0.8
      ) {
        newActiveIndex = index;
      }
    }
  });

  // Update active state with bounce animation
  if (newActiveIndex !== activeIndex) {
    // Remove active from all
    labels.forEach((label) => label.classList.remove("active"));

    // Add active to current
    if (newActiveIndex >= 0) {
      labels[newActiveIndex].classList.add("active");
    }

    activeIndex = newActiveIndex;
  }
}

// Initial update
updateRadialWheel();

// Update on scroll
let wheelTicking = false;
window.addEventListener("scroll", () => {
  if (!wheelTicking) {
    window.requestAnimationFrame(() => {
      updateRadialWheel();
      wheelTicking = false;
    });
    wheelTicking = true;
  }
});

// Entrance animation
gsap.from(wheelContainer, {
  x: 150,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  delay: 2,
});

gsap.from(".section-label", {
  scale: 0,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "back.out(2)",
  delay: 2.5,
});

console.log("🎨 Radial Bouncy Wheel Progress Indicator Loaded");
