---
title: Fences
description: How to apply markdown fences correctly.
audience: Everyone
level: Beginner
section: Markdown
---

# Markdown Fences

Every documentation has special needs. For bringing up special remarks and comments *fences* exist. They are always enclosed in `:::`.

## Types of Fences

### Tips

Tips look as below.

::: tip: Title
This is the tip itself.
:::

The code for the section above looks like this:

```md
::: tip: Title
This is the tip itself.
:::
```

### Warnings

Warnings look as below.

::: warning: Title
This is the warning itself.
:::

The code for the section above looks like this:

```md
::: warning: Title
This is the warning itself.
:::
```

### Failures

Failures look as below.

::: failure: Title
This is the failure itself.
:::

The code for the section above looks like this:

```md
::: failure: Title
This is the failure itself.
:::
```

### Successes

Successes look as below.

::: success: Title
This is the success itself.
:::

The code for the section above looks like this:

```md
::: success: Title
This is the success itself.
:::
```

### Questions

Questions look as below.

::: question: Title
This is the question itself.
:::

The code for the section above looks like this:

```md
::: question: Title
This is the question itself.
:::
```

### Summaries

Summaries look as below. In contrast to other fences they are collapsible.

::: summary: Title
This is the summary itself.
:::

The code for the section above looks like this:

```md
::: summary: Title
This is the summary itself.
:::
```

::: Generic

Besides the given fences you are also able to use generic fences, i.e., just some `<div>`.

Take for instance the following code:

```md
::: #warning
*here be dragons*
:::
```

this results in

```html
<div id="warning">
<em>here be dragons</em>
</div>
```

As seen here:

::: #warning
*here be dragons*
:::

More details on [generic fences here](https://www.npmjs.com/package/markdown-it-div).
