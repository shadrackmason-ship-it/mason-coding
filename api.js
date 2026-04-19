const API_KEY = "b40af10d71ab4d0a99e3150a98e2c214";
const API_URL = "http://localhost:3000/api/weapons";

// ===== LOAD WEAPONS FROM API =====
async function loadWeapons() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        //Authentication (real API style)
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return data.map(w => ({
      name: w.name,
      category: w.category,
      damage: w.damage,
      type: getType(w.category),
      rarity: getRarity(w.damage)
    }));

  } catch (err) {
    console.error("Weapons API Error:", err);
    return [];
  }
}

// ===== HELPERS =====
function getType(category) {
  const ranged = ["AR", "SMG", "SR", "DMR", "Shotgun", "LMG"];
  return ranged.includes(category) ? "ranged" : "melee";
}

function getRarity(damage) {
  if (damage >= 90) return "Legendary";
  if (damage >= 70) return "Epic";
  if (damage >= 45) return "Rare";
  return "Common";
}