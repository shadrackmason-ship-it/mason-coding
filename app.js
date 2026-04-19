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

// ===== RENDER WEAPONS =====
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

// ===== FILTER SYSTEM =====
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

  render(filtered);
}