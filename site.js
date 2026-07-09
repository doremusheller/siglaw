/*
=========================================================
SIGNATURE LAW PARTNERS
GLOBAL SITE SCRIPTS
Version 1.2
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
    SLIDE CONTROL
    -----------------------------------------------------
    */

    function goTo(index) {

        if (index === current) {
            return;
        }

        slides[current].classList.remove("active");

        current = index;

        slides[current].classList.add("active");

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

        timer = window.setInterval(next, 5000);

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
