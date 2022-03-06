module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  rules: {
    semi: "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useMyCustomHook|useMyOtherCustomHook)",
      },
    ],
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "import/order": [
      "error",
      {
        groups: [
          "index",
          "sibling",
          "parent",
          "internal",
          "external",
          "builtin",
          "object",
          "type",
        ],
        "newlines-between": "always",

        pathGroups: [
          {
            pattern: "next",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/lib/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/styles/components/*.module.scss",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/*.ts",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@src/utils/**",
            group: "internal",
            position: "before",
          },
        ],

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ["next"],
      },
    ],
  },
};
