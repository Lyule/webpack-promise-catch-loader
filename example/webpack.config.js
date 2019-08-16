const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'result.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, '../lib/index.js'),
            options: {
              catchCode: `
                console.log(error);
                fetch(\`https://example.com'/log?message=\${error.message}\`).then(() => {})
              `
            }
          }
        ]
      }
    ]
  }
}
