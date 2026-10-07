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

    card.classList.add("project-card");
    card.projectData = project;

    card.addEventListener("click", (event) => {
        const link = event.target.closest(".project-card__link");

        if (link) return;

        openProjectModal(project);
    });

    card.innerHTML = `
        <a class="project-card__image" target="_blank">
            <img
                src="assets/images/${project.image}"
                alt="${project.title[currentLanguage]}"
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
                <a
                    class="project-card__link"
                    href="${project.url}"
                    target="_blank"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        
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
        </div>
    `;

    return card;
}

async function renderProjects() {
    const response = await fetch("assets/data/projects.json");

    if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();

    const visibleProjects = projects.filter(
        (project) => project.enabled !== false,
    );

    const projectsGrid = document.querySelector(".projects__grid");

    projectsGrid.innerHTML = "";

    visibleProjects.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project));
    });
}

// ================ Card Open ================

const projectModal = document.createElement("div");

projectModal.className = "project-modal";

projectModal.innerHTML = `
    <div class="project-modal__overlay"></div>

    <button
        class="project-modal__close"
        type="button"
        aria-label="Close"
    >
        ×
    </button>

    <div class="project-modal__window">

        <div class="project-modal__preview">
            <iframe
                class="project-modal__iframe"
                src=""
                title=""
            ></iframe>
        </div>

        <div class="project-modal__content">

            <div class="project-modal__header">
                <div>
                    <p class="project-modal__category"></p>
                    <h2 class="project-modal__title"></h2>
                </div>
                <a
                    class="project-modal__site-icon"
                    target="_blank"
                    aria-label="Open project"
                >
                    <span>VISIT SITE</span>

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
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
            </div>

            <p class="project-modal__description"></p>
                <div class="project-modal__links">
                <a
                    class="project-modal__github"
                    target="_blank"
                >
                    <img
                        src="assets/icons/github-mono.svg"
                        alt=""
                        aria-hidden="true"
                    >
                    GITHUB ↗
                </a>

                <a
                    class="project-modal__figma"
                    target="_blank"
                >
                    <img
                        src="assets/icons/figma-mono.svg"
                        alt=""
                        aria-hidden="true"
                    >
                    FIGMA ↗
                </a>
                </div>
            <div class="project-modal__footer">
                <div class="project-modal__stack"></div>
                <span class="project-modal__year"></span>
            </div>

        </div>
    </div>
`;

document.body.append(projectModal);

const projectModalOverlay = projectModal.querySelector(
    ".project-modal__overlay",
);
const projectModalWindow = projectModal.querySelector(".project-modal__window");
const projectModalClose = projectModal.querySelector(".project-modal__close");
const projectModalIframe = projectModal.querySelector(".project-modal__iframe");
const projectModalCategory = projectModal.querySelector(
    ".project-modal__category",
);
const projectModalTitle = projectModal.querySelector(".project-modal__title");
const projectModalYear = projectModal.querySelector(".project-modal__year");
const projectModalDescription = projectModal.querySelector(
    ".project-modal__description",
);
const projectModalStack = projectModal.querySelector(".project-modal__stack");
const projectModalGithub = projectModal.querySelector(".project-modal__github");
const projectModalFigma = projectModal.querySelector(".project-modal__figma");
const projectModalSiteIcon = projectModal.querySelector(
    ".project-modal__site-icon",
);

function openProjectModal(project) {
    const currentLanguage = localStorage.getItem("language") || "en";

    projectModalIframe.src = project.url;
    projectModalIframe.title = project.title[currentLanguage];

    projectModalTitle.textContent = project.title[currentLanguage];
    projectModalCategory.textContent = project.category[currentLanguage];
    projectModalYear.textContent = project.year;

    projectModalDescription.textContent =
        project.fullDescription?.[currentLanguage] ||
        project.description[currentLanguage];

    projectModalStack.innerHTML = project.stack
        .map((technology) => `<span>${technology}</span>`)
        .join("");

    projectModalGithub.href = project.github || "#";

    projectModalFigma.href = project.figma || "#";

    projectModalSiteIcon.href = project.url || "#";

    projectModal.classList.add("is-active");

    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    projectModal.classList.remove("is-active");

    projectModalIframe.src = "";

    document.body.style.overflow = "";
}

