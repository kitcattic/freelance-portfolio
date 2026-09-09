/* ================================= About Animations ================================= */

const aboutSection = document.querySelector(".about");
const aboutSteps = document.querySelectorAll(".about__step");

const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
        if (entries[0].isIntersecting) {
            aboutSteps.forEach((step) => {
                step.classList.add("is-visible");
            });

            observer.disconnect();
        }
    },
    {
        threshold: 0.3,
    },
);

aboutObserver.observe(aboutSection);
