/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');


Blockly.Blocks.loops.HUE = Blockly.Hue.LOOP;

Blockly.Blocks['loops_for_each'] = {
    /**
     * Block for 'for each' loop.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type =  'Function';

        this.setHelpUrl(Blockly.Msg.CONTROLS_FOREACH_HELPURL);
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendValueInput('ITER')
            .setCheck([Blockly.Type.STR, Blockly.Type.LIST, Blockly.Type.TUPLE, Blockly.Type.DICT, Blockly.Type.NONE ])
            .appendField('for')
            .appendField(new Blockly.FieldVariable('item'), 'VAR')
            .appendField('in');
        if (Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL) {
            this.appendDummyInput()
                .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL);
            this.setInputsInline(true);
        }
        this.appendDummyInput()
            .appendField(":");
        this.setInputsInline(true);
        this.appendStatementInput('DO')
            .appendField('');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace('%1', thisBlock.getFieldValue('VAR'));
        });
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    //customContextMenu: Blockly.Blocks['loops_for_each'].customContextMenu
};

Blockly.Blocks['loops_while'] = {
    /**
     * Block for 'while' loop.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
            [[' ', 'WHILE'],
             ['not', 'UNTIL']];

        this.appendDummyInput()
            .appendField("while");
        this.appendValueInput('BOOL')
            .setCheck('Boolean');
        this.appendDummyInput()
            .appendField(":");
        this.setInputsInline(true);
        this.appendStatementInput('DO')
            .appendField("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(Blockly.Blocks.loops.HUE);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
    }
};

Blockly.Blocks['loops_break_continue'] = {
    init: function () {
        this.setHelpUrl('');

        var CHOICE = [["break", "break"], ["continue", "continue"] ];

        this.setColour(Blockly.Blocks.loops.HUE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(CHOICE), 'WHAT');
        //.appendField("\'");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};