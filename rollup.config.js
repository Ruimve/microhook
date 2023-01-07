import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
export default {
  input: "src/index.ts",
  output: {
    file:'es/index.js',
    format:'es'
  },
  external: ['react', 'lodash'],
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs()
  ]
}