---
title: Custom
description: Information about providing a custom generator.
audience: Everyone
level: Beginner
section: Generators
---

# Custom Generators

A custom generator transforms files according to your rules and logic. This can be used to teach pidoc about a new file type (e.g., transforming ASCIIDoc or similar).

(tbd)

Let's say you have a folder structure like this:

```plain
docs/
docs/foo/content.ascii
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
          "generator": "custom",
          "path": "/path/to/custom/generator.js",
          "segment": "",
          "dir": "foo"
        }
      ]
    }
  }
}
```

This will look up the *.ascii* files in the `foo` directory below the `docs` documentation root directory.

::: tip: Use packages
Custom generators can also be deployed in npm packages. In this case you can reference them via their package name, e.g.:

```json
{
  // ...
  "sitemap": {
    "example": {
      "title": "Example",
      "sections": [
        {
          "generator": "custom",
          "path": "name-of-custom-generator-package",
          "segment": "",
          "dir": "foo"
        }
      ]
    }
  }
}
```

where `name-of-custom-generator-package` is the name of the package.
:::
