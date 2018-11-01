# Identity Proxy

Proxy that is kind of an identity element.

## Installation

`npm install --save identity-proxy`

## Motivation

In a React project, I want to make a higher order component to accomplish following task:

```js
import React from "react";
import { connect } from "react-redux";

function withSubscription(
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
) {
  class WithSubscription extends React.Component {
    componentDidMount() {
      // for each prop injected by connect from mapDispatchToProps (someAction),
      // someAction();
    }

    componentDidUpdate(prevProps) {
      // for each prop injected by connect from mapStateToProps (someState),
      // if (prevProps.someState != this.props.someState) {
      //   someAction(someState);
      // }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithSubscription);
}
```

I wonder how to get the name of `someAction` and `someState` without explicitly provided an array of name strings. `mapDispatchToProps` is usually an object, so `someAction` can be easily retrieved by using `Object.keys(mapDispatchToProps)`. But `mapStateToProps` is a function. How can I get the keys of the return object? My answer is this package.

## Usage

Any action acting on the proxy will return the proxy itself.

```js
import createIdentityProxy from "identity-proxy";

const identityProxy = createIdentityProxy();

const foo = identityProxy.foo;
const bar = identityProxy();

console.log(foo === identityProxy); // true
console.log(bar === identityProxy); // true
console.log(foo === bar); // true
```

With the above behaviour, my original question can be answered:

```js
const mapStateToProps = state => ({
  bar: state.foo.bar,
  baz: state.foo.baz
});

const identityProxy = createIdentityProxy();

console.log(Object.keys(mapStateToProps(identityProxy))); // ['bar', 'baz']
```

The implementation of the function `mapStateToProps` does not matter.
What's more, type can be perserved upon operation on a primitive type:

```js
const identityProxy = createIdentityProxy();
console.log(typeof (identityProxy * 1 - 1 + 1)); // 'number'
console.log(typeof `${identityProxy}`); // 'string'
```

The goal of all the above behaviours is to not break any function executed with the `identityProxy` arguments.

## Remark

This package relies on `Proxy` and `Symbol.toPrimitive`. Need to use suitable polyfills to target old browsers.
