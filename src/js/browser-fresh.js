/*
 * Widget initializer to be put on a webpage.
 */

var BrowserFresh = BrowserFresh || [];

// script path autodiscover
BrowserFresh.API_HOST = BrowserFresh.API_HOST || 'http://localhost:7777/';
if(BrowserFresh.API_HOST.substr(-1, 1) != '/') {
    BrowserFresh.API_HOST += '/';
}
BrowserFresh.WS_API_HOST = BrowserFresh.API_HOST.replace("http://", "ws://");

// TODO: sandbox requirejs configuration
// require.s.contexts._.config
BrowserFresh._setup = function() {
    BrowserFresh.require = require.config({
        context: 'BrowserFresh',
        baseUrl: BrowserFresh.API_HOST + 'js/',
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
	   var socket;

	   var socketProbe = function() {
	       console.log('probing for socket...');
	       try {
		   socket = new WebSocket(BrowserFresh.WS_API_HOST + 'ws');
	       } catch(e) {
		   console.log('couldn\'t find socket');
	       }
	       socket.onopen = function() {
		   console.log('socket found');
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
		   setTimeout(socketProbe, 5000);
	       }
	   }

	   socketProbe();
       });
};

BrowserFresh._load = function() {
    if(window.require == undefined) {
        var req = document.createElement('script');
        req.type = 'text/javascript';
        req.async = true;
        req.src = BrowserFresh.API_HOST + 'js/contrib/require.js';
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

