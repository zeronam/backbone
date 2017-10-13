var Backbone = require('backbone');
var BaseModel = require('../../../models/base_model.js');
module.exports = (function () {
	var MessageContentModel = BaseModel.extend({
		localStorage: new Backbone.LocalStorage("dataLayout-temp"),
		idAttribute: "id",
		setContentData: function(data) {
			var objContent = {
				subjectTitle: data.get('subjectTitle'),
				subjectNote: data.get('subjectNote'),
		        headlineOne: data.get('headlineOne'),
		        headlineTwo: data.get('headlineTwo'),
		        headlineThree: data.get('headlineThree'),
		        headlineFour: data.get('headlineFour'),
		        imgBannerOne: data.get('imgBannerOne'),
		        imgBannerTwo: data.get('imgBannerTwo'),
		        imgBannerThree: data.get('imgBannerThree'),
		        imgBannerFour: data.get('imgBannerFour'),
		        bodyTextOne: data.get('bodyTextOne'),
		        bodyTextTwo: data.get('bodyTextTwo'),
		        bodyTextThree: data.get('bodyTextThree'),
		        bodyTextFour: data.get('bodyTextFour'),
		        nameBtnOne: data.get('nameBtnOne'),
		        nameBtnTwo: data.get('nameBtnTwo'),
		        nameBtnThree: data.get('nameBtnThree'),
		        nameBtnFour: data.get('nameBtnFour'),
		        urlLink0ne: data.get('urlLink0ne'),
		        urlLabelTwo: data.get('urlLabelTwo'),		        
		        urlLinkThree: data.get('urlLinkThree'),
		        urlLinkFour: data.get('urlLinkFour'),
			};
			this.set( objContent );
		},
		setID:function(id) {
			this.set( "layoutTemplateID", id );
		},
	    setLayoutDataEmpty:function() {
	    	var msgInfo = {
		        "subjectTitle" : "",
		        "subjectNote" : "",
		        "headlineOne" : "",
		        "headlineTwo" : "",
		        "headlineThree" : "",
		        "headlineFour" : "",
		        "imgBannerOne" : "",
		        "imgBannerTwo" : "",
		        "imgBannerThree" : "",
		        "imgBannerFour" : "",
		        "bodyTextOne" : "",
		        "bodyTextTwo" : "",
		        "bodyTextThree" : "",
		        "bodyTextFour" : "",
		        "nameBtnOne" : "",
		        "urlLink0ne" : "",
		        "nameBtnTwo" : "",
		        "urlLinkTwo" : "",
		        "nameBtnThree" : "",
		        "urlLinkThree" : "",
		        "nameBtnFour" : "",
		        "urlLinkFour" : ""
	      	};
	      	this.set( msgInfo );
	    },
	    getImageOne: function() {
	    	return this.get("imgBannerOne");
	    },
	    getImageTwo: function() {
	    	return this.get("imgBannerTwo");
	    },
	    getImageThree: function() {
	    	return this.get("imgBannerThree");
	    },
	    getImageFour: function() {
	    	return this.get("imgBannerFour");
	    },
	    safeFetch: function(options) {
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err) {
				if( err !== "Record Not Found" ) { // Record Not Foundは無視してよい(初回起動を意味する)
				console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
			}
				_this.trigger('ready', _this);
			});
	    }
	});

	return MessageContentModel;

})();