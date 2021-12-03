odoo.define('viin_web_studio.helper', function(require) {
    "use strict";
    
    var Helpers = {
        cloneObj: function(obj, deep = false) {
            var self = this
            var result = {};
            for (var key in obj) {
                if (deep && obj[key] instanceof Object) {
                    if (obj[key] instanceof Array) {
                        result[key] = [];
                        obj[key].forEach(function(item) {
                            if (item instanceof Object) {
                                result[key].push(self.cloneObj(item, true));
                            } else {
                                result[key].push(item);
                            }
                        });
                    } else {
                        result[key] = self.cloneObj(obj[key]);
                    }
                } else {
                    result[key] = obj[key];
                }
            }
            return result
        }
    }
    
    return Helpers;
    
});