let allWeapons = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const container = document.getElementById("weaponList");
  if (!container) return;

  const data = await loadWeapons();

  allWeapons = data;

  render(allWeapons);
  setupFilters();
}

function render(list) {
  const container = document.getElementById("weaponList");

  if (!list.length) {
    container.innerHTML = "<p style='color:white'>No weapons found</p>";
    return;
  }

  container.innerHTML = list.map(w => `
    <div class="card">
      <h3>${w.name}</h3>
      <p>${w.category}</p>
      <p>Damage: ${w.damage}</p>
      <span class="rarity">${w.rarity}</span>
    </div>
  `).join("");
}

function setupFilters() {
  const search = document.getElementById("searchInput");
  const category = document.getElementById("categoryFilter");

  search.addEventListener("input", applyFilters);
  category.addEventListener("change", applyFilters);
}

function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const categoryValue = document.getElementById("categoryFilter").value;

  const filtered = allWeapons.filter(w =>
    w.name.toLowerCase().includes(searchValue) &&
    (categoryValue === "all" || w.category === categoryValue)
  );
  document.addEventListener("DOMContentLoaded", init);

async function init() {
  const container = document.getElementById("weaponList");
  if (!container) return;

  const data = await loadWeapons();

  console.log("Loaded weapons:", data); // debug

  if (!data || data.length === 0) {
    container.innerHTML = "<p style='color:white'>API not loading weapons</p>";
    return;
  }

  allWeapons = data;

  render(allWeapons);
  setupFilters();

  // only keep these if you already added compare system
  setupCompareDropdowns();
  setupCompareButton();
}
async function loadWeapons() {
  try {
    console.log("Fetching weapons from API...");

    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("DATA FROM API:", data);

    return data;

  } catch (err) {
    console.error("LOAD FAILED:", err);
    return [];
  }
}

  render(filtered);
}