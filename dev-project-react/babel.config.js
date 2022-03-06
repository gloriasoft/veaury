const path = require('path')
function resolve (dir) {
    return path.join(__dirname,  dir)
}

module.exports = {
    // for dev only
    // overrides: [
    //     {
    //         test:function(filename) {
    //             if (filename?.startsWith(resolve('../src'))) return filename
    //         },
    //         plugins: [
    //             'transform-react-jsx'
    //         ]
    //     }
    // ]
}
