module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "prettier",
    "plugin:react/recommended",
    "standard-with-typescript"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"]
  },
  plugins: [
    "react"
  ],
  rules: {
    "@typescript-eslint/parser": 0,
        "@typescript-eslint/semi": 0,
        "@typescript-eslint/space-before-function-paren": 0,
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/comma-dangle": 0,
        "react/react-in-jsx-scope": 0,
        "@typescript-eslint/consistent-type-imports": 0,
        "@typescript-eslint/no-misused-promises": 0,
        "@typescript-eslint/consistent-type-definitions": 1,
        "@typescript-eslint/naming-convention": 1,
        "no-useless-escape": 0,
        "react/no-unescaped-entities": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/quotes": [2, "double", { "avoidEscape": true }],
        "@typescript-eslint/restrict-template-expressions": 0,
        "multiline-ternary": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/restrict-plus-operands": 1,
        "quotes": [2, "double", { "avoidEscape": true }],
        "@typescript-eslint/indent": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": ["error", {"allow": [""]}]
  }
}
