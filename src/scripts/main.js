const listaPokemon = document.querySelector("#listaPokemon");
const btnHeaderTipos = document.querySelectorAll("#navegacion-botones button");
const btnTodos = document.querySelector("#ver-todos");
const formulario = document.querySelector("#busqueda");

const CANTIDADPOKEMON = 12;
const URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonData = [];

window.onload = async () => {
    try {
        pokemonData = await fetchPokemon();
        // console.log(pokemonData);
        mostrarPokemon(pokemonData);

        formulario.addEventListener("submit", validarBusqueda);
    } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
    }
};

const validarBusqueda = async (e) => {
    e.preventDefault();
    const terminoBusqueda = document.querySelector("#buscador").value;

    const resultadoBusqueda = pokemonData.filter(
        (pokemon) => pokemon.name === terminoBusqueda
    );
    mostrarPokemon(resultadoBusqueda);
};

const fetchPokemon = async () => {
    const arrayPokemon = [];
    for (let i = 1; i <= CANTIDADPOKEMON; i++) {
        const url = `${URL}${i}`;
        arrayPokemon.push(fetch(url).then((respuesta) => respuesta.json()));
    }

    return await Promise.all(arrayPokemon); //con el promise almaceno todos los pokemon en el array y los retorno
};

const mostrarPokemon = (data) => {
    limpiarHTML();
    data.forEach((pokemon) => cardPokemon(pokemon));
};

const cardPokemon = (resultado) => {
    // Obtengo los tipos recorriendo el JSON y para obtener cada uno de los tipos creo un nuevo arreglo con los tipos y con el resultado de una vez creo los P
    let tipos = resultado.types.map(
        (type) => `<p class="bg-${type.type.name}">${type.type.name}</p> `
    );
    tipos = tipos.join(""); // Uno los dos elementos

    // PARA AÑADIR NUMERO ANTES
    let pokeId = resultado.id.toString().padStart(3, "0"); // PadStart para formatear ID

    const divPokemon = document.createElement("DIV");
    divPokemon.classList.add(
        "pokemon",
        "rounded-2xl",
        "bg-white",
        "shadow",
        "py-4",
        "uppercase",
        "relative",
        "isolate",
        "overflow-hidden"
    );
    divPokemon.innerHTML = `
 <p
                    class="pokemon-id-back absolute top-4 left-1/2 translate-x-[-50%] font-bold text-8xl text-gray-100 z-[-1]"
                >
                    #${pokeId}
                </p>
                <div class="pokemon-imagen ps-4 flex justify-center">
                    <img
                        class="w-full max-w-24"
                        src="${resultado.sprites.other["official-artwork"].front_default}"
                        alt="${resultado.name}"
                    />
                </div>
                <div
                    class="pokemon-info flex flex-col items-center gap-2 px-4 text-center"
                >
                    <div
                        class="nombre-contenedor flex items-center gap-x-2 flex-wrap justify-center"
                    >
                        <p
                            class="pokemon-id bg-gray-100 py-1 px-2 rounded-[100vmax] text-xs font-bold"
                        >
                            #${pokeId}
                        </p>
                        <h2 class="pokemon-nombre text-2xl font-bold">
                            ${resultado.name}
                        </h2>
                    </div>
                    <div
                        class="pokemon-tipos flex gap-2 text-sm font-semibold flex-wrap justify-center
                        [&>p]:py-1 [&>p]:px-2 [&>p]:rounded-[100vmax]"
                    >
                        ${tipos}
                    </div>
                    <div
                        class="pokemon-stat flex gap-4 text-sm [&>p]:bg-gray-100 [&>p]:py-1 [&>p]:px-2 [&>p]:rounded-[100vmax]"
                    >
                        <p class="stat">${resultado.height} M</p>
                        <p class="stat">${resultado.weight} KG</p>
                    </div>
                </div>
`;

    listaPokemon.appendChild(divPokemon);
};

btnHeaderTipos.forEach((btn) =>
    btn.addEventListener("click", (e) => {
        const botonId = e.currentTarget.id;
        const filteredPokemon = pokemonData.filter((pokemon) =>
            pokemon.types.some((type) => type.type.name === botonId)
        );
        mostrarPokemon(filteredPokemon);
    })
);

btnTodos.addEventListener("click", () => {
    mostrarPokemon(pokemonData);
});

const limpiarHTML = (data) => {
    listaPokemon.innerHTML = "";
};
