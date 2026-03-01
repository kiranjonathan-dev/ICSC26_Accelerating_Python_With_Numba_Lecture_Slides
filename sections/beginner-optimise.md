---
layout: section
color: lime
---

# A Beginner's Guide to Optimising Python (Read As: Numpy is Your Best Friend)

---
layout: top-title
color: lime
---

:: title ::

## So, Python's Slow - How Do I Go Faster?

:: content ::

To optimise code in any language, there a few core principles:

1. Benchmark, benchmark, benchmark
 - There's no point optimising the fastest section of your code, the first thing you have to do is identify which sections/functions/etc... are slowing things down
 - timeit and CProfile are useful built-in starting points for benchmarking 
2. Always check if you can do less work
 - Poorly chosen algorithms/data structures are almost always the cause of slow code, not the specific way the algorithm has been coded
3. Once you've settled on your approach, see how you can optimise the code itself
 - This should always be your last resort

---
layout: top-title-two-cols
color: lime
---

:: title ::

## The Golden Rule For Optimising Scientific Code: Use Numpy

:: left ::

Need to include:

The advantage of numpy arrays (typed, continous in memory, etc...)

Numpy's ufuncs/vector operations

Some benchmarks showing the speed up from numpy

Explanation of numpy's limitations (operations that don't naturally vectorise, no parallelism, intermediate array memory usage)

:: right ::