projectModalClose.addEventListener("click", closeProjectModal);

projectModalOverlay.addEventListener("click", closeProjectModal);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (projectModal.classList.contains("is-active")) {
            closeProjectModal();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        projectModal.classList.contains("is-active")
    ) {
        closeProjectModal();
    }
});

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
    document.querySelectorAll(".progress-item").forEach((item) => {
        item.classList.remove("active");
    });

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
        document.body.style.overflow = "hidden";

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

        if (projectModal.classList.contains("is-active")) {
            closeProjectModal();
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
    document.body.style.overflow = "";

    setTimeout(() => {
        aboutSteps.forEach((step) => {
            step.classList.remove("is-hiding");
        });
    }, 300);
}

/* ================================ Demo ================================ */

const skillCards = document.querySelectorAll(".skill-card");
const demoFrame = document.querySelector(".skills__demo-frame");
const demoWindow = document.querySelector(".skills__demo");

const demoGlow = {
    html: {
        color: "211, 90, 54",
        strength: "0.45",
    },

    css: {
        color: "48, 76, 220",
        strength: "0.5",
    },

    javascript: {
        color: "241, 223, 79",
        strength: "0.6",
    },

    react: {
        color: "161, 213, 225",
        strength: "0.7",
    },

    nextjs: {
        color: "245, 245, 245",
        strength: "0.8",
    },

    typescript: {
        color: "69, 119, 192",
        strength: "0.9",
    },
};

/* ================================ Hints ================================ */

const demoHint = document.querySelector(".skills__demo-hint");
const demoHintClose = document.querySelector(".skills__demo-hint-close");
const demoHintText = document.querySelector(".skills__demo-hint-text");

const hintTranslations = {
    html: {
        ru: "Создаёт основу сайта, чтобы контент был понятным и удобным для пользователей.",
        en: "Builds the basic structure of the website so all content is clear and easy to navigate.",
    },

    css: {
        ru: "Делает сайт красивым, адаптивным и таким, как задумано в дизайне.",
        en: "Makes the website look good, work well on different screens and match the desired design.",
    },

    javascript: {
        ru: "Добавляет интерактивность: слайдеры, кнопки, анимации и динамический контент.",
        en: "Adds interactive features like sliders, buttons, animations and dynamic content.",
    },

    react: {
        ru: "Помогает создавать сложные интерактивные элементы, которые легко изменять и поддерживать.",
        en: "Helps build complex interactive parts of the website that are easy to update and maintain.",
    },

    nextjs: {
        ru: "Помогает сделать сайт быстрее и добавляет возможности вроде удобной навигации и SEO.",
        en: "Helps make websites faster and adds features like page navigation and better SEO.",
    },

    typescript: {
        ru: "Помогает избежать ошибок и сделать код надёжнее по мере развития проекта.",
        en: "Helps prevent errors and makes the website code more reliable as the project grows.",
    },
};

function hideDemoHint() {
    demoHint.classList.remove("is-active");
}

function showDemoHint(skill) {
    const language = document.documentElement.lang === "en" ? "en" : "ru";

    demoHintText.textContent = hintTranslations[skill][language];

    demoHint.classList.add("is-active");
}

/* ================================ Skills ================================ */

skillCards.forEach((card) => {
    card.addEventListener("click", () => {
        const skill = card.dataset.skill;

        skillCards.forEach((item) => {
            item.classList.remove("is-active");
            item.classList.remove("is-pulse");
        });

        card.classList.add("is-active");

        demoFrame.classList.add("is-switching");

        demoWindow.style.setProperty(
            "--demo-glow-color",
            demoGlow[skill].color,
        );

        demoWindow.style.setProperty(
            "--demo-glow-strength",
            demoGlow[skill].strength,
        );

        demoFrame.src = `assets/demo/demo.html?skill=${skill}`;

        showDemoHint(skill);
    });
});

/* ================================ Demo Load ================================ */

demoFrame.addEventListener("load", () => {
    demoFrame.classList.remove("is-switching");

    demoFrame.contentDocument.addEventListener("click", hideDemoHint);
});

/* ================================ Hint Close ================================ */

demoHintClose.addEventListener("click", hideDemoHint);
