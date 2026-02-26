---
layout: top-title
color: sky
---

:: title ::

## Python, a programmer's best friend

:: content ::

Python is one of the most popular languages in the world, and for good reason:

<v-clicks>

- Simple, readable syntax
- Low barrier of entry
- Fast to develop in and prototype
- Extensive library support (especially for data analysis/scientific applications)
- Easy to share and distribute code across platforms

</v-clicks>

<br>
<v-click>

What more could a programmer ask for?

</v-click>

---
layout: side-title
color: sky
---

:: title ::

## Well, if you've ever found yourself in this position

<br>

## You might want to ask for speed...

:: content ::

<img src="../images/waiting-meme.jpg">

---
layout: quote
color: sky
author: "Lots of people on the internet"
---

## "Python is slow, you should use a real language like C++ or Rust"

---
layout: top-title-two-cols
color: sky
---

:: title ::

## The "Python is Slow" Dogma

:: left ::

<v-click>
You've seen the memes:

<div class="grid grid-cols-2 gap-4">
<div class="grid grid-rows-2 gap-4">
  <img src="../images/pam-office-python-slow.jpg" />
  <img src="../images/python-sloth.jpg" />
</div>
  <img src="../images/python-slow-cry.jpg" />
</div>
</v-click>

:: right ::

<v-click>

And the benchmarks:

<img src="../images/python-bench-log.jpg" />

</v-click>

<br>

<v-click>

And plenty of articles, comments, opinions...

</v-click>

<!-- <Tweet id="1861072804239847914" /> -->

---
layout: top-title-two-cols
color: sky
---

:: title ::

## The Internet's Model of Programming

:: left ::

**Python:**

<v-click>

- Slow
- For new/un-serious programmers
- Only suitable as a "scripting language"
- Not suitable when performance matters

</v-click>

<br>

<v-click at=3>

Surely there must be a better way...

</v-click>

:: right ::

**Compiled Languages (C/C++, Fortran, Rust):**

<v-click>

- Fast
- For experienced/serious programmers
- The only valid choice for "real programs"
- The greatest thing to happen to the universe

</v-click>

---
layout: side-title
color: sky
---

:: title ::


## I'm here to tell you that you can have your cake and eat it too

:: content ::

<img src="../images/python-not-slow.jpg" width="90%">


---
layout: top-title-two-cols
color: sky
---

:: title ::

## Small Changes, Big Performance Gain

:: left ::

<v-click hide>

```python

def slow_python(array):
  for i in range(len(array)):
    x[i] = x[i] + 5
```

</v-click>

<v-click>

```python {all|1,3}
@njit(parallel=True)
def fast_numba(array):
  for i in prange(len(array)):
    x[i] = x[i] + 5
```

</v-click>

:: right ::

<v-click at=2>

<img src="../images/numba-blue-horizontal-rgb.svg">

</v-click>

---
layout: side-title
color: sky
hideInToc: true
---

:: title ::

# By the end of these, we'll have learnt:

:: content ::

<Toc minDepth="1" maxDepth="1" />

