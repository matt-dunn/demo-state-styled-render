module.exports =  {
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "header"
    ],
    env: {
        es6: true,
        browser: true,
        jest: true,
        node: true
    },
    parserOptions: {
        ecmaVersion:  2018,
        sourceType:  "module",
        ecmaFeatures:  {
            jsx:  true,
        },
    },
    extends:  [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    globals: {
        "NodeListOf": "readonly",
        "RecursivePartial": "readonly"
    },
    overrides: [
    ],
    settings: {
        "import/resolver": {
            typescript: {}
        },
    },
    rules:  {
        "header/header": [2, "block", [
            "* !",
            {pattern: / \* Copyright \(c\) \d{4}, .*/, template: ` * Copyright (c) ${new Date().getFullYear()}, Matt Dunn`},
            " *",
            " * @author Matt Dunn (https://matt-dunn.github.io/)",
            " * @licence MIT",
            " "
        ], 2],
        "@typescript-eslint/no-explicit-any": [0, {ignoreRestArgs: true}],
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unused-vars": [2, {varsIgnorePattern: "createElement|createFragment"}],
        "semi": 2,
        "semi-spacing": [2, {"before": false, "after": true}],
        "quotes": [2, "double", "avoid-escape"],
        "jsx-quotes": [1, "prefer-double"],
        "quote-props": 0,
        "prefer-const": 2,
        "no-var": 2,
        "import/extensions": [2, {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never",
        }]
    }
};
