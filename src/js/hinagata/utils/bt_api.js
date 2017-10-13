// ビートレンドCRMのAPIを叩くメソッド群です

var ApplicanEx = require('./applican_ex');
module.exports = (function () {
	var BtApi = function (options) {
		this.ApplicationId = options.ApplicationId;
		this.rootUrl = options.rootUrl;
		this.ContentsVersion = options.ContentsVersion;

		this.BundleId = applican.device.package_name;
		this.BundleVersion = "";
		this.Platform = applican.device.platform;
		this.PlatformVersion = applican.device.version;
		this.DeviceName = applican.device.name;
		this.ApplicanVersion = applican.device.applican;
		this.Uuid = applican.device.uuid;
		this.UuidRfc4122 = applican.device.uuid_rfc4122;
		this.RegistrationId = "";

		$.ajaxSetup({
			beforeSend: this.setupAjax
		});
	};
	BtApi.prototype = {
		setupAjax: function (xhr, settings) {
			xhr.done(function (data, status, xhr) {
				if (typeof xhr.getResponseHeader != 'function') {
					return;
				}
				var serverContentsVersion = xhr.getResponseHeader("X-Server-Contents-Version");
				if (App.btApi.ContentsVersion && serverContentsVersion && App.btApi.ContentsVersion < serverContentsVersion) {
					console.log("Application finish because old contents.");
					applican.notification.alert(
						AppConf.message.contentsVersionUp,
						function () {},
						AppConf.message.information,
						AppConf.message.yes);
					applican.finish();
				}
			});
			xhr.fail(function (xhr, status, err) {
				if (xhr.status === 503) {
					if (xhr.responseJSON) {
						location.href = xhr.responseJSON.url;
					}
				}
			});
		},
		getDefaultAjaxHeaders: function () {
			var headers = {};
			headers["X-Client-Contents-Version"] = (this.ContentsVersion) ? this.ContentsVersion : null;
			headers["X-Bundle-Id"] = (this.BundleId) ? this.BundleId : null;
			headers["X-Bundle-Version"] = (this.BundleVersion) ? this.BundleVersion : null;
			headers["X-Platform"] = (this.Platform) ? this.Platform : null;
			headers["X-Platform-Version"] = (this.PlatformVersion) ? this.PlatformVersion : null;
			headers["X-Device-Name"] = (this.DeviceName) ? this.DeviceName : null;
			headers["X-Applican-Version"] = (this.ApplicanVersion) ? this.ApplicanVersion : null;
			headers["X-Uuid"] = (this.Uuid) ? this.Uuid : null;
			headers["X-Uuid-Rfc4122"] = (this.UuidRfc4122) ? this.UuidRfc4122 : null;
			headers["X-Registration-Id"] = (this.RegistrationId) ? this.RegistrationId : null;
			return headers;
		},
		getAjaxAuthHeaders: function (image) {
			var headers = this.getDefaultAjaxHeaders();
			var appTypes = {};
			appTypes[ApplicanEx.consts.device.android] = 1;
			appTypes[ApplicanEx.consts.device.iOS] = 2;

			headers.ApplicationId = this.ApplicationId;
			headers["Content-Type"] = "application/json";
			if (App.getAuthInfo().token) {
				headers.Authorization = App.getAuthInfo().token;
			}
			// NOTE : 取得不能な場合（ブラウザ等）はandroidとして送信する
			headers.ApplicationType = appTypes[applican.device.platform] || 1;
			return headers;
		},
		// ログインAPIを叩く
		login: function (userid, password) {
			var a = {};
			a.url = this.rootUrl + "/admin/auth/login";
			// a.url = this.rootUrl + "/admin/auth/creator_login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {
				userId: userid,
				password: password
			};
			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		// ログアウトAPIを叩く
		logout: function () {
			var a = {};
			a.url = this.rootUrl + "/admin/auth/logout"
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			return $.ajax(a);
		},
		getLanguage: function () {
			var a = {};
			a.url = this.rootUrl + "/admin/auth/admin_info"
			a.type = "GET"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/auth/web/admin_info');
			return $.ajax(a);
		},
		// 保存メール削除APIを叩く
		deleteMailDraft: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/mail/delete?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/mail/web/delete?unique_token=' + args.token, "mail");
			a.data = JSON.stringify({
				"id": args.id
			});
			return $.ajax(a);
		},
		// 作成者より配信メールキャンセルのステータス更新APIを叩く
		cancelMail: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/mail/update_status?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/mail/web/update_status?unique_token=' + args.token, "mail");
			a.data = JSON.stringify({
				"id": args.id,
				"status": args.status,
				"comment": args.comment
			});
			return $.ajax(a);
		},
		// 作成者より配信メールキャンセルのステータス更新APIを叩く
		updateStatusCoupon: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/coupon/update_status?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/coupon/web/update_status?unique_token=' + args.token, "coupon");
			a.data = JSON.stringify({
				"id": args.id,
				"cmd": args.cmd
			});
			return $.ajax(a);
		},
		// メール配信・保存APIを叩く
		sendMessage: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/mail/send?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/mail/web/send?unique_token=' + args.token, "mail");
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			var rootUrl = AppConf.url.appRoot.substr(0, lengthUrl);
			var lengthUrl2 = rootUrl.indexOf('//');
			rootUrl = rootUrl.substr(lengthUrl2, rootUrl.length);
			var regex = new RegExp('http:'+rootUrl, 'ig');
			var body = args.body.replace(/↵/gi,'').replace(regex, '');
			regex = new RegExp('https:'+rootUrl, 'ig');
			body = body.replace(regex, '');
			var dataRequest = {
				"id": args.id,
				"name": args.name,
				"type": args.type,
				"htmlFlg": args.htmlFlg,
				"startTime": args.startTime,
				"subject": args.subject,
				"body": body,
				"isSend": args.isSend,
				"scid": args.scid,
				"comment": args.comment,
				"customSegment": AppConf.mail.customSegment,
				"segmentId" : AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl
			};
			// if(!(dataRequest.id && dataRequest.scid)){
			// 	dataRequest.segmentId = AppConf.mail.segmentId;
			// }
			a.data = JSON.stringify(dataRequest);
			return $.ajax(a);
		},
		// クーポン配信・保存APIを叩く
		sendCoupon: function (args) {
			var a = {};
			// a.url = this.rootUrl + "/admin/workflow/coupon/save";
			a.url = this.rootUrl + "/admin/workflow/coupon/save";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/coupon/web/save?coupon');
			a.data = JSON.stringify({
				"actionType": args.actionType,
				"couponMaster": args.couponMaster
			});
			return $.ajax(a);
		},
		// 画像アップロードAPIを叩く
		uploadImage: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/image/upload?unique_token=" + args.token;
			a.type = "POST";
			a.headers = this.getAjaxAuthHeaders("image");
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/image/web/upload?unique_token=' + args.token, "mail");
			delete a.headers["Content-Type"];
			a.cache = false;
			a.processData = false;
			a.contentType = false;
			a.data = args.data;
			return $.ajax(a);
		},
		uploadImageNotification: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/notification/image_upload?unique_token=" + args.token;
			a.type = "POST";
			a.headers = this.getAjaxAuthHeaders("image");
			this.setHeaderRequestWeb.bind(a)('/admin/notification/web/image_upload?unique_token=' + args.token, "notification");
			delete a.headers["Content-Type"];
			a.cache = false;
			a.processData = false;
			a.contentType = false;
			a.data = args.data;
			return $.ajax(a);
		},
		// テンプレート保存APIを叩く
		saveTemplate: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/mail/save_template?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/mail/web/save_template?unique_token=' + args.token, "mail");
			a.data = JSON.stringify({
				"name": args.name,
				"htmlFlg": args.htmlFlg,
				"mailType": args.mailType,
				"subject": args.subject,
				"body": args.body.replace(/↵/gi,'')
			});
			return $.ajax(a);
		},
		// テンプレート削除APIを叩く
		deleteTemplate: function (args) {
			var a = {};
			a.url = this.rootUrl + "/admin/workflow/mail/delete_template?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/workflow/mail/web/delete_template?unique_token=' + args.token, "mail");
			a.data = JSON.stringify({
				"id": args.id
			});
			return $.ajax(a);
		},
		setHeaderRequestWeb: function (url, type) {
			// if(AppConf.chart.webFlag && AppConf.chart.sessionId){
			// 	this.headers.p = AppConf.chart.sessionId || App.util.common.getUrlParameter('p');
			// 	this.url = AppConf.url.appRoot + url;
			// }
			// if(AppConf.mail.webFlag && AppConf.mail.sessionId){
			// 	this.headers.p = AppConf.mail.sessionId;
			// 			this.url = AppConf.url.appRoot + url;
			// }
			// if(AppConf.coupon.webFlag && AppConf.coupon.sessionId){
			// 	this.headers.p = AppConf.coupon.sessionId;
			// 	this.url = AppConf.url.appRoot + url;
			// }
			// if(AppConf.notification.webFlag && AppConf.notification.sessionId){
			// 	this.headers.p = AppConf.notification.sessionId;
			// 	this.url = AppConf.url.appRoot + url;
			// }

			if(AppConf.webConf.webFlag && AppConf.webConf.sessionId){
				this.headers.p = AppConf.webConf.sessionId;
				this.url = AppConf.url.appRoot + url;
			}
			// switch(type) {
			// 	case "chart" : 					
			// 		if (AppConf.chart.webFlag) {
			// 			this.headers.p = AppConf.chart.sessionId || App.util.common.getUrlParameter('p');
			// 			this.url = AppConf.url.appRoot + url;
			// 		}
			// 		break;
			// 	case "mail" : 					
			// 		if (AppConf.mail.webFlag) {
			// 			this.headers.p = AppConf.mail.sessionId;
			// 			this.url = AppConf.url.appRoot + url;
			// 		}
			// 		break;
			// 	case "coupon": 				
			// 		if (AppConf.coupon.webFlag) {
			// 			this.headers.p = AppConf.coupon.sessionId;
			// 			this.url = AppConf.url.appRoot + url;
			// 		}
			// 		break;
			// 	case "notification": 
			// 		if (AppConf.notification.webFlag) {
			// 			AppConf.notification.sessionId = AppConf.notification.sessionId || App.util.common.getUrlParameter('p');
			// 			this.headers.p = AppConf.notification.sessionId;
			// 			this.url = AppConf.url.appRoot + url;
			// 		}
			// 		break;
			// }
		},
		// お知らせ配信・保存APIを叩く
		sendNotification: function( args ){
			var a = {};
			a.url = this.rootUrl + "/admin/notification/save?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/notification/web/save?unique_token=' + args.token, "notification");
			a.data = JSON.stringify(args.notificationMaster);
			return $.ajax(a);
		},
		// 保存お知らせ削除APIを叩く
		deleteNotificationDraft: function( args ){
			var a = {};
			a.url = this.rootUrl + "/admin/notification/remove?unique_token=" + args.token;
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/notification/web/remove?unique_token=' + args.token, "notification");
			a.data = JSON.stringify({
				"notificationId": args.id
			});
			return $.ajax(a);
		},
		reportNotificationDraft: function( args ){
			var a = {};
			a.url = this.rootUrl + "/admin/notification/report?unique_token=" + args.token;
			a.type = "GET"
			a.headers = this.getAjaxAuthHeaders();
			this.setHeaderRequestWeb.bind(a)('/admin/notification/web/report?unique_token=' + args.token, "notification");
			a.data = JSON.stringify({
				"notificationId": args.id
			});
			return $.ajax(a);
		},
		saveFilterShop: function( args ){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/save_filter?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/save_filter";
			}
			
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"key": args.key,
				"value": args.value,
				"p": App.util.common.getUrlParameter('p')
			});
			return $.ajax(a);
		},
		saveSegment: function( args ){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/save_segment?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/save_segment"
			}
			
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"chartId": args.chartId,
				"type": args.type,
				"startDate": args.startDate,
				"endDate": args.endDate,
				"x": args.x,
				"y": args.y,
				"p": App.util.common.getUrlParameter('p')
			});
			return $.ajax(a);
		},
		updateSegment: function( args ){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/update_segment?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/update_segment"
			}
			
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"segmentId": args.segmentId,
				"p": App.util.common.getUrlParameter('p')
			});
			return $.ajax(a);
		},
		saveUserDefine: function( args ){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/save_user_define?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/save_user_define";
			}
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"chartPage": "DashBoard",
				"id": args.chartId,
				"p": App.util.common.getUrlParameter('p'),
				"fullWidthFlg": args.fullWidthFlg,
				"chartType": args.chartType,
				"displayFlg": args.displayFlg
			});
			return $.ajax(a);
		},
		saveUserOther: function( args ){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/save_user_order?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/save_user_oder";
			}
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"chartPage": "DashBoard",
				"orderValue": args.orderValue,
				"p": App.util.common.getUrlParameter('p'),
			});
			return $.ajax(a);
		},
		resetChartList: function(){
			var a = {};
			if (AppConf.chart.webFlag){
				a.url = this.rootUrl + "/admin/webchart/reset_default?p=" + App.util.common.getUrlParameter('p');
			} else {
				a.url = this.rootUrl + "/admin/chart/reset_default";
			}
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			a.data = JSON.stringify({
				"p": App.util.common.getUrlParameter('p')
			});
			return $.ajax(a);
		}
	};
	return BtApi;

})();