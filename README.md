# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```
## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## Mejoras realizadas:
# Obtención de Datos: 
Ahora se obtienen todos los datos de Pokémon al cargar la página y se almacenan en pokemonData.

# Refactorización: 
Se ha creado la función fetchPokemons para obtener todos los datos de Pokémon en paralelo y mostrarPokemons para mostrar todos los Pokémon.

# Filtrado de Datos: 
Se filtran los Pokémon ya obtenidos en lugar de hacer nuevas solicitudes cuando se presionan los botones de tipo.

# Formateo del ID: 
Utiliza padStart para formatear el ID del Pokémon de manera más limpia.


## Resumen del Código
# Variables y Selección de Elementos:
listaPokemon, btnHeaderTipos, btnTodos, y formulario se seleccionan para manipulación DOM.
CANTIDADPOKEMON define cuántos Pokémon se van a cargar (151 en este caso).
URL es la base de la API de Pokémon.

# Carga Inicial:
Cuando la ventana se carga (window.onload), se obtiene la data de Pokémon y se muestra en la página.
Se añade un event listener al formulario para la búsqueda de Pokémon.

# Función validarBusqueda:
Previene el comportamiento por defecto del formulario.
Filtra los Pokémon según el término de búsqueda.
Muestra un mensaje si no se encuentra el Pokémon, y después de 3 segundos, vuelve a mostrar todos los Pokémon.

# Función fetchPokemon:
Realiza solicitudes a la API para obtener datos de los Pokémon y devuelve una lista de ellos.

# Función mostrarPokemon:

Limpia el HTML actual y luego muestra los Pokémon pasados a través de la función cardPokemon.

# Función cardPokemon:
Crea una tarjeta para cada Pokémon con información como ID, imagen, nombre, tipos, altura, y peso.
Añade la tarjeta al contenedor listaPokemon.

# Filtros de Tipos:
Añade event listeners a los botones de tipo para filtrar los Pokémon según el tipo seleccionado.

# Mostrar Todos los Pokémon:
Añade un event listener al botón para mostrar todos los Pokémon de nuevo.