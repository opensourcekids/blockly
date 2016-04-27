import turtle

turtle.setup(400, 500)  # Determine the window size

turtle.getscreen()._root.attributes('-topmost', 1)
wn = turtle.Screen()  # Get a reference to the window


t = turtle.Pen()
t.speed(0)
turtle.onscreenclick(t.setpos)

# Now we need to tell the window to start listening for events,
# If any of the keys that we're monitoring is pressed, its
# handler will be called.
# wn.listen()
turtle.done()
