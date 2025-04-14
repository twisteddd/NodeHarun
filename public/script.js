const form = document.getElementById("moodForm");
const moodInput = document.getElementById("mood");
const noteInput = document.getElementById("note");
const entriesDiv = document.getElementById("entries");

async function fetchMoods() {
  const res = await fetch("/api/moods");
  const data = await res.json();
  entriesDiv.innerHTML = data.reverse().map(entry => `
    <div class="entry">
      <strong>${entry.mood}</strong> - ${entry.note || "(bez beleške)"}<br>
      <small>${new Date(entry.time).toLocaleString()}</small>
    </div>
  `).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const mood = moodInput.value;
  const note = noteInput.value;

  await fetch("/api/moods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, note }),
  });

  noteInput.value = "";
  fetchMoods();
});

fetchMoods();
