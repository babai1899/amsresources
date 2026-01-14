// ================= CLOCK =================
document.addEventListener("DOMContentLoaded", function () {

    function updateClock() {
        const now = new Date();

        const time = now.toLocaleTimeString('en-GB'); // HH:MM:SS
        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();

        document.getElementById("time").innerText = time;
        document.getElementById("date").innerText = date;
    }

    updateClock();
    setInterval(updateClock, 1000);
});

// ================= LOGIN PROTECTION =================
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("amsAdminLogin") !== "true") {
        window.location.href = "login.html";
    }
});

// ================= SECTION TOGGLE =================
function showDashboard() {
    document.getElementById("dashboardSection").style.display = "block";
    document.getElementById("manageRequirementsSection").style.display = "none";
    document.getElementById("changePasswordSection").style.display = "none";
    document.getElementById("uploadedResumeSection").style.display = "none";
}

function showManageRequirements() {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("changePasswordSection").style.display = "none";
    document.getElementById("manageRequirementsSection").style.display = "block";
    document.getElementById("uploadedResumeSection").style.display = "none";
}

function showChangePassword() {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("manageRequirementsSection").style.display = "none";
    document.getElementById("changePasswordSection").style.display = "block";
    document.getElementById("uploadedResumeSection").style.display = "none";
}

function showResumes() {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("uploadedResumeSection").style.display = "block";
    document.getElementById("manageRequirementsSection").style.display = "none";
    document.getElementById("changePasswordSection").style.display = "none";

    loadResumes(); // 👈 LOAD DATA HERE
}

// ================= AUTO LOAD DASHBOARD =================
document.addEventListener("DOMContentLoaded", function () {
    showDashboard();
    updateResumeCount();
});

// ================= UPLOADED RESUME =================
function loadResumes() {
    const table = document.getElementById("resumesTable");
    const resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];

    table.innerHTML = "";

    if (resumes.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">No resumes uploaded</td>
            </tr>
        `;
        updateResumeCount();
        return;
    }

    resumes.forEach((r, index) => {
        table.innerHTML += `
            <tr>
                <td>
                    <input type="checkbox" class="resume-checkbox" value="${index}">
                </td>
                <td>${r.name}</td>
                <td>${r.contact}</td>
                <td>${r.email}</td>
                <td>
                    <a href="${r.resumeData}" download="${r.resumeName}">Download</a>
                </td>
                <td>
                    <button onclick="deleteResume(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    updateResumeCount();
}

// SELECT ALL CHECKBOX LOGIC
function toggleSelectAll(source) {
    const checkboxes = document.querySelectorAll(".resume-checkbox");
    checkboxes.forEach(cb => cb.checked = source.checked);
}

// ADD DELETE FUNCTION
function deleteResume(index) {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    let resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];

    resumes.splice(index, 1);

    localStorage.setItem("uploadedResumes", JSON.stringify(resumes));

    loadResumes();       // refresh table
    updateResumeCount(); // auto recount
}

// ADD BULK DELETE FUNCTION
function bulkDeleteResumes() {
    const checkboxes = document.querySelectorAll(".resume-checkbox:checked");

    if (checkboxes.length === 0) {
        alert("Please select at least one resume to delete.");
        return;
    }

    if (!confirm(`Delete ${checkboxes.length} selected resumes?`)) return;

    let resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];

    const indexesToDelete = Array.from(checkboxes)
        .map(cb => parseInt(cb.value))
        .sort((a, b) => b - a); // delete from end

    indexesToDelete.forEach(index => resumes.splice(index, 1));

    localStorage.setItem("uploadedResumes", JSON.stringify(resumes));

    loadResumes();
    updateResumeCount();
}

// ============= COUNT RESUME ON DASHBOARD ==============
function updateResumeCount() {
    const resumes = JSON.parse(localStorage.getItem("uploadedResumes")) || [];
    const countEl = document.getElementById("resumeCount");
    if (countEl) countEl.innerText = resumes.length;
}

// ================= REQUIREMENTS =================
let requirements = JSON.parse(localStorage.getItem("amsRequirements")) || [];

