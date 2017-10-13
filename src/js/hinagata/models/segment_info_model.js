var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function() {
    var SegmentInfo = BaseModel.extend({
        url: AppConf.url.appRoot + "/admin/chart/get_segment_info",
        initialize: function() {
            // if (AppConf.notification.webFlag || AppConf.mail.webFlag || AppConf.coupon.webFlag) {
            //     AppConf.notification.sessionId = AppConf.notification.sessionId || App.util.common.getUrlParameter('p');
            //     this.url = AppConf.url.appRoot + "/admin/webchart/get_segment_info";
            // }

            if (AppConf.webConf.webFlag) {
                this.url = AppConf.url.appRoot + "/admin/webchart/get_segment_info";
            }
        },
        parse: function(response) {
            return response;
        },
        fetchSegmentInfo: function(options) {
            var url = this.url + "?segmentId=" + (options.segmentId || AppConf.webConf.segmentId || AppConf.webConf.segmentIdFromUrl);
            // if (AppConf.notification.webFlag && AppConf.notification.sessionId) {
            //     url += "&p=" + AppConf.notification.sessionId;
            // } else if (AppConf.mail.webFlag && AppConf.mail.sessionId) {
            //     url += "&p=" + AppConf.mail.sessionId;
            // } else if (AppConf.coupon.webFlag && AppConf.coupon.sessionId) {
            //     url += "&p=" + AppConf.coupon.sessionId;
            // }

            if (AppConf.webConf.webFlag) {
                url += "&p=" + (AppConf.webConf.sessionId || AppConf.webConf.segmentIdFromUrl);
            }
            var _options = _.extend(options || {}, { url: url });
            return this.fetchWithAuthInfo(_options);
        }
    });

    return SegmentInfo;

})();
