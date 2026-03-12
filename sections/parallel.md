---
layout: section
color: indigo
---

# Going Beyond JIT: Numba for Parallel Programming

---
layout: top-title-two-cols
color: indigo
columns: is-8
---

:: title ::

## What Do We Do When NumPy/Numba isn't enough?

:: left ::

So far, we've learnt how to optimise Python code with NumPy and Numba
- We often find that their performance is quite similar, since they ultimately compile into very similar code
- What happens if I profile my code, and its still 80% dominated by some beautiful NumPy code?
- Is it finally time to concede and break out the C++?

**Absolutely not!**

:: right ::

<img src="../images/break-glass-parallel.jpg" />

---
layout: top-title-two-cols
color: indigo
columns: is-8
---

:: title ::

## Parallel Computing, Our Saviour

:: left ::

So far, whilst we've been using nice optimised compiled code, everything has been running in serial:
- This just means that only one CPU core is doing all the work
- Since there's only once CPU core working, it's all done one after the other (serial)

The beauty of modern computers is that they often ship with multi-core CPUs:
- My laptop has 10 cores total, most will have at least 4 nowadays
- This is before we even mention the "GPU" word

If we've got all of this power just waiting to be used, why not take advantage of it?

:: right ::

<img src="../images/intel-i7.jpg" />

<img src="../images/nvidia-rtx.jpg" />

---
layout: top-title
color: indigo
---

:: title ::

## Numba and Parallel Computing

:: content ::

Numba was built with parallelism in mind, and provides a few ways you can go about it:
- JIT compiling functions with `@njit(parallel=True)`
- Using `@vectorize(target="parallel")` or even `@vectorize(target="cuda")`
- Writing your own GPU kernels with Numba's CUDA support
  - This is really cool, and the only way you can write CUDA kernels in **pure** python
  - Sadly, we won't have time to get into this today

So, let's learn how to take advantage of Numba's parallelism!

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## JIT-ing Our First Function With parallel=True

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Numba pranges

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Monte Carlo Pi Revisited: A New Champion

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Our Very Own ufunc - Now Faster!

---
layout: top-title
color: indigo
---

Need to write some slides on race conditions/the theory behind parallel computing/words of warning, basically

This will include a recommendation to basically not use parallel unless the situation really calls for it

I will also recommend using NumPy vector functions and letting Numba parallelise that over pranges, if you're not super familiar with parallelism
