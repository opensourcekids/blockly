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
 * @fileoverview Generating Python for loop blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.loops');

goog.require('Blockly.Python');


Blockly.Python['loops_for_each'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(block, 'ITER', Blockly.Python.ORDER_NONE) || '[]';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;

  return code;
};

Blockly.Python['loops_while'] = function(block) {
  // Do while/until loop.

  var argument0 = Blockly.Python.valueToCode(block, 'BOOL', Blockly.Python.ORDER_NONE) || 'False';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

  return 'while ' + argument0 + ':\n' + branch;
};

Blockly.Python['loops_break_continue'] = function (block) {

  return block.getFieldValue('WHAT') + "\n";
};