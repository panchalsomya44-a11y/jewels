const filterButtons = document.querySelectorAll(".filter-button");
const pieceCards = document.querySelectorAll(".piece-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const hero = document.querySelector(".hero");
const heroImage = hero.querySelector(".hero-image");
const heroEyebrow = hero.querySelector(".hero-content .eyebrow");
const heroTitleMain = hero.querySelector(".hero-title-main");
const heroTitleAccent = hero.querySelector(".hero-title-accent");
const heroCopy = hero.querySelector(".hero-copy");
const heroCaption = hero.querySelector(".hero-caption");
const heroSlideCurrent = hero.querySelector(".hero-slide-current");
const heroSlideTotal = hero.querySelector(".hero-slide-total");

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=2200&q=85",
    alt: "Sculptural gold jewelry arranged in warm natural light",
    eyebrow: "Jewelry, considered",
    title: "Made to be",
    accent: "held close.",
    copy: "A study in shape, feeling, and the beauty of things made slowly.",
    caption: "Objects for a life well lived · Est. 2018",
  },
  {
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=2200&q=85",
    alt: "Sculptural gold earrings with an organic silhouette",
    eyebrow: "Form with feeling",
    title: "A little",
    accent: "light, always.",
    copy: "Sculptural details and a soft glow for the moments that become yours.",
    caption: "A collection shaped by small moments",
  },
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2200&q=85",
    alt: "Delicate gold necklace displayed in soft natural light",
    eyebrow: "Made to be kept",
    title: "Find your",
    accent: "own kind of shine.",
    copy: "Thoughtful pieces, made to find their way into your everyday.",
    caption: "Thoughtful forms · Tripura Jewels",
  },
];

let activeHeroSlide = 0;

hero.querySelectorAll(".hero-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.slideDirection);
    activeHeroSlide = (activeHeroSlide + direction + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeHeroSlide];

    heroImage.classList.add("is-changing");
    heroImage.onload = () => heroImage.classList.remove("is-changing");
    heroImage.onerror = () => {
      heroImage.classList.remove("is-changing");
      console.error(`Unable to load hero slide image: ${slide.image}`);
    };
    heroImage.src = slide.image;
    heroImage.alt = slide.alt;
    heroEyebrow.textContent = slide.eyebrow;
    heroTitleMain.textContent = slide.title;
    heroTitleAccent.textContent = slide.accent;
    heroCopy.textContent = slide.copy;
    heroCaption.textContent = slide.caption;
    heroSlideCurrent.textContent = String(activeHeroSlide + 1).padStart(2, "0");
    heroSlideTotal.textContent = String(heroSlides.length).padStart(2, "0");
  });
});

let touchStartX = null;
hero.addEventListener("pointerdown", (event) => {
  touchStartX = event.pointerType === "touch" ? event.clientX : null;
});

hero.addEventListener("pointerup", (event) => {
  if (touchStartX === null) return;
  const swipeDistance = event.clientX - touchStartX;
  touchStartX = null;
  if (Math.abs(swipeDistance) < 50) return;

  const direction = swipeDistance < 0 ? 1 : -1;
  hero.querySelector(`[data-slide-direction="${direction}"]`).click();
});

const projectBatches = [
  {
    title: "Styled",
    description: "Bangle designs photographed in the styled product setup.",
    folder: "styled",
    prefix: "bangle",
    count: 38,
    projectNumber: "01",
    itemLabel: "Styled photo",
    alt: "Gold bangle in a styled product photograph",
  },
  {
    title: "Side Views",
    description: "Individual bangle profiles and close-up product views.",
    folder: "side-views",
    prefix: "side-view",
    count: 40,
    projectNumber: "02",
    itemLabel: "Side view",
    alt: "Gold bangle shown from the side",
  },
  {
    title: "Handheld",
    description: "Bangles photographed in hand to show their scale and detail.",
    folder: "handheld",
    prefix: "handheld",
    count: 9,
    projectNumber: "03",
    itemLabel: "Handheld photo",
    alt: "Gold bangles held in hand",
  },
  {
    title: "EX Collection",
    description: "Catalog photographs with the original EX model markings.",
    folder: "ex-collection",
    prefix: "catalog",
    count: 44,
    projectNumber: "04",
    itemLabel: "Catalog photo",
    alt: "Gold bangle from the EX catalog",
  },
];

const projectList = document.querySelector("#project-list");

projectBatches.forEach((batch) => {
  const section = document.createElement("section");
  section.className = "project-batch";

  const heading = document.createElement("div");
  heading.className = "project-batch-heading";

  const headingCopy = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = `Project ${batch.projectNumber}`;

  const title = document.createElement("h3");
  title.textContent = batch.title;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = batch.description;
  headingCopy.append(eyebrow, title, description);

  const count = document.createElement("span");
  count.className = "project-count";
  count.textContent = `${String(batch.count).padStart(2, "0")} photos`;
  heading.append(headingCopy, count);

  const grid = document.createElement("div");
  grid.className = "project-photo-grid";

  for (let index = 1; index <= batch.count; index += 1) {
    const number = String(index).padStart(2, "0");
    const card = document.createElement("article");
    card.className = "project-photo-card";

    const button = document.createElement("button");
    button.className = "project-photo";
    button.type = "button";
    button.setAttribute("aria-label", `View ${batch.itemLabel.toLowerCase()} ${number}`);

    const image = document.createElement("img");
    image.src = `assets/bangle-projects/${batch.folder}/${batch.prefix}-${number}.jpg`;
    image.alt = `${batch.alt}, photo ${number}`;
    image.loading = "lazy";
    image.decoding = "async";
    button.append(image);

    const caption = document.createElement("div");
    caption.className = "project-photo-caption";
    const name = document.createElement("h4");
    name.textContent = `${batch.itemLabel} ${number}`;
    caption.append(name);

    card.append(button, caption);
    grid.append(card);
  }

  section.append(heading, grid);
  projectList.append(section);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    pieceCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".piece-image, .project-photo").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.currentSrc.includes("images.unsplash.com")
      ? image.currentSrc.replace(/w=\d+/, "w=1600")
      : image.currentSrc;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest(".lightbox-close")) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
