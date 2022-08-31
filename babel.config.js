module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"],
    "env": {
        "rollup": {
            "plugins": ["@babel/plugin-external-helpers"]
        },
        "test": {
            "presets": ["@babel/preset-env"],
            "plugins": ["@babel/plugin-proposal-class-properties"]
        }
    }
}
