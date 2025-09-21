// 🔮 Random Quote of the Day
const quotes = [
  "Your mental health matters.",
  "Take one step at a time.",
  "You are enough.",
  "Healing is not linear.",
  "Small progress is still progress."
];

document.addEventListener("DOMContentLoaded", () => {
  // ------------------- Quote of the Day -------------------
  const quoteEl = document.getElementById("quote-of-the-day");
  if (quoteEl) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = quotes[randomIndex];
  }

  // ------------------- Mood Tracker -------------------
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodLog = document.getElementById("mood-log");
  moodButtons.forEach(button => {
    button.addEventListener("click", () => {
      const mood = button.getAttribute("data-mood");
      const time = new Date().toLocaleString();
      const entry = `Mood "${mood}" logged at ${time}`;
      moodLog.textContent = entry;

      // Save mood to localStorage
      let moods = JSON.parse(localStorage.getItem("moodLog")) || [];
      moods.push(entry);
      localStorage.setItem("moodLog", JSON.stringify(moods));
    });
  });

  // ------------------- Gratitude Journal -------------------
  const saveBtn = document.getElementById("saveEntry");
  const journalInput = document.getElementById("journal-entry");
  const gratitudeOutput = document.getElementById("gratitudeOutput");
  const entriesDiv = document.getElementById("entries");

  function renderJournal() {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entriesDiv.innerHTML = savedEntries.map(e => `<div class="journal-entry">🌻 ${e}</div>`).join("");
  }

  renderJournal();

  saveBtn.addEventListener("click", () => {
    const entry = journalInput.value.trim();
    if (!entry) {
      gratitudeOutput.textContent = "🌻 Please write something before saving.";
      return;
    }

    let savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    savedEntries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(savedEntries));

    gratitudeOutput.textContent = "✅ Entry saved successfully!";
    journalInput.value = "";
    renderJournal();
  });

  // ------------------- Meditation Timer -------------------
  const startTimerBtn = document.getElementById("start-timer");
  startTimerBtn.addEventListener("click", () => {
    const durationInput = document.getElementById("duration");
    const display = document.getElementById("timer-display");
    let time = parseInt(durationInput.value) * 60;

    if (isNaN(time) || time <= 0) {
      display.textContent = "Please enter a valid number of minutes.";
      return;
    }

    const interval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      time--;
      if (time < 0) {
        clearInterval(interval);
        display.textContent = "Meditation complete!";
      }
    }, 1000);
  });

  // ------------------- Box Breathing -------------------
  const startBtn = document.getElementById("start-breathing");
  const stopBtn = document.getElementById("stop-breathing");
  const circle = document.querySelector(".breathing-circle");
  const instruction = document.getElementById("breathing-instruction");

  let intervalId;
  let step = 0;
  const steps = ["Inhale", "Hold", "Exhale", "Hold"];

  startBtn.addEventListener("click", () => {
    if (intervalId) return; // prevent multiple intervals
    intervalId = setInterval(() => {
      const phase = steps[step % steps.length];
      instruction.textContent = phase;
      circle.classList.toggle("expand", phase === "Inhale");
      circle.classList.toggle("contract", phase === "Exhale");
      step++;
    }, 4000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    step = 0;
    instruction.textContent = "Click 'Start' to begin";
    circle.classList.remove("expand", "contract");
  });
});
