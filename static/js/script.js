/* ===================================
   GLOBAL SCRIPT - AMS RESOURCES
=================================== */

document.addEventListener("DOMContentLoaded", function () {

    initMobileMenu();
    initNavbarScroll();
    initTestimonialSlider();
    initIndustryCards();
    initRevealAnimation();
    initCounter();

});


/* ===================================
   MOBILE MENU
=================================== */

function initMobileMenu() {

    const nav = document.getElementById("navLinks");

    if (!nav) return;

    window.toggleMenu = function () {
        nav.classList.toggle("active");
    };

    const links = nav.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

}


/* ===================================
   NAVBAR SCROLL EFFECT
=================================== */

function initNavbarScroll() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


/* ===================================
   TESTIMONIAL SLIDER
=================================== */

function initTestimonialSlider() {

    const track = document.querySelector(".testimonial-track");

    if (!track) return;

    let cards = document.querySelectorAll(".testimonial-card");

    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");
    const dotsContainer = document.querySelector(".dots");

    let index = 1;

    /* clone first and last */

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);

    cards = document.querySelectorAll(".testimonial-card");

    track.style.transform = `translateX(-${index * 100}%)`;

    /* dots */

    const totalSlides = cards.length - 2;

    if (dotsContainer) {

        for (let i = 0; i < totalSlides; i++) {

            const dot = document.createElement("span");
            dot.classList.add("dot");

            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                index = i + 1;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        }

    }

    const dots = document.querySelectorAll(".dot");

    function updateDots() {

        dots.forEach(dot => dot.classList.remove("active"));

        let dotIndex = index - 1;

        if (dotIndex < 0) dotIndex = dots.length - 1;
        if (dotIndex >= dots.length) dotIndex = 0;

        if (dots[dotIndex]) dots[dotIndex].classList.add("active");

    }

    function updateSlider() {

        track.style.transition = "transform .6s cubic-bezier(.22,.61,.36,1)";
        track.style.transform = `translateX(-${index * 100}%)`;

        updateDots();

    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            index++;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            index--;
            updateSlider();
        });
    }

    track.addEventListener("transitionend", () => {

        if (cards[index].isSameNode(firstClone)) {
            track.style.transition = "none";
            index = 1;
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        if (cards[index].isSameNode(lastClone)) {
            track.style.transition = "none";
            index = cards.length - 2;
            track.style.transform = `translateX(-${index * 100}%)`;
        }

    });

    /* auto slide */

    setInterval(() => {
        index++;
        updateSlider();
    }, 5000);

}


/* ===================================
   INDUSTRY CARD EFFECT
=================================== */

function initIndustryCards() {

    const cards = document.querySelectorAll(".card");

    if (!cards.length) return;

    cards.forEach(card => {

        const icon = card.querySelector(".icon");

        if (!icon) return;

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;

            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;

        });

        card.addEventListener("mouseleave", () => {
            icon.style.transform = "translate(0,0)";
        });

    });

}


/* ===================================
   SCROLL REVEAL ANIMATION
=================================== */

function initRevealAnimation() {

    const reveals = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!reveals.length) return;

    function revealOnScroll() {

        reveals.forEach(el => {

            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 120) {
                el.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

}


/* ===================================
   COUNTER ANIMATION
=================================== */

function initCounter() {

    const statsSection = document.querySelector(".stats-section");

    if (!statsSection) return;

    const counters = document.querySelectorAll(".counter");

    const startCounter = () => {

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const update = () => {

                const increment = target / 100;

                if (count < target) {

                    count += increment;
                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target + "+";

                }

            };

            update();

        });

    };

    const observer = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting) {

            startCounter();
            observer.disconnect();

        }

    });

    observer.observe(statsSection);

}

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
        GALLERY LIGHTBOX
    ================================ */

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxVideo = document.getElementById("lightboxVideo");
    const closeLightbox = document.querySelector(".close-lightbox");

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const img = item.querySelector("img");
            const video = item.querySelector("video");

            lightbox.style.display = "flex";

            /* IMAGE */
            if (img) {

                lightboxImg.style.display = "block";
                lightboxVideo.style.display = "none";

                lightboxImg.src = img.src;

            }

            /* VIDEO */
            if (video) {

                const source = video.querySelector("source").src;

                lightboxImg.style.display = "none";
                lightboxVideo.style.display = "block";

                lightboxVideo.src = source;
                lightboxVideo.play();

            }

        });

    });

    /* CLOSE LIGHTBOX */

    closeLightbox.onclick = () => {

        lightbox.style.display = "none";

        lightboxVideo.pause();
        lightboxVideo.src = "";

    };


    /* CLOSE WHEN CLICK OUTSIDE */

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

            lightboxVideo.pause();
            lightboxVideo.src = "";

        }

    });

});

/* ===============================
   GALLERY FILTER
=============================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.classList.contains(filter)) {
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }

        });

    });

});

/* ===========================
    Video Hover Playback
=========================== */
document.querySelectorAll(".gallery-item video").forEach(video => {

    video.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
    });

});

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline-progress");
const plane = document.querySelector(".timeline-plane");

function updateTimeline() {

    if (!timeline || !progress || !plane) return;

    const timelineTop = timeline.offsetTop;
    const timelineHeight = timeline.offsetHeight;

    const scrollY = window.scrollY + window.innerHeight * 0.6;

    let progressHeight = scrollY - timelineTop;

    progressHeight = Math.max(0, Math.min(progressHeight, timelineHeight));

    progress.style.height = progressHeight + "px";
    plane.style.top = progressHeight + "px";
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("load", updateTimeline);

/* =============================
   JOB TABLE SECTION
============================= */
let currentPage = 1;
const rowsPerPage = 10;

const table = document.getElementById("jobsTable");
const rows = table.querySelectorAll("tbody tr");
const pageInfo = document.getElementById("pageInfo");

function showPage(page) {

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
        row.style.display = (index >= start && index < end) ? "" : "none";
    });

    pageInfo.innerText = `Page ${page} of ${Math.ceil(rows.length / rowsPerPage)}`;
}

function nextPage() {
    if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

showPage(currentPage);