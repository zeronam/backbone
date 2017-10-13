var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var BaseModel = require('./base_model');
module.exports = (function () {
	var ConditionModel = BaseModel.extend({
	});

	var ConditionListCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/admin/notification/get_condition_list",
		model: ConditionModel,
		initialize: function(){
			if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/notification/web/get_condition_list";
            }
		},
		parse: function(response) {
			return response.lstSaveCondition || response;
		}
	});
	
	return ConditionListCollection;

})();