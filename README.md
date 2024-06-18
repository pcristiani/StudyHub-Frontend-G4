# `StudyHub | Proyecto 2024`  [Web](https://frontstudyhub.vercel.app/)

## ▸ `Instalación`

`Verificar que se tenga instalado` [Node.js](https://nodejs.org/) y [NPM](https://www.npmjs.com/)

```sh
node -v # v20.11.0
npm -v  # v10.5.0
```

```sh
npm install # En la ubicacion del archivo package.json
```

## ▸ `Ejecución`

```sh
npm run start  # Para ejecutar.
npm run dev    # Para ejecutar en modo desarrollo.
npm run build  # Para compilar.
npm run deploy # Para desplegar en GitHub Pages.
```

```sh
serve -s build # Para servir la aplicación compilada en producción.
```

## `Recursos`

```shell
tools.cmd # Para borrado de cache, usar si hay problemas con la ejecución.
%appdata%/Local/npm-cache # Cache de npm, renombrar carpeta.

[Material](https://mui.com/material-ui/getting-started/)

npm run start   # Para ejecutar.
npm run dev     # Para ejecutar en modo desarrollo.
npm run build   # Para compilar.
vercel build    # Para desplegar en Vercel.
serve -s build  # Para servir la aplicación compilada en producción.
```

```shell
npm i -g vercel@latest 
vercel --version
vercel login
```

```shell
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "vercel --prod",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

`graph {
bgcolor = transparent;shape = rectangle; style = "rounded";
node[shape = rectangle, style = "rounded,filled", fillcolor = "#d7f8fd", color = "#2596be", fontcolor = black, fontsize = 12, fontname = "Arial"];
  edge[color = "#2596be"];
  rankdir = TB;`
"1" [label="Programacion I"];
"2" [label="Programacion II"];
"3" [label="Programacion III"];
"4" [label="Estructura de Datos"];
"5" [label="Programacion Avanzada"];
"6" [label="Bases de Datos I"];
"7" [label="Bases de Datos II"];
"8" [label="Taller de Sistemas de Información.NET"];
"13" [label="Álgebra Lineal I"];
"1" -- "2";
"2" -- "3";
"3" -- "4";
```