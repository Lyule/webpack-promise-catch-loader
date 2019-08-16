const recast = require('recast')
// const fs = require('fs')
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
  const options = loaderUtils.getOptions(this)

  const ast = recast.parse(source, {
    parser: require('recast/parsers/babel')
  })

  recast.visit(ast, {
    visitCallExpression(callExpAst) {
      const { node } = callExpAst
      const nodeArguments = node.arguments 
      let firstExp
      nodeArguments.forEach(item => {
        if (t.ArrowFunctionExpression.check(item)) {
          firstExp = options.catchCode && recast.parse(options.catchCode).program.body || [item.body.body[0]] // 取then函数第一个表达式

          if (
            t.Identifier.check(node.callee.property) &&
            node.callee.property.name === 'then'
          ) {
            const arrowFunc = arrowFunctionExpression([identifier('error')], blockStatement([...firstExp]))
            const catchFunc = callExpression(identifier('catch'), [arrowFunc])
            const newFunc = memberExpression(node, catchFunc)
            callExpAst.replace(newFunc)
          }
        }
      });
      return false
    }
  })

  return recast.print(ast).code
}

// const code = 
// `promiseFun.then(() => {
//   this.isShowLoading = true
//   this.a = 1
// }).then((e) => {
//   this.isShowLoading = false
// }).catch(err => {
//   console.log(err)
// })`

// fs.writeFileSync('recast-result.js', recast.print(WebpackPromiseCatchLoader(code)).code)
// fs.writeFileSync('recast.text', JSON.stringify(WebpackPromiseCatchLoader(code), null, ' '))

module.exports = WebpackPromiseCatchLoader
