module.exports = (function () {

	var TextUtil = {
		nl2br: function(str){
			if(!str) return "";
			return str.replace(/[\n\r]/g, "<br />");
		},
		brnl2: function(str){
			if(!str) return "";
			return str.replace(/<br.*?>/g, "\n");
		},
		brnl3: function(str){
			if(!str) return "";
			return str.replace(/<br.*?>/g, "&#13;&#10;");
		},
		numberWithDelimiter: function( number ){
			return String(number).toString().replace(/(\d)(?=(\d\d\d)+$)/g , '$1,');
		},
		setTitleError: function(title, message, element, className) {
			$(".box-total-list .total").text(title + App.appModel.getLanguageType().mail.main.dialogueError.systemErr);
			$(element).html("<div class='" + className + "'>"  + "<div class='list-view-empty'><div class='emptyView bgcolor1 ftcolor1'>" + message + "</div></div></div>");
			$("#search-terms").prop("disabled", true);
		},
		setTitleImageError: function() {
			$(".list_img_upload .total").text(App.appModel.getLanguageType().common.dialogue.uploadImage.getImageTitleErr);
			$("#image-list-region").html("<div class='list-view-empty'><div class='emptyView bgcolor1 ftcolor1'>" + App.appModel.getLanguageType().common.dialogue.uploadImage.getImageMsgErr + "</div>");
			$("#pageImageList").hide();
		},
		relaceLtGt: function(str) {
			if (!str) return "";
			return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		},
		replaceDate: function(str) {
			if (!str) return "";
			return str.replace(/-/g, "");
		},
		convertUrl: function( url ){
			var urlTmp;
			if ( url.indexOf("://") > 0 ) {
				urlTmp = url.split("://");
				urlTmp = urlTmp[1];
			} else {
				urlTmp = url;
			}
			return urlTmp;
		},
		getImageUrl: function(url) {
			if ( url === "./image/main/noImage.png" ) return url;
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			var rootUrl = AppConf.url.appRoot.substr(0, lengthUrl);

			return urlTmp = url.split(rootUrl)[1];
		},
		getFullImageUrl: function(url) {
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			var rootUrl = AppConf.url.appRoot.substr(0, lengthUrl);
			var imageUrl = rootUrl + url;
			return imageUrl;
		},
		formatNumberLayoutMail: function( number ) {
			var languageType = App.appModel.getLanguage();
			var numberTmp = number;
			switch ( languageType ) {
				case "ja":
					if ( numberTmp === 1 ) {
						numberTmp = "１";
					} else if ( numberTmp === 2 ) {
						numberTmp = "２";
					}
					break;
				case "en":
					if ( numberTmp === 1 ) {
						numberTmp = "1";
					} else if ( numberTmp === 2 ) {
						numberTmp = "2";
					}
					break;
			};
			return numberTmp;
		},
		getImageName: function(imageUrl) {
			return imageUrl.split('/').pop().split(".")[0];
		},
		parseNumberToPercent: function(number, maxCount) {
			return (number * 100) / maxCount;
		},
		parsePercentToNumber: function(number, maxCount) {
			return (number * maxCount) / 100;
			// return Math.round((number * maxCount) / 100);
		},
		setTitleQuarter: function( date ) {
			if ( !date ) return "";
			var textQ = "Q";
			var dateTmp = date.split("-");
			var year = dateTmp[0];
			var quarter = parseInt(dateTmp[1]);
			textQ += quarter;
			textQ += "-" + year;
			return textQ;
		},
		setTitleQuarter1: function( date ) {
			if ( !date ) return "";
			var textQ = "Q";
			var dateTmp = date.split("-");
			var year = dateTmp[0];
			var month = parseInt(dateTmp[1]);
			switch ( month ) {
				case 1:
				case 2:
				case 3:
					textQ += 1;
					break;
				case 4:
				case 5:
				case 6:
					textQ += 2;
					break;
				case 7:
				case 8:
				case 9:
					textQ += 3;
					break;
				case 10:
				case 11:
				case 12:
					textQ += 4;
					break;
			};
			textQ += "-" + year;
			return textQ;
		}
	};
	return TextUtil;

})();
