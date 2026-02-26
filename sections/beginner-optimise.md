---
layout: section
color: lime
---

# A Beginner's Guide to Optimising Python (Read As: Numpy is Your Best Friend)

---
layout: top-title-two-cols
color: lime
---

:: title ::

## Now that we know why Python's slow, how do we get it to run faster?

:: left ::

To optimise code in any language, there a few core principles:

1. Benchmark, benchmark, benchmark
 - There's no point optimising the fastest section of your code, the first thing you have to do is identify which sections/functions/etc... are slowing things down
2. Always check if you can do less work
 - Poorly chosen algorithms/data structures are almost always the cause of slow code, not the specific way the algorithm has been coded
3. Once you've settled on your approach, see how you can optimise the code itself
 - This should always be your last resort
 - This can include

:: right ::
