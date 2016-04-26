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
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


Blockly.Blocks.lists.HUE = Blockly.Hue.LIST;
Blockly.Blocks.lists.type = Blockly.Type.LIST;

Blockly.Blocks.lists.num_blocks = 0;
Blockly.Blocks.lists.number_times_through = 0;


Blockly.Blocks['lists_create_empty'] = {
    /**
     * Block for creating an empty list.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.LIST;

        this.setHelpUrl();
        this.setColour(Blockly.Hue.LIST);
        this.setOutput(true, this.block_type);
        this.appendDummyInput()
            .appendField("[ ]");
        this.setTooltip();
    }
};

Blockly.Blocks['lists_empty_list'] = {
    /**
     * Block for creating an empty list.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LIST;

        this.setHelpUrl();
        this.setColour(Blockly.Blocks.lists.HUE);
        this.setOutput(true, this.block_type);
        this.appendDummyInput()
            .appendField("list")
            .appendField("(")
            .setAlign(Blockly.ALIGN_Center);
        this.appendDummyInput()
            .appendField(")")
            .setAlign(Blockly.ALIGN_CENTRE);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

Blockly.Blocks['lists_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl();
        this.setColour(Blockly.Blocks.lists.HUE);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.setTooltip("");

        Blockly.Blocks.lists.num_items = this.itemCount_;
        Blockly.Blocks.lists.num_blocks = this.itemCount_;
        Blockly.Blocks.lists.number_times_through = 0;
    },

    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).connection.connect(connections[i]);
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            this.removeInput('LEFT', true);

            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                if (i != 0) {
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField('[ ]');
        } else {
            this.appendDummyInput('LEFT')
                .appendField("[")
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                        //.setAlign(Blockly.ALIGN_RIGHT);
                }
                var input = this.appendValueInput('ADD' + i);
            }
            this.appendDummyInput('RIGHT')
                .appendField("]")
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['lists_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_repeat'] = {
    /**
     * Block for creating a list with one element repeated.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl("");
        this.setColour(Blockly.Hue.LIST);

        //var OPS = [["+", " + "], ["*", " * "]];

        this.appendValueInput('ITEM')
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("*"); //new Blockly.FieldDropdown(OPS), 'OPS');
        this.appendValueInput('NUM')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);

        this.setOutput(true, this.block_type);
        //this.interpolateMsg(Blockly.Msg.LISTS_REPEAT_TITLE,
        //    ['ITEM', null, Blockly.ALIGN_RIGHT],
        //    ['NUM', [Blockly.Type.INT, Blockly.Type.NONE], Blockly.ALIGN_RIGHT],
        //    Blockly.ALIGN_RIGHT);
        this.setTooltip(" ");
    }
};

Blockly.Blocks['lists_concat'] = {
    /**
     * Block for creating a list with one element repeated.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl("");
        this.setColour(Blockly.Hue.LIST);

        this.appendValueInput('LIST1')
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("+");
        this.appendValueInput('LIST2')
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.setOutput(true, this.block_type);

        this.setTooltip(" ");
    }
};


Blockly.Blocks['lists_indexOf'] = {
    /**
     * Block for finding an item in the list.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.LIST;
        var OPERATORS =
            [[Blockly.Msg.LISTS_INDEX_OF_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_INDEX_OF_LAST, 'LAST']];
        this.block_type = Blockly.Type.INT;
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.setOutput(true, Blockly.Type.INT);
        this.appendValueInput('VALUE')
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput('FIND')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LISTS_INDEX_OF_TOOLTIP);
    }
};

Blockly.Blocks['lists_getIndex'] = {
    /**
     * Block for getting element at index.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.LIST;

        var MODE =
            [[Blockly.Msg.LISTS_GET_INDEX_GET, 'GET'],
                [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, 'GET_REMOVE'],
                [Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'REMOVE']];

        this.block_type = Blockly.Type.INT;
        this.WHERE_OPTIONS =
            [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST'],
                [Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM']];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        var modeMenu = new Blockly.FieldDropdown(MODE, function (value) {
            var isStatement = (value == 'REMOVE');
            this.sourceBlock_.updateStatement_(isStatement);
        });
        this.appendValueInput('VALUE')
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput()
            .appendField(modeMenu, 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var combo = thisBlock.getFieldValue('MODE') + '_' +
                thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether the block is a statement or a value.
     * Also represent whether there is an 'AT' input.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isStatement = !this.outputConnection;
        container.setAttribute('statement', isStatement);
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'statement' defaults to false and 'at' defaults to true.
        var isStatement = (xmlElement.getAttribute('statement') == 'true');
        this.updateStatement_(isStatement);
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Switch between a value block and a statement block.
     * @param {boolean} newStatement True if the block should be a statement.
     *     False if the block should be a value.
     * @private
     * @this Blockly.Block
     */
    updateStatement_: function (newStatement) {
        var oldStatement = !this.outputConnection;
        if (newStatement != oldStatement) {
            this.unplug(true, true);
            if (newStatement) {
                this.setOutput(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            } else {
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setOutput(true);
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.getInput('AT').appendField(menu, 'WHERE');
        if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.Blocks['lists_setIndex'] = {
    /**
     * Block for setting the element at index.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LIST;
        var MODE =
            [[Blockly.Msg.LISTS_SET_INDEX_SET, 'SET'],
                [Blockly.Msg.LISTS_SET_INDEX_INSERT, 'INSERT']];
        this.WHERE_OPTIONS =
            [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_INDEX_FIRST, 'FIRST'],
                [Blockly.Msg.LISTS_GET_INDEX_LAST, 'LAST'],
                [Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM']];


        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput('LIST')
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(MODE), 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO')
            .appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var combo = thisBlock.getFieldValue('MODE') + '_' +
                thisBlock.getFieldValue('WHERE');
            return Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_' + combo];
        });
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'at' defaults to true.
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' input.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.sourceBlock_;
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.moveInputBefore('AT', 'TO');
        if (this.getInput('ORDINAL')) {
            this.moveInputBefore('ORDINAL', 'TO');
        }

        this.getInput('AT').appendField(menu, 'WHERE');
    }
};

Blockly.Blocks['lists_getSublist'] = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this['WHERE_OPTIONS_1'] =
            [[Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST']];
        this['WHERE_OPTIONS_2'] =
            [[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START'],
                [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END'],
                [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST']];


        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput('LIST')
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        }
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independant of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
            function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a closure.
                if (newAt != isAt) {
                    var block = this.sourceBlock_;
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.  Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });
        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
        if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.Blocks['lists_split'] = {
    /**
     * Block for splitting text into a list, or joining a list into text.
     * @this Blockly.Block
     */
    init: function () {
        // Assign 'this' to a variable for use in the closures below.
        this.block_type = Blockly.Type.LIST;
        var thisBlock = this;
        var dropdown = new Blockly.FieldDropdown(
            [[Blockly.Msg.LISTS_SPLIT_LIST_FROM_TEXT, 'SPLIT'],
                [Blockly.Msg.LISTS_SPLIT_TEXT_FROM_LIST, 'JOIN']],
            function (newOp) {
                if (newOp == 'SPLIT') {
                    thisBlock.outputConnection.setCheck(Blockly.Type.LIST);
                    thisBlock.getInput('INPUT').setCheck('String');
                } else {
                    thisBlock.outputConnection.setCheck('String');
                    thisBlock.getInput('INPUT').setCheck(Blockly.Type.LIST);
                }
            });
        this.setHelpUrl(Blockly.Msg.LISTS_SPLIT_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput('INPUT')
            .setCheck(Blockly.Type.STR)
            .appendField(dropdown, 'MODE');
        this.appendValueInput('DELIM')
            .setCheck('String')
            .appendField(Blockly.Msg.LISTS_SPLIT_WITH_DELIMITER);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.LIST);
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            if (mode == 'SPLIT') {
                return Blockly.Msg.LISTS_SPLIT_TOOLTIP_SPLIT;
            } else if (mode == 'JOIN') {
                return Blockly.Msg.LISTS_SPLIT_TOOLTIP_JOIN;
            }
            throw 'Unknown mode: ' + mode;
        });
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gfywep
Blockly.Blocks['lists_append'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField("");
        this.appendValueInput("ITEM")
            .appendField(". append (");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#fiesk3
Blockly.Blocks['lists_extend'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField("");
        this.appendValueInput("ITEM")
            .setCheck([this.block_type, Blockly.Type.NONE, Blockly.Type.TUPLE, Blockly.Type.DICT, Blockly.Type.STR])
            .appendField(". extend (");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#krdh4v
Blockly.Blocks['lists_insert'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE])
            .appendField("");
        this.appendDummyInput("INSERT")
            .appendField(". insert");
        this.appendDummyInput("Left")
            .appendField("(");
        this.appendValueInput("POSITION")
            .setCheck();
         this.appendDummyInput("COMMA")
            .appendField(",");
        this.appendValueInput("INSERT_ITEM")
            .setCheck();
        this.appendDummyInput("RIGHT")
            .appendField(")");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pgge7w
Blockly.Blocks['lists_remove'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("REMOVE")
            .appendField(". remove");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendValueInput("ITEM");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#iemqts
Blockly.Blocks['lists_index'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("INDEX")
            .appendField(". index");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendValueInput("ITEM");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cu5u5y
Blockly.Blocks['lists_count'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("COUNT")
            .appendField(". count");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendValueInput("ITEM");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6umeaq
Blockly.Blocks['lists_reverse'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("REVERSE")
            .appendField(". reverse");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['lists_pop'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("POP")
            .appendField(". pop");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendValueInput("POSITION")
            .setCheck("Number");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#uopnrm
Blockly.Blocks['lists_sort'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
            .setCheck([this.block_type, Blockly.Type.NONE]);
        this.appendDummyInput("SORT")
            .appendField(". sort");
        this.appendDummyInput("LEFT")
            .appendField("(");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["reverse=False", "False"], ["reverse=True", "True"]]), "REVERSED");
        this.appendDummyInput("RIGHT")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

