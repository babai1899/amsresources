// HERO SLIDER
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 4000);

// TESTIMONIAL SLIDER
const testimonials = [
    {
        text: "AMS RESOURCES helped us find the perfect candidates!",
        author: "Client A",
        image: "images/client1.jpg"
    },
    {
        text: "Professional, reliable and very efficient recruitment services.",
        author: "Client B",
        image: "images/client2.jpg"
    },
    {
        text: "Highly recommended manpower consultancy for overseas projects.",
        author: "Client C",
        image: "images/client3.jpg"
    },
    {
        text: "আমি ভালো কাজ পেয়েছি এবং ভালোভাবে কাজ করছি।",
        author: "সুবল দাস",
        image: "images/subaldas.jpg"
    }
];

let tIndex = 0;

function showTestimonial(index) {
    document.getElementById("testimonial-text").textContent =
        "“" + testimonials[index].text + "”";
    document.getElementById("testimonial-author").textContent =
        "- " + testimonials[index].author;
    document.getElementById("testimonial-img").src =
        testimonials[index].image;
}

function nextTestimonial() {
    tIndex = (tIndex + 1) % testimonials.length;
    showTestimonial(tIndex);
}

function prevTestimonial() {
    tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(tIndex);
}

// Auto slide every 5 seconds
setInterval(nextTestimonial, 5000);

// Post Resume
document.getElementById("resumeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const fileInput = document.getElementById("resume");

    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        const resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];

        resumes.push({
            name: name,
            contact: contact,
            fileName: file.name,
            fileData: reader.result   // base64 file
        });

        localStorage.setItem("uploadedResumes", JSON.stringify(resumes));

        alert("Resume uploaded successfully!");
        document.getElementById("resumeForm").reset();
    };

    reader.readAsDataURL(file);
});

/* ======================
   HAMBURGER MENU
====================== */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

/* ======================
   HEADER SHRINK ON SCROLL
====================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});
