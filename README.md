# webpack-promise-catch-loader
> 根据 [promise-catch-loader](https://github.com/xuqiang521/promise-catch-loader) 修改而来

为你的promise添加catch。

具体使用方法查看下方example，或者 [example](https://github.com/Lyule/webpack-promise-catch-loader/example)

## options

#### catchCode 

自定义catch方法的函数参数的源代码

## example

```javascript
// webpack.config.js
const webpackPromiseCatchLoader = require('webpack-promise-catch-loader')

{
  test: /\.js$/,
  use: [
    {
      loader: webpackPromiseCatchLoader,
      options: {
        catchCode: `
          console.log(error) // 自动添加error参数
        `
      }
    }
  ]
}
```

#### Before

```javascript

// example 1
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
})


// example 2
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
}).then(res => {
  console.log(2, res)
})

// example 3
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
}).catch(error => {
  console.log(error)
})

```


#### After

```javascript
/* 0 */
/***/ (function(module, exports) {

// example 1
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
}).catch(error => {
  console.log(error);
  fetch(`https://example.com'/log?message=${error.message}`).then(() => {})
})


// example 2
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
}).then(res => {
  console.log(2, res)
}).catch(error => {
  console.log(error);
  fetch(`https://example.com'/log?message=${error.message}`).then(() => {})
})

// example 3
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
}).catch(error => {
  console.log(error)
})

/***/ })
```

