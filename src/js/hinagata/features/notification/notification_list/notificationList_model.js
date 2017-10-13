var Backbone = require('backbone');
module.exports = (function () {
	var PushNotificationModel = Backbone.Model.extend({
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			// getDelivCount: {
			// 	get: function() {
			// 		return this.getDeliv();
			// 	}
			// },
			// getStatusMail: {
			// 	get: function() {
			// 		return this.getStatus();
			// 	}
			// },
			// getAllFlg: {
			// 	get: function() {
			// 		return this.getAll();
			// 	}
			// }
		},
		getDeliv: function() {
			var status = this.get("status");
			var dsStatus = this.get("dsStatus");
			var delivCount = this.get("delivCount");
			if ( status === 9 && dsStatus === 3 ) {
				return delivCount;
			} else {
				if ( delivCount <= 0 ) {
					return "-";
				} else {
					return delivCount;
				}
			}
		},
		getStatus: function() {
			var status = this.get("status");
			var dsStatus = this.get("dsStatus");
			var regisStatus = this.get("regisStatus");
			var delivStop = this.get("delivStop");
			
			if ( status === 9 && dsStatus === 3 ) {
				return 1;
			} else if ( status === 9 && dsStatus !== 3 && delivStop === 0 ) {
				return 2;
			} else if ( status === 9 && dsStatus !== 3 && delivStop === 1 ) {
				return 3;
			} else if ( status === 0 ) {
				return 4;
			} else if ( status !== 0 && status !== 9 && status === regisStatus ) {
				return 5;
			} else {
				return 6;
			}
		},
		getAll: function() {
			if ( this.get("statusSearch") === "all" ) {
				return 1;
			} else {
				return 0;
			}
		}
	});

	return PushNotificationModel;
})();
