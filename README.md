[Akh](https://github.com/mattbierner/akh) state monad

The `StateT` monad transformer add state to a monad. The base type `State` provides state on its own.

```bash
# To use as standalone package
$ npm install --save akh.state

# To use as part of akh library
$ npm install --save akh
```

## Api
`StateT` and `State` implement the Fantasy Land][fl] monad, monoid, functor, and applicative functor interfaces.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// State monad
require('akh.state').State
require('akh').State

// State monad transformer
require('akh.state').StateT
require('akh').StateT
```

#### `State.run(m, s)`, `m.run(s)`
Perform a stateful computation `m` with state `s` and return state, value pair.

```js
const State = require('akh.state').State

const c = State.of(1)
    .chain(x => State.modify(s => s + x))
    .chain(x => State.of('val'))

run(c, 's') === {'value': 'val', 'state': 's1'}
```

#### `State.eval(m, s)`, `m.eval(s)`
Perform a stateful computation `m` with state `s` and return the resulting value.

```js
State.eval(c, 's') === 'val'
```

#### `State.exec(m, s)`, `m.exe(s)`
Perform a stateful computation `m` with state `s` and return the resulting state.

```js
State.eval(c, 's') == 's'
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


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-state
$ npm install # install dev packages
$ npm test # run tests
```

[fl]: https://github.com/fantasyland/fantasy-land
