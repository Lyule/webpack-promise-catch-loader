# webpack-promise-catch-loader

```javascript
const webpackPromiseCatchLoader = require('webpack-promise-catch-loader')

{
  test: /\.js$/,
  use: [
    {
      loader: webpackPromiseCatchLoader,
      options: {
        type: 'deep',
        options: {
          catchCode: `
            console.log(error) // 自动添加error参数
          `
        }
      }
    }
  ]
}
```

