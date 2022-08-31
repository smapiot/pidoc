---
title: React
description: Information about the React generator.
audience: Everyone
level: Beginner
section: Generators
---

# React Generator

The Markdown generator transforms single JSX files with a `default` export (called the page content component) into documentation pages.

(tbd)

Let's say you have a folder structure like this:

```plain
docs/
docs/foo/content.jsx
docs.config.json
```

A sitemap section in *docs.config.json* to cover this would be:

```json
{
  // ...
  "sitemap": {
    "example": {
      "title": "Example",
      "sections": [
        {
          "generator": "react",
          "segment": "",
          "dir": "foo"
        }
      ]
    }
  }
}
```

This will look up the *.jsx* and *.tsx* files in the `foo` directory below the `docs` documentation root directory.
