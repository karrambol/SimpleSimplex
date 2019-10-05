import Simplex from '../src/NMSimplex.js';

function testFunc (arr) {
    return ( (12*arr[0]+1) ** 2 +  (4*arr[1]-15) ** 2 );
};

// function that we are currently trying to minimize: 5(x^4) + 6x + 8
function parabola(x) {
    return 5 * x ** 4 + 6 * x + 8;
  }
  
// objective function that Nelder Mead will seek to minimize by mutating the simplex
function parabolicCost(x) {
const residual = parabola(x); 
return residual ** 2;
}

let rez = [];
const s = new Simplex;
s.solve(testFunc, [-354,1153],100, function callback (itr,x) {
    rez = x;
})
console.log(rez)
console.log(rez[0] == -0.0835183894907809 && rez[1] == 3.749998916818134 )

s.solve(parabolicCost, 100, 200, function callback (itr,x) {
    rez = x;
})
console.log(rez)
console.log(rez == -0.6694329465900719)
