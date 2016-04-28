"""A single common terminal for all websockets.
"""
import tornado.web
# This demo requires tornado_xstatic and XStatic-term.js
import tornado_xstatic

import os.path
import webbrowser
import tornado.httpserver
import tornado.ioloop
import terminado
from terminado import TermSocket, UniqueTermManager, uimodule
import tempfile

# {week: max steps}
CLASS00_STEP_DICT = {0: 2}
CLASS01_STEP_DICT = {0: 6}
CLASS02_STEP_DICT = {0: 6, 1: 13, 2: 9, 3: 10, 4: 9, 5: 7, 6: 5, 7: 5, 8: 7, 9: 2, 10: 4}
# 03: Ms. Thomas' and Mr. Lamb's Classes
CLASS03_STEP_DICT = {0: 6, 1: 8, 2: 8, 3: 5, 4: 5, 5: 4, 6: 7, 7: 6, 8: 6}
CLASS04_STEP_DICT = {0: 11, 1: 11}
# 05: Basic Python
CLASS05_STEP_DICT = {0: 6, 1: 6, 2: 6, 3: 4, 4: 4, 5: 5, 6: 5, 7: 5}
# 06: Intermediate Python
CLASS06_STEP_DICT = {0: 6, 1: 5, 2: 7, 3: 5, 4: 6, 5: 6, 6: 6, 7: 5, 8: 5, 9: 4, 10: 6}
# 07: Introduction to Programming (Web)
CLASS07_STEP_DICT = {0: 6, 1: 8, 2: 8, 3: 5, 4: 5, 5: 4}
# 08: Introduction to Programming (Raspberry Pi)
CLASS08_STEP_DICT = {0: 6, 1: 6, 2: 9, 3: 5, 4: 5, 5: 4}
CLASS10_STEP_DICT = {0: 6, 1: 5, 2: 8, 3: 5}
# 14: Common Core Math
CLASS14_STEP_DICT = {0: 6, 1: 5, 2: 7, 3: 5}

CLASS_DICT = {'00': CLASS00_STEP_DICT, '01': CLASS01_STEP_DICT, '02': CLASS02_STEP_DICT, '03': CLASS03_STEP_DICT,
              '04': CLASS04_STEP_DICT, '05': CLASS05_STEP_DICT, '06': CLASS06_STEP_DICT, '07': CLASS07_STEP_DICT,
              '08': CLASS08_STEP_DICT, '10': CLASS10_STEP_DICT, '14': CLASS14_STEP_DICT}

NO_SKULPT = False

FILE_PATH = ""


class ClassDir(tornado.web.RequestHandler):
    def get(self, dir):
        directory = dir + '.html'
        return self.render('directory/' + directory)


class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        # self.ping('one')
        print('new connection')

    def on_pong(self, data):
        print('got pong', data)

    def on_message(self, message):
        print('=====Code Being Run: Start=====')
        print(message)
        print('=====Code Being Run: End=====')

        # code = message

        tf = tempfile.NamedTemporaryFile(delete=False)
        tfName = tf.name
        tf.seek(0)
        # tf.write(code)
        tf.write(message.encode("utf-8"))
        tf.flush()
        # print('The temporary python file is ' + tfName)

        # print 'message received:\n%s' % message
        self.write_message(tfName)

    def on_close(self):
        print('connection closed')

    def check_origin(self, origin):
        return True


class ClassWeek(tornado.web.RequestHandler):
    def get(self, class_url, week_url, step_url):  #(self, class_url, week_url, step_url):
        class_number = class_url.replace('class', '')
        week_number = int(week_url.replace('week', ''))
        step_number = step_url.replace('step', '')
        # print(class_url, week_url, step_url, class_dict)
        max_steps = range(CLASS_DICT[class_number][week_number])
        path_to_step = 'classes/' + class_url + '/' + week_url + '/' + step_url + '/main.html'
        return self.render(path_to_step, current_class=class_url, current_week=week_url,
                               current_step=step_number, total_steps=max_steps, step_path=path_to_step,
                           static=self.static_url,
                           xstatic=self.application.settings['xstatic_url'],
                           ws_url_path="/websocket")

class ClassLesson(tornado.web.RequestHandler):
    def get(self, class_url, lesson_url, step_url):  #(self, class_url, week_url, step_url):
        class_number = class_url.replace('class', '')
        lesson_number = int(lesson_url.replace('lesson', ''))
        step_number = step_url.replace('step', '')
        # print(class_url, lesson_url, step_url)
        max_steps = range(CLASS_DICT[class_number][lesson_number])
        path_to_step = 'classes/' + class_url + '/' + lesson_url + '/' + step_url + '/main.html'
        return self.render(path_to_step, current_class=class_url, current_week=lesson_url,
                               current_step=step_number, total_steps=max_steps, step_path=path_to_step,
                           static=self.static_url,
                           xstatic=self.application.settings['xstatic_url'],
                           ws_url_path="/websocket")

class TerminalHandler(tornado.web.RequestHandler):
    def get(self):
        return self.render("index.html",
                           static=self.static_url,
                           xstatic=self.application.settings['xstatic_url'],
                           ws_url_path="/websocket"
                           )


class TestHandler(tornado.web.RequestHandler):
    def get(self):
        return self.render("pybly.html",
                           static=self.static_url,
                           xstatic=self.application.settings['xstatic_url'],
                           ws_url_path="/websocket"
                           )


def main(argv):

    term_manager = UniqueTermManager(shell_command=['bash'])

    handlers = [
                (r"/websocket", TermSocket,
                     {'term_manager': term_manager, 'keep_alive_time': 30}),  # AJL: added the keep_alive after noticed dropped ws in class after 55s Heroku limit.
                (r"/", TerminalHandler),
                (r"/xstatic/(.*)", tornado_xstatic.XStaticFileHandler,
                     {'allowed_modules': ['termjs']}),
                (r"/(dir[0-9][0-9])", ClassDir),
                (r"/(class[0-9][0-9])/(week[0-9][0-9])/([0-9][0-9])", ClassWeek),
                (r"/(class[0-9][0-9])/(lesson[0-9][0-9])/([0-9][0-9])", ClassLesson),
                # (r"/test", TestHandler),
                (r"/ws", WSHandler),
               ]

    app = tornado.web.Application(handlers,
                                  # static_path=os.path.join(os.path.dirname(terminado.__file__), "static/js"),
                                  static_path=os.path.join(os.path.dirname(__file__), "static"),
                                  # static_path=os.path.join(os.path.dirname(__file__), "static"),
                                  template_path=os.path.join(os.path.dirname(__file__), "templates"),
                                  ui_modules={'Terminal': uimodule.Terminal},
                                  xstatic_url=tornado_xstatic.url_maker('/xstatic/', True)
                                  )

    http_server = tornado.httpserver.HTTPServer(app)
    port = int(os.environ.get("PORT", 8765))
    http_server.listen(port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
    main([])