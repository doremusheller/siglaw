/*
=========================================================
SIGNATURE LAW PARTNERS
GLOBAL SITE SCRIPTS
Version 1.0
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeTestimonialCarousels();

});

/*
=========================================================
TESTIMONIAL CAROUSELS
=========================================================
*/

function initializeTestimonialCarousels() {

    const carousels = document.querySelectorAll(".testimonial-carousel");

    if (!carousels.length) {
        return;
    }

    carousels.forEach(createCarousel);

}

function createCarousel(carousel) {

    const slides = carousel.querySelectorAll(".testimonial-slide");

    if (slides.length <= 1) {
        return;
    }

    let current = 0;
    let interval = null;

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        if (index === 0) {
            slide.classList.add("active");
        }

    });

    createDots();

    startRotation();

    carousel.addEventListener("mouseenter", stopRotation);
    carousel.addEventListener("mouseleave", startRotation);

    carousel.addEventListener("focusin", stopRotation);
    carousel.addEventListener("focusout", startRotation);

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stopRotation();
        } else {
            startRotation();
        }

    });

    function showSlide(index) {

        slides[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = index;

        slides[current].classList.add("active");
        dots[current].classList.add("active");

    }

    function nextSlide() {

        let next = current + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);

    }

    function previousSlide() {

        let previous = current - 1;

        if (previous < 0) {
            previous = slides.length - 1;
        }

        showSlide(previous);

    }

    function startRotation() {

        stopRotation();

        interval = window.setInterval(nextSlide, 8000);

    }

    function stopRotation() {

        if (interval !== null) {

            clearInterval(interval);
            interval = null;

        }

    }

    function createDots() {

        const dotsContainer = document.createElement("div");
        dotsContainer.className = "testimonial-dots";

        slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "testimonial-dot";

            dot.setAttribute(
                "aria-label",
                `Show testimonial ${index + 1}`
            );

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                showSlide(index);
                startRotation();

            });

            dotsContainer.appendChild(dot);

        });

        carousel.after(dotsContainer);

        dots = dotsContainer.querySelectorAll(".testimonial-dot");

    }

    let dots = [];

    /*
    =========================================================
    OPTIONAL KEYBOARD SUPPORT
    =========================================================
    */

    carousel.setAttribute("tabindex", "0");

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            nextSlide();
            startRotation();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();
            startRotation();

        }

    });

}
