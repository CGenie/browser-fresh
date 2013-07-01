from . import JSONRequestHandler, WebSocketWriterMixin


class CSSReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def post(self):
        file_name = self.data.get('file_name', None)

        if file_name is not None:
            self.emit('css_reload', {'file_name': file_name})

        self.finish({})
