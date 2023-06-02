---
title: Configuration
description: Details on the configuration.
audience: Everyone
level: Beginner
section: Getting Started
---

# Configuration

The main piece for running `pidoc` is the *docs.config.json* file. It should be placed in your main directory, where you'd run `piral-docs` (the command line utility for debugging and building the documentation).

## Example Configuration

Below you'll find an example configuration. Feel free to use this as a boilerplate.

```json
{
  "title": "Your title",
  "description": "Description for metadata.",
  "author": "Your name",
  "branch": "main",
  "repositoryUrl": "https://github.com/your-orga/your-repo",
  "docsDirName": "docs",
  "rootDir": ".",
  "outputDir": "./dist",
  "skipEditLabel": false,
  "sitemap": {
    "basics": {
      "title": "Basics",
      "sections": [
        {
          "generator": "markdown",
          "segment": "",
          "dir": "basics"
        }
      ]
    }
  }
}
```

This configuration ends up with a single top-level section (called "chapter") named "basis" (written on the page as "Basics"). It contains the content from a single section - everything in `docs/basics` will be consumed by the `markdown` generator. This is the most "standard" (or from a documentation-perspective "expected") generator. It is capable of transforming Markdown files (`*.md`) to pages.

More about generators can be found in the [generators section](../generators/01-overview.md).

For more knowledge about the supported Markdown dialect look at [the basic features](./03-markdown.md#basic-features).

## Configuration Typings

The configuration is also fully typed. You'll find it exported from the types of `@pidoc/core` (name `PiralDocsFullConfig`).

## Advanced Scenarios

(tbd)
