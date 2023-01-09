import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

module.exports = [
  {
    input: "src/index.ts",
    output: {
      file: pkg.main,
      format: 'es'
    },
    external: ['react', 'lodash'],
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: {
          declaration: false
        }
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "src/index.ts",
    output: {
      file: pkg.types,
      format: 'es'
    },
    external: ['react', 'lodash'],
    plugins: [
      typescript()
    ]
  }
]