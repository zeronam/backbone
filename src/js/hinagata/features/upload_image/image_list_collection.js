var Backbone = require('backbone');
var BaseCollection = require('../../models/base_collection.js');
var ImageListModel = require('./image_list_model.js');
module.exports = (function () {
	var ImageListCollection = BaseCollection.extend({
		model: ImageListModel,
	  	url: AppConf.url.appRoot + "/admin/workflow/image/list",
	  	initialize: function(options) {
            // this.categoryId = "";
			// this.keyword = "";
            // // this.pageString = options.page;
			// this.perPageString = options.perPage;
			// this.orderColumn = "name";

			// if (AppConf.mail.webFlag || AppConf.coupon.webFlag || AppConf.notification.webFlag) {
			// 	this.url = AppConf.url.appRoot + "/admin/workflow/image/web/list";
			// }

			if (AppConf.webConf.webFlag) {
				this.url = AppConf.url.appRoot + "/admin/workflow/image/web/list";
			}
	    },
	    parse: function(response) {
	    	return response.images || response;
	    },
	    fetchImageList: function(options){
			var _options = _.extend( options || {}, { url: (options.url ? options.url : this.url) + "?categoryId=" + this.categoryId + "&keyword=" + this.keyword + "&perPage=" + this.perPageString + "&orderColumn=" + this.orderColumn + "&orderType=0"} );
			return this.fetchWithAuthInfo( _options );
	    },
    	setCategoryId: function(categoryId) {
    		this.categoryId = categoryId;
    	},
    	setKeyword: function(keyword) {
    		this.keyword = keyword;
    	},
    	setPage: function(page) {
    		this.pageString = page;
    	},
        getPage: function() {
            return this.pageString;
        },
    	setPerPage: function(perPage) {
    		this.perPageString = perPage;
    	},
        getPerPage: function() {
            return this.perPageString;
        },
    	setOrderColumn: function(order) {
    		if ( order === 0 ) {
    			this.orderColumn = "name";
    		} else if ( order === 1 ) {
    			this.orderColumn = "datetime";
    		} else {
                this.orderColumn = "name";
            }
    	}
  	});

  	return ImageListCollection;
  
})();