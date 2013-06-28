import json

from tornado.web import RequestHandler


class JSONRequestHandler(RequestHandler):
    def initialize(self, **kwargs):
        self.set_header("Content-Type", "application/json")

    def finish(self, chunk=None):
        if not isinstance(chunk, basestring):
            chunk = json.dumps(chunk)

        super(JSONRequestHandler, self).finish(chunk=chunk)

    def get_error_html(self, *args, **kwargs):
        if self.get_status() == 404:
            self.set_header("Content-Type", "application/json")
            return {
                'errors': [{
                    'type': 'invalid',
                    'code': 'not_found',
                    'description': 'Requested object not found',
                }]}
        elif self.get_status() == 500:
            if 'exception' in kwargs:
                exc = kwargs['exception'].__class__.__name__
                self.set_header("Content-Type", "application/json")
                return {
                    'exception': exc,
                    'description': [str(kwargs['exception'])]}


class WebSocketWriterMixin(object):
    def emit(self, type, data):
        for ws in self.application.WEBSOCKETS:
            ws.write_message(json.dumps({
                'type': type,
                'data': data
            }))