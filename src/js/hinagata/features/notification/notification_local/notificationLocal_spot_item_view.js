var Backbone = require('backbone');
var moment = require('moment');

module.exports = (function () {
	var notificationContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./notificationLocal_spot_item_template.html'),
		templateHelpers: function() {
			var _this = this;
			return{
				getText: function(text) {
					return App.appModel.getLanguageType().notification.local[text];
				},
				getRequired: function() {
			        return App.appModel.getLanguageType().common.required;
		      	},
		      	getSpotId: function(){
		      		if(_this.model.get("spotId")){
		      			return _this.model.get("spotId");
		      		} else{
		      			return "";
		      		}
		      	}
			}
			
		},
		// modelEvents: {
	 //    	"change": "modelChanged"
	 //  	},
		// modelChanged: function() {	
		// 	var el = $(".form-control").get(0);
		//     var elemLen = el.value.length;
		//     el.selectionStart = elemLen;
		//     el.selectionEnd = elemLen;
		//     el.focus();		
		// }
	});

	return notificationContentItemView;

})();