var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
	var ModalTemplateItemView = Backbone.Marionette.ItemView.extend({
        template: require('./exportDataTemplate_item_template.html'),
        tagName: "div",
        className: "modal-template cf",
        templateHelpers: {
            getToday: function(){
                return moment(new Date()).format("MMM YYYY");
            }
        },
        showModalExportData: function() {
            $("#modal-export-data").show();
        },
        hideModalExportData: function() {
            $("#modal-export-data").hide();
        }
  	});

  	return ModalTemplateItemView;

})();