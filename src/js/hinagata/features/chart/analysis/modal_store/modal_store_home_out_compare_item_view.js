var Backbone = require('backbone');
module.exports = (function() {
    var ModalStoreHomeOutCompareItemView = Backbone.Marionette.ItemView.extend({
        template: require('./modal_store_home_out_compare_template.html')
    });

    return ModalStoreHomeOutCompareItemView;

})();