// SAVE / UPDATE REQUIREMENT
// ================= REQUIREMENTS (WORKING) =================
document.addEventListener("DOMContentLoaded", () => {

    const manageTable = document.getElementById("requirementsTable");
    const dashboardTable = document.getElementById("dashboardRequirementsTable");
    const countEl = document.getElementById("requirementCount");

    let requirements = JSON.parse(localStorage.getItem("amsRequirements")) || [];

    function renderRequirements() {

        // MANAGE TABLE
        manageTable.innerHTML = "";

        if (requirements.length === 0) {
            manageTable.innerHTML = `<tr><td colspan="5">No requirements added</td></tr>`;
        } else {
            requirements.forEach((r, index) => {
                manageTable.innerHTML += `
                    <tr>
                        <td>${r.company}</td>
                        <td>${r.location}</td>
                        <td>${r.trade}</td>
                        <td>
                            ${r.fileData ? `<a href="${r.fileData}" download="${r.fileName}">Download</a>` : "—"}
                        </td>
                        <td>
                            <button onclick="editRequirement(${index})">Edit</button>
                            <button onclick="deleteRequirement(${index})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }

        // DASHBOARD TABLE (READ ONLY)
        if (dashboardTable) {
            dashboardTable.innerHTML = "";

            if (requirements.length === 0) {
                dashboardTable.innerHTML = `<tr><td colspan="4">No requirements</td></tr>`;
            } else {
                requirements.forEach(r => {
                    dashboardTable.innerHTML += `
                        <tr>
                            <td>${r.company}</td>
                            <td>${r.location}</td>
                            <td>${r.trade}</td>
                            <td>—</td>
                        </tr>
                    `;
                });
            }
        }

        // COUNT
        if (countEl) countEl.innerText = requirements.length;
    }

    // FORM SAVE
    document.getElementById("requirementForm").addEventListener("submit", e => {
        e.preventDefault();

        const data = {
            company: company.value,
            location: location.value,
            trade: trade.value,
            fileData: null,
            fileName: null
        };

        const index = editIndex.value;

        const save = () => {
            if (index === "") {
                requirements.push(data);
            } else {
                requirements[index] = data;
            }

            localStorage.setItem("amsRequirements", JSON.stringify(requirements));
            e.target.reset();
            editIndex.value = "";
            renderRequirements();
        };

        if (demandDraft.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                data.fileData = reader.result;
                data.fileName = demandDraft.files[0].name;
                save();
            };
            reader.readAsDataURL(demandDraft.files[0]);
        } else {
            save();
        }
    });

    window.editRequirement = index => {
        const r = requirements[index];
        company.value = r.company;
        location.value = r.location;
        trade.value = r.trade;
        editIndex.value = index;
        showManageRequirements();
    };

    window.deleteRequirement = index => {
        if (!confirm("Delete this requirement?")) return;
        requirements.splice(index, 1);
        localStorage.setItem("amsRequirements", JSON.stringify(requirements));
        renderRequirements();
    };

    renderRequirements();
});

// RENDER REQUIREMENTS (MANAGE SECTION)
function renderRequirements() {
    manageTable.innerHTML = "";

    if (requirements.length === 0) {
        manageTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">No requirements added</td>
            </tr>
        `;

        dashboardTable.innerHTML = `
            <tr><td colspan="4" style="text-align:center;">No requirements available</td></tr>
        `;
        updateRequirementCount();
        return;
    }

    requirements.forEach((r, index) => {
        manageTable.innerHTML += `
            <tr>
                <td>${r.company}</td>
                <td>${r.location}</td>
                <td>${r.trade}</td>
                <td>
                    ${
                        r.fileData
                            ? `<a href="${r.fileData}" download="${r.fileName}">Download</a>`
                            : "—"
                    }
                </td>
                <td>
                    <button onclick="editRequirement(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteRequirement(${index})">Delete</button>
                </td>
            </tr>
        `;

        // DASHBOARD (Read-only)
        dashboardTable.innerHTML += `
            <tr>
                <td>${r.company}</td>
                <td>${r.location}</td>
                <td>${r.trade}</td>
                <td>—</td>
            </tr>
        `;
    });

    updateRequirementCount();
}

// EDIT
function editRequirement(index) {
    const r = requirements[index];

    document.getElementById("company").value = r.company;
    document.getElementById("location").value = r.location;
    document.getElementById("trade").value = r.trade;
    document.getElementById("editIndex").value = index;

    showManageRequirements();
}

// DELETE
function deleteRequirement(index) {
    if (!confirm("Delete this requirement?")) return;

    requirements.splice(index, 1);
    localStorage.setItem("amsRequirements", JSON.stringify(requirements));
    renderRequirements();
}

// COUNT REQUIREMENTS
function updateRequirementCount() {
    const el = document.getElementById("requirementCount");
    if (el) el.innerText = requirements.length;
}

// ================= CHANGE PASSWORD =================
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const current = document.getElementById("currentPassword").value;
        const newPass = document.getElementById("newPassword").value;
        const confirm = document.getElementById("confirmPassword").value;
        const msg = document.getElementById("passwordMessage");

        const storedPassword = localStorage.getItem("adminPassword") || "admin123";

        if (current !== storedPassword) {
            msg.style.color = "red";
            msg.innerText = "Current password is incorrect";
            return;
        }

        if (newPass !== confirm) {
            msg.style.color = "red";
            msg.innerText = "Passwords do not match";
            return;
        }

        localStorage.setItem("adminPassword", newPass);

        msg.style.color = "green";
        msg.innerText = "Password updated successfully";

        document.getElementById("changePasswordForm").reset();
    });

});

// Keep ONE main loader at bottom
document.addEventListener("DOMContentLoaded", () => {
    showDashboard();
    updateResumeCount();
    renderRequirements();
});
