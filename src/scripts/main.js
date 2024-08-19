const listaPokemon = document.querySelector("#listaPokemon");
const btnHeaderTipos = document.querySelectorAll("#navegacion-botones button");
const btnTodos = document.querySelector("#ver-todos");
const formulario = document.querySelector("#busqueda");

const CANTIDADPOKEMON = 151;
const URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonData = [];

window.onload = async () => {
    try {
        pokemonData = await fetchPokemon();
        mostrarPokemon(pokemonData);
        formulario.addEventListener("submit", validarBusqueda);
    } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
    }
};

const validarBusqueda = async (e) => {
    e.preventDefault();
    const terminoBusqueda = document
        .querySelector("#buscador")
        .value.toLowerCase();
    if (terminoBusqueda.trim() === "") {
        mostrarPokemon(pokemonData);
        return;
    } else {
        const resultadoBusqueda = pokemonData.filter(
            (pokemon) => pokemon.name.toLowerCase() === terminoBusqueda
        );

        if (resultadoBusqueda.length === 0) {
            noHayPokemon();
            setTimeout(() => {
                listaPokemon.classList.add("grid");
                mostrarPokemon(pokemonData);
            }, 3000);
        } else {
            mostrarPokemon(resultadoBusqueda);
        }
    }
};

const fetchPokemon = async () => {
    // Manejo de Errores: Se ha añadido un bloque try-catch en fetchPokemon para manejar errores.
    try {
        const arrayPokemon = [];
        for (let i = 1; i <= CANTIDADPOKEMON; i++) {
            const url = `${URL}${i}`;
            arrayPokemon.push(fetch(url).then((respuesta) => respuesta.json()));
        }

        return await Promise.all(arrayPokemon); //con el promise almaceno todos los pokemon en el array y los retorno
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
    }
};

const mostrarPokemon = (data) => {
    // Optimización del Renderizado:En lugar de crear y añadir elementos uno por uno, puedes usar document.createDocumentFragment() para optimizar el rendimiento cuando añades múltiples elementos al DOM.

    limpiarHTML();
    // data.forEach((pokemon) => cardPokemon(pokemon));
    const fragment = document.createDocumentFragment();
    data.forEach((pokemon) => {
        fragment.appendChild(createCardPokemon(pokemon));
    });

    listaPokemon.appendChild(fragment);
};

const createCardPokemon = (resultado) => {
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

    // listaPokemon.appendChild(divPokemon);
    return divPokemon;
};

const noHayPokemon = () => {
    listaPokemon.classList.remove("grid");
    listaPokemon.innerHTML = `<p class="uppercase text-center text-2xl font-bold my-28 text-negro">
            No se encontro el Pokémon
            </p>`;
};

const limpiarHTML = () => {
    listaPokemon.innerHTML = "";
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
