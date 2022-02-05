---
title: Overview
description: Information about the handling of content.
audience: Everyone
level: Beginner
section: Generators
---

# Generators Overview

A generator is either a script file or package that is capable of transforming an input document to a page within the documentation.

Generators are used to transform all kinds of content, e.g., Markdown documents, HTML pages, etc. to pages that are displayed in the documentation. The process is happening completely at build-time.

The signature of a generator module is as follows:

```ts
interface EntryDocument {
  name: string;
  file: string;
  route: string;
}

interface GeneratorOptions {
  segment: string;
  dir: string;
}

interface GeneratorBuildOptions extends GeneratorOptions {
  resolveLink: (page: string) => string;
}

interface GeneratorFindOptions extends GeneratorOptions {
  fileNames: Array<string>;
  exclude: string;
  include: string;
  sorting: 'asc' | 'dsc';
}

export function build(entry: EntryDocument, options: GeneratorBuildOptions): string;

export function find(basePath: string, docsFolder: string, options: GeneratorFindOptions): Array<EntryDocument>;
```

The `find` function will be used to filter across all documents that have been identified with a generic lookup. This way, the generator could also combine the documents into a single entry.

The `build` function will be used to get the content of a previously identified entry document.
