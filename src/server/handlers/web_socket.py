from tornado.ioloop import IOLoop
from tornado import websocket


class WebSocketHandler(websocket.WebSocketHandler):
    def open(self):
        print 'new connection'
        IOLoop.instance().WEBSOCKETS.append(self)

    def on_message(self, message):
        print 'message received', message

    def on_close(self):
        print 'connection closed'
        IOLoop.instance().WEBSOCKETS.remove(self)
