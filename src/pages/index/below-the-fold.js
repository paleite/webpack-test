module.exports = function () {
   // TODO: Dev only, remove in real project
  $('.loader').remove()
  $('body').removeClass('loading').addClass('ready')

  console.log('loading index/below-the-fold.js')
  $('#webpack').append('<hr>')
  $('#webpack').append('this is below the fold')
  // END TODO: Dev only, remove in real project

  require('../../modules/footer')()
}
