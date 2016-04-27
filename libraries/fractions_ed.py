 # Originally contributed by Sjoerd Mullender.
# Significantly modified by Jeffrey Yasskin <jyasskin at gmail.com>.

"""Rational, infinite-precision, real numbers."""

# from __future__ import division
from decimal import Decimal
import math
import numbers
import operator
import re
import sys

__all__ = ['Fraction', 'gcd', 'lcd', 'gcf', 'sum', 'Mixed']

# Rational = numbers.Rational


def gcf(a, b):
    """Calculate the Greatest Common Divisor of a and b.

    Unless b==0, the result will have the same sign as b (so that when
    b is divided by it, the result comes out positive).
    """
    while b:
        a, b = b, a % b
    return a

def gcd(a, b):
    """Calculate the Greatest Common Divisor of a and b.

    Unless b==0, the result will have the same sign as b (so that when
    b is divided by it, the result comes out positive).
    """
    import warnings
    warnings.warn('fractions.gcd() is deprecated. Use math.gcd() instead.',
                  DeprecationWarning, 2)
    if type(a) is int is type(b):
        if (b or a) < 0:
            return -math.gcd(a, b)
        return math.gcd(a, b)
    return _gcd(a, b)

def _gcd(a, b):
    # Supports non-integers for backward compatibility.
    while b:
        a, b = b, a%b
    return a

def lcd(f1, f2):
    smaller = f1
    bigger = f2
    if f1.denominator > f2.denominator:
        smaller = f2
        bigger = f1
    multiples1 = []
    multiples2 = []
    for number in range(1, bigger.denominator + 1):
        multiples1.append((smaller.denominator * number))
        multiples2.append((bigger.denominator * number))
    lcd = 0
    for numb in multiples2:
        if numb in multiples1:
            lcd = numb
            break
    return lcd

def sum(a, b, use_lcd=False):
        """a + b"""
        da, db = a.denominator, b.denominator
        if da == db:
            return Fraction(a.numerator + b.numerator, da)
        elif use_lcd:
            the_lcd = lcd(a,b)
            return Fraction(a.numerator * the_lcd/a.denominator + b.numerator * the_lcd/b.denominator, the_lcd)
        else:
            return Fraction(a.numerator * db + b.numerator * da, da * db)


# Constants related to the hash implementation;  hash(x) is based
# on the reduction of x modulo the prime _PyHASH_MODULUS.
_PyHASH_MODULUS = sys.hash_info.modulus
# Value to be used for rationals that reduce to infinity modulo
# _PyHASH_MODULUS.
_PyHASH_INF = sys.hash_info.inf

_RATIONAL_FORMAT = re.compile(r"""
    \A\s*                      # optional whitespace at the start, then
    (?P<sign>[-+]?)            # an optional sign, then
    (?=\d|\.\d)                # lookahead for digit or .digit
    (?P<num>\d*)               # numerator (possibly empty)
    (?:                        # followed by
       (?:/(?P<denom>\d+))?    # an optional denominator
    |                          # or
       (?:\.(?P<decimal>\d*))? # an optional fractional part
       (?:E(?P<exp>[-+]?\d+))? # and optional exponent
    )
    \s*\Z                      # and optional whitespace to finish
""", re.VERBOSE | re.IGNORECASE)


