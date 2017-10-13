var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
var BaseCollection = require('../models/base_collection.js');
module.exports = (function () {
	var MainNavCollection = BaseCollection.extend({
		model: MainNavModel,
		url: AppConf.url.appRoot + "/admin/workflow/mail/list",
	    parse: function(response) {
	    	return response.authmailList || response;
	    },
	    fetchListMessage: function(options) {
			// if(AppConf.mail.webFlag){
			// 	this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/list";
			// }

			if(AppConf.webConf.webFlag){
				this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/list";
			}
	    	var _options = _.extend( options || {}, { url: this.url + "?type=" + this.type } );
			return this.fetchWithAuthInfo( _options );
	    },
	    setType: function (type) {
	    	this.type = type;
	    },
	    setAuthMailId: function(authMailId) {
	    	this.authMailId = authMailId;
	    },
	    getAuthMailId: function() {
	    	return this.authMailId;
	    },
	    searchListMessage:function(keywordSearch){
	    	if (keywordSearch === "") {
	    		return this;
	    	} else {
	    		return _(this.filter(function(data){
	          	var pattern = new RegExp(keywordSearch,"gi");
	    			return pattern.test(data.get("name"));
	    		}));
	    	}
    	}
	});

	return MainNavCollection;

})();
