document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("resumeForm");
    const message = document.getElementById("message");

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const fileInput = document.getElementById("resumeFile");

        const file = fileInput.files[0];

        // 🔴 File missing
        if (!file) {
            message.style.color = "red";
            message.innerText = "Please upload your resume.";
            return;
        }

        // 🔴 File size limit
        if (file.size > MAX_FILE_SIZE) {
            message.style.color = "red";
            message.innerText = "Resume size must be less than 2 MB.";
            fileInput.value = ""; // clear file field
            return;
        }

        // 🔴 File type validation (optional but recommended)
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            message.style.color = "red";
            message.innerText = "Only PDF or Word documents are allowed.";
            fileInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];

            resumes.push({
                name,
                contact,
                email,
                resumeName: file.name,
                resumeData: reader.result
            });

            localStorage.setItem("uploadedResumes", JSON.stringify(resumes));

            // ✅ Success
            message.style.color = "green";
            message.innerText = "Resume submitted successfully!";

            // ✅ CLEAR FORM AFTER SUBMIT
            form.reset();
        };

        reader.readAsDataURL(file);
    });
});
