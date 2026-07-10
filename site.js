
/*
=========================================================
SIGNATURE LAW PARTNERS
GLOBAL SITE SCRIPTS
Version 1.3
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll(".testimonial-carousel");

    carousels.forEach(initializeCarousel);

});

function initializeCarousel(carousel) {

    const slides = Array.from(
        carousel.querySelectorAll(".testimonial-slide")
    );

    if (slides.length <= 1) {
        return;
    }

    let current = slides.findIndex(slide =>
        slide.classList.contains("active")
    );

    if (current < 0) {
        current = 0;
        slides[0].classList.add("active");
    }

    /*
    -----------------------------------------------------
    DOT NAVIGATION
    -----------------------------------------------------
    */

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "testimonial-dots";

    const dots = slides.map((slide, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "testimonial-dot";
        button.setAttribute(
            "aria-label",
            `Go to testimonial ${index + 1}`
        );

        if (index === current) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            goTo(index);
            restart();

        });

        dotsContainer.appendChild(button);

        return button;

    });

    carousel.after(dotsContainer);

    /*
    -----------------------------------------------------
    SLIDE CONTROL
    -----------------------------------------------------
    */

    function updateDots() {

        dots.forEach((dot, index) => {

            dot.classList.toggle("active", index === current);

        });

    }

    function goTo(index) {

        if (index === current) {
            return;
        }

        slides[current].classList.remove("active");

        current = index;

        slides[current].classList.add("active");

        updateDots();

    }

    function next() {

        let nextIndex = current + 1;

        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }

        goTo(nextIndex);

    }

    function previous() {

        let previousIndex = current - 1;

        if (previousIndex < 0) {
            previousIndex = slides.length - 1;
        }

        goTo(previousIndex);

    }

    /*
    -----------------------------------------------------
    AUTO ROTATION
    -----------------------------------------------------
    */

    let timer = null;

    function start() {

        stop();

        timer = window.setInterval(next, 8000);

    }

    function stop() {

        if (timer !== null) {

            clearInterval(timer);
            timer = null;

        }

    }

    function restart() {

        stop();
        start();

    }

    /*
    -----------------------------------------------------
    EVENTS
    -----------------------------------------------------
    */

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stop();
        } else {
            start();
        }

    });

    /*
    -----------------------------------------------------
    KEYBOARD SUPPORT
    -----------------------------------------------------
    */

    carousel.setAttribute("tabindex", "0");

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            next();
            restart();

        }

        if (event.key === "ArrowLeft") {

            previous();
            restart();

        }

    });

    /*
    -----------------------------------------------------
    START
    -----------------------------------------------------
    */

    start();

}


This version is a drop-in replacement for your current `site.js`. The only remaining step is to add the corresponding CSS for `.testimonial-dots` and `.testimonial-dot` to your stylesheet.
