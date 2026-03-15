---
layout: section
color: yellow
---

# A Quick Refresher: Making the Most of NumPy

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## NumPy: a Scientist's Best Friend

:: left ::

<v-click>

NumPy is THE package for numerical/scientific computing in Python

</v-click>

<v-click>

It's incredibly fast, with a mostly C/C++ backend, and provides features like:

</v-click>

<v-clicks>

- Efficient, flexible N-dimensional arrays
- Comprehensive vector/linear algebra operations
- Useful statistics functions
- Great random number generation

</v-clicks>

:: right ::

<v-click at=1>

<img src="../images/NumPy_logo_2020.svg" width="70%"/>

</v-click>

<v-click at=6>

<img src="../images/particle-physicist-mc-meme.jpg" width="50%"/>

</v-click>

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Should Always Be Your First Choice

:: content ::

<v-click>

Let's make this perfectly clear:

</v-click>

<v-clicks>

- This talk is about Numba, but that's not my first choice for optimisation
- I will **ALWAYS** check that I'm properly using NumPy before reaching for Numba
- NumPy is written in C/C++ (by some very talented people) and has very little overheads
- If NumPy can do it already, you almost certainly can't do it better

</v-clicks>

<v-click>

Even if you do need Numba, Numba and NumPy work amazingly together!

</v-click>

<br>

<v-click>

**So let's have a quick refresher on how to make the most of NumPy!**

</v-click>

---
layout: quote
color: red
---

Warning:

<br>

This is not a NumPy tutorial! The following assumes you're familiar with NumPy, and just gives some performance tips before we compare with Numba!

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 1: Never Use Python For Loops

:: left ::

<v-click>

### For loops

```python
def naive_mean(x_list):
  sum = 0
  for x in x_list:
    sum += x
  mean = sum / len(x_list)
  return mean
```

</v-click>

<v-click>

- Verbose, harder to read
- Hand-written = Prone to error
- Python For loop = performance death

</v-click>

<br>

<v-click at=5>

Time for 10,000,000 elements:
- **136ms**

</v-click>

:: right ::

<v-click>

### NumPy Built-In Functions

```python
def np_mean(x_list):
  return np.mean(x_list)
```

</v-click>

<v-click>

- Clean and readable
- Will always use the correct formula
- For loop is happening under the hood in C/C++ (much faster, vectorised operation)

</v-click>

<br>

<v-click at=6>

Time for 10,000,000 elements:
- **171ms**

</v-click>

<v-click at=7>

**Wait, NumPy is slower?**

</v-click>

---
layout: top-title-two-cols
color: yellow
columns: is-5
---

:: title ::

## Rule 2: Always Use NumPy Arrays

:: left ::

<v-click>

In the previous example, I ran the timings like this:

```python
# Generate Python List with 1,000,000 elements
x_list = list(range(1_000_000))

%timeit naive_mean(x_list) # 136ms
%timeit np_mean(x_list) # 171ms
```

</v-click>

<v-click>

Since `np_mean` is slower, and the NumPy For Loop is written in C++, does that mean Python For Loops are faster than C++?

</v-click>

<v-click>

**Absolutely Not!**

Both the For Loop and NumPy mean were being run on a Python list

</v-click>

:: right ::

<v-click>

If I instead run my NumPy mean on a NumPy array:

```python
# Generate Python List with 1,000,000 elements
x_list = list(range(1_000_000))
x_array = np.array(x_list)

%timeit naive_mean(x_list) # Run on Python List
%timeit np_mean(x_array) # Run on NumPy array
```

</v-click>

<v-click>

The final performance comes in as:
- Python For Loop (w/ Python List): **136ms**
- NumPy Mean (w/ NumPy Array): **5.52ms**

</v-click>

<v-click>

That's **~25x Speedup** - now that's what we want!

</v-click>

<br>

<v-click>

**But, why is it so different with a NumPy array?**

</v-click>

---
layout: top-title-two-cols
color: yellow
columns: is-4
---

:: title ::

## Python Lists Vs NumPy Arrays

:: left ::

<v-click>

### Python lists

```python
x_list = [1, 2.4, 3, 7] 

x_list.append("Hello") # Fine and cheap
```

</v-click>

<v-clicks>

Designed for flexibility:
- You can mix different datatypes
- It's cheap to append to the array/resize

But how?
- Each number is stored as a bloated `PyObject`, all over the place in memory (discontiguous)

</v-clicks>


:: right ::

<v-click>

### NumPy arrays

```python
x_array = np.array([1,2.4,3,7])
# or
x_array = np.array(x_list)
# x_array = [1.  2.4 3.  7. ] (NumPy chose float)

x_array = np.append(x_array, 'Hello') # Expensive!
# Now x_array = ["1", "2.4", "3", "7", "Hello"] (all strings!)
```

</v-click>

<v-clicks>

Designed for performance:
- NumPy stores it as a strongly-typed, contiguous C-style array

This comes at a cost:
- Can only store one datatype (you choose or NumPy guesses)
  - You can check what NumPy chose with `x_array.dtype`
- C array = no in-place appends
  - Appends always create new arrays (expensive)

</v-clicks>

<v-click at=9>

**They're so different that NumPy has to convert your list to an array to operate on it! This slows NumPy down!**

</v-click>
---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Why NumPy Array + NumPy Vector Operation = Performance

:: left ::

