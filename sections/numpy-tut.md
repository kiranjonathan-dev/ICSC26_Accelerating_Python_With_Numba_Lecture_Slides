---
layout: section
color: yellow
---

# Numerical Optimisations Pt 1: Offloading to Numpy

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Numpy: a Scientist's Best Friend

:: left ::

Numpy is THE package for numerical/scientific computing in Python.

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

## Numpy Should Always Be Your First Choice

:: content ::

Let's make this perfectly clear:

- This talk is about Numba, but that's not my first choice for optimisation
- I will **ALWAYS** check that I'm properly using Numpy before reaching for Numba
- Numpy is written in C/C++ and has very little overheads
- It's also written by some amazingly talented programmers
- If numpy can do it already, you almost certainly can't do it better
- Even if you do need Numba, Numba and numpy work amazingly together!

<br>

### So let's have a quick refresher on how to make the most of numpy!

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 1: Lists Are Dead to You 

:: left ::

### Python lists

```python
x_list = [1, 2.4, 3, 7]
```

:: right ::

### Numpy arrays

```python
x_array = np.array([1,2.4,3,7])
# or
x_array = np.array(x_list)
```

---
layout: top-title
color: yellow
---

:: title ::

## Numpy's Arrays 

:: content ::

```python
# Some useful list intialisations:
x = np.emptylike(shape) # Extremely fast, but need to make sure you overwrite all elements
x = np.zeros(shape)
x = np.ones(shape)
x = np.linspace(start, end, num_points) # Evenly spread points, great for getting x values when you want to plot a function
x = np.arange(start, end, step) # Similar to range(), can just provide end as an argument
```

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 2: For Loops Are Dead to You 

:: left ::

### For loops

```python
for i in range(len(x_list)):
  x[i] += 5

for i in range(len(x_list)):
  x[i] += y[i]
```

:: right ::

### numpy array operations

```python
x_array += 5 # Yes, this does the whole array all at once

x_array += y_array # This is a element-wise vector addition!
```

---
layout: top-title
color: yellow
---

:: title ::

## Numpy's ufuncs and gufuncs explained

:: content ::

---
layout: top-title-two-cols
color: yellow
---

:: title ::

## Rule 3: Be Lazy, Use Numpy's Built-In Functions!

:: left ::

### Hand-coded

```python
sum = 0
for x in x_list:
  sum += x
n_elems = len(x_list)
mean = sum / n_elems
```

:: right ::

### Numpy built-in

```python
mean = x_array.mean() # Like magic!
```

---
layout: top-title
color: yellow
---

:: title ::

## Some Very Useful Numpy Functions

:: content ::

```python
# And so, so many more! Google (or ChatGPT) is your friend!
```

---
layout: top-title
color: yellow
---

:: title ::

## The (Very Few) Places Numpy Falls Short

:: content ::
