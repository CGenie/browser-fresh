define(
    function(require) {
        var handlers = [require('handlers/page_reload'),
                        require('handlers/css_reload'),
			require('handlers/require_script_reload'),
			require('handlers/javascript_reload'),
			require('handlers/javascript_execute')];

        var find = function(handler_type) {
            ret = [];

            for(var i = 0; i < handlers.length; i++) {
                var handler = handlers[i];
                
                if(handler.supported_types.indexOf(handler_type) > -1) {
                    ret.push(handler);
                }
            }

            return ret;
        }

        return {
            find: find
        }
    });
