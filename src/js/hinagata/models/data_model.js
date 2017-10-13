var Backbone = require('backbone');
module.exports = (function () {
	var DataModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("data-temp"),
		idAttribute: "id",
		setDataTemp:function(messageInfo){
	    	var msgInfo = {
		        "templateID" : messageInfo.get("templateID"),
		        "type": messageInfo.get("type"),
		        "subjectTitle" : messageInfo.get("subjectTitle"),
		        "headlineOne" : messageInfo.get("headlineOne"),
		        "headlineTwo" : messageInfo.get("headlineTwo"),
		        "imgBannerOne" : messageInfo.get("imgBannerOne"),
		        "imgBannerTwo" : messageInfo.get("imgBannerTwo"),
		        "bodyTextOne" : messageInfo.get("bodyTextOne"),
		        "bodyTextTwo" : messageInfo.get("bodyTextTwo"),
		        "urlLabelOne" : messageInfo.get("urlLabelOne"),
		        "urlLink0ne" : messageInfo.get("urlLink0ne"),
		        "urlLabelTwo" : messageInfo.get("urlLabelTwo"),
		        "urlLinkTwo" : messageInfo.get("urlLinkTwo")
	      	};
	      	this.set( msgInfo );
	      	this.save();
	    },
	    setPreViewSetting: function(previewHtml) {
	    	this.set("preview", previewHtml);
	    	this.save();
	    },
	    setContentsNull: function(previewHtml) {
	    	this.set("preview", "");
	    	this.set("settingInfo", "");
	    	this.save();
	    },
	    getPreViewSetting: function() {
	    	return this.get("preview");
	    },
	    getSubject: function() {
	    	return this.get("subjectTitle");
	    },
	    setBody: function(body) {
	    	this.set("body", body);
	    	this.save();
	    },
	    getBody: function() {
	    	return this.get("body");
	    },
	    setTemplateId: function(id) {
	    	this.set("templateID", id);
	    	this.save();
	    },
	    setType: function(type) {
	    	this.set("type", type);
	    	this.save();
	    },
	    setCampainName: function(campainName) {
	    	this.set("campainName", campainName);
	    	this.save();
	    },
	    getCampainName: function() {
	    	return this.get("campainName");
	    },
	    getSubjectTitle: function() {
	    	return this.get("subjectTitle");
	    },
	    setImgOne: function(imgUrl){
	    	this.set("imgBannerOne", imgUrl);
	    	this.save();
	    },
	    setImgTwo: function(imgUrl){
	    	this.set("imgBannerTwo", imgUrl);
	    	this.save();
	    },
		getSettingInfo: function(){
			return this.get("settingInfo");
		},
		setSettingInfo: function( settingInfo ){
			var settingInfor = this.get("settingInfo");
			settingInfor = settingInfo;
			this.set("settingInfo", settingInfor);
			this.save();
		},
		setSettingInfoEmpty: function( ){
			this.set("settingInfo", "");
			this.save();
		},
		setLayoutDataTemp:function(messageInfo){
	    	var msgInfo = {
		        "subjectTitle" : messageInfo.get("subjectTitle"),
		        "headlineOne" : messageInfo.get("headlineOne"),
		        "imgBanner" : messageInfo.get("imgBanner"),
		        "bodyText" : messageInfo.get("bodyText"),
		        "urlLabelOne" : messageInfo.get("urlLabelOne"),
		        "urlLink0ne" : messageInfo.get("urlLink0ne"),
		        "urlLabelTwo" : messageInfo.get("urlLabelTwo"),
		        "urlLinkTwo" : messageInfo.get("urlLinkTwo")
	      	};
	      	this.set( msgInfo );
	      	this.save();
	    },
	    setPoint: function(point){
	    	this.set("point",point);
	    	this.save();
	    },
	    getPoint: function() {
	    	return this.get("point");
	    },
	    setCustomerView: function(customerInfo){
	    	var cusInfo = {
		        "userId" : customerInfo.get("userId"),
		        "customerId" : customerInfo.get("customerId"),
		        "userName" : customerInfo.get("userName"),
		        "date" : customerInfo.get("date"),
		        "totalPoint" : customerInfo.get("totalPoint"),
		        "usePoint" : customerInfo.get("usePoint"),
		        "leftPoint" : customerInfo.get("leftPoint")
	      	};
	      	this.set( cusInfo );
	      	this.save();
	    },
	    setMemberOnly: function(memberOnly) {
	    	this.set("memberOnly", memberOnly);
	    	this.save();
	    },
	    getMemberOnly: function() {
	    	return this.get("memberOnly");
	    },
	    setCouponDataTemp:function(data){
	    	var objContent = {
	    		coupType : data.get('coupType'),
				name: data.get('name'),
		        memberOnly: data.get('memberOnly'),
		        memberOnly1: data.get('memberOnly1'),
		        useType: data.get('useType'),
		        useLimit: data.get('useLimit'),
		        useInterval: data.get('useInterval'),
		        thresLimitNumber: data.get('thresLimitNumber'),
		        stddatedivCd: data.get('stddatedivCd'),
		        useStartDateTime: data.get('useStartDateTime'),
		        useEndDateTime: data.get('useEndDateTime'),
		        validity: data.get('validity'),
		        confirmationDisp: data.get('confirmationDisp'),
		        subject: data.get('subject'),
		        title: data.get('title'),
		        message: data.get('message'),
		        imageFileName: data.get('imageFileName'),
		        imageName: data.get('imageName'),
		        memo: data.get('memo'),
		        socialLink: data.get('socialLink'),
				topLink: data.get('topLink'),
				couponListLink: data.get('couponListLink'),
				memberRegisterLink: data.get('memberRegisterLink'),
				delivType: data.get('delivType'),
				startDatetime: data.get('startDatetime'),
				endDatetime: data.get('endDatetime'),
				giveMultiple: data.get('giveMultiple'),
				scid: data.get('scid'),
				conditionId: data.get('conditionId'),
				conditionName: data.get('conditionName')
				// coupId: data.get('coupId')
			};
			this.set( objContent );
	      	this.save();
	    },
	    getScid: function() {
	    	return this.get('conditionId');
	    },
	    setStatusAction: function(status) {
	    	this.set("statusAction", status);
	    	this.save();
	    },
	    getStatusAction: function() {
	    	return this.get("statusAction");
	    },
	    safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
			_this.trigger('ready', _this);
			})
			.fail(function(err){
			if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
			console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
			}
			_this.trigger('ready', _this);
			});
	    },
	    setNotificationDataTemp:function(data){
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
				contentImageUrl: data.get('contentImageUrl'),
				imageName: data.get('imageName'),
				locationNotificationType: data.get('locationNotificationType'),
				specifyTimeStart: data.get('specifyTimeStart'),
				specifyTimeEnd: data.get('specifyTimeEnd'),
				scid: data.get('scid'),
        		conditionName: data.get('conditionName'),				
				locationNotificationType: data.get('locationNotificationType'),
				specifyTimeStart: data.get('specifyTimeStart'),
				specifyTimeEnd: data.get('specifyTimeEnd'),
				deleteSpots: data.get('deleteSpots'),
				spots: data.get('spots'),
				segmentDetail: data.get('segmentDetail'),
				customSegment: data.get('customSegment')
			};
			this.set( objContent );
	      	this.save();
	    },
	});

	return DataModel;

})();
