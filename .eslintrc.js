module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off'
  },
  extends: ['react-app', 'react-app/jest', 'prettier']
}
