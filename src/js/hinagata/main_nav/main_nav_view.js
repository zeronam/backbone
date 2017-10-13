var Backbone = require('backbone');
var MainNavCollection = require('./main_nav_collection.js');
var MainNavCollection1 = require('./main_nav_collection1.js');
var MainNavCollectionView = require('./main_nav_collection_view.js');
var HistoryCollection = require("../features/workflowmail/approval_history/message_history_collection.js");
var HistoryCollectionView = require("../features/workflowmail/approval_history/message_history_collection_view.js");

var DialogueItemView = require('../features/dialogue/dialogue_item_view.js');

var DataModel = require('../models/data_model.js');
var TokenModel = require('../models/token_model.js');

module.exports = (function () {
	var MainNavView = Backbone.Marionette.LayoutView.extend({
		template: require('./main_nav.html'),
		regions: {
			"navRegion": "#create_message #main-nav-region",
			"dialogueRegion": "#dialogue-region"
		},
		SidebarConf: {
      		showSidebar: true
    	},
		events: function() {
			return ( applican.config.device_os === "IOS" ) ?
			{
				"touchend #open_dialogue_active" : "action_dialogue_active",
				"touchend #open_dialogue_scheduled" : "action_dialogue_scheduled",
				"touchend #open_dialogue_draft" : "action_dialogue_draft",
				"touchend #open_dialogue_cancel": "action_dialogue_cancel",
				"touchend #create_message #open_all" : "all_message",
				"touchend #create_message #open_active" : "message_active",
				"touchend #create_message #open_scheduled" : "message_scheduled",
				"touchend #create_message #open_draft" : "message_draft",
				"touchend #create_message #open_confirm_wait" : "message_wait_approve",
				"touchend #stop_action" : "showStopSend",
				"touchend #cancel_action" : "cancelMailSend",
				"touchend .cancelbtnact"	: "closeAll",
				"touchend .cancelbtn": "closeAll",
				"touchend .confirmbtn": "stopMailSend",
				"touchend #create_message #search-label" : "showSearchinput",
				"touchend #create_message .fa-times" : "turnOffSearch",
				"keyup #create_message #search-terms": "search",
				"touchend #create_message #open_history": "showApprovalHistory",
				"touchend #create_message #history-back": "backMainMessage",
				"touchend .listact .dialog-view": "viewMessage",
				"touchend .listact .dialog-edit": "editMessage",
				"touchend .listact .dialog-duplicate": "duplicateMessage",
				"touchend .listact .dialog-delete": "deleteMailDraft",
				"touchend .listact .dialog-history": "showApprovalHistory"
			}:
			{
				"click #open_dialogue_active" : "action_dialogue_active",
				"click #open_dialogue_scheduled" : "action_dialogue_scheduled",
				"click #open_dialogue_draft" : "action_dialogue_draft",
				"click #open_dialogue_cancel": "action_dialogue_cancel",
				"click #create_message #open_all" : "all_message",
				"click #create_message #open_active" : "message_active",
				"click #create_message #open_scheduled" : "message_scheduled",
				"click #create_message #open_draft" : "message_draft",
				"click #create_message #open_confirm_wait" : "message_wait_approve",
				"click #stop_action" : "showStopSend",
				"click #cancel_action" : "cancelMailSend",
				"click .cancelbtnact"	: "closeAll",
				"click .cancelbtn": "closeAll",
				"click .confirmbtn": "stopMailSend",
				"click #create_message #search-label" : "showSearchinput",
				"click #create_message .fa-times" : "turnOffSearch",
				"keyup #create_message #search-terms": "search",
				"click #create_message #open_history": "showApprovalHistory",
				"click #create_message #history-back": "backMainMessage",
				"click .listact .dialog-view": "viewMessage",
				"click .listact .dialog-edit": "editMessage",
				"click .listact .dialog-duplicate": "duplicateMessage",
				"click .listact .dialog-delete": "deleteMailDraft",
				"click .listact .dialog-history": "showApprovalHistory",
				"click .listact .dialog-cancel" : "cancelMail"
			}
		},
		templateHelpers: {
			getTitle: function() {
				return App.appModel.getLanguageType().mail.menu.titleMail;
			},
			getMenuAll: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.all;
			},
			getMenuActive: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.active;
			},
			getMenuScheduled: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.scheduled;
			},
			getMenuDraft: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.draft;
			},
			getMenuWaitApprove: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.waitApprove;
			},
			getMenuSent: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.sent;
			},
			getSearchPlaceholder: function() {
				return App.appModel.getLanguageType().mail.menu.menuTopMail.searchPlaceholder;
			},
			getBtnHistory: function() {
                return App.appModel.getLanguageType().common.dialogue.btnHistory;
            }
  		},
		initialize: function(options){
			this.navCollection = new MainNavCollection({
				pagination: true,
				orderColumn: AppConf.mail.orderColumn,
				orderType: AppConf.mail.orderType
			});
			this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
			this.dataModel.safeFetch();
			AppConf.webConf.segmentId = undefined;
			// if(AppConf.mail.webFlag){
			// 	if(!App.util.common.getUrlParameter('p') && AppConf.mail.sessionId){
			// 		location.hash += '?p=' + AppConf.mail.sessionId;
			// 	}
			// }

			this.historyCollection = new HistoryCollection( { pagination: true } );
			if ( this.dataModel ) {
				var statusAction = this.dataModel.getStatusAction();
				if ( statusAction === "sendMessageSuccess" || statusAction === "saveMessageSuccess" ) {
					this.navCollection.setType(0);
					this.statusSearch = "all";
				} else {
					this.navCollection.setType(0);
					this.statusSearch = "all";
				}
			} else {
				this.navCollection.setType(0);
				this.statusSearch = "all";
			}
			this.dataModel.destroy();
			this.dataModel.clear();

      		this.tokenModel = new TokenModel();

			App.dialogueCommon.setType("workflow-mail");
			App.dialogueCommon.closeSideBar();
			
			App.util.bindProgressScreen(this, this.navCollection);
			this.listenTo(this.navCollection, 'page-info-has-been-set', this._renderListMessage);
			App.util.bindProgressScreen(this, this.historyCollection);
			this.listenTo(this.historyCollection, 'sync', this._renderListHistory);
			this.listenTo(App.vent, 'reach:bottom:message', this._renderPageNationMessage);
			this.listenTo(App.dialogueCommon, "actionMailSuccess", this.actionMailSuccess);


			this.listenTo(this, 'load:sync', this.onLoad);
			$(window).on('resize', _.bind(this.onResize, this));		
		},
		onRender: function(){
			// AppConf.mail.sessionId = App.util.common.getUrlParameter('p');
			// if(AppConf.mail.sessionId){
			// 	this.dataModel.set('sessionId', AppConf.mail.sessionId);
			// 	this.dataModel.save();
			// }
			this.fetchMessage({remove:true});
			this.showRegion();
			this.$el.find('.list-message').on('scroll', _.debounce(this.checkScroll,500));
		},
		checkScroll: function() {
			var triggerPoint = 20;
			if( this.scrollTop + this.clientHeight + triggerPoint > this.scrollHeight ) {
				App.vent.trigger("reach:bottom:message");
			}
	    },
		_renderPageNationMessage: function() {
			var className = $(".list-message > div > div").attr("class");
			if ( className === "history-wrapper" ) {
				if( this.historyCollection.isAtLastPage() ) {
				} else {
					this.fetchListHistory({remove: false});
				}
			} else {
				if( this.navCollection.isAtLastPage() ) {
				} else {
					this.fetchMessage({remove: false});
				}
			}
	    },
		showRegion: function() {
			this.dialogueRegion.show( new DialogueItemView() );
		},
		fetchMessage: function(options) {
			var _this = this;
			this.navCollection.fetchListMessage(
				{
					on403: function() {
						_this.err = "mainErr";
						App.util.text.setTitleError(App.appModel.getLanguageType().mail.main.dialogueError.getMainTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.getMainMsgErr, ".list-message #main-nav-region", "main-wrapper");
						$("#search-terms").prop("disabled", true);
					},
					remove: options.remove
				}
			);
		},
		fetchListHistory: function(options) {
			var _this = this;
			this.historyCollection.fetchHistory(
				{
					on403: function() {
						_this.err = "historyErr";
						App.util.text.setTitleError(App.appModel.getLanguageType().mail.main.dialogueError.getHistoryTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.getHistoryMsgErr, ".list-message #main-nav-region", "history-wrapper");
						$("#search-terms").prop("disabled", true);
					},
					remove: options.remove
				}
			);
		},
		_renderListMessage: function() {
			this.err = "main";
			// set regisStatus
			this.setRegisStatus(this.navCollection, this.navCollection.getRegisStatus(), this.navCollection.getDelivStopRight());
			this.showListMessageByArray(this.navCollection);
			
			// this.navRegion.show( new MainNavCollectionView( { collection: navCollection1 } ) );
			var totalCount = this.navCollection.getTotalCount();
			// this.setCount(totalCount, this.navCollection.length);

			// disable/ enable input search
			if ( totalCount > 0 ) {
				$("#create_message #search-terms").prop("disabled", false);
			} else {
				$("#create_message #search-terms").prop("disabled", true);
			}

			// hide back-history
			$("#create_message .history_back_button").hide();
			$("#create_message .create_message_button").show();

			// hide header history
			$("#create_message .historyline").removeClass("active");			
		},
		_renderListHistory: function() {
			this.navRegion.show( new HistoryCollectionView( { collection: this.historyCollection } ) );
			this.setTitleHistory(this.historyCollection.length);
			if ( this.historyCollection.length > 0 ) {
				$("#search-terms").prop("disabled", false);
				// show header history
				$("#create_message .historyline").addClass("active");
			} else {
				$("#search-terms").prop("disabled", true);
			}
			// set width history comment
			var w_content = $("#create_message .list-message").width();
			$("#create_message .history-wrapper .message_title").css({"width": ( w_content * 85 ) / 100});
		},
		setRegisStatus: function(collection, regisStatus, delivStop) {
			var _this = this;
			if ( collection.length > 0 ) {
				collection.each(function(model){
					model.set("regisStatus", regisStatus);
					model.set("delivStop", delivStop);
					model.set("statusSearch", _this.statusSearch);
				});
			}
		},
		showListMessageByArray: function(collection) {
			var objTmp = "";
			if ( collection.length > 0 ) {
				objTmp = _.groupBy(collection.models, function(model, index) {
					return App.util.date.convertDate(model.get("startTime"), "YYYYMM");
				});
			}
			var navCollection1 = new MainNavCollection1();
			if ( objTmp ) {
				navCollection1.add(objTmp);
			}
			this.navRegion.show( new MainNavCollectionView( { collection: navCollection1 } ) );

			// set width campaign title
			var w_content = $("#create_message .list-message").width();
			$("#create_message .tbl-main-list tbody tr td:nth-child(1) .campaign-title").css({"width": ( w_content * 50 ) / 100});
			$("#create_message .tbl-main-list tbody tr td:nth-child(2) .campaign-details").css({"width":  ( w_content * 12 ) / 100});
		},
		setCount: function(total, length, type) {
			if ( total === 0 ) {
				$("#create_message .box-total-list .total").text(App.appModel.getLanguageType().common.zeroRecord);
			} else if ( total === 1 ) {
				$("#create_message .box-total-list .total").text(App.appModel.getLanguageType().common.oneRecord);
			} else {
				if ( type ) {
					if ( App.appModel.getLanguage() === "en" ) {
						$("#create_message .box-total-list .total").text("Display " + length + " records of " + total + " records");
					} else if  ( App.appModel.getLanguage() === "ja" ) {
						$("#create_message .box-total-list .total").text(total + " 件中 " + length + " を表示");
					}
				} else {
					if ( App.appModel.getLanguage() === "en" ) {
						$("#create_message .box-total-list .total").text("Display 1 - " + length + " of " + total + " records");
						// $("#create_message .box-total-list .total").text(total + " 件中 1 - " + length + " を表示");
					} else if  ( App.appModel.getLanguage() === "ja" ) {
						$("#create_message .box-total-list .total").text(total + " 件中 1 - " + length + " を表示");
					}
				}
			}
		},
		setTitleHistory: function(length) {
			this.err = "history";
			// $("#create_message .box-total-list .total").text(App.appModel.getLanguageType().mail.main.titleHistory + length + App.appModel.getLanguageType().mail.main.record);
			$(".create_message_button").hide();
			$(".history_back_button").show();
			$("#dialogue-region #greybg, #dialogue-region #confirm_box, #dialogue-region .popup").removeClass("show");
			$("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").hide();
		},
		onResize: function(){
			/*var windowH = $(window).height();
	        $('#create_message, #master-container').css('height', windowH);*/
	        this.checkScreen();
		},
		onLoad:function(){
			/*var windowH = $(window).height();
			var contentH = $('#master-container').height();
			if ( windowH > contentH ) {
				$('.page-center #create_message, #master-container').css('height', windowH);		
			} else {
				$('.page-center #create_message').css('height', contentH);
			} 
            $(".page-center #create_message .list-message").css({"height": windowH - 53});
            $(".page-center #create_message .message_board").css({"height": windowH - 53});*/
            var loginName = App.appModel.getAuthInfo().loginName;
            if ( loginName ) {
            	$("#loginName").text(loginName);
            } else {
            	$("#loginName").text(App.appModel.getLanguageType().sidebar.loginName);
            }

            // set active nav-sidebar
            $(".nav-sidebar .navi_main li").removeClass("active");
            $(".nav-sidebar .navi_main li:eq(1)").addClass("active");

            // set active top menu
            if ( this.statusSearch === "all" ) {
            	$(".page-center #create_message .navbar-header li").removeClass("active");
            	$(".page-center #create_message .navbar-header li:eq(0)").addClass("active");
            }

            // set active language
            // $("#create_message .multi_language li").removeClass("active");
            // if ( App.appModel.getLanguage() === "en" ) {
            // 	$("#create_message .multi_language li:eq(0)").addClass("active");
            // 	$("#create_message .multi_language li:eq(0) .st2, #create_message .multi_language li:eq(0) .st4").css({"stroke": "#D0202D"});
            // } else if ( App.appModel.getLanguage() === "ja" ) {
            // 	$("#create_message .multi_language li:eq(0) .st2, #create_message .multi_language li:eq(0) .st4").css({"stroke": "#999"});
            // 	$("#create_message .multi_language li:eq(1)").addClass("active");
            // }
			this.checkScreen();
		},
		    checkScreen: function(){
		     if( !AppConf.webConf.webFlag ){
		            if( $(window).width() > 1024 ){
		              $('.main_screen').css({'padding-left': 60});
		            } else {
		              $('.main_screen').css({'padding-left': 0});
		            }
		      }
		    },    
		onClear:function(){
			$(".leftbar li").removeClass("active");
			$("#search-terms").val("");
			$(".list-message").scrollTop(0);
			App.dialogueCommon.closeDialogueMessage();
		},
		loadBg:function(activeElement) {
			App.dialogueCommon.closeDialogueMessage();
			$("#label").removeClass("active");
			$("#dialogue-region #greybg").addClass("show");
			$("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").show();
			this.showDialogueAction(activeElement);
		},
		closeAll: function(e){
			e.preventDefault();
			var _this = $(e.currentTarget);
			var className = $(_this).attr("class");
			if ( !$(".page-center #create_message #confirm_box").is(':visible') || className === "cancelbtn" ) {
				$("#dialogue-region #greybg,#dialogue-region #confirm_box,#dialogue-region .popup").removeClass("show");
			}
			$("#dialogue-region .title_mail, #dialogue-region .cancelbtnact").hide();
		},
		action_dialogue_active: function(e){
			e.preventDefault();
			var _this = $(e.currentTarget);
			this.setInfoActionDialogue(_this, "active");
		},
		action_dialogue_scheduled: function(e){
			e.preventDefault();
			var _this = $(e.currentTarget);
			this.setInfoActionDialogue(_this, "scheduled");
		},
		action_dialogue_draft: function(e){
			e.preventDefault();
			var _this = $(e.currentTarget);
			this.setInfoActionDialogue(_this, "draft");
		},
		action_dialogue_cancel: function(e){
			e.preventDefault();
			var _this = $(e.currentTarget);
			this.setInfoActionDialogue(_this, "cancel");
		},		
		showApprovalHistory: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			this.historyCollection.setId(id);
			this.fetchListHistory({remove: true});
		},
		setInfoActionDialogue: function(element, activeElement) {
			var id = $(element).parent().attr("id");
			var name = $(element).parent().parent().find("td:eq(0) .campaign-title").text();
			$(".page-center #dialogue-region .title_mail").text(name);
			this.navCollection.setAuthMailId(id);
			this.loadBg(activeElement);
		},
		showDialogueAction: function(activeElement) {
			switch ( activeElement ) {
				case "active":
					$("#dialogue-region #active_dialog").addClass("show");
					break;
				case "scheduled":
					$("#dialogue-region #scheduled_dialog").addClass("show");
					break;
				case "draft":
					$("#dialogue-region #draft_dialog").addClass("show");
					break;
				case "cancel":
					$("#dialogue-region #cancel_dialog").addClass("show");
					break;
			};
		},
		showStopSend: function(e) {
			e.preventDefault();
			$("#dialogue-region .popup").removeClass("show");
			$("#dialogue-region .cancelbtnact").hide();
			$("#dialogue-region #confirm_box").addClass("show");
		},
		message_active: function(e){
			e.preventDefault();
			this.onClear();
			$(".leftbar li:eq(3)").addClass ("active");
			this.statusSearch = "active";
			this.navCollection.setType(1);
			this.fetchMessage({ remove: true });
		},
		message_scheduled: function(e){
			e.preventDefault();
			this.onClear();
			$(".leftbar li:eq(2)").addClass ("active");
			this.statusSearch = "scheduled";
			this.navCollection.setType(2);
			this.fetchMessage({ remove: true });
		},
		message_draft: function(e){
			e.preventDefault();
			this.onClear();
			$(".leftbar li:eq(1)").addClass ("active");
			this.statusSearch = "draft";
			this.navCollection.setType(3);
			this.fetchMessage({ remove: true });
		},
		message_wait_approve: function(e){
			e.preventDefault();
			this.onClear();
			$(".leftbar li:eq(2)").addClass ("active");
			this.statusSearch = "waitApprove";
			this.navCollection.setType(4);
			this.fetchMessage({ remove: true });
		},
		all_message: function(e){
			e.preventDefault();
			this.onClear();
			$(".leftbar li:eq(0)").addClass ("active");
			this.statusSearch = "all";
			this.navCollection.setType(0);
			this.fetchMessage({ remove: true });
		},
        showSearchinput:function (e) {
        	e.preventDefault();
     		$("#create_message .topbar .rightbar").css({'opacity': 1, 'z-index': 2, 'visibility': 'visible'});
     		$("#create_message .topbar .leftbar").css({'opacity': 0, 'z-index': 1, 'visibility': 'hidden'});
            $("#create_message #search-label").attr('class','fa fa-search fa-times');
            $("#create_message #search-terms").focus();
        },       
        turnOffSearch:function (e) {
        	e.preventDefault();
            $('#create_message #search-terms').val('').blur();
            $("#create_message .topbar .rightbar").css({'opacity': 0, 'z-index': 1, 'visibility': 'hidden'});
            $("#create_message .topbar .leftbar").css({'opacity': 1, 'z-index': 2, 'visibility': 'visible'});
			$("#create_message #search-label").removeClass('fa-times');
			this.search();
        },
        // clearSearch:function (){        	
        //     $('#search-terms').blur();
        //     $(".main_screen .topbar .rightbar").hide();
        //     $("#transbg").removeClass("show");
        //     $("#search-terms").removeClass("focus");            
        //     $(".main_screen .topbar .leftbar").show();
        // },
		search:function(e){
			// e.preventDefault();
			// var _this = $(e.currentTarget);
			var className = $(".list-message > div > div").attr("class");
			var searchText = $('#search-terms').val();
			var filter;
			var navCollectionFilter = new MainNavCollection();
			if ( className === "history-wrapper" ) {
				if ( searchText ) {
					filter = this.historyCollection.searchListHistory(searchText);
					if ( filter.size() > 0 ) {
						filter.each(function(model) {
							navCollectionFilter.add(model);
						});
					}

					this.navRegion.show( new HistoryCollectionView( { collection: navCollectionFilter } ) );
					this.setTitleHistory(navCollectionFilter.length);
				} else {
					this.navRegion.show( new HistoryCollectionView( { collection: this.historyCollection } ) );
					this.setTitleHistory(this.historyCollection.length);
				}
			} else {
				var totalCount = this.navCollection.getTotalCount();
				if ( searchText ) {
					filter = this.navCollection.searchListMessage(searchText);
					if ( filter.size() > 0 ) {
						filter.each(function(model) {
							navCollectionFilter.add(model);
						});
					}
					this.showListMessageByArray(navCollectionFilter);
					// this.navRegion.show( new MainNavCollectionView( { collection: navCollectionFilter } ) );
					// this.setCount(totalCount, navCollectionFilter.length, "search");
				} else {
					this.showListMessageByArray(this.navCollection);
					// this.navRegion.show( new MainNavCollectionView( { collection: this.navCollection } ) );
					// this.setCount( totalCount, this.navCollection.length );
				}
			}
		},
		backMainMessage: function(e) {
			e.preventDefault();
			this.showListMessageByStatus(this.statusSearch);
		},
		showListMessageByStatus: function(status) {
			switch ( status ) {
				case "all":
					this.navCollection.setType(0);
					break;
				case "active":
					this.navCollection.setType(1);
					break;
				case "scheduled":
					this.navCollection.setType(2);
					break;
				case "draft":
					this.navCollection.setType(3);
					break;
				case "waitApprove":
					this.navCollection.setType(4);
					break;
			};
			this.fetchMessage({remove:true});
		},
		viewMessage: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			location.hash = "messageContent/view?id=" + id;
		},
		editMessage: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			location.hash = "messageContent/edit?id=" + id;
		},
		duplicateMessage: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			location.hash = "messageContent/duplicate?id=" + id;
		},
		deleteMailDraft: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			this.fetchToken({id: id, type: "delete"});
		},
		cancelMailSend: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			this.fetchToken({id: id, status: "cancel", comment: "", type: "cancelByCreator"});
		},
		stopMailSend: function(e) {
			e.preventDefault();
			var _this = $(e.currentTarget);
			var id = this.navCollection.getAuthMailId();
			this.fetchToken({id: id, status: "stop", comment: "", type: "stopByCreator"});
		},
		fetchToken: function(options) {
			var _this = this;
			var _options = options || {};
			var type = _options.type;
			App.util.showProgressScreen();
			App.dialogueCommon.setType("workflow-mail");
			this.tokenModel.fetchToken({})
			.done(function(data) {
				switch ( type ) {
					case "delete":
						_this.deleteMail({id: _options.id, token: data.token});
						break;
					case "cancelByCreator":
						_this.cancelMail({id: _options.id, status: _options.status, comment: _options.comment, token: data.token, type: type})
						break;
					case "stopByCreator":
						_this.cancelMail({id: _options.id, status: _options.status, comment: _options.comment, token: data.token, type: type})
						break;
				}
			})
			.fail(function(res) {
				App.dialogueCommon.showDialogue(App.appModel.getLanguageType().common.dialogueError.tokenTitleErr, App.appModel.getLanguageType().common.dialogueError.tokenTitleMsg);
				App.util.hideProgressScreen();
			});
		},
		deleteMail: function(options) {
			var _this = this;
			var _options = options || {};
			App.btApi.deleteMailDraft({
				id: _options.id,
				token: _options.token
			}).done(function(res) {
				App.dialogueCommon.setType("deleteMailDraftSuccess");
				App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueSuccess.deleteMailTitleSuccess, App.appModel.getLanguageType().mail.main.dialogueSuccess.deleteMailMsgSuccess);
				App.util.hideProgressScreen();
			}).fail(function(err) {
				App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueError.deleteMailTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.deleteMailMsgErr);
				App.util.hideProgressScreen();
			});
		},
		cancelMail: function(options) {
			var _this = this;
			var _options = options || {};
			var type = _options.type;
			App.btApi.cancelMail({
				id: _options.id,
				status: _options.status,
				comment: _options.comment,
				token: _options.token
			}).done(function(res) {
				if ( type === "cancelByCreator" ) {
					App.dialogueCommon.setType("cancelMailSuccess");
					App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueSuccess.cancelMailTitleSuccess, App.appModel.getLanguageType().mail.main.dialogueSuccess.cancelMailMsgSuccess);
				} else {
					App.dialogueCommon.setType("stopMailSuccess");
					App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueSuccess.stopMailTitleSuccess, App.appModel.getLanguageType().mail.main.dialogueSuccess.stopMailMsgSuccess);
				}
				App.util.hideProgressScreen();
			}).fail(function(err) {
				if ( type === "cancelByCreator" ) {
					App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueError.cancelMailTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.cancelMailMsgErr);
				} else {
					App.dialogueCommon.showDialogue(App.appModel.getLanguageType().mail.main.dialogueError.stopMailTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.stopMailMsgErr);
				}
				App.util.hideProgressScreen();
			});
		},
		actionMailSuccess: function() {
			App.dialogueCommon.closeDialogueMessage();
			this.showListMessageByStatus(this.statusSearch);
		},
		changeLanguage: function(e) {
			e.preventDefault();
			App.util.showProgressScreen();
			var _this = $(e.currentTarget);
			var index = $(_this).index();
			$("#create_message .multi_language li").removeClass("active");
			$(_this).addClass("active");
			App.dialogueCommon.setType("changeLanguage");
			switch ( index ) {
				case 0:
					App.appModel.setLanguage("en");
					$("#create_message .multi_language li:eq(0) .st2, #create_message .multi_language li:eq(0) .st4").css({"stroke": "#D0202D"});
					break;
				case 1:
					$("#create_message .multi_language li:eq(0) .st2, #create_message .multi_language li:eq(0) .st4").css({"stroke": "#999"});
					App.appModel.setLanguage("ja");
					break;
			}
			App.appModel.safeFetch({flg: "1"});
			// menu
			$("#create_message .section-title").html(App.appModel.getLanguageType().mail.menu.titleMail);
			$("#create_message .navbar-header #open_all").html(App.appModel.getLanguageType().mail.menu.menuTopMail.all);
			$("#create_message .navbar-header #open_active").html(App.appModel.getLanguageType().mail.menu.menuTopMail.active);
			$("#create_message .navbar-header #open_scheduled").html(App.appModel.getLanguageType().mail.menu.menuTopMail.scheduled);
			$("#create_message .navbar-header #open_draft").html(App.appModel.getLanguageType().mail.menu.menuTopMail.draft);
			$("#create_message .navbar-header #open_confirm_wait").html(App.appModel.getLanguageType().mail.menu.menuTopMail.waitApprove);

			// search placeholder
			$("#create_message #search-terms").attr("placeholder", App.appModel.getLanguageType().mail.menu.menuTopMail.searchPlaceholder);

			// side bar
			$("#sidebar-left .logo_name").text(App.appModel.getLanguageType().sidebar.companyName);
			$("#sidebar-left .mail_name").text(App.appModel.getLanguageType().sidebar.mail);
			$("#sidebar-left .coupon_name").text(App.appModel.getLanguageType().sidebar.coupon);
			$("#sidebar-left .point_name").text(App.appModel.getLanguageType().sidebar.point);
			$("#sidebar-left .report_name").text(App.appModel.getLanguageType().sidebar.report);
			$("#sidebar-left .information_name").text(App.appModel.getLanguageType().sidebar.information);
			$("#sidebar-left .config_name").text(App.appModel.getLanguageType().sidebar.config);
			if ( App.appModel.getAuthInfo().loginName === null && !App.appModel.getAuthInfo().loginName ) {
				$("#sidebar-left #loginName").text(App.appModel.getLanguageType().sidebar.loginName);
			}
			$("#sidebar-left .logout_name").text(App.appModel.getLanguageType().sidebar.logout);
			$("#sidebar-left .profile_name").text(App.appModel.getLanguageType().sidebar.profile);

			// set count
			switch ( this.err ) {
				case "main":
					this._renderListMessage();
					break;
				case "mainErr":
					App.util.text.setTitleError(App.appModel.getLanguageType().mail.main.dialogueError.getMainTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.getMainMsgErr, ".list-message #main-nav-region", "main-wrapper");
					break;
				case "history":
					this._renderListHistory();
					break;
				case "historyErr":
					App.util.text.setTitleError(App.appModel.getLanguageType().mail.main.dialogueError.getHistoryTitleErr, App.appModel.getLanguageType().mail.main.dialogueError.getHistoryMsgErr, ".list-message #main-nav-region", "history-wrapper");
					break;
			};

			this.showRegion();
			App.util.hideProgressScreen();
		}
	});
	
	return MainNavView;

})();