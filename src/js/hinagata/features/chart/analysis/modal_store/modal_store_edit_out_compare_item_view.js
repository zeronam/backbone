var Backbone = require('backbone');
module.exports = (function() {
    var ModalStoreEditOutCompareItemView = Backbone.Marionette.ItemView.extend({
        template: require('./modal_store_edit_out_compare_template.html')
    });

    return ModalStoreEditOutCompareItemView;

})();