var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var BaseModel = require('./base_model');
module.exports = (function () {
	var ConditionModel = BaseModel.extend({
	});

	var ConditionListCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/admin/workflow/condition/list",
		model: ConditionModel,
		initialize: function(){
			// if (AppConf.mail.webFlag || AppConf.coupon.webFlag) {
            //     this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/list";
            // }

			if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/list";
            }
		},
		parse: function(response) {
			return response.listConditions || response;
		}
	});
	
	return ConditionListCollection;

})();