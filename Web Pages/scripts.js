document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video");
  const foreground = document.querySelector(".parallax-foreground");

  if (!video || !foreground) {
    console.error("Parallax elements not found");
    return;
  }

  let latestScroll = 0;
  let current = 0;

  function cinematicParallax() {
    latestScroll = window.scrollY;
    current += (latestScroll - current) * 0.08;
    /* BACKGROUND VIDEO – SLOW */
    const videoOffset = current * 0.05;
    const videoScale = 1.05 + current * 0.00003;
    video.style.transform = `
      translate(-50%, calc(-50% + ${videoOffset}px))
      scale(${videoScale})
    `;
    /* FOREGROUND – FASTER */
    const fgOffset = current * 0.12;
    foreground.style.transform = `
      translateY(${fgOffset}px)
    `;

    requestAnimationFrame(cinematicParallax);
  }

  cinematicParallax();
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const foreground = document.querySelector(".parallax-foreground");

  if (foreground) {
    foreground.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// nav bar
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav nav a");
const sections = document.querySelectorAll(".section");
const screenHeight = screen.height * 0.9;

window.addEventListener("scroll", () => {
  if (window.scrollY > screenHeight) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
      console.log(window.scrollY, " window.scrollY");
      console.log(section.id);
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      // console.log(navLinks.values)
    }
  });
});

// SKILL TAGS >>> Fade-in for About Me tags when section appears
const aboutSection = document.querySelector("#about");
const tagItems = document.querySelectorAll(".tag-item");

const observerOptions = {
  threshold: 0.2  // trigger when 20% of section is visible
};

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Play staggered animations
      tagItems.forEach((item, index) => {
        item.style.animation = `tagFadeIn 1.2s ease forwards`;
        item.style.animationDelay = `${0.1 * index}s`;
      });

      // Stop observing after animation is done
      aboutObserver.unobserve(aboutSection);
    }
  });
}, observerOptions);

aboutObserver.observe(aboutSection);
