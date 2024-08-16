const listaPokemon = document.querySelector("#listaPokemon");
let url = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 0; i < 151; i++) {
    // concatena el indice al final de la url
    fetch(url + i)
        .then((respuesta) => respuesta.json)
        .then((datos) => mostrarPokemon(data));
}
