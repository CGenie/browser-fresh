from . import JSONRequestHandler, WebSocketWriterMixin


class JavaScriptReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def get(self):
        file_name = self.get_argument('file_name', None)

        if file_name is not None:
            self.emit('javascript_reload', {'file_name': file_name})
        self.finish({})
