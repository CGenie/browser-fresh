import os
import tornado.ioloop
import tornado.web

from handlers.css_reload import CSSReloadHandler
from handlers.javascript_execute import JavaScriptExecuteHandler
from handlers.javascript_reload import JavaScriptReloadHandler
from handlers.page_reload import PageReloadHandler
from handlers.require_script_reload import RequireScriptReloadHandler
from handlers.web_socket import WebSocketHandler


app_params = {}
#if settings.DEBUG:
app_params['debug'] = True

SERVER_DIR =  os.path.dirname(os.path.realpath(__file__))
PROJECT_DIR = os.path.split(SERVER_DIR)[0]


class EchoHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_status(200)
        self.set_header("Content-Type", "application/json")
        self.write('{"echo": "echo"}')


url_handlers = [
    (r"/echo/?", EchoHandler),

    (r"/ws/?", WebSocketHandler),

    (r"/css_reload/?", CSSReloadHandler),
    (r"/javascript_execute/?", JavaScriptExecuteHandler),
    (r"/javascript_reload/?", JavaScriptReloadHandler),
    (r"/require_script_reload/?", RequireScriptReloadHandler),
    (r"/page_reload/?", PageReloadHandler),

    # STATICS
    (r"/css/(.*)",
     tornado.web.StaticFileHandler,
     {'path': os.path.join(PROJECT_DIR, 'css')}),
    (r"/js/(.*)",
     tornado.web.StaticFileHandler,
     {'path': os.path.join(PROJECT_DIR, 'js')}),
    (r"/html/(.*)",
     tornado.web.StaticFileHandler,
     {'path': os.path.join(PROJECT_DIR, 'html')}),

]

application = tornado.web.Application(url_handlers, **app_params)
application.WEBSOCKETS = []

if __name__ == "__main__":
    application.listen(7777)
    tornado.ioloop.IOLoop.instance().start()
