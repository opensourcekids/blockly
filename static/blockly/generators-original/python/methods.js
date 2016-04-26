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
 * @fileoverview Generating Python for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python.methods');

goog.require('Blockly.Python');


Blockly.Python['methods_defreturn'] = function (block) {
    // Define a procedure with a return value.
    // First, add a 'global' statement for every variable that is assigned.
    var globals = Blockly.Variables.allVariables(block);
    for (var i = globals.length - 1; i >= 0; i--) {
        var varName = globals[i];
        if (block.arguments_.indexOf(varName) == -1) {
            globals[i] = Blockly.Python.variableDB_.getName(varName, Blockly.Variables.NAME_TYPE);
        } else {
            // This variable is actually a parameter name.  Do not include it in
            // the list of globals, thus allowing it be of local scope.
            globals.splice(i, 1);
        }
    }
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Python.statementToCode(block, 'STACK');
    if (Blockly.Python.STATEMENT_PREFIX) {
        branch = Blockly.Python.prefixLines(Blockly.Python.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\''),
                Blockly.Python.INDENT) + branch;
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
        args[x] = Blockly.Python.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
    }

    // AJL: I removed global + from before branch to prevent global variable definitions.
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' + branch + returnValue;
    code = Blockly.Python.scrub_(block, code);
    Blockly.Python.definitions_[funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Python['methods_defnoreturn'] =
    Blockly.Python['methods_defreturn'];

Blockly.Python['methods_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.valueToCode(block, 'ARG' + x,
                Blockly.Python.ORDER_NONE) || 'None';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['methods_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    var funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
        args[x] = Blockly.Python.valueToCode(block, 'ARG' + x,
                Blockly.Python.ORDER_NONE) || 'None';
    }
    var code = funcName + '(' + args.join(', ') + ')\n';
    return code;
};

Blockly.Python['methods_ifreturn'] = function (block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.Python.valueToCode(block, 'CONDITION',
            Blockly.Python.ORDER_NONE) || 'False';
    var code = 'if ' + condition + ':\n';
    if (block.hasReturnValue_) {
        var value = Blockly.Python.valueToCode(block, 'VALUE',
                Blockly.Python.ORDER_NONE) || 'None';
        code += Blockly.Python.INDENT + 'return ' + value + '\n';
    } else {
        code += Blockly.Python.INDENT + 'return\n';
    }
    return code;
};

Blockly.Python['methods_return'] = function (block) {
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
