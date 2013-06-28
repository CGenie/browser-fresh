from . import JSONRequestHandler, WebSocketWriterMixin


class PageReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def post(self):
        self.emit('page_reload', {})
        self.finish({})
