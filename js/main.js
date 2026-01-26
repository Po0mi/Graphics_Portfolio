// main.js

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Parallax effect for hero background
  // Better approach - animate the wrapper itself
  gsap.to(".hero-wrapper", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    backgroundPositionY: "200%",
    ease: "none",
  });

  // You can add more animations here later
});