<v-click>

### Contiguous Memory = Cache Prefetching

</v-click>

<v-click>

Your CPU/OS is really smart

</v-click>

<v-click>

Let's say you're accessing `A0`, then `A1`, then `A2` and `A3` from this memory block:

```python
[A0, A1, A2, A3, A4, A5, ...]
```

</v-click>

<v-click>

It'll see that it's a regular access pattern and start peaking ahead!

It will then load `[A4, ...]` in chunks for you

</v-click>

<v-click>

**Less time spent looking for/loading your data = more performance!**

</v-click>


:: right ::

<v-click>

### Vector Operations = SIMD (Single Instruction, Multiple Data)

</v-click>

<v-click>

Python For Loops operate one element at a time:
```python
[1, 2, 3, 4, 5, 6, 7, 8] + [9, 10, 11, 12, 13, 14, 15]
===
1+9 # Cycle 1
2+10 # Cycle 2
...
8+16 # Cycle 1=8
# 8 CPU Cycles Total
```

</v-click>

<v-click>

Modern CPUs can operate with SIMD
```python
[1, 2, 3, 4, 5, 6, 7, 8] + [9, 10, 11, 12, 13, 14, 15, 16]
===
[1, 2, 3, 4] + [9, 10, 11, 12] # Cycle 1
[5, 6, 7, 8] + [13, 14, 15, 18] # Cycle 2
# 2 CPU Cycles Total
```

</v-click>

<v-click>

**Less cycles = more performance!**

</v-click>

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 3: Prefer NumPy Array Initialisation

:: left ::

<v-click>

If converting from list to NumPy array was what was slow, did I just cheat by moving that out of the timing area?

</v-click>

<v-click>

Kind of! If we do include the array creation:

</v-click>

<v-click>

### For Loop + List Creation:
```python
%%timeit
x_list = list(range(1_000_000))
naive_mean(x_list)
```

**241ms**

</v-click>


<v-click>

### NumPy + Array Conversion:

```python
%%timeit
x_list = list(range(1_000_000))
x_array = np.array(x_list)
np_mean(x_array)
```

**272ms** - Still slower!

</v-click>

:: right ::

<v-click>

That's why you should always initialise as a NumPy array from the start!

</v-click>

<v-click>

### With NumPy Initialisation:

```python
%%timeit
x_array = np.arange(1_000_000)
np_mean(x_array)
```

**13.9ms**

</v-click>

<v-clicks>

That puts our actual speedup at **~17x**

The more you operate on that array, the better your speed up will get!

Also, if you're loading data from files most libraries use NumPy arrays already!

<Link to="numpy-inits" title="More Examples of NumPy Array Initialisations Here" />

</v-clicks>

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Putting It Together: Monte Carlo Pi Estimation

:: left ::

<v-click>

### Naive Python

```python
def mc_pi(n_samples):
    n_samples_inside = 0
    for i in range(n_samples):
        x = np.random.random() 
        y = np.random.random()
        if x**2 + y**2 <= 1:
            n_samples_inside += 1
    return 4 * n_samples_inside / n_samples
```

</v-click>

<v-clicks>

- Sin 1: Pure Python For Loop
- Sin 2: NumPy functions not operating on arrays

</v-clicks>

<v-click at=9>

Runtime:
**4.06s**

</v-click>

:: right ::

<v-click>

### NumPy Vectorised

```python
def mc_pi_np(n_samples):
    xs = np.random.random(n_samples)
    ys = np.random.random(n_samples)
    r_sqs = xs**2 + ys**2
    n_samples_inside = np.sum(r_sqs <= 1)
    return 4 * n_samples_inside / n_samples
```

</v-click>

<v-clicks>

- For Loop gone!
- Using NumPy arrays and NumPy initialisation
- NumPy array operations and reductions
- Even using a fancy boolean mask!

</v-clicks>

<v-click at=10>

Runtime:
**99.7ms**

</v-click>

<v-click at=11>

**Another ~40x Speedup!**

</v-click>

---
layout: side-title
color: yellow
---

:: title ::

## Section Summary

:: content ::

<v-click>

### In this section we have learnt:

</v-click>

<v-click>

- There are many performance traps when mixing NumPy with pure Python

</v-click>

<v-click>

- In spite of this, getting good performance with NumPy is actually quite simple

</v-click>

<v-click>

- Use NumPy for **everything:**
    - Your arrays
    - Your array creation/initialisation
    - Your functions and operations

</v-click>

<v-click>

**If Lists/For Loops are nowhere to be seen, you'll be fine!**

</v-click>

---
layout: top-title
color: yellow
---

:: title ::

## The (Very Few) Places NumPy Falls Short

:: content ::

<v-click>

We've seen that NumPy is the **champion** of vector operations, but can all algorithms be vectorised?

</v-click>

<v-click>

**Sadly no.**

</v-click>

<v-click>

What can we do when algorithms depend on previous values:

</v-click>

<v-clicks>

- Recursive functions (e.g. Fibonacci Series)
- Time series where values depend on previous timestep (e.g. numerical integration)

</v-clicks>

<v-click>

Basically, any For Loop where you're not only accessing `x[i]`, but also `x[i-1]` or `x[i+1]` 

or really any `x[j != i]`

</v-click>

<br>

<v-click>

**Surely we're not stuck with a pure Python For Loop?**

</v-click>





