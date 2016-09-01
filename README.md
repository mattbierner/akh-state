[Akh](https://github.com/mattbierner/akh) state monad

## API
The continuation transformer `ContT` layers state over a monad. The base type `State`, provides stateful computations its own.


## Api
The state transformer is a monad, monoid, functor, and applicative functor.

```
// Main State monad
require('akh.state').State
require('akh').State
require('akh').type.state

// State monad transformer
require('akh.state').StateT
require('akh').StateT
require('akh').trans.state
```

#### `State.run(m, s)`
Perform a stateful computation `m` with state `s` and return state, value pair.

```js
const State = require('akh.state').State

const c = State.of(1)
    .chain(x => State.modify(s => s + x))
    .chain(x => State.of('val'))

run(c, 's') // {'value': 'val', 'state': 's1'}
```

#### `State.eval(m, s)`
Perform a stateful computation `m` with state `s` and return the resulting value.

```js
State.eval(c, 's') // 'val'
```

#### `State.exec(m, s)`
Perform a stateful computation `m` with state `s` and return the resulting state.

```js
State.eval(c, 's') // 's'
```

#### `StateT.run(m, s)`
Same as `State.run` but for transformed types.

#### `StateT.evalT(m, s)`
Same as `State.eval` but for transformed types.

#### `StateT.exec(m, s)`
Same as `State.exec` but for transformed types.


## State Interface
All state operations and methods are defined on both the type and its instances.

#### `M.get`
Get the current state.


```js
const State = require('akh.state').State

State.get.run('my state') === { value: 'my state', state: 'my state' }
```

#### `M.put(s)`
Set the current state to `s`

#### `M.modify(f)`
Modify the current state with `f` that maps the current state to a new state.

