from tornado import websocket


class WebSocketHandler(websocket.WebSocketHandler):
    def open(self):
        print 'new connection'
        self.application.WEBSOCKETS.append(self)

    def on_message(self, message):
        print 'message received', message

    def on_close(self):
        print 'connection closed'
        self.application.WEBSOCKETS.remove(self)
