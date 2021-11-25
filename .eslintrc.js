/* !minOnSave */

module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ["./tsconfig.json"]
  },
  "plugins": [
    "@typescript-eslint",
    "unicorn"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxEOF": 1
    }],
    "no-prototype-builtins": "off",
    "padded-blocks": "off",
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "quote-props": ["error", "always"],

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "semi",
        "requireLast": true
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      }
    }],
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/quotes": ["error", "double"]
  }
};
