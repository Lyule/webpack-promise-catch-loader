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