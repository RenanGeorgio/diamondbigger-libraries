import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json' assert {type: 'json'};

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ devMode ? 'development' : 'production' } mode bundle`);

function isDev() {
  return devMode;
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    onwarn(warning, warn) {
      if ((!devMode) && (warning.code === 'MODULE_LEVEL_DIRECTIVE')) {
        return
      }
      warn(warning)
    },
    external: [
      '@mui/material',
      'clsx',
      'react-icons',
      'react-wrap-balancer',
      'react-cookie'
    ],
    plugins: [
      commonjs(),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      isDev() ? terser() : null
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()]
  }
];