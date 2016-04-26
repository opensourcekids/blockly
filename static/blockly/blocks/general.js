/**
 * Created by anthony on 6/12/15.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.general');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

Blockly.Blocks.general.num_blocks = 0;
Blockly.Blocks.general.number_times_through = 0;

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#usy3so
 * @type {{init: Function}}
 */

Blockly.Blocks.general.types = [Blockly.Type.STR,
    Blockly.Type.LIST,
    Blockly.Type.TUPLE,
    Blockly.Type.DICT,
    Blockly.Type.NONE];
Blockly.Blocks.general.type_colors = [Blockly.Hue.STR,
    Blockly.Hue.LIST,
    Blockly.Hue.TUPLE,
    Blockly.Hue.DICT,
    Blockly.Hue.NONE];


//Blockly.Blocks['general_length'] = {
//    /**
//     * Block for dictionary length.
//     * @this Blockly.Block
//     */
//    init: function () {
//        this.block_type = Blockly.Type.INT;
//
//        this.setHelpUrl(Blockly.Msg.DICT_LENGTH_HELPURL);
//        this.setColour(Blockly.Blocks.dict.HUE);
//        this.interpolateMsg(Blockly.Msg.DICT_LENGTH_TITLE,
//            ['VALUE',
//                [Blockly.Type.DICT, Blockly.Type.LIST],
//                Blockly.ALIGN_RIGHT],
//            Blockly.ALIGN_RIGHT);
//        this.setOutput(true, this.block_type);
//        this.setTooltip(Blockly.Msg.DICT_LENGTH_TOOLTIP);
//    }
//};
//
//Blockly.Blocks['general_id'] = {
//    /**
//     * Block for dictionary length.
//     * @this Blockly.Block
//     */
//    init: function () {
//        this.block_type = Blockly.Type.INT;
//
//        this.setHelpUrl(Blockly.Msg.DICT_LENGTH_HELPURL);
//        this.appendDummyInput()
//            .appendField('id');
//        this.appendDummyInput()
//            .appendField("(")
//            .setAlign(Blockly.ALIGN_RIGHT);
//        this.appendValueInput('ITEM')
//            .setCheck();
//        this.appendDummyInput()
//            .appendField(")")
//            .setAlign(Blockly.ALIGN_RIGHT);
//        this.setInputsInline(true);
//        this.setColour(Blockly.Type.INTEGER);
//        this.setOutput(true, this.block_type);
//        this.setTooltip(Blockly.Msg.DICT_LENGTH_TOOLTIP);
//    }
//};


Blockly.Blocks['general_comment'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(290);
        //this.appendValueInput("the_comment")
        //    .setCheck(Blockly.Type.STR)
        //    .appendField("#");
        this.appendDummyInput()
            .appendField("# ")
            .appendField(new Blockly.FieldTextInput(''), 'TEXT');
            //.appendField("\'");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['general_input'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.STR);
        this.appendDummyInput()
            .appendField('input');
        this.appendDummyInput()
            .appendField("(")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('INPUT')
            .setCheck(Blockly.Type.STR);
        this.appendDummyInput()
            .appendField(")")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setTooltip('');
    }
};

/**
 *
 * @type {{init: Function, onchange: Function}}
 */
Blockly.Blocks['general_getIndex'] = {
    init: function () {
        this.setColour(Blockly.Blocks.general.type_colors[4]);
        this.appendValueInput("STRING")
            .setCheck(Blockly.Blocks.general.types);
        this.appendDummyInput()
            .appendField("[")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('INDEX')
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField("]")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Blocks.general.types[4]);
        this.setTooltip("");
        this.setHelpUrl('http://www.example.com/');

        this.block_type = Blockly.Blocks.general.types[4];
    },
    onchange: function () {
        var block = this.getInputTargetBlock('STRING');
        if (block) {
            var index_item = this.getInputTargetBlock('INDEX');
            if (index_item) {
                var index_number = parseInt(index_item.getFieldValue('NUM'));
                var myCOLORS = new Array();
                myCOLORS[Blockly.Type.LONG] = Blockly.Hue.LONG;

                myCOLORS[Blockly.Type.NONE] = Blockly.Hue.NONE;
                myCOLORS[Blockly.Type.STR] = Blockly.Hue.STR;
                myCOLORS[Blockly.Type.BOOL] = Blockly.Hue.BOOL;
                myCOLORS[Blockly.Type.FLOAT] = Blockly.Hue.FLOAT;
                myCOLORS[Blockly.Type.INT] = Blockly.Hue.INTEGER;
                myCOLORS[Blockly.Type.DICT] = Blockly.Hue.DICT;
                myCOLORS[Blockly.Type.TUPLE] = Blockly.Hue.TUPLE;
                myCOLORS[Blockly.Type.LIST] = Blockly.Hue.LIST;

                if (block == null) {
                    this.setColour(Blockly.Blocks.general.type_colors[4]);
                    this.changeOutput(Blockly.Blocks.general.types[4]);
                    this.block_type = Blockly.Blocks.general.types[4];
                } else {
                    //console.log(block.block_type);
                    //var children = block.getChildren();
                    var type = block.block_type;

                    this.setColour(myCOLORS[type]);
                    this.changeOutput(type);
                    this.block_type = type;
                }
            }
        } else {
            this.setColour(Blockly.Hue.NONE);
            this.changeOutput(Blockly.Type.NONE);
            this.block_type = Blockly.Type.NONE;
        }
    }
};
Blockly.Blocks.general.getIndex =
    "Input 1 = String\nInput 2 = int\n" +
    "Finds the character at index given.  If blank it finds the first character.  The last character in the string is -1."

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#usy3so
 * @type {{init: Function}}
 */
