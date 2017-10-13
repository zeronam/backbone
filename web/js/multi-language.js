AppConf.JA = {
	login: {
		btnLogin: "ログイン",
		passwordText: "パスワード",
		dialogueError: {
			loginTitleErr: "ログインできません"	,
			loginRequiredIDMsgErr: "ログインIDを入力してください",
			loginRequiredPasswordMsgErr: "パスワードを入力してください",
			loginWrongMsgErr: "IDもしくはパスワードをご確認の上、再度ログインしてください",
			loginSystemMsgErr: "ログイン処理に失敗しました。再度ログインしてください"
		}
	},
	sidebar: {
		companyName: "ビートレンド",
		mail: "メール",
		coupon: "クーポン",
		point: "ポイント",
		subscribers: "ポイント",
		report: "レポート",
		notification: "プッシュ通知",
		information: "お知らせ",
		config: "設定",
		logout: "ログアウト",
		profile: "プロフィール表示",
		loginName: "ゲスト"
	},
	dashboard: {
		menu: {
			titleDashboard : "ダッシュボード",
			menuTopDashboard: {
				today: "今日",
				week: "今週",
				month: "今月",
				lastQ: "四半期",
				lastYear: "今年"
			}
		},
		main: {
			noRecord: "ダッシュボードが設定されていません",
			topGrowthTitle: "トップグロース",
			newReturnTitle: "新規 & 戻り",
			growthNewReturnTitle: "新規 & 戻りグロース",
			growthNewReturnTitle: "新規 & 戻りグロース",
			thisweek: "今週",
			lastweek1: "先週",
			lastweek2: "先々週",
			segment: "抽出条件",
			viewAll: "全て",
			growthSegmentTitle: "抽出条件グロース",
			segmentCompareTitle: "抽出条件比較",
			segmentName: "条件名",
			open: "オープン",
			click: "クリック",
			use: "利用",
			total: "合計",
			errorMsg: {
				getMainTitleErr: "ダッシュボードのチャート",
				getMainMsgErr: "ダッシュボードのチャート取得処理に失敗しました",
				getMainMsgErr1: "エラーが発生しました",
				getMainMsgErr2: "データ存在しない"

			}
		},
		popup: {
			titleListShop: '店舗選択',
			selectAllListShop: '店舗すべて',
			placeHolderInputSearch: '店舗検索',
			applyBtnListShop: '適用する',
			csvDownloadBtn: 'CSV出力',
			chartConvert: 'グラフ変換',
			screenShotBtnChart: '画像出力',
			barChartType: '棒グラフ',
			lineChartType: '折れ線グラフ',
			donutChartType: 'ドーナツグラフ',
			pieChartType: '円グラフ',
			dataChartType: 'テーブルグラフ',
			segmentData: 'セグメントデータ'
		},
	},
	analysis: {
		menu: {
			titleAnalysis : "SRFM分析",
			menuTopAnalysis: {
				recency: "最新性",
				frequency: "周波",
				monetary: "金銭"
			},
			menuBottomAnalysis: {
				week: "週",
				month: "月",
				year: "年",
				range: "範囲"
			}
		},
		main: {
			subscribers: "お客様数",
			times: "回数"
		},
		rangeDate: {
			title: "日付選択",
			from: "から",
			to: "まで",
			cancelBtn: "キャンセル",
			setBtn: "選択",
			error: {
				startDateEmpty: "開始日を選択してください",
				endDateEmpty: "終了日を選択してください",
				// endDateEmpty: "End date is greater than start date"
			}
		}
	},
	mail: {
		menu: {
			titleMail : "メール配信",
			menuTopMail: {
				all: "すべて",
				active: "アクティブ",
				scheduled: "スケジュール",
				draft: "ドラフト",
				waitApprove: "承認待ち",
				sent: "配信済み",
				other: "その他",
				searchPlaceholder: "メール配信検索"
			}
		},
		main : {
			titleHistory: "承認履歴 > ",
			record: "件",
			sendDate: "送信日",
			subscribers: "送信先数",
			opens: "オープン",
			clicks: "クリック",
			conditionAll: "条件なし",
			currentMonthText: "今月",
			messageListEmptyMsg: "配信メールがありません",
			messageHistoryEmptyMsg: "承認履歴がありません",
			history: {
				create: "作成",
				request: "依頼",
				approval: "承認",
				reject: "却下",
				cancelRequest: "依頼キャンセル",
				cancelApprove: "承認キャンセル",
				cancelSend: "配信キャンセル",
				other: "その他"
			},
			dialogueError: {
				getMainTitleErr: "配信メール",
				getMainMsgErr: "配信メール取得処理に失敗しました",
				getHistoryTitleErr: "承認履歴",
				getHistoryMsgErr: "承認履歴取得処理に失敗しました",
				systemErr: " > システムエラー",
				deleteMailTitleErr: "保存メール削除失敗",
				deleteMailMsgErr: "保存メール削除に失敗しました",
				cancelMailTitleErr: "配信メールキャンセル失敗",
				cancelMailMsgErr: "配信メールキャンセル処理に失敗しました",
				stopMailTitleErr: "配信メール停止失敗",
				stopMailMsgErr: "この配信メール停止処理に失敗しました"
			},
			dialogueSuccess: {
				deleteMailTitleSuccess: "保存メール削除成功",
				deleteMailMsgSuccess: "保存メールを削除しました",
				cancelMailTitleSuccess: "配信メールキャンセル成功",
				cancelMailMsgSuccess: "配信メールがキャンセルされました",
				stopMailTitleSuccess: "配信メール停止成功",
				stopMailMsgSuccess: "配信メール停止成功"
			}
		},
		common: {
			title: "メール配信",
			create: "新規作成",
			edit: "編集",
			duplicate: "複製",
			view: "詳細",
		},
		selectTemplate: {			
			lblTitle: "メール配信設定名",
			sms: "メール配信設定名はメールには表示されません",
			tabMyTemplate: "マイテンプレート",
			tabLayoutTemplate: "レイアウトテンプレート",
			layoutTemplate1: "レイアウトテンプレート1",
			layoutTemplate2: "レイアウトテンプレート2",
			layoutTemplate3: "レイアウトテンプレート3",
			layoutTemplate4: "レイアウトテンプレート4",
			layoutTemplate5: "レイアウトテンプレート5",
			layoutTemplate6: "レイアウトテンプレート6",
			layoutTemplate7: "レイアウトテンプレート7",
			layoutTemplate8: "レイアウトテンプレート8",
			layoutTemplate9: "レイアウトテンプレート9",
			layoutTemplate10: "レイアウトテンプレート10",
			layoutTemplate11: "レイアウトテンプレート11",
			layoutTemplate12: "レイアウトテンプレート12",
			dialogueError: {
				getTemplateTitleErr: "テンプレート取得失敗",
				getTemplateMsgErr: "テンプレート取得処理に失敗しました",
				selectTemplateTitleErr: "テンプレート選択エラー",
				selectTemplateMsgErr: "テンプレートを選択してください",
				deleteTitleErr: "テンプレート削除失敗",
				deleteTitleMsgErr: "テンプレート削除処理に失敗しました"
			},
			dialogueSuccess: {
				deleteTemplateTitleSuccess: "テンプレート削除成功",
				deleteTemplateMsgSuccess: "このテンプレートが削除されました"
			},
			inputError: {
				campainNameRequiredErr: "メール配信設定名を入力してください",
				campainNameMaxLengthErr: "メール配信設定名は256文字で入力してください"
			}
		},		
		layoutTemplate: {
			subject: "サブジェクト",
			headline: "本文のヘッダー",
			bodyText: "本文の内容",
			nameBtn: "リンク名",
			urlLink: "リンク"
		},
		messageContent: {
			subjectNote: "サブジェクトノート",
			messageContentTitle: "メール内容",
			saveAsTemplate: "テンプレートとして保存",
			inputError: {
				subjectRequiredErr: "サブジェクトを入力してください",
				subjectMaxLengthErr: "サブジェクトは256文字で入力してください",
				headlineRequiredErr: "本文のヘッダーを入力してください",
				imageRequiredErr: "本文の画像を選択してください",
				bodyTextRequiredErr: "本文の内容を入力してください",
				nameBtnRequiredErr: "本文のリンク名を入力してください",
				nameBtnMaxLengthRequiredErr: "本文のリンク名は5桁で入力してください",
				urlLinkRequiredErr: "本文のリンクを入力してください",
				urlLinkFormatErr: "本文のリンクは正しくないです"
			},
			saveTemplate: {
				saveTemplateTitle: "テンプレート保存",
				saveTemplateNote: "現在編集中のメールをテンプレートとして保存します",
				saveTemplateName: "テンプレート名",
				saveTemplateSuccess: "テンプレートとして保存しました",
				saveTemplateBtn: "保存"
			},
			dialogueError: {
				getContentDetailTitleErr: "配信メール情報取得失敗",
				getContentDetailMsgErr: "配信メール情報取得に失敗しました",
				saveMessageTitleErr: "配信メール保存失敗",
				saveMessageMsgErr: "配信メール保存処理に失敗しました"
			},
			dialogueSuccess: {
				saveMessageTitleSuccess: "配信メール保存成功",
				saveMessageMsgSuccess: "配信メールが保存されました"	
			}
		},
		setting: {
			settingTitle: "メール配信設定",
			conditionTitle: "抽出条件",
			conditionNone: "条件なし",
			issueDate: "配信日付"
		},
		confirm: {
			confirmTitle: "クーポン配布確認",
			note: "スケジュールメールがスケジュールメニューに表示されます。<br/> ここだけSTOPできます。",
			messageSend: '<strong>このメッセージを送信先</strong><strong> (</strong><strong class="campaign-title total-value">0</strong><strong> - <span class="segment_name"></span>）へ<br /><strong class="campaign-title dateTime"></strong>に配信するようにします。</strong>',
			conditionNone: "条件なし",
			users: "ユーザー",
			dialogueError: {
				getConditionTitleErr: "送信先数取得失敗",
				getConditionMsgErr: "送信先数取得処理に失敗しました",
				sendMessageTitleErr: "メール配信失敗",
				sendMessageMsgErr: "メール配信処理に失敗しました"
			},
			dialogueSuccess: {
				sendMessageTitleSuccess: "メール配信成功",
				sendMessageMsgSuccess: "メールが配信されました"
			}
		},
		footer: {
			template: "テンプレート"
		}
	},
	coupon: {
		menu: {
			titleCoupon : "クーポン",
			menuTopCoupon: {
				all: "すべて",
				active: "アクティブ",
				scheduled: "スケジュール",
				draft: "ドラフト",
				waitApprove: "承認待ち",
				sent: "配信済み",
				searchPlaceholder: "クーポン一覧検索"
			}
		},
		list: {
			record: "件",
			createDate: "作成日",
    		startDate: "開始日時",
    		endDate: "終了日時",
    		confirmStop: "利用停止確認",
    		creating: "作成中",
    		beforeDistribution: "配布前",
    		distributing: "配布中",
    		endOfDistribution: "配布終了",
    		stopUsing: "利用停止",
    		distributionProcessing: "配布処理中",
			waitApprove: "承認待ち",
			other: "その他",
			afterDistribution: "配布後",
			day: " 日",
			lbPublic: "公開",
			targets: "配布件数",
			visibleTo: "配布件数",
			sendTo: "配布件数",
			conditionAll: "条件なし",
			couponUse: "利用回数",
    		dialogue: {
				getListTitleErr: "クーポン一覧",
				getListMsgErr: "クーポン一覧取得処理に失敗しました",
				emptyListMsgErr: "クーポン一覧がありません",
				systemErr: " > システムエラー",
				couponStopSuccess: "クーポン停止成功",
			    msgCouponStopSuccess: "このクーポンが停止されました",
			    couponDeleteSuccess: "クーポン削除成功",
			    msgCouponDeleteSuccess: "このクーポンが削除されました",
			    couponStopFail: "クーポン停止失敗",
			    msgCouponStopFail: "このクーポン停止処理に失敗しました",
			    couponDeleteFail: "クーポン停止失敗",
			    msgCouponDeleteFail: "このクーポン停止処理に失敗しました",
    		}
		},
		information: {
			couponsName: "クーポン設定名",
		    clearingWay: "消しこみ方法",
		    buttonOperationOnly : "ボタン操作のみ",
		    storeDecisionOnly : "GPS（店舗判定のみ）",
		    shopAroundOnly: "GPS（店舗周辺限定）",
		    QRCode: "QRコード",
		    conditionsOfUse: "利用条件",
		    useRestrictionsOfArrival: "利用制限 先着（最大人数取得可能）",
		    limitOnTheNumberOfTimesTheTotal: "回数制限 合計（最大回数利用可能）",
		    limitTheMultipleUseOfTheSameDayLimitOnTheSameDay: "同日制限 同日の複数回利用を制限",
		    placeholderCondition: "1以上の整数値で8桁以下です",
		    availabilityPeriod: "利用可能期間",
		    startCompletionDate: "開始完了日時",
		    startCompletionDateErr1: "完了日はシステム日付より大なりです",
		    startCompletionDateErr2: "完了日は開始日より大なりです",
		    expirationDate: "有効期限",
		    expirationDate1: "会員登録日より",
		    expirationDate2: "発行日より",
		    noteExpirationDate1: "（配布日からの日数）",
		    noteExpirationDate2: "（会員登録日より日数まで）",
		    confirmationScreen: "確認画面",
		    displayAConfirmationScreenWhenUseCoupon: "クーポン使用時に確認画面を表示する",
		    couponUrl: "クーポンURL",
		    dialogue: {
			    fillCouponName: "クーポン設定名を入力してください",    
			    maxLengthCouponName: "クーポン設定名は<span style='color: #ff0000;font-weight:bold'>100</span>文字以内で入力してください",
			    maxLengthUseRestrictions: "利用制限は8桁以内整数です",
			    checkZeroUseRestrictions: "利用制限は1以上の整数値です",
			    maxLengthLimitNumber: "回数制限は8桁以内整数です",
			    checkZeroLimitNumber: "回数制限は1以上の整数値です",
			    maxLengthValidity: "有効期限は3桁以内整数です",
			    checkZeroValidity: "有効期限は1以上の整数値です",
			    fillUseStartDateTime: "開始日を選択してください",
			    fillUseEndDateTime: "完了日を選択してください",
			},
			dialogueError: {
				getDetailCouponTitleErr: "クーポン情報詳細取得失敗",
				getDetailCouponMsgErr: "クーポン情報詳細取得に失敗しました"
			}
		},
		content: {
			pageTitle: "ページタイトル",
		    couponName: "クーポン設定名",
		    couponDetails: "クーポン詳細",
		    couponDetailsPlaceHolder: "大人気の○○ケーキが半額!",
		    couponImage: "クーポン画像",
		    choose: "画像選択",
		    notes: "備考・注意事項",
		    notesPlaceHolder: "他の割引サービスとの併用はご遠慮ください。",
		    link: "リンク",
		    toViewTheSocialCooperationList: "ソーシャル連携リストを表示する",
		    aLinkToTheTopPage: "トップページへのリンク",
		    aLinkToTheCouponList: "クーポン一覧へのリンク",
		    aLinkToTheMemberRegistration: "会員登録へのリンク",
		    dialogue: {
			    fillPageTitle: "ページタイトルを入力してください",
			    maxLengthPageTitle: "ページタイトルは100桁で入力してください",
			    fillSubjectCoup: "クーポン名を入力してください",
			    maxLengthSubjectCoup: "クーポン名は100桁で入力してください",
			    maxLengthCouponDetails: "クーポン詳細は4000桁で入力してください",
			    selectDescriptionImage: "クーポン画像を選択してください",
			    maxLengthDescriptionImage: "クーポン画像は256桁で選択してください",
			    selectDescriptionImageURL: "クーポン画像URLを選択してください",
			    maxLengthDescriptionImageURL: "クーポン画像URLは256桁で選択してください",
			    maxLengthMemo: "備考・注意事項は4000桁で入力してください",
			},
			preview: {
				useInterval: "同日利用制限: あり"
			}
		},
		setting: {
			targetSegment: "抽出条件",
			conditionNone: "条件なし",
		    distributionMethods: "配布方法",
		    distributionMethods1: "通常配布 一回だけ配布",
		    distributionMethods2: "繰り返し配布 期間中に条件を満たした方に自動配布",
		    distributionConditions: "配布条件",
		    distributionConditions1: "1ユーザにつき1枚のみ配布",
		    distributionConditions2: "有効な同一クーポンを保持していない場合のみ配布",
		    distributionConditions3: "無条件に毎回配布",
		    deliveryEndDateErr1: "配信終了日は配布開始日より大なりです",
    		deliveryEndDateErr2: "配信終了日はシステム日付より小なりです",
		},
		confirm: {
			mailDeliveryConfirmation: "メール配信確認",
		    thisCouponToTheDestination: "このクーポンを送信先へ",
		    andToBeDeliveredTo: "に配信するようにします。",
		    stopInfo: "",
		    couponSend: '<strong>現在の内容で配布します。<br>よろしいですか？</strong>',
		    couponSend2: '<strong>このクーポンを</strong><br /><strong class="campaign-title dateTime"></strong>に配信するようにします。</strong>',
			conditionNone: "条件なし",
			users: "ユーザー",
		    dialogueSuccess: {
		    	sendCouponTitleSuccess: "クーポン配信成功",
			    sendCouponMsgSuccess: "このクーポンが配信されました",		    
			},
		    dialogueError: {
			    sendCouponTitleFail: "クーポン配信失敗",
			    sendCouponMsgFail: "クーポン配信処理に失敗しました",
			    getConditionTitleErr: "送信先数取得失敗",
				getConditionMsgErr: "送信先数取得処理に失敗しました",
		    }
		},
		common: {
			title: "クーポン",
			membersOnlyCoupons: "会員限定クーポン",
    		membersCommonCoupon: "会員共通クーポン",
    		publicCoupon: "公開クーポン",
		    dialogueSuccess: {
		    	saveCouponTitleSuccess: "クーポン保存成功",
			    saveCouponMsgSuccess: "このクーポンが保存されました",
		    },
		    dialogueError: {
			    saveCouponTitleErr: "クーポン保存失敗",
			    saveCouponMsgErr: "クーポン保存処理に失敗しました",
		    }
		},
		footer: {
			type: "タイプ",
			basicInformation: "基本情報"
		}
	},
	common: {
		content: "内容",
		setting: "設定",
		confirm: "確認",
		btnBack: "戻る",
		btnNext: "次へ",
		inputTitleError: "入力エラー",
		preview: "プレビュー",
		btnHome: "ホーム",
		btnSave: "保存して戻る",
	    required: "（必須）",
		zeroRecord: "0件",
		oneRecord: "1件",
		dialogue: {
			draftTitle: "保存",
			draftMsg: "入力されたデータが保存されます<br/>よろしいですか?",
			backHomeTitle: "確認",
			backHomeMsg: "入力されたデータがクリアされます。<br />よろしいですか？",
			backHomeBtnCancel: "キャンセル",
			backCouponTitle: "注意",
			backCouponMsg: "タイプを変更すると作成中のクーポン設定が全てクリアされます。<br />よろしいですか？",
			btnEdit: "編集",
			btnDuplicate: "複製",
			btnView: "詳細",
			btnStop: "配信キャンセル",
			btnDelete: "削除",
			btnHistory: "承認履歴",
			btnReport: "配信レポート",
			btnClose: "閉じる",
			confirmStopTitle: "メール配信停止確認",
			textOk: "よろしいでしょうか？",
			deleteTemplateMsg: "このテンプレートを削除します。",
			uploadImage: {
				title: "画像管理",
				tabInputSearch: "一覧から選択する",
				tabUploadImage: "アップロードする",
				tabOperation: "表示操作",
				tabSearchImage: "選択",
				categoryTitle: "カテゴリ",
				categoryAll: "全て表示",
				categoryNone: "なし",
				categoryAll1: "指定しない",
				searchText: "検索",
				orderTitle: "並び替え",
				orderText1: "ファイル名",
				orderText2: "更新日時",
				perPageTitle: "一覧表示行数",
				perPage1: "5個",
				perPage2: "20個",
				perPage3: "50個",
				imageTitle: "ファイル",
				pageTitle: "ページ",
				totalRecordTitle: "件",
				listImageTitle: "画像一覧",
				btnNext: "次へ",
				btnSelectedImage: "決定",
				btnUpload: "アップロード",
				btnSelectImage: "画像選択",
				note: "※jpg、jpeg、gif、png、bmp、ico、透過gif、アニメーションgifが利用できます。",
				uploadImageErr: "画像アップ処理に失敗しました",
				uploadImageSuccess: "：アップしました",
				imageListEmptyMsg: "指定した条件に合致する画像はありません",
				selectedImageTitle: "画像選択",
				selectedImageMsg: "が選択されました",
				getImageTitleErr: "システムエラー",
				getImageMsgErr: "画像一覧取得に失敗しました",
				noSelectImageMsg: "画像を選択してください"
			},
			changeLanguageTitle: "言語更新",
			changeLanguageJAMsg: "日本語に更新されました<br />他のページに適用されます",
			changeLanguageENMsg: "英語に更新されました<br />他のページに適用されます",
			logoutMsg: "ログアウトしました",
			countTitle: 'thông báo',
			countMsg: 'Dữ liệu đang được chuẩn bị'
		},
		dialogueError: {
			tokenTitleErr: "トークン情報取得失敗",
			tokenTitleMsg: "トークン情報取得処理に失敗しました",
			notLoginTitleErr: "ログインエラー",
			notLoginMsgErr: "ログインしていません"
		}
	},
	notification: {
		menu : {
			titleNotification: "お知らせ配信",
			all: "すべて",
			draft: "ドラフト",
			inProgress: "通知中",
			complete: "通知完了",
			lisUp: "リストアップ",
			error: "エラー",
			searchPlaceholder: "お知らせ配信検索"
		},
		main : {
			complete: "完了数",
			currentMonthText: "今月",
			dialogueError: {
				getMainTitleErr: "配信お知らせ",
				getMainMsgErr: "配信お知らせ取得処理に失敗しました",
				getHistoryTitleErr: "承認履歴",
				getHistoryMsgErr: "承認履歴取得処理に失敗しました",
				systemErr: " > システムエラー",
				deleteNotificationTitleErr: "保存お知らせ削除失敗",
				deleteNotificationMsgErr: "保存お知らせ削除に失敗しました",
				cancelNotificationTitleErr: "配信お知らせキャンセル失敗",
				cancelNotificationMsgErr: "配信お知らせキャンセル処理に失敗しました",
				stopNotificationTitleErr: "配信お知らせ停止失敗",
				stopNotificationMsgErr: "この配信お知らせ停止処理に失敗しました"
			},
			dialogueSuccess: {
				deleteNotificationTitleSuccess: "保存お知らせ削除成功",
				deleteNotificationMsgSuccess: "保存お知らせを削除しました",
				cancelNotificationTitleSuccess: "配信お知らせキャンセル成功",
				cancelNotificationMsgSuccess: "配信お知らせがキャンセルされました",
				stopNotificationTitleSuccess: "配信お知らせ停止成功",
				stopNotificationMsgSuccess: "配信お知らせ停止成功"
			}
		},
		common: {
			title: "プッシュ通知",
		    dialogueSuccess: {
		    	saveNotificationTitleSuccess: "お知らせ保存成功",
			    saveNotificationMsgSuccess: "このお知らせが保存されました",
		    },
		    dialogueError: {
			    saveNotificationTitleErr: "お知らせ保存失敗",
			    saveNotificationMsgErr: "お知らせ保存処理に失敗しました",
		    }
		},
		footer: {
			basicConfiguration: "基本情報",
			content: "お知らせ内容",
			notificationCondition: "通知条件（属性）",
			dispatchCondition: "遭知条件（位置情報）",
			confirm: "確認",
		},
		setting: {
			title: "通知タイトル",
			titleP: "タイトルを入力してください",
			body: "通知本文",
			bodyP: "本文を入力してください",
			method: "通知方法",
			noticeOnce: "一回だけ通知",
			repeatNotice: "繰り返し通知",
			everyMonth: "毎月",
			weekly: "毎週",
			everyDay: "毎日",
			day: "日",
			monday: "月曜日",
			tuesday: "火曜日",
			wednesday: "水曜日",
			thursday: "木曜日",
			friday: "金曜日",
			saturday: "土曜日",
			sunday: "日曜日",
			presenceOrAbsenceOfNotification: "通知有無",
			notice: "通知する",
			noNotice: "通知しない（お知らせ一覧のみ表示）",
			displayPeriod: "表示期間",
			halfAnHour: "30分",
			onehour: "1時間",
			twohours: "2時間",
			duringTheDay: "当日中",
			threedays: "3日間",
			sevendays: "7日間",
			onemonth: "1ヶ月",
			indefinitePeriod: "無期限",
			// notificationByLocationInformation: "位置情報による通知",
			// notSpecified: "特に指定しない",
			// specified: "指定した時間帯に指定したエリアにいる人にのみ通知",
			note: "位置情報を使った通知は最低1時間前に設定する必要があります",
			dialogue: {
			    fillNotificationText: "通知タイトルを入力してください",    
			    maxLengthNotificationText: "通知タイトルは100桁で入力してください",
			    fillContentText: "通知本文を入力してください",    
			    maxLengthContentText: "通知本文は100桁で入力してください",
			    startCompletionDateErr1: "完了日はシステム日付より大なりです",
		    	startCompletionDateErr2: "完了日は開始日より大なりです",
			},
		},
		content: {
			topDescription: "上部説明",
			topDescriptionPlaceholder: "上部説明を入力してください",
		    bottomDescription: "下部説明",
			topDescriptionPlaceholder: "下部説明を入力してください",
		    image: "画像",
		    choose: "選択",
		    remove: "削除",
		    dialogue: {
		    	fillHeader: "ヘッダ本文を入力してください",
		    	fillFooter: "フッター本文を入力してください",    
		    }
		},
		condition: {
			segmentInformation: "セグメント情報",
			notificationByLocationInformation: "位置情報による通知",
			notSpecified: "特に指定しない",
			areaSpecified: "指定した時間帯に指定したエリアにいる人にのみ通知",
			note: "位置情報を使った通知は最低1時間前に設定する必要があります。",
			extractionCondition: "抽出条件",
			conditionNone: "条件なし",
			dialogue:{
				getSegmentTitleErr: "エラー",
				getSegmentMsgErr: "セグメントの取得に失敗した"
			}
		},
		local:{
			specifyPosition: "位置",
			designateAccessPoint: "アクセスポイント",
			spotName: "スポット名",
			latitude: "緯度",
			longitude: "経度",
			range: "範囲",
			addSpot: "スポットを追加",
			editSpot: "スポットを編集",
			SSID: "SSID",
			MACAddress: "MACアドレス",
			radioIntensity: "電波強度",
			strong: "強い（-49dBm以上）",
			normal: "普通（-79dBm~-50dBm）",
			weak: "弱い（-80dBm以下）",
			spotsList: "スポット一覧",
			item: "件",
			cancel: "戻り",
			dialogue: {
			    fillSpotName: "スポット名を入力してください",    
			    maxLengthSpotName: "スポット名は100桁で入力してください",
			    fillLatitude: "緯度を入力してください",
			    isNumber: "緯度経度と範囲は数字です",
			    fillLongitude: "経度を入力してください",
			    fillScope: "範囲を入力してください",
			    fillSSID: "SSIDを入力してください",   
			    maxLengthSSID: "SSIDは32桁で入力してください", 
			    fillBSSID: "MACアドレスを入力してください",
			    maxLengthBSSID: "BSSIDは17桁で入力してください",
			    formatBSSID: "無効なMACアドレス形式",
			    fillRssiType: "電波強度を入力してください",
			},
			// dialogueError: {
			// 	getShopListTitleErr: "舗を検索失敗",
			// 	getShopListMsgErr: "舗を検索失敗",
			// }
		},
		confirm: {
			notificationDeliveryConfirmation: "お知らせ配信確認",
		    // thisNotificationToTheDestination: "このお知らせを送信先へ",
		    // andToBeDeliveredTo: "に配信するようにします。",
		    stopInfo: "",
		    notificationSend: '<strong>このお知らせを送信先</strong><strong>（</strong><strong class="campaign-title total-value">0</strong><strong> - <span class="segment_name"></span>）へ<br /><strong class="campaign-title dateTime"></strong>に配信するようにします。</strong>',
			conditionNone: "条件なし",
			users: "ユーザー",
		    dialogueSuccess: {
		    	sendNotificationTitleSuccess: "お知らせ配信成功",
			    sendNotificationMsgSuccess: "このお知らせが配信されました",		    
			},
		    dialogueError: {
			    sendNotificationTitleFail: "お知らせ配信失敗",
			    sendNotificationMsgFail: "お知らせ配信処理に失敗しました",
			    getConditionTitleErr: "送信先数取得失敗",
				getConditionMsgErr: "送信先数取得処理に失敗しました",
		    }
		},
	}
};
AppConf.EN = {
	login: {
		btnLogin: "Login",
		passwordText: "Password",
		dialogueError: {
			loginTitleErr: "Error Login"	,
			loginRequiredIDMsgErr: "Please enter id",
			loginRequiredPasswordMsgErr: "Please enter password",
			loginWrongMsgErr: "ID or password is wrong. Please login again",
			loginSystemMsgErr: "Failed to login. Please login again"
		}
	},
	sidebar: {
		companyName: "Betrend",
		mail: "Campaigns",
		coupon: "Coupon",
		point: "Point",
		subscribers: "Subscribers",
		report: "Reports",
		notification: "Notification",
		information: "Notifications",
		config: "Settings",
		logout: "Logout",
		profile: "Profile",
		loginName: "Guest"
	},
	dashboard: {
		menu: {
			titleDashboard : "Dashboard",
			menuTopDashboard: {
				today: "Today",
				week: "This Week",
				month: "This Month",
				lastQ: "Quarter",
				lastYear: "Year"
			}
		},
		main: {
			noRecord: "Sorry there is not data available",
			topGrowthTitle: "TOP GROWTH",
			newReturnTitle: "NEW VS RETURNING",
			growthNewReturnTitle: "GROWTH NEW VS RETURNING",
			thisweek: "This Week",
			lastweek1: "Last Week",
			lastweek2: "Two Week Ago",
			segment: "SEGMENTS",
			viewAll: "View All",
			growthSegmentTitle: "SEGMENT GROWTH",
			segmentCompareTitle: "SEGMENT COMPARE",
			segmentName: "segment name",
			open: "Opens",
			click: "Click",
			use: "Use",
			total: "Total",
			errorMsg: {
				getMainTitleErr: "Chart Dashboard",
				getMainMsgErr: "Failed to get chart dashboard",
				getMainMsgErr1: "Error occurred",
				getMainMsgErr2: "Data not fonund"
			}
		},
		popup: {
			titleListShop: 'Select Shop',
			selectAllListShop: 'Select all shops',
			placeHolderInputSearch: 'Search shop',
			applyBtnListShop: 'Apply',
			csvDownloadBtn: 'Download CSV',
			chartConvert: 'Chart conversion',
			screenShotBtnChart: 'Take Screenshot',
			barChartType: 'Bar Chart',
			lineChartType: 'Line Chart',
			donutChartType: 'Donut Chart',
			pieChartType: 'Pie Chart',
			dataChartType: 'Data Chart',
			segmentData: 'Segment Data'
		},

	},
	analysis: {
		menu: {
			titleAnalysis : "SMART RFM ANALYTICS",
			menuTopAnalysis: {
				recency: "Recency",
				frequency: "Frequency",
				monetary: "Monetary"
			},
			menuBottomAnalysis: {
				week: "Week",
				month: "Month",
				year: "Year",
				range: "Range"
			}
		},
		main: {
			subscribers: "Subscribers",
			times: "times"
		},
		rangeDate: {
			title: "Select Date Range",
			from: "FROM",
			to: "TO",
			cancelBtn: "CANCEL",
			setBtn: "SET",
			error: {
				startDateEmpty: "Please select start date",
				endDateEmpty: "Please select end date",
				// endDateEmpty: "End date is greater than start date"
			}
		}
	},
	mail: {
		menu : {
			titleMail: "Campaigns",
			menuTopMail: {
				all: "All",
				active: "Active",
				scheduled: "Scheduled",
				draft: "Drafts",
				waitApprove: "To Approve",
				sent: "Sent",
				other: "Other",
				searchPlaceholder: "Search Campaign Name"
			}
		},
		main : {
			titleHistory: "Approval History > ",
			record: " Record",
			sendDate: "Sent on",
			subscribers: "Subscribers",
			opens: "Opens",
			clicks: "Clicks",
			conditionAll: "All segment",
			currentMonthText: "THIS MONTH",
			messageListEmptyMsg: "No record of list message",
			messageHistoryEmptyMsg: "No record of approval history",
			history: {
				create: "Create",
				request: "Request",
				approval: "Approval",
				reject: "Reject",
				cancelRequest: "Cancel Request",
				cancelApprove: "Cancel Approve",
				cancelSend: "Cancel Send",
				other: "Other"
			},
			dialogueError: {
				getMainTitleErr: "Message List",
				getMainMsgErr: "Failed to get list message",
				getHistoryTitleErr: "Approve History",
				getHistoryMsgErr: "Failed to get approval history",
				systemErr: " > System Error",
				deleteMailTitleErr: "Fail Delete Message",
				deleteMailMsgErr: "Failed to delete message",
				cancelMailTitleErr: "Fail Cancel Message",
				cancelMailMsgErr: "Failed to cancel this message",
				stopMailTitleErr: "Fail Stop Message",
				stopMailMsgErr: "Failed to stop this message"
			},
			dialogueSuccess: {
				deleteMailTitleSuccess: "Success Delete Message",
				deleteMailMsgSuccess: "This message is deleted successfully",
				cancelMailTitleSuccess: "Success Cancel Message",
				cancelMailMsgSuccess: "This message is canceled successfully",
				stopMailTitleSuccess: "Success Stop Message",
				stopMailMsgSuccess: "This message is stopped successfully"
			}
		},
		common: {
			title: "Message",
			create: "Create New",
			duplicate: "Duplicate",
			view: "View",
		},
		selectTemplate: {
			lblTitle: "Setting Name",
			sms: "This is an simple label, users will not see it",
			tabMyTemplate: "My Template",
			tabLayoutTemplate: "Layout Template",
			layoutTemplate1: "Layout Template 1",
			layoutTemplate2: "Layout Template 2",
			layoutTemplate3: "Layout Template 3",
			layoutTemplate4: "Layout Template 4",
			layoutTemplate5: "Layout Template 5",
			layoutTemplate6: "Layout Template 6",
			layoutTemplate7: "Layout Template 7",
			layoutTemplate8: "Layout Template 8",
			layoutTemplate9: "Layout Template 9",
			layoutTemplate11: "Layout Template 11",
			layoutTemplate12: "Layout Template 12",
			dialogueError: {
				getTemplateTitleErr: "Get Template Error",
				getTemplateMsgErr: "Failed to get list template",
				selectTemplateTitleErr: "Select Template Error",
				selectTemplateMsgErr: "Please select template",
				deleteTemplateTitleErr: "Fail Delete Template",
				deleteTemplateTitleMsgErr: "Failed to delete template"
			},
			dialogueSuccess: {
				deleteTemplateTitleSuccess: "Delete Template Success",
				deleteTemplateMsgSuccess: "This template is deleted successfully"
			},
			inputError: {
				campainNameRequiredErr: "Please enter campain name",
				campainNameMaxLengthErr: "Please enter campain name with 256 digits"
			}
		},
		layoutTemplate: {
			subject: "Message Subject",
			headline: "Headline",
			bodyText: "Body Test Template",
			nameBtn: "URL",
			urlLink: "Link"
		},
		messageContent: {
			subjectNote: "Subject note",
			messageContentTitle: "MESSAGE CONTENTS",
			saveAsTemplate: "Save As Template",
			inputError: {
				subjectRequiredErr: "Please enter subject",
				subjectMaxLengthErr: "Please enter subject within 256 digits",
				subjectNoteRequiredErr: "Please enter subject note",
				subjectNoteMaxLengthErr: "Please enter subject note within 256 digits",
				headlineRequiredErr: "Please enter headline",
				imageRequiredErr: "Please select image",
				bodyTextRequiredErr: "Please enter body text",
				nameBtnRequiredErr: "Please enter link name",
				nameBtnMaxLengthErr: "Please enter link name within 5 digits",
				urlLinkRequiredErr: "Please input url",
				urlLinkFormatErr: "Url is invalid"
			},
			saveTemplate: {
				saveTemplateTitle: "Save Template",
				saveTemplateNote: "Message contents are edited currently which will save as a template",
				saveTemplateName: "Template Name",
				saveTemplateSuccess: "Saved message content as a template",
				saveTemplateBtn: "Save"
			},
			dialogueError: {
				getContentDetailTitleErr: "Fail Get Detail",
				getContentDetailMsgErr: "Failed to get message detail",
				saveMessageTitleErr: "Fail Save Message",
				saveMessageMsgErr: "Failed to save message"
			},
			dialogueSuccess: {
				saveMessageTitleSuccess: "Save Message Success",
				saveMessageMsgSuccess: "Message is saved successfully"	
			}
		},
		setting: {
			settingTitle: "Message Setting",
			conditionTitle: "Target segment",
			conditionNone: "None",
			issueDate: "Issue Date"
		},
		confirm: {
			confirmTitle: "Message Confirm",
			note: "This campaing will appear in scheduled <br/>message, You can still stop by going in<br/>STOP MESSAGE OUT in the message menu",
			messageSend: '<strong>This message is sent to </strong><strong class="campaign-title total-value">0</strong><strong> subscribers<br /><strong>（<span class="segment_name"></span>) on </strong><strong class="campaign-title dateTime"></strong></strong>',
			conditionNone: "All segment",
			users: "users",
			dialogueError: {
				getConditionTitleErr: "Fail Get Condition",
				getConditionMsgErr: "Failed to get count condition",
				sendMessageTitleErr: "Fail Send Message",
				sendMessageMsgErr: "Failed to send message"
			},
			dialogueSuccess: {
				sendMessageTitleSuccess: "Send Message Success",
				sendMessageMsgSuccess: "This message is sent successfully"
			}
		},
		footer: {
			template: "Template"
		}
	},
	coupon: {
		menu: {
			titleCoupon : "Coupon",
			menuTopCoupon: {
				all: "All",
				active: "Active",
				scheduled: "Scheduled",
				draft: "Drafts",
				sent: "Sent",
				waitApprove: "To Approve",
				searchPlaceholder: "Search List Coupon"
			}
		},
		list: {
			record: "Record",
			createDate: "Create date",
    		startDate: "Start date",
    		endDate: "End date",
    		confirmStop: "Stop confirmation",
    		creating: "Drafts",
    		beforeDistribution: "Before Sending",
    		distributing: "Sending",
    		endOfDistribution: "Sent",
    		stopUsing: "Stop",
    		distributionProcessing: "Sending",
			waitApprove: "To Approve",
			other: "Other",
			afterDistribution: "After sending ",
			day: " day",
			lbPublic: "Public",
			targets: "Targets",
			visibleTo: "Visible to",
			sendTo: "Sent To",
			conditionAll: "All segment",
			couponUse: "Coupon Use",
    		dialogue: {
				getListTitleErr: "Coupon List",
				getListMsgErr: "Failed to get list coupon",
				emptyListMsgErr: "No record of list coupon",
				systemErr: " > System Error",
				couponStopSuccess: "Success Stop Coupon",
			    msgCouponStopSuccess: "This coupon is stopped successfully",
			    couponDeleteSuccess: "Success Delete Coupon",
			    msgCouponDeleteSuccess: "This coupon is deleted successfully",
			    couponStopFail: "Fail Stop Coupon",
			    msgCouponStopFail: "Failed to stop coupon",
			    couponDeleteFail: "Fail Delete Coupon",
			    msgCouponDeleteFail: "Failed to delete coupon",
    		}
		},
		information: {
		    couponsName: "Coupon Name",
		    clearingWay: "Methods of use",
		    buttonOperationOnly : "Button operation only",
		    storeDecisionOnly : "GPS (Shop decision only) ",
		    shopAroundOnly: "GPS (Shop around only) ",
		    QRCode: "QR Code",
		    conditionsOfUse: "Conditions of use",
		    useRestrictionsOfArrival: "Limit use (number of peoples) ",
		    limitOnTheNumberOfTimesTheTotal: "Limit times (number of times) ",
		    limitTheMultipleUseOfTheSameDayLimitOnTheSameDay: "Limit the multiple use of the same day",
		    placeholderCondition: "It is an integer value of 1 or more and has 8 digits or less",
		    availabilityPeriod: "Availability period",
		    startCompletionDate: "Start completion date",
		    startCompletionDateErr1: "The completion date is greater than the system date",
		    startCompletionDateErr2: "The completion date is greater than the start date",
		    expirationDate: "Expiration Date",    
		    expirationDate1: "From member registration date",
		    expirationDate2: "From the date of issue", 
		    noteExpirationDate1: " (From issue date) ",
		    noteExpirationDate12: " (From register date) ",
		    confirmationScreen: "Confirmation screen",
		    displayAConfirmationScreenWhenUseCoupon: "Display a confirmation screen when use coupon",
		    couponUrl: "Coupon Url",
		 	dialogue:{
			    fillCouponName: "Please enter coupon name",
			    maxLengthCouponName: "Please enter subject within 100 digits",
			    maxLengthUseRestrictions: "Please enter limit use within 8 digits of numbers",
			    checkZeroUseRestrictions: "Limit use is a number that greater than 1",
			    maxLengthLimitNumber: "Please enter limit times within 8 digits of numbers",
			    checkZeroLimitNumber: "Limit times is a number that greater than 1",
			    maxLengthValidity: "Please enter expiration date within 8 digits of numbers",
			    checkZeroValidity: "Expiration date is a number that greater than 1",
			    fillUseStartDateTime: "Please select start date",
			    fillUseEndDateTime: "Please select completion date",
		   	},
			dialogueError: {
				getDetailCouponTitleErr: "Fail Get Detail",
				getDetailCouponMsgErr: "Failed to get coupon detail"
			}
		},
		content: {
			pageTitle: "Page Title",
		    couponName: "Coupon Name",
		    couponDetails: "Coupon Details",
		    couponDetailsPlaceHolder: "Popular ○○ cake is half price!",
		    couponImage: "Coupon Image",
		    choose: "Select Image",
		    notes: "Memo",
		    notesPlaceHolder: "Memo",
		    link: "Link",
		    toViewTheSocialCooperationList: "Link List Social",
		    aLinkToTheTopPage: "Link Top Page",
		    aLinkToTheCouponList: "Link List Coupon",
		    aLinkToTheMemberRegistration: "Link Register Member",
		    dialogue: {			    
			    fillPageTitle: "Please enter page title",
			    maxLengthPageTitle: "Please enter page title within 100 digits",
			    fillSubjectCoup: "Please enter the coupon name",
			    maxLengthSubjectCoup: "Please enter coupon name within 100 digits",
			    maxLengthCouponDetails: "Please enter coupon name within 4000 digits",
			    selectDescriptionImage: "Please select coupon image",
			    maxLengthDescriptionImage: "Please select coupon image name within 256 digits",
			    selectDescriptionImageURL: "Please select coupon image url",
			    maxLengthDescriptionImageURL: "Please select coupon image url within 256 digits",
			    maxLengthMemo: "Please enter memo within 4000 digits",
			},
			preview: {
				useInterval: "Limit use of same day: Yes"
			}
		},
		setting: {
			targetSegment: "Target segment",
			conditionNone: "None",
		    distributionMethods: "Distribution Methods",
		    distributionMethods1: "Distribution normal - Only one",
		    distributionMethods2: "Distribution repeat - Automatic distribution within specified term",
		    distributionConditions: "Distribution conditions",
		    distributionConditions1: "Distribution only one per user",
		    distributionConditions2: "Distribution only if user don't have a valid identity coupon",
		    distributionConditions3: "Distribution every times within specified term",
		    deliveryEndDateErr1: "Delivery end date is now larger than the distribution start date",
    		deliveryEndDateErr2: "Delivery end date is lesser than the system date",
		},
		confirm: {
			mailDeliveryConfirmation: "Coupon Confirm",
		    thisCouponToTheDestination: "This coupon to the destination",
		    andToBeDeliveredTo: "and to be delivered to.",
		    stopInfo: "",
		    couponSend: '<strong>We will distribute it with the current contents.<br>Is it OK?</strong>',
			couponSend2: '<strong>This coupon is</strong><br /><strong> (<span class="segment_name"></span>) on </strong><strong class="campaign-title dateTime"></strong></strong>',
			conditionNone: "All segment",
			users: "users",
		    dialogueSuccess: {
		    	sendCouponTitleSuccess: "Send Coupon Success",
			    sendCouponMsgSuccess: "This coupon is sent successfully",
			},
		    dialogueError: {
			    sendCouponTitleFail: "Fail Send Coupon",
			    sendCouponMsgFail: "Failed to send coupon",
			    getConditionTitleErr: "Fail Get Condition",
				getConditionMsgErr: "Failed to get count condition",
		    }
		},
		common: {
			title: "Coupon",
			membersOnlyCoupons: "Coupon Member",
    		membersCommonCoupon: "Coupon Member Common",
    		publicCoupon: "Coupon Public",
		    dialogueSuccess: {
		    	saveCouponTitleSuccess: "Success save coupon",
			    saveCouponMsgSuccess: "This coupon has been saved",
		    },
		    dialogueError: {
			    saveCouponTitleErr: "Fail save coupon",
			    saveCouponMsgErr: "Failed to save coupon",
		    }
		},
		footer: {
			type: "Type",
			basicInformation: "Basic Information"
		}
	},
	common: {
		content: "Content",
		setting: "Setting",
		confirm: "Confirm",
		btnBack: "Back",
		btnNext: "Next",
		inputTitleError: "Error Input",
		preview: "Preview",
		btnHome: "Home",
		btnSave: "Save&Exit",
	    required: " (required) ",
		zeroRecord: "0 Record",
		oneRecord: "1 Record",
		dialogue: {
			draftTitle: "Draft",
			draftMsg: "Input Data are saved<br/>Are you Sure?",
			backHomeTitle: "Back Main",
			backHomeMsg: "Input data are cleared<br />Are you Sure？",
			backHomeBtnCancel: "Cancel",
			backCouponTitle: "Warning !",
			backCouponMsg: "If you update Coupon's type. Your current setting will be reset.",
			btnEdit: "Edit",
			btnDuplicate: "Duplicate",
			btnView: "View",
			btnStop: "Cancel send",
			btnDelete: "Delete",
			btnHistory: "Approval History",
			btnReport: "Report",
			btnClose: "Close",
			confirmStopTitle: "STOP MESSAGE CONFIRM",
			textOk: "Are you Sure？",
			deleteTemplateMsg: "This template is deleted",
			uploadImage: {
				title: "Manage image",
				tabInputSearch: "Select From List",
				tabUploadImage: "Upload",
				tabOperation: "Operation",
				tabSearchImage: "Search",
				categoryTitle: "Category",
				categoryAll: "All",
				categoryNone: "None",
				categoryAll1: "None",
				searchText: "Search Text",
				orderTitle: "Order By",
				orderText1: "Filename",
				orderText2: "UpdateTime",
				perPageTitle: "Number Record",
				perPage1: "5 Record",
				perPage2: "20 Record",
				perPage3: "50 Record",
				imageTitle: "File",
				pageTitle: "Page",
				totalRecordTitle: "Record",
				listImageTitle: "List Image",
				btnNext: "Next",
				btnSelectedImage: "Decision",
				btnUpload: "Upload",
				btnSelectImage: "Select Image",
				note: "※Can use format image jpg, jpeg, gif, png, bmp, ico, gif animation",
				uploadImageErr: "Failed to upload image",
				uploadImageSuccess: "：Uploaded successfully",
				imageListEmptyMsg: "No list image with the specified conditions",
				selectedImageTitle: "Select Image",
				selectedImageMsg: "is selected",
				getImageTitleErr: "System Error",
				getImageMsgErr: "Failed to get list image",
				noSelectImageMsg: "Please select image"
			},
			changeLanguageTitle: "Change Language",
			changeLanguageJAMsg: "Changed to japanese<br />Other pages are applied",
			changeLanguageENMsg: "Changed to english<br />Other pages are applied",
			logoutMsg: "Logged out",
			countTitle: 'thông báo',
			countMsg: 'Dữ liệu đang được chuẩn bị'
		},
		dialogueError: {
			tokenTitleErr: "Fail Get Token",
			tokenTitleMsg: "Failed to get information of token",
			notLoginTitleErr: "Error Login",
			notLoginMsgErr: "Not login"
		}
	},
	notification: {
		menu : {
			titleNotification: "Notification",
			all: "All",
			draft: "Drafts",
			inProgress: "In progress",
			complete: "Complete",
			lisUp: "List up",
			error: "Error",
			searchPlaceholder: "Search notification"
		},
		main : {
			complete: "Completed total",
			currentMonthText: "This month",
			dialogueError: {
				getMainTitleErr: "Distribution information",
				getMainMsgErr: "Failed to get delivery notification",
				getHistoryTitleErr: "approval history",
				getHistoryMsgErr: "Authorization history acquisition process failed",
				systemErr: "> system error",
				deleteNotificationTitleErr: "Save Notification Deletion Failed",
				deleteNotificationMsgErr: "Failed to delete saved notification",
				cancelNotificationTitleErr: "delivery notice cancellation failure",
				cancelNotificationMsgErr: "Delivery notification cancel processing failed",
				stopNotificationTitleErr: "delivery notice stop failure",
				stopNotificationMsgErr: "This delivery notice stop process failed"
			},
			dialogueSuccess: {
				deleteNotificationTitleSuccess: "Successful storage deletion",
				deleteNotificationMsgSuccess: "Removed retention notification",
				cancelNotificationTitleSuccess: "delivery notice cancellation success",
				cancelNotificationMsgSuccess: "Delivery notification canceled",
				stopNotificationTitleSuccess: "delivery notice stop success",
				stopNotificationMsgSuccess: "Stop notification successfully stopped"
			}
		},
		common: {
			title: "Notification",
			dialogueSuccess: {
				saveNotificationTitleSuccess: "Notice saving success",
				saveNotificationMsgSuccess: "This notification has been saved",
			},
			dialogueError: {
				saveNotificationTitleErr: "Notice saving failed",
				saveNotificationMsgErr: "Information saving process failed",
			}
		},
		footer: {
			basicConfiguration: "Basic information",
			content: "Content",
			notificationCondition: "Condition",
			dispatchCondition: "Location information",
			confirm: "Confirm",
		},
		setting: {
			title: "Notification title",
			titleP: "Please enter title",
			body: "Notification body",
			bodyP: "Please enter the body",
			method: "Notification method",
			noticeOnce: "Notify only once",
			repeatNotice: "Repeat Notification",
			everyMonth: "Monthly",
			weekly: "Weekly",
			everyDay: "Everyday",
			day: "day",
			monday: "Monday",
			tuesday: "Tuesday",
			wednesday: "Wednesday",
			thursday: "Thursday",
			friday: "Friday",
			saturday: "Saturday",
			sunday: "Sunday",
			presenceOrAbsenceOfNotification: "Presence or absence of notification",
			notice: "Notify",
			noNotice: "Do not notify (Display only the notification list) ",
			displayPeriod: "Display period",
			halfAnHour: "30 minutes",
			onehour: "1 hour",
			twohours: "Two hours",
			duringTheDay: "During the day",
			threedays: "3 days",
			sevendays: "7 days",
			onemonth: "1 month",
			indefinitePeriod: "indefinite",
			// notificationByLocationInformation: "位置情報による通知",
			// notSpecified: "特に指定しない",
			// specified: "指定した時間帯に指定したエリアにいる人にのみ通知",
			note: "Notification with location information should be set at least 1 hour before",
				dialogue: {
				fillNotificationText: "Please enter notification title",
				maxLengthNotificationText: "Please enter the notification title with 100 digits",
				fillContentText: "Please enter notification body",
				maxLengthContentText: "Please enter the notification text as 100 digits",
				startCompletionDateErr1: "Completion date is greater than system date",
				startCompletionDateErr2: "completion date is greater than start date",
			},
		},
		content: {
			topDescription: "Top Description",
			topDescriptionPlaceholder: "Please enter the top description",
			bottomDescription: "Bottom description",
			topDescriptionPlaceholder: "Please enter bottom description",
			image: "Image",
			choose: "Select",
			remove: "Delete",
			dialogue: {
				fillHeader: "Please enter header text",
				fillFooter: "Please enter footer text",
			}
		},
		condition: {
			notificationByLocationInformation: "Notification by location information",
			notSpecified: "Not specified",
			areaSpecified: "Notify only to people in the area specified in the specified time zone",
			note: "Notifications using location information should be set at least 1 hour before.",
			extractionCondition: "Extraction condition",
			conditionNone: "No condition",
			dialogue: {
				getSegmentTitleErr: "Error",
				getSegmentMsgErr: "Failed to get segment"
			}
		},
		local:{
			specifyPosition: "Position",
			designateAccessPoint: "Access point",
			spotName: "Spot name",
			latitude: "Latitude",
			longitude: "Longitude",
			range: "Range",
			addSpot: "Add spot",
			editSpot: "Edit Spot",
			SSID: "SSID",
			MACAddress: "MAC address",
			radioIntensity: "Radio field strength",
			strong: "Strong (-49 dBm or more) ",
			normal: "Normal (-79 dBm to -50 dBm) ",
			weak: "Weak (-80 dBm or less) ",
			spotsList: "Spot List",
			item: " item",
			cancel: "Return",
			dialogue: {
			fillSpotName: "Please enter spot name",
			maxLengthSpotName: "Please enter spot name with 100 digits",
			fillLatitude: "Please enter latitude",
			isNumber: "Latitude longitude and range are numbers",
			fillLongitude: "Please enter longitude",
			fillScope: "Please enter range",
			fillSSID: "Enter SSID",
			maxLengthSSID: "Enter SSID with 32 digits",
			fillBSSID: "Please enter MAC address",
			maxLengthBSSID: "Enter BSSID with 17 digits",
			formatBSSID: "Invalid MAC address format",
			fillRssiType: "Enter radio field intensity",
			},
			// dialogueError: {
			// 	getShopListTitleErr: "舗を検索失敗",
			// 	getShopListMsgErr: "舗を検索失敗",
			// }
		},
		confirm: {
			notificationDeliveryConfirmation: "Notification delivery confirmation",
			// thisNotificationToTheDestination: "Send this notification to the destination",
			// andToBeDeliveredTo: ",",
			stopInfo: "",
			notificationSend: '<strong>Send this notification</strong><strong> (</strong><strong class="campaign-title total-value">0</strong><strong> - <span class="segment_name"></span>)  on <br/><span class ="campaign-title dateTime"></span></strong>',
			conditionNone: "No condition",
			users: "users",
			dialogueSuccess: {
				sendNotificationTitleSuccess: "Notice delivery success",
				sendNotificationMsgSuccess: "This announcement has been delivered",
			},
			dialogueError: {
				sendNotificationTitleFail: "Notice delivery failure",
				sendNotificationMsgFail: "Announcement delivery process failed",
				getConditionTitleErr: "Destination number acquisition failed",
				getConditionMsgErr: "Destination number acquisition process failed",
			}
		},
	}
};