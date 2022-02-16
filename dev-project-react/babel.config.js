const path = require('path')
function resolve (dir) {
    return path.join(__dirname,  dir)
}

module.exports = {
    overrides: [
        {
            test (filename) {
                // The files in the following paths are compiled with React's jsx
                // Open React JSX's compiling capability to the 'src' directory of the parent project
                if (filename && filename.startsWith(resolve('../src'))) return filename
            },
            presets: [
                [
                    'babel-preset-react-app'
                ],
            ]
        }
    ]
}
