define(
    [],
    function() {
	var call = function(data) {
	    console.log('executing JavaScript code:');
	    console.log('-----------------------------------');
	    console.log(data.code);
	    console.log('-----------------------------------');
	    eval(data.code);
	}

	return {
	    call: call,
	    supported_types: ['javascript_execute']
	}
    });
