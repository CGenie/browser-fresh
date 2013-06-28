define(
    ['handlers/page_refresh'],
    function(PageRefreshHandler) {
        var handlers = [PageRefreshHandler];

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
