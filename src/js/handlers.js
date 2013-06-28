define(
    ['handlers/page_reload',
     'handlers/javascript_reload',
     'handlers/javascript_execute'],
    function(PageReloadHandler,
	     JavaScriptReloadHandler,
	     JavaScriptExecuteHandler) {
        var handlers = [PageReloadHandler,
			JavaScriptReloadHandler,
			JavaScriptExecuteHandler];

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
