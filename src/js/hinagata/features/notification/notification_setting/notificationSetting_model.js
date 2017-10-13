var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');

module.exports = (function () {
	var CouponInformationModel = BaseModel.extend({
	    setContentDataEmpty:function() {
	    	var objContent = {
	    		title: "",
				contentText: "",
				repeatFlg: "",
				openDate: "",
				openTime: "",
				distributionTimeStart: "",
				distributionTimeEnd: "",
				distributionTime: "",
				repeatType: "",
				selectValueEverymonth: "",
				selectValueEveryweek: "",
				nonPushFlg: "",
				dispTimeType: "",
				header: "",
				footer: "",
				contentImageUrl: "",
				imageName: "",
				scid: "",
				locationNotificationType: "",
				specifyTimeStart: "",
				specifyTimeEnd: "",
				deleteSpots: "",
				spots: "",
				segmentDetail: "",
				customSegment: "",
	      	};
	      	this.set( objContent );
	    },
		setContentData: function(data) {
			if(data.get('contentImageUrl')){
				var lengthUrl = data.get('contentImageUrl').indexOf('/BeUD');
				var contentImageUrl = data.get('contentImageUrl').substr(lengthUrl);
			} else {
				var contentImageUrl = "";
			}
			var objContent = {
				title: data.get('title'),
				contentText: data.get('contentText'),
				repeatFlg: data.get('repeatFlg'),
				openDate: data.get('openDate'),
				openTime: data.get('openTime'),
				distributionTimeStart: data.get('distributionTimeStart'),
				distributionTimeEnd: data.get('distributionTimeEnd'),
				distributionTime: data.get('distributionTime'),
				repeatType: data.get('repeatType'),
				selectValueEverymonth: data.get('selectValueEverymonth'),
				selectValueEveryweek: data.get('selectValueEveryweek'),
				nonPushFlg: data.get('nonPushFlg'),
				dispTimeType: data.get('dispTimeType'),
				header: data.get('header'),
				footer: data.get('footer'),
				contentImageUrl: contentImageUrl,
				imageName: data.get('imageName'),
				scid: data.get('scid'),
        		conditionName: data.get('conditionName'),			
				locationNotificationType: data.get('locationNotificationType'),
				specifyTimeStart: data.get('specifyTimeStart'),
				specifyTimeEnd: data.get('specifyTimeEnd'),
				deleteSpots: data.get('deleteSpots'),
				spots: data.get('spots'),
				segmentDetail: data.get('segmentDetail'),
				customSegment: data.get('customSegment'),
			};
			this.set( objContent );
		},
		setContentDataByObject: function(data) {
			var objContent = {
	   			title: data.title,
				contentText: data.contentText,
				repeatFlg: data.repeatFlg,
				openDate: data.openDate,
				openTime: data.openTime,
				distributionTimeStart: data.distributionTimeStart,
				distributionTimeEnd: data.distributionTimeEnd,
				distributionTime: data.distributionTime,
				repeatType: data.repeatType,
				selectValueEverymonth: data.selectValueEverymonth,
				selectValueEveryweek: data.selectValueEveryweek,
				nonPushFlg: data.nonPushFlg,
				dispTimeType: data.dispTimeType,
				// header: data.header,
				// footer: data.footer,
				// contentImageUrl: data.contentImageUrl,
				// imageName: data.imageName,
			};
			this.set( objContent );
		},
		setContentDataByObject1: function(data) {
			var objContent = {
				header: data.header,
				footer: data.footer,
		        imageName: data.imageName,
		        contentImageUrl : data.contentImageUrl,
			};
			this.set( objContent );
		},
		setContentDataByObject2: function(data) {
			var objContent = {
				scid: data.scid,
        		conditionName: data.conditionName,				
				locationNotificationType: data.locationNotificationType,
				specifyTimeStart: data.specifyTimeStart,
				specifyTimeEnd: data.specifyTimeEnd,
			};
			this.set( objContent );
		},
		setContentDataByObject3: function(data) {
			var deleteSpots = [];
			data.each(function(model) {
				if(model.get("delete") == true){
			  		deleteSpots.push(model.get('spotId'));
				}
			});

			var objContent = {
				deleteSpots: deleteSpots,
				spots: data.toJSON(),
			};
			this.set( objContent );
		},
		getNotificationMaster: function() {
			var spots = this.get('spots');
			var contentImageUrl = "";
			if(this.get('contentImageUrl')){
				var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
				var contentImageUrl = AppConf.url.appRoot.substr(0, lengthUrl) + this.get('contentImageUrl');
			} 

			for (var i = 0; i < spots.length; i++) {
				if(spots[i].accessPoint == null || spots[i].accessPoint == ""){
					delete spots[i].accessPoint;
				} else if(spots[i].location == null || spots[i].location == ""){
					delete spots[i].location;
				}
				if(spots[i].condition && (spots[i].condition.specifyTime == null || spots[i].condition.specifyTime == "")){
					delete spots[i].condition.specifyTime;
				} else {
					spots[i].condition = {};
					spots[i].condition.locationNotificationType = this.get('locationNotificationType');
					spots[i].condition.specifyTimeStart = this.get('specifyTimeStart');
					spots[i].condition.specifyTimeEnd = this.get('specifyTimeEnd');
					spots[i].condition.specifyTimeType = 2;
					spots[i].spotId = -1;
				}
				if(spots[i].delete){
					delete spots[i].delete;
				}
				delete spots[i].tempSpotID;
			}

			var notificationMaster = {
				status: this.get("status"),
				notificationId: this.get("id"),
				title: this.get('title'),
				contentText: this.get('contentText'),
				repeatFlg: this.get('repeatFlg'),
				openDate: this.get('openDate') ? this.get('openDate') : "",
				openTime: this.get('openTime') ? this.get('openTime') : "",
				distributionTimeStart: this.get('distributionTimeStart') ? this.get('distributionTimeStart') : "",
				distributionTimeEnd: this.get('distributionTimeEnd') ? this.get('distributionTimeEnd') : "",
				distributionTime: this.get('distributionTime') ? this.get('distributionTime') : "",
				repeatType: this.get('repeatType'),
				selectValueEverymonth: this.get('selectValueEverymonth')? this.get('selectValueEverymonth') : 0,
				selectValueEveryweek: this.get('selectValueEveryweek')? this.get('selectValueEveryweek') : 0,
				nonPushFlg: this.get('nonPushFlg'),
				dispTimeType: this.get('dispTimeType'),
				header: this.get('header'),
				footer: this.get('footer'),
				contentImageUrl: contentImageUrl,
				// contentImageUrl: this.get('contentImageUrl'),
				// imageName: this.get('imageName'),
				scid: (!this.get('segmentDetail')) ? this.get('scid') : null,
				// segmentId: (!this.get('segmentDetail')) ? null : this.get('segmentDetail').segmentId,
				segmentId: AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl,
				customSegment: this.get('customSegment'),
				repeatCondition: "",
	    		// conditionName: this.get('conditionName'),			
				locationNotificationType: this.get('locationNotificationType') ? this.get('locationNotificationType') : 0,
				specifyTimeStart: this.get('specifyTimeStart'),
				specifyTimeEnd: this.get('specifyTimeEnd'),
				specifyTimeType: 0,
				deleteSpots: this.get('deleteSpots') ? this.get('deleteSpots').toString() : "",
				spotsString: JSON.stringify(spots).replace(/"/g, '\"'),
				// spotsString: "[{\"spotId\":-1, \"name\":\"access address\", \"locationType\":1,\"accessPoint\":{\"ssid\":\"12345\",\"bssid\":\"01:01:01:01:01:01\",\"rssiType\":0},\"condition\":{\"locationNotificationType\":1,\"specifyTimeType\":2,\"specifyTimeStart\":\"13:00\",\"specifyTimeEnd\":\"20:00\"}},]"
			}
			return notificationMaster;
		},
		setNotificationId: function(type, id) {
			if ( type === "edit" ) {
				this.set("id", id);
			} else {
				this.set("id", "");
			}
		},
		setContentSaveAndExit: function() {
			if ( !this.get("status") ) {
				this.set("status", 0);
			}
			// if ( !this.get("giveMultiple") ) {
			// 	this.set("giveMultiple", "2");
			// }
			// this.set("scid", "");
		},
		setDeliverNotification: function(){
			if ( !this.get("status") ) {
				this.set("status", 2);
			}
		}
	});

	return CouponInformationModel;

})();