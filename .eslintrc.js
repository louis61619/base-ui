module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
