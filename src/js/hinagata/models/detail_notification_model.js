var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function() {
	var DetailNotificationModel = BaseModel.extend({
		idAttribute: "notificationId",
		url: AppConf.url.appRoot + "/admin/notification/detail",
		initialize: function() {
			if (AppConf.webConf.webFlag) {
				this.url = AppConf.url.appRoot + "/admin/notification/web/detail";
			}
		},
	  	parse: function(response) {
	    	return response;
	    },
	    fetchDetailNotification: function(options){
			var _options = _.extend( options || {}, { url: this.url + "?notificationId=" + this.get("notificationId")} );
			return this.fetchWithAuthInfo( _options );
	    }
  });

  return DetailNotificationModel;
  	
})();