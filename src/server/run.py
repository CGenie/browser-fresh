import os
import tornado.ioloop
import tornado.web

from handlers.javascript_reload import JavaScriptReloadHandler
from handlers.page_reload import PageReloadHandler
from handlers.web_socket import WebSocketHandler


app_params = {}
#if settings.DEBUG:
app_params['debug'] = True

PROJECT_DIR = os.path.join('/home', 'przemek', 'git-work', 'browser-fresh', 'src')


class EchoHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_status(200)
        self.set_header("Content-Type", "application/json")
        self.write('{"echo": "echo"}')


url_handlers = [
    (r"/echo/?", EchoHandler),

    (r"/ws/?", WebSocketHandler),

    (r"/javascript_reload/?", JavaScriptReloadHandler),
    (r"/page_reload/?", PageReloadHandler),

    # STATICS
    (r"/js/(.*)",
     tornado.web.StaticFileHandler,
     {'path': os.path.join(PROJECT_DIR, 'js')}),
]

application = tornado.web.Application(url_handlers, **app_params)
application.WEBSOCKETS = []

if __name__ == "__main__":
    application.listen(7777)
    tornado.ioloop.IOLoop.instance().start()
