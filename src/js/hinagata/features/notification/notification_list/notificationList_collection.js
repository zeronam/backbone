var Backbone = require('backbone');
var PushNotificationModel = require('./notificationList_model.js');
var BaseCollection = require('../../../models/base_collection.js');
module.exports = (function () {
	var PushNotificationCollection = BaseCollection.extend({
		model: PushNotificationModel,
		url: AppConf.url.appRoot + "/admin/notification/list",
	    parse: function(response) {
	    	return response.lstAdminNotification || response;
	    },
	    fetchListMessage: function(options) {
    	if(AppConf.webConf.webFlag){
			this.url = AppConf.url.appRoot + "/admin/notification/web/list";
		}
    	var _options = _.extend( options || {}, { url: this.url + "?status=" + ((this.type != null) ? this.type : "") } );
		return this.fetchWithAuthInfo( _options );
	    },
	    setType: function (type) {
	    	this.type = type;
	    },
	    setNotificationId: function(notificationId) {
	    	this.notificationId = notificationId;
	    },
	    getNotificationId: function() {
	    	return this.notificationId;
	    },
	    searchListMessage:function(keywordSearch){
	    	if (keywordSearch === "") {
	    		return this;
	    	} else {
	    		return _(this.filter(function(data){
	          	var pattern = new RegExp(keywordSearch,"gi");
	    			return pattern.test(data.get("title"));
	    		}));
	    	}
    	}
	});

	return PushNotificationCollection;

})();
