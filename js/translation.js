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
        skillsNav: "Skills",
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

        codingTitle: "CODING",
        codingDescription: "Turning designs into clean and functional code.",

        codingStepFullDescription:
            "I turn the approved design into a fully functional website. I write clean, maintainable code and make sure everything works smoothly across different devices and screen sizes.",

        codingStepItem1: "FRONTEND DEVELOPMENT",
        codingStepItem2: "RESPONSIVE IMPLEMENTATION",
        codingStepItem3: "CLEAN & MAINTAINABLE CODE",

        launchTitle: "LAUNCH",
        launchDescription:
            "Testing, launching and supporting the final product.",

        launchStepFullDescription:
            "Before launch, I test the website, fix issues and optimize its performance. After everything is ready, I deploy the project and can provide further support and improvements.",

        launchStepItem1: "TESTING & DEBUGGING",
        launchStepItem2: "PERFORMANCE OPTIMIZATION",
        launchStepItem3: "LAUNCH & SUPPORT",

        //Skills
        skillsTitle: "SKILLS",
        skillsDescription:
            "I build modern websites using up-to-date technologies and development practices. I combine thoughtful design with a modern frontend stack to create fast, responsive and engaging digital experiences.",
        skillsFrontend: "FRONTEND",
        skillsLearning: "CURRENTLY LEARNING",
        skillsStatement: "Better websites.\nBrighter ideas.",
        skillsHtmlDescription: "Semantic structure",
        skillsCssDescription: "Layout & styling",
        skillsJsDescription: "Interactive interfaces",
        skillsReactDescription: "Component-based UI",
        skillsNextDescription: "Modern web framework",
        skillsTypeScriptDescription: "Typed JavaScript",
    },

    ru: {
        //Header
        logo: "Andrew",
        homeNav: "Главная",
        projectsNav: "Проекты",
        aboutNav: "Обо мне",
        skillsNav: "Навыки",
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

        codingTitle: "РАЗРАБОТКА",
        codingDescription: "Превращение дизайна в чистый и функциональный код.",

        codingStepFullDescription:
            "Я превращаю готовый дизайн в полноценный работающий сайт. Пишу чистый и поддерживаемый код, обеспечивая корректную работу проекта на разных устройствах и размерах экрана.",

        codingStepItem1: "FRONTEND-РАЗРАБОТКА",
        codingStepItem2: "АДАПТИВНАЯ ВЁРСТКА",
        codingStepItem3: "ЧИСТЫЙ И ПОДДЕРЖИВАЕМЫЙ КОД",

        launchTitle: "ЗАПУСК",
        launchDescription:
            "Тестирование, запуск и дальнейшая поддержка проекта.",

        launchStepFullDescription:
            "Перед запуском я тестирую сайт, исправляю ошибки и оптимизирую его производительность. После этого размещаю проект и при необходимости продолжаю заниматься его поддержкой и улучшением.",

        launchStepItem1: "ТЕСТИРОВАНИЕ И ОТЛАДКА",
        launchStepItem2: "ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ",
        launchStepItem3: "ЗАПУСК И ПОДДЕРЖКА",

        //Skills
        skillsTitle: "НАВЫКИ",
        skillsDescription:
            "Я создаю современные сайты, используя актуальные технологии и современные подходы к разработке. Сочетаю продуманный дизайн с современным frontend-стеком, чтобы создавать быстрые, адаптивные и интерактивные цифровые решения.",
        skillsFrontend: "FRONTEND",
        skillsLearning: "СЕЙЧАС ИЗУЧАЮ",
        skillsStatement: "Лучшие сайты.\nБольше идей.",
        skillsHtmlDescription: "Семантическая структура",
        skillsCssDescription: "Вёрстка и стилизация",
        skillsJsDescription: "Интерактивные интерфейсы",
        skillsReactDescription: "Компонентный интерфейс",
        skillsNextDescription: "Современный веб-фреймворк",
        skillsTypeScriptDescription: "Типизированный JavaScript",
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
