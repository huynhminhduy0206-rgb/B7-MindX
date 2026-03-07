let name_pokemon = "";
const url = `https://pokeapi.co/api/v2/pokemon/${name_pokemon}`;

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
