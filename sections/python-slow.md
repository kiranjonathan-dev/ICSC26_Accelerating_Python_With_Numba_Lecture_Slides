---
layout: section
color: red
---

# Python IS Slow, But Yours Doesn't Have to Be!

---
layout: top-title
color: red
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
layout: quote
color: red
author: "Lots of people on the internet"
---

## "Python is slow, you should use a real language like C++ or Rust"

---
layout: top-title-two-cols
color: red
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

<!-- --- -->
<!-- layout: top-title-two-cols -->
<!-- color: red -->
<!-- --- -->
<!---->
<!-- :: title :: -->
<!---->
<!-- ## The Internet's Model of Programming -->
<!---->
<!-- :: left :: -->
<!---->
<!-- **Python:** -->
<!---->
<!-- <v-click> -->
<!---->
<!-- - Slow -->
<!-- - For new/un-serious programmers -->
<!-- - Only suitable as a "scripting language" -->
<!-- - Not suitable when performance matters -->
<!---->
<!-- </v-click> -->
<!---->
<!-- :: right :: -->
<!---->
<!-- **Compiled Languages (C/C++, Fortran, Rust):** -->
<!---->
<!-- <v-click> -->
<!---->
<!-- - Fast -->
<!-- - For experienced/serious programmers -->
<!-- - The only valid choice for "real programs" -->
<!-- - The greatest thing to happen to the universe -->
<!---->
<!-- </v-click> -->
<!---->
---
layout: side-title
color: red
---

:: title ::

## What do people online know?

<br>

## Isn't a tool only as good as its user?

:: content ::

<img src="../images/python-not-slow.jpg" width="90%">

---
layout: top-title
color: red
---

:: title ::

## The Bad News: Pure Python is Kind of Slow

:: content ::

Let's get this out of the way:

<v-clicks>

- Most "language benchmarks" are sketchy at best
- But they don't all find Python in last place for no reason
- **Pure Python**, with the **default interpreter** (CPython), is slower than languages like C++ and Rust
- In particular, **pure Python** can be quite slow for:
  - Large or nested loops
  - Heavy numerical workloads

</v-clicks>

<v-click>
Be honest, we've all sat waiting for a Python script at least once
</v-click>

<!-- - Most "language benchmarks" are sketchy at best, it's not really possible to compare the performance of languages -->
<!-- - Different languages have different strong-suits -->
<!-- - Benchmarks don't include development time -->
<!--   - 2 weeks dev time for 5 sec speed-up doesn't make sense -->

:: right ::

---
layout: side-title
color: red
---

:: title ::

## But how can this make sense?


:: content ::

If Python is slow, why is it the most popular language in the world for machine learning and artificial intelligence?

<img src="../images/Data_center_GettyImages-1480633240.webp"/>

(Read as: the most computationally expensive thing ever)

---
layout: top-title-two-cols
color: red
---

:: title ::

## The Good News: We Don't Really Need Pure Python

:: left ::

<v-clicks>

The super-power of Python is it's huge community of libraries, written in "fast" languages like Fortran and C/C++. Python simply acts as a user-friendly **glue language**

They let you:

</v-clicks>

<v-clicks>

- Have your computationally intensive operations be handled by highly-optimised compiled libraries
- Maintain the readability and dev speed of Python
- Benefit from decent performance without knowledge of the intimate details of performance engineering

</v-clicks>

<v-click>

**As long as you're using them properly!**

</v-click>

:: right ::

<v-click at=1>

<img src="../images/AI_libs_transparent.png"/>

</v-click>

<br>

<v-click>

<Admonition title="Your Time Matters!" color="amber-light" width="100%">
Trade-offs between your time and runtime are very real, a 5% speed-up isn't worth a 2x dev period!
</Admonition>

</v-click>

---
layout: top-title-two-cols
color: red
---

:: title ::

## The Great News: With Numba, You Can Even Compile Your Python!

:: left ::

:: right ::

<img src="../images/numba-blue-horizontal-rgb.svg">

---
layout: top-title-two-cols
color: red
---

:: title ::

## One Line, 30x Performance

:: left ::

```python

def slow_python(array):
  for i in range(len(array)):
    x[i] = x[i] + 5
```

:: right ::

```python
@njit(parallel=True)
def fast_numba(array):
  for i in prange(len(array)):
    x[i] = x[i] + 5
```

---
layout: side-title
color: red
---

:: title ::

## By the end of these lectures, you'll be writing Python that can put C++ to shame!

:: content ::


You'll learn:

<v-clicks>

- Some of the core principles of software optimisation
- The differences between languages like Python and C++, and why Python can be kind of slow
- How we can leverage libraries like Numpy and vectorisation to overcome that Python slowness
- How we can complement Numpy with JIT compilers like Numba
- How we can leverage Numba for easy parallelism, to go even faster

</v-clicks>
