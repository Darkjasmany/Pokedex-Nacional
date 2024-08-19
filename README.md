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

