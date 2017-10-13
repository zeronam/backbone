var Backbone = require('backbone');
var ValidationModel = require('../models/validation_model.js');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_template.html'),
		events: function() {
			return ( applican.config.device_os === "IOS" ) ?
			{
				"touchend .login-btn" : "execLogin",
				"touchend #login-wrapper .multi_language li": "changeLanguage"
			}:
			{
				"click .login-btn" : "execLogin",
				"click #login-wrapper .multi_language li": "changeLanguage"
			}
		},
		ui: {
			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]"
		},
		templateHelpers: {
			getBtnLogin: function() {
				return App.appModel.getLanguageType().login.btnLogin;
			},
			getPasswordText: function() {
				return App.appModel.getLanguageType().login.passwordText;
			}
		},
		initialize: function(options){
			this.validationModel = new ValidationModel();
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputId.val( auth.userid );
			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			var _this = this;
			var userid = this.ui.inputId.val();
			var password = this.ui.inputPassword.val();

			this.validationModel.set({userId: userid, password: password},{validate:true});

			if ( this.validationModel.validationError === null || this.validationModel.validationError === "" ) {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.login( userid, password)
						// { ignoreStatuses: [404] }
					);
				};

				var UI = this.ui;
				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest, "1" )
				.done( function(data){
					// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
					App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken, loginName: data.loginName } );
					// App.pageSlider.back();
					App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken, loginName: data.loginName });
					// close sidebar
					App.dialogueCommon.closeSideBar();
					//get Language
					App.btApi.getLanguage().done(function(res) {
						if(res.languageType == "en" || res.languageType == "ja"){
							App.appModel.setLanguage(res.languageType);
							// App.appModel.setLanguage("en");
						} else {							
							App.appModel.setLanguage("ja");
						}
						//Go to select Type
						_this.updateLanguage();
						location.hash = "chartBoard";
					}).fail(function(err) {
						App.appModel.setLanguage("ja");
						//Go to select Type
						_this.updateLanguage();
						location.hash = "chartBoard";						
					});
					// location.hash = "workflow-mail";
				}).fail(function(err){
					if(err.status === 401){						
						App.dialogueCommon.showDialogue(App.appModel.getLanguageType().login.dialogueError.loginTitleErr, App.appModel.getLanguageType().login.dialogueError.loginWrongMsgErr);
					} else{
						App.dialogueCommon.showDialogue(App.appModel.getLanguageType().login.dialogueError.loginTitleErr,  App.appModel.getLanguageType().login.dialogueError.loginSystemMsgErr);
					}
				});
			} else {
				this.onError( this.validationModel.validationError );
			}
		},
		onError: function(msg) {
			var msg;
        	if ( msg.userId ) {
        		msg = msg.userId;
        	}
        	if ( msg.password ) {
        		msg = msg.password;
        	}
        	App.dialogueCommon.showDialogue(App.appModel.getLanguageType().login.dialogueError.loginTitleErr, msg);
        },
        changeLanguage: function(e) {
			e.preventDefault();
			App.util.showProgressScreen();
			var _this = $(e.currentTarget);
			var index = $(_this).index();
			$("#login-wrapper .multi_language li").removeClass("active");
			$(_this).addClass("active");
			App.dialogueCommon.setType("changeLanguage");
			switch ( index ) {
				case 0:
					App.appModel.setLanguage("en");
					$("#login-wrapper .multi_language li:eq(0) .st2, #login-wrapper .multi_language li:eq(0) .st4").css({"stroke": "#D0202D"});
					break;
				case 1:
					$("#login-wrapper .multi_language li:eq(0) .st2, #login-wrapper .multi_language li:eq(0) .st4").css({"stroke": "#999"});
					App.appModel.setLanguage("ja");
					break;
			}
			App.appModel.safeFetch({flg: "1"});
			this.updateLanguage();
			App.util.hideProgressScreen();
		},
		updateLanguage: function(e) {
			$("#sidebar-left .logo_name").text(App.appModel.getLanguageType().sidebar.companyName);
			$("#sidebar-left .mail_name").text(App.appModel.getLanguageType().sidebar.mail);
			$("#sidebar-left .coupon_name").text(App.appModel.getLanguageType().sidebar.coupon);
			$("#sidebar-left .point_name").text(App.appModel.getLanguageType().sidebar.subscribers);
			$("#sidebar-left .report_name").text(App.appModel.getLanguageType().sidebar.report);
			$("#sidebar-left .information_name").text(App.appModel.getLanguageType().sidebar.information);
			$("#sidebar-left .config_name").text(App.appModel.getLanguageType().sidebar.config);
			$("#sidebar-left .push_name").text(App.appModel.getLanguageType().sidebar.notification);
			if ( App.appModel.getAuthInfo().loginName === null && !App.appModel.getAuthInfo().loginName ) {
				$("#sidebar-left #loginName").text(App.appModel.getLanguageType().sidebar.loginName);
			}
			$("#sidebar-left .logout_name").text(App.appModel.getLanguageType().sidebar.logout);
			$("#sidebar-left .profile_name").text(App.appModel.getLanguageType().sidebar.profile);
			
			// set login form
			$("#password-label").text(App.appModel.getLanguageType().login.passwordText);
			$("#password").attr("placeholder", App.appModel.getLanguageType().login.passwordText);
			$(".login-btn").text(App.appModel.getLanguageType().login.btnLogin);

			// set dialogue common
			$("#dialogue-common-region .title_dialogue").text(App.appModel.getLanguageType().common.dialogue.backHomeTitle);
			$("#dialogue-common-region .message").text(App.appModel.getLanguageType().common.dialogue.backHomeMsg);
			$("#dialogue-common-region .btn_cancel_home").text(App.appModel.getLanguageType().common.dialogue.backHomeBtnCancel);
		}
	});

	return LoginView;

})();
