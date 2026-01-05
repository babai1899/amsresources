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
