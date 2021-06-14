# painite

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contribution
### Committing

Requires that all commits are made using [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

There are multiple ways to adhere to this requirement. Choose the one that best suites your workflow:

#### 1. Commitizen

A [CLI Tool](https://github.com/commitizen/cz-cli) that asks a list of pre-defined questions to work out the commit message.

Running `yarn git-cz` or `npx git-cz` will start the CLI tool (make sure to stage your changes first). Simply answer the questions and `commitizen` will automatically generate a commit message that is correctly formatted.

#### 2. Manually

Create commit using your tool of choice (Emacs, CLI, GitKracken, SourceTree). Commits must follow the format [outlined here](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message).

**Note:**
When creating commit messages manually, there is a pre-commit hook that will validate you have used the right format. However, the onus falls on you to ensure that you have correctly identified the change e.g. `feat:`, `fix:`, `chore:` etc.