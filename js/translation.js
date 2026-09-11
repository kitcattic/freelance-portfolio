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
        planningStepFullDescription:
            "I start by understanding your goals, audience and requirements. We define the project scope, choose the right approach and create a clear plan to achieve the desired results.",

        planningStepItem1: "UNDERSTAND YOUR IDEA",
        planningStepItem2: "ANALYZE REQUIREMENTS",
        planningStepItem3: "PLAN THE SOLUTION",

        designTitle: "DESIGN",
        designDescription:
            "Creating modern, intuitive, and user-friendly interfaces.",
        designStepFullDescription:
            "I create clean, modern and user-friendly interfaces that look great and work smoothly across all devices. My focus is on simplicity, consistency and a great user experience.",

        designStepItem1: "UI/UX DESIGN",
        designStepItem2: "RESPONSIVE LAYOUTS",
        designStepItem3: "ATTENTION TO DETAILS",

        resultsTitle: "FROM IDEA TO REALITY",
        resultsDescription: "Turning ideas into working websites and products.",
        resultsStepFullDescription:
            "I turn ideas into fully working websites and digital products. I focus on clean, functional code and long-term support, so you can get a product that actually works and brings value.",

        resultsStepItem1: "DEVELOPMENT",
        resultsStepItem2: "TESTING & OPTIMIZATION",
        resultsStepItem3: "LAUNCH & SUPPORT",
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
        planningStepFullDescription:
            "Я начинаю с понимания ваших целей, аудитории и требований к проекту. Мы определяем его структуру, выбираем подход и создаём понятный план для достижения нужного результата.",

        planningStepItem1: "ПОНИМАЮ ИДЕЮ",
        planningStepItem2: "АНАЛИЗИРУЮ ТРЕБОВАНИЯ",
        planningStepItem3: "ПЛАНИРУЮ РЕШЕНИЕ",

        designTitle: "ДИЗАЙН",
        designDescription:
            "Создание современных, понятных и удобных интерфейсов.",
        designStepFullDescription:
            "Я превращаю структуру проекта в современный и понятный интерфейс. Каждый элемент продумывается с учётом удобства, визуальной иерархии и итогового пользовательского опыта.",

        designStepItem1: "UI/UX-ДИЗАЙН",
        designStepItem2: "АДАПТИВНЫЕ МАКЕТЫ",
        designStepItem3: "ВНИМАНИЕ К ДЕТАЛЯМ",

        resultsTitle: "ОТ ИДЕИ К РЕАЛИЗАЦИИ",
        resultsDescription:
            "Превращение идей в готовые сайты и цифровые продукты.",
        resultsStepFullDescription:
            "Я превращаю идеи и готовый дизайн в полноценные сайты и цифровые продукты. Я уделяю внимание чистому коду, стабильной работе и дальнейшей поддержке, чтобы продукт действительно приносил пользу.",

        resultsStepItem1: "РАЗРАБОТКА",
        resultsStepItem2: "ТЕСТИРОВАНИЕ И ОПТИМИЗАЦИЯ",
        resultsStepItem3: "ЗАПУСК И ПОДДЕРЖКА",
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
