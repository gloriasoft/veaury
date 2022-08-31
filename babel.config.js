const path = require('path')
function resolve (dir) {
    return path.join(__dirname,  dir)
}

module.exports = {
    // for dev only
    overrides: [
        {
            test:function(filename) {
                if (filename?.startsWith(resolve('../src'))) return filename
            },
            presets: [
                'babel-preset-react-app'
            ]
        }
    ]
}
