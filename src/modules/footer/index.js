module.exports = function () {
  require('./footer.scss')
  console.log('Loaded SCSS footer.scss')

  $('footer img').hide().attr('src', require('./twitter.svg')).fadeIn(300)
}
