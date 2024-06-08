<div align="center">

<img src="./src/assets/images/autoexpert-logo.webp" alt="autoexpert" width="100"/>

# Autoexpert

Car aggregation service with reviews

</div>

---

## Stack

- Vite
- Typescript
- React 18
- axios
- react-router-dom
- styled-components

## Config app

An example of the config is in `.env.example`, but to use it you need to create `.env`

Integration of the config from `.env` into javascript variables and all constants are in
`./src/shared/constants.ts`

## Production mode

### By docker

<strong> Warning: don't forget to create `.env` </strong>

```sh
docker build -t autoexpert-frontend-app .
```

Run build container

```sh
docker run --name autoexpert-frontend-app --restart=always -d -p 80:80 autoexpert-frontend-app
```

### By package manage (don't recommended)

_Check installation part_

```sh
pn build
pn serve
```

## Dev mode & installation

### Via system

1. [`git`](https://git-scm.com/)
2. [`Node.js`](https://nodejs.org/)
3. [`pnpm`](https://pnpm.io/installation)
4. Install all dependencies `package.json`

**Warning**: before use `pn` command, need to read alias in `.bashrc` or `alias.bat`, also instead `pn` can
called `pnpm`

Terminal

```sh
source .bashrc
```

Cmd

```sh
alias.bat
```

Install all dependencies

```sh
cd autoexpert-frontend
pn i
```

Run `pn dev`
