---
layout: section
color: cyan
---

# Numerical Optimisations Pt 2: Introducing Numba, a JIT Compiler for Python

---
layout: top-title
color: cyan
---

:: title ::

## Time To Compile Some Python!

:: content ::

I know I've said this whole time that Python is an interpreted language, but that's not *entirely* true:

- Strictly speaking, there's no such thing as a **compiled language** or an **interpreted language**
- A **language** is just a set of syntax that is mapped to some expected functionality, e.g.
  - Python's indentation
  - What `def` does
  - Even what `x=5` and `x+=5` means
- Anything that is able actually run on a CPU is an **implementation** of the language

<br>

<Admonition title="CPython is Interpreted" color="amber-light" width="100%">

When I've talked about Python so far, I've been talking about CPython

CPython is the main implementation of the Python language, the one you download off of python.org

</Admonition>

---
layout: top-title
color: cyan
---

:: title ::

## If Python doesn't have to be interpreted, why don't we compile it by default?

:: content ::

It's a good question, it feels like if Python is easy to write, and compiled code is fast, we should just always compile Python

However, this isn't easy due to how Python is designed:

- Dynamic typing makes compilation difficult, and optimised compilation almost impossible
- Huge number of libraries written in different low-level languages would be hard to interface with
- Full compatibility in general is hard to approach, because Python was simply not designed with compilation in mind

**Python themselves haven't done it because the changes it requires often makes Python lose its Python-ness**

But that doesn't mean people haven't tried...

---
layout: top-title-two-cols
color: cyan
columns: is-8
---

:: title ::

## The Many Faces of Python

:: left ::

CPython is the reference implementation, but it's far from the only:

- **Cython:**
  - First transpiles into C, then compiles the C (requires C compiler)
  - Requires static typing for best results
  - Technically a different language
- **PyPy:**
  - JIT (Just-In-Time) Compiler for Python
  - Less than perfect library compatability
  - Requires you/users to download a separate runtime
- And many, many more...

:: right ::

<img src="../images/Cython_logo.svg" width="70%" />

<br>

<img src="../images/pypy-logo.svg" width="70%" />

---
layout: quote
color: cyan
author: Numba Website
---

Numba is an open source JIT compiler that translates a subset of Python and NumPy code into fast machine code. 

---
layout: top-title-two-cols
color: cyan
columns: is-8
---

:: title ::

## Why I Like Numba for Scientific Computing

:: left ::

If Numba's a JIT compiler, like PyPy, why pick it?

- Simple `pip install`, no different runtime/interpreter needed
- Doesn't require non-pip dependencies like a C compiler
- No requirements for type hinting
- Works mostly through decorators
  - Simple, easy to learn syntax
  - Only compile the performance-critical bits, leave the rest in pure CPython (nice and compatible)
