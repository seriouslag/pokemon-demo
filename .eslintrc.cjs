/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    impliedStrict: true,
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  'plugins': ['react', '@typescript-eslint'],
  'rules': {
    'eol-last': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }]
  },
};
