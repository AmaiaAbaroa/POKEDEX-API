const poke_container = document.getElementById('poke-container');
const buttons = document.getElementById('buttons')
// const pokemon_count = 150;
// const apiURL = "https://pokeapi.co/api/v2/pokemon";

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

function updatePokemons(url) {
    if (url) {
      poke_container.innerHTML = ""; // Se vacía el contenedor de Pokémon para limpiar la lista anterior
  
      fetch(url)
        .then(res => res.json()) // Se convierte la respuesta en formato JSON
        .then(res => {
          res.results.sort((a, b) => a.id - b.id); // Se ordenan los resultados por ID de Pokémon
  
          const pokemonPromises = res.results.map(pokemon => {
            return fetch(pokemon.url).then(response => response.json()); // Se crea un arreglo de promesas para obtener información detallada de cada Pokémon
          });
  
          Promise.all(pokemonPromises)
            .then(pokemons => {
              for (let i = 0; i < pokemons.length; i++) {
                let x = pokemons[i];
                let types = x.types.map(type => type.type.name); // Se obtienen los tipos de Pokémon
                let primaryType = types[0]; // Se obtiene el tipo primario del Pokémon
  
                poke_container.innerHTML += 
                  `<div class="pokemon" style="background-color: ${colors[primaryType]}">
                    <div class="img-container">
                      <img src="${x.sprites.front_default}" alt="">
                    </div>
                    <div class="info">
                      <span class="number"># ${x.id}</span>
                      <h3 class="name">${x.name}</h3>
                      <small class="type">Type: ${types.join(", ")}</small>
                    </div>
                  </div>`; // Se agrega el HTML de cada Pokémon al contenedor
              }
  
              // Se actualiza el contenido del contenedor de enlaces de navegación
              buttons.innerHTML = (res.previous) ? 
                `<button class="button" onclick="updatePokemons('${res.previous}')">Back</button>` : "";
  
              buttons.innerHTML += (res.next) ?
                `<button class="button" onclick="updatePokemons('${res.next}')">Next</button>` : "";
            });
        });
    }
  }
  
  updatePokemons("https://pokeapi.co/api/v2/pokemon");
