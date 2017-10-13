var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CountSubscribesModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/admin/workflow/condition/count",
		parse: function(response) {
			return response;
		},
		initialize: function(){
			
		},
		fetchCountSubscribes: function(options) {
			// if (AppConf.mail.webFlag || AppConf.coupon.webFlag) {
            //     this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/count";
			// 	if(AppConf.mail.segmentId || AppConf.coupon.segmentId){
			// 		this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/countCustom";
			// 	}
            // }else if(AppConf.mail.segmentId || AppConf.coupon.segmentId){
			// 	this.url = AppConf.url.appRoot + "/admin/workflow/condition/countCustom";
			// }

			if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/count";
				if(AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl){
					this.url = AppConf.url.appRoot + "/admin/workflow/condition/web/countCustom";
				}
            }else if(AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl){
				this.url = AppConf.url.appRoot + "/admin/workflow/condition/countCustom";
			}
			/*
			appType: mail = 10, coupon =11
			 */
			var _options = _.extend( options || {}, { url: this.url + "?id=" + this.conditionId + "&appType=" + this.appType } );
			// if(AppConf.mail.segmentId){
			// 	_options.url += "&segmentId=" + AppConf.mail.segmentId;
			// }
			// if(AppConf.coupon.segmentId){
			// 	_options.url += "&segmentId=" + AppConf.coupon.segmentId;
			// }

			if(AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl){
				_options.url += "&segmentId=" + (AppConf.webConf.segmentId ? AppConf.webConf.segmentId : AppConf.webConf.segmentIdFromUrl);
			}
			return this.fetchWithAuthInfo( _options );
		},
		setCoditionId: function(id) {
			this.conditionId = id;
		},
		setAppType: function(appType) {
			this.appType = appType;
		},
		setConditionName: function(conditionName) {
			this.conditionName = conditionName;
		},
		getConditionName: function() {
			return this.conditionName;
		}
	});
	
	return CountSubscribesModel;

})();