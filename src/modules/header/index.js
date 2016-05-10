module.exports = function () {
  require('./header.scss')
  console.log('Loaded SCSS header.scss')
  require('modules/nav')()
  console.log('Loaded module nav')
  require('modules/search')()
  console.log('Loaded module search')
}
