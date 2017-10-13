// Libraries
// 
window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// App Core
var Router = require('./router');
var AppModel = require('./models/app_model');
var MainLayout = require('./main_layout.js');
var SidebarModel = require('./sidebar/sidebar_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

// Features

//////////
// DEMO Features
var DialogueCommonItemView = require('./features/dialogue/dialogue_common_item_view.js');
var SelectTemplateRouter = require( './features/workflowmail/select_template/selectTemplate_router' );
var MessageContentRouter = require( './features/workflowmail/message_content/messageContent_router' );
var MessageSettingRouter = require( './features/workflowmail/message_setting/messageSetting_router' );
var ConfirmRouter = require( './features/workflowmail/confirm/confirm_router' );
var CouponRouter = require( './features/coupon/coupon_list/coupon_list_router' );
var CouponTypeRouter = require( './features/coupon/coupon_type/coupon_type_router' );
var CouponInformationRouter = require( './features/coupon/coupon_information/coupon_information_router' );
var CouponContentRouter = require( './features/coupon/coupon_content/coupon_content_router' );
var CouponSettingRouter = require( './features/coupon/coupon_setting/coupon_setting_router' );
var CouponConfirmRouter = require( './features/coupon/coupon_confirm/coupon_confirm_router' );
var ChartBoardRouter = require( './features/chart/dashboard/chart_router' );
var AnalysisRouter = require( './features/chart/analysis/analysis_router' );
var NotificationListRouter = require( './features/notification/notification_list/notificationList_router' );
var NotificationSettingRouter = require( './features/notification/notification_setting/notificationSetting_router' );
var NotificationContentRouter = require( './features/notification/notification_content/notificationContent_router' );
var NotificationConditionRouter = require( './features/notification/notification_condition/notificationCondition_router' );
var NotificationLocalRouter = require( './features/notification/notification_local/notificationLocal_router' );
var NotificationConfirmRouter = require( './features/notification/notification_confirm/notificationConfirm_router' );

// UTILS
var TextUtil = require('./utils/text');
var StyleUtil = require('./utils/style.js');
var DebugUtil = require('./utils/debug.js');
var DateUtil = require('./utils/date.js');
var BtApi = require('./utils/bt_api');
var ApplicanEx = require('./utils/applican_ex');
var D3ChartsUtil = require('./utils/d3_chart.js');
var CommonUtil = require('./utils/common.js');

/**
 * 雛形アプリのメインオブジェクト
 * グローバルにインスタンスを配置する想定
 * Backbone.Marionette.Application
 */
module.exports = (function () {
	var mainApp = new Backbone.Marionette.Application();

	// util メソッド定義
	mainApp.util = {};
	// D3 Charts
 	mainApp.util.d3Chart = D3ChartsUtil;
	// Text 
	mainApp.util.text = TextUtil;
	// Style
	mainApp.util.style = StyleUtil;
	// Debug
	mainApp.util.debug = DebugUtil;
  // Date
	mainApp.util.date = DateUtil;
	// Common 
	mainApp.util.common = CommonUtil;
	// Applican
	mainApp.applican = new ApplicanEx();
	// BT API
	mainApp.btApi = new BtApi( {
		ApplicationId : AppConf.core.applicationId,
		rootUrl: AppConf.url.appRoot,
		ContentsVersion : AppConf.core.contentsVersion,
	});

	mainApp.sidebarModel = new SidebarModel();
	mainApp.dialogueCommon = new DialogueCommonItemView({ type: "" });

	// Appスタート
	// onDeviceReadyにてapp.startされる
	mainApp.onStart = function(){

		this.appModel = new AppModel(); 
		mainApp.listenTo( this.appModel, 'ready', function(model){

      // registration id 関連の処理
      // 
      mainApp.applican.getBtPushTokenPromise().done(function(result){

				var old = model.getPushToken(); 
				var registrationId = result.registrationId;

				// LivepassのRegistrationIDをCRMに登録
				// mainApp.btApi.insert({
				// 	registrationId: registrationId,
				// 	old: old
				// })
				// .fail(function(){
				// 	applican.notification.alert("registration id の登録に失敗しました。", function(){}, "", "OK");
				// });

				model.set("pushToken", result.registrationId );
				model.save();

				// Livepassのセッティングを適用
				mainApp.applican.livepassSetSettingsPromise()
				.fail(function(d){ console.log("Livepass 設定情報反映エラー"); console.log(d);})
				.done(function(d){ console.log("Livepass 設定情報反映成功"); console.log(d);}) 
			});

		});

		mainApp.listenTo( this.appModel, 'change-lang', function(model){

			// features
			var router = new Router();
			var selectTemplateRouter = new SelectTemplateRouter();
			var messageContentRouter = new MessageContentRouter();
			var messageSettingRouter = new MessageSettingRouter();
			var confirmRouter = new ConfirmRouter();
			var couponRouter = new CouponRouter();
			var couponTypeRouter = new CouponTypeRouter();
			var couponInformationRouter = new CouponInformationRouter();
			var couponContentRouter = new CouponContentRouter();
			var couponSettingRouter = new CouponSettingRouter();
			var couponConfirmRouter = new CouponConfirmRouter();
			var chartBoardRouter = new ChartBoardRouter();
			var analysisRouter = new AnalysisRouter();
			var notificationListRouter = new NotificationListRouter();
			var notificationSettingRouter = new NotificationSettingRouter();	
			var notificationContentRouter = new NotificationContentRouter();		
			var notificationConditionRouter = new NotificationConditionRouter();
			var notificationLocalRouter = new NotificationLocalRouter();
			var notificationConfirmRouter = new NotificationConfirmRouter();
			Backbone.history.start();
			
			this.mainLayout.renderSideBarAndDialogueCommon();

		});

		this.appModel.safeFetch();
		this.mainLayout = new MainLayout( {el: $('#main-layout')} );
		this.mainLayout.render();
		this.pageSlider = new PageSlider({
			container: $('#master-container'),
			initialHistory: [""]
		});
		this.appModel.getLanguageInfo();

		

		// $(window).on("scroll" , function(e){
		// 	var bottomPos = 100;

		// 	var scrollHeight = $(document).height();
		// 	var scrollPosition = $(window).height() + $(window).scrollTop();

		// 	//スクロールが下に行った時の処理
		// 	if (scrollPosition > scrollHeight - bottomPos)
		// 	{
		// 		App.vent.trigger("reach:bottom");
		// 	}
		// });
	};



	mainApp.addAuthenticationHeaderToXHR = function(xhr){
		var auth = mainApp.getAuthInfo();
		xhr.setRequestHeader('Authorization', auth.token || "dummy" );
		mainApp.addApplicationHeaderToXHR(xhr);
		// if(AppConf.mail.webFlag && AppConf.mail.sessionId){
		// 	xhr.setRequestHeader('p', AppConf.mail.sessionId );
		// }
		// if(AppConf.coupon.webFlag && AppConf.coupon.sessionId){
		// 	xhr.setRequestHeader('p', AppConf.coupon.sessionId );
		// }
		// if(AppConf.notification.webFlag && AppConf.notification.sessionId){
		// 	xhr.setRequestHeader('p', AppConf.notification.sessionId );
		// }
		if(AppConf.webConf.webFlag && AppConf.webConf.sessionId){
			xhr.setRequestHeader('p', AppConf.webConf.sessionId );
		}
	};
	mainApp.addApplicationHeaderToXHR = function(xhr){
		xhr.setRequestHeader('ApplicationId', AppConf.core.applicationId );
	};

	mainApp.initializeXHR = function(xhr){
		// default http header setting
		_.each(mainApp.btApi.getDefaultAjaxHeaders(), function(value, key, list){
			xhr.setRequestHeader(key, value);
		});

		// setup Ajax
		App.btApi.setupAjax(xhr);
	};

	mainApp.vent.on('app-login', function( data ){
		// do nothing for now
	});

	mainApp.getAuthInfo = function(){
		return mainApp.appModel.get("auth");
	};



	// ローディング表示用のDOMをSTRINGで返す
	mainApp.util.injectProgressScreenDom = function(loading){
		if ( loading == '1' ) {
			return require('./progress_screen1.html')();
		} else {
			return require('./progress_screen.html')();
		}
	};

	// ローディングを表示する
	mainApp.util.showProgressScreen = function(loading){
		if ( loading == '1' ) {
			mainApp.mainLayout.$('.progress-screen1').addClass('show').addClass('visible');
			mainApp.mainLayout.$('.progress-screen1 .progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
		} else {
			mainApp.mainLayout.$('.progress-screen').addClass('show').addClass('visible');
			mainApp.mainLayout.$('.progress-screen .progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
		}
	};
	// ローディングを非表示にする
	mainApp.util.hideProgressScreen = function(loading){
		if ( loading == '1' ) {
			mainApp.mainLayout.$('.progress-screen1').removeClass('visible');
			setTimeout(function(){
				mainApp.mainLayout.$('.progress-screen1').removeClass('show');
			}, 220);	
		} else {
			mainApp.mainLayout.$('.progress-screen').removeClass('visible');
			setTimeout(function(){
				mainApp.mainLayout.$('.progress-screen').removeClass('show');
			}, 220);
		}
		$('body').trigger('sync-end');
	};
	// リクエストの前にLoadingスクリーンを表示し、エラーまたは正常終了で消してくれる
	// 引数 : jqXHRオブジェクトを返す関数オブジェクト
	mainApp.util.execWithProgressScreen = function( reqFunction, loading ){
		// Execution
		if ( loading == '1' ) {
			mainApp.util.showProgressScreen('1');
			return reqFunction()
			.done(function(){
				mainApp.util.hideProgressScreen('1');
			}).fail(function(){
				mainApp.util.hideProgressScreen('1');
			});
		} else {
			mainApp.util.showProgressScreen();
			return reqFunction()
			.done(function(){
				if ( !loading ) {
					mainApp.util.hideProgressScreen();
				}
			}).fail(function(){
				mainApp.util.hideProgressScreen();
			});
		}
	};
	// model/collectionのリクエスト発行時にローディングスクリーンを表示し、
	// 正常、異常終了時に非表示にする
	mainApp.util.bindProgressScreen = function( view, modelOrCollection ){
		view.listenTo( modelOrCollection, 'request' , mainApp.util.showProgressScreen );
		view.listenTo( modelOrCollection, 'sync' , mainApp.util.hideProgressScreen );
		view.listenTo( modelOrCollection, 'error' , mainApp.util.hideProgressScreen );
	};

	// ajaxリクエストを返す処理に、デフォルトのエラーハンドリングを付与する
	// 引数 
	// jqXHR : jqXHRオブジェクト
	// options: ignoreStatuses - ex. [ 401, 402, 403 ]
	//          afterHandling - function which you wish to execute after common err handling
	mainApp.util.bindCommonErrorHandling =  function(jqXHR, options){
		var options = options || {};
		var ignoreStatuses = options.ignoreStatuses || [];
		var afterAlertCallback = options.afterAlertCallback || App.doNothing;

		return jqXHR.fail( function(err){
			// err.status が ignoreStatusesに含まれている場合は何もしない
			if( ignoreStatuses.indexOf(err.status) === -1){
				// applican.notification.alert("エラーが発生しました。", afterAlertCallback, "", "OK");
			}
			if( options.afterHandling ){ options.afterHandling(); }
		});
	};

	mainApp.util.number = {
		roundEx: function( number, digitsAfterDecimalPoint ){
			var offset = Math.pow(10, digitsAfterDecimalPoint);
			return Math.round( number * offset  ) / offset
		},
	};

  mainApp.doNothing = function(){};

	return mainApp;

})();