class Fraction(numbers.Rational):
    """This class implements rational numbers.

    In the two-argument form of the constructor, Fraction(8, 6) will
    produce a rational number equivalent to 4/3. Both arguments must
    be Rational. The numerator defaults to 0 and the denominator
    defaults to 1 so that Fraction(3) == 3 and Fraction() == 0.

    Fractions can also be constructed from:

      - numeric strings similar to those accepted by the
        float constructor (for example, '-2.3' or '1e10')

      - strings of the form '123/456'

      - float and Decimal instances

      - other Rational instances (including integers)

    """

    __slots__ = ('_numerator', '_denominator')

    # We're immutable, so use __new__ not __init__
    def __new__(cls, numerator=0, denominator=None, _normalize=False):
        """Constructs a Rational.

        Takes a string like '3/2' or '1.5', another Rational instance, a
        numerator/denominator pair, or a float.

        Examples
        --------

        >>> Fraction(10, -8)
        Fraction(-5, 4)
        >>> Fraction(Fraction(1, 7), 5)
        Fraction(1, 35)
        >>> Fraction(Fraction(1, 7), Fraction(2, 3))
        Fraction(3, 14)
        >>> Fraction('314')
        Fraction(314, 1)
        >>> Fraction('-35/4')
        Fraction(-35, 4)
        >>> Fraction('3.1415') # conversion from numeric string
        Fraction(6283, 2000)
        >>> Fraction('-47e-2') # string may include a decimal exponent
        Fraction(-47, 100)
        >>> Fraction(1.47)  # direct construction from float (exact conversion)
        Fraction(6620291452234629, 4503599627370496)
        >>> Fraction(2.25)
        Fraction(9, 4)
        >>> Fraction(Decimal('1.47'))
        Fraction(147, 100)

        """
        self = super(Fraction, cls).__new__(cls)

        if denominator is None:
            if type(numerator) is int:
                self._numerator = numerator
                self._denominator = 1
                return self

            elif isinstance(numerator, numbers.Rational):
                self._numerator = numerator.numerator
                self._denominator = numerator.denominator
                return self

            elif isinstance(numerator, float):
                # Exact conversion from float
                value = Fraction.from_float(numerator)
                self._numerator = value._numerator
                self._denominator = value._denominator
                return self

            elif isinstance(numerator, Decimal):
                value = Fraction.from_decimal(numerator)
                self._numerator = value._numerator
                self._denominator = value._denominator
                return self

            elif isinstance(numerator, str):
                # Handle construction from strings.
                m = _RATIONAL_FORMAT.match(numerator)
                if m is None:
                    raise ValueError('Invalid literal for Fraction: %r' %
                                     numerator)
                numerator = int(m.group('num') or '0')
                denom = m.group('denom')
                if denom:
                    denominator = int(denom)
                else:
                    denominator = 1
                    decimal = m.group('decimal')
                    if decimal:
                        scale = 10**len(decimal)
                        numerator = numerator * scale + int(decimal)
                        denominator *= scale
                    exp = m.group('exp')
                    if exp:
                        exp = int(exp)
                        if exp >= 0:
                            numerator *= 10**exp
                        else:
                            denominator *= 10**-exp
                if m.group('sign') == '-':
                    numerator = -numerator

            else:
                raise TypeError("argument should be a string "
                                "or a Rational instance")

        elif type(numerator) is int is type(denominator):
            pass # *very* normal case

        elif (isinstance(numerator, numbers.Rational) and
            isinstance(denominator, numbers.Rational)):
            numerator, denominator = (
                numerator.numerator * denominator.denominator,
                denominator.numerator * numerator.denominator
                )
        else:
            raise TypeError("both arguments should be "
                            "Rational instances")

        if denominator == 0:
            raise ZeroDivisionError('Fraction(%s, 0)' % numerator)
        if _normalize:
            if type(numerator) is int is type(denominator):
                # *very* normal case
                g = math.gcd(numerator, denominator)
                if denominator < 0:
                    g = -g
            else:
                g = _gcd(numerator, denominator)
            numerator //= g
            denominator //= g
        self._numerator = numerator
        self._denominator = denominator
        return self


    # def reduce(self):
    #     g = math.gcd(self.numerator, self.denominator)
    #     self._numerator = self._numerator // g
    #     self._denominator = self._denominator // g
    #
    #     return self
    #
    # @classmethod
    # def reduce_dict(self):
    #     g = math.gcd(self.numerator, self.denominator)
    #     original = Fraction(self)
    #     self._numerator = self._numerator // g
    #     self._denominator = self._denominator // g
    #
    #     return {'reduced': self, 'GCD': g, 'string': str(original) + ' = ' + str(self), 'original': original,}
    #
    # @classmethod
    # def reduce_details(self):
    #     g = math.gcd(self.numerator, self.denominator)
    #     original = Fraction(self)
    #     self._numerator = self._numerator // g
    #     self._denominator = self._denominator // g
    #
    #     return (original, self, g, str(original) + ' = ' + str(self))

    @classmethod
    def from_float(cls, f):
        """Converts a finite float to a rational number, exactly.

        Beware that Fraction.from_float(0.3) != Fraction(3, 10).

        """
        if isinstance(f, numbers.Integral):
            return cls(f)
        elif not isinstance(f, float):
            raise TypeError("%s.from_float() only takes floats, not %r (%s)" %
                            (cls.__name__, f, type(f).__name__))
        if math.isnan(f):
            raise ValueError("Cannot convert %r to %s." % (f, cls.__name__))
        if math.isinf(f):
            raise OverflowError("Cannot convert %r to %s." % (f, cls.__name__))
        return cls(*f.as_integer_ratio())

    @classmethod
    def from_decimal(cls, dec):
        """Converts a finite Decimal instance to a rational number, exactly."""
        from decimal import Decimal
        if isinstance(dec, numbers.Integral):
            dec = Decimal(int(dec))
        elif not isinstance(dec, Decimal):
            raise TypeError(
                "%s.from_decimal() only takes Decimals, not %r (%s)" %
                (cls.__name__, dec, type(dec).__name__))
        if dec.is_infinite():
            raise OverflowError(
                "Cannot convert %s to %s." % (dec, cls.__name__))
        if dec.is_nan():
            raise ValueError("Cannot convert %s to %s." % (dec, cls.__name__))
        sign, digits, exp = dec.as_tuple()
        digits = int(''.join(map(str, digits)))
        if sign:
            digits = -digits
        if exp >= 0:
            return cls(digits * 10 ** exp)
        else:
            return cls(digits, 10 ** -exp)

    def limit_denominator(self, max_denominator=1000000):
        """Closest Fraction to self with denominator at most max_denominator.

        >>> Fraction('3.141592653589793').limit_denominator(10)
        Fraction(22, 7)
        >>> Fraction('3.141592653589793').limit_denominator(100)
        Fraction(311, 99)
        >>> Fraction(4321, 8765).limit_denominator(10000)
        Fraction(4321, 8765)

        """
        # Algorithm notes: For any real number x, define a *best upper
        # approximation* to x to be a rational number p/q such that:
        #
        #   (1) p/q >= x, and
        #   (2) if p/q > r/s >= x then s > q, for any rational r/s.
        #
        # Define *best lower approximation* similarly.  Then it can be
        # proved that a rational number is a best upper or lower
        # approximation to x if, and only if, it is a convergent or
        # semiconvergent of the (unique shortest) continued fraction
        # associated to x.
        #
        # To find a best rational approximation with denominator <= M,
        # we find the best upper and lower approximations with
        # denominator <= M and take whichever of these is closer to x.
        # In the event of a tie, the bound with smaller denominator is
        # chosen.  If both denominators are equal (which can happen
        # only when max_denominator == 1 and self is midway between
        # two integers) the lower bound---i.e., the floor of self, is
        # taken.

        if max_denominator < 1:
            raise ValueError("max_denominator should be at least 1")
        if self._denominator <= max_denominator:
            return Fraction(self)

        p0, q0, p1, q1 = 0, 1, 1, 0
        n, d = self._numerator, self._denominator
        while True:
            a = n//d
            q2 = q0+a*q1
            if q2 > max_denominator:
                break
            p0, q0, p1, q1 = p1, q1, p0+a*p1, q2
            n, d = d, n-a*d

        k = (max_denominator-q0)//q1
        bound1 = Fraction(p0+k*p1, q0+k*q1)
        bound2 = Fraction(p1, q1)
        if abs(bound2 - self) <= abs(bound1-self):
            return bound2
        else:
            return bound1

    @property
    def numerator(a):
        return a._numerator

    @property
    def denominator(a):
        return a._denominator

    @property
    def reduced(a):
        return Fraction(a._numerator, a._denominator, True)

    @property
    def is_improper(a):
        if a._numerator > a._denominator:
            return True
        else:
            return False

    @property
    def as_mixed(a):
        # if a.is_improper:
        #     whole = str(a.numerator // a.denominator)
        #     remainder = str(a.numerator % a.denominator)
        #     return whole + ' ' + remainder + '/' + str(a.denominator)
        # else:
        #     return '0 ' + str(a.numerator) + '/' + str(a.denominator)
        return Mixed(a)



    def __repr__(self):
        """repr(self)"""
        return '%s(%s, %s)' % (self.__class__.__name__,self._numerator, self._denominator)

    def __str__(self):
        """str(self)"""
        if self._denominator == 1:
            return str(self._numerator)
        else:
            return '{}/{}'.format(str(self._numerator), str(self._denominator))

    def _operator_fallbacks(monomorphic_operator, fallback_operator):
        """Generates forward and reverse operators given a purely-rational
        operator and a function from the operator module.

        Use this like:
        __op__, __rop__ = _operator_fallbacks(just_rational_op, operator.op)

        In general, we want to implement the arithmetic operations so
        that mixed-mode operations either call an implementation whose
        author knew about the types of both arguments, or convert both
        to the nearest built in type and do the operation there. In
        Fraction, that means that we define __add__ and __radd__ as:

            def __add__(self, other):
                # Both types have numerators/denominator attributes,
                # so do the operation directly
                if isinstance(other, (int, Fraction)):
                    return Fraction(self.numerator * other.denominator +
                                    other.numerator * self.denominator,
                                    self.denominator * other.denominator)
                # float and complex don't have those operations, but we
                # know about those types, so special case them.
                elif isinstance(other, float):
                    return float(self) + other
                elif isinstance(other, complex):
                    return complex(self) + other
                # Let the other type take over.
                return NotImplemented

            def __radd__(self, other):
                # radd handles more types than add because there's
                # nothing left to fall back to.
                if isinstance(other, numbers.Rational):
                    return Fraction(self.numerator * other.denominator +
                                    other.numerator * self.denominator,
                                    self.denominator * other.denominator)
                elif isinstance(other, Real):
                    return float(other) + float(self)
                elif isinstance(other, Complex):
                    return complex(other) + complex(self)
                return NotImplemented


        There are 5 different cases for a mixed-type addition on
        Fraction. I'll refer to all of the above code that doesn't
        refer to Fraction, float, or complex as "boilerplate". 'r'
        will be an instance of Fraction, which is a subtype of
        Rational (r : Fraction <: Rational), and b : B <:
        Complex. The first three involve 'r + b':

            1. If B <: Fraction, int, float, or complex, we handle
               that specially, and all is well.
            2. If Fraction falls back to the boilerplate code, and it
               were to return a value from __add__, we'd miss the
               possibility that B defines a more intelligent __radd__,
               so the boilerplate should return NotImplemented from
               __add__. In particular, we don't handle Rational
               here, even though we could get an exact answer, in case
               the other type wants to do something special.
            3. If B <: Fraction, Python tries B.__radd__ before
               Fraction.__add__. This is ok, because it was
               implemented with knowledge of Fraction, so it can
               handle those instances before delegating to Real or
               Complex.

        The next two situations describe 'b + r'. We assume that b
        didn't know about Fraction in its implementation, and that it
        uses similar boilerplate code:

            4. If B <: Rational, then __radd_ converts both to the
               builtin rational type (hey look, that's us) and
               proceeds.
            5. Otherwise, __radd__ tries to find the nearest common
               base ABC, and fall back to its builtin type. Since this
               class doesn't subclass a concrete type, there's no
               implementation to fall back to, so we need to try as
               hard as possible to return an actual value, or the user
               will get a TypeError.

        """
        def forward(a, b):
            if isinstance(b, (int, Fraction)):
                return monomorphic_operator(a, b)
            elif isinstance(b, float):
                return fallback_operator(float(a), b)
            elif isinstance(b, complex):
                return fallback_operator(complex(a), b)
            else:
                return NotImplemented
        forward.__name__ = '__' + fallback_operator.__name__ + '__'
        forward.__doc__ = monomorphic_operator.__doc__

        def reverse(b, a):
            if isinstance(a, numbers.Rational):
                # Includes ints.
                return monomorphic_operator(a, b)
            elif isinstance(a, numbers.Real):
                return fallback_operator(float(a), float(b))
            elif isinstance(a, numbers.Complex):
                return fallback_operator(complex(a), complex(b))
            else:
                return NotImplemented
        reverse.__name__ = '__r' + fallback_operator.__name__ + '__'
        reverse.__doc__ = monomorphic_operator.__doc__

        return forward, reverse

    def _add(a, b):
        """a + b"""
        the_lcd = lcd(a,b)
        da, db = a.denominator, b.denominator
        if da == db:
            return Fraction(a.numerator + b.numerator, da)
        elif the_lcd != (da * db):
            return Fraction(a.numerator * the_lcd//a.denominator + b.numerator * the_lcd//b.denominator, the_lcd)
        else:
            return Fraction(a.numerator * db + b.numerator * da, da * db)

    __add__, __radd__ = _operator_fallbacks(_add, operator.add)

    def _sub(a, b):
        """a - b"""
        da, db = a.denominator, b.denominator
        return Fraction(a.numerator * db - b.numerator * da,
                        da * db)

    __sub__, __rsub__ = _operator_fallbacks(_sub, operator.sub)

    def _mul(a, b):
        """a * b"""
        return Fraction(a.numerator * b.numerator, a.denominator * b.denominator)

    __mul__, __rmul__ = _operator_fallbacks(_mul, operator.mul)

    def _div(a, b):
        """a / b"""
        return Fraction(a.numerator * b.denominator,
                        a.denominator * b.numerator)

    __truediv__, __rtruediv__ = _operator_fallbacks(_div, operator.truediv)

    def __floordiv__(a, b):
        """a // b"""
        return math.floor(a / b)

    def __rfloordiv__(b, a):
        """a // b"""
        return math.floor(a / b)

    def __mod__(a, b):
        """a % b"""
        div = a // b
        return a - b * div

    def __rmod__(b, a):
        """a % b"""
        div = a // b
        return a - b * div

    def __pow__(a, b):
        """a ** b

        If b is not an integer, the result will be a float or complex
        since roots are generally irrational. If b is an integer, the
        result will be rational.

        """
        if isinstance(b, numbers.Rational):
            if b.denominator == 1:
                power = b.numerator
                if power >= 0:
                    return Fraction(a._numerator ** power,
                                    a._denominator ** power,
                                    _normalize=False)
                else:
                    return Fraction(a._denominator ** -power,
                                    a._numerator ** -power,
                                    _normalize=False)
            else:
                # A fractional power will generally produce an
                # irrational number.
                return float(a) ** float(b)
        else:
            return float(a) ** b

    def __rpow__(b, a):
        """a ** b"""
        if b._denominator == 1 and b._numerator >= 0:
            # If a is an int, keep it that way if possible.
            return a ** b._numerator

        if isinstance(a, numbers.Rational):
            return Fraction(a.numerator, a.denominator) ** b

        if b._denominator == 1:
            return a ** b._numerator

        return a ** float(b)

    def __pos__(a):
        """+a: Coerces a subclass instance to Fraction"""
        return Fraction(a._numerator, a._denominator, _normalize=False)

    def __neg__(a):
        """-a"""
        return Fraction(-a._numerator, a._denominator, _normalize=False)

    def __abs__(a):
        """abs(a)"""
        return Fraction(abs(a._numerator), a._denominator, _normalize=False)

    def __trunc__(a):
        """trunc(a)"""
        if a._numerator < 0:
            return -(-a._numerator // a._denominator)
        else:
            return a._numerator // a._denominator

    def __floor__(a):
        """Will be math.floor(a) in 3.0."""
        return a.numerator // a.denominator

    def __ceil__(a):
        """Will be math.ceil(a) in 3.0."""
        # The negations cleverly convince floordiv to return the ceiling.
        return -(-a.numerator // a.denominator)

    def __round__(self, ndigits=None):
        """Will be round(self, ndigits) in 3.0.

        Rounds half toward even.
        """
        if ndigits is None:
            floor, remainder = divmod(self.numerator, self.denominator)
            if remainder * 2 < self.denominator:
                return floor
            elif remainder * 2 > self.denominator:
                return floor + 1
            # Deal with the half case:
            elif floor % 2 == 0:
                return floor
            else:
                return floor + 1
        shift = 10**abs(ndigits)
        # See _operator_fallbacks.forward to check that the results of
        # these operations will always be Fraction and therefore have
        # round().
        if ndigits > 0:
            return Fraction(round(self * shift), shift)
        else:
            return Fraction(round(self / shift) * shift)

    def __hash__(self):
        """hash(self)"""

        # XXX since this method is expensive, consider caching the result

        # In order to make sure that the hash of a Fraction agrees
        # with the hash of a numerically equal integer, float or
        # Decimal instance, we follow the rules for numeric hashes
        # outlined in the documentation.  (See library docs, 'Built-in
        # Types').

        # dinv is the inverse of self._denominator modulo the prime
        # _PyHASH_MODULUS, or 0 if self._denominator is divisible by
        # _PyHASH_MODULUS.
        dinv = pow(self._denominator, _PyHASH_MODULUS - 2, _PyHASH_MODULUS)
        if not dinv:
            hash_ = _PyHASH_INF
        else:
            hash_ = abs(self._numerator) * dinv % _PyHASH_MODULUS
        result = hash_ if self >= 0 else -hash_
        return -2 if result == -1 else result

    def __eq__(a, b):
        """a == b"""
        if type(b) is int:
            return a._numerator == b and a._denominator == 1
        if isinstance(b, numbers.Rational):
            return (a._numerator == b.numerator and
                    a._denominator == b.denominator)
        if isinstance(b, numbers.Complex) and b.imag == 0:
            b = b.real
        if isinstance(b, float):
            if math.isnan(b) or math.isinf(b):
                # comparisons with an infinity or nan should behave in
                # the same way for any finite a, so treat a as zero.
                return 0.0 == b
            else:
                return a == a.from_float(b)
        else:
            # Since a doesn't know how to compare with b, let's give b
            # a chance to compare itself with a.
            return NotImplemented

    def _richcmp(self, other, op):
        """Helper for comparison operators, for internal use only.

        Implement comparison between a Rational instance `self`, and
        either another Rational instance or a float `other`.  If
        `other` is not a Rational instance or a float, return
        NotImplemented. `op` should be one of the six standard
        comparison operators.

        """
        # convert other to a Rational instance where reasonable.
        if isinstance(other, numbers.Rational):
            return op(self._numerator * other.denominator,
                      self._denominator * other.numerator)
        if isinstance(other, float):
            if math.isnan(other) or math.isinf(other):
                return op(0.0, other)
            else:
                return op(self, self.from_float(other))
        else:
            return NotImplemented

    def __lt__(a, b):
        """a < b"""
        return a._richcmp(b, operator.lt)

    def __gt__(a, b):
        """a > b"""
        return a._richcmp(b, operator.gt)

    def __le__(a, b):
        """a <= b"""
        return a._richcmp(b, operator.le)

    def __ge__(a, b):
        """a >= b"""
        return a._richcmp(b, operator.ge)

    def __bool__(a):
        """a != 0"""
        return a._numerator != 0

    # support for pickling, copy, and deepcopy

    # def __reduce__(self):
    #     return (self.__class__, (str(self),))

    def __copy__(self):
        if type(self) == Fraction:
            return self     # I'm immutable; therefore I am my own clone
        return self.__class__(self._numerator, self._denominator)

    def __deepcopy__(self, memo):
        if type(self) == Fraction:
            return self     # My components are also immutable
        return self.__class__(self._numerator, self._denominator)



"""Handles arithmetic for mixed numbers and fractions.

>>> m = Mixed('33 1/3')
>>> print m * 2
66 2/3

Catherine Devlin   http://catherinedevlin.blogspot.com   Feb 28, 2008
"""

# Thanks to Yannick Gingras for Python 2.4 backport

import re, doctest


# def gcd(*args):
#     """Greatest Common Divisor between two integers.
#
#     >>> gcd(6, 8)
#     2
#     >>> gcd(7,3)
#     1
#     >>> gcd(250, 400)
#     50
#     >>> gcd(1,4)
#     1
#     >>> gcd(-32,64)
#     32
#     """
#     arg = abs(args[0])
#     result = set(n for n in range(1, arg+1) if not (arg % n))
#     for arg in args[1:]:
#         arg = abs(arg)
#         result &= set(n for n in range(1, arg+1) if not (arg % n))
#     return max(result or (1,))

class Mixed(int):
    """Handles mixed numbers and fractions.
    """
    float_precision = 3
    knownFractions = {}
    for d in range(8,1,-1):
        for n in range(d-1,0,-1):
            knownFractions[int(round(float(n) / float(d) * (10**float_precision)))] = (n, d)
    reader = re.compile(r'(\-)?(\s*(\d+)[\s\-]+)?(\d+)\s*/\s*(\d+)')

    @classmethod
    def _new_from_fraction_(cls, i):
        """Input in form: (whole number, numerator, denominator)"""
        inst = super(Mixed, cls).__new__(cls, i or 0)
        inst.whole = i.numerator // i.denominator
        inst.num = i.numerator % i.denominator
        inst.denom = i.denominator
        return Mixed((inst.whole, inst.num, inst.denom))
    @classmethod
    def _new_from_tuple_(cls, i):
        """Input in form: (whole number, numerator, denominator)"""
        inst = super(Mixed, cls).__new__(cls, i[0] or 0)
        inst.num = i[1]
        inst.denom = i[2]
        return inst
    @classmethod
    def _new_from_str_(cls, i):
        result = Mixed.reader.search(i)
        if not result:
            raise TypeError
        (sign, discard, whole, num, denom) = result.groups()
        if sign:
            whole = whole and sign + whole
            num = num and sign + num
        inst = super(Mixed, cls).__new__(cls, whole or 0)
        inst.num = int(num)
        inst.denom = int(denom)
        return inst
    @classmethod
    def _new_from_float_(cls, i):
        """
        >>> print Mixed(-2.5)
        -2 1/2
        >>> print Mixed(.66666667)
        2/3
        >>> print Mixed('3.13')
        3 13/100
        >>> print Mixed(4./3.)
        1 1/3
        """
        num = int(round(i - int(i), cls.float_precision) * (10**cls.float_precision))
        sign = (i < 0 and -1 or 1)
        known = cls.knownFractions.get(abs(num))
        if known:
            num = known[0] * sign
            denom = known[1]
        else:
            denom = 10**Mixed.float_precision
        return cls._new_from_tuple_((int(i), num, denom)).reduced

    def __new__(cls, i):
        """
        >>> print Mixed('8-1/2')
        8 1/2
        >>> print Mixed('-5/8')
        -5/8
        >>> print Mixed('4')
        4
        """
        if isinstance(i, float):
            return cls._new_from_float_(i)
        if isinstance(i, Fraction):
            return cls._new_from_fraction_(i)
        if ((len(i) == 3) and (isinstance(i, tuple) or isinstance(i, list))):
            return cls._new_from_tuple_(i)
        try:
            return cls._new_from_str_(i)
        except:
            try:
                return cls._new_from_fraction_(i)
            except:
                try:
                    return int(i)
                except ValueError:
                    if isinstance(i, str):
                        try:
                            i = float(i)
                            return cls._new_from_float_(i)
                        except:
                            pass
        raise TypeError('Could not interpret as mixed number')
    def __str__(self):
        if int(self):
            return "%d %d/%d" % (int(self), abs(self.num), self.denom)
        else:
            return "%d/%d" % (self.num, self.denom)
    def __repr__(self):
        return "Mixed('%s')" % (self.__str__())
    def __bool__(self):
        """
        >>> bool(Mixed('-1/7'))
        True
        """
        return bool(int(self) or self.num)
    def __float__(self):
        return super(Mixed, self).__float__() + float(self.num) / float(self.denom)
    def _num_improper(self):
        return int(self) * self.denom + self.num
    def improper(self):
        return Mixed((0, self._num_improper(), self.denom))
    @ property
    def as_fraction(self):
        return Fraction(self._num_improper(), self.denom, False)
    @property
    def whole_part(self):
        return int(self)
    @property
    def fraction_part(self):
        return Fraction(self.num, self.denom, False)


    def __add__(self, other):
        """
        >>> print Mixed('-1-1/2') + 2
        1/2
        >>> print Mixed('-3-7/8') + Mixed('3/8')
        -3 1/2
        >>> print Mixed('3/4') + Mixed('1/2')
        1 1/4
        >>> print Mixed('1-1/2') + Mixed('2/3')
        2 1/6
        """
        if isinstance(other, Mixed):
            denom = self.denom * other.denom
            num = (self._num_improper() * other.denom) + (other.num * self.denom)
            return Mixed((0, num, denom)).reduced
        elif isinstance(other, int):
            return Mixed((0, self._num_improper() + other * self.denom, self.denom)).reduced
        elif isinstance(other, float):
            return other + float(self)
        return super(Mixed, self).__add__(other)
    def __radd__(self, other):
        """
        >>> print 2 + Mixed('1 1/2')
        3 1/2
        """
        return self + other
    def __mul__(self, other):
        """
        >>> print Mixed('-1-1/4') * 2
        -2 1/2
        >>> print Mixed('-3 1/3') * 3 - 2
        -12
        >>> print Mixed('1/3') * Mixed('2 1/2')
        5/6

        """
        if isinstance(other, Mixed):
            return Mixed((0, self._num_improper() * other._num_improper(), self.denom * other.denom)).reduced
        elif isinstance(other, int):
            return Mixed((int(self) * other, self.num * other, self.denom)).reduced
        elif isinstance(other, float):
            return float(self) * other
    def __rmul__(self, other):
        """
        >>> print 2 * Mixed('-1-1/4')
        -2 1/2
        """
        return self * other
    def __sub__(self, other):
        """
        >>> print Mixed('2 1/2') - Mixed('2/3')
        1 5/6

        """
        return self + (other * -1)
    def __rsub__(self, other):
        """
        >>> print 2 - Mixed('1 1/2')
        1/2
        """
        return (-1 * self) + other
    def __div__(self, other):
        """
        >>> print Mixed('-5/8') / 2
        -5/16
        """
        if isinstance(other, Mixed):
            return Mixed((0, self._num_improper() * other.denom, self.denom * other._num_improper())).reduced
        elif isinstance(other, int):
            return Mixed((0, self._num_improper(), self.denom * other)).reduced
        elif isinstance(other, float):
            return float(self) / other
    def __rdiv__(self, other):
        """
        >>> print 4 / Mixed('1/2')
        8
        >>> print -3 / Mixed('2/5')
        -7 1/2
        """
        if isinstance(other, Mixed):
            return Mixed((0, other._num_improper() * self.denom, other.denom * self._num_improper())).reduced
        elif isinstance(other, int):
            return Mixed((0, other * self.denom, self._num_improper())).reduced
        elif isinstance(other, float):
            return float(self) / other
        return other.__div__(self)
    def __pow__(self, pow):
        """
        >>> Mixed('1/2') ** 3
        Mixed('1/8')
        """
        return Mixed((0, self._num_improper() ** pow, self.denom ** pow)).reduced
    def __rpow__(self, other):
        """
        >>> 16 ** Mixed('1/2')
        4.0
        """
        return other ** float(self)
    # def __cmp__(self, other):
    #     """
    #     >>> Mixed('1 1/2') > Mixed('4/3')
    #     True
    #     >>> Mixed('1 1/2') > Mixed('5/3')
    #     False
    #     >>> Mixed ('-2 2/5') < -2
    #     True
    #     >>> Mixed('2/4') == Mixed('1/2')
    #     True
    #     """
    #     if isinstance(other, Mixed):
    #         return cmp(self._num_improper() * other.denom, other._num_improper() * self.denom)
    #     elif isinstance(other, int):
    #         return cmp(self.reduced(), Mixed((other, 0, self.denom)))
    #     elif isinstance(other, float):
    #         return cmp(float(self), other)
    def _num_too_large(self):
        sgn = (self.num < 0) and -1 or 1
        extrawholes = ((self.num * sgn) // self.denom) * sgn
        if not extrawholes:
            return self
        result = Mixed((int(self) + extrawholes, self.num - extrawholes*self.denom, self.denom))
        return result
    def _reduce_denom(self):
        divisor = math.gcd(self.num, self.denom)
        if divisor > 1:
            self.num /= divisor
            self.denom /= divisor
        return self
    @ property
    def reduced(self):
        """
        >>> print Mixed('14/8').reduced()
        1 3/4
        """
        result = self._num_too_large()._reduce_denom()
        if not result.num:
            return int(result)
        return result
    def _mult_frac(self, multfrac):
        return Mixed((int(self), self.num * multfrac, self.denom * multfrac))
    def _in_common_denom(self, other):
        return (self._mult_frac(other.denom), other._mult_frac(self.denom))



if __name__ == '__main__':
    # doctest.testmod()
    # print(Mixed('2/5').reduced())
    # print(type(Mixed(Fraction(2,3))))
    # print(Mixed((3,4,5)))
    # print(m)
    # print(type(Fraction(5,3)))
    f1 = Fraction(1, 3)
    f2 = Fraction(5, 2)
    m = f2.as_mixed
    f3 = m.as_fraction
    m2 = Mixed('2 1/2')
    print(m2 + f1)
    print(2 + Mixed('1 1/2').reduced)