var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');
var moment = require('moment');
module.exports = (function () {
	var CouponListModel = BaseModel.extend({
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			// getStatusText: {
			// 	get: function() {
			// 		return this.getStatus();
			// 	}
			// },
			// getMemberText: {
			// 	get: function() {
			// 		return this.getMemberStatus();
			// 	}
			// },
			// getStartDate: {
			// 	get: function() {
			// 		return this.getStart();
			// 	}
			// },
			// getEndDate: {
			// 	get: function() {
			// 		return this.getEnd();
			// 	}
			// },
			// getCreateDate: {
			// 	get: function() {
			// 		return this.getCreate();
			// 	}
			// },
			// getAllFlg: {
			// 	get: function() {
			// 		return this.getAll();
			// 	}
			// }
		},
		getStatus: function() {
			var status = parseInt(this.get("status"));
			var delivType = parseInt(this.get("delivType"));
			var availableTerm = parseInt(this.get("availableTerm"));
			var memberStatus = parseInt(this.get("memberOnly"));
			var statusText = "";
			switch ( status ) {
				case 0:
					statusText = App.appModel.getLanguageType().coupon.list.creating;
					break;
				case 1:
					if ( delivType === 1 && memberStatus === 0 ) {
						switch ( availableTerm ) {
							case -1:
								statusText = App.appModel.getLanguageType().coupon.list.beforeDistribution;
								break;
							case 0:
								statusText = App.appModel.getLanguageType().coupon.list.distributing;
								break;
							case 1:
								statusText = App.appModel.getLanguageType().coupon.list.endOfDistribution;
								break;
							default:
								statusText = App.appModel.getLanguageType().coupon.list.endOfDistribution;
								break;
						};
					} else {
						statusText = App.appModel.getLanguageType().coupon.list.endOfDistribution;
					}
					break;
				case 2:
					statusText = App.appModel.getLanguageType().coupon.list.stopUsing;
					break;
				case 3:
				case 4:
					statusText = App.appModel.getLanguageType().coupon.list.distributionProcessing;
					break;
				case 5:
					statusText = App.appModel.getLanguageType().coupon.list.waitApprove;
					break;
			};
			return statusText;
		},
		getMemberStatus: function() {
			var memberStatus = parseInt(this.get("memberOnly"));
			var delivType = parseInt(this.get("delivType"));
			var memberStatusText = "";
			switch ( memberStatus ) {
				case 0:
					memberStatusText = App.appModel.getLanguageType().coupon.list.membersOnly;
					if ( delivType === 1 ) {
						memberStatusText += "<br>" + App.appModel.getLanguageType().coupon.list.repetition;
					}
					break;
				case 1:
					memberStatusText = App.appModel.getLanguageType().coupon.list.public;
					break;
				case 2:
					memberStatusText = App.appModel.getLanguageType().coupon.list.commonMembers;
					break;
			};
			return memberStatusText;
		},
		getStart: function() {
			var validity = parseInt(this.get("validity"));
			var start = this.get("useStartDateTime");
			var end = this.get("useEndDateTime");
			var startDate;
			if ( start === null && end === null ) {
				startDate = App.appModel.getLanguageType().coupon.list.afterDistribution + validity + App.appModel.getLanguageType().coupon.list.day;
			} else {
				startDate = this.formatDateTime(this.get("useStartDateTime"));
				if ( !startDate ) {
					startDate = "";
				}
			}
			return startDate;
		},
		getEnd: function() {
			var start = this.get("useStartDateTime");
			var end = this.get("useEndDateTime");
			var endDate;
			if ( start === null && end === null ) {
				endDate = "";
			} else {
				endDate = this.formatDateTime(this.get("useEndDateTime"));
				if ( !endDate ) {
					endDate = "-";
				} else {
					endDate = " ~ " + endDate;
				}
			}
			return endDate;
		},
		getCreate: function() {
			var createAt = this.formatDateTime(this.get("createAt"));
			if ( !createAt ) {
				createAt = "";
			}
			return createAt;
		},
		formatDateTime: function( date ){
			var dateTmp = moment(date, "YYYYMMDDHHmm");
			if ( App.appModel.getLanguage() === "en" ) {
				return moment(dateTmp).format("Do MMM YYYY");	
			} else {
				return moment(dateTmp).format("YYYY年MM月DD日");
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

	return CouponListModel;
})();