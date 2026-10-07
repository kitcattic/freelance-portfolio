const params = new URLSearchParams(window.location.search);
const skill = params.get("skill") || "html";

const demo = document.querySelector("body");

demo.dataset.skill = skill;

var jsStatus = false;

if (skill === "css") {
    enableCSS();
} else if (skill === "javascript") {
    enableJavaScript();
} else if (skill === "react") {
    enableReact();
} else if (skill === "nextjs") {
    enableNextJS();
} else if (skill === "typescript") {
    enableTypeScript();
}

// Hide Sections
const hiddenStyle = document.createElement("style");

hiddenStyle.textContent = `
    .is-hidden {
        display: none;
    }
`;

document.head.appendChild(hiddenStyle);

/* ================================ Variants ================================ */

// CSS
function enableCSS() {
    const stylesheet = document.createElement("link");

    stylesheet.rel = "stylesheet";
    stylesheet.href = "demo-style.css";

    document.head.appendChild(stylesheet);
}

// JavaScript
function enableJavaScript() {
    enableCSS();
    jsStatus = true;

    enableWorkingStatus();
    initCarousel();

    const carouselSection = document.querySelector(".hero__carousel");

    requestAnimationFrame(() => {
        if (carouselSection) {
            carouselSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });

    addHighlight([
        document.querySelector("#workingStatus"),
        document.querySelector(".hero__carousel-track"),
    ]);
}

// React
function enableReact() {
    enableJavaScript();

    const haircutsSection = document.querySelector("#haircuts");
    const locationsSection = document.querySelector("#locations");

    if (haircutsSection) {
        haircutsSection.classList.remove("is-hidden");
    }

    if (locationsSection) {
        locationsSection.classList.remove("is-hidden");
    }

    initServices();
    initMap();

    requestAnimationFrame(() => {
        if (haircutsSection) {
            haircutsSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });

    addHighlight([
        document.querySelector("#haircuts"),
        document.querySelector("#locations"),
    ]);
}

// Next js
function enableNextJS() {
    enableReact();

    const nextPageLink = document.querySelector(".next-page-link");

    if (nextPageLink) {
        nextPageLink.classList.remove("is-hidden");
    }

    if (nextPageLink) {
        nextPageLink.href = `services.html?from=${skill}`;
        nextPageLink.classList.remove("is-hidden");
    }

    requestAnimationFrame(() => {
        if (nextPageLink) {
            nextPageLink.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });

    addHighlight(nextPageLink);
}

// TypeScript
function enableTypeScript() {
    enableNextJS();

    const bookingButtons = document.querySelectorAll(".booking-button");
    const heroBookingButton = document.querySelector(".hero__buttons");

    bookingButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openBookingModal();
        });
    });

    requestAnimationFrame(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    addHighlight([
        document.querySelector(".booking-button-hero"),
        document.querySelector(".booking-button-header"),
    ]);
}

// Add Highlight
function addHighlight(objects) {
    document.querySelectorAll(".demo-highlight").forEach((element) => {
        element.classList.remove("demo-highlight");
    });

    if (!Array.isArray(objects)) {
        objects = [objects];
    }

    objects.forEach((object) => {
        object.classList.add("demo-highlight");

        let timer;

        object.addEventListener(
            "mouseenter",
            () => {
                timer = setTimeout(() => {
                    object.classList.remove("demo-highlight");
                }, 100);
            },
            { once: true },
        );

        object.addEventListener("mouseleave", () => {
            clearTimeout(timer);
        });
    });
}

/* ================================ JS Function ================================ */

// Working Time
function enableWorkingStatus() {
    const status = document.querySelector("#workingStatus");

    const OPEN_HOUR = 9;
    const CLOSE_HOUR = 21;

    function updateStatus() {
        const now = new Date();

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const openMinutes = OPEN_HOUR * 60;
        const closeMinutes = CLOSE_HOUR * 60;

        if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
            const minutesLeft = closeMinutes - currentMinutes;

            status.textContent = `Открыто:\n до закрытия ${formatTime(minutesLeft)}`;
            status.classList.add("is-open");

            return;
        }

        let minutesUntilOpen;

        if (currentMinutes < openMinutes) {
            minutesUntilOpen = openMinutes - currentMinutes;
        } else {
            minutesUntilOpen = 24 * 60 - currentMinutes + openMinutes;
        }

        status.textContent = `Закрыто:\n откроемся через ${formatTime(minutesUntilOpen)}`;
        status.classList.add("is-close");
    }

    function formatTime(minutes) {
        const hours = Math.ceil(minutes / 60);

        if (hours > 0) {
            return `${hours} ч`;
        }

        return `${minutes} мин`;
    }

    updateStatus();

    setInterval(updateStatus, 60000);
}

