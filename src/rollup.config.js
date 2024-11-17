import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/biblezh.ts',
  output: {
    file: 'dist/biblezh.bundled.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({ babelHelpers: 'bundled' }),
    image({ dom: true }),
    terser()
  ]
};