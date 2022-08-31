---
title: Markdown
description: Information about the Markdown generator.
audience: Everyone
level: Beginner
section: Generators
---

# Markdown Generator

The Markdown generator transforms single Markdown files into documentation pages. For this process `markdown-it` is used.

The following plugins are configured:

- `markdown-it-abbr`, to add abbreviations
- `markdown-it-anchor`, to allow named anchors
- `markdown-it-attrs`, to add custom attributes
- `markdown-it-div`, to have flexible container divs
- `markdown-it-emoji`, to be able to write emojis
- `markdown-it-footnote`, to write foot notes
- `markdown-it-front-matter`, to ignore / extract front matter
- `markdown-it-highlightjs`, for code highlighting
- `markdown-it-include`, for file content inclusions
- `markdown-it-container`, for dynamic fences
- `markdown-it-mark`, to include mark
- `markdown-it-task-checkbox`, for task-list-like checkboxes
- `markdown-it-replace-link`, to replace links with the correct URL
- `markdown-it-smartarrows`, to render nicer arrows
- `markdown-it-sub`, to support sub-level notations
- `markdown-it-sup`, to support super-level notations
- `markdown-it-video`, to include videos nicely

Most of the (supported / included) Markdown features are describes in the [Markdown section](../basics/03-markdown.md).

The Markdown generator is pretty much the default generator as most content will most likely be written using Markdown. Let's say you have a folder structure like this:

```plain
docs/
docs/foo/content.md
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
          "generator": "markdown",
          "segment": "",
          "dir": "foo"
        }
      ]
    }
  }
}
```

This will look up the *.md* files in the `foo` directory below the `docs` documentation root directory.
