module.exports = {
    parser: "babel-eslint",
    "rules": {
        "babel/new-cap": 1,
        "babel/camelcase": 1,
        "babel/no-invalid-this": 1,
        "babel/object-curly-spacing": 1,
        "babel/quotes": 1,
        "babel/semi": 1,
        "babel/no-unused-expressions": 1,
        "babel/valid-typeof": 1
    },
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            globalReturn: false,
        },
        babelOptions: {
            configFile: "path/to/config.js",
        },
    },
    "plugins": [
        "babel"
    ],
};