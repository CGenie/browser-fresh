/*
 * Widget initializer to be put on a webpage.
 */

var BrowserFresh = BrowserFresh || [];

// script path autodiscover
var API_HOST = API_HOST || 'http://localhost:7777/';
if(API_HOST.substr(-1, 1) != '/') {
    API_HOST += '/';
}
var WS_API_HOST = API_HOST.replace("http://", "ws://");

// TODO: sandbox requirejs configuration
// require.s.contexts._.config
BrowserFresh._setup = function() {
    BrowserFresh.require = require.config({
        context: 'BrowserFresh',
        baseUrl: API_HOST + 'js/',
        paths: {
            jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
	    handlers: 'handlers'
//	    socketio: 'contrib/socket.io'
//            text: 'contrib/text',
//            async: 'contrib/async',
//            moment: 'contrib/moment.min',
        },
        shim: {
            jquery: {
                exports: '$'
            }
        // },
        // config: {
        //     text: {
        //         useXhr: function() {
        //             return true;
        //         }
        //     }
        }
    });
}

BrowserFresh.start = function(options) {
   BrowserFresh.require(
       ['jquery', 'handlers'],
       function($, Handlers) {
	   var socket = new WebSocket(WS_API_HOST + 'ws');
	   socket.onopen = function() {
	   };
	   socket.onmessage = function(evt) {
	       console.log('incoming data', evt.data);
	       var data = JSON.parse(evt.data);
	       var handlers = Handlers.find(data.type);
	       for(var i = 0; i < handlers.length; i++) {
		   handlers[i].call(data.data);
	       }
	   }
	   socket.onclose = function() {
	       console.log('socket closed');
	   }
       });
};

BrowserFresh._load = function() {
    if(window.require == undefined) {
        var req = document.createElement('script');
        req.type = 'text/javascript';
        req.async = true;
        req.src = API_HOST + 'js/contrib/require.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(req, s);

        (ready = function() {
            if(window.require == undefined) {
                setTimeout(ready, 10);
            } else {
                BrowserFresh._setup();
                BrowserFresh.start();
            }
        })();
    };
};
BrowserFresh._load();

