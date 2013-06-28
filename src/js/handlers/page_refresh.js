define(
    [],
    function() {
	var call = function(data) {
	    location.reload();
	}

	return {
	    call: call,
	    supported_types: ['page_refresh']
	}
    });
