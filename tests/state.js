"use strict"
const assert = require('chai').assert
const State = require('../index').State

describe('State', () => {
    it("simple_of", () => {
        const c = State.of(3)

        assert.strictEqual(3, State.eval(c, 's'))
        assert.strictEqual('s', State.exec(c, 's'))
    })

    it("simple_bind", () => { 
        const c = State.of(3).chain(function (x) {
            return State.of(x + 5)
        })

        assert.deepEqual(
            State.run(c, 's'),
            { value: 8, state: 's' })
    })

    it("chain_order", () => {
        const c = State.of(3)
            .chain(function (x) {
                return State.of(x + 5)
            })
            .chain(function (x) {
                return State.of(x / 2)
            })

        assert.deepEqual(
            State.run(c, 's'),
            { value: 4, state: 's' })
    })

    it("get", () => {
        assert.strictEqual('x', State.eval(State.get, 'x'));

        const c = State.of(3)
            .chain(function (x) {
                return State.get
            })
            .chain(function (x) {
                return State.of(x + 'abc')
            })

        assert.strictEqual('sabc', State.eval(c, 's'))
    })

    it("put", () => {
        const c = State.of(3)
            .chain(function (x) {
                return State.put(x)
            })

        assert.deepEqual(
            State.exec(c, 's'),
            3)
    })

    it("modify", () => {
        const c = State.of(3)
            .chain(function (x) {
                return State.modify(function (y) { return x * y })
            })

        assert.deepEqual(
            State.exec(c, 4),
            12)
    })

    it("many_chain", () => {
        let c = State.of(0)

        for (let i = 0; i < 100000; ++i) {
            c = c.map(function (x) {
                return x + 1
            })
        }

        assert.deepEqual(
            State.run(c, 's'),
            { value: 100000, state: 's' })
    })

    it("many_chain_inner", () => {
        const f = function (x) {
            if (x > 10000)
                return State.of(x)
            return State.of(x + 1).chain(f)
        }

        assert.deepEqual(
            State.run(f(0), 0),
            { value: 10001, state: 0 })
    })

})