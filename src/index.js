function zero(hint) {
  switch (hint) {
    case "number": {
      return 0;
    }
    case "string": {
      return "";
    }
    default: {
      return null;
    }
  }
}

export default function createIdentityProxy({ toPrimitive = zero } = {}) {
  const identityProxy = new Proxy(() => {}, {
    get(target, prop, receiver) {
      if (typeof prop === "symbol") {
        // prop should be Symbol(Symbol.toPrimitive)
        return toPrimitive;
      }

      return receiver;
    },
    apply() {
      return identityProxy;
    }
  });

  return identityProxy;
}
