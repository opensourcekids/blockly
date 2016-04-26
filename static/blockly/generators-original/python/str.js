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

goog.provide('Blockly.Python.strings');

goog.require('Blockly.Python');


Blockly.Python['strings_print'] = function (block) {
    // Print statement.
    var argument0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'';

    return 'print(' + argument0 + ')\n';
};

Blockly.Python['strings_print_commas'] = function (block) {
// Create a list with any number of elements of any type.
    var code = new Array(block.itemCount_);

    if (block.itemCount_ == 0) {
        code = "print \'\'"

    } else {

        for (var n = 0; n < block.itemCount_; n++) {
            var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);


            code[n] = val

        }
        code = "print " + code.join(' , ');
    }
    code = code + "\n";
    return code;
};

Blockly.Python['strings_print_py3_commas'] = function (block) {
// Create a list with any number of elements of any type.

    var code = new Array(block.itemCount_);

    if (block.itemCount_ == 0) {
        code = "print()"

    } else {

        for (var n = 0; n < block.itemCount_; n++) {
            var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);


            code[n] = val

        }
        code = "print(" + code.join(' , ') + ")";
    }
    code = code + "\n";
    return code;
};


Blockly.Python['strings'] = function (block) {
    // Text value.
    var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.Python.ORDER_ATOMIC];
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n48syd
Blockly.Python['strings_cast_str'] = function (block) {
    var value_cast = Blockly.Python.valueToCode(block, 'CAST', Blockly.Python.ORDER_ATOMIC);

    var code = 'str(' + value_cast + ')';
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['strings_concatenate'] = function (block) {
// Create a list with any number of elements of any type.
    var code = new Array(block.itemCount_);

    /* TODO: This code will escape ' automatically and convert non-strings to strings.
     for (var n = 0; n < block.itemCount_; n++) {
     var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);

     if (val.charAt(0) == "\'" || val.substring(0,3) == "str"){
     code[n] = val;

     } else{
     code[n] = 'str(' + val + ')'
     }
     }
     code =  code.join(' + ');
     return [code, Blockly.Python.ORDER_ATOMIC];
     */

    for (var n = 0; n < block.itemCount_; n++) {
        var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);


        code[n] = val

    }
    code = code.join(' + ');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n4kapa
 *
 * @param block
 * @returns {*[]}
 */
Blockly.Python['strings_specials'] = function (block) {

    var OPERATORS = {
                    "space": " ",
                    "empty": "",
                    "tab": "\\t",
                    "new line": "\\n",
                    "'": "\\'",
                    "\"": "\\\"",
                    "\\": "\\\\"
    };

    var operator = OPERATORS[block.getFieldValue('CHAR')];
    var code = '\'' + operator + '\'';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['strings_changeCase'] = function (block) {
    // Change capitalization.
    var OPERATORS = {
        'UPPERCASE': '.upper()',
        'LOWERCASE': '.lower()',
        'TITLECASE': '.title()'
    };
    var operator = OPERATORS[block.getFieldValue('CASE')];
    var argument0 = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
    var code = argument0 + operator;
    return [code, Blockly.Python.ORDER_MEMBER];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#usy3so
 * @param block
 * @returns {*[]}
 */
Blockly.Python['strings_charAt'] = function (block) {
    var value_string = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC);
    var value_index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ATOMIC) || '0';

    var code = value_string + "[" + value_index + "]";

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['strings_getSubstring'] = function (block) {
    // Get substring.
    var text = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_MEMBER);
    var index1 = Blockly.Python.valueToCode(block, 'INDEX1', Blockly.Python.ORDER_ADDITIVE);
    var index2 = Blockly.Python.valueToCode(block, 'INDEX2', Blockly.Python.ORDER_ADDITIVE);


    var code = text + '[' + index1 + ':' + index2 + ']';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_startswith_endswith'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER) || '';
    var menu_item = block.getFieldValue('MENU');
    var check_string = Blockly.Python.valueToCode(block, 'CHECK', Blockly.Python.ORDER_MEMBER) || '';

    var code = input_string + menu_item + '(' + check_string + ')';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_strips'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER) || '';
    var menu_item = block.getFieldValue('MENU');

    var code = input_string + menu_item + '()';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_find'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER) || '';
    var check_string = Blockly.Python.valueToCode(block, 'CHECK', Blockly.Python.ORDER_MEMBER) || '';


    var code = input_string + '.find(' + check_string + ')';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_count'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER) || '';
    var check_string = Blockly.Python.valueToCode(block, 'CHECK', Blockly.Python.ORDER_MEMBER) || '';


    var code = input_string + '.count(' + check_string + ')';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_split'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER) || '';
    var split_string = Blockly.Python.valueToCode(block, 'CHECK', Blockly.Python.ORDER_MEMBER) || '';


    var code = input_string + '.split(' + split_string + ')';
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['strings_format_with'] = function (block) {


    //var input_string = Blockly.Python.valueToCode(block, 'STR', Blockly.Python.ORDER_ATOMIC) || '';

    var str = Blockly.Python.quote_(block.getFieldValue('STR'));
    var arr = new Array(block.itemCount_);

    //if (block.itemCount_ == 0) {
    //    arr = "()"
    //
    //} else {

        for (var n = 0; n < block.itemCount_; n++) {
            arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);
        }
        code = str + ".format(" + arr.join(' , ') + ")";
    //}
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['strings_braces_with'] = function (block) {

    var arr = new Array(block.itemCount_);

    //if (block.itemCount_ == 0) {
    //    arr = "()"
    //
    //} else {

    for (var n = 0; n < block.itemCount_; n++) {
        arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);
    }
    code = "{" + arr.join(':') + "}";
    //}
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['strings_pct_insert'] = function (block) {


    //var input_string = Blockly.Python.valueToCode(block, 'STR', Blockly.Python.ORDER_ATOMIC) || '';

    var str = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_NONE);
    var arr = new Array(block.itemCount_);

    for (var n = 0; n < block.itemCount_; n++) {
        arr[n] = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);
    }
    code = str + " % (" + arr.join(' , ') + ")";
    //}
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['strings_end'] = function (block) {

    var item = Blockly.Python.valueToCode(block, 'END', Blockly.Python.ORDER_NONE);

    code = "end=" + item;
    //}
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['strings_from_future_import'] = function (block) {
    Blockly.Python.definitions_['import_py3'] = 'from __future__ import print_function\n';

    return "";
};

Blockly.Python['strings_join'] = function (block) {


    var input_string = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_MEMBER);
    var iterable = Blockly.Python.valueToCode(block, 'ITERABLE', Blockly.Python.ORDER_MEMBER);


    var code = input_string + '.join(' + iterable + ')';
    return [code, Blockly.Python.ORDER_MEMBER];
};
