var Backbone = require('backbone');
var BaseModel = require('./base_model');
/**
 * アプリケーションのグローバル情報を保持、管理する
 * 情報はLocalStoregaに保管
 */
module.exports = (function () {

	var initialAuth = {
		userid : "",
		password : "",
		token : "",
		loginName: ""
	};

	var AppModel = BaseModel.extend({
		localStorage: new Backbone.LocalStorage("AppBase"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey,
			auth: initialAuth,
			// tutorialShown: false,
			pushToken: "", // PUSH SDK の registrationIdを保管
			language: "ja"
		},
		getAuthInfo: function(){
			return this.get("auth");
		},
		getPushToken: function(){
			return this.get("pushToken");
		},
		/**
		 * ログアウト状態としてデータを上書き保存する
		 * auth情報を初期化
		 */
		saveAsLogout: function(){
			this.get("auth").token = initialAuth.token;
			this.get("auth").loginName = initialAuth.loginName;
			this.save();
		},
		/**
		 * authオブジェクトをmodel.attributes.auth に適用してsaveを実行する
		 * args: auth ::{ userid: xxx, password: token, new: xxx}
		 */
		setAuthAndSave: function( auth ){

			var authInfo = this.get("auth");
			authInfo.token = auth.token;
			authInfo.userid = auth.userid;
			authInfo.password = auth.password;
			authInfo.loginName = auth.loginName;

			this.set("auth", authInfo);
			this.save();
		},
		setLanguage: function(language) {
			this.set("language", language);
			this.save();
		},
		getLanguage: function() {
			return this.get("language");
		},
		getLanguageType: function() {
			var languageType = this.getLanguage();
			var language;
			switch ( languageType ) {
				case "ja":
					language = AppConf.JA;
					break;
				case "en":
					language = AppConf.EN;
					break;
			};
			return language;
		},
		/**
		 * Backbone.Model#fetchのwrapper
		 * 処理完了(done/fail)時に「ready」イベントを発火させる
		 * NotFoundErrorもエラーと見なさない（初回起動時は見つからない想定)
		 */
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				if ( !_options.flg ) {
					_this.trigger('ready', _this);
				}
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				if ( !_options.flg ) {
					_this.trigger('ready', _this);
				}
			});
		},
		getLanguageInfo: function(){
			var _this = this;
			if(AppConf.webConf.webFlag == true){
				App.btApi.getLanguage().done(function(res) {
		            if(res.languageType == "en" || res.languageType == "ja"){
		                _this.setLanguage(res.languageType);   
		                // _this.setLanguage("en");  
		            } else {
		                _this.setLanguage("ja");
		            }
		            _this.trigger('change-lang', _this);
		        }).fail(function(err) {
		            _this.setLanguage("ja");  
		            _this.trigger('change-lang', _this);                    
		        });
		    }else {
		    	_this.setLanguage("ja");  
	            _this.trigger('change-lang', _this);
		    }
		}
	});

	return AppModel;
})();
