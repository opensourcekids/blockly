/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.numbers');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords('math,random');

/**
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_int'] = function (block) {
    // Numeric value.
    var code = block.getFieldValue('NUM');
    var order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
        Blockly.Python.ORDER_ATOMIC;
    return [code, order];
};

/**
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_float'] = function (block) {
    // Numeric value.
    var code = block.getFieldValue('NUM');
    var order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
        Blockly.Python.ORDER_ATOMIC;
    return [code, order];
};

/**
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_arithmetic'] = function (block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': [' + ', Blockly.Python.ORDER_ADDITIVE],
        'MINUS': [' - ', Blockly.Python.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', Blockly.Python.ORDER_MULTIPLICATIVE],
        'DIVIDE_FLOOR': [' // ', Blockly.Python.ORDER_MULTIPLICATIVE],
        'POWER': [' ** ', Blockly.Python.ORDER_EXPONENTIATION],
        'MODULUS': [' % ', Blockly.Python.ORDER_MULTIPLICATIVE]
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.Python.valueToCode(block, 'A', order); //|| '0';
    var argument1 = Blockly.Python.valueToCode(block, 'B', order); //|| '0';
    var code = argument0 + operator + argument1;
    return [code, order];
    // In case of 'DIVIDE', division between integers returns different results
    // in Python 2 and 3. However, is not an issue since Blockly does not
    // guarantee identical results in all languages.  To do otherwise would
    // require every operator to be wrapped in a function call.  This would kill
    // legibility of the generated code.
};

/**
 *
 *
 * @param block
 * @returns {string}
 */
Blockly.Python['numbers_something_equals_tovar'] = function (block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': [' += ', Blockly.Python.ORDER_ADDITIVE],
        'MINUS': [' -= ', Blockly.Python.ORDER_ADDITIVE],
        'MULTIPLY': [' *= ', Blockly.Python.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' /= ', Blockly.Python.ORDER_MULTIPLICATIVE]
    };


    var variable_var = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);



    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var value_by = Blockly.Python.valueToCode(block, 'VALUE', order) || '0';

    var code = variable_var + ' ' + operator + ' ' + value_by + '\n';
    return code;
    // In case of 'DIVIDE', division between integers returns different results
    // in Python 2 and 3. However, is not an issue since Blockly does not
    // guarantee identical results in all languages.  To do otherwise would
    // require every operator to be wrapped in a function call.  This would kill
    // legibility of the generated code.
};


/**
 * // https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ixmhvn
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_cast_int'] = function(block) {
  var value_cast = Blockly.Python.valueToCode(block, 'CAST', Blockly.Python.ORDER_ATOMIC);

  var code = 'int(' + value_cast + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

/**
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_cast_float'] = function(block) {
  var value_cast = Blockly.Python.valueToCode(block, 'CAST', Blockly.Python.ORDER_ATOMIC);

  var code = 'float(' + value_cast + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yukf32
 * @param block
 * @returns {*[]}
 */
Blockly.Python['numbers_to_base'] = function(block) {
  var value_number = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_ATOMIC);
  var dropdown_base = block.getFieldValue('BASE');

    var code = '';
    if (dropdown_base === 'DEC'){
        code = 'int(' + value_number + ')';
    } else if (dropdown_base === 'BIN') {
        code = 'bin(' + value_number + ')';
    } else if (dropdown_base === 'OCT') {
        code = 'oct(' + value_number + ')';
    } else {
        code = 'hex(' + value_number + ')';
    }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['numbers_properties'] = function(block) {
    // Check if a number is even, odd, prime, whole, positive, or negative
    // or if it is divisible by certain number. Returns true or false.
    var number_to_check = Blockly.Python.valueToCode(block, 'NUMBER_TO_CHECK', Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
    var dropdown_property = block.getFieldValue('PROPERTY');
    var code;

    switch (dropdown_property) {
        case 'EVEN':
            code = number_to_check + ' % 2 == 0';
            break;
        case 'ODD':
            code = number_to_check + ' % 2 == 1';
            break;
        case 'WHOLE':
            code = number_to_check + ' % 1 == 0';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY':
            var divisor = Blockly.Python.valueToCode(block, 'DIVISOR',
                Blockly.Python.ORDER_MULTIPLICATIVE);
            // If 'divisor' is some code that evals to 0, Python will raise an error.
            if (!divisor || divisor == '0') {
                return ['False', Blockly.Python.ORDER_ATOMIC];
            }
            code = number_to_check + ' % ' + divisor + ' == 0';
            break;
    }
    return [code, Blockly.Python.ORDER_RELATIONAL];
};