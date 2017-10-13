var Backbone = require('backbone');
var moment = require('moment');

module.exports = (function () {
	var notificationContentItemView = Backbone.Marionette.ItemView.extend({
		template: require('./notificationCondition_item_template.html'),
		templateHelpers: {
			getText: function(text) {
				return App.appModel.getLanguageType().notification.condition[text];
			},
			getRequired: function() {
				return App.appModel.getLanguageType().common.required;
			},
			getNowDate: function(flg){
		        var today = moment(new Date());
						var startDate = today.format("YYYY/MM/DD 00:00");
						var endDate = today.add(1, 'd').format("YYYY/MM/DD 00:00");
		        if ( flg === "start" ) {
		          return startDate;
		        } else if ( "end" ) {
		          return endDate;
		        } else {
		          return moment(new Date()).format("YYYY/MM/DD HH:mm");
		        }
	      	},
			convertDate: function( date, format ) {
				if( format ){
					return moment(date).format(format);
				} else {
		        	return App.util.date.convertDate(date, "YYYY/MM/DD HH:mm");
				}
	      	},
		}
	});

	return notificationContentItemView;

})();