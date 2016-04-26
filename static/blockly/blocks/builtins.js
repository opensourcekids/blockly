/**
 * Created by anthony on 6/12/15.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.builtins');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

Blockly.Blocks.builtins.num_blocks = 0;
Blockly.Blocks.builtins.counter = 0;


Blockly.Blocks['builtins_length'] = {
    /**
     * Block for list length.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.INT;

        // Block parts.
        this.appendDummyInput()
            .appendField('len');
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput('VALUE')
            .setCheck([Blockly.Type.LIST, Blockly.Type.TUPLE, Blockly.Type.DICT, Blockly.Type.STR,Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");

        // Block look.
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.INTEGER);

        // User items.
        this.setHelpUrl('https://docs.python.org/3.5/library/functions.html#len');
        this.setTooltip("Return the length (the number of items) of an object.");
    }
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#66q9zi
 * @type {{init: Function}}
 */
Blockly.Blocks['builtins_type'] = {
    init: function () {
        this.block_type = Blockly.Type.TYPE;

        this.appendDummyInput()
            .appendField('type');
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput('VALUE')
            .setCheck(null)
        this.appendDummyInput()
            .appendField(")");
        this.setOutput(true, Blockly.Type.STR);
        this.setInputsInline(true);
        this.setColour(Blockly.Hue.NONE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['builtins_none'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('None');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.NONE);
        this.setColour(Blockly.Hue.NONE);

        this.setHelpUrl('https://docs.python.org/3.5/library/functions.html#chr');
        this.setTooltip(
            "The sole value of the type NoneType. None is frequently used to represent the absence " +
            "of a value, as when default arguments are not passed to a function. Assignments to None " +
            "are illegal and raise a SyntaxError."
        );
    }
};

Blockly.Blocks['builtins_chr'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('chr');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput("TYPE")
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField(')');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        this.setColour(Blockly.Hue.STR);

        this.setHelpUrl('https://docs.python.org/3.5/library/constants.html#None');
        this.setTooltip(
            "Return the string representing a character whose Unicode code point is the integer i. " +
            "For example, chr(97) returns the string 'a'. This is the inverse of ord()."
        );
    }
};

Blockly.Blocks['builtins_ord'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('ord');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('VALUE')
            .setCheck(Blockly.Type.STR);
        this.appendDummyInput()
            .appendField(')');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setColour(Blockly.Hue.INTEGER);

        this.setHelpUrl('https://docs.python.org/3.5/library/functions.html#ord');
        this.setTooltip(
            "From a single string character, return an integer representing the Unicode code point of that character. " +
            "For example, ord('a') returns the integer 97. This is the inverse of chr()."
        );

    },
    // onchange: function () {
    //     if (this.getChildren().length != 0) {
    //         var d = this.getChildren()[0].inputList[0];
    //         var blockA = this.getInputTargetBlock('VALUE');
    //         if (!null) {
    //             var newStr = blockA.getFieldValue('TEXT');
    //             blockA.setFieldValue(newStr[0], 'TEXT');
    //         }
    //     }
    // }
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ea24np
 * @type {{init: Function}}
 */
Blockly.Blocks['builtins_range'] = {
    init: function () {

        this.block_type = Blockly.Type.LIST;

        this.appendDummyInput()
            .appendField("range");
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("START")
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("STOP")
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("STEP")
            .setCheck(Blockly.Type.INT);
        this.appendDummyInput()
            .appendField(")");
        //this.itemCount_ = 1;
        //this.updateShape_();
        this.setInputsInline(true);
        this.setColour(Blockly.Hue.LIST)
        this.setOutput(true, this.block_type);
        this.setTooltip('');

        this.setHelpUrl('https://docs.python.org/3.5/library/functions.html#func-range');
        this.setTooltip("");
    }
};

