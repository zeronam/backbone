var Backbone = require('backbone');
module.exports = (function() {
	var ModalSelectMonetaryItemView = Backbone.Marionette.ItemView.extend({
    	template: require('./monetaryTemplate_item_template.html'),
    	tagName: "div",
    	className: "modal-template cf",
    	showModalMonetary: function() {
        $("#txt-start-at").val(0);
        $("#txt-increase").val(500);
        $("#modal-monetary .error-info").html("");
  			$("#modal-monetary").show();
      	},
  		hideModalMonetary: function() {
  			$("#modal-monetary").hide();
  		}
  	});

  	return ModalSelectMonetaryItemView;

})();