/**
 * Created by anthony on 6/12/15.
 */

'use strict';

goog.provide('Blockly.Python.builtins');

goog.require('Blockly.Python');


Blockly.Python['builtins_length'] = function (block) {
    // List length.
    var argument0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '[]';
    return ['len(' + argument0 + ')', Blockly.Python.ORDER_ATOMIC];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#66q9zi
 * @param block
 * @returns {string}
 */
Blockly.Python['builtins_type'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL);
    var code = 'type(' + value + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_chr'] = function (block) {
    var value_type = Blockly.Python.valueToCode(block, 'TYPE', Blockly.Python.ORDER_ATOMIC);
    var code = 'chr(' + value_type + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_ord'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = 'ord(' + value_value + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ea24np
 * @param block
 * @returns {*[]}
 */
Blockly.Python['builtins_range'] = function (block) {
    var value_start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_ATOMIC);
    var value_stop = Blockly.Python.valueToCode(block, 'STOP', Blockly.Python.ORDER_ATOMIC);
    var value_step = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_ATOMIC);
    var items = [value_start, value_stop, value_step];
    //console.log("items");
    var code = 'range(';
    if (value_start == '' && value_stop == '' && value_step == '') {
        ;
    } else if (value_start == '' && value_step == '') {
        //console.log("elif");
        code = code + value_stop;
    } else if (value_stop == '' && value_step == '') {
        ;

    } else if (value_start == '') {
        //console.log("2nd");
        code += value_stop + ', ' + value_step;
    } else if (value_step == '') {
        //console.log("1st");
        code += value_start + ', ' + value_stop;
    } else {
        //console.log("else");
        code += value_start + ', ' + value_stop + ', ' + value_step;
    }
    code += ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_id'] = function (block) {
    var value_item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ATOMIC);
    var code = 'id(' + value_item + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_help'] = function (block) {
    var value_item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ATOMIC);
    var code = 'help(' + value_item + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_range_with'] = function (block) {
    var code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
        var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);
        code[n] = val
    }
    code = 'range(' + code.join(', ') + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_eval'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL);
    var code = 'eval(' + value + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_format'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL);
    var spec = Blockly.Python.valueToCode(block, 'SPEC', Blockly.Python.ORDER_FUNCTION_CALL);

    var code = 'format(' + value + ',' + spec + ')';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['builtins_none'] = function (block) {


    return ["None", Blockly.Python.ORDER_NONE];
};