Blockly.Blocks['builtins_id'] = {
    init: function () {

        this.block_type = Blockly.Type.INT;

        this.appendDummyInput()
            .appendField('id');
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("ITEM")
            .setCheck(Blockly.Type.NULL);
        this.appendDummyInput()
            .appendField(")");

        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['builtins_help'] = {
    init: function () {

        this.block_type = Blockly.Type.STR;

        this.appendDummyInput()
            .appendField('help');
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("ITEM")
            .setCheck(Blockly.Type.NULL);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.STR);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['builtins_range_with'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
       //console.log("START range init");
        this.block_type = Blockly.Type.LIST;

        this.setColour(Blockly.Hue.LIST);
        this.appendDummyInput()
            .appendField("range");
        this.itemCount_ = 1;
        this.updateShape_();
        this.setInputsInline(true);
        this.setColour(Blockly.Hue.LIST);
        this.setOutput(true, this.block_type);
        this.my_mutator = new Blockly.Mutator(['builtins_range_with_item']);
        this.setMutator(this.my_mutator);
        this.setTooltip('');
        Blockly.Blocks.builtins.num_blocks = this.itemCount_;

        this.setHelpUrl('https://docs.python.org/3.5/library/functions.html#func-range');
        this.setTooltip("An immutable sequence type from start to end number (not inclusive), by steps size.");

       //console.log("END range init");
    },
    onchange: function () {
        Blockly.Blocks.builtins.num_blocks = this.itemCount_;
    },
    /**
     * Create XML to represent indices.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
       //console.log("mutationToDom");
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
       //console.log("domToMutation");
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
       //console.log("decompose");
        var containerBlock = Blockly.Block.obtain(workspace, 'builtins_range_with_container');
        containerBlock.initSvg();

        Blockly.Blocks.builtins.num_blocks = this.itemCount_;
        //console.log("Decompose. Blocks = " + Blockly.Blocks.builtins.num_blocks);

        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Blocks.builtins.counter = i + 1;
            var itemBlock = Blockly.Block.obtain(workspace, 'builtins_range_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        Blockly.Blocks.builtins.counter = 0;

        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {

       //console.log("compose");
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
       //console.log("save connection");

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
       //console.log("updateShape");
        // Delete everything.
        if (this.getInput('EMPTY')) {
            //this.removeInput('EMPTY');
        } else {
            this.removeInput('LEFT', true);
            this.removeInput('RIGHT', true);
            this.removeInput('COMMA1', true);
            this.removeInput('COMMA2', true);
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            //this.appendDummyInput('EMPTY')
            //    .appendField('');
        } else if(this.itemCount_ == 1){
            this.appendDummyInput('LEFT')
                .appendField("(")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(")")
                .setAlign(Blockly.ALIGN_LEFT);
        } else if(this.itemCount_ == 2){
            this.appendDummyInput('LEFT')
                .appendField("(")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
            this.appendDummyInput('COMMA1')
                .appendField(",")
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 1);
            this.appendDummyInput('RIGHT')
                .appendField(")")
                .setAlign(Blockly.ALIGN_LEFT);
        } else if(this.itemCount_ >= 3){
            this.appendDummyInput('LEFT')
                .appendField("(")
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(Blockly.Type.INT);
            this.appendDummyInput('COMMA1')
                .appendField(",")
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 1)
                .setCheck(Blockly.Type.INT);
            this.appendDummyInput('COMMA2')
                .appendField(",")
                .setAlign(Blockly.ALIGN_CENTRE);
            this.appendValueInput('ADD' + 2)
                .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(")")
                .setAlign(Blockly.ALIGN_LEFT);
        } else {
           //console.log("ELSE");
        }
    }
};

Blockly.Blocks['builtins_range_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
       //console.log('builtins_range_with_container');
        this.setColour(Blockly.Hue.LIST);
        this.appendDummyInput()
            .appendField('range');

        this.appendStatementInput('STACK');

        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['builtins_range_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
       //console.log('builtins_range_with_item');
        this.setColour(Blockly.Hue.INTEGER);
        var which = 0;
        if (Blockly.Blocks.builtins.counter == 0){
            which = Blockly.Blocks.builtins.num_blocks + 1;
        } else {
            which = Blockly.Blocks.builtins.counter;
        }

        //console.log(this.getConnections_());
        if (which == 0){  //Blockly.Blocks.builtins.num_blocks
           //console.log('=0');
            this.appendDummyInput()
                .appendField('blah');
        } else if (which == 1){
            //console.log(this);
           //console.log('=1');
            this.appendDummyInput()
                 .appendField('start index');
        } else if (which == 2){
           //console.log('=2');
            this.appendDummyInput()
                .appendField('end index');
        } else if (which == 3) {
           //console.log('=3');

            this.appendDummyInput()
                .appendField('step size');
        } else {
           //console.log('=ELSE');
        }
        //this.appendDummyInput()
        //    .appendField('index');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['builtins_eval'] = {
    init: function () {
        this.block_type = Blockly.Type.TYPE;

        this.appendDummyInput()
            .appendField('eval');
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput('VALUE')
            .setCheck(null);
        this.appendDummyInput()
            .appendField(")");
        this.setOutput(true, Blockly.Type.STR);
        this.setInputsInline(true);
        this.setColour();
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['builtins_format'] = {
    init: function () {
        this.block_type = Blockly.Type.STR;

        this.appendDummyInput()
            .appendField('format');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('VALUE')
            .setCheck(null);
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput('SPEC')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setOutput(true, this.block_type);
        this.setInputsInline(true);
        this.setColour(Blockly.Hue.STR);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};