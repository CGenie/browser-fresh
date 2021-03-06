browser-fresh
=============

Edit web code & see results immediately in your browser.

This article was an inspiration: [Our web development workflow is completely broken](http://blog.kenneth.io/blog/2013/05/21/our-web-development-workflow-is-completely-broken/)

How it works
============
* create a Python virtualenv
* `pip install -r requirements.pip`
* Start the proxy: `python src/server/run.py`
* Point your browser to the test webpage [http://localhost:7777/html/index.html](http://localhost:7777/html/index.html)
* Now you can give orders:
   * `curl -XPOST 'http://localhost:7777/page_refresh` -- will reload the page
   * `curl -XPOST 'http://localhost:7777/css_reload -d '{"file_name": "test.css"}'` -- will reload CSS file
      `test.css` (you can change the background color to see that it works)
   * `curl -XPOST 'http://localhost:7777/javascript_reload -d '{"file_name": "test.js"}'` -- will reload script
      `test.js` (which prints out 'test' in the console)
   * `curl -XPOST 'http://localhost:7777/javascript_execute' -d 'console.log(1 + 2)'` -- will execute any JS in the browser
   * `curl -XPOST 'http://localhost:7777/require_script_reload' -d '{"file_name": "test.js"}'` -- will attempt to reload
     a [requirejs](http://requirejs.org/) module. **NOTE**: this is still experimental
   * `curl -XPOST 'http://localhost:7777/observe_directory' -d '{"path": "/some/path", "recursive": true}'` -- will observe
     directory at `path` (optionally recursively) and send any reload notifications automatically when either JS or CSS
     files change. Thus you don't need to add post-save hooks to your editor anymore for these files.

Multiple sessions are supported, so that you can have multiple tabs open and send commands to all of them with one request.

Editor integration
==================
Now you can integrate these requests with your favorite editor. For example, in VIM you would do:
```vim
autocmd BufWritePost *.js !curl -s -XPOST 'http://localhost:7777/javascript_reload' -d '{"file_name": "%"}'
```

Notes
=====
Communication with the browser is done via WebSockets, while requests are always POSTs with JSON content by default
(the `javascript_execute` method being the exception for now).
