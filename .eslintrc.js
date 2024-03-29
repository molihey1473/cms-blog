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
    "import/ignore": ["src/styles/globals.scss"],
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
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "import/no-unresolved": [2, { ignore: ["\\.json$", "@src/"] }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "next",
            group: "internal",
            position: "before",
          },
          { pattern: "next/**", group: "internal", position: "before" },

          { pattern: "react", group: "internal", position: "before" },
          { pattern: "dayjs", group: "internal", position: "before" },
          {
            pattern: ".contents/*.json",
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
            pattern: "@src/types/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/utils/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@src/styles/components/**/*.module.scss",
            group: "index",
            position: "before",
          },
        ],

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
        pathGroupsExcludedImportTypes: [
          "builtin",
          "next",
          "next/**",
          "react",
          "dayjs",
          "twemoji",
        ],
      },
    ],
  },
};
