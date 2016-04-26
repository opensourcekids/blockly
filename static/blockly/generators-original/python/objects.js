
'use strict';

goog.provide('Blockly.Python.objects');

goog.require('Blockly.Python');

Blockly.Python['objects_shell'] = function (block) {

    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Python.statementToCode(block, 'STACK');

    if (Blockly.Python.STATEMENT_PREFIX) {
        branch = Blockly.Python.prefixLines(
                Blockly.Python.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
    }
    if (Blockly.Python.INFINITE_LOOP_TRAP) {
        branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g, '"' + block.id + '"') + branch;
    }
    var returnValue = Blockly.Python.valueToCode(block, 'RETURN', Blockly.Python.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = Blockly.Python.INDENT  + 'return ' + returnValue + '\n';
    } else if (!branch) {
        branch = Blockly.Python.PASS;
    }
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.variableDB_.getName(block.arguments_[x], Blockly.Variables.NAME_TYPE);

        if (args[x].slice(0, 6) == 'object'){
            args[x] = 'object';
        }
    }
    // AJL: I removed global + from before branch to prevent global variable definitions.
    var code = 'class ' + funcName + '(' + args.join(', ') + '):\n' + branch;
    code = Blockly.Python.scrub_(block, code);
    Blockly.Python.definitions_[funcName] = code;
    return null;
};


Blockly.Python['objects_method_no_return'] = function (block) {
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Python.statementToCode(block, 'STACK');

    if (Blockly.Python.STATEMENT_PREFIX) {
        branch = Blockly.Python.prefixLines(
                Blockly.Python.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
    }
    if (Blockly.Python.INFINITE_LOOP_TRAP) {
        branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
                '"' + block.id + '"') + branch;
    }
    var returnValue = Blockly.Python.valueToCode(block, 'RETURN', Blockly.Python.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = Blockly.Python.INDENT  + 'return ' + returnValue + '\n';
    } else if (!branch) {
        branch = Blockly.Python.PASS;
    }

    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.variableDB_.getName(block.arguments_[x], Blockly.Variables.NAME_TYPE);
    }

    // AJL: I removed global + from before branch to prevent global variable definitions.
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' + branch + returnValue;

    return code;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Python['objects_method_return'] = Blockly.Python['objects_method_no_return'];


Blockly.Python['objects_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.valueToCode(block, 'ARG' + x, Blockly.Python.ORDER_NONE) || 'None';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['objects_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    var class_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];

    for (var x = 0; x < block.arguments_.length; x++) {
        if (block.arguments_[x] != 'self') {
            // The  -1 is to account for the fact that the self arg is not counted as and ARG#.
            // The first ARG0 is actually one less than x.
            args.push(Blockly.Python.valueToCode(block, 'ARG' + (x - 1), Blockly.Python.ORDER_NONE) || 'None');
        }
    }
    var code = class_name + '.' + funcName + '(' + args.join(', ') + ')\n';
    return code;
};

Blockly.Python['objects_ifreturn'] = function (block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
    var code = 'if ' + condition + ':\n';
    if (block.hasReturnValue_) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || 'None';
        code += Blockly.Python.INDENT + 'return ' + value + '\n';
    } else {
        code += Blockly.Python.INDENT + 'return\n';
    }
    return code;
};

Blockly.Python['objects_return'] = function (block) {
    // Conditionally return value from a procedure.

    var code = '';
    if (block.hasReturnValue_) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || 'None';
        code += 'return ' + value + '\n';
    } else {
        code += 'return\n';
    }
    return code;
};


Blockly.Python['objects_callshell'] = function (block) {

    var class_name = block.getFieldValue('NAME'); //Blockly.Python.valueToCode(block, 'N', Blockly.Python.ORDER_ATOMIC);

    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.valueToCode(block, 'ARG' + x, Blockly.Python.ORDER_NONE) || 'None';
    }

    var code = class_name + '(' + args.join(', ') + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};


/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tnov7q
 * @param block
 * @returns {*[]}
 */
Blockly.Python['objects_execute_method_text'] = function(block) {
  var value_class = Blockly.Python.valueToCode(block, 'CLASS', Blockly.Python.ORDER_ATOMIC);
  var text_method = block.getFieldValue('METHOD');
  var text_params = block.getFieldValue('PARAMS');

  var code = value_class + '.' + text_method + '(' + text_params +')';

  return [code, Blockly.Python.ORDER_NONE];
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tnov7q
 * @param block
 * @returns {*[]}
 */
Blockly.Python['objects_methods'] = function(block) {
  var value_class = Blockly.Python.valueToCode(block, 'CLASS', Blockly.Python.ORDER_ATOMIC);
  var text_method = block.getFieldValue('METHOD');
  var text_params = block.getFieldValue('PARAMS');

  var code = value_class + '.' + text_method + '(' + text_params +')';

  return [code, Blockly.Python.ORDER_NONE];
};