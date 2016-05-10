module.exports = function () {
   // TODO: Dev only, remove in real project
  $('.loader').remove()
  $('body').removeClass('loading').addClass('ready')

  $('#webpack').append('<hr>')
  $('#webpack').append('this is below the fold')
  // END TODO: Dev only, remove in real project

  require('modules/social')()
  require('modules/footer')()
  console.log('Loaded footer.js')
}
