"use strict"
const Identity = require('akh.identity').type.identity
const StateT = require('../trans/state')

/**
 * State monad
 */
const State = StateT(Identity)

/**
 * Perform a state computation and return resulting value, state pair.
 * 
 * @param m State computation.
 * @param s Initial state.
 */
State.run = (m, s) =>
    Identity.run(StateT.run(m, s))

State.prototype.run = function(s) {
    return State.run(this, s)
}

/**
 * Perform a state computation and return resulting value.
 * 
 * @param m State computation.
 * @param s Initial state.
 */
State.eval = (m, s) => 
    Identity.run(StateT.eval(m, s))

State.prototype.eval = function(s) {
    return State.eval(this, s)
}

/**
 * Perform a state computation and return resulting state.
 * 
 * @param m State computation.
 * @param s Initial state.
 */
State.exec = (m, s) =>
    Identity.run(StateT.exec(m, s))

State.prototype.exec = function(s) {
    return State.exec(this, s)
}

module.exports = State
