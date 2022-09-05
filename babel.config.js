function vueJsxInclude(filename) {
    if (filename.match(/[/\\]node_modules[\\/$]+/)) return
    if (filename.match(/\.(vue|vue\.js)$/i) && filename.match(/dev-project-/)){
        return filename
    }
    if (filename.match(/[/\\]vue_app[\\/$]+/)) return filename
}

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
    },
    overrides: [
        {
            test: vueJsxInclude,
            plugins: ['@vue/babel-plugin-jsx']
        }
    ]
}
