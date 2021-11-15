[![Build Status](https://github.com/smapiot/pidoc/actions/workflows/node.js.yml/badge.svg)](https://github.com/smapiot/pidoc/actions)
[![npm](https://img.shields.io/npm/v/piral-docs-tools.svg)](https://www.npmjs.com/package/piral-docs-tools)
[![node](https://img.shields.io/node/v/piral-docs-tools.svg)](https://www.npmjs.com/package/piral-docs-tools)
[![GitHub tag](https://img.shields.io/github/tag/smapiot/pidoc.svg)](https://github.com/smapiot/pidoc/releases)
[![GitHub issues](https://img.shields.io/github/issues/smapiot/pidoc.svg)](https://github.com/smapiot/pidoc/issues)

# [`pidoc`](https://docs.piral.io) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/pidoc/blob/main/LICENSE)

A collection of tools and utiltiies for making a documentation page using Piral (and more). Examples using `pidoc`:

- [pidoc.js.org](https://pidoc.js.org)
- [docs.piral.io](https://docs.piral.io)
- [docs.piral.cloud](https://docs.piral.cloud)
- [anglesharp.github.io](https://anglesharp.github.io)

A full documentation of this can be found [here](./packages/example-app/docs) or [online as a website already using pidoc](https://pidoc.js.org).

## Using the `pidoc` Application

This is best-suited if you just want to bring some documentation to a dynamic website.

(tbd)

### Configuration

Place a file called *docs.config.json* in the project folder where `pidoc` is being run. It should be adjacent to the *package.json*.

```json
{
  "title": "Doc Title",
  "description": "The description for the documentation.",
  "author": "your-orga",
  "branch": "main",
  "repositoryUrl": "https://github.com/your-orga/your-repo",
  "rootDir": ".",
  "outputDir": "./dist/docs",
  "skipEditLabel": false,
  "changelogFile": "./CHANGELOG.md",
  "sass": {
    "variables": "./src/global.scss"
  },
  "styles": [
    "./src/styles.css"
  ],
  "components": {
    "logo": "./src/Logo.tsx",
    "infoBar": "./src/InfoBar.tsx",
    "breadcrumbs": "./src/Breadcrumbs.tsx",
    "footer": "./src/Footer.tsx",
    "header": "./src/Header.tsx",
    "notFoundPage": "./src/NotFoundPage.tsx"
  },
  "pages": {
    "/imprint": "./src/ImprintPage.tsx"
  },
  "helpers": {
    "setup": "./src/setup.ts",
    "filter": "./src/filter.ts",
    "plugins": "./src/piralPlugins.ts",
    "requestPilets": "./src/requestPilets.ts"
  },
  "redirects": {
    "/": "/chapterName"
  },
  "sitemap": {
    "chapterName": {
      "title": "Chapter 1",
      "sections": []
    }
  }
}
```

### Commands

These commands are available when using the `pidoc` library.

#### Building

A documentation page can be built using

```sh
pidoc build
```

#### Watching

A documentation page can be watched using

```sh
pidoc watch
```

#### Emulator

An emulator package can be built using

```sh
pidoc sdk
```

### Sitemap Structure

The structure of a sitemap is as follows:

```ts
interface SingleSection {
  title: string;
  links: SitemapItem | Array<SitemapItem>;
}

type GenerateContent = CustomGenerator | StandardGenerator;

interface StandardGenerator {
  generator: 'markdown' | 'types';
  segment: string;
  dir: string;
  exclude?: string;
  include?: string;
}

interface CustomGenerator {
  generator: 'custom';
  path: string;
}

type SitemapItem = GenerateContent | SingleSection;

interface Sitemap {
  [chapterName: string]: {
    title: string;
    sections: Array<SitemapItem>;
  };
}
```

## Using the `@pidoc/core` Library

This is best-suited if you already have a project using `piral` (or other libraries like `piral-core`). For more information on Piral visit the [GitHub repository](https://github.com/smapiot/piral) or the official [homepage](https://piral.io).

### Installation

You can add the tool by installing it via NPM:

```sh
npm i @pidoc/core --save-dev
```

A couple of peer dependencies also need to be resolved. If can install all peer dependencies using:

```sh
npm i piral-core piral-cli piral-cli-webpack5 react react-dom react-router-dom --save-dev
```

## License

`pidoc` is released using the MIT license. For more information see the [license file](./LICENSE).
