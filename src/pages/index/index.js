/*
* Modules needed for the index-site:
*
* Above the fold:
* ===============
* - Header
* - Nav
* - Splash video
*
* Below the fold:
* ===============
* - Footer Nav
* - Footer
*/
require('bootstrap-loader')
console.log('Loaded Bootstrap')

$('body').addClass('loading') // TODO: Dev only, remove in real project
require('modules/header')()
console.log('Loaded module header')

console.log('Finished loading content above the fold')

require.ensure([
  './below-the-fold'
], function (require) {
  require('./below-the-fold')()
  console.log('Loaded everything below-the-fold')
}, 'below-the-fold')
