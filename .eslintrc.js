module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: `@typescript-eslint/parser`,
  plugins: [`@typescript-eslint`],
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
};
