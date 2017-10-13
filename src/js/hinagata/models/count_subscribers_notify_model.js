var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CountSubscribesModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/admin/notification/deliver_count",
		initialize: function(){
			if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/notification/web/deliver_count";
            }
		},
		parse: function(response) {
			return response;
		},
		fetchCountSubscribes: function(options) {
			var url = this.url + "?scid=" + this.scid;
			if(this.customSegment == true){
				url += "&customSegment=true";
			}
			var _options = _.extend( options || {}, { url: url } );
			return this.fetchWithAuthInfo( _options );
		},
		setCoditionId: function(id) {
			this.scid = id;
		},
		setConditionName: function(conditionName) {
			this.conditionName = conditionName;
		},
		getConditionName: function() {
			return this.conditionName;
		},
		setCustomSegment: function(customSegment) {
			this.customSegment = customSegment;
		},
		setSegmentDetail: function(segmentDetail) {
			this.segmentDetail = segmentDetail;
		},
		fetchCountSubscribesCustom: function(options) {
			var url = AppConf.url.appRoot + "/admin/notification/deliver_count_custom" + "?segmentId=" + this.segmentDetail.segmentId;
			var _options = _.extend( options || {}, { url: url } );
			return this.fetchWithAuthInfo( _options );
		},
	});
	
	return CountSubscribesModel;

})();