from . import JSONRequestHandler, WebSocketWriterMixin


class PageReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def get(self):
        self.emit('page_refresh', {})
        self.finish({})
