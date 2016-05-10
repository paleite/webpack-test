module.exports = function () {
  require('./header.scss')
  console.log('Loaded SCSS header.scss')
  require('modules/nav')()
  require('modules/search')()
  console.log('Loaded module nav')
}
