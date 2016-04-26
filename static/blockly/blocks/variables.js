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
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');

Blockly.Blocks.variables.my_vars = [];
Blockly.Blocks.variables.my_vars_vals = [];
Blockly.Blocks.variables.my_vars_type = [];
Blockly.Blocks.variables.names = [];
Blockly.Blocks.variables.ids = [];

Blockly.Blocks.variables.load = true;

Blockly.Blocks['variables_get'] = {
    /**
     * Block for variable getter.
     * @this Blockly.Block
     */
    init: function () {
        // console.log("BEGIN-- variables_get.init");

        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);

        this.appendDummyInput()
            .appendField(Blockly.Msg.VARIABLES_GET_TITLE)
            .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
            .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setOutput(true, 'none');
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        this.contextMenuType_ = 'variables_set';
        this.setInputsInline(true);
        this.setColour(Blockly.Hue.NONE);
        this.block_type = 'none';
        this.var_obj = null;
        this.var_setter = null;
        this.has_drop = false;

        // console.log("END-- variables_get.init");
    },

    /**
     * A method for finding the outermost surrounding block of this block.
     * @param block The block for which you want to get the outermost surrounding.
     * @returns {Blockly.Block} The outermost block surrounding the initial block.
     */
    getOuterSurroundBlock: function(block){
        var b = block;
        var surroundBlock = b.getSurroundParent();

        // There is no surrounding block so return the block entered.
        if (surroundBlock === null){
            return b;

        }
        // If there is a surrounding block, get that blocks surrounding block.
        else {
            var out = this.getOuterSurroundBlock(surroundBlock);
            return out;
        }
    },

    /**
     * A method for finding the variable_set block that is most immediately above this block.
     * @param block_in The block for which you want to find the most immediately superior variable_set.
     * @returns {Blockly.block}
     */
    getFirstSuperiorSet: function(block_in){
        var block = block_in;
        var prevBlock = block;
        var newBlock = block.getParent();

        if (newBlock != null) {
            if (newBlock.type == 'variables_set' || newBlock.type == 'numbers_something_equals_tovar'){ //&& newBlock.getFieldValue('VAR') == this.getFieldValue('VAR')) {
                //console.log("newBlock.type = " + newBlock.type);

                if (newBlock.getFieldValue('VAR') == this.getFieldValue('VAR')) {
                    //console.log(newBlock.getFieldValue('VAR') + " nearest set variable blocktype = " + newBlock.block_type);
                    this.setColour(newBlock.getColour());
                    this.changeOutput(newBlock.block_type);
                    this.block_type = newBlock.block_type;

                    return newBlock;

                } else {

                    var out = this.getFirstSuperiorSet(newBlock);
                    return out;
                }
            } else {

                var out = this.getFirstSuperiorSet(newBlock);
                return out;
            }
        }else{
            // AJL: TODO: Decide if want variable to change color if not in program.
            this.setColour();
            this.changeOutput(Blockly.Type.NONE);

            return null;
        }
    },

    refresh: function (){
        if (this != null && this.workspace != null) {
            var top = this.workspace.getTopBlocks(false)[0];
            top.moveBy(0, 0);
        }
    },

    onchange: function (e) {
        // console.log("BEGIN-- variables_get.onchange");
        if (this.getFirstSuperiorSet(this) != null) {
            var nearest_setter = this.getFirstSuperiorSet(this);
            this.block_type = nearest_setter.block_type;
        }

        //this.refresh();
        //console.log(this.getParent());

        //this.workspace.fireChangeEvent();
        //console.log("variable_getter block_type is = " + this.block_type)
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

    /**
     * Add menu option to create getter/setter block for this setter/getter.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        var name = this.getFieldValue('VAR');
        option.text = this.contextMenuMsg_.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', this.contextMenuType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    }
};

Blockly.Blocks['variables_set'] = {
    /**
     * Block for variable setter.
     * @this Blockly.Block
     */
    init: function () {
        // console.log("BEGIN-- variables_set.init");
        var OPERATORS =
            [["=", 'EQUALS'],
                ["+=", 'ADD'],
                ["-=", 'MINUS'],
                ["*=", 'MULTIPLY'],
                ["/=", 'DIVIDE']];
        this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
        this.setColour(Blockly.Hue.NONE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM), 'VAR');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendValueInput('VALUE')
            .setCheck();
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = 'variables_get';
        this.block_type = 'none';
        this.last_child = null;

        // console.log("END-- variables_set.init");
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

    updateGetters: function(){

        var blocks = this.workspace.getAllBlocks();

        for (var i = 0, block; block = blocks[i]; i++) {
            // console.log(block.type);
            if (block.type == 'variables_get'){
                if (block.getFieldValue('VAR') == this.getFieldValue('VAR')){
                    block.block_type = this.block_type;
                    block.changeOutput(this.block_type);
                    block.setColour(this.getColour());
                }
            }

        }
        this.workspace.fireChangeEvent();
    },


    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @this Blockly.Block
     */
    onchange: function (e) {

        var blockA = this.getInputTargetBlock('VALUE');
        // console.log(blockA);

        // This block is necessary to allow the set_variable blocks to get the block_type of complex inner blocks.
        if (Blockly.Blocks.variables.load == true) {
            // Blockly.mainWorkspace.fireChangeEvent;  // AJL: removed ()
            this.workspace.fireChangeEvent;
            Blockly.Blocks.variables.load = false;
        }

        if (this.getInputTargetBlock('VALUE') != null) {
                this.block_type = blockA.block_type;
                this.setColour(blockA.getColour());

        } else {
            this.setColour();
            this.block_type = 'none';
            // this.workspace.fireChangeEvent; // AJL: removed ()
            this.workspace.fireChangeEvent;
        }

    },
    // TODO: AJL: Double check if used and remove if not used.
    mychange: function (myid) {
        // console.log("BEGIN-- variables_set.mychange");
        var blockA = this.getInputTargetBlock('VALUE');
        if (blockA != null) {

            var blockA_connections = blockA.getConnections_();
            var blockA_type = blockA_connections[0].check_;

            this.block_type = blockA.block_type;

            this.setColour(blockA.getColour());

            var my_var = Blockly.Blocks.variables.my_vars.indexOf(this.getFieldValue('VAR'));
            if (my_var == -1) {
                Blockly.Blocks.variables.my_vars.push(this.getFieldValue('VAR'));
                Blockly.Blocks.variables.my_vars_vals.push(blockA.getColour());
                Blockly.Blocks.variables.my_vars_type.push(blockA.block_type);

            } else {
                Blockly.Blocks.variables.my_vars_vals.splice(my_var, 1, blockA.getColour());
                Blockly.Blocks.variables.my_vars_type.splice(my_var, 1, blockA.block_type);
            } // end else
        }
        else {
            this.setColour();
        }
    },
    customContextMenu: Blockly.Blocks['variables_get'].customContextMenu

};
