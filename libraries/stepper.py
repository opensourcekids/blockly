import time
from gpiozero import OutputDevice as stepper



class Stepper (object):

    def __init__(self):
        self.motor = [stepper(23), stepper(25), stepper(22), stepper(24)]

    def forward (self, delay, steps):
        for i in range(steps):
            self.setStep(1, 0, 1, 0)
            time.sleep(delay/1000.0)
            self.setStep(0, 1, 1, 0)
            time.sleep(delay/1000.0)
            self.setStep(0, 1, 0, 1)
            time.sleep(delay/1000.0)
            self.setStep(1, 0, 0, 1)
            time.sleep(delay/1000.0)

    def backward (self, delay, steps):
        for i in range(steps):
            self.setStep(1, 0, 0, 1)
            time.sleep(delay/1000.0)
            self.setStep(0, 1, 0, 1)
            time.sleep(delay/1000.0)
            self.setStep(0, 1, 1, 0)
            time.sleep(delay/1000.0)
            self.setStep(1, 0, 1, 0)
            time.sleep(delay/1000.0)

    def setStep (self, w1, w2, w3, w4):
        w = [w1, w2, w3, w4]
        for i in range(4):
            if w[i] != 0:
                self.motor[i].on()
            else:
                self.motor[i].off()

# if __name__ == '__main__':
#     s = Stepper()
#     b = Button(11, pull_up=False)
#     #delay = input("Delay in milliseconds?  ")
#     #steps_f = input("How many steps forward?  ")
#     #steps_b = input("How many steps backward?  ")
#     #s.forward(int(delay) / 1000.0, int(steps_f))
#     #s.backward(int(delay) / 1000.0, int(steps_b))
#     while True:
#         if b.is_pressed == True:
# 	        s.forward(20 / 1000.0, 1)
#         #else:
#             #s.backward(20 / 1000.0, 1)
#     #b.when_pressed = s.backward(20 / 1000.0, 10)
#     #pause()
