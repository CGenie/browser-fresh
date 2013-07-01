define(
    [],
    function() {
	return {
	    path_append_random_uuid: function(path) {
		var uuid = parseInt(Math.random() * 100000);
		var start = path.indexOf('_BrowserFresh=');
		if(start == -1) {
		    return path + '?_BrowserFresh=' + uuid;
		} else {
		    return path.slice(0, start) + path.slice(start).replace(/(\d+)/, uuid);
		}

	    }
	}
    });
