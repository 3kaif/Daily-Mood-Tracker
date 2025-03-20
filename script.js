// Select Elements
const themeButton = document.getElementById("mode-switch");
const moodSelect = document.getElementById("mood");
const noteInput = document.getElementById("description");
const saveMoodButton = document.getElementById("save-mood");
const historyButton = document.getElementById("history-btn");
const historySection = document.getElementById("history");
const moodTable = document.querySelector("#history-table tbody");
const body = document.body;

// Load Saved Theme
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

// Toggle Theme Mode
themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        themeButton.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("dark-mode", "disabled");
        themeButton.textContent = "🌙 Dark Mode";
    }
});

// Save Mood Entry
saveMoodButton.addEventListener("click", () => {
    const mood = moodSelect.value;
    const note = noteInput.value.trim();
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    if (!mood) {
        alert("Please select a mood!");
        return;
    }

    const moodEntry = { date: formattedDate, time: formattedTime, mood, note };
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moodHistory.push(moodEntry);
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

    noteInput.value = "";
    loadMoodHistory();
});

// Show/Hide Mood History
historyButton.addEventListener("click", () => {
    if (historySection.style.display === "none" || historySection.style.display === "") {
        historySection.style.display = "block";
        historyButton.textContent = "Hide History";
    } else {
        historySection.style.display = "none";
        historyButton.textContent = "View History";
    }
});

// Load Mood History
function loadMoodHistory() {
    moodTable.innerHTML = "";
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

    moodHistory.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${entry.mood}</td>
            <td>${entry.note || "—"}</td>
            <td><button onclick="deleteEntry(${index})">🗑️ Delete</button></td>
        `;
        moodTable.appendChild(row);
    });
}

// Delete Mood Entry
function deleteEntry(index) {
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moodHistory.splice(index, 1);
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    loadMoodHistory();
}

// Load Previous Data on Start
document.addEventListener("DOMContentLoaded", loadMoodHistory);
