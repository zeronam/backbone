var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');

module.exports = (function () {
	var MessageContentModel = BaseModel.extend({
		localStorage: new Backbone.LocalStorage("dataCoupon-temp"),
		idAttribute: "id",
		setLayoutDataEmpty:function() {
	    	var objContent = {
	    		"coupType" : "",
		        "title": "",
		        "subject": "",
		        "message": "",
		        "imageFileName": "./image/main/noImage.png",
		        "memo": "",
		        "socialLink": "",
		        "topLink": "",
		        "couponListLink": "",
		        "memberRegisterLink": "",
		        "useLimit" : "",
		        "limitNumber" : "",
		        "useInterval" : "",
		        "stddatedivCd" : "",
				"useStartDateTime" : "",
				"useEndDateTime" : "",
				"validity" : "",
				"delivType" : "",
				"giveMultiple" : "",
				"startDatetime" : "",
				"endDatetime" : ""
	      	};
	      	this.set( objContent );
	    },
	    setLayoutData:function(data) {
	    	var refix = "https://bt01.betrend.com";
	    	var objContent = {
	    		"coupType" : data.get('coupType'),
		        "title": data.get('title'),
		        "subject": data.get('subject'),
		        "message": data.get('message'),
		        "imageFileName": refix+data.get('imageFileName'),
		        "memo": data.get('memo'),
		        "socialLink": data.get('socialLink'),
		        "topLink": data.get('topLink'),
		        "couponListLink": data.get('couponListLink'),
		        "memberRegisterLink": data.get('memberRegisterLink'),
		        "useLimit" : data.get('useLimit'),
		        "limitNumber" : data.get('limitNumber'),
		        "useInterval" : data.get('useInterval'),
		        "stddatedivCd" : data.get('stddatedivCd'),
				"useStartDateTime" : this.parseDate(data.get('useStartDateTime')),
				"useEndDateTime" : this.parseDate(data.get('useEndDateTime')),
				"validity" : data.get('validity'),
				"delivType" : data.get('delivType'),
				"giveMultiple" : data.get('giveMultiple'),
				"startDatetime" : this.parseDate(data.get('startDatetime')),
				"endDatetime" : this.parseDate(data.get('endDatetime'))
	      	};
	      	this.set( objContent );
	    },
	    parseDate: function(str) {
		    if(!/^(\d){14}$/.test(str)) return "invalid date";
		    var y = str.substr(0,4),
		        m = str.substr(4,2),
		        d = str.substr(6,2);
		        hh = str.substr(8,2);
		        mm = str.substr(10,2);
		    return y+'-'+m+'-'+d+' '+hh+':'+mm;
		}
	  //   safeFetch: function(options) {
			// var _options = options || {};
			// var _this = this;
			// this.fetch( _options )
			// .done(function(data){
			// 	_this.trigger('ready', _this);
			// })
			// .fail(function(err) {
			// 	if( err !== "Record Not Found" ) { // Record Not Foundは無視してよい(初回起動を意味する)
			// 	console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
			// }
			// 	_this.trigger('ready', _this);
			// });
	  //   }
	});

	return MessageContentModel;
	
})();