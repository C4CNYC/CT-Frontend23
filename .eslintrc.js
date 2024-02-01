const IMPORT_ORDER_CONFIG = {
  groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
  pathGroups: [
    {
      pattern: "react",
      group: "builtin",
      position: "before",
    },
    {
      pattern: "@/**",
      group: "internal",
    },
  ],
  pathGroupsExcludedImportTypes: ["react"],
  "newlines-between": "always",
  alphabetize: {
    order: "asc",
    caseInsensitive: true,
  },
};

module.exports = {
  extends: ["next", "prettier"],
  plugins: ["prettier", "unused-imports"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        jsxSingleQuote: false,
        singleAttributePerLine: false,
      },
      {
        usePrettierrc: true,
      },
    ],
    "import/order": ["warn", IMPORT_ORDER_CONFIG],
    "unused-imports/no-unused-imports": "warn",
    "react/no-unescaped-entities": ["off"],
    "react/display-name": ["off"],

    "@typescript-eslint/semi": 0,
    "@typescript-eslint/space-before-function-paren": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/comma-dangle": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/consistent-type-imports": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "no-useless-escape": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "multiline-ternary": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    quotes: [2, "double", { avoidEscape: true }],
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": ["error", { allow: [""] }],
  },
};
