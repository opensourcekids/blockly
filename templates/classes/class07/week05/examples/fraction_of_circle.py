import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.fillcolor('red')

radius = 50
start_location_x = -200
start_location_y = 200

num = 19
denom = 7
times = 0
my_home = (start_location_x, 0)
if num % denom != 0:
    times = num/denom + 1
else:
    times = num / denom
a = 1
for i in range(times):
    if i == times - 1 and num % denom != 0:
        new_num = num % denom
    else:
        new_num = denom
    t.penup()
    t.setposition(my_home)
    t.pendown()
    t.setposition(my_home[0], -1 * radius)

    for j in range(denom):
        pos = t.position()
        t.setposition(my_home)
        if j < new_num:
            t.fill(True)

        else:
            t.fill(False)


        t.setposition(pos)

        t.circle(radius, 360.0 / denom / 2)
        t.write(a,align='center')
        t.circle(radius, 360.0 / denom / 2)
        pos = t.position()

        t.setposition(my_home)
        t.setposition(pos)

        a += 1

    t.fill(False)
    t.penup()
    my_home = (my_home[0] + 3 * radius, 0)

t.setposition(my_home[0] - radius, 0)
t.write((str(num) + '/' + str(denom) + ' = ' + str(num/denom) + ' and ' + str(num % denom) + '/' + str(denom)),
        font=("Arial", 14, "normal"))

turtle.mainloop()