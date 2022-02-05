---
title: Front Matter
description: Presenting meta information in Markdown documents.
audience: Everyone
level: Beginner
section: Markdown
---

# Markdown Front Matter

You can (and should) put so-called front matter at the beginning of each document. For instance, the front matter of this document looks like:

```md
---
title: Front Matter
description: Presenting meta information in Markdown documents.
audience: Everyone
level: Beginner
section: Markdown
---
```

Most parts are not really used right now, but you could always add custom parts that show these (e.g., a little indicator next to each documentation page reflecting the level of the content).

In the end, the front matter is processed by the generator. In case of the markdown generator the following parts have special meaning:

- `title` used as title (i.e., label) in the navigation
- `section` used to put the document in the right category within the navigation
