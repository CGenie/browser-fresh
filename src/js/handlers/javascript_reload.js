define(
    [],
    function() {
	var call = function(data) {
	    console.log('javascript_reload', data);
	    var file_name = data.file_name;
	    var scripts = document.getElementsByTagName('script');
	    var head = document.getElementsByTagName('head')[0];
	    for(var i = 0; i < scripts.length; i++) {
		var script = scripts[i];
		if((script.src) && (script.src.indexOf(file_name) > -1)) {
		    console.log('script found', script.src);
		    script.remove();
		    var new_script = document.createElement('script');
		    new_script.type = 'text/javascript';
		    new_script.src = script.src;
		    head.appendChild(new_script);
		}
	    }
	}

	return {
	    call: call,
	    supported_types: ['javascript_reload']
	}
    });
