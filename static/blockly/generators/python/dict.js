/**
 * Created by anthony on 5/20/15.
 */

'use strict';

goog.provide('Blockly.Python.dict');

goog.require('Blockly.Python');

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#eweuv3
Blockly.Python['py_dict_item'] = function (block) {
    var value_key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = value_key + ':' + value_value;

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dict_create_empty'] = function (block) {
    // Create an empty dictionary.
    return ['{}', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dict_create_with'] = function (block) {
    // Create a dictionary with any number of elements of any type.
    var code = new Array(block.itemCount_);

    for (var n = 0; n < block.itemCount_; n++) {
        code[n] = Blockly.Python.valueToCode(block, 'ADD' + n,
                Blockly.Python.ORDER_NONE) || 'None';
    }
    // Perform error checking to make sure keys are unique.
    var keys = [];
    var values = [];
    var new_code = [];
    for (var i = 0; i < code.length; i++) {
        if (code[i] != 'None') {
            var kv = code[i].split(':'); // an array with item before : and item after :
            var index = keys.indexOf(kv[0]);

            if (index !== -1) {
                values[index] = kv[1];
            } else {
                keys.push(kv[0]);
                values.push(kv[1]);
            }
        }
    }
    var code2 = '';
    if (keys.length > 0) {
        for (var j = 0; j < keys.length; j++) {
            new_code.push(keys[j] + ': ' + values[j]);
        }
        code2 = '{' + new_code.join(', ') + '}';
    } else {
        code2 = '{}';
    }
    return [code2, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dict_length'] = function (block) {
    // Dictionary length.
    var argument0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '{}';
    return ['len(' + argument0 + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

/* The class below, dict_id, is superseded by builtins_id */
Blockly.Python['dict_id'] = function (block) {
    var value_item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ATOMIC);
    var code = 'id(' + value_item + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

/* The 3 classes below are superseded by dict_methods_vki */
/*
Blockly.Python['dict_items'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);

    var code = value_dict + '.items()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_keys'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);

    var code = value_dict + '.keys()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_values'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);

    var code = value_dict + '.values()';
    return [code, Blockly.Python.ORDER_NONE];
};
*/

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mvxko3
 * @param block
 * @returns {*[]}
 */
Blockly.Python['dict_value_from_key'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value_key = block.getFieldValue('NAME');
    var code = value_dict + '.get(' + value_key + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_key_value'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value_key = block.getFieldValue('NAME');
    var code = value_dict + '[' + value_key + ']';
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['dict_set_key_value'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value_key = block.getFieldValue('NAME');
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = value_dict + '[' + value_key + '] = ' + value_value + '\n';
    return code;
};

Blockly.Python['dict_del_key_value'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value_key = block.getFieldValue('NAME');
    var code = 'del ' + value_dict + '[' + value_key + ']\n';
    return code;
};

Blockly.Python['dict_key_in_not_in'] = function (block) {
    var value_key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);

    var code = value_key + " in "+ value_dict;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_copy'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var code = value_dict + '.copy()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_clear'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var code = value_dict + '.clear()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_methods_vki'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value_menu = block.getFieldValue('MENU');
    var code = value_dict + value_menu;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['dict_key_value_opt'] = function (block) {
    var value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = value_dict + "[" + value + "]";
    return [code, Blockly.Python.ORDER_ATOMIC];
};