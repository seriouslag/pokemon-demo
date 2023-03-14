# Pokémon Viewer - A simple Pokémon viewer

This is a simple Pokémon viewer that uses the [PokéAPI](https://pokeapi.co/) to display information about Pokémon.
The goal of this project is to demonstrate different ways of state management in React.
This project is broken down into different stages, each stage is a branch in this repository. The branches are named after the stage they are in. The main branch is the final stage of the project and is a combination of stages 3-5 to show the differences. Each stage will have a section in the readme that explains the changes made in that stage.

## Stages description

### Stage 2 - TypeScript
  The second stage of this project is to demonstrate the combined use of TypeScript and Redux.
  No functional changes have been made to the project, only the code has been converted to TypeScript.
  With TypeScript we now have type safety and can use interfaces to define the shape of our data.
  This makes it easier to refactor and change the code.
  Types are propagated through the application, so we can see what data is available at any point in the application (this is from the API level to the UI component level).

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

Runs the app in development mode.

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

Bootstraps the project by installing dependencies of packages. This will automatically run when you run `npm install`.

### `npm run downloadApi`

Downloads the PokéAPI and saves it in this project. This will automatically run when you run `npm install`.

### `npm run generateApi`

Generates the API from the downloaded PokéAPI. This will automatically run when you run `npm install`.

### `npm run setup`

Alias for `npm run bootstrap && npm run downloadApi && npm run generateApi`. This will automatically run when you run `npm install`.