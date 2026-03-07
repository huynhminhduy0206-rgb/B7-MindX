const searchInput = document.getElementById("pokemonInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");

// Handle button click
searchBtn.addEventListener("click", () => {
    performSearch();
});

// Handle Enter key
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
    const pokemonName = searchInput.value.trim().toLowerCase();
    
    if (!pokemonName) {
        resultsContainer.innerHTML = "<p style='color: #FFD700;'>Please enter a Pokemon name.</p>";
        return;
    }
    
    fetchPokemon(pokemonName);
}

function fetchPokemon(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }
            return response.json();
        })
        .then((data) => {
            displayPokemon(data);
        })
        .catch((error) => {
            resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            console.error("Error fetching data:", error);
        });
}

function displayPokemon(pokemon) {
    const maxStatValue = 255;
    const statsHTML = pokemon.stats.map(stat => {
        const statName = stat.stat.name.toUpperCase().replace("-", " ");
        const statValue = stat.base_stat;
        const percentage = (statValue / maxStatValue) * 100;
        
        return `
            <div class="stat-row">
                <div class="stat-label">${statName}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${percentage}%">
                        <span class="stat-value">${statValue}</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    const html = `
        <div class="pokemon-card">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemon-info">
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(", ")}</p>
                <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
            </div>
            <div class="pokemon-stats">
                <h3>📊 Base Stats</h3>
                ${statsHTML}
            </div>
        </div>
    `;
    resultsContainer.innerHTML = html;
}
