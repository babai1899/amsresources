/* ================================
    ANIMATED BACKGROUNDS
================================ */

document.body.addEventListener("pointermove", (e) => {

    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();

    el.style.setProperty('--posX', x - l - w / 2);
    el.style.setProperty('--posY', y - t - h / 2);

});

/* ================================
    TRIGGER SPINNER
================================ */

const form = document.querySelector(".login-container");
const btn = document.getElementById("loginBtn");
const text = btn.querySelector(".btn-text");

form.addEventListener("submit", () => {

    btn.classList.add("loading");
    text.innerText = "Signing in...";

});