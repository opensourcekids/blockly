from fractions2 import Fraction, gcd
from mixed import Mixed


mixed = '4 2/6' #raw_input("Enter mixed number: ")

split = mixed.split(' ')
whole = int(split[0])
frac = Fraction(split[1])

print Fraction(whole * frac.denominator + frac.numerator, frac.denominator)


# print gcd(10,15)

def irreg_mixed(frac):
    whole_num = str(frac.numerator / frac.denominator)
    remainder = str(frac.numerator % frac.denominator)

    print(whole_num + ' ' + remainder + '/' + str(frac.denominator))

irreg_mixed(Fraction(26, 6))
a = Fraction(26, 5)
# print(a)
# print(a.reduce_fraction())
# print(a)
# print(Mixed('33 1/3').as_fraction())
# print(Mixed('100/3'))
print(Mixed(Fraction(26,6)).reduced())
entered = raw_input('enter mixed, proper, or improper: ')

print(Mixed(entered))