# Pokemon Viewer - A simple Pokemon viewer

This is a simple Pokemon viewer that uses the [PokeAPI](https://pokeapi.co/) to display information about Pokemon.
The goal of this project is to demonstrate different ways of state management in React.
This project is broken down into different stages, each stage is a branch in this repository. The branches are named after the stage they are in. The main branch is the final stage of the project and is a combination of stages 3-5 to show the differences. Each stage will have a section in the readme that explains the changes made in that stage.

## Stage Description 

### Stage 5 - Using React Query
  The fifth stage of this project is to demonstrate using React Query.
  This stage will use React Query to manage state.
  React query provides standard hooks to use in components to show loading, error, and data states. It also provides a way to prefetch data and cache it for later use. React Query provides a way to use the cache to update the UI without making a request to the server. This is useful for optimistic updates.
  This stage differs from the previous stages in that data that was previously loaded will persist. We can use this cached data as a data store. By default, React Query takes a query key and a fetching function. The result of the fetching function is cached to the query key. This means that if we have a query key for a Pokemon, we can use that query key to get the Pokemon from the cache. Any time we use that query key, we will get the cached data. If the cached data is updated then any components that use that query key will be updated with the new data.

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