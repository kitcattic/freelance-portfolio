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
    card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;

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
const aboutDetails = document.querySelectorAll(".about__details");
const aboutDetailsClose = document.querySelectorAll(".about__details-close");

let currentStep = 1;
let stepInterval = null;
let isAnimating = false;

/* ================================ Progress ================================ */

function updateProgress(index) {
    // Сначала сбрасываем ВСЕ progress
    document.querySelectorAll(".progress-item").forEach((item) => {
        item.classList.remove("active");
    });

    // Берём progress только у текущего details
    const currentDetails = document.querySelector(
        `.about__details[data-index="${index}"]`,
    );

    if (!currentDetails) return;

    const progressItems = currentDetails.querySelectorAll(".progress-item");

    progressItems.forEach((item, itemIndex) => {
        item.classList.toggle("active", itemIndex + 1 === index);
    });
}

/* ================================ Open ================================ */

aboutSteps.forEach((step) => {
    step.addEventListener("click", () => {
        const index = Number(step.dataset.index);

        currentStep = index;

        aboutSteps.forEach((item) => {
            item.classList.add("is-hiding");
        });

        aboutDetails.forEach((details) => {
            details.classList.toggle(
                "is-open",
                Number(details.dataset.index) === index,
            );
        });

        about.classList.add("details-open");

        updateProgress(index);
        startStepSlider();
    });
});

/* ================================ Change Step ================================ */

function changeStep(nextStep) {
    if (isAnimating) return;
    if (nextStep === currentStep) return;
    if (nextStep < 1 || nextStep > 4) return;

    const currentDetails = document.querySelector(
        `.about__details[data-index="${currentStep}"]`,
    );

    const nextDetails = document.querySelector(
        `.about__details[data-index="${nextStep}"]`,
    );

    if (!currentDetails || !nextDetails) return;

    isAnimating = true;

    const direction = nextStep > currentStep ? "left" : "right";

    /* Новый слайд */

    nextDetails.classList.add("is-open");
    nextDetails.classList.add(`slide-in-${direction}`);

    /* Старый слайд */

    currentDetails.classList.add(`slide-out-${direction}`);

    /* Progress */

    updateProgress(nextStep);

    setTimeout(() => {
        currentDetails.classList.remove(
            "is-open",
            "slide-out-left",
            "slide-out-right",
        );

        nextDetails.classList.remove("slide-in-left", "slide-in-right");

        currentStep = nextStep;
        isAnimating = false;
    }, 600);
}

/* ================================ Progress Click ================================ */

aboutDetails.forEach((details) => {
    const progressItems = details.querySelectorAll(".progress-item");

    progressItems.forEach((item, index) => {
        item.addEventListener("click", (event) => {
            event.stopPropagation();

            // Клик работает только у открытого details
            if (!details.classList.contains("is-open")) return;

            const nextStep = index + 1;

            changeStep(nextStep);

            startStepSlider();
        });
    });
});

/* ================================ Auto Slider ================================ */

function startStepSlider() {
    clearInterval(stepInterval);

    stepInterval = setInterval(() => {
        let nextStep = currentStep + 1;

        if (nextStep > 4) {
            nextStep = 1;
        }

        changeStep(nextStep);
    }, 7000);
}

/* ================================ Close ================================ */

aboutDetailsClose.forEach((button) => {
    button.addEventListener("click", closeDetails);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (about.classList.contains("details-open")) {
            closeDetails();
        }
    });
});

function closeDetails() {
    clearInterval(stepInterval);

    aboutDetails.forEach((details) => {
        details.classList.remove(
            "is-open",
            "slide-in-left",
            "slide-in-right",
            "slide-out-left",
            "slide-out-right",
        );
    });

    about.classList.remove("details-open");

    setTimeout(() => {
        aboutSteps.forEach((step) => {
            step.classList.remove("is-hiding");
        });
    }, 300);
}
