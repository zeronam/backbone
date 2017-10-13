var Backbone = require('backbone');
var BaseCollection = require('../../../models/base_collection.js');
var MessageHistoryModel = require('./message_history_model.js');
module.exports = (function () {
	var MessageHistoryCollection = BaseCollection.extend({
	  	model: MessageHistoryModel,
	  	url: AppConf.url.appRoot + "/admin/workflow/mail/approval_history",
	    parse: function(response) {
	    	return response.comments || response;
	    },
	    fetchHistory: function(options){
			// if (AppConf.mail.webFlag) {
            //     this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/approval_history";
            // }

			if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/workflow/mail/web/approval_history";
            }
			var _options = _.extend( options || {}, { url: this.url + "?id=" + this.id} );
			return this.fetchWithAuthInfo( _options );
	    },
	    setId: function (id) {
	    	this.id = id;
	    },
	    getId: function() {
	    	return this.id;
	    },
	    searchListHistory:function(keywordSearch){
	    	if (keywordSearch === "") {
	    		return this;
	    	}else {
	    		return _(this.filter(function(data){
	          	var pattern = new RegExp(keywordSearch,"gi");
	    			return pattern.test(data.get("comment"));
	    		}));
	    	}
    	}
  	});

  	return MessageHistoryCollection;
  
})();