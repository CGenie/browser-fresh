browser-fresh
=============

Edit web code & see results immediately in your browser.

This article was an inspiration: [Our web development workflow is completely broken](http://blog.kenneth.io/blog/2013/05/21/our-web-development-workflow-is-completely-broken/)

How it works
============
* create a Python virtualenv
* `pip install -r requirements.pip`
* Start the proxy: `python src/server/run.py`
* Point your browser to the test webpage (http://localhost:7777/html/index.html)
* Now you can give orders:
   * `curl -XPOST 'http://localhost:7777/page_refresh` -- will reload the page
   * `curl -XPOST 'http://localhost:7777/javascript_reload` -d '{"file_name": "test.js"}' -- will reload script
      'test.js' (which prints out 'test' in the console)
   * `curl -XPOST 'http://localhost:7777/javascript_execute' -d 'console.log(1 + 2)'` -- will execute any JS in the browser

Notes
=====
Communication with the browser is done via WebSockets, while requests are always POSTS with JSON content by default
(the `javascript_execute` method being the exception for now).