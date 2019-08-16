const recast = require('recast')
const loaderUtils = require('loader-utils')

const t = recast.types.namedTypes
const {
  arrowFunctionExpression,
  blockStatement,
  callExpression,
  identifier,
  memberExpression
} = recast.types.builders

/**
 * @options catchCode
 */
function WebpackPromiseCatchLoader(source) {
  
  const options = loaderUtils.getOptions(this) || {}

  const ast = recast.parse(source, {
    parser: require('recast/parsers/babel')
  })

  recast.visit(ast, {
    visitCallExpression(path) {
      this.traverse(path)

      const { node } = path
      const nodeArguments = node.arguments
      const parentNode = path.parentPath.node 
      let firstExp
      nodeArguments.forEach(item => {
        if (t.ArrowFunctionExpression.check(item)) {
          firstExp = options.catchCode && recast.parse(options.catchCode).program.body || [item.body.body[0]] // 取then函数第一个表达式

          if (t.Identifier.check(node.callee.property) && node.callee.property.name === 'then') {
            if (t.Identifier.check(parentNode.property) && parentNode.property.name) return false

            const arrowFunc = arrowFunctionExpression([identifier('error')], blockStatement([...firstExp]))
            const catchFunc = callExpression(identifier('catch'), [arrowFunc])
            const newFunc = memberExpression(node, catchFunc)
            path.replace(newFunc)
          }
        }
      });
      return false
    }
  })

  return recast.print(ast).code
}

// const fs = require('fs')

// const code = 
// `promiseFun.then(() => {
//   this.isShowLoading = true
//   this.a = 1
// }).then((e) => {
//   this.isShowLoading = false
// })`

// fs.writeFileSync('recast-result.js', WebpackPromiseCatchLoader(code))
// fs.writeFileSync('recast.text', JSON.stringify(WebpackPromiseCatchLoader(code), null, ' '))

module.exports = WebpackPromiseCatchLoader
