module.exports = function () {
  require('./header.scss')
  console.log('Loaded header.scss')
  require('../nav')()
  console.log('Loaded nav')
}
