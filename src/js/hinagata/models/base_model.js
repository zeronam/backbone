var Backbone = require('backbone');
module.exports = (function () {
	var BaseModel = Backbone.Model.extend({
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR }); 
			var on401 = _options.on401 || function() {
				App.dialogueCommon.setType("notLogin");
	            };
			var on403 = _options.on403 || function(){};

			return this.fetch(_options)
			.fail(function(res) {
				if( res.status === 401 ) {
					on401();
				} else {
					on403();
				}
			});
		},
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this.fetch(_options);
		},
		fetchWithSessionId: function(options){
			return this.fetch(options);
		}
	});
	return BaseModel;
})();
