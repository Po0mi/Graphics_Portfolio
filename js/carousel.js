// Add this to your main.js

const projectsGrid = document.querySelector(".projects-grid");

if (projectsGrid) {
  const projectItems = projectsGrid.querySelectorAll(".project-item");
  const projectImages = projectsGrid.querySelectorAll(".project-item img");
  let projectIndex = 0;
  let projectTimeout;

  // Grid animation patterns
  const gridPatterns = [
    [4, 5, 2, 0, 0, 0],
    [5, 4, 3, 2, 0, 0],
    [0, 3, 4, 3, 2, 0],
    [0, 2, 3, 4, 3, 0],
    [0, 0, 2, 4, 3, 2],
    [0, 0, 0, 3, 4, 4],
  ];

  function nextProjectSlide() {
    projectIndex += 1;
    projectIndex %= gridPatterns.length;

    projectsGrid.style.gridTemplateColumns = gridPatterns[projectIndex]
      .map((p) => `${p}fr`)
      .join(" ");

    projectItems.forEach((item, index) => {
      if (gridPatterns[projectIndex][index] === 0) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    });

    clearTimeout(projectTimeout);
    projectTimeout = setTimeout(nextProjectSlide, 2500);
  }

  // Click on grid to advance
  projectsGrid.addEventListener("click", (e) => {
    // Don't advance if clicking on an image (let image click handle separately)
    if (!e.target.closest("img")) {
      clearTimeout(projectTimeout);
      nextProjectSlide();
    }
  });

  // Individual image click effect with pop animation
  projectImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent grid advance

      // Add pop animation class
      img.style.transform = "scale(1.15) translateY(-15px)";
      img.style.transition = "transform 0.2s ease";

      // Reset after animation
      setTimeout(() => {
        img.style.transform = "";
      }, 200);

      // You can add more functionality here, like:
      // - Open lightbox/modal
      // - Navigate to project detail page
      // - Show project info overlay
      console.log("Clicked project:", img.alt);
    });
  });

  // Auto-advance
  projectTimeout = setTimeout(nextProjectSlide, 2500);
}
