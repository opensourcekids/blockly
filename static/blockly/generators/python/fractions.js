/**
 * Created by anthony on 8/8/15.
 */

/**
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.fractions');

goog.require('Blockly.Python');

Blockly.Python['fractions_import'] = function (block) {

    Blockly.Python.definitions_['import_fraction'] = '# A library for manipulating fractions.\nfrom fractions import Fraction, gcd\n';
    return "";
};

Blockly.Python['fractions_import2'] = function (block) {

    Blockly.Python.definitions_['import_fraction2'] = '# A library for manipulating fractions.\nfrom fractions_ed import Fraction, gcf, lcd\n';
    return "";
};

Blockly.Python['fractions_import_mixed'] = function (block) {

    Blockly.Python.definitions_['import_fraction_mixed'] = '# A library for manipulating fractions.\nfrom fractions_ed import Mixed\n';
    return "";
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Python['fractions_Fraction'] = function(block) {

    var numerator = Blockly.Python.valueToCode(block, 'NUMERATOR', Blockly.Python.ORDER_ATOMIC);
    var denominator = Blockly.Python.valueToCode(block, 'DENOMINATOR', Blockly.Python.ORDER_ATOMIC);

    return ['Fraction(' + numerator + ', ' + denominator + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_Fraction_as_string'] = function(block) {

    var fraction = Blockly.Python.valueToCode(block, 'FRACTION', Blockly.Python.ORDER_ATOMIC);

    return ['Fraction(' + fraction + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_num_denom'] = function (block) {
    var fraction_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return [fraction_name + '.' + block.getFieldValue('WHAT'), Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['fractions_gcd'] = function (block) {

    var first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC);
    var second = Blockly.Python.valueToCode(block, 'SECOND', Blockly.Python.ORDER_ATOMIC);

    return ['gcf(' + first + ', ' + second + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_lcd'] = function (block) {

    var first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC);
    var second = Blockly.Python.valueToCode(block, 'SECOND', Blockly.Python.ORDER_ATOMIC);

    return ['lcd(' + first + ', ' + second + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_reduce'] = function (block) {

    var fract = Blockly.Python.valueToCode(block, 'FRACTION', Blockly.Python.ORDER_ATOMIC);

    return [fract + '.reduced', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_reduce_details'] = function (block) {

    var fract = Blockly.Python.valueToCode(block, 'FRACTION', Blockly.Python.ORDER_ATOMIC);

    return [fract + '.reduce_details()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_is_improper'] = function (block) {

    var fract = Blockly.Python.valueToCode(block, 'FRACTION', Blockly.Python.ORDER_ATOMIC);

    return [fract + '.is_improper', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_as_mixed'] = function (block) {

    var fract = Blockly.Python.valueToCode(block, 'FRACTION', Blockly.Python.ORDER_ATOMIC);

    return [fract + '.as_mixed', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_Mixed'] = function(block) {

    var value = Blockly.Python.valueToCode(block, 'MIX', Blockly.Python.ORDER_ATOMIC);

    return ['Mixed(' + value + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_mixed_as_improper'] = function (block) {

    var value = Blockly.Python.valueToCode(block, 'MIX', Blockly.Python.ORDER_ATOMIC);

    return [value + '.as_fraction', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_mixed_whole_part'] = function (block) {

    var value = Blockly.Python.valueToCode(block, 'MIX', Blockly.Python.ORDER_ATOMIC);

    return [value + '.whole_part', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['fractions_mixed_fraction_part'] = function (block) {

    var value = Blockly.Python.valueToCode(block, 'MIX', Blockly.Python.ORDER_ATOMIC);

    return [value + '.fraction_part', Blockly.Python.ORDER_ATOMIC];
};