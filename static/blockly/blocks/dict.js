/**
 * Created by anthony on 5/20/15.
 */

'use strict';

goog.provide('Blockly.Blocks.dict');

goog.require('Blockly.Blocks');


Blockly.Blocks.dict.HUE = Blockly.Hue.DICT;

Blockly.Blocks.dict.keys = [];

Blockly.Blocks['py_dict_item'] = {
    init: function () {
        this.block_type = Blockly.Type.KEYVALUE;

        this.setHelpUrl('');
        this.setColour(Blockly.Hue.KEYVAL);
        this.appendValueInput('KEY')
            .setCheck([Blockly.Type.STR, Blockly.Type.INT])
            .appendField("key");
        this.appendDummyInput()
            .appendField(":");
        this.appendValueInput('VALUE')
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.KEYVALUE);
        this.setTooltip('');
        this.input_keys = [];
    },
    onchange: function () {
    },

    getKey: function () {

        return Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_MEMBER);
    },

    getKeyType: function () {
        return this.getChildren()[1].block_type;
    },

    getValue: function () {
        return this.getChildren()[0].getFieldValue('VALUE');
    },

    getValueType: function () {
        //console.log("in getValueType");
        //console.log(this.getChildren()[1].block_type);
        return this.getChildren()[1].block_type;
    }
};

Blockly.Blocks['dict_create_empty'] = {
    /**
     * Block for creating an empty dictionary.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.DICT;

        this.setHelpUrl("");
        this.setColour(Blockly.Blocks.dict.HUE);
        this.setOutput(true, this.block_type);
        this.appendDummyInput()
            .appendField("{ }");
        this.setTooltip("");
    }
};

Blockly.Blocks['dict_create_with'] = {
    /**
     * Block for creating a dictionary with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.DICT;

        this.setHelpUrl("");
        this.setColour(Blockly.Blocks.dict.HUE);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['dict_create_with_item']));
        this.setTooltip("");
    },
    /**
     * Create XML to represent dictionary inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the dictionary inputs.
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
        var containerBlock =
            Blockly.Block.obtain(workspace, 'dict_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'dict_create_with_item');
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
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
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
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
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
                .appendField('{ }');
        } else {
            this.appendDummyInput('LEFT')
                .appendField("{")
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                var input = this.appendValueInput('ADD' + i).setCheck(Blockly.Type.KEYVALUE);
            }
            this.appendDummyInput('RIGHT')
                .appendField("}")
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['dict_create_with_container'] = {
    /**
     * Mutator block for dictionary container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.dict.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DICT_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.DICT_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['dict_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.dict.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DICT_CREATE_WITH_ITEM_TITLE)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICT_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};


Blockly.Blocks['dict_methods_vki'] = {
    init: function () {
        this.block_type = Blockly.Type.LIST;
        this.appendDummyInput()
            .appendField('');
        this.appendValueInput('DICT')
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['values', '.values()'], ['keys', '.keys()'], ['items', '.items()']]), 'MENU');
        this.appendDummyInput()
            .appendField("(");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.LIST);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};


/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mvxko3
 * @type {{init: Function}}
 */
Blockly.Blocks['dict_value_from_key'] = {
    init: function () {

        this.block_type = 'none';
        this.keys = [['', 'none']];

        var dropdown = new Blockly.FieldDropdown(this.keys);

        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".get");
        this.appendDummyInput()
            .appendField("(");
        this.appendDummyInput('DDL')
            .appendField(dropdown, 'NAME');
        this.appendDummyInput(')')
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, "none");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');

        this.input_dict = null;
        this.input_keys = [];
    },

    changeDropdown: function (parent, enclosing) {

        var children = parent.getChildren();
      //  console.log(children);

        var keys = [];
        var ks = [];
        for (var c = 0; c < children.length; c++) {
            var k = children[c].getKey();
            ks.push(String(k));
            keys.push([String(k), String(k)]);
        }

        if (String(ks) != String(this.input_keys)) {
            this.replaceDropdown(enclosing, keys);
            this.input_keys = [];
            for (var c = 0; c < children.length; c++) {
                var k = children[c].getKey();
                this.input_keys.push(String(k));
            }
        }
    },

    replaceDropdown: function (enclosing, newlist) {
        this.removeInput(enclosing, true);
        this.removeInput('DDL', true);
        this.appendDummyInput('DDL')
            .appendField(new Blockly.FieldDropdown(newlist), 'NAME');
        if (enclosing == ')') {
            this.appendDummyInput(enclosing)
                .appendField(")");
        } else {
            this.appendDummyInput(enclosing)
                .appendField("]");
        }
    },

    onchange: function () {

        var func_children = this.getChildren()[0];
         //console.log(func_children);
        if (func_children == undefined) {
            //console.log("IF");
            this.replaceDropdown(')', [['', 'NONE']]);
            this.input_keys = [];
            this.block_type = Blockly.Type.NONE;
            this.setColour();

        } else if (func_children.type == 'dict_create_with') {
            // console.log(func_children.getChildren().length != 0);
            if (func_children.getChildren().length != 0) {
                this.changeDropdown(func_children, ')');
            } else {
                this.replaceDropdown(')', [['', 'NONE']]);
                this.input_keys = [];
            }
            this.block_type = Blockly.Type.DICT;
            this.setColour(func_children.getColour());

        } else if (func_children.type == 'variables_get' && this.getInputTargetBlock('DICT').block_type == 'Dict') {

            // Get the dictionary attached to the variable_set block.
            var dictionary = this.getInputTargetBlock('DICT').getFirstSuperiorSet(this.getInputTargetBlock('DICT')).childBlocks_[0];

            var key;
            var value;
            var dict_children = dictionary.getChildren();
            for (var i = 0; i < dict_children.length; i++) {
                //console.log("line 463: dictionary children: ");
                //console.log(dict_children[i]);
                key = dict_children[i].getKey();
                if (key == this.getFieldValue("NAME")) {
                    value = dict_children[i].getValueType();
                    this.block_type = value;
                    this.setColour(dict_children[i].getInputTargetBlock("VALUE").getColour());
                    break;
                }
            }
            if (dict_children.length != 0) {
                this.changeDropdown(dictionary, 'bracket');
            } else {
                this.replaceDropdown('bracket', [['', 'NONE']]);
                this.input_keys = [];
            }

        }
    }
};


