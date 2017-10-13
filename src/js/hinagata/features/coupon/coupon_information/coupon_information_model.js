var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');

module.exports = (function () {
	var CouponInformationModel = BaseModel.extend({
	    setContentDataEmpty:function() {
	    	var objContent = {
	    		"coupType" : 0,
		        "name": "",
		        "memberOnly": "",
		        "memberOnly1": "",
		        "useType": "",
		        "useLimit": "",
		        "thresLimitNumber" : "",
		        "useInterval": "",
		        "stddatedivCd": "",
		        "useStartDateTime": "",
		        "useEndDateTime": "",
		        "validity": "",
		        "confirmationDisp": "",
		        "imageFileName": "",
		        "imageName": "",
		        "memo": "",
		        "message": "",
		        "subject": "",
		        "title": "",
		        "giveMultiple": "",
		        "memberRegisterLink": "",
		        "couponListLink": "",
		        "socialLink": "",
		        "topLink": "",
		        "delivType": "",
		        "startDatetime": "",
		        "endDatetime": "",
		        "scid": "",
		        "coupId": "",
		        "couponUrl": ""
	      	};
	      	this.set( objContent );
	    },
		setContentData: function(data) {
			var objContent = {
	    		coupType : data.get('coupType'),
				name: data.get('name'),
		        memberOnly: data.get('memberOnly'),
		        memberOnly1: data.get('memberOnly1'),
		        useType: data.get('useType'),
		        useLimit: data.get('useLimit'),
		        thresLimitNumber : data.get('thresLimitNumber'),
		        useInterval: data.get('useInterval'),
		        stddatedivCd: data.get('stddatedivCd'),
		        useStartDateTime: data.get('useStartDateTime'),
		        useEndDateTime: data.get('useEndDateTime'),
		        validity: data.get('validity'),
		        confirmationDisp: data.get('confirmationDisp'),
		        imageFileName: data.get('imageFileName'),
		        imageName: data.get('imageName'),
		        memo: data.get('memo'),
		        message: data.get('message'),
		        subject: data.get('subject'),
		        title: data.get('title'),
		        giveMultiple: data.get('giveMultiple'),
		        memberRegisterLink: data.get('memberRegisterLink'),
		        couponListLink: data.get('couponListLink'),
		        socialLink: data.get('socialLink'),
		        topLink: data.get('topLink'),
		        delivType: data.get('delivType'),
		        startDatetime: data.get('startDatetime'),
				endDatetime: data.get('endDatetime'),
				scid: data.get('scid'),
				coupId: data.get('id'),
				conditionId: data.get('conditionId'),
				conditionName: data.get('conditionName'),
				segmentDetail: data.get('segmentDetail'),
				couponUrl: data.get('couponUrl')
			};
			this.set( objContent );
		},
		setContentDataByObject: function(data) {
			var objContent = {
				name: data.name,
				memberOnly1: data.memberOnly1,
		        useType: data.useType,
		        useLimit: data.useLimit,
		        thresLimitNumber : data.thresLimitNumber,
		        useInterval: data.useInterval,
		        stddatedivCd: data.stddatedivCd,
		        useStartDateTime: data.useStartDateTime,
		        useEndDateTime: data.useEndDateTime,
		        validity: data.validity,
		        confirmationDisp: data.confirmationDisp
			};
			this.set( objContent );
		},
		setContentDataByObject1: function(data) {
			var objContent = {
				title: data.title,
				subject: data.subject,
		        message: data.message,
		        imageName: data.imageName,
		        imageFileName : data.imageFileName,
		        memo: data.memo,
		        memberRegisterLink: data.memberRegisterLink,
		        couponListLink: data.couponListLink,
		        socialLink: data.socialLink,
		        topLink: data.topLink
			};
			this.set( objContent );
		},
		setContentDataByObject2: function(data) {
			var objContent = {
				conditionId: data.conditionId,
        		conditionName: data.conditionName,
				// scid: data.scid,
				delivType: data.delivType,
		        startDatetime: data.startDatetime,
		        endDatetime: data.endDatetime,
		        giveMultiple : data.giveMultiple
			};
			this.set( objContent );
		},
		setMemberOnly: function(memberOnly) {
			this.set("memberOnly", memberOnly);
		},
		setMemberOnly1: function(memberOnly) {
			this.set("memberOnly1", memberOnly);
		},
		getCouponMaster: function() {
			var couponMaster = {};
			var useStartDateTime = this.get("useStartDateTime");
			var useEndDateTime = this.get("useEndDateTime");
			var dateValidStart = App.util.date.convertDate(useStartDateTime, "YYYY/MM/DD");
			var dateValidStartHM = App.util.date.convertDate(useStartDateTime, "HH:mm");
			var dateValidEnd = App.util.date.convertDate(useEndDateTime, "YYYY/MM/DD");
			var dateValidEndHM = App.util.date.convertDate(useEndDateTime, "HH:mm");
			var startDatetime = this.get("startDatetime");
			var endDatetime = this.get("endDatetime");
			var dateDistStart = App.util.date.convertDate(startDatetime, "YYYY/MM/DD");
			var dateDistEnd = App.util.date.convertDate(endDatetime, "YYYY/MM/DD");
			// information
			couponMaster.id = this.get("id");
			couponMaster.coup_cd = "";
			couponMaster.name = this.get("name");
			couponMaster.distType = this.get("memberOnly");
			couponMaster.consumeType = this.get("useType");
			couponMaster.limitPerson = ( this.get("useLimit") > 0 ) ? 1: 0;
			couponMaster.thresLimitPerson = this.get("useLimit");
			couponMaster.limitNumber = ( this.get("thresLimitNumber") > 0 ) ? 1: 0;
			couponMaster.thresLimitNumber = parseInt(this.get("thresLimitNumber"));
			couponMaster.limitDay = parseInt(this.get("useInterval"));
			couponMaster.dateValidType = this.get("stddatedivCd");
			couponMaster.dateValidStart = dateValidStart;
			couponMaster.dateValidStartHM = dateValidStartHM;
			couponMaster.dateValidEnd = dateValidEnd;
			couponMaster.dateValidEndHM = dateValidEndHM;
			couponMaster.numOfDayValidSinceDist = this.get("validity");
			couponMaster.confirmationDisp = parseInt(this.get("confirmationDisp"));

			// content
			couponMaster.title = this.get("title");
			couponMaster.subject = this.get("subject");
			couponMaster.description = this.get("message");
			couponMaster.descriptionImage = this.get("imageName");
			couponMaster.descriptionImageFile = this.get("imageFileName");
			couponMaster.memo = this.get("memo");
			couponMaster.linkToForm = parseInt(this.get("memberRegisterLink"));
			couponMaster.linkToCouponList = parseInt(this.get("couponListLink"));
			couponMaster.linkToTop = parseInt(this.get("topLink"));
			couponMaster.linkToSocial = parseInt(this.get("topLink"));

			// setting
			if ( this.get("conditionId")) {
				couponMaster.scid = this.get("conditionId");
			}
			if ( this.get("delivType") ) {
				couponMaster.repeatType = this.get("delivType");
			}
			if ( this.get("giveMultiple") ) {
				couponMaster.giveMultiple = this.get("giveMultiple");
			}
			couponMaster.dateDistStart = dateDistStart;
			couponMaster.dateDistEnd = dateDistEnd;
			couponMaster.dateDistStart = dateDistStart;
			couponMaster.dateDistEnd = dateDistEnd;
			couponMaster.customSegment = AppConf.coupon.customSegment;
			couponMaster.segmentId = AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl;
			// if(!(couponMaster.id && couponMaster.scid)){
				// couponMaster.segmentId = AppConf.coupon.segmentId;
			// }
			return couponMaster;
		},
		setCoupId: function(type, id) {
			if ( type === "edit" ) {
				this.set("id", id);
			} else {
				this.set("id", "");
			}
		},
		setContentSaveAndExit: function() {
			if ( !this.get("delivType") ) {
				this.set("delivType", "0");
			}
			if ( !this.get("giveMultiple") ) {
				this.set("giveMultiple", "2");
			}
			this.set("scid", "");
		}
	});

	return CouponInformationModel;

})();