---
layout: section
color: yellow
---

# Numerical Optimisations Pt 1: Offloading to NumPy

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
layout: top-title-two-cols
color: yellow
columns: is-5
---

:: title ::

## Rule 1: Lists Are Dead to You 

:: left ::

### Python lists

```python
x_list = [1, 2.4, 3, 7] 

x_list.append("Hello") # Fine and cheap
```

- Each number is stored as a bloated `PyObject`
- Memory is discontiguous (the objects are all over the place in memory)
- This is done so that you can easily append to lists, and so that it can contain different types

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

- NumPy manages the memory for you
- It's stored as a strongly-typed, contiguous c-style array
- NumPy will automatically determine the common datatype (`float32`, `float64`, `int64`, `string`, etc...)
- You can check what it has infered with `x_array.dtype`

**I never want to see `np.sin(x_list)` - use an array!**

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 2: For Loops Are Out of Style

:: left ::

### For loops

```python
x_list = [1,2,3,4,5]
y_list = [6,7,8,9,10]

for i in range(len(x_list)):
  x_list[i] += 5

for i in range(len(x_list)):
  x_list[i] = math.sin(x_list[i])

for i in range(len(x_list)):
  x_list[i] += y_list[i]
```

- Verbose, harder to read
- For loop is happening in Python itself (death of all performance)

:: right ::

### NumPy vectorised array operations

```python
x_array = np.array(x_list)
y_array = np.array(y_list)

x_array += 5 # Yes, this does the whole array all at once

x_array = np.sin(x_array) # Yes, this one does too!

x_array += y_array # This is a element-wise vector addition!
```

- Clean and readable syntax (lets you focus on the maths)
- For loop is happening under the hood in C/C++ (much faster, vectorised operation)

**With NumPy, you always want to see operations on arrays, not elements**

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 3: Be Lazy, Use NumPy's Built-In Functions!

:: left ::

### Hand-coded

```python
sum = 0
for x in x_list:
  sum += x
n_elems = len(x_list)
mean = sum / n_elems
```

- Hand-coded functions are prone to typos/errors
- Need to remember the formula for all your favour statistics
- Slow Python for loop (again)

:: right ::

### NumPy built-in

```python
mean = x_array.mean() # Just beautiful!
```

- No errors in sight!
- Immediately readable
- Lightning-fast, optimised implementations

**NumPy has ~2000 contributors and has been worked on for decades. If it can do it, you can't do it better/faster!**

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 4: Nd Arrays Are Cool!

:: left ::

### Python Lists of Lists

```python
  x_list = [[1, 2], [3,4]]
  x_list[0][1] # 2
  # Multiple layers of indices
```

- Ugly and confusing
- No guarantee the internal lists will be the same length (for matrices, tensors, etc...)

:: right ::

### NumPy 2d Array

```python
x_array = np.array(x_list)
x_list[0,1] # 2
# Native multi-indexing

x_list[:,1] # [2,4]
# Able to slice over multiple rows!
```

- More closely resembles maths (but still 0-indexed)
- NumPy's array slicing is just *chef's kiss*

**NumPy is built for vector maths/linear algebra from the ground up**

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## NumPy's Performance Gains

:: left ::

## Naive Python Mean

```python
def naive_mean(x_list):
  sum = 0
  for x in x_list:
    sum += x
  mean = sum / len(x_list)
  return mean
```

### 18ms

:: right ::

## Vectorised NumPy Mean

```python
def numpy_mean(x_array):
  return x_array.mean()
```

### 1.8μs

:: default ::

### I wasn't kidding about speed, that's **10,000x speedup** for 1,000,000 elements

<br>

### I also wrote less code, and it's easier to read!

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## NumPy's Performance Edge (From Optimised Compilation)

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

Old CPU's could only perform one binary operation at a time:
```python
[1, 2, 3, 4, 5, 6, 7, 8] + [9, 10, 11, 12, 13, 14, 15]
===
1+9
2+10
...
8+16
# 8 CPU Cycles
```

Modern CPUs can operate as SIMD (Single Instruction, Multiple Data)
```python
[1, 2, 3, 4, 5, 6, 7, 8] + [9, 10, 11, 12, 13, 14, 15, 16]
===
[1, 2, 3, 4] + [9, 10, 11, 12] 
[5, 6, 7, 8] + [13, 14, 15, 18]
# 2 CPU Cycles
```

<!-- SIMD: -->
<!-- NumPy isn't just fast because it's compiled, every rule contributes: -->
<!-- - Contiguous memory from NumPy arrays allows the CPU to pre-fetch memory when NumPy loops under the hood -->
<!-- - NumPy's vectorised operations make use of SIMD (Single Instruction, Multiple Data) -->
<!--   - Modern CPUs can perform the same operation on multiple pieces of data at the same time! -->

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
