import Simplex from '../src/NMSimplex.js'

const s = new Simplex()
function objFunc (arr) {
  return (5 * arr[0] + 1) ** 2 + (4 * arr[1] - 16) ** 2
}
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
const result = s.solve(
  objFunc,
  [-354, 1153], // x0 - initial vertex
  1000, // number of iterations
  callback, // callback function
  false
)

console.log(rez)
console.log(result)