- Supports a large set of NumPy operations by default:
  - Numba = NumPy + Mamba (world's fastest snake)
- Only way to write CUDA kernels in pure Python

:: right ::

<img src="../images/numba-blue-horizontal-rgb.svg" />

---
layout: top-title-two-cols
color: cyan
columns: is-6
---

:: title ::

## How Numba Works

:: left ::

Just-In-Time (JIT) does what it says, compiles code just as you want to run it:
- Optimised code = logic, types + compiler
- Numba gets the logic from the Python bytecode
- Numba infers the types based on the types of the function arguments at runtime
- It gives the strongly, statically typed logic to LLVM (a compiler backend used in C/C++ Compilers)
- LLVM generates beautiful, optimised machine code

:: right ::

<img src="../images/numba-diagram.png" />

<br>

Since Numba infers the types from the function arguments, we don't have to manually tell it the types to get all that performance benefit!

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## JIT-ing Your First Function

:: left ::

The core feature of Numba is its `@jit` decorator:
- Functions with the decorator are JIT compiled the first time they're called with certain arguments
- From that point, any calls to that function are like calls to NumPy's optimised compiled functions
- `my_slow_python(1_000_000)` - 23.4ms
- `my_first_jit(1_000_000)` - 90.6ns (~260,000x speedup)

That's some free and easy performance right there!

:: right ::

Decorators can either be applied in the "typical" way (best for production):

```python
@numba.jit
def my_first_jit(num_points):
  sum = 0
  for i in range(num_points):
    sum += i
  return sum
```
Or they can be applied after function declaration:

```python
def my_slow_python(num_points):
  sum = 0
  for i in range(num_points):
    sum += i
  return sum
 
my_first_jit = numba.jit()(my_slow_python)
```

This second method is ideal for timing comparisons as you can see the impact of JIT without copy/pasting the code

---
layout: top-title
color: cyan
---

:: title ::

## The JIT-Tax

:: content ::

If you were to work through that last example yourself, and time it:

```python
my_first_jit = jit()(my_slow_python)
%timeit my_first_jit(1_000_000)
```

You may get a message like this:

INSERT IMAGE OF TIMEIT MESSAGE

That's because it takes time to compile the function the first time you call it

This time can often be longer than the original run time of a function, so compiling it is only worth it if you call the function more than once

<Admonition title="Warning For Manual Timing" color="amber-light" width="100%">

If you're not using `%timeit` and are manually timing your functions, make sure you always measure (at least) twice

The first time will give you time including compilation, and the second time will give you the pure execution time

</Admonition>

---
layout: top-title-two-cols
color: cyan
columns: is-10
---

:: title ::

## Customising Your JIT

:: left ::

Simply using `@jit` is a great place to start, but there are several arguments you can give it:

- `nopython=True`
  - Stops Numba from calling back to the interpreter
- `cache=True`
  - Stores Numba's compilation for reuse
  - (Saves on that JIT-Tax)
- `nogil=True`
  - Releases Python's Global Interpreter Lock (GIL)
- `parallel=True`
  - More on this later

:: right ::

In the "typical" decorator way:

```python
@numba.jit(cache=True)
def my_second_jit()
```

Or in the alternative form:

```python
def my_slow_python()

my_second_jit = numba.jit(cache=True)(my_slow_python)
# Arguments go in those mysterious first brackets!
```

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## Numba's Compilation Modes

:: left ::

### `nopython` mode

- The whole function must be compiled with Numba
- Numba can't ask for help with objects it doesn't understand
- Everything compiled = performance boost (Minus JIT-Tax)

:: right ::

### `object` mode

- Numba can ask the Python interpreter for help with objects
- Anything run by the interpreter has no speedup
- Overhead of switching between interpreter/compiled often **makes performance worse, not better**

---
layout: top-title-two-cols
color: cyan
columns: is-7
---

:: title ::

## Please, Only Use Numba With nopython=True

:: left ::

Just using `@jit` is dangerous:

- By default, `@jit` will try to compile in `nopython` mode, and default to `object` mode if it fails
- Since it doesn't throw an error, you could be slowing your code down without realising
- By using `nopython=True`, you ask Numba to throw and error if it can't compile in `nopython` mode
- Since it throws an error, you can check why the function couldn't compile and fix the issues!

:: right ::

**It's so common that the devs added a shorthand, `njit`**

This:

```python
@numba.jit(nopython=True)
```

Is identical to this:

```python
@numba.njit
```

<br>

I will be using `njit` from now on, and I **strongly suggest** that you do too!

---
layout: top-title
color: cyan
---

:: title ::

## Performance Tips For JIT'ed Functions

:: content ::

When JIT-ing functions, be sure to always:
- Use NumPy arrays instead of Python lists
  - They're contiguous in memory and easy for Numba to understand
- Favour simple, explicit loops (opposite of NumPy, I know):
  - These are easier of Numba to understand and for LLVM to optimise
- Keep your functions small
  - Numba can inline JIT'ed functions into other JIT'ed functions
- Only use Numba where you need it
  - Numba only works with numerical code, and the JIT-Tax means it should only really be used for your heaviest functions (remember - profile!)

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## Numba and NumPy

:: left ::

### What Works Well

- NumPy array support is first class
- Many of the numpy builtin functions have been reimplemented for Numba

:: right ::

### What Works Less Well

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## Make Your Own NumPy UFuncs

:: left ::

You don't even have to write out the for loops!

:: right ::

```python
@numba.vectorize
def add_5(x):
  x += 5
```

Can call it like:
```python
y = 10
print(add_5(y)) # 15
```

Or like:
```python
y_array = np.array([1,2,3,4,5])
print(add_5(y_array)) # [6,7,8,9,10]
```

---
layout: top-title
color: cyan
---

:: title ::

## Other Things That Don't Work So Well

:: content ::

Numba is amazing when applied to heavy, numerical workflows

Where is doesn't shine so much is:
- It isn't compatible with most libraries outside of NumPy
- It doesn't work for string manipulation
- Class/object support isn't perfect
  - `self` is a Python Object that Numba doesn't understand, so `@njit` can't be applied to class methods directly

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## Working With Classes In Numba - Manual Method

:: left ::

### Before JIT, Typical Class

```python
class Circle:
  def __init__(self, radius):
    self.radius = radius

  def area(self): # Pesky `self` that Numba can't handle
    return np.pi * self.radius**2
```

`self` references are a problem for number, so we need to eliminate them

(please pretend area is a heavy, expensive function)

:: right ::

### After JIT, Heavy Functions Offloaded

```python
class JITCircle:
  def __init__(self, radius):
    self.radius = radius

  def area(self):
    return _calc_area(self.radius) # Pass in required args

  @njit # `njit` must be first!
  @staticmethod # Doesn't require self reference
  def _calc_area(radius):
    return np.pi * radius**2
```

`@staticmethod` is one option, if you'd still like the keep the logic local to the class. With this method, using an underscore at the start of the name helps hide it

Depending on reusability/style preferences, you could also have your helper functions outside of the class entirely

---
layout: top-title-two-cols
color: cyan
---

:: title ::

## Working With Classes In Numba - Experimental JITClass

:: left ::

:: right ::
