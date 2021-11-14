---
title: Features
description: Available features of the markdown processing.
audience: Everyone
level: Beginner
section: Markdown
---

# Markdown Features

To support your documentation in all possible ways the Markdown converter is quite feature rich.

## Basic Features

The basic features that you know are all in. For instance, unsorted lists:

- Just some bullet point
- Another bullet point

```md
- Just some bullet point
- Another bullet point
```

Also sorted lists are included:

1. First
2. Second
3. Third

```md
1. First
2. Second
3. Third
```

Writing something in **bold** or *italic* is possible, too.

```md
Writing something in **bold** or *italic* is possible, too.
```

If you want to make something "sub"-par you use `~` to enclose the text, likewise if you want to make it stand out ("super") you'd use `^` to enclose the text.

- H~2~0
- 29^th^

```md
- H~2~0
- 29^th^
```

You should have only one (1) top-level heading ("h1", `#`) and multiple (n) second-level headings ("h2", or `##` in Markdown).

```md
# Markdown Features

To support your documentation in all possible ways the Markdown converter is quite feature rich.

## Basic Features
```

Code blocks are also supported. Just have three ticks and there you go.

````md
```js
console.log('Hello, World!');
```
````

Note that a language can be given after the three ticks. For syntax highlighting the Highlight.js package is used. The code above would display like:
```js
console.log('Hello, World!');
```

Tables are possible, too:

| First | Second | Third | Fourth | Fifth |
|-------|--------|-------|--------|-------|
| 1     | 2      | 3     | 4      | 5     |
| 6     | 7      | 8     | 9      | 10    |
| 11    | 12     | 13    | 14     | 15    |

The code for this table is shown below:

```md
| First | Second | Third | Fourth | Fifth |
|-------|--------|-------|--------|-------|
| 1     | 2      | 3     | 4      | 5     |
| 6     | 7      | 8     | 9      | 10    |
| 11    | 12     | 13    | 14     | 15    |
```

Finally, you can put images to work with them automatically being bundled correctly.

![Some image description](../assets/sample.png)

Here's the code (note the relative file path):

```md
![Some image description](../assets/sample.png)
```

## Advanced Features

Emojis are also support :zap:! This can boost your productivity :rocket:.

```md
Emojis are also support :zap:! This can boost your productivity :rocket:.
```

If you need foot notes then you got them[^1].

[^1]: This is a foot note.

```md
If you need foot notes then you got them[^1].

[^1]: This is a foot note.
```

Similarly, abbreviations may come in handy. Let's see an example:

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

The HTML specification is maintained by the W3C.

The code for this snippet reads:

```md
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

The HTML specification is maintained by the W3C.
```

Another thing to make use is smart arrows. If you want to point out things you may use --> arrows. Any any case <-- they should look good, right?

```md
... use --> arrows. Any any case <-- ...
```

We have six of them:

- `-->`: -->
- `<--`: <--
- `<-->`: <-->
- `==>`: ==>
- `<==`: <==
- `<==>`: <==>

Sometimes, a simple list is not enough. It should be a todo-style list:

- [ ] Apples
- [x] Bananas
- [ ] Cucumbers

```md
- [ ] Apples
- [x] Bananas
- [ ] Cucumbers
```

If you want to display a video then you'll find the video integration useful.

@[youtube](dQw4w9WgXcQ)

Don't get Rick-rolled. Here's the code:

```md
@[youtube](dQw4w9WgXcQ)
```

There are a couple of qualifiers:

- `youtube`
- `vimeo`
- `vine`
- `osf`
- `prezi`

You can also include some content. Below is some text:

#include ../assets/foo.txt

This text was inserted from some other file. The code for the line above was:

```md
#\include ../assets/foo.txt
```
