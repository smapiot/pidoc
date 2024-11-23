---
title: HTML
description: Information about the HTML generator.
audience: Everyone
level: Beginner
section: Generators
---

# HTML Generator

The Markdown generator transforms single HTML files into documentation pages.

Importantly, for the meta information you need to use a comment like shown below:

```html
<!--
title: Example
description: ...
section: Tools
-->
<h1>Hello World!
<p>Text here</p>
```

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
