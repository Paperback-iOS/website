const config = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.cjs', '.prettierrc.cjs', '.lintstagedrc.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },
  plugins: ['@typescript-eslint', 'vue'],
  ignorePatterns: ['!**/*'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Layout'],
      },
    ],
  },
}

module.exports = config
