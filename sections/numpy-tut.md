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

NumPy is THE package for numerical/scientific computing in Python.

It's incredibly fast, with a mostly C/C++ backend, and provides features like:
- Efficient, flexible N-dimensional arrays
- Comprehensive vector/linear algebra operations
- Useful statistics functions
- Great random number generation

:: right ::

<img src="../images/NumPy_logo_2020.svg" />

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Should Always Be Your First Choice

:: content ::

Let's make this perfectly clear:

- This talk is about Numba, but that's not my first choice for optimisation
- I will **ALWAYS** check that I'm properly using NumPy before reaching for Numba
- NumPy is written in C/C++ and has very little overheads
- It's also written by some amazingly talented programmers
- If NumPy can do it already, you almost certainly can't do it better
- Even if you do need Numba, Numba and NumPy work amazingly together!

<br>

**So let's have a quick refresher on how to make the most of NumPy!**

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

### For loops

```python
def naive_mean(x_list):
  sum = 0
  for x in x_list:
    sum += x
  mean = sum / len(x_list)
  return mean
```

- Verbose, harder to read
- Hand-written = Prone to error
- Python For loop = performance death
- Time for 1,000,000 elements:
  - **352ms**

:: right ::

### NumPy Built-In Functions

```python
def np_mean(x_list):
  return np.mean(x_list)
```

- Clean and readable
- Will always use the correct formula
- For loop is happening under the hood in C/C++ (much faster, vectorised operation)
- Time for 1,000,000 elements:
  - **423ms**

**Wait, NumPy is slower?**

---
layout: top-title-two-cols
color: yellow
columns: is-5
---

:: title ::

## Rule 2: Always Use NumPy Arrays

:: left ::

In the previous example, I ran the timings like this:

```python
# Generate Python List with 1,000,000 elements
x_list = list(range(1_000_000))

%timeit naive_mean(x_list) # 352ms
%timeit np_mean(x_list) # 423ms
```
Since `np_mean` is slower, and the NumPy For Loop is written in C++, does that mean Python For Loops are faster than C++?

**Absolutely Not!**

Both the For Loop and NumPy mean were being run on a Python list

:: right ::

If I instead run my test like this:

```python
# Generate Python List with 1,000,000 elements
x_list = list(range(1_000_000))
x_array = np.array(x_list)

%timeit naive_mean(x_list) # 352ms
%timeit np_mean(x_array) # Run on NumPy array
```

The final performance comes in as:
- Python For Loop: **352ms**
- NumPy Mean: **15.4ms**

That's **~23x Speedup** - now that's what we want!

**Why is it so different?**

---
layout: top-title-two-cols
color: yellow
columns: is-4
---

:: title ::

## Python Lists Vs NumPy Arrays

:: left ::

### Python lists

```python
x_list = [1, 2.4, 3, 7] 

x_list.append("Hello") # Fine and cheap
```

- Each number is stored as a bloated `PyObject` spread out in memory (discontiguous)
- This does mean that you can mix different datatypes
- And that appending to the array is typically cheap

**They're so different that NumPy has to convert your list to an array to operate on it. This is why it was slower than the for loop!**

:: right ::

### NumPy arrays

```python
x_array = np.array([1,2.4,3,7])
# or
x_array = np.array(x_list)
# x_array = [1.  2.4 3.  7. ] (NumPy chose float)

x_array = np.append(x_array, 'Hello') # Expensive!
# Now x_array = ["1", "2.4", "3", "7", "Hello"] (all strings!)
```

- NumPy stores it as a strongly-typed, contiguous C-style array
- Can only include one datatype, which NumPy will infer
  - You can check what NumPy chose with `x_array.dtype`
- C array = no in-place appends
  - Appends always create new arrays (expensive)

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Why NumPy Array + NumPy Vector Operation = Performance

:: left ::

### Contiguous Memory = Cache Prefetching

Your CPU/OS is really smart

Let's say you're accessing `A0`, then `A1`, then `A2` and `A3` from this memory block:

```python
[A0, A1, A2, A3, A4, A5, ...]
```

It'll see that it's a regular access pattern and start peaking ahead!

It will then load `[A4, ...]` in chunks for you

This can save a lot of time where your CPU is waiting for the next piece of memory to operate on!


:: right ::

### Vector Operations = SIMD

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

Modern CPUs can operate as SIMD (Single Instruction, Multiple Data)
```python
[1, 2, 3, 4, 5, 6, 7, 8] + [9, 10, 11, 12, 13, 14, 15, 16]
===
[1, 2, 3, 4] + [9, 10, 11, 12] # Cycle 1
[5, 6, 7, 8] + [13, 14, 15, 18] # Cycle 2
# 2 CPU Cycles Total
```
---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 3: Prefer NumPy Array Initialisation

:: left ::

If NumPy converting the Python list to a NumPy array is why NumPy was slower, did I not just cheat with updated benchmarks?

Kind of! If we do include the array creation:

```python
%%timeit
x_list = list(range(1_000_000))
naive_mean(x_list)
```

**636ms**

<br>

```python
%%timeit
x_list = list(range(1_000_000))
x_array = np.array(x_list)
np_mean(x_array)
```

**731ms** - Still slower!

:: right ::

That's why you should always initialise as a NumPy array from the start!

```python
%%timeit
x_array = np.arange(1_000_000)
np_mean(x_array)
```

**42.4ms**

That puts our actual speedup at **~15x**

But if you're loading data from files libraries will often hand you NumPy arrays directly

Also, the more you operate on that array, the better your speed up will get!

### ADD LINK TO BACKUP SLIDES ON NUMPY ARRAY INITIALISATION METHODS

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Putting It Together: Monte Carlo Pi Estimation

:: left ::

### Naive Python

```python
def mc_pi(n_samples):
    n_samples_inside = 0
    for i in prange(n_samples):
        x = np.random.random() 
        y = np.random.random()
        if x**2 + y**2 <= 1:
            n_samples_inside += 1
    return 4 * n_samples_inside / n_samples
```

- Sin 1: Pure Python For Loop
- Sin 2: NumPy functions operating per element

**4.32s**

:: right ::

### NumPy Vectorised

```python
def mc_pi_np(n_samples):
    xs = np.random.random(n_samples)
    ys = np.random.random(n_samples)
    r_sqs = xs**2 + ys**2
    n_samples_inside = np.sum(r_sqs <= 1)
    return 4 * n_samples_inside / n_samples
```

- For Loop gone!
- Using NumPy arrays and NumPy initialisation
- NumPy array operations and reductions
- Even using a fancy boolean mask!

**129ms**

**Another ~33x Speedup!**

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## And That's It!

:: left ::

Getting good performance in NumPy really is quite simple:

- Avoid For Loops at all costs
- Always use NumPy arrays (even from initialisation)
- Make the most of NumPy's functions

:: right ::

### You basically want to move away from:
### **operating on elements of lists**, 

<br>

### and move towards:
### **vector operating on NumPy arrays**

---
layout: top-title
color: yellow
---

:: title ::

## The (Very Few) Places NumPy Falls Short

:: content ::

We've seen that NumPy is the **champion** of vector operations, but can all algorithms be vectorised?

Sadly no. What can we do when algorithms depend on previous values:
- Recursive functions (e.g. Fibonacci Series)
- Time series where values depend on previous timestep (e.g. numerical integration)

Basically, any for loop where you're not only accessing `x[i]`, but also `x[i-1]` or `x[i+1]` or any `x[j != i]`

<br>

**Surely we're not stuck with a pure Python for loop?**





