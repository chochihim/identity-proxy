import createIdentityProxy from "./index";

test("getting any property on the proxy returns itself", () => {
  const identityProxy = createIdentityProxy();
  identityProxy.foo.toBe(identityProxy);
});

test("executing the proxy returns itself", () => {
  const identityProxy = createIdentityProxy();
  expect(identityProxy()).toBe(identityProxy);
});

test("Accessing by index returns itself", () => {
  const identityProxy = createIdentityProxy();
  expect(identityProxy[0]).toBe(identityProxy);
});

test("all actions can be chained", () => {
  const identityProxy = createIdentityProxy();
  identityProxy.foo.bar().baz[0].toBe(identityProxy);
});

test("operations on number with the proxy return number", () => {
  const identityProxy = createIdentityProxy();
  expect(typeof (identityProxy * 1)).toBe("number");
  expect(typeof (identityProxy + 1)).toBe("number");
});

test("operations on string with the proxy return string", () => {
  const identityProxy = createIdentityProxy();
  expect(typeof `${identityProxy}`).toBe("string");
});

test("proxy's toPrimitive can be overried with desired result", () => {
  const toPrimitive = hint => {
    switch (hint) {
      case "number": {
        return 1;
      }
      case "string": {
        return "static";
      }
      default: {
        return null;
      }
    }
  };

  const identityProxy = createIdentityProxy({ toPrimitive });
  expect(identityProxy * 10).toBe(10);
  expect(`${identityProxy}`).toBe("static");
});
