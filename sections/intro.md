---
layout: top-title
color: sky
---

:: title ::

## Python, a programmer's best friend

:: content ::

<v-click>

Python is **extremely** popular, and for good reason:

</v-click>

<v-clicks>

- Clean, readable syntax
- Libraries for everything you can imagine (especially maths and data science)
- **Easy** to write
- Stupidly **fast** to develop in

</v-clicks>

<br>
<v-click>

But, Python isn't perfect...

</v-click>

---
layout: side-title
color: sky
---

:: title ::

## "Fast" and "Python" don't often go together...

:: content ::

<img src="../images/waiting-meme.jpg">

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

## Speed or Ease: A Scientist's Wager

:: left ::

<v-click>

**Door 1: Python**

- Extremely fast development
- Slow run times
- Probably not suitable for high performance use cases

</v-click>

:: right ::

<v-click>

**Door 2: Compiled Languages (C/C++, Fortran, Rust)**

- Longer development times
- Lightning speed
- The usual choice where performance matters

</v-click>

:: default ::

<v-click>

### Are we always caught in this battle between dev time and run time?

<br>

</v-click>

<v-click>

### Surely there must be a better way!

</v-click>

---
layout: side-title
color: sky
---

:: title ::


## You can have your cake and eat it too!

:: content ::

<img src="../images/python-not-slow.jpg" width="90%">


---
layout: top-title
color: sky
---

:: title ::

## The Bad News: Pure Python is Kind of Slow

:: content ::

<v-click>

Let's rip the band-aid:

</v-click>

<v-clicks>

- Most "language benchmarks" are sketchy at best (even the ones I'll show you today)
- But they don't find Python in last place for no reason
- **Pure Python**, with the **default interpreter** (CPython), is **typically** slower than compiled languages like C++ and Rust
- In particular, **pure Python** can be quite slow for:
  - Large or nested loops
  - Heavy numerical workloads

</v-clicks>

<br>

<v-click>

### Be honest, we've all sat waiting for a Python script at least once

</v-click>

:: right ::

---
layout: top-title-two-cols
color: sky
---

:: title ::

## The Good News: You Can Run Fast, Compiled Code Without Writing a Line of C/C++/Fortran

:: left ::

<v-clicks>

We don't have to rewrite our code in C/C++/Fortran!

Python offers two great options for fast, compiled code:

</v-clicks>

<v-clicks>

- Use Python as a **glue** for the **fast, compiled** code other people have written
  - See: **NumPy**, SciPy, and all the ML libs
- Or actually compile your own Python into lightning fast machine code!
  - See: PyPy, Cython, and **Numba**

</v-clicks>

<v-click>

**Today, we'll learn how to make the most of both!**

</v-click>

:: right ::

<v-click at=3>

<img src="../images/AI_libs_transparent.png"/>

</v-click>

<br>

<v-click at=4>

<img src="../images/numba-blue-horizontal-rgb.svg" />

</v-click>

---
layout: top-title-two-cols
color: sky
---

:: title ::

## Today's Goal: Small Changes, Big Gains

:: left ::

<v-click>

```python

def slow_python(array):
  for i in range(len(array)):
    array[i] += 5
```

### 1.23s

</v-click>

<br>


:: right ::

<v-click>

```python
@jit(parallel=True)
def fast_numba(array):
  for i in numba.prange(len(array)):
    array[i] += 5
```

### 3.24ms

</v-click>

<br>

<v-click at=2>

<img src="../images/numba-blue-horizontal-rgb.svg">

</v-click>

:: default ::

<v-click at=3>

## You're not dreaming, that's ~380x speedup for zero effort*

*For this ideal toy example :)

</v-click>

---
layout: side-title
color: sky
hideInToc: true
---

:: title ::

# Our Road Map to Lightning Fast Python:

:: content ::

<Toc minDepth="1" maxDepth="1" />

