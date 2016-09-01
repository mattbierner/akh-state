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
State.run = function(m, s) {
    return Identity.run(StateT.run(m, s));
}

/**
 * Perform a state computation and return resulting value.
 * 
 * @param m State computation.
 * @param s Initial state.
 */
State.eval = function(m, s) {
    return Identity.run(StateT.eval(m, s));
}

/**
 * Perform a state computation and return resulting state.
 * 
 * @param m State computation.
 * @param s Initial state.
 */
State.exec = function(m, s) {
    return Identity.run(StateT.exec(m, s));
}

module.exports = State