// Slider
function initCarousel() {
    const track = document.querySelector(".hero__carousel-track");
    const slides = Array.from(
        document.querySelectorAll(".hero__carousel-slide"),
    );

    if (!track || slides.length < 2) {
        return;
    }

    let activeIndex = slides.findIndex((slide) =>
        slide.classList.contains("is-active"),
    );

    if (activeIndex === -1) {
        activeIndex = 0;
    }

    let isMoving = false;

    function setActive(index) {
        slides.forEach((slide) => {
            slide.classList.remove("is-active", "is-hidden");
        });

        slides[index].classList.add("is-active");
    }

    function renderOrder() {
        const total = slides.length;

        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;

        track.append(slides[prevIndex], slides[activeIndex], slides[nextIndex]);
    }

    function move(direction) {
        if (isMoving) {
            return;
        }

        const total = slides.length;

        const newIndex =
            direction === "next"
                ? (activeIndex + 1) % total
                : (activeIndex - 1 + total) % total;

        const slideWidth = slides[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap);
        const distance = slideWidth + gap;

        isMoving = true;

        // Новый слайд начинает увеличиваться одновременно с движением
        setActive(newIndex);

        const finish = (event) => {
            if (event.target !== track || event.propertyName !== "transform") {
                return;
            }

            track.removeEventListener("transitionend", finish);

            activeIndex = newIndex;

            track.style.transition = "none";

            renderOrder();

            track.style.transform = "translateX(-50%)";

            // Принудительно применяем новое положение
            track.offsetHeight;

            track.style.transition = "transform 0.5s ease";

            isMoving = false;
        };

        track.addEventListener("transitionend", finish);

        requestAnimationFrame(() => {
            if (direction === "next") {
                track.style.transform = `translateX(calc(-50% - ${distance}px))`;
            } else {
                track.style.transform = `translateX(calc(-50% + ${distance}px))`;
            }
        });
    }

    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            const clickedIndex = slides.indexOf(slide);

            const prevIndex = (activeIndex - 1 + slides.length) % slides.length;

            const nextIndex = (activeIndex + 1) % slides.length;

            if (clickedIndex === prevIndex) {
                move("prev");
            }

            if (clickedIndex === nextIndex) {
                move("next");
            }
        });
    });

    setActive(activeIndex);
    renderOrder();
}

// Servisec
function initServices() {
    const bannerImage = document.querySelector(".haircuts__banner-image");

    const bannerTitle = document.querySelector(".haircuts__banner-title");

    const bannerDescription = document.querySelector(
        ".haircuts__banner-description",
    );

    const bannerPrice = document.querySelector(".haircuts__banner-price");

    const bannerDuration = document.querySelector(".haircuts__banner-duration");

    const cards = document.querySelectorAll(".haircut-card");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            cards.forEach((item) => {
                item.classList.remove("is-active");
            });

            card.classList.add("is-active");

            bannerImage.src = card.dataset.image;
            bannerImage.alt = card.dataset.alt;

            bannerTitle.textContent = card.dataset.title;

            bannerDescription.textContent = card.dataset.description;

            bannerPrice.textContent = card.dataset.price;

            bannerDuration.textContent = card.dataset.duration;
        });
    });
}

// Map
async function initMap() {
    const mapElement = document.querySelector("#map");

    if (!mapElement) return;

    const maplibregl =
        await import("https://unpkg.com/maplibre-gl@6.11.2/dist/maplibre-gl.mjs");

    const locations = [
        {
            id: "kovcheg",
            name: "БЦ «Ковчег»",
            address: "ул. Вавилова, 38/114",
            position: [46.00988, 51.535208],
        },
        {
            id: "bolshaya-gornaya",
            name: "Большая Горная",
            address: "ул. Большая Горная, 243/136",
            position: [46.027774, 51.542789],
        },
        {
            id: "nude-reform",
            name: "Nude Reform",
            address: "ул. Чернышевского, 14",
            position: [45.988118, 51.51066],
        },
    ];

    const map = new maplibregl.Map({
        container: mapElement,
        center: locations[0].position,
        zoom: 12,

        style: "https://tiles.openfreemap.org/styles/liberty",
    });

    const locationCards = document.querySelectorAll(".location");

    const markers = [];

    function setActiveLocation(index) {
        const location = locations[index];

        locationCards.forEach((card, cardIndex) => {
            card.classList.toggle("is-active", cardIndex === index);
        });

        markers.forEach((marker, markerIndex) => {
            marker
                .getElement()
                .classList.toggle("is-active", markerIndex === index);
        });

        map.flyTo({
            center: location.position,
            zoom: 15,
            speed: 0.8,
        });
    }

    locations.forEach((location, index) => {
        const markerElement = document.createElement("button");

        markerElement.className = "map-marker";
        markerElement.type = "button";
        markerElement.setAttribute("aria-label", location.name);

        markerElement.addEventListener("click", () => {
            setActiveLocation(index);
        });

        const marker = new maplibregl.Marker({
            element: markerElement,
        })
            .setLngLat(location.position)
            .addTo(map);

        markers.push(marker);
    });

    locationCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            setActiveLocation(index);
        });
    });
}

