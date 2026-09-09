document.addEventListener("DOMContentLoaded", () => {
    setLanguage(savedLanguage);
});

const translations = {
    en: {
        //Header
        logo: "Andrew",
        homeNav: "Home",
        projectsNav: "Projects",
        aboutNav: "About",
        contactNav: "Contact",

        //Hero
        heroTitle: "I BUILD MODERN WEBSITES THAT WORK",
        heroDescription:
            "I'm a frontend developer focused on creating clean, responsive, and user-friendly websites for businesses and personal brands.",
        heroProjects: "View my work ➜",
        heroContact: "Contact me",
        heroStatement: "LET'S CREATE SOMETHING GREAT",

        //Projects
        projectsTitle: "FEATURED PROJECTS",
        projectsDescription:
            "A selection of projects I've designed and developed from concept to launch.",
        projectsComing: "More projects coming soon",

        //About
        aboutTitle: "FROM IDEA\nTO RESULTS",

        aboutDescription:
            "I'm a frontend developer who turns ideas and designs into functional digital experiences. I focus on the entire process — from understanding your goals to delivering the final product.",

        planningTitle: "PLANNING",
        planningDescription:
            "Understanding your goals and defining the right solution.",

        designTitle: "DESIGN",
        designDescription:
            "Creating modern, intuitive, and user-friendly interfaces.",

        resultsTitle: "FROM IDEA TO REALITY",
        resultsDescription: "Turning ideas into working websites and products.",
    },

    ru: {
        //Header
        logo: "Andrew",
        homeNav: "Главная",
        projectsNav: "Проекты",
        aboutNav: "Обо мне",
        contactNav: "Контакты",

        //Hero
        heroTitle: "СОЗДАЮ СОВРЕМЕННЫЕ САЙТЫ, КОТОРЫЕ РАБОТАЮТ НА ВАС",
        heroDescription:
            "Я frontend-разработчик, создающий чистые, адаптивные и удобные сайты для бизнеса и личных брендов.",
        heroProjects: "Мои работы ➜",
        heroContact: "Связаться со мной",
        heroStatement: "LET'S CREATE SOMETHING GREAT",

        //Projects
        projectsTitle: "ИЗБРАННЫЕ ПРОЕКТЫ",
        projectsDescription:
            "Подборка проектов, которые я спроектировал и разработал — от идеи до запуска.",
        projectsComing: "Скоро здесь появятся новые проекты",

        //About
        aboutTitle: "ОТ ИДЕИ\nДО РЕЗУЛЬТАТА",

        aboutDescription:
            "Я frontend-разработчик, который превращает идеи и дизайн в функциональные цифровые решения. Я работаю над всем процессом — от понимания ваших целей до создания готового продукта.",

        planningTitle: "ПЛАНИРОВАНИЕ",
        planningDescription:
            "Понимание ваших целей и определение оптимального решения.",

        designTitle: "ДИЗАЙН",
        designDescription:
            "Создание современных, понятных и удобных интерфейсов.",

        resultsTitle: "ОТ ИДЕИ К РЕАЛИЗАЦИИ",
        resultsDescription:
            "Превращение идей в готовые сайты и цифровые продукты.",
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