Blockly.Blocks['dict_key_value'] = {
    init: function () {

        this.block_type = 'none';
        this.keys = [['', 'none']];

        var dropdown = new Blockly.FieldDropdown(this.keys);

        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("[");
        this.appendDummyInput('DDL')
            .appendField(dropdown, 'NAME');
        this.appendDummyInput('bracket')
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, "none");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');

        this.input_dict = null;
        this.input_keys = [];

    },

    changeDropdown: function (parent, enclosing) {
        // console.log(enclosing);
        var children = parent.getChildren();
        var keys = [];
        var ks = [];
        for (var c = 0; c < children.length; c++) {
            var k = children[c].getKey();
            ks.push(String(k));
            keys.push([String(k), String(k)]);
        }

        if (String(ks) != String(this.input_keys)) {

            this.replaceDropdown(enclosing, keys);

            this.input_keys = [];
            for (var c = 0; c < children.length; c++) {
                var k = children[c].getKey();
                this.input_keys.push(String(k));
            }
        }
    },

    replaceDropdown: function (enclosing, newlist) {
        this.removeInput(enclosing, true);
        this.removeInput('DDL', true);
        this.appendDummyInput('DDL')
            .appendField(new Blockly.FieldDropdown(newlist), 'NAME');
        if (enclosing == 'bracket') {
            this.appendDummyInput(enclosing)
                .appendField("]");
        } else {
            this.appendDummyInput(enclosing)
                .appendField(")");
        }
    },

    onchange: function () {

        var func_children = this.getChildren()[0];
        if (func_children == undefined) {
            // console.log("IF");
            this.replaceDropdown('bracket', [['', 'NONE']]);
            this.input_keys = [];
            this.block_type = Blockly.Type.NONE;
            this.setColour();

        } else if (func_children.type == 'dict_create_with') {
            // console.log(func_children.getChildren().length != 0);
            if (func_children.getChildren().length != 0) {
                this.changeDropdown(func_children, 'bracket');
            } else {
                this.replaceDropdown('bracket', [['', 'NONE']]);
                this.input_keys = [];
            }
            this.block_type = Blockly.Type.DICT;
            this.setColour(func_children.getColour());

        } else if (func_children.type == 'variables_get' && this.getInputTargetBlock('DICT').block_type == 'Dict') {

            // Get the dictionary attached to the variable_set block.
            var dictionary = this.getInputTargetBlock('DICT').getFirstSuperiorSet(this.getInputTargetBlock('DICT')).childBlocks_[0];

            var key;
            var value;
            var dict_children = dictionary.getChildren();
            for (var i = 0; i < dict_children.length; i++) {
                //console.log("line 463: dictionary children: ");
                //console.log(dict_children[i]);
                key = dict_children[i].getKey();
                if (key == this.getFieldValue("NAME")) {
                    value = dict_children[i].getValueType();
                    this.block_type = value;
                    this.setColour(dict_children[i].getInputTargetBlock("VALUE").getColour());
                    break;
                }
            }
            if (dict_children.length != 0) {
                this.changeDropdown(dictionary, 'bracket');
            } else {
                this.replaceDropdown('bracket', [['', 'NONE']]);
                this.input_keys = [];
            }
        }
        //console.log("this.type = " + this.block_type);
    }
};


Blockly.Blocks['dict_set_key_value'] = {
    init: function () {

        this.block_type = Blockly.Type.DICT;
        this.keys = [['', 'none']];
        this.last_value = null;

        // All types except keyvalue
        var x = Blockly.Type.ALL;
        var i = x.indexOf(Blockly.Type.KEYVALUE);
        x.splice(i, 1);
        this.check_types = x;

        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("[");
        this.appendDummyInput('DDL')
            .appendField(new Blockly.FieldDropdown(this.keys), 'NAME');
        this.appendDummyInput(']')
            .appendField(']')
            .appendField("==");
        this.appendValueInput("VALUE")
            .setCheck(this.check_types);
        this.setColour(Blockly.Hue.DICT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('');

        this.input_dict = null;
        this.input_keys = [];

    },
    /**
     * This method is responsible for finding the attached dictionary's key:value pairs for replacement.
     * It is called from onChange.
     * @param parent This dictionary attached to this block.
     * @param enclosing The new values for the dropdown menu.  These must be in [['a', 'A'], ['b', 'B']] format.
     */
    changeDropdown: function (parent, enclosing) {

        //console.log(parent);
        var children = parent.getChildren();
        var keys = [];
        var ks = [];
        for (var c = 0; c < children.length; c++) {
            var k = children[c].getKey();
            ks.push(String(k));
            keys.push([String(k), String(k)]);
        }

        if (String(ks) != String(this.input_keys)) {

            // Call the method for actually changing the dropdown text.
            Blockly.Blocks.dict.replaceDropdown(enclosing, this, keys);

            this.input_keys = [];
            for (var c = 0; c < children.length; c++) {
                var k = children[c].getKey();
                this.input_keys.push(String(k));
            }
        }
    },


    /**
     * This method executes when the block changes.
     * Here the dropdown menu needs to update whenever the attached dictionary key names change.  If the attached
     * dictionary is a variable, then we must search for the nearest variable_set in order to determine if there
     * have been changes.
     */
    onchange: function () {

        // Get the dictionary block attached to the first input.
        var func_children = this.getInputTargetBlock('DICT');
        //console.log(func_children);
        // Save the block attached to the input "Value".  This will be used later to reattach the block to the input.
        this.last_value = this.getInputTargetBlock('VALUE');

        /**
         * If there is no dictionary attached, then we want the keys drop down to be empty.
         */
        if (func_children == undefined || func_children == null) {
            if (this != null) {
                Blockly.Blocks.dict.replaceDropdown(']', this, this.keys);      // Call method to remove dropdown items.
                this.input_keys = [];
            }
        /**
         * The dictionary attached to this block is not a variable.  It is a raw dictionary.
         */
        } else if (func_children.type == 'dict_create_with') {
            // Find the keys.
            if (func_children.getChildren().length != 0) {                  // The dictionary is not empty.
                this.changeDropdown(func_children, ']');                    // Call method to find the keys and put them in the dropdown.
            } else {                                                        // The dictionary is empty
                Blockly.Blocks.dict.replaceDropdown(']', this, this.keys);  // Empty the dropdown.
                this.input_keys = [];
            }
        /**
         * The dictionary attached to this block is variable.
         */
        } else if (func_children.type == 'variables_get' && this.getInputTargetBlock('DICT').block_type == 'Dict') {
            //console.log("in the correct else if");
            // Get the dictionary attached to the variable_set block.
            var dictionary = this.getInputTargetBlock('DICT').getFirstSuperiorSet(this.getInputTargetBlock('DICT')).childBlocks_[0];
            //console.log(dictionary);
            // Get the key:value pairs attached to that dictionary.
            var dict_childen = dictionary.getChildren();
            // Find the keys.
            if (dict_childen.length != 0) {                                 // The dictionary is not empty.
                this.changeDropdown(dictionary, ']');                       // Call method to find the keys and put them in the dropdown.
            } else {                                                        // The dictionary is empty.
                Blockly.Blocks.dict.replaceDropdown(']', this, this.keys);  // Call method to remove dropdown items.
                this.input_keys = [];
            }
        }
        /**
         * This is where the 'VALUE' block gets reattached. It was disconnected when the input 'VALUE'
         * was deleted earlier.
         *
         * See https://groups.google.com/forum/#!topic/blockly/vBMMNIyTr6Q for info on how to reconnect blocks.
         */
        if (this.last_value != null && this.last_value.getParent() != this) {
            this.getInput("VALUE").connection.connect(this.last_value.outputConnection);
        }
    }
};

/**
 *
 * @param enclosing The type of enclosing character (i.e., ']', ')').
 * @param block The block containing the dropdown menu to replace.
 * @param newValues The new values for the dropdown menu.  These must be in [['a', 'A'], ['b', 'B']] format.
 */
Blockly.Blocks.dict.replaceDropdown = function (enclosing, block, newValues) {
        /**
         * Remove the inputs after the dropdown from farthest away to closest and then the remove the dropdown.
         */
        block.removeInput('VALUE', true);
        block.removeInput(enclosing, true);
        block.removeInput('DDL', true);

        // Add the dropdown dummy input and the dropdown back with the new dropdown text values.
        block.appendDummyInput('DDL')
            .appendField(new Blockly.FieldDropdown(newValues), 'NAME');

        /**
         * This case handles dictionary functions that have brackets around them.
         */
        if (enclosing == ']') {
            block.appendDummyInput(enclosing)
                .appendField("]")
                .appendField(Blockly.Blocks.equals_('equals'));
            block.appendValueInput('VALUE')
                .setCheck(block.check_types);
            /**
             * This case handles dictionary functions that have parentheses around them.
             */
        } else {
            block.appendDummyInput(enclosing)
                .appendField(")")
                .appendField(Blockly.Blocks.equals_('equals'));
            block.appendValueInput('VALUE')
                .setCheck(block.check_types);
        }
};


Blockly.Blocks['dict_del_key_value'] = {
    init: function () {

        this.block_type = 'Dict';
        this.keys = [['', 'none']];

        var dropdown = new Blockly.FieldDropdown(this.keys)
        this.setColour(Blockly.Blocks.dict.HUE);

        this.appendDummyInput()
            .appendField('del');
        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("[");
        this.appendDummyInput('DDL')
            .appendField(dropdown, 'NAME');
        this.appendDummyInput('bracket')
            .appendField("]");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');

        this.input_keys = [];
    },

    changeDropdown: function (parent, enclosing) {
        // console.log(enclosing);
        var children = parent.getChildren();
        var keys = [];
        var ks = [];
        for (var c = 0; c < children.length; c++) {
            var k = children[c].getKey();
            ks.push(String(k));
            keys.push([String(k), String(k)]);
        }

        if (String(ks) != String(this.input_keys)) {

            this.replaceDropdown(enclosing, keys);

            this.input_keys = [];
            for (var c = 0; c < children.length; c++) {
                var k = children[c].getKey();
                this.input_keys.push(String(k));
            }
        }
    },

    replaceDropdown: function (enclosing, newlist) {
        this.removeInput(enclosing, true);
        this.removeInput('DDL', true);
        this.appendDummyInput('DDL')
            .appendField(new Blockly.FieldDropdown(newlist), 'NAME');
        if (enclosing == 'bracket') {
            this.appendDummyInput(enclosing)
                .appendField("]");
        } else {
            this.appendDummyInput(enclosing)
                .appendField(")");
        }
    },

    onchange: function () {

        var func_children = this.getChildren()[0];
        if (func_children == undefined) {
            // console.log("IF");
            this.replaceDropdown('bracket', [['', 'NONE']]);
            this.input_keys = [];

        } else if (func_children.type == 'dict_create_with') {
            // console.log(func_children.getChildren().length != 0);
            if (func_children.getChildren().length != 0) {
                this.changeDropdown(func_children, 'bracket');
            } else {
                this.replaceDropdown('bracket', [['', 'NONE']]);
                this.input_keys = [];
            }

        } else if (func_children.type == 'variables_get' && this.getInputTargetBlock('DICT').block_type == 'Dict') {

            //var dictionary = this.getInputTargetBlock('DICT').var_obj;
            var dictionary = this.getInputTargetBlock('DICT').getFirstSuperiorSet(this.getInputTargetBlock('DICT')).childBlocks_[0];

            var dict_childen = dictionary.getChildren();

            if (dict_childen.length != 0) {
                this.changeDropdown(dictionary, 'bracket');
            } else {
                this.replaceDropdown('bracket', [['', 'NONE']]);
                this.input_keys = [];
            }
        }
    }
};

Blockly.Blocks['dict_key_in_not_in'] = {
    init: function () {

        this.block_type = Blockly.Type.BOOL;

        this.appendValueInput("KEY")
            .setCheck(this.check_types);
        this.appendDummyInput()
            .appendField("in");
        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.BOOL);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dict_copy'] = {
    init: function () {

        this.block_type = Blockly.Type.DICT;

        this.appendDummyInput()
            .appendField('');

        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);

        this.appendDummyInput()
            .appendField('.copy()');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.DICT);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dict_clear'] = {
    init: function () {

        this.block_type = Blockly.Type.NONE;

        this.appendDummyInput()
            .appendField('');
        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.clear()');
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.NONE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dict_key_value_opt'] = {
    init: function () {

        this.block_type = Blockly.Type.NONE;
        this.keys = [['', 'none']];


        this.appendValueInput("DICT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("[");
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.STR, Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('bracket')
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.NONE);
        this.setTooltip('');
        this.setHelpUrl('');

        this.input_dict = null;
        this.input_keys = [];

    }
};