import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import styles from 'rollup-plugin-styles';
import sass from 'sass';
import autoprefixer from 'autoprefixer';
//import svgr from '@svgr/rollup';

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
      'clsx',
      'react-wrap-balancer',
      'react-cookie'
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(/*{
        include: 'node_modules/**',
        namedExports: {
          'react-is': ['isForwardRef', 'isValidElementType']
        }
      }*/),
      resolve(),
      /*babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        plugins: ['external-helpers']
      }),*/
      typescript({
        tsconfig: './tsconfig.json'
      }),
      //styles(),
      styles(
        {
          processor: () => postcss([autoprefixer]),
          extensions: ['.scss','.css'],
          autoModules: true,
          use: ['sass'],
          preprocessor: (content, id) => new Promise((res) => {
            const result = sass.renderSync({ file: id })
    
            res({ code: result.css.toString() })
          }),
          plugins: [autoprefixer],
          modules: {
            scopeBehaviour: 'global',
          },
          sourceMap: true,
          extract: true,
        }
      ),
      //svgr(),
      isDev() ? terser() : null
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];