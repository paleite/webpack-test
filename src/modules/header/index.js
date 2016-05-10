module.exports = function () {
  require('./header.scss')
  console.log('Loaded header.scss')
  require('modules/nav')()
  require('modules/search')()
  console.log('Loaded nav')
}
