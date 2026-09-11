/* ================================= About Animations ================================= */

const heroSectionAnim = document.querySelector(".hero");
const heroContentAnim = document.querySelector(".hero__content");

const heroObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
        heroContentAnim.classList.add("is-visible");

        observer.disconnect();
    }
});

heroObserver.observe(heroSectionAnim);

/* ================================= About Animations ================================= */

const aboutSectionAnim = document.querySelector(".about");
const aboutStepsAnim = document.querySelectorAll(".about__step");

const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
        if (entries[0].isIntersecting) {
            aboutStepsAnim.forEach((step) => {
                step.classList.add("is-visible");
            });

            observer.disconnect();
        }
    },
    {
        threshold: 0.3,
    },
);

aboutObserver.observe(aboutSectionAnim);
