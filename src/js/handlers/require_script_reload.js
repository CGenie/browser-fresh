define(
    ['tools',
     'handlers/javascript_reload'],
    function(Tools, JavaScriptReloadHandler) {
	var call = function(data) {
	    console.log('require_script_reload', data);
	    var file_name = data.file_name;
	    if(file_name.slice(-1) == '/') {
		file_name = slice(0, -1);
	    }
	    file_name = file_name.split('/').slice(-1)[0];
	    var module_name = file_name.slice(0, -3);

	    for(var context_name in require.s.contexts) {
		var context = require.s.contexts[context_name];
		for(var url in context.urlFetched) {
		    if(url.indexOf(file_name) > -1) {
			console.log('url found', url);
			context.urlFetched[url] = false;
			require.undef(module_name);
			JavaScriptReloadHandler.call(data);
			context.require([Tools.path_append_random_uuid(url)],
					function(m) { console.log('require reloaded:', module_name) });
		    }
		}
	    }
	}

	return {
	    call: call,
	    supported_types: ['require_script_reload']
	}
    });
