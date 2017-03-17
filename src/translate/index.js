if (!window.Intl) {
    window.Intl = require('intl'); // polyfill for `Intl` voor safari
    require('intl/locale-data/jsonp/en-US.js')
    require('intl/locale-data/jsonp/es.js')
}
var IntlRelativeFormat = window.IntlRelativeFormat  = require('intl-relativeformat');


 
module.exports={ 

  date: new IntlRelativeFormat('en-US')

//date = new IntlRelativeFormat('en-US')

}