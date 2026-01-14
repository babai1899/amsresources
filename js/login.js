document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const error = document.getElementById("loginError");

        // ADMIN LOGIN DETAILS
     // const ADMIN_USERNAME = "admin";
     // const ADMIN_PASSWORD = "1234";

        if (username === "admin" && password === "1234") {

            // Save login state
            localStorage.setItem("amsAdminLogin", "true");

            // Redirect to dashboard
            window.location.href = "admin-dashboard.html";

        } else {
            error.innerText = "❌ Invalid username or password";
        }
    });

});
