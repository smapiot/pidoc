[![Build Status](https://github.com/smapiot/piral-docs-tools/actions/workflows/node.js.yml/badge.svg)](https://github.com/smapiot/piral-docs-tools/actions)
[![npm](https://img.shields.io/npm/v/piral-docs-tools.svg)](https://www.npmjs.com/package/piral-docs-tools)
[![node](https://img.shields.io/node/v/piral-docs-tools.svg)](https://www.npmjs.com/package/piral-docs-tools)
[![GitHub tag](https://img.shields.io/github/tag/smapiot/piral-docs-tools.svg)](https://github.com/smapiot/piral-docs-tools/releases)
[![GitHub issues](https://img.shields.io/github/issues/smapiot/piral-docs-tools.svg)](https://github.com/smapiot/piral-docs-tools/issues)

# [`piral-docs-tools`](https://docs.piral.io) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral-docs-tools/blob/main/LICENSE)

The tools for making the documentation page of the Piral project. You can find it at [docs.piral.io](https://docs.piral.io).

## Installation

You can add the tool by installing it via NPM:

```sh
npm i piral-docs-tool --save-dev
```

A couple of peer dependencies also need to be resolved. If can install all peer dependencies using:

```sh
npm i piral-core piral-cli piral-cli-parcel react react-dom react-router-dom --save-dev
```

## Configuration

Place a file called *docs.config.json* in the project folder where `piral-docs` is being run. It should be adjacent to the *package.json*.

```json
{
  "title": "Doc Title",
  "description": "The description for the documentation.",
  "author": "your-orga",
  "branch": "main",
  "repositoryUrl": "https://github.com/your-orga/your-repo",
  "rootDir": ".",
  "outputDir": "./dist/docs",
  "changelogFile": "./CHANGELOG.md",
  "components": {
    "logo": "./src/Logo.tsx",
    "footer": "./src/Footer.tsx",
    "notFoundPage": "./src/NotFoundPage.tsx"
  },
  "pages": {
    "/imprint": "./src/ImprintPage.tsx"
  },
  "helpers": {
    "filter": "./src/filter.ts"
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

## Commands

### Building

A documentation page can be built using

```sh
piral-docs build
```

### Watching

A documentation page can be watched using

```sh
piral-docs watch
```

## Sitemap Structure

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

## License

Thest tools are released using the MIT license. For more information see the [license file](./LICENSE).
