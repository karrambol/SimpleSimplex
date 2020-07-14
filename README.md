# Nelder-Mead simplex method implementation on js

Forked from [SimpleSimplex](https://github.com/keeganlow/SimpleSimplex)

Added 2D objective functions support

Rewritten in the ES6 module format as js class

Added objective function memoization, that reduce objFunc calls by ~6 times

Added [mocha](https://github.com/mochajs/mocha) tests

## Example

Create solver object

```js
import Simplex from '../src/NMSimplex'
const s = new Simplex()
```

Create objective function, that take an array of 2 numbers for 2D optimizatio or number for 1D optimization and return number

```js
function objFunc (arr) {
  return (5 * arr[0] + 1) ** 2 + (4 * arr[1] - 16) ** 2
}
```

Optionally you can create callback function that solver will be call in the end of each iteration. For example it can be function that push each iteration in array

```js
const rez = []
function callback (
  itr, // number of iteration
  x, // best vertex
  obj, // best vertex objFunc(x)
  centr, // centroid coordinates
  action, // iteration action
  objEvals // number of objFunc calls
) {
  rez.push([itr, x, obj, centr, action, objEvals])
}
```

```js
const result = s.solve(
  objFunc,
  [-354, 1153], // x0 - initial vertex
  1000, // number of iterations
  callback, // callback function
  true
)
// [[-0.2, 4], best vertex
// 0, objFunc(x)
// [-0.2, 4], centroid coordinates
// "tolerance reached"] last action or 'tolerance reached'
```
