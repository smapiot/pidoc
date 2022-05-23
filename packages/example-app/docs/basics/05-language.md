---
title: Languages
description: Supporting multiple languages in the documentation.
audience: Everyone
level: Beginner
section: Getting Started
---

# Languages

Pidoc allows you to either just have a single (unnamed) language or have multiple (named) languages in your documentation.

To enable support for this feature a `language` field must be added to the *docs.config.json*. This one consists of a default language selection (`default`) and all the available languages (`selection`). The latter is an object mapping the language IDs to use against their names on the docs page.

Additionally, the given sections may then be translated, too. Instead of simple strings (which are still allowed) you can then use objects, mapping the language IDs to their translations for the title.

Quick example:

```json
{
  //...
  "language": {
    "default": "en",
    "selection": {
      "en": "English",
      "de": "Deutsch",
      "fr": "Français (beta)"
    }
  },
  "sitemap": {
    "basics": {
      "title": {
        "en": "Basics",
        "de": "Grundlagen",
        "fr": "Bases"
      },
      "sections": [
        {
          "generator": "markdown",
          "segment": "",
          "dir": "basics"
        },
        {
          "generator": "markdown",
          "segment": "",
          "dir": "generators"
        }
      ]
    },
    "customizing": {
      "title": {
        "en": "Customizing",
        "de": "Personalisieren",
        "fr": "Personnalisation"
      },
      "sections": [
        {
          "generator": "markdown",
          "segment": "",
          "dir": "customizing"
        }
      ]
    }
  }
}
```

The language support then queries subdirectories using the available language IDs. For instance, if the markdown generator is supposed to look in `docs/` for markdown files, then it would look in `docs/fr` for French translations of the found markdown files. The french translation page is then exactly like the English, but with all found replacements.

Using the described approach the documentation is always complete. It may not be fully translated, but it remains complete and is fully consumable in every given language.
