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