/* ================================ Modal Booking ================================ */

const bookingModal = document.querySelector(".booking-modal");
const bookingModalClose = document.querySelector(".booking-modal__close");
const bookingModalOverlay = document.querySelector(".booking-modal__overlay");

const bookingButtons = document.querySelectorAll('a[href="#booking"]');

const bookingForm = document.querySelector(".booking-modal__form");
const bookingSuccess = document.querySelector(".booking-success");
const bookingSuccessClose = document.querySelector(".booking-success__close");

function openBookingModal() {
    bookingModal.hidden = false;
    bookingModal.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        bookingModal.classList.add("is-active");
    });

    document.body.style.overflow = "hidden";
}

function closeBookingModal() {
    bookingModal.classList.remove("is-active");
    bookingModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    setTimeout(() => {
        bookingModal.hidden = true;
    }, 300);
}

bookingButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        openBookingModal();
    });
});

bookingModalClose.addEventListener("click", closeBookingModal);

bookingModalOverlay.addEventListener("click", closeBookingModal);

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        bookingModal.classList.contains("is-active")
    ) {
        closeBookingModal();
    }
});

function initBookingCalendar() {
    const calendar = document.querySelector(".booking-calendar");

    if (!calendar) return;

    const monthTitle = calendar.querySelector(".booking-calendar__month");
    const daysContainer = calendar.querySelector(".booking-calendar__days");
    const prevButton = calendar.querySelector(".booking-calendar__prev");
    const nextButton = calendar.querySelector(".booking-calendar__next");
    const dateInput = document.querySelector(".booking-modal__date");

    let currentDate = new Date();
    let selectedDate = null;

    currentDate.setDate(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function renderCalendar() {
        daysContainer.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const monthName = new Intl.DateTimeFormat("ru-RU", {
            month: "long",
            year: "numeric",
        }).format(currentDate);

        monthTitle.textContent =
            monthName.charAt(0).toUpperCase() + monthName.slice(1);

        const firstDay = new Date(year, month, 1).getDay();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startDay; i++) {
            daysContainer.appendChild(document.createElement("span"));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = day;

            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);

            if (date < today) {
                button.disabled = true;
                button.classList.add("is-disabled");
            }

            if (selectedDate && date.getTime() === selectedDate.getTime()) {
                button.classList.add("is-selected");
            }

            button.addEventListener("click", () => {
                selectedDate = date;

                const selectedYear = date.getFullYear();
                const selectedMonth = String(date.getMonth() + 1).padStart(
                    2,
                    "0",
                );
                const selectedDay = String(date.getDate()).padStart(2, "0");

                dateInput.value = `${selectedYear}-${selectedMonth}-${selectedDay}`;

                renderCalendar();
            });

            daysContainer.appendChild(button);
        }
    }

    prevButton.addEventListener("click", () => {
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const previousMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1,
        );

        if (previousMonth < currentMonth) {
            return;
        }

        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar();
    });

    nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar();
    });

    renderCalendar();
}

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    closeBookingModal();

    setTimeout(() => {
        bookingSuccess.hidden = false;
        bookingSuccess.setAttribute("aria-hidden", "false");

        requestAnimationFrame(() => {
            bookingSuccess.classList.add("is-active");
        });
    }, 300);
});

bookingSuccessClose.addEventListener("click", () => {
    bookingSuccess.classList.remove("is-active");
    bookingSuccess.setAttribute("aria-hidden", "true");

    setTimeout(() => {
        bookingSuccess.hidden = true;
    }, 300);
});

initBookingCalendar();
