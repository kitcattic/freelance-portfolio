document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
});

/* ================================= Navigation ================================= */

const sections = document.querySelectorAll("main > section");
const navLinks = document.querySelectorAll(".nav a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav a[href="#${entry.target.id}"]`,
                );

                activeLink?.classList.add("active");
            }
        });
    },
    {
        threshold: 0.5,
    },
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

/* ================================= Projects ================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

function createProjectCard(project) {
    const currentLanguage = localStorage.getItem("language") || "en";

    const card = document.createElement("article");
    card.addEventListener("click", () => {
        openCard(card);
    });

    card.classList.add("project-card");
    card.innerHTML = `
        <a class="project-card__image" target="_blank">
            <img
                src="assets/images/${project.image}"
                alt="${project.title}"
            >
        </a>

        <div class="project-card__content">
            <div class="project-card__left">
                <div class="project-card__header">
                    <h3 class="project-card__title">
                        ${project.title[currentLanguage]}
                    </h3>

                    <p class="project-card__category">
                        ${project.category[currentLanguage]}
                    </p>
                </div>

                <p class="project-card__description">
                    ${project.description[currentLanguage]}
                </p>

                <div class="project-card__details">
                    <p class="project-card__full-description"></p>

                    <div class="project-card__links">
                        <a class="project-card__link-github" target="_blank">
                            GITHUB ↗
                        </a>

                        <a class="project-card__link-figma" target="_blank">
                            FIGMA ↗
                        </a>
                    </div>
                </div>

                <div class="project-card__footer">
                    <div class="project-card__stack">
                        ${project.stack
                            .map((technology) => `<span>${technology}</span>`)
                            .join("")}
                    </div>
                </div>
            </div>

            <div class="project-card__right">
                <a class="project-card__link"
                    href="${project.url}"
                    class="project-card__link"
                    target="_blank"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 5H19V10"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M19 5L12 12"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M19 13V19H5V5H11"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>

                <p class="project-card__year">
                    ${project.year}
                </p>
            </div>
        </div>`;

    return card;
}

async function renderProjects() {
    const response = await fetch("assets/data/projects.json");

    if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();

    const projectsGrid = document.querySelector(".projects__grid");
    projectsGrid.innerHTML = "";

    projects.forEach((project) => {
        const card = createProjectCard(project);

        projectsGrid.append(card);
    });
}

// ================ Card Open ================

function openCard(card) {
    card.classList.add("is-open");
}

/* ================================= Steps ================================= */

const about = document.querySelector(".about");
const aboutSteps = document.querySelectorAll(".about__step");
const aboutDetails = document.querySelector(".about__details");
const aboutDetailsHeader = aboutDetails.querySelector(".about__details-header");
const aboutDetailsClose = document.querySelector(".about__details-close");

const aboutDetailsNumber = aboutDetails.querySelector(".about__details-number");

const aboutDetailsTitle = aboutDetails.querySelector(".about__details-title");

const aboutDetailsDescription = aboutDetails.querySelector(
    ".about__details-description",
);

const aboutDetailsItems = aboutDetails.querySelectorAll(
    ".about__details-list-text",
);

const progressItems = aboutDetails.querySelectorAll(".progress-item");

let currentStep = 0;
let stepInterval;

/* ================ Show Step ================ */

function showStep(index) {
    const step = aboutSteps[index];

    if (!step) return;

    const stepName = step.dataset.step;
    const currentLanguage = localStorage.getItem("language") || "en";

    /* Number */

    aboutDetailsNumber.textContent = step.querySelector(
        ".about__step-number",
    ).textContent;

    /* Title */

    aboutDetailsTitle.textContent =
        translations[currentLanguage][`${stepName}Title`];

    /* Full description */

    aboutDetailsDescription.textContent =
        translations[currentLanguage][`${stepName}StepFullDescription`];

    /* List */

    aboutDetailsItems.forEach((item, itemIndex) => {
        item.textContent =
            translations[currentLanguage][
                `${stepName}StepItem${itemIndex + 1}`
            ];
    });

    /* Background */

    aboutDetails.style.backgroundImage = `
        linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 30%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(0, 0, 0, 0.1) 100%
        ),
        url("assets/images/${stepName}.webp")
    `;

    /* Progress */

    progressItems.forEach((item, itemIndex) => {
        item.classList.toggle("active", itemIndex === index);
    });

    currentStep = index;
}

/* ================ Change Step Animation ================ */

function changeStep(index) {
    if (index === currentStep) return;

    const direction = index > currentStep ? -1 : 1;

    // Уезжает ВСЁ: картинка, текст, BACK
    aboutDetails.style.transition = "transform 0.6s ease";
    aboutDetails.style.transform = `translateX(${direction * 100}%)`;

    setTimeout(() => {
        // Меняем содержимое и картинку
        showStep(index);

        // Ставим весь details с другой стороны
        aboutDetails.style.transition = "none";
        aboutDetails.style.transform = `translateX(${direction * -100}%)`;

        requestAnimationFrame(() => {
            aboutDetails.style.transition = "transform 0.6s ease";

            aboutDetails.style.transform = "translateX(0)";
        });
    }, 600);

    currentStep = index;
}

function updateStepContent(container, index) {
    const step = aboutSteps[index];

    if (!step) return;

    const stepName = step.dataset.step;
    const currentLanguage = localStorage.getItem("language") || "en";

    container.querySelector(".about__details-number").textContent =
        step.querySelector(".about__step-number").textContent;

    container.querySelector(".about__details-title").textContent =
        translations[currentLanguage][`${stepName}Title`];

    container.querySelector(".about__details-description").textContent =
        translations[currentLanguage][`${stepName}StepFullDescription`];

    container
        .querySelectorAll(".about__details-list-text")
        .forEach((item, itemIndex) => {
            item.textContent =
                translations[currentLanguage][
                    `${stepName}StepItem${itemIndex + 1}`
                ];
        });
}

/* ================ Open Step ================ */

function openStep(index) {
    showStep(index);

    aboutDetails.classList.add("is-open");
    about.classList.add("details-open");

    document.body.style.overflow = "hidden";

    startStepSlider();
}

/* ================ Step Cards ================ */

aboutSteps.forEach((step, index) => {
    step.addEventListener("click", () => {
        openStep(index);
    });
});

/* ================ Progress Click ================ */

progressItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        changeStep(index);
        startStepSlider();
    });
});

/* ================ Auto Slider ================ */

function startStepSlider() {
    clearInterval(stepInterval);

    stepInterval = setInterval(() => {
        const nextStep = (currentStep + 1) % aboutSteps.length;

        changeStep(nextStep);
    }, 7000);
}

/* ================ Close ================ */

aboutDetailsClose.addEventListener("click", () => {
    aboutDetails.classList.remove(
        "is-open",
        "slide-out-left",
        "slide-out-right",
        "slide-in-left",
        "slide-in-right",
    );

    about.classList.remove("details-open");

    document.body.style.overflow = "";

    clearInterval(stepInterval);
});
