---
layout: section
hideInToc: True
color: red
---

# Back Up Slides

---
layout: section
color: red
routeAlias: compiler-optimisations
---

## Compiler Optimisation Examples

---
layout: section
color: red
routeAlias: numpy-tips
---

## NumPy Tips and Tricks

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Tips: Useful Functions

:: content ::

```python
# And so, so many more! The NumPy docs (or ChatGPT) are your friends!
```

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Tips: Avoid Typing Problems

:: content ::

### Watch out for NumPy's infered typing:

```python
x_list = [1, 2, 3, 4] # All ints
x_array = np.list(x_list)

x_array[0] = 3.14 # Try to change to float
print(x_array)
# [3, 2, 3, 4] - All your decimals lost!
```

### If you want floats (decimal numbers), either:

Use floats before creating the array:
```python
x_list = [1., 2., 3., 4.] # 1. is a flot, 1 is an int
x_array = np.array(x_list)
```

Tell NumPy you want floats explicitly (best practice):
```python
x_list = [1, 2, 3, 4]
x_array = np.array(x_list, dtype=float) # Python's built-in float (converted to np.float64)
x_array = np.array(x_list, dtype=np.float32) # NumPy's own types
```

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Tips: Allocate Up-Front

:: content ::

### Try to allocate your array to its full size from the start:

```python
# WRONG: List-style, lots of appends
x_array = np.array([])
for i in range(1000):
  x_array = np.append(5 * i)

# RIGHT: Avoid appends like the plague
x_array = np.empty(1000)
for i in range(1000):
  x_array[i] = 5 * i

# BEST: Leveraging built-ins
x_array = 5 * np.arange(1000)
```

### NumPy has loads of options for creating arrays:

```python
x_array = np.empty(shape) # Fast but make sure to overwrite all elements
x_array = np.zeros(shape) # Useful for accumulating variables
x_array = np.ones(shape) # Can be combined with x_array*=, x_array+=, etc...
x_array = np.linspace(start, end, num_points) # Evenly spread points, great for function plotting
x_array = np.arange(start, end, step) # Similar to range(), can just provide end as an argument
x_array = np.random.random(shape) # There are many random number generator methods in np.random
# Etc...
```

---
layout: top-title
color: yellow
---

:: title ::

## NumPy Tips: Try to Save on Allocations

:: content ::

### Try to avoid intermediate arrays, operate in-place!

```python
x_array = np.arange(1000)

# Memory hog - 3x the data
y_array = x_array * 5
z_array = y_array + 10
sin_array = np.sin(z_array)

# Ideal - only 1 array!
x_array *= 5
x_array += 10
np.sin(x_array, out=x_array) # out let's you specify the target output
```

This is purely from a memory optimisation perspective, do not sacrifice readability if your performance is already good enough!

---
layout: top-title-two-cols
color: cyan
columns: is-7
---

:: title ::

## The Many Faces of Python

:: left ::

<v-click>

CPython is the reference implementation, but it's far from the only:

</v-click>

<v-click>

- Cython
- PyPy
- Jython
- MicroPython
- Nuitka
- And many, many more...

</v-click>

<br>

<v-click>

Today, we're going to be talking about **Numba**

</v-click>

:: right ::

<v-click at=2>

<img src="../images/Cython_logo.svg" width="70%" />

<br>

<img src="../images/pypy-logo.svg" width="70%" />

<br>

<img src="../images/jython.png" width="70%" />

</v-click>
