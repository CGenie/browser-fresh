# solution based on http://stackoverflow.com/questions/11128923/tornado-equivalent-of-delay

import json
import os
import time
from tornado.ioloop import IOLoop
from tornado.web import asynchronous
from tornado import gen, httpclient

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from . import JSONRequestHandler, WebSocketWriterMixin


class Handler(FileSystemEventHandler):
    def __init__(self, *args, **kwargs):
        self._tornado_handler = kwargs.pop('_tornado_handler')
        super(Handler, self).__init__(*args, **kwargs)

    def on_modified(self, event):
        if event.event_type == 'modified':
            print 'File modified: %s' % event.src_path
            path = event.src_path
            request_type = None
            if path.endswith('.js'):
                request_type = 'javascript_reload'
            elif path.endswith('.css'):
                request_type = 'css_reload'
                
            if request_type is not None:
                self._tornado_handler.emit(request_type, {
                    'file_name': os.path.split(path)[1],
                })


class ObserveDirectoryHandler(JSONRequestHandler, WebSocketWriterMixin):
    @asynchronous
    @gen.engine
    def post(self):

        path = self.data.get('path', None)
        recursive = self.data.get('recursive', True)

        self.finish({})

        if path is not None:
            if self.get_observer_for_path(path) is not None:
                return

            inst = IOLoop.instance()
            dd = {
                'path': path,
                'recursive': recursive,
            }

            observer = Observer()
            if not inst.OBSERVERS:
                inst.OBSERVERS = [observer]

            else:
                inst.OBSERVERS.append(observer)
                
            observer.schedule(Handler(_tornado_handler=self), path=path,
                              recursive=recursive)
            observer.start()

    def delete(self):
        path = self.data.get('path', None)

        if path is not None:
            inst = IOLoop.instance()
            observer = self.get_observer_for_path(path)
            observer.stop()
            inst.OBSERVERS.remove(observer)

        self.finish({})

    def get_observer_for_path(self, path):
        inst = IOLoop.instance()
        for observer in inst.OBSERVERS:
            if path in [w.path for w in observer._watches]:
                return observer
