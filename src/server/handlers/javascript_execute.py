from . import JSONRequestHandler, WebSocketWriterMixin


class JavaScriptExecuteHandler(JSONRequestHandler, WebSocketWriterMixin):
    def post(self):
        self.emit('javascript_execute', {'code': self.request.body})
        self.finish({})
