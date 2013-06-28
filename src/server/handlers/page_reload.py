from . import JSONRequestHandler, WebSocketWriterMixin


class PageReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def get(self):
        self.emit('page_reload', {})
        self.finish({})
