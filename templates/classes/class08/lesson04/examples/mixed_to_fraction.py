def mixed(number_as_string):
    parts = number_as_string.split(' ')
    whole = int(parts[0])
    fract = parts[2]
    fract_parts = fract.split('/')
    numerator = int(fract_parts[0])
    denominator = int(fract_parts[1])

    return str(whole * denominator + numerator) + '/' + str(denominator)

mix = raw_input('Enter a mixed number in this # and #/# format: ')

# parts = mix.split(' ')
# print(parts)
#
# whole = int(parts[0])
# print(whole)
#
# fract = parts[2]
# print(fract)
#
# fract_parts = fract.split('/')
# print(fract_parts)
#
# numerator = int(fract_parts[0])
# print(numerator)
#
# denominator = int(fract_parts[1])
# print(denominator)
#
# print whole * denominator + numerator, '/', denominator

print(mixed(mix))
