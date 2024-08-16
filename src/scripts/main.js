const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 6; i++) {
    // concatena el indice al final de la url
    fetch(URL + i)
        .then((respuesta) => respuesta.json())
        // .then((datos) => console.log(datos));
        .then((data) => mostrarPokemon(data));
}

const mostrarPokemon = (data) => {
    const divPokemon = document.createElement("DIV");
    divPokemon.classList.add(
        "pokemon",
        "rounded-2xl",
        "bg-white",
        "shadow-2xl",
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
                    #${data.id}
                </p>
                <div class="pokemon-imagen ps-4 flex justify-center">
                    <img
                        class="w-full max-w-24"
                        src="${data.sprites.other["official-artwork"].front_default}"
                        alt="${data.name}"
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
                            #${data.id}
                        </p>
                        <h2 class="pokemon-nombre text-2xl font-bold">
                            ${data.name}
                        </h2>
                    </div>
                    <div
                        class="pokemon-tipos flex gap-2 text-sm font-semibold flex-wrap justify-center
                        [&>p]:py-1 [&>p]:px-2 [&>p]:rounded-[100vmax]"
                    >
                        <p class="tipo bg-electric">BUG</p>
                        <p class="tipo bg-steel">STEEL</p>
                    </div>
                    <div
                        class="pokemon-stat flex gap-4 text-sm [&>p]:bg-gray-100 [&>p]:py-1 [&>p]:px-2 [&>p]:rounded-[100vmax]"
                    >
                        <p class="stat">${data.height} M</p>
                        <p class="stat">${data.weight} KG</p>
                    </div>
                </div>
`;

    listaPokemon.appendChild(divPokemon);
};
