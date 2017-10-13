var Backbone = require('backbone');
var Validator = require("../../../../lib/components/backbone-validation/backbone-validator.js");
var moment = require("moment");

_.extend(Validator._validators, {
    maxByteLength: {
        fn: function(value, expectation) {
            normal_val = String(value);
            var byteLen = 0;
            for (var i = 0; i < normal_val.length; i++) {
                var c = normal_val.charCodeAt(i);
                byteLen += c < (1 << 7) ? 1 :
                    c < (1 << 11) ? 2 :
                    c < (1 << 16) ? 3 :
                    c < (1 << 21) ? 4 :
                    c < (1 << 26) ? 5 :
                    c < (1 << 31) ? 6 : Number.NaN;
            }
            return  !value || byteLen <= expectation;
        },
        message: "error"
    }
});


module.exports = (function () {

	var ValidationModel = Backbone.Model.extend({
		validation: {
			userId:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().login.dialogueError.loginRequiredIDMsgErr;
					}
				}
			],
			password:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().login.dialogueError.loginRequiredPasswordMsgErr
					}
				}
			],
			campainName:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.selectTemplate.inputError.campainNameRequiredErr;
					}
				},
				{
					maxByteLength: 256,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.selectTemplate.inputError.campainNameMaxLengthErr;
					}
				}
			],
			subject:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.subjectRequiredErr;
					}
				},
				{
				    maxByteLength: 256,
				    message: function(attrName, attrValue, attrExpectation, validatorName) {
				        return App.appModel.getLanguageType().mail.messageContent.inputError.subjectMaxLengthErr;
				    }
				}

			],
			// subject:[
			// 	{
			// 		required: true,
			// 		message: function(attrName, attrValue, attrExpectation, validatorName) {
			// 			return App.appModel.getLanguageType().mail.messageContent.inputError.subjectRequiredErr;
			// 		}
			// 	},
			// 	{
			// 		maxLength: 256,
			// 		message: function(attrName, attrValue, attrExpectation, validatorName) {
			// 			return App.appModel.getLanguageType().mail.messageContent.inputError.subjectMaxLengthErr;
			// 		}
			// 	}
			// ],
			subjectNote:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.subjectNoteRequiredErr;
					}
				},
				{
					maxLength: 256,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.subjectNoteMaxLengthErr;
					}
				}
			],
			headlineOne:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.headlineRequiredErr;
					}
				}
			],
			headlineTwo:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.headlineRequiredErr;
					}
				}
			],
			headlineThree:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.headlineRequiredErr;
					}
				}
			],
			headlineFour:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.headlineRequiredErr;
					}
				}
			],
			imgBannerOne:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				},
				{
					equalNoImage: "./image/main/noImage.png",
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				}
			],
			imgBannerTwo:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				},
				{
					equalNoImage: "./image/main/noImage.png",
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				}
			],
			imgBannerThree:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				},
				{
					equalNoImage: "./image/main/noImage.png",
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				}
			],
			imgBannerFour:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				},
				{
					equalNoImage: "./image/main/noImage.png",
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.imageRequiredErr;
					}
				}
			],
			bodyTextOne:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.bodyTextRequiredErr;
					}
				}
			],
			bodyTextTwo:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.bodyTextRequiredErr;
					}
				}
			],
			bodyTextThree:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.bodyTextRequiredErr;
					}
				}
			],
			bodyTextFour:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.bodyTextRequiredErr;
					}
				}
			],
			nameBtnOne:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.nameBtnRequiredErr;
					}
				},
				{
					maxLength: 32,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.nameBtnMaxLengthErr;
					}
				}
			],
			urlLink0ne:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkRequiredErr;
					}
				},
				{
					format: 'url',
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkFormatErr;
					}
				}
			],
			nameBtnTwo:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.nameBtnRequiredErr;
					}
				},
				{
					maxLength: 32,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.nameBtnMaxLengthErr;
					}
				}
			],
			urlLinkTwo:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkRequiredErr;
					}
				},
				{
					format: 'url',
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkFormatErr;
					}
				}
			],
			urlLinkThree:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkRequiredErr;
					}
				},
				{
					format: 'url',
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkFormatErr;
					}
				}
			],
			urlLinkFour:[
				{
					required: true,
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkRequiredErr;
					}
				},
				{
					format: 'url',
					message: function(attrName, attrValue, attrExpectation, validatorName) {
						return App.appModel.getLanguageType().mail.messageContent.inputError.urlLinkFormatErr;
					}
				}
			],
			urlNext:[
				{
					required: true
				}
			],
			templateName:[
				{
					required: true,
					message: 'テンプレート名を入力してください'
				},
				{
					maxLength: 50,
					message: 'テンプレート名は50桁で入力してください'
				}
			],
			name:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.fillCouponName;
      				}
				},
				{
					maxLength: 100,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthCouponName;
      				}
				}
			],
			useLimit:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.checkZeroUseRestrictions;
      				}
				},
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthUseRestrictions;
      				}
				},
				{
					maxLength: 8,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthUseRestrictions;
      				}
				},
				{
					checkZero: 0,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.checkZeroUseRestrictions;
      				}
				}
			],
			limitNumber:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.checkZeroLimitNumber;
      				}
				},
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthLimitNumber;
      				}
				},
				{
					maxLength: 8,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthLimitNumber;
      				}
				},
				{
					checkZero: 0,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.checkZeroLimitNumber;
      				}
				}
			],
			validity:[
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthValidity;
      				}
				},
				{
					maxLength: 3,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.maxLengthValidity;
      				}
				},
				{
					checkZero: 0,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.checkZeroValidity;
      				}
				}
			],
			useStartDateTime:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.fillUseStartDateTime;
      				}
				}
			],
			useEndDateTime:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.information.dialogue.fillUseEndDateTime;
      				}
				}
			],
			titleCoup:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.fillPageTitle;
      				}
				},
				{
					maxLength: 1000,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthPageTitle;
      				}
				}
			],
			subjectCoup:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.fillSubjectCoup;
      				}
				},
				{
					maxLength: 1000,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthSubjectCoup;
      				}
				}
			],
			messageCoupon:[
				{
					maxLength: 4000,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthCouponDetails;
      				}
				}
			],
			descriptionImage:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.selectDescriptionImage;
      				}
				},
				{
					maxLength: 256,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthDescriptionImage;
      				}
				},
				{
					equalNoImage: "noImage.png",
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.selectDescriptionImage;
      				}
				}
			],
			descriptionImageFile:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.selectDescriptionImageURL;
      				}
				},
				{
					maxLength: 256,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthDescriptionImageURL;
      				}
				},
				{
					equalNoImage: "./image/main/noImage.png",
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.selectDescriptionImageURL;
      				}
				}
			],
			memoCoupon:[
				{
					maxLength: 4000,
					message: function() {
      					return App.appModel.getLanguageType().coupon.content.dialogue.maxLengthMemo;
      				}
				}
			],
			startDateSend:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.setting.dialogue.fillStartDateSend;
      				}
				}
			],
			endDateSend:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().coupon.setting.dialogue.fillEndDateSend;
      				}
				}
			],
			fromDate:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().analysis.rangeDate.error.startDateEmpty;
      				}
				}
			],
			endDate:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().analysis.rangeDate.error.endDateEmpty;
      				}
				}
			],
			startMonetary:[
				{
					required: true,
					message: '開始値を入力してください'
				},
				{
					format: 'number',
					message: '開始値は数字だけです<br /><br />もう一度入力してください'
				}
			],
			endMonetary:[
				{
					required: true,
					message: '終了値を入力してください'
				},
				{
					format: 'number',
					message: '終了値は数字だけです<br /><br />もう一度入力してください'
				}
			],
			title:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.setting.dialogue.fillNotificationText;
      				}
				},
				{
					maxLength: 100,
					message: function() {
      					return App.appModel.getLanguageType().notification.setting.dialogue.maxLengthNotificationText;
      				}
				}
			],
			contentText:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.setting.dialogue.fillContentText;
      				}
				},
				{
					maxLength: 100,
					message: function() {
      					return App.appModel.getLanguageType().notification.setting.dialogue.maxLengthContentText;
      				}
				}
			],			
			header:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.content.dialogue.fillHeader;
      				}
				}
			],			
			footer:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.content.dialogue.fillFooter;
      				}
				}
			],
			spotName1:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillSpotName;
      				}
				},
				{
					maxLength: 100,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.maxLengthSpotName;
      				}
				}
			],
			latitude:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillLatitude;
      				}
				},
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.isNumber;
      				}
				}
			],
			longitude:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillLongitude;
      				}
				},
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.isNumber;
      				}
				}
			],
			scope:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillScope;
      				}
				},
				{
					format: 'number',
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.isNumber;
      				}
				}
			],
			spotName2:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillSpotName;
      				}
				},
				{
					maxLength: 100,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.maxLengthSpotName;
      				}
				}
			],
			ssid:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillSSID;
      				}
				},
				{
					maxLength: 32,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.maxLengthSSID;
      				}
				}
			],
			bssid:[
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillBSSID;
      				}
				},
				{
					maxLength: 17,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.maxLengthBSSID;
      				}
				}
			],
			rssiType:[				
				{
					required: true,
					message: function() {
      					return App.appModel.getLanguageType().notification.local.dialogue.fillRssiType;
      				}
				}
			]
		},
		checkDate: function(startDate, endDate, format) {
			return App.util.date.checkDate(startDate, endDate, format);
		},
		checkDate1: function(startDate, endDate, useStartDateTime, useEndDateTime, format) {
			return App.util.date.checkDate1(startDate, endDate, useStartDateTime, useEndDateTime, format);
		},
		checkDateSystem: function(date){
			return App.util.date.checkDateSystem(date);
		},
		onErrorRangeDate: function(msg) {
			var msgError;
			if ( msg.fromDate ) {
				msgError = msg.fromDate;
				$("#modal-date-range .error-info").html(msg.fromDate);
			} else if ( msg.endDate ) {
				msgError = msg.endDate;				
			}
			$("#modal-date-range .error-info").html(msgError);
        },
        onErrorSetMonetary: function(msg) {
        	var msgError;
        	if ( msg.startMonetary ) {
        		msgError = msg.startMonetary;
        	} else if (msg.endMonetary ) {
        		msgError = msg.endMonetary;
        	}
        	$("#modal-monetary .error-info").html(msgError);
        },
        checkSetMonetary: function(start, end) {
        	var startMonetary = parseInt(start);
        	var endMonetary = parseInt(end);
        	if ( endMonetary <= startMonetary ) {
        		$("#modal-monetary .error-info").html('終了値は開始値より大なりです<br /><br />ご確認ください');
        		return false;
        	}
        	return true;
        }
	});

	return ValidationModel;
	
})();
