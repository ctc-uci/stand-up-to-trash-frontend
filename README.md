# npo-frontend-template

This template will be used to create all NPO frontend repos

## Setting up development environment

To start working on with this project, follow these steps:
1. Install the [EditorConfig plugin](https://editorconfig.org/#download) for your IDE.
1. Add the `.env` file stored in your projects Google Drive folder to the root of the project.
1. Install NodeJS and yarn following the [instructions here](https://classic.yarnpkg.com/lang/en/docs/install).
1. Navigate to the project folder in your terminal and run `yarn` to install required packages.

## Project branching structure

Due to complications with some of the GitHub Actions this project uses, the git branch structure is non-standard.

1. `dev`: This is the main branch of the project. All PRs should be merged into this branch, as if it was "main".
1. `main`: This is the "production-ready" branch of the project; `dev` should only be merged into `main` when it is at a presentable state.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn storybook`

Runs Storybook.\
Open [http://localhost:6006/](http://localhost:6006) to view it in the browser.

### `yarn format`

Formats `.js`, `.jsx`, `.css` files with Prettier.\
See the [Prettier docs](https://prettier.io/docs/en/index.html) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Storybook

This project has Storybook installed to help build UI components and pages in isolation. Read more about Storybook [here](https://storybook.js.org/).

## ESLint and Prettier

This project uses ESLint and Prettier to enforce the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### ESLint Plugins

Currently, the following ESLint plugins are installed:
1. [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
1. [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

Visit the links to learn more about each plugin.

### Configuration

The configuration for ESLint is inside the `.eslintrc.json` file, located in the root of the project. Learn more about ESLint [here](https://eslint.org/).

The configuration for Prettier is inside the `.prettierrc` file, located in the root of the project. Learn more about Prettier [here](https://prettier.io/docs/en/index.html).

## Husky and lint-staged

This project uses lint-staged and husky to run ESLint checks before all commits.

### Skipping pre-commit checks

Use the `--no-verify` option to skip pre-commit checks, but please note that this is **strongly discouraged**. 

### Configuration

The configuration for lint-staged is inside the `lint-staged` object inside of `package.json`. Learn more about lint-staged [here](https://github.com/okonet/lint-staged).

The configuration for husky is in the `.husky` directory, located in the root of the project. Learn more about husky [here](https://typicode.github.io/husky/).

## Learn More about Create React App and React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).