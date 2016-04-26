/*
 Hello GitHub!
 */

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
 * @fileoverview Generating Python for text blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.ajl');

goog.require('Blockly.Python');

Blockly.Python.addReservedWords('RPIO');

Blockly.Python['ajl_test'] = function (block) {

    Blockly.Python.definitions_['import_RPIO'] = 'import RPIO';
    var statements_state = Blockly.Python.statementToCode(block, 'state');
    // TODO: Assemble Python into code variable.
    var code = '42';
    return code;
};

Blockly.Python['ajl_negate'] = function (block) {
    var value_number_to_negate = Blockly.Python.valueToCode(block, 'number_to_negate', Blockly.Python.ORDER_ATOMIC);
    var number = block.getFieldValue('number_to_negate')
    //var code = '-';
    var code = '-' + value_number_to_negate;
    return [code, Blockly.Python.ORDER_MULTIPLICATIVE]
};