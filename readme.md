# Pokemon Viewer - A simple Pokemon viewer

This is a simple Pokemon viewer that uses the [PokeAPI](https://pokeapi.co/) to display information about Pokemon.

## Stage Description

### Stage 1 - Redux State
  The first stage of this project is to demonstrate using Javascript and Redux.
  This is how state is currently managed in some applications.
  
  This is a straightforward implementation of Redux, with no additional libraries.
  The state is managed in a single store, and the components are connected to the store
  using the `connect` function from `react-redux`.

  There is only one reducer in this project, and it is responsible for managing the state
  of the entire application.

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone
cd pokemon-viewer
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### `npm run start`

Alias for `npm run dev`

### `npm run lint`

Runs the linter on the project.

### `npm run bootstrap`

Bootstraps the project by installing dependencies of packages. This will automatically be run when you run `npm install`.

### `npm run downloadApi`

Downloads the PokeAPI and saves it in this project. This will automatically be run when you run `npm install`.

### `npm run generateApi`

Generates the API from the downloaded PokeAPI. This will automatically be run when you run `npm install`.

### `npm run setup`

Alias for `npm run bootstrap && npm run downloadApi && npm run generateApi`. This will automatically be run when you run `npm install`.