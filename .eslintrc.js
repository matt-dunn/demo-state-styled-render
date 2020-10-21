module.exports =  {
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
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
        "@typescript-eslint/no-explicit-any": [0, {ignoreRestArgs: true}],
        "@typescript-eslint/explicit-module-boundary-types": 0,
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
