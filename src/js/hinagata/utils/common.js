module.exports = (function() {

    var CommonUtil = {
        convertImage: function(file, callback) {
            var _this = this;
            // Ensure it's an image
            if (file.type.match(/image.*/)) {
                console.log('An image has been loaded');
                // Load the image
                var reader = new FileReader();
                reader.onload = function(readerEvent) {
                        var image = new Image();
                        image.onload = function(imageEvent) {

                            // Resize the image
                            var canvas = document.createElement('canvas');
                            canvas.width = image.width;
                            canvas.height = image.height;
                            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
                            var dataUrl = canvas.toDataURL('image/jpeg');
                            var resizedImage = _this.dataURLToBlob(dataUrl, file.name);

                            callback(resizedImage);
                        }
                        image.src = readerEvent.target.result;
                    }
                reader.readAsDataURL(file);
            }
        },
        dataURLToBlob: function(dataURL, name) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = parts[1];

                return new Blob([raw], { type: contentType });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            // blob work on safari
            var blob = new Blob([uInt8Array], { type: contentType });
            blob.lastModified= new Date();
            return blob;
            // var blob = new Blob([uInt8Array], { type: contentType });
            // var imageExtension = name.split('.').pop().toLowerCase();
            // name = name.substr(0, name.length - imageExtension.length) + 'jpeg';
            // return new File([blob], name, { type: contentType, lastModified: Date.now() });
        },
        getUrlParameter: function(name, url) {
			if (!url) {
				url = window.location.href;
			}
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return undefined;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		},
        getLocation : function(href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        }
    };
    return CommonUtil;

})();
