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
- We often find that their performance is quite similar
- This makes sense, the compiled code ends up looking almost identical

What happens if you follow every step in this talk, you profile your code, and it's still 80% a nice NumPy/Numba function?
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

We've been running optimised machine code, but only **serial code**:
- **Serial** execution = perform each instruction **one after another**
- Basically, 1 CPU core has been doing all the work!

Modern CPUs will have more than 1 core:
- My laptop has 10 cores, most have at least 4
- This is before we even mention the "GPU" word
- If the power is there, why not use it? 

That's where **parallel computing** comes in:
- **Parallel** execution = perform instructions **at the same time**
- Instead of 1 core doing all the work, you distribute it!

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
- JIT compiling functions with `@jit(parallel=True)`
- Using `@vectorize(target="parallel")` or even `@vectorize(target="cuda")`
- Writing your own GPU kernels with Numba's CUDA support
  - This is really cool, and the only way you can write CUDA kernels in **pure python**
  - Sadly, we won't have time to get into this today

But that doesn't mean we can't have some fun!

---
layout: side-title
color: indigo
---

:: title ::

## **Let's parallelise some Python!**

:: content ::

<img src="../images/parallel-flextape.jpg" width="80%" />

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## JIT-ing Our First Function With parallel=True

:: left ::

### Nice, NumPy Vectorized Code

```python
def np_sin2(x):
    return np.sin(x)**2
```

**71.2ms**

<br>

### Serial JIT Version

```python
np_sin2_jit = jit()(np_sin2)
```

**76.4ms** (very similar)


:: right ::

Numba is able to parallelise a lot of NumPy's array operations, ufuncs, and other functions

It's as simple as adding the `parallel=True` flag

### Parallel JIT Version

```python
np_sin2_jit = jit(parallel=True)(np_sin2)
```

**22.6ms**

That's about a **3x Speedup**, once again for minimal effort!

<br>

<SpeechBubble position="r" color="sky" shape="round" maxWidth="100%">

**If** your data is big enough, parallelising NumPy code is **one of the few good reasons to JIT compile it**

</SpeechBubble>

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Numba pranges - Your Own Parallel For Loops!

:: left ::

### Naive Python For Loop

:: right ::

### Numba Parallel `prange`

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Caution - Numba Can't Save You From Race Conditions!

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Our Very Own ufunc - Now Faster!

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Monte Carlo Pi Revisited: A New Champion

---
layout: top-title-two-cols
color: indigo
columns: is-7
---

:: title ::

## Monte Carlo Pi: Performance Deep Dive

:: left ::

### Speedup Over Plain NumPy:

<img src="../images/mc_pi_bench_placeholder.png" />

Below the dotted line is a slow down from NumPy!

:: right ::

Some observations:

- **Problem size matters, always measure!**
- Simple `@jit` is the winner for small problems but loses for large problems
- `parallel=True` starts slow (thread overheads), but wins for large problems
- Very interesting, `parallel=True` with 1 thread always beats NumPy and simple `@jit`

Why is parallel with 1 thread different to a normal `@jit`?

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Numba's Parallel Optimisations - Loop Fusion Is Back!

---
layout: top-title-two-cols
color: indigo
---

:: title ::

## Final Comments On Performance and Safety

---
layout: side-title
color: indigo
---

:: title ::

## Section Summary

:: content ::

In this section we have learnt:

<!-- Need to write some slides on race conditions/the theory behind parallel computing/words of warning, basically -->
<!---->
<!-- This will include a recommendation to basically not use parallel unless the situation really calls for it -->
<!---->
<!-- I will also recommend using NumPy vector functions and letting Numba parallelise that over pranges, if you're not super familiar with parallelism -->
