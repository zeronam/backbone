var Backbone = require('backbone');
require('../../../../../../../lib/components/jquery/jquery-ui.datepicker.js');

module.exports = (function () {
	var ModalTemplateItemView = Backbone.Marionette.ItemView.extend({
		template: require('./dateRangeTemplate_item_template.html'),
    	tagName: "div",
    	className: "modal-template cf",
    	templateHelpers: {
            getTitle: function() {
            	return App.appModel.getLanguageType().analysis.rangeDate.title;
            },
            getFrom: function() {
            	return App.appModel.getLanguageType().analysis.rangeDate.from;
            },
            getTo: function() {
            	return App.appModel.getLanguageType().analysis.rangeDate.to;
            },
            getCancelBtn: function() {
            	return App.appModel.getLanguageType().analysis.rangeDate.cancelBtn;
            },
            getSetBtn: function() {
            	return App.appModel.getLanguageType().analysis.rangeDate.setBtn;
            }
        },
		loadDatePicker1: function() {
			var _this = this;
			$("#datepicker1").datepicker({       
				showOtherMonths: true,
				defaultDate: '-1m',
				maxDate: new Date(),
				beforeShowDay: function(date) {
					var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtdate1").val());
					var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtdate2").val());
					return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
				},
				onSelect: function(dateText, inst) {
					$("#txtdate1").val(dateText);
					var dateFormat = _this.formatDateShow(dateText, inst);
					if ( $("#txtdate2").val() ) {
						$("#from-date").html(dateFormat);
					} else {
						$("#from-date").html(dateFormat + ' ~ ');
					}

					//update date2 datepicker
					$("#datepicker2").datepicker("option", "minDate", dateText);
				}
			});
		},
		loadDatePicker2: function() {
			var _this = this;
			$("#datepicker2").datepicker({
				showOtherMonths: true,
				maxDate: new Date(),
				beforeShowDay: function(date) {
					var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtdate1").val());
					var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtdate2").val());
					return [true, date2 && ((date.getTime() == date2.getTime()) || (date1 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
				},
				onSelect: function(dateText, inst) {
					$("#txtdate2").val(dateText);
					var dateFormat = _this.formatDateShow(dateText, inst);
					if ( $("#txtdate1").val() ) {
						$("#to-date").html(dateFormat);
					} else {
						$("#to-date").html(" ~ " + dateFormat);
					}

					//update date1 datepicker
					$("#datepicker1").datepicker("option", "maxDate", dateText);
				}
			});
		},
		formatDateShow: function(dateText, inst) {
			var suffix = "";
			switch(inst.selectedDay) {
				case '1': case '21': case '31': suffix = 'st'; break;
				case '2': case '22': suffix = 'nd'; break;
				case '3': case '23': suffix = 'rd'; break;
				default: suffix = 'th';
			};
			var dateFormat = $.datepicker.formatDate(' MM yy', new Date(dateText));
			return inst.selectedDay + suffix + dateFormat;
		},
		showModalDateRange: function() {
			$("#modal-date-range").show();
    	},
		hideModalDateRange: function() {
			$("#modal-date-range").hide();
			$("#txtdate1, #txtdate2").val("");
			$("#from-date, #to-date").html("");
			$("#modal-date-range .error-info").html("");
			$("#datepicker1").datepicker("option", "maxDate", new Date());
			$("#datepicker2").datepicker("option", "minDate", null);
		}
	});

	return ModalTemplateItemView;
	
})();