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
 * @fileoverview Generating Python for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.variables');

goog.require('Blockly.Python');


Blockly.Python['variables_get'] = function (block) {
    // Variable getter.
    var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    if (code.search('self_') == 0){
        code = code.replace('self_', 'self.');
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['variables_set'] = function (block) {
    // Variable setter.

    var OPERATORS = {
        'EQUALS': [' = ', Blockly.Python.ORDER_ADDITIVE],
        'ADD': [' += ', Blockly.Python.ORDER_ADDITIVE],
        'MINUS': [' -= ', Blockly.Python.ORDER_ADDITIVE],
        'MULTIPLY': [' *= ', Blockly.Python.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' /= ', Blockly.Python.ORDER_MULTIPLICATIVE],
    };


    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];



    var argument0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || 'None';
    var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    if (varName.search('self_') == 0){
        varName = varName.replace('self_', 'self.');
    }

    return varName + operator + argument0 + '\n';
};

// AJL:  Added to match Arduino version so can type variables
// https://github.com/longshine/BlocklyDuino/blob/aecee6249261ded7d733bc7898ea948a542491e1/blockly/generators/arduino/variables.js
Blockly.Python.variables_declare = function () {
    // Variable setter.
    var dropdown_type = this.getFieldValue('TYPE');
    var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
    // Set type to variable
    Blockly.Arduino.variableTypes_[varName] = dropdown_type;

    return '';
};