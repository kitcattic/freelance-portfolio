document.addEventListener("DOMContentLoaded", () => {
    setLanguage(savedLanguage);
});

const translations = {
    en: {
        logo: "Andrew",
        homeNav: "Home",
        projectsNav: "Projects",
        aboutNav: "About",
        contactNav: "Contact",

        heroTitle: "I BUILD MODERN WEBSITES THAT WORK",
        heroDescription:
            "I'm a frontend developer focused on creating clean, responsive and user-friendly websites for businesses and personal brands.",
        heroProjects: "View my work ➜",
        heroContact: "Contact me",
        heroStatement: "LET'S CREATE SOMETHING GREAT",

        projectsTitle: "FEATURED PROJECTS",
        projectsDescription:
            "A selection of projects I've designed and developed from concept to final implementation.",
        projectsComing: "More projects coming soon",
    },

    ru: {
        logo: "Andrew",
        homeNav: "Главная",
        projectsNav: "Проекты",
        aboutNav: "Обо мне",
        contactNav: "Контакты",

        heroTitle: "СОЗДАЮ СОВРЕМЕННЫЕ САЙТЫ, КОТОРЫЕ РАБОТАЮТ",
        heroDescription:
            "Я frontend-разработчик, специализирующийся на создании чистых, адаптивных и удобных для пользователей сайтов для бизнеса и личных брендов.",
        heroProjects: "Мои работы ➜",
        heroContact: "Связаться",
        heroStatement: "LET'S CREATE SOMETHING GREAT",

        projectsTitle: "ЛУЧШИЕ ПРОЕКТЫ",
        projectsDescription:
            "Подборка проектов, которые я спроектировал и разработал от идеи до финальной реализации.",
        projectsComing: "Скоро здесь появятся новые проекты",
    },
};

const languageButtons = document.querySelectorAll("[data-lang]");

function setLanguage(language) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = translations[language][key];
    });

    languageButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === language);
    });

    document.documentElement.lang = language;
    localStorage.setItem("language", language);

    renderProjects();
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

const savedLanguage = localStorage.getItem("language") || "en";
