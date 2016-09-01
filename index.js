"use strict"
const stateT = require('./trans/state')
const state = require('./type/state')

module.exports = {
    StateT: stateT,
    State: state,

    trans: { state: stateT },
    type: { state: state }
}
