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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.str');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');


Blockly.Blocks.str.TYPE = Blockly.Hue.TYPE_STR;

Blockly.Blocks['strings_print'] = {
    /**
     * Block for print statement.
     * @this Blockly.Block
     */
    init: function () {
        // console.log("BEGIN-- strings_print.init");


        this.appendDummyInput('PRINT')
            .appendField('print');
        this.appendDummyInput()
            .appendField('(') //(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('TEXT');
        //this.interpolateMsg(Blockly.Msg.STRINGS_PRINT_TITLE,
        //    ['TEXT', null, Blockly.ALIGN_RIGHT],
        //    Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(')') // (Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setColour(Blockly.Hue.STR);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_PRINT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.STRINGS_PRINT_HELPURL);
        // console.log("END-- strings_print.init");
    }
};

Blockly.Blocks['strings'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.STRINGS_STRINGS_HELPURL);
        this.setColour(Blockly.Hue.STR);


        this.appendDummyInput()
            .appendField("\'")
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField("\'");

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        this.setTooltip(Blockly.Msg.STRINGS_STRINGS_TOOLTIP);

        this.block_type = Blockly.Type.STR;
    }
};

/**
 * Cast a
 * Block Factory address for this block is https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n48syd
 */
Blockly.Blocks['strings_cast_str'] = {

    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput('TEXT')
            .appendField("str");
        this.appendDummyInput()
            .appendField('(')  // Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("CAST");

        this.appendDummyInput()
            .appendField(')')  // (Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        this.setTooltip('');

        this.block_type = Blockly.Type.STR;
    }
};

Blockly.Blocks['strings_concatenate'] = {
    /**
     * Block for creating a string made up of any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.STRINGS_CONCAT_HELPURL);
        this.setColour(Blockly.Hue.STR);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setOutput(true, Blockly.Type.STR);
        this.setMutator(new Blockly.Mutator(['strings_create_concat_item']));
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STRINGS_CONCAT_TOOLTIP);

        this.block_type = Blockly.Type.STR;
    },
    /**
     * Create XML to represent number of text inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace,
            'strings_create_concat_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_create_concat_item');
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
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                if (i != 0) {
                    this.removeInput('PLUS' + i);
                }
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("\'")
                .appendField("\'");
        } else {
            //for (var i = 0; i < this.itemCount_; i++) {
            //    var input = this.appendValueInput('ADD' + i);
            //    if (i == 0) {
            //        input.appendField(Blockly.Msg.STRINGS_CONCAT_TITLE_CREATEWITH);
            //        //input.setCheck('Number');
            //    }
            //}
            //var last = 0;
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('PLUS' + i)
                        .appendField('+');
                        //.setAlign(Blockly.ALIGN_RIGHT);
                }
                var input = this.appendValueInput('ADD' + i);

                //last = i;
            }
            //this.removeInput('PLUS' + last);

        }
    }
};

Blockly.Blocks['strings_create_concat_container'] = {
    /**
     * Mutator block for container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_TITLE_CONCAT);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['strings_create_concat_item'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TITLE_ITEM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n4kapa
 * @type {{init: Function}}
 */
Blockly.Blocks['strings_specials'] = {
    init: function() {

        var OPERATORS =
              [["space", "space"],
               ["empty", "empty"],
               ["tab", "tab"],
               ["new line", "new line"],
               ["'", "'"],
               ["\"", "\""],
               ["\\", "\\"]];

        // Appearance
        this.appendDummyInput()
            .appendField("\'");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), "CHAR");
        this.appendDummyInput()
            .appendField("\'");
        this.setInputsInline(true);

        // Type and Colour
        this.block_type = Blockly.Type.STR;
        this.setOutput(true, Blockly.Type.STR);
        this.setColour(Blockly.Hue.STR);

        // Support
        this.setHelpUrl('http://www.example.com/');
        this.setTooltip('These are special characters used to hings like spaces and tabs to strings.');
    }
};

Blockly.Blocks['strings_changeCase'] = {
    /**
     * Block for changing capitalization.
     * @this Blockly.Block
     */
    init: function () {

        var OPERATORS =
            [['upper', 'UPPERCASE'],
             ['lower', 'LOWERCASE'],
             ['title', 'TITLECASE']];

        // Block Appearance
        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
        this.appendDummyInput()
            .appendField('(')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(')')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setInputsInline(true);

        // Type and Colour
        this.block_type = Blockly.Type.STR;
        this.setOutput(true, Blockly.Type.STR);
        this.setColour(Blockly.Hue.STR);

        // Support functions.
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
    }
};

