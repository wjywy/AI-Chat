import js from '@eslint/js'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser }
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      import: pluginImport,
      'unused-imports': unusedImports
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        espree: ['.js', '.cjs', '.mjs', '.jsx']
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './packages/*/tsconfig.app.json']
        }
      }
    },
    rules: {
      // 导入排序规则
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js内置模块
            'external', // 第三方模块
            'internal', // 内部模块
            'parent', // 父级目录导入
            'sibling', // 同级目录导入
            'index', // 当前目录导入
            'object', // 对象导入
            'type' // 类型导入
          ],
          'newlines-between': 'always', // 不同组之间空行
          alphabetize: {
            order: 'asc', // 按字母顺序排序
            caseInsensitive: true // 忽略大小写
          }
        }
      ],

      // 未使用的导入检测规则
      '@typescript-eslint/no-unused-vars': 'off', // 关闭原有的未使用变量检测
      'unused-imports/no-unused-imports': 'error', // 检测未使用的导入
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    ignores: ['.trunk/**/*']
  }
]
