const path = require('path')
function resolve (dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  presets: [
    // vue的plugin包
    '@vue/cli-plugin-babel/preset'
  ],
  // 使用overrides是为了分开配置jsx的解析规则，在react_app里使用react的规则解析，其他使用vue的规则
  overrides: [
    {
      // 这里如果不用函数，会出现报错的情况，还没找到原因
      // babel会提示Configuration contains string/RegExp pattern, but no filename was passed to Babel
      // 因为filename不存在，如果不存在就必须通过回调返回一个undefined
      test:function(filename) {
        // 仅对src/react_app目录有效
        if (filename !== undefined && filename.indexOf(resolve('src/react_app')) === 0) return filename
        if (filename !== undefined && filename.indexOf(resolve('../src')) === 0) {
          console.log('XXXXXXX', filename)
          return filename
        }
      },
      plugins: [
        // 使用react的jsx编译
        'transform-react-jsx'
      ],
      presets: [
        ['@vue/cli-plugin-babel/preset', {
          // 关闭vue的jsx编译
          jsx: false
        }]
      ]
    }
  ]
}
