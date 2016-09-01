/**
 * State monad transformer.
 * 
 * Value and state are stored in Pairs of `{value, state}`.
 * 
 * This is not stack safe on its own, large computations will blow up the stack.
 * Wrap in Codensity for stack safety: `Codensity (StateT M)`. `akh::trans::state`
 * automatically does this but will degrade performance if this behavior is not required.
 */
const spec = require('akh.core.spec')
const map = require('akh.core').map
const StateMonad = require('../spec/state')

/**
 * Value, state pair.
 */ 
var Pair = (value, state) => ({ value, state })

/* Transformer
 ******************************************************************************/
var runStateT = (m, s) =>
    m._run(s)

/**
 * State monad transformer.
 * 
 * @param m Base monad.
 */
StateT = (m) => {
    var Instance = function(run) {
        this._run = run
    }

    spec.Monad(Instance,
        x =>
            new Instance(s =>
                m.of(Pair(x, s))),
        
        function(f) {
            return new Instance(s =>
                runStateT(this, s).chain(x =>
                    runStateT(f(x.value), x.state)))
        })
    
    spec.Monoid(Instance,
        new Instance(_ => m.zero),
        
        function(b) {
            return new Instance(s =>
                runStateT(this, s).concat(runStateT(b, s)))
        })
    
    spec.Transformer(Instance, m,
        t =>
            new Instance(s =>
                t.chain(x => m.of(Pair(x, s)))))
    
    StateMonad(Instance,
        new Instance(s =>
            m.of(Pair(s, s))),
        
        s =>
            new Instance(_ =>
                m.of(Pair(s, s))))
    
    Instance.prototype.run = function(s) {
        return StateT.run(m, s)
    }

    return Instance
}

/* Running
 ******************************************************************************/
/**
 * Perform a stateful computation and return resulting value, state pair.
 * 
 * @param m StateT computation.
 * @param s Initial state.
 */
StateT.run = runStateT

/**
 * Perform a stateful computation and return resulting value.
 * 
 * @param m StateT computation.
 * @param s Initial state.
 */
StateT.eval = (m, s) =>
    StateT.run(m, s).map(x => x.value)

/**
 * Perform a stateful computation and return resulting state.
 * 
 * @param m StateT computation.
 * @param s Initial state.
 */
StateT.exec = (m, s) =>
    StateT.run(m, s).map(x => x.state)

module.exports = StateT