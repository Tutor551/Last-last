const pokedex = document.getElementById("pokedex");

console.log(pokedex);

function getForecastFromCache(coords) {
  if (!('caches' in window)){
    return null;
  }
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
} // getForecastFromCache

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`,
    move: `https://pokeapi.co/api/v2/move`
  }));
  displayPokemon(pokemon);
};

const displayPokemon = pokemon => {
  const pokemonHTMLString = pokemon
    .map(
      pokeman => `
  <li class="card" onclick="selectPokemon(${pokeman.id})">
    <a>
    <img alt="pokemon" class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </a>
  </li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokeman = await res.json();
  displayPopup(pokeman);
};

const displayPopup = pokeman => {
  var num = pokeman.weight * 0.1;
  var x = num.toFixed(1);
  const type = pokeman.types.map(type => type.type.name).join(", ");
  const move = pokeman.moves.map(move => move.move.name).join(", ");
  const image = pokeman.sprites["front_default"];
  const htmlString = `
   <div class="popup">
        <button id="close" onclick="closePopup()">X</button>
        <div class="card">
        <img alt="pokeman" class="card-image" src="${image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height * 10} cm| <small>Weight: </small>${x} kg | <small>Type: </small>${type}</p>
        <p><small>Move: </small>${move}</p>
  </div>
   </div>
`;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();


function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("pokedex");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}