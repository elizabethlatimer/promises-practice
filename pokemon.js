// Part 1
async function getAllPokemon() {
  let allPokemon = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=964')).data.results;
  return allPokemon;
}

//Part 2 & 3

function getThreePokemon(allPokemon) {
  return _.sampleSize(allPokemon, 3);
}

async function displayThree(selection) {
  let p1 = axios.get(selection[0].url);
  let p2 = axios.get(selection[1].url);
  let p3 = axios.get(selection[2].url);

  let data = await Promise.all([p1, p2, p3]);

  let p1Name = data[0].data.name;
  let p2Name = data[1].data.name;
  let p3Name = data[2].data.name;

  let p1Species = axios.get(data[0].data.species.url);
  let p2Species = axios.get(data[1].data.species.url);
  let p3Species = axios.get(data[2].data.species.url);

  let speciesInfo = await Promise.all([p1Species, p2Species, p3Species]);

  let p1Flavor = getFlavorText(speciesInfo[0].data.flavor_text_entries);
  let p2Flavor = getFlavorText(speciesInfo[1].data.flavor_text_entries);
  let p3Flavor = getFlavorText(speciesInfo[2].data.flavor_text_entries);

  let p1URL = data[0].data.sprites.front_default;
  let p2URL = data[1].data.sprites.front_default;
  let p3URL = data[2].data.sprites.front_default;

  showPokemon(p1Name, p1Flavor, p1URL);
  showPokemon(p2Name, p2Flavor, p2URL);
  showPokemon(p3Name, p3Flavor, p3URL);

}

function getFlavorText(flavorData) {
  for (let entry of flavorData) {
    if (entry.language.name === "en") {
      return entry.flavor_text;
    }
  }
  return "No description available";
}

function showPokemon(name, flavor, image) {
  let newCard = `
  <div class="detail-card">
    <h5>${name}</h5>
    <img src=${image} alt="Pokemon Image">
    <p>${flavor}</p>
  </div>
  `;
  $(".pokeballs").append(newCard);
}


// On Load
$(async function () {
  let allPokemon = await getAllPokemon();
  $("button").on("click", function () {
    let selection = getThreePokemon(allPokemon);
    $(".pokeballs").empty();
    displayThree(selection);
  });
});