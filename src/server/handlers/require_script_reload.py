from . import JSONRequestHandler, WebSocketWriterMixin


class RequireScriptReloadHandler(JSONRequestHandler, WebSocketWriterMixin):
    def post(self):
        file_name = self.data.get('file_name', None)

        if file_name is not None:
            self.emit('require_script_reload', {'file_name': file_name})

        self.finish({})
