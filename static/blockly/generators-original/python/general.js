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

goog.provide('Blockly.Python.general');

goog.require('Blockly.Python');



Blockly.Python['general_input'] = function (block) {
    var value_input = Blockly.Python.valueToCode(block, 'INPUT', Blockly.Python.ORDER_ATOMIC);
    var code = 'input(' + value_input + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbhayd
Blockly.Python['general_comment'] = function (block) {
    //var value_the_comment = Blockly.Python.valueToCode(block, 'the_comment', Blockly.Python.ORDER_ATOMIC);
     // Text value.
    // var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    var the_comment = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    var rpl = the_comment;
    //if (the_comment.indexOf('\'') != -1) {
    //    rpl = the_comment.replace("\\", "");
    //}
    return '# ' + rpl.substr(1, rpl.length - 2) + '\n';

    //var rpl = value_the_comment;
    //if (value_the_comment.indexOf('\'') != -1) {
    //    rpl = value_the_comment.replace("\\", "");
    //}
    //return '# ' + rpl.substr(1, rpl.length - 2) + '\n';
};

Blockly.Python['general_length'] = function (block) {
    var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || '{}';
    return ['len(' + argument0 + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['general_id'] = function (block) {
    var value_item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ATOMIC);
    var code = 'id(' + value_item + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#usy3so
 * @param block
 * @returns {*[]}
 */
Blockly.Python['general_getIndex'] = function (block) {
    var value_string = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC);
    var value_index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ATOMIC) || '0';

    var code = value_string + "[" + value_index + "]";

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['general_getSub'] = function (block) {
    // Get substring.
    var text = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_MEMBER);
    var index1 = Blockly.Python.valueToCode(block, 'INDEX1', Blockly.Python.ORDER_ADDITIVE);
    var index2 = Blockly.Python.valueToCode(block, 'INDEX2', Blockly.Python.ORDER_ADDITIVE);


    var code = text + '[' + index1 + ':' + index2 + ']';
    return [code, Blockly.Python.ORDER_MEMBER];
};


Blockly.Python['general_create_with'] = function(block) {
    // Create a list with any number of elements of any type.
    var thing = Blockly.Python.valueToCode(block, 'INPUT', Blockly.Python.ORDER_MEMBER) || 'None';
    var code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
        code[n] = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE) || ' ';// || 'None';
    }
    //console.log(code);
    if (code.length == 1){
        code = thing + '[' + code[0] + ']';
    } else {

        code = thing + '[' + code.join(':') + ']';
    }

    //console.log(code);
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['general_equals'] = function (block) {
    // Get substring.
    var variable = Blockly.Python.valueToCode(block, 'VAR', Blockly.Python.ORDER_NONE);
    var equals = Blockly.Python.valueToCode(block, 'EQUALS', Blockly.Python.ORDER_NONE);

    var code = variable + ' = ' + equals + '\n';
    return code;
};


Blockly.Python['general_block_comment'] = function(block) {

    var quotes = "'''";
    if(block.getFieldValue('COMMENT_ON') == 'TRUE'){
          quotes = ""
    }

    return quotes + "\n";
};