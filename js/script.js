document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

function createProjectCard(project) {
    const currentLanguage = localStorage.getItem("language") || "en";

    const card = document.createElement("article");
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
