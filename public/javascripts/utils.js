
var Organizations = Organizations || {};
(function(){
  'use strict';

  Organizations.Utils = {
    validateUrl: function(url) {
      if (!url) return;

      var re = /^(http|https):\/\//i;
      return re.test(url) ? url : 'http://' + url;
    }
  }
})();