var Backbone = require('backbone');
module.exports = (function() {
	var TokenModel = Backbone.Model.extend({
		urlRoot: AppConf.url.appRoot + "/token/get",
		fetchToken: function(options) {
			var _options = options || {};
			return this.fetch(_options);
	  	}
  });

  return TokenModel;
  	
})();