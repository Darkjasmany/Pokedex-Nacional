const listaPokemon = document.querySelector("#listaPokemon");
const btnHeaderTipos = document.querySelectorAll("#navegacion-botones button");
const btnTodos = document.querySelector("#ver-todos");
const CANTIDADPOKEMON = 151;

window.onload = () => {
    buscarPokemon();
};

// for (let i = 1; i <= CANTIDADPOKEMON; i++) {
//     // concatena el indice al final de la url
//     fetch(URL + i)
//         .then((respuesta) => respuesta.json())
//         // .then((datos) => console.log(datos));
//         .then((data) => mostrarPokemon(data));
// }

const buscarPokemon = async () => {
    // const CANTIDADPOKEMON = 151;
    const URL = "https://pokeapi.co/api/v2/pokemon/";

    try {
        for (let i = 1; i <= CANTIDADPOKEMON; i++) {
            const respuesta = await fetch(URL + i);
            const resultado = await respuesta.json();
            mostrarPokemon(resultado);
        }
    } catch (error) {
        console.log(error);
    }
};

const mostrarPokemon = (resultado) => {
    // Limpio HTML previo
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // Obtengo los tipos recorriendo el JSON y para obtener cada uno de los tipos creo un nuevo arreglo con los tipos y con el resultado de una vez creo los P
    let tipos = resultado.types.map(
        (type) => `<p class="bg-${type.type.name}">${type.type.name}</p> `
    );
    tipos = tipos.join(""); // Uno los dos elementos

    // PARA AÑADIR NUMERO ANTES
    let pokeId = resultado.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

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

const limpiarHTML = () => {
    listaPokemon.innerHTML = "";
};

// OBTENER EL ID PARA FILTRAL LA NAVEGACION
btnHeaderTipos.forEach((btn) =>
    btn.addEventListener("click", (e) => {
        const botonId = e.currentTarget.id; // Obtengo el id de cada uno de los botones que presiono
        listaPokemon.innerHTML = "";

        for (let i = 1; i <= CANTIDADPOKEMON; i++) {
            // concatena el indice al final de la url
            fetch(URL + i)
                .then((respuesta) => respuesta.json())
                // .then((datos) => console.log(datos));
                .then((data) => {
                    const tipos = data.types.map((type) => type.type.name);
                    if (tipos.some((tipo) => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                });
        }
    })
);

btnTodos.addEventListener("click", () => {
    limpiarHTML();

    buscarPokemon();
});
