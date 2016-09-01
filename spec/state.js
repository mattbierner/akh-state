"use strict"

const StateMonad = (Instance, get, put) => {
    /**
     * M.get
     * 
     * Return the current state.
     */
    Instance.get = Instance.prototype.get = get
    
    /**
     * M.put(s)
     * 
     * Set the current state to `s`.
     */
    Instance.put = Instance.prototype.put = put
    
    /**
     * M.modify(f)
     * 
     * Map the current state to a new state with function `f`.
     */
    Instance.modify = Instance.prototype.modify = (f) =>
        get.chain(x => put(f(x)))

    return Instance
}

/**
 * Try to autolift the state operations from `m` to `Instance`.
 */
StateMonad.tryLiftState = (Instance, m) => {
    if (m.get && m.put) {
        const lift = Instance.lift // capture
        StateMonad(Instance,
            lift(m.get),
            x => lift(m.put(x)))
    }
}

module.exports = StateMonad