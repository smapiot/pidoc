---
title: HTML
description: Information about the HTML generator.
audience: Everyone
level: Beginner
section: Generators
---

# HTML Generator

The Markdown generator transforms single HTML files into documentation pages.

(tbd)

Let's say you have a folder structure like this:

```plain
docs/
docs/foo/content.html
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
          "generator": "html",
          "segment": "",
          "dir": "foo"
        }
      ]
    }
  }
}
```

This will look up the *.html* files in the `foo` directory below the `docs` documentation root directory.