Blockly.Blocks['general_getSub'] = {
    init: function () {
        this.setColour(Blockly.Hue.STR);
        this.appendValueInput("STRING")
            .setCheck([Blockly.Type.STR, Blockly.Type.LIST, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField("[")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('INDEX1')
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.colon_());
        this.appendValueInput('INDEX2')
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField("]")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        this.setTooltip("");
        this.setHelpUrl('http://www.example.com/');

        this.block_type = Blockly.Blocks.general.types[4];
    },

    onchange: function () {
        var block = this.getInputTargetBlock('STRING');
        // console.log(block);

        if (block == null) {
            this.setColour(Blockly.Blocks.general.type_colors[4]);
            this.changeOutput(Blockly.Blocks.general.types[4]);
            this.block_type = Blockly.Blocks.general.types[4];
        } else {
            var type = block.block_type;
            if (type == Blockly.Blocks.general.types[0]) {
                this.setColour(Blockly.Blocks.general.type_colors[0]);
                this.changeOutput(Blockly.Blocks.general.types[0]);
                this.block_type = Blockly.Blocks.general.types[0];
            } else if (type == Blockly.Blocks.general.types[1]) {
                this.setColour(Blockly.Blocks.general.type_colors[1]);
                this.changeOutput(Blockly.Blocks.general.types[1]);
                this.block_type = Blockly.Blocks.general.types[1];
            } else if (type == Blockly.Blocks.general.types[2]) {
                this.setColour(Blockly.Blocks.general.type_colors[2]);
                this.changeOutput(Blockly.Blocks.general.types[2]);
                this.block_type = Blockly.Blocks.general.types[2];
            } else if (type == Blockly.Blocks.general.types[3]) {
                this.setColour(Blockly.Blocks.general.type_colors[3]);
                this.changeOutput(Blockly.Blocks.general.types[3]);
                this.block_type = Blockly.Blocks.general.types[3];
            } else {
                this.setColour(Blockly.Blocks.general.type_colors[4]);
                this.changeOutput(Blockly.Blocks.general.types[4]);
                this.block_type = Blockly.Blocks.general.types[4];
            }
        }
    },
};
Blockly.Blocks.general.getSub =
    'Input 1 = String\nIndex 1 = int\nIndex 2 = int\n' +
'Finds the character(s) between the first index given and the last index given but does not include the last.\n' +
'If Index 1 is blank, the substring is everything from the begining up to, but not including, the letter at Index 2.\n' +
'If Index 2 is blank, the substring is everything from the Index 1 to the end.\n' +
'If both are blank it returns the entire string.  The last character in the string is -1.'


Blockly.Blocks['general_create_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('');
        this.setColour(Blockly.Hue.NONE);
        this.appendValueInput("INPUT")
            .setCheck([Blockly.Type.DICT, Blockly.Type.STR, Blockly.Type.LIST, Blockly.Type.TUPLE, Blockly.Type.NONE]);
        this.itemCount_ = 1;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.NONE);
        this.setMutator(new Blockly.Mutator(['general_create_with_item']));
        this.setTooltip(' ');
        Blockly.Blocks.general.num_items = this.itemCount_;
        Blockly.Blocks.general.num_blocks = this.itemCount_;
        Blockly.Blocks.general.number_times_through = 0;
        //this.workspace.fireChangeEvent();
        //this.moveBy(0, 0)
        this.counter = 0;
    },

    onchange: function () {
        //console.log("START GENERAL_CREATE_WITH.onchange");
        var block = this.getInputTargetBlock('INPUT');
        //console.log("the index block.type = " + block.type);
        //console.log("OR");
        //console.log(this.getChildren().length > 2);
        if (this.itemCount_ > 1) {
            if (block == null || block.block_type == Blockly.Type.NONE) {
                //console.log("IN BLOCK == null");
                this.setColour(Blockly.Type.NONE);
                this.changeOutput(Blockly.Hue.NONE);
                this.block_type = Blockly.Type.NONE;
            }
            else if (block.block_type == Blockly.Type.STR) {
                //console.log(block.block_type);
                this.setColour(Blockly.Hue.STR);
                this.changeOutput(Blockly.Type.STR);
                this.block_type = Blockly.Type.STR;
            }
            else if (block.block_type == Blockly.Type.LIST) {
                    //console.log(block.block_type);
                    this.setColour(Blockly.Hue.LIST);
                    this.changeOutput(Blockly.Type.LIST);
                    this.block_type = Blockly.Type.LIST;
            }
            else if (block.block_type == Blockly.Type.TUPLE) {
                //console.log(block.block_type);
                this.setColour(Blockly.Hue.TUPLE);
                this.changeOutput(Blockly.Type.TUPLE);
                this.block_type = Blockly.Type.TUPLE;
            }
            else {
            }
         }
        else {
            //console.log("ADD0");
            if (block == null || block.block_type == Blockly.Type.NONE) {
                //console.log("IN BLOCK == null");
                this.setColour(Blockly.Type.NONE);
                this.changeOutput(Blockly.Hue.NONE);
                this.block_type = Blockly.Type.NONE;
            }
            else if (block.type == "String") {
                //console.log(block.block_type);
                this.setColour(Blockly.Hue.STR);
                this.changeOutput(Blockly.Type.STR);
                this.block_type = Blockly.Type.STR;
                this.changeOutput(this.block_type);
            }
            else if (block.type == 'variables_get') {

                //console.log("Variable block_type = " + block.block_type);
                if (block.getFirstSuperiorSet(block) == null) {
                    console.log("Block is null.")
                }
                else if (block.block_type == Blockly.Type.LIST) {
                    //console.log("First Superior set = ");
                    //console.log(Blockly.Python.valueToCode(block.getFirstSuperiorSet(block), 'VALUE', Blockly.Python.ORDER_NONE));
                    var sup_set = block.getFirstSuperiorSet(block);
                    var the_var = block.getFirstSuperiorSet(block).getChildren();
                    var children = [];
                    //console.log(the_var);
                    for (var i=0; i < the_var.length; i++) {
                        if (the_var[i].type == "lists_create_with") {
                            //console.log("i = " + i);
                            //console.log(the_var[i].getChildren().length);
                            for (var j = 0; j < the_var[i].getChildren().length; j++) {
                                //console.log("j = " + j);
                                //console.log(the_var[i].getChildren()[j]);
                                children.push(the_var[i].getInputTargetBlock("ADD" + j));
                                //console.log(children);
                            }
                        }
                    }
                    //console.log(children);

                    //var set_var_list_child_index;
                    //for (var i = 0; i < the_var.length;i++) {
                    //    //console.log(block.getFirstSuperiorSet(block));
                    //    if (the_var[i].block_type == Blockly.Type.LIST){
                    //        set_var_list_child_index = the_var[i];
                    //        break;
                    //    }
                    //}
                    //console.log("the_var is " + the_var);
                    //var var_children = set_var_list_child_index.getChildren();
                    var add_0_value = Blockly.Python.valueToCode(this, 'ADD0', Blockly.Python.ORDER_NONE);
                    //this.setColour(var_children[add_0_value].getColour());
                    //this.block_type = var_children[add_0_value].block_type;
                    //this.changeOutput(var_children[add_0_value].block_type);
                    this.setColour(children[add_0_value].getColour());
                    this.block_type = children[add_0_value].block_type;
                    this.changeOutput(children[add_0_value].block_type);

                }
                else if (block.block_type == Blockly.Type.TUPLE) {
                    //console.log("First Superior set = ");
                    //console.log(Blockly.Python.valueToCode(block.getFirstSuperiorSet(block), 'VALUE', Blockly.Python.ORDER_NONE));
                    var the_var = block.getFirstSuperiorSet(block).getChildren();
                    var set_var_list_child_index;
                    for (var i = 0; i < the_var.length; i++) {
                        if (the_var[i].block_type == Blockly.Type.TUPLE) {
                            set_var_list_child_index = the_var[i];
                            break;
                        }
                    }
                    //console.log("the_var is " + the_var);
                    var var_children = set_var_list_child_index.getChildren();
                    var add_0_value = Blockly.Python.valueToCode(this, 'ADD0', Blockly.Python.ORDER_NONE);
                    this.setColour(var_children[add_0_value].getColour());
                    this.block_type = var_children[add_0_value].block_type;
                    this.changeOutput(var_children[add_0_value].block_type);

                }
                else if (block.block_type == Blockly.Type.STR) {
                    //console.log("in STRING");
                    this.setColour(Blockly.Hue.STR);
                    this.changeOutput(Blockly.Type.STR);
                    this.block_type = Blockly.Type.STR;

                }
                //console.log("index_block block_type = " + this.block_type);
            }
            else if (block.type == "List") {
                this.setColour(Blockly.Hue.LIST);
                this.changeOutput(Blockly.Type.LIST);
                this.block_type = Blockly.Type.LIST;

            }
            else {
                var type = block.block_type;
                this.setColour(Blockly.Blocks.general.type_colors[Blockly.Blocks.general.types.indexOf(type)]);
                this.changeOutput(type);
                this.block_type = type;

            }
        }
        if (this.counter < 2){
            this.workspace.fireChangeEvent();
        }
        Blockly.Blocks.general.num_blocks = this.itemCount_;
        this.counter += 1;
    },
    /**
     * Create XML to represent indices.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);

        return container;
    },
    /**
     * Parse XML to restore the indices.
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
        //console.log("START Decompose");
        //Blockly.Blocks.general.number_times_through = 1;
        var containerBlock = Blockly.Block.obtain(workspace, 'general_create_with_container');

        containerBlock.initSvg();

        //Blockly.Blocks.general.num_blocks = this.itemCount_;

        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {

                //Blockly.Blocks.general.num_blocks++;
                var itemBlock = Blockly.Block.obtain(workspace, 'general_create_with_item');
                itemBlock.initSvg();
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
        }
        //console.log("END Decompose");
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
            this.removeInput('RIGHT', true);
            this.removeInput('COLON1', true);
            this.removeInput('COLON2', true);
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField('');
        } else if(this.itemCount_ == 1){
            this.appendDummyInput('LEFT')
                .appendField("[")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0);

            this.appendDummyInput('RIGHT')
                .appendField("]")
                .setAlign(Blockly.ALIGN_LEFT);

        } else if(this.itemCount_ == 2){
            this.appendDummyInput('LEFT')
                .appendField("[")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0);

            this.appendDummyInput('COLON1')
                .appendField(Blockly.Blocks.colon_())
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 1);
            this.appendDummyInput('RIGHT')
                .appendField("]")
                .setAlign(Blockly.ALIGN_LEFT);
        } else if(this.itemCount_ >= 3){
            this.appendDummyInput('LEFT')
                .appendField("[")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0);

            this.appendDummyInput('COLON1')
                .appendField(Blockly.Blocks.colon_())
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 1);

            this.appendDummyInput('COLON2')
                .appendField(Blockly.Blocks.colon_())
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 2);

            this.appendDummyInput('RIGHT')
                .appendField("]")
                .setAlign(Blockly.ALIGN_LEFT);
        } else {
            //console.log("ELSE");
        }
    }
};

Blockly.Blocks['general_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.LIST);
        this.appendDummyInput()
            .appendField('slice');
        this.appendStatementInput('STACK');
        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['general_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput()
            .appendField('index');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['general_equals'] = {
    init: function () {
        this.setColour(Blockly.Blocks.general.type_colors[4]);
        this.appendValueInput("VAR");
        this.appendDummyInput()
            .appendField('=');
        this.appendValueInput('EQUALS');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.setHelpUrl('');

    }
};

Blockly.Blocks['general_block_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("'''");
    this.appendDummyInput()
        .appendField(" ")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "COMMENT_ON")
        .appendField(" check to turn off (don't forget other one)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};