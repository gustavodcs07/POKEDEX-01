console.log("Funcionou!")
const url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
const pokeList = document.getElementById("lista-poke")

function convertPokeToli(pokemon){
    return `
        <li class="pokemon ${pokemon.types[0].type.name}">
            <p class="nome">${pokemon.name}</p>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="Bulbasaur">
        </li>      
    `;
}


function getPokeDetalhes(pokemon){
    return fetch(pokemon.url)
        .then((response) => response.json())
}

fetch(url)
    .then((response) => response.json())
    .then((jsonresponse) => jsonresponse.results)
    .then((list) => list.map(getPokeDetalhes))
    .then((detalhes) => Promise.all(detalhes))
    .then((newList) => pokeList.innerHTML = newList.map(convertPokeToli).join("") )
    .catch((error) => console.log(error))

