define(
    [],
    function() {
	var call = function(data) {
	    console.log('css_reload', data);
	    var file_name = data.file_name;
	    var links = document.getElementsByTagName('link');
	    var head = document.getElementsByTagName('head')[0];
	    for(var i = 0; i < links.length; i++) {
		var link = links[i];
		if((link.href) && (link.href.indexOf(file_name) > -1)) {
		    console.log('css found', link.href);
		    link.remove();
		    var new_link = document.createElement('link');
		    new_link.rel = 'stylesheet';
		    new_link.type = 'text/css';
		    new_link.href = link.href;
		    head.appendChild(new_link);
		}
	    }
	}

	return {
	    call: call,
	    supported_types: ['css_reload']
	}
    });
