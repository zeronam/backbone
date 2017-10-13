var Backbone = require('backbone');
module.exports = (function() {
    var AdvanceChartItemView = Backbone.Marionette.ItemView.extend({
        template: require('./advanceChart_item_template.html')
    });

    return AdvanceChartItemView;
    
})();