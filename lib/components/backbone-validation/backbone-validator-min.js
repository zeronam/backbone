(function(F){"function"==typeof define&&define.amd?define(["backbone","underscore"],F):"object"==typeof exports?module.exports=F(require("backbone"),require("underscore")):F(window.Backbone,window._)})(function(F,t){"use strict";function u(F){var u=t.inject(F,function(F,u,e){return u.length&&(F[e]=t.isString(u)?[u]:u),F},{});return t.size(u)?u:null}var e=F.Validator={version:"0.3.3",validate:function(F,u,e){var n={};return t.each(F,function(i,a){var r=u[a];if(r){var d=this._validateAll(r,a,i,e,F);d.length&&(n[a]=t.uniq(d))}},this),t.size(n)?n:null},_validateAll:function(F,u,n,i,a){return i=i||this,t.inject(t.flatten([F||[]]),function(F,r){return t.chain(r).omit("message").each(function(d,s){var o=this._validators[s];if(!o)throw Error("Missed validator: "+s);var l=o.fn.apply(i,[n,d,a]);if(l!==!0){var f=r.message||l||e.createMessage(u,n,d,s,i)||o.message||"Invalid";t.isFunction(f)&&(f=f.apply(i,[u,n,d,s])),f=e.formatMessage(f,u,n,d,s,i),F.push(f)}},this).value(),F},[],this)},add:function(F,t,u){this._validators[F]={fn:t,message:u}},_validators:{},getAttrsToValidate:function(F,u){var e,i,a=F.attributes;return t.isArray(u)||t.isString(u)?e=n(a,u):u?e=u:(i=t.extend({},a,t.result(F,"validation")||{}),e=n(a,t.keys(i))),e},createMessage:function(){return!1},formatMessage:function(F){return F}};e.Extensions={View:{bindValidation:function(F,u){if(F=F||this.model,!F)throw"Model is not provided";this.listenTo(F,"validated",function(F,n,i){var a=t.extend({},e.ViewCallbacks,t.pick(this,"onInvalidField","onValidField"),u);i=i||{},t.each(n,function(t,u){var e=i[u];e&&e.length?a.onInvalidField.call(this,u,t,e,F):a.onValidField.call(this,u,t,F)},this)})}},Model:{validate:function(F,u){var n=t.result(this,"validation")||{},i=e.getAttrsToValidate(this,F),a=e.validate(i,n,this);return u=u||{},a=u.processErrors?u.processErrors(a):e.ModelCallbacks.processErrors(a),u.silent||t.defer(t.bind(this.triggerValidated,this),i,a),u&&u.suppress?null:a},_validate:function(F,u){if(!u.validate||!this.validate)return!0;var n=e.getAttrsToValidate(this,F),i=this.validationError=this.validate(n,u)||null;return i&&this.trigger("invalid",this,i,t.extend(u||{},{validationError:i})),!i},triggerValidated:function(F,t){var n=e.getAttrsToValidate(this,F),i=u(t);this.validationError=i,this.trigger("validated",this,n,i),this.trigger("validated:"+(i?"invalid":"valid"),this,n,i)},isValid:function(F,t){var u=e.getAttrsToValidate(this,F);return!this.validate||!this.validate(u,t)}}};var n=function(F,u){return t.inject(t.flatten([u]),function(t,u){return t[u]=F[u],t},{})};e.ViewCallbacks={onValidField:function(F){var t=this.$('input[name="'+F+'"]');t.removeClass("error"),t.next(".error-text").remove()},onInvalidField:function(F,t,u){var e=this.$('input[name="'+F+'"]');e.next(".error-text").remove(),e.addClass("error").after('<div class="error-text">'+u.join(", ")+"</div>")}},e.ModelCallbacks={processErrors:function(F){return F}};var i=[{name:"required",message:"Is required",fn:function(F,t){return t===!1||!!F}},{name:"blank",message:"Could not be blank",fn:function(F,u){return u===!0?!0:t.isString(F)?!F.match(/^[\s\t\r\n]*$/):t.isArray(F)?!!F.length:t.isObject(F)?!t.isEmpty(F):!!F}},{name:"collection",fn:function(F,u){if(u===!1||!F)return!0;"function"==typeof u&&(F=u.call(this,F));var e=t.inject(F.models||F,function(F,t,u){var e=t.validate();return e&&F.push([u,e]),F},[]);return e.length?e:!0}},{name:"model",fn:function(F,t){return t!==!1&&F?("function"==typeof t&&(F=t.call(this,F)),F.validate()||!0):!0}},{name:"minLength",message:"Is too short",fn:function(F,t){return!F||F.length>=t}},{name:"maxLength",message:"Is too long",fn:function(F,t){return!F||t>=F.length}},{name:"format",message:"Does not match format",fn:function(F,t){return!F||!!(""+F).match(e.formats[t]||t)}},{name:"fn",fn:function(F,t,u){return t.call(this,F,u)}}];return e.formats={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},t.each(i,function(F){e.add(F.name,F.fn,F.message)}),t.extend(F.Model.prototype,e.Extensions.Model),t.extend(F.View.prototype,e.Extensions.View),e});