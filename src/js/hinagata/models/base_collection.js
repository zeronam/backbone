var Backbone = require('backbone');
var querystring = require('querystring');
module.exports = (function () {

	/**
	 * APPの基底Backbone.Collectionクラス
	 * options
	 *  pagination: ページングするか否か
	 */
	var BaseCollection = Backbone.Collection.extend({
		initialize: function(options){
			var options = options || {};
			this.pagination = options.pagination || false;
			this.perPage1 = options.perPage1;
			this.orderColumnName = options.orderColumn;
			this.orderType = options.orderType;
			this.maxPage = 1;
			this.currentPage = 0;
			this.totalCount = 0;
			this.registeredStatus;
			this.delivStopRights;
		},
		/**
		 * Backbone.Collection#fetchのWrapper
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetch のオプション
		 *           getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		_fetch: function( options ){
			var options = options || {};
			if( options.remove !== false ){
				this._resetPaging();
			}
			
			var getParams  = _.extend( options.getParams || {} , this._getOptionsForPagination() );

			if( options.url ){
				options.url = options.url +  "&" + querystring.encode( getParams );
			}else{
				options.url = this.url + "?" + querystring.encode( getParams );
			}

			var _this = this;
			return this.fetch(options)
			.done(function(data) {
				_this.currentPage = data.page;
				_this.maxPage = data.maxPage;
				_this.totalCount = data.totalCount;
				_this.registeredStatus = data.registeredStatus;
				_this.delivStopRights = data.delivStopRights;
				_this.trigger("page-info-has-been-set");
			});
		},
		/**
		 * ヘッダに認証情報を付与した後にajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *        : on401 - トークンが無効の場合の動作(デフォルト: alert->ログイン画面へ遷移)
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR });
			var on401 = _options.on401 || function() {
				App.dialogueCommon.setType("notLogin");
				if (AppConf.chart.webFlag){
					$('#chart_board').html('<p>アクセスエラー, 不正なアクセスまたは、多重ログイン、タイムアウトによりセッションがクローズされた可能性があります。大変お手数ですが、一旦ログアウトいただきまして、再ログインをお願いいたします。</p>');
      			} else {
      				App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.notLoginTitleErr, App.appModel.getLanguageType().common.dialogueError.notLoginTitleErr);
      			}
                
				App.util.hideProgressScreen();
			};

			var on403 = _options.on403 || function() {
				App.util.text.setTitleError(App.appModel.getLanguageType().mail.main.dialogueError.getMainTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.getMainMsgErr, ".list-message #main-nav-region", "main-wrapper");
				$("#search-terms").prop("disabled", true);
				App.util.hideProgressScreen();
			};

			return this._fetch(_options)
			.fail(function(res) {
				if ( res.status === 401 ) {
					on401();
				} else {
					on403();
				}
			});
		},
		/**
		 * ヘッダにApplicationIdを付与してajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this._fetch(_options);
		},
		/**
		 * returns boolean:ページングの最終ページまで読み込んだか否かを戻す
		 *                 ページングしていない場合は最後まで読み込んだと判定
		 */
		isAtLastPage: function(){
			return !this.pagination || this.maxPage <= this.currentPage;
		},
		getTotalCount: function() {
			var totalCount = 0;
			if ( this.totalCount ) {
				totalCount = this.totalCount;	
			}
			return totalCount;
		},
		getRegisStatus: function() {
			return this.registeredStatus;
		},
		getDelivStopRight: function() {
			return this.delivStopRights;
		},
		/**
		 * ページ情報をリセットする
		 */
		_resetPaging: function(){
			this.maxPage = 0;
			this.currentPage = 0;
		},
		// 現在のページングに応じた、ページネーション用のURLパラメータ
		_getOptionsForPagination: function(){
			var perPage;
			if ( this.perPage1 ) {
				perPage = this.perPage1;
			} else {
				perPage = AppConf.core.defaultPerPage;
			}
			// var orderColumnTmp = "'" + this.orderColumn + "'";
			// if ( this.orderColumn ) {
			// 	orderColumnTmp = "'" + this.orderColumn + "'";
			// }
			if ( this.pagination && this.orderColumnName ) {
				return { page: (this.currentPage || 0) + 1, perPage: perPage, orderType: this.orderType, orderColumn: this.orderColumnName };
			} else if ( this.pagination ) {
				return { page: (this.currentPage || 0) + 1, perPage: perPage };
			} else if ( this.orderColumn ) {
				return { orderColumn: this.orderColumnName, orderType: this.orderType };				
			} else {
				return {};
			}
			// if( this.pagination ){
			// 	return { page: (this.currentPage || 0) + 1, perPage: AppConf.core.defaultPerPage };
			// }else{
			// 	return {};
			// }
		},
		webFlag: function(options){
			return this.fetch(options);
		}
	});
	return BaseCollection;
})();
