/*
New stuff for git!
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

goog.provide('Blockly.Python.rpi');

goog.require('Blockly.Python');

Blockly.Python.addReservedWords('RPIO');
Blockly.Python.addReservedWords('BOARD');

Blockly.Python.addReservedWords('start');
Blockly.Python.addReservedWords('MODE');

//Blockly.Python.addReservedWords('time');

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mvut6q
Blockly.Python['start_program_python2'] = function (block) {
    Blockly.Python.definitions_['import_start'] = '#!/usr/bin/env python';
    return '\n';
};

Blockly.Python['start_program_python3'] = function (block) {
    Blockly.Python.definitions_['import_start'] = '#!/usr/bin/env python3';
    return '\n';
};


//// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
//Blockly.Python['time_sleep'] = function (block) {
//
//    var comment = '# The time standard library contains sleep().';
//    Blockly.Python.definitions_['import_time'] = comment + '\nfrom time import sleep';
//
//    var value_amount_of_time = Blockly.Python.valueToCode(block, 'amount_of_time', Blockly.Python.ORDER_ATOMIC) || 1;
//
//    return 'sleep(' + value_amount_of_time + ')\n';
//};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbhayd
Blockly.Python['comment'] = function (block) {
    var value_the_comment = Blockly.Python.valueToCode(block, 'the_comment', Blockly.Python.ORDER_ATOMIC);

    return '# ' + value_the_comment.substr(1, value_the_comment.length - 2) + '\n';
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i4iyf9
Blockly.Python['bool_value'] = function (block) {
    var dropdown_tf = block.getFieldValue('NAME');

    var code = dropdown_tf;

    return [code, Blockly.Python.ORDER_NONE];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#857az5
Blockly.Python['bool_convert_to'] = function (block) {
    var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);

    var code = 'bool(' + value_number + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qpofk3
Blockly.Python['funct'] = function (block) {
    var text_funct_name = block.getFieldValue('funct_name');
    var text_arguments = block.getFieldValue('arguments');
    var statements_funct_body = Blockly.Python.statementToCode(block, 'funct_body');
    var my_args = text_arguments.split(",");

    return 'def ' + text_funct_name + '(' + text_arguments + '):\n' + statements_funct_body;
};
