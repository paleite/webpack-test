require('bootstrap-loader')

$('body').addClass('loading') // TODO: Dev only, remove in real project
require('../../modules/header')()

require.ensure([
  './below-the-fold'
], function (require) {
  console.log('Now Ill just load everything else that we will need') // TODO: Dev only, remove in real project
  require('./below-the-fold')()
}, 'below-the-fold')
