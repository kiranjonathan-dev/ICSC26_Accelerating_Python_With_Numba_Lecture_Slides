---
layout: section
color: lime
---

# A Beginner's Guide to Optimisation

---
layout: top-title
color: lime
---

:: title ::

## Step 1: Set Performance Goals

:: content ::

Why are you optimising your code?
- To show off how fast it runs?
- Is it limiting your ability to do your job?
- Would speeding it up let you explore more of the problem?

Set a concrete target:
- ~~I want my code to run 300x faster~~
- I'd love this script to finish in 10 minutes
- Make sure your goal is achievable! Just because one ideal function can go 300x, doesn't mean your whole codebase can!

If you don't set targets up front, you'll never know when to stop!

---
layout: top-title
color: lime
---

:: title ::

## Step 2: Make Sure You've Got Tests

:: content ::

Correctness is always more important than speed:
- Fundamentally, you'll be changing lots of your code
- If you don't have a way to check it's still correct, you'll have a bad time
- Unit tests are ideal, but often not available in scientific scenarios
- At least put together some representative runs with known **good** inputs/outputs that you can compare to


<Admonition title="Info" color="amber-light" width="100%">
Remember! Floating point numbers aren't real, and optimisations may give slightly different, but still correct results.

Numpy has a great testing module, and the method `np.testing.assert_all_close` is a great way to check the correctness of your optimised code against your reference!
</Admonition>

---
layout: top-title
color: lime
---

:: title ::

## Step 3: Measure, Measure, Measure

:: content ::

I promise you that you will not correctly guess which part of your code is the slowest

The first practical step for benchmarking is profiling your code:
- Try to identify which functions/specific operations are taking up most of your run time
- Unit tests (if you have them) are a good starting point, but should **not** be your drop in performance tests
  - They usually have small inputs to run quickly, they will not show you your true hotspots!
- Make sure you use a decent profiler, for Python I can recommend:
  - CProfile (built in) with SnakeViz (pip install) to visualise profiling results
  - line_profiler (pip install)

<Admonition title="Prioritise!" color="amber-light" width="100%">
When using your profiler, check which functions/lines take up a majority of your runtime (by total time/percentage).

These are the ones you focus on! Speeding up the function that takes up 90% of your run time by 1.5x is WAY better than speeding up a function that takes up 5% of your runtime 100,000x
</Admonition>

---
layout: top-title
color: lime
---

:: title ::

## Step 4: Optimise the Hotspots

:: content ::

Once you know which parts of your code are eating up your runtime, start optimising (again, always start with what's taking up the most of your typical run!).

There are two key approaches:
- Identify algorithmic/datastructure improvements:
  - These are where the biggest saves come from, not from code optimisation!
  - e.g. moving from a naive sort to a bubble sort would be better than hyper-optimising your naive sort!
- Once you're confident you've got the algorithm, start working on the code:
  - See what parts of the code you can offload to optimised libraries like numpy, scipy, etc...
  - Try to optimise the rest by hand (cough, cough - Numba!)

---
layout: top-title
color: lime
---

:: title ::

## Step 5: Check if You're Finished!

:: content ::

After each function/major line optimisation, check two things:
- Is my code still correct?
 - Remember, `np.testing.assert_all_close` is your friend!
- Have I met my perfomance goal?
 - It's important to know when to stop!
 - Dimishing returns exist, at some point it's not worth more of your dev time

If you're not finished, profile your code again, identify the hotspots, and get back to it!

---
layout: top-title
color: lime
---

:: title ::

## So We've Got a Process, Now What?

:: content ::

So far, we've learnt:
- Why Python is slow (because it's a **dynamic, interpreted** language that favours readability)
- How we can go about identifying areas in need of optimisation, and what that process looks like

As this is the **CERN** Inverted School of Computing, I'm willing to bet most of your slow code is numerical in nature:
- Data anaylsis
- Simulations
- Heavy calculations

### So, let's cover two great ways to optimise numerical code!
