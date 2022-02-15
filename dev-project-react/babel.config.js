const path = require('path')
function resolve (dir) {
    return path.join(__dirname,  dir)
}

module.exports = {
    overrides: [
        {
            test (filename) {
                // The files in the following paths are compiled with React's jsx
                if (filename && filename.startsWith(resolve('../src'))) return filename
            },
            plugins: [
                // Compile with React's jsx
                'transform-react-jsx'
            ]
        }
    ]
}