Blockly.Blocks['strings_startswith_endswith'] = {
    /**
     * Block for checking if a string starts with or ends with a certain string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.BOOL;

        var DROPDOWN = new Blockly.FieldDropdown([['startswith', '.startswith'], ['endswith', '.endswith']]);


        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(DROPDOWN, 'MENU');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('CHECK')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.BOOL);
        this.setHelpUrl('');
        this.setTooltip('Checks if a string starts with or ends with a certain string.');
    },
    onchange: function(){
        if (this.getFieldValue('MENU') == '.startswith'){
            this.setHelpUrl('https://docs.python.org/2/library/stdtypes.html#str.startswith');
        } else{
            this.setHelpUrl('https://docs.python.org/2/library/stdtypes.html#str.endswith');
        }
    },
};

Blockly.Blocks['strings_strips'] = {
    /**
     * Block for checking if a string starts with or ends with a certain string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;

        var DROPDOWN = new Blockly.FieldDropdown([['strip', '.strip'], ['lstrip', '.lstrip'], ['rstrip', '.rstrip']]);


        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.'); // (Blockly.Blocks.dot());
        this.appendDummyInput()
            .appendField(DROPDOWN, 'MENU');
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.STR);
        this.setHelpUrl('');
        this.setTooltip('Removes the white space from:\nfront, back: strip\nfront: lstrip\nback: rstrip.');
    }
};

Blockly.Blocks['strings_find'] = {
    /**
     * Block for checking if a string contains another string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.INT;

        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.'); // (Blockly.Blocks.dot());
        this.appendDummyInput()
            .appendField('find');
        this.appendDummyInput()
            .appendField('('); // (Blockly.Blocks.parens_('left'));
        this.appendValueInput('CHECK')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')'); // Blockly.Blocks.parens_('right'));
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.INTEGER);
        this.setHelpUrl('');
        this.setTooltip('Checks if the string on left side contains the string on the right.  ' +
            'Returns the index the right string starts at or -1 if the left string does not contain the right string.\n' +
            'REMEMBER: The first letter in the left string is 0 (zero) not 1 (one).');
    }
};

Blockly.Blocks['strings_count'] = {
    /**
     * Block for checking if a string contains another string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.INT;

        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField('count');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('CHECK')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.INTEGER);
        this.setHelpUrl('');
        this.setTooltip('Counts the number of times the string on the right side in the ( ) is in the string on left side' +
            'Returns the the number of times or -1 if the left string does not contain the right string.');
    }
};



Blockly.Blocks['strings_pct_insert'] = {
    /**
     * Block for creating a string made up of any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('');
        this.setColour(Blockly.Hue.STR);
        this.itemCount_ = 1;

        this.appendValueInput("STRING")
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput("PERCENT")
            .appendField('%');
        this.appendDummyInput("LEFT_PARENS")
            .appendField('(');
        this.appendDummyInput("RIGHT_PARENS")
            .appendField(')');
        //this.appendDummyInput("END_COMMA")
            //.appendField(new Blockly.FieldTextInput(''), 'END');
        this.updateShape_();
        this.setOutput(true, Blockly.Type.STR);
        this.setMutator(new Blockly.Mutator(['strings_create_pct_insert_item']));
        this.setInputsInline(true);
        this.setTooltip('');

        this.block_type = Blockly.Type.STR;
    },
    /**
     * Create XML to represent number of text inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'strings_create_pct_insert_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_create_pct_insert_item');
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
            var i = 0;
            this.removeInput("PERCENT");
            this.removeInput("LEFT_PARENS");
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                if (i != 0) {
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput("RIGHT_PARENS");
            //this.removeInput("END_COMMA");

        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("\'")
                .appendField("\'");
        } else {
            this.appendDummyInput("PERCENT")
                .appendField('%');
            this.appendDummyInput("LEFT_PARENS")
                .appendField('(');

            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(',');
                }
                var input = this.appendValueInput('ADD' + i);
            }
            this.appendDummyInput("RIGHT_PARENS")
                .appendField(')');
            //this.appendDummyInput("END_COMMA")
            //    .appendField(new Blockly.FieldTextInput(''), 'END');
        }
    }
};

Blockly.Blocks['strings_create_pct_insert_container'] = {
    /**
     * Mutator block for container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_TITLE_CONCAT);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['strings_create_pct_insert_item'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TITLE_ITEM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};
Blockly.Blocks['strings_print_py3_commas'] = {
    /**
     * Block for creating a string made up of any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {

        this.itemCount_ = 1;
        this.appendDummyInput("TEXT")
            .appendField("print");
        this.appendDummyInput("LEFT_PARENS")
            .appendField('(');
        this.appendDummyInput("RIGHT_PARENS")
            .appendField(')');
        this.updateShape_();

        //this.setOutput(true, Blockly.Type.STR);
        this.setMutator(new Blockly.Mutator(['strings_create_print_commas_item']));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CONCAT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.STRINGS_CONCAT_HELPURL);
        this.setColour(Blockly.Hue.STR);

        this.block_type = Blockly.Type.STR;
    },
    /**
     * Create XML to represent number of text inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'strings_create_print_commas_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_create_print_commas_item');
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
            var i = 0;
            this.removeInput("LEFT_PARENS");
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                if (i != 0) {
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput("RIGHT_PARENS");
            //this.removeInput("END_COMMA");

        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("\'")
                .appendField("\'");
        } else {
            this.appendDummyInput("LEFT_PARENS")
                .appendField('(');

            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(',');
                }
                var input = this.appendValueInput('ADD' + i);
            }
            this.appendDummyInput("RIGHT_PARENS")
                .appendField(')');
        }
    }
};

Blockly.Blocks['strings_print_commas'] = {
    /**
     * Block for creating a string made up of any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {

        this.itemCount_ = 2;
        this.appendDummyInput("TEXT")
            .appendField("print ");
        this.updateShape_();

        //this.setOutput(true, Blockly.Type.STR);
        this.setMutator(new Blockly.Mutator(['strings_create_print_commas_item']));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CONCAT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.STRINGS_CONCAT_HELPURL);
        this.setColour(Blockly.Hue.STR);

        this.block_type = Blockly.Blocks.str.TYPE;
    },
    /**
     * Create XML to represent number of text inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the text inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'strings_create_print_commas_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_create_print_commas_item');
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
            var i = 0;
            //this.removeInput('TEXT');
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                if (i != 0) {
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("\'\'")
        } else {
            //for (var i = 0; i < this.itemCount_; i++) {
            //    var input = this.appendValueInput('ADD' + i);
            //    if (i == 0) {
            //        input.appendField(Blockly.Msg.STRINGS_CONCAT_TITLE_CREATEWITH);
            //        //input.setCheck('Number');
            //    }
            //}
            //var last = 0;
            //this.appendDummyInput("TEXT")
            //    .appendField("print ");
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(',');
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                var input = this.appendValueInput('ADD' + i);

                //last = i;
            }
            //this.removeInput('PLUS' + last);

        }
    }
};

Blockly.Blocks['strings_create_print_commas_container'] = {
    /**
     * Mutator block for container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_TITLE_CONCAT);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['strings_create_print_commas_item'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TITLE_ITEM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['strings_split'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;

        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField('split');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('CHECK')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.STR);
        this.setHelpUrl('');
        this.setTooltip('');
    }
};


Blockly.Blocks['strings_format_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;
        this.setHelpUrl();
        this.setColour(Blockly.Hue.STR);
        //this.appendValueInput('STR')
        //    .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("\'")
            .appendField(new Blockly.FieldTextInput('{}'), 'STR')
            .appendField("\'");
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField('format');
        this.itemCount_ = 1;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['strings_format_with_item']));
        this.setTooltip();

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
        var containerBlock = Blockly.Block.obtain(workspace, 'strings_format_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_format_with_item');
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
                .appendField('( )');
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(',');
                }
                var input = this.appendValueInput('ADD' + i);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['strings_format_with_container'] = {
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

Blockly.Blocks['strings_format_with_item'] = {
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


Blockly.Blocks['strings_braces_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;
        this.setHelpUrl();
        this.setColour(Blockly.Hue.STR);
        this.itemCount_ = 0;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['strings_braces_with_item']));
        this.setTooltip();

        Blockly.Blocks.str.num_items = this.itemCount_;
        Blockly.Blocks.str.num_blocks = this.itemCount_;
        Blockly.Blocks.str.number_times_through = 0;
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
        var containerBlock = Blockly.Block.obtain(workspace, 'strings_braces_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'strings_braces_with_item');
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
                .appendField('{}');
        } else {
            this.appendDummyInput('LEFT')
                .appendField('{')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(':');
                }
                var input = this.appendValueInput('ADD' + i);
            }
            this.appendDummyInput('RIGHT')
                .appendField('}')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['strings_braces_with_container'] = {
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

Blockly.Blocks['strings_braces_with_item'] = {
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

Blockly.Blocks['strings_end'] = {
    /**
     * Block for checking if a string contains another string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;

        this.appendDummyInput()
            .appendField('end=');
        //this.appendDummyInput()
        //    .appendField('\'');
        //this.appendDummyInput("END_PARAM")
        //    .appendField(new Blockly.FieldTextInput(''), 'END');
        //this.appendDummyInput()
        //    .appendField('\'');
        this.appendValueInput("END")
            .setCheck([Blockly.Type.NONE, Blockly.Type.STR]);
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.STR);
        this.setHelpUrl('');
        this.setTooltip('');
    }
};

Blockly.Blocks['strings_from_future_import'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("from __future__ import print_function");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Hue.STR);
        this.setTooltip('Imports the Python3 print functions.');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['strings_join'] = {
    /**
     * Block for checking if a string contains another string.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STR;

        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.'); // (Blockly.Blocks.dot());
        this.appendDummyInput()
            .appendField('join');
        this.appendDummyInput()
            .appendField('('); // (Blockly.Blocks.parens_('left'));
        this.appendValueInput('ITERABLE')
            .setCheck([Blockly.Type.STR, Blockly.Type.LIST, Blockly.Type.TUPLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')'); // Blockly.Blocks.parens_('right'));
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.STR);
        this.setHelpUrl('');
        this.setTooltip('');
    }
};