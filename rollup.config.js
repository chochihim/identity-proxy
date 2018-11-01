import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/identity-proxy.js",
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/identity-proxy.module.js",
      format: "esm"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  }
];
