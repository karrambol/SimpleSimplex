/* eslint-env mocha */
/* eslint-disable func-names */
import assert from 'assert'
import Simplex from '../src/NMSimplex'

describe('Elliptic paraboloid optimization in 2D', function () {
  describe('Result', function () {
    it('Should return correct', function () {
      const s = new Simplex()
      let rez = []
      function testFunc (arr) {
        return (5 * arr[0] + 1) ** 2 + (4 * arr[1] - 16) ** 2
      }
      ;[rez] = s.solve(testFunc, [-354, 1153], 1000)
      assert.deepEqual(rez, [-1 / 5, 4])
    })
  })
})
describe('Parabola optimization in 1D', function () {
  describe('Result', function () {
    it('Should return correct', function () {
      const s = new Simplex()
      let rez = []
      function testFunc (xIn) {
        return (5 * xIn + 1) ** 2 + (4 * 4 - 16) ** 2
      }
      ;[rez] = s.solve(testFunc, 500, 1000)
      assert.equal(rez, -1 / 5)
    })
  })
})
describe('Memoization', function () {
  const rez1 = []
  const rez2 = []
  const s = new Simplex()
  function testFunc (arr) {
    return (5 * arr[0] + 1) ** 2 + (4 * arr[1] - 16) ** 2
  }
  s.solve(
    testFunc,
    [-354, 1153],
    100,
    function (...args) {
      rez1.push(args)
    },
    false
  )
  s.solve(testFunc, [-354, 1153], 100, function (...args) {
    rez2.push(args)
  })
  describe('Result', function () {
    it('Should be same as no memoization', function () {
      assert.deepEqual(
        rez1.map(el => el.shift()),
        rez2.map(el => el.shift())
      )
    })
  })
  describe('Number of unmemoized objective function evaluations', function () {
    it('Should be >= then memoized', function () {
      assert(rez1[rez1.length - 1][4] >= rez2[rez2.length - 1][4])
    })
  })
})
describe('Simplex with 2D function', function () {
  describe('Methods', function () {
    const s = new Simplex()
    function testFunc (arr) {
      return (5 * arr[0] + 1) ** 2 + (4 * arr[1] - 16) ** 2
    }
    const x0 = [-1 / 5, 4]
    s.vertices = [x0, [x0[0], x0[1] + 10], [x0[0] + 10, x0[1]]]
    describe('sortByCost', function () {
      it('should return correct result', function () {
        s.sortByCost(testFunc)
        assert.deepEqual(s.vertices, [
          [-0.2, 4],
          [-0.2, 14],
          [9.8, 4]
        ])
      })
    })
    describe('updateCentroid', function () {
      it('should return correct result', function () {
        s.updateCentroid(testFunc)
        assert.deepEqual(s.centroid, [-0.2, 9])
      })
    })

    describe('updateReflectPoint', function () {
      it('should return correct reflectPoint', function () {
        s.updateReflectPoint(testFunc)
        assert.deepEqual(s.reflectPoint, [-10.2, 14])
      })
      it('should return correct reflectCost', function () {
        assert.equal(s.reflectCost, 4100)
      })
    })

    describe('updateExpandPoint', function () {
      it('should return correct expandPoint', function () {
        s.updateExpandPoint(testFunc)
        assert.deepEqual(s.expandPoint, [-20.2, 19])
      })
      it('should return correct reflectCost', function () {
        assert.equal(s.expandCost, 13600)
      })
    })

    describe('updateContractPoint', function () {
      it('should return correct contractPoint', function () {
        s.updateContractPoint(testFunc)
        assert.deepEqual(s.contractPoint, [-5.2, 11.5])
      })
      it('should return correct contractCost', function () {
        assert.equal(s.contractCost, 1525)
      })
    })

    describe('getVertexCost', function () {
      it('should return correct worst point cost', function () {
        assert.equal(s.getVertexCost(testFunc, 'worst'), 2500)
      })
      it('should return correct secondWorst point cost', function () {
        assert.equal(s.getVertexCost(testFunc, 'secondWorst'), 1600)
      })
      it('should return correct best point cost', function () {
        assert.equal(s.getVertexCost(testFunc, 'best'), 0)
      })
    })

    describe('reflect', function () {
      it('should return correct verices', function () {
        s.reflect()
        assert.deepEqual(s.vertices, [
          [-0.2, 4],
          [-0.2, 14],
          [-10.2, 14]
        ])
      })
    })

    describe('expand', function () {
      it('should return correct verices', function () {
        s.expand()
        assert.deepEqual(s.vertices, [
          [-0.2, 4],
          [-0.2, 14],
          [-20.2, 19]
        ])
      })
    })

    describe('contract', function () {
      it('should return correct verices', function () {
        s.contract()
        assert.deepEqual(s.vertices, [
          [-0.2, 4],
          [-0.2, 14],
          [-5.2, 11.5]
        ])
      })
    })

    describe('reduce', function () {
      it('should return correct verices', function () {
        s.reduce()
        assert.deepEqual(s.vertices, [
          [-0.2, 4],
          [-0.2, 9],
          [-2.7, 7.75]
        ])
      })
    })
  })
})
