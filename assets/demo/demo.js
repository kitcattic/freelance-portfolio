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
}

// React
function enableReact() {
    enableCSS();
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
