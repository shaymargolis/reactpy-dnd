import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import typescript from '@rollup/plugin-typescript';

import react from 'react';
import reactDom from 'react-dom';
import jsxRuntime from 'react/jsx-runtime';

export default {
  input: "src/index.tsx",
  output: {
    file: "../reactpy_dnd/bundle.js",
    format: "esm",
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react/jsx-runtime': Object.keys(jsxRuntime)
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  onwarn: function (warning) {
    if (warning.code === "THIS_IS_UNDEFINED") {
      // skip warning where `this` is undefined at the top level of a module
      return;
    }
    console.warn(warning.message);
  },
};
