/**
 * State monad transformer.
 * 
 * Value and state are stored in `{value, state}`.
 * 
 * This auto wraps the real state transformer in a `Codensity` and is stack safe.
 */
const spec = require('akh.core.spec')
const StateI = require('./statei')
const CodensityT = require('akh.codensity').CodensityT;
const StateMonad = require('../spec/state')

const CodensityProxy = (Instance, m) => {
    const X = CodensityT(Instance);
    StateMonad.tryLiftState(X, Instance);
    const xLift = X.lift
    X.lift = X.prototype.lift = x =>
        xLift(Instance.lift(x))
    X.inner = m
    spec.LiftInner(X, m, X.lift)
    return X
}

/**
 * State monad transformer.
 * 
 * @param m Base monad.
 */
const StateT = m =>
    CodensityProxy(StateI(m), m)

/* Running
 ******************************************************************************/
/**
 * Perform a stateful computation and return resulting value, state pair.
 * 
 * @param m StateT computation.
 * @param s Initial state.
 */
StateT.run = (m, s) =>
    StateI.run(
        CodensityT.run(m, m.inner.of),
        s)

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