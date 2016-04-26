/**
 * Created by anthony on 5/19/15.
 */

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
 * @fileoverview Generating Python for text blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.gpiozero');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

//goog.require('Blockly.Warning');

//Blockly.Blocks.gpiozero.HUE = 270;

var GPIOZERO_HUE = Blockly.Hue.GPIO;
var TYPE = Blockly.Type.GPIO;

var bcm_pins = [["2", "2"], ["3", "3"], ["4", "4"], ["17", "17"], ["18", "18"], ["27", "27"],
                ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"],
                ["5", "5"], ["6", "6"], ["12", "12"], ["13", "13"], ["19", "19"],
                ["16", "16"], ["26", "26"], ["20", "20"], ["21", "21"]];

var selected = [];

Blockly.Blocks['gpiozero_libraries'] = {
    init: function () {

        this.LIBS = [["LED", "LED"], ["PWMLED", "PWMLED"], ["RGBLED", "RGBLED"], ["Buzzer", "Buzzer"],
                     ["Button", "Button"], ["MotionSensor", "MotionSensor"], ["PiLiter", "PiLiter"],
                     ["MCP3004", "MCP3004"], ["MCP3008", "MCP3008"], ["MCP3204", "MCP3204"], ["MCP3208", "MCP3208"],
                     ["MCP3301", "MCP3301"], ["MCP3302", "MCP3302"], ["MCP3304", "MCP3304"]];


        this.setTooltip('Each item is one of the classses that may be imported from the GPIOZero library.');
        this.setHelpUrl('');
        this.appendDummyInput("LIB")
            .appendField(new Blockly.FieldDropdown(this.LIBS), "LIB");
        this.setInputsInline(true);
        this.setOutput('gpiozero_lib');

        this.setColour(GPIOZERO_HUE);
        this.block_type = 'gpiozero_lib';
    }
};

Blockly.Blocks['gpiozero_import'] = {
    init: function () {

        //this.LIBS = [["LED", "LED"], ["Button", "Button"], ["MotionSensor", "MotionSensor"]];


        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
        this.appendDummyInput('PRETEXT')
            .appendField("from gpiozero import");
        this.itemCount_ = 1;
        this.updateShape_();

        this.setMutator(new Blockly.Mutator(['gpiozero_create_import_item']));

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);


        this.setColour(GPIOZERO_HUE);
        this.block_type = TYPE;
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_create_import_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_create_import_item');
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
                this.getInput('LIB' + i).connection.connect(connections[i]);
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
            var input = this.getInput('LIB' + i);
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
            while (this.getInput('LIB' + i)) {
                this.removeInput('LIB' + i);
                if (i != 0) {
                    this.removeInput('COMMA' + i);
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
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0) {
                    this.appendDummyInput('COMMA' + i)
                        .appendField(',');
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                var input = this.appendValueInput('LIB' + i);//.setCheck("gpiozero_lib");
                //
                //
                //var v = Blockly.Blocks["gpiozero_libraries"];
                //                //.appendField(new Blockly.FieldDropdown(this.LIBS), 'LIBRARY' + i);
                //console.log(v);
                //input.value = v;
            }
        }
    }
};

Blockly.Blocks['gpiozero_create_import_container'] = {
    /**
     * Mutator block for container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(GPIOZERO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_TITLE_CONCAT);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_create_import_item'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(GPIOZERO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TITLE_ITEM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRINGS_CREATE_CONCAT_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_pins'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(bcm_pins), "pin_number");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpiozero_import_as'] = {

    init: function () {

        this.setColour(Blockly.Hue.GPIO);
        this.appendDummyInput()
            .appendField("from gpiozero import OutputDevice as Stepper");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setHelpUrl('');
        this.setTooltip('');
    }
};

Blockly.Blocks['gpiozero_import_stepper'] = {
    init: function () {

        //this.LIBS = [["LED", "LED"], ["Button", "Button"], ["MotionSensor", "MotionSensor"]];


        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
        this.appendDummyInput('PRETEXT')
            .appendField("from stepper import Stepper");
        
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);


        this.setColour(Blockly.Hue.STEPPER);
        this.block_type = Blockly.Type.STEPPER;
    },
}

Blockly.Blocks['gpiozero_stepper'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.STEPPER;

        // this.input_types = [Blockly.Type.INT];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs/#rgbled");
        this.setTooltip(
            "Create an LED object by passing in the pin number the LED is connected to.  " +
            "Initialization Options: LED(pin=None, active_high=True)"
        );

        this.setColour(Blockly.Hue.STEPPER);
        this.appendDummyInput('PRETEXT')
            .appendField("Stepper");
        this.appendDummyInput('LEFT')
            .appendField('(')
            .setAlign(Blockly.ALIGN_RIGHT);
        // this.appendValueInput('ADD' + 0)
        //     .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('RIGHT')
            .appendField(')')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

    }
};

Blockly.Blocks['gpiozero_stepper_forward_backward'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["forward", "forward"], ["backward", "backward"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs");
        this.setTooltip("Turn the stepper on or off.");

        this.setColour(Blockly.Hue.STEPPER);

        this.appendValueInput("STEPPER")
            .setCheck([Blockly.Type.STEPPER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('DELAY')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput('STEPS')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.block_type = TYPE;

        this.contextMenu = false;
    }
};


//==========BEGIN GPIOZERO LED section==========
Blockly.Blocks['gpiozero_led'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.LED;

        this.input_types = [Blockly.Type.INT, Blockly.Type.BOOL];

        // console.log("this.input_types = " + this.input_types);

        this.CLASSES = [["LED", "LED"], ["PWMLED", "PWMLED"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs/#led");
        this.setTooltip(
            "Create an LED object by passing in the pin number the LED is connected to.  " +
            "Initialization Options: LED(pin=None, active_high=True)"
        );

        this.setColour(Blockly.Hue.LED);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField(new Blockly.FieldDropdown(this.CLASSES), "CLASS");
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['gpiozero_led_create_item']));



        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_led_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_led_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 2) {
            new_itemCount = 2;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        var types = [Blockly.Type.LED, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 2) {
                    // console.log("DESTROY COMMA" + i);
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

        } else if (this.itemCount_ <= 2) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                // console.log("this.input_types = " + this.input_types);
                // console.log("i = " + i);
                if (i != 0 && i < 2) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                // console.log("this.input_types = " + this.input_types[i]);
                this.appendValueInput('ADD' + i)
                    .setCheck([this.input_types[i], Blockly.Type.NONE]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([this.input_types[0], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck([this.input_types[1], Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_led_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_create_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_rgbled'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.RGBLED;

        this.input_types = [Blockly.Type.INT, Blockly.Type.BOOL];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs/#rgbled");
        this.setTooltip(
            "Create an LED object by passing in the pin number the LED is connected to.  " +
            "Initialization Options: LED(pin=None, active_high=True)"
        );

        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput('PRETEXT')
            .appendField("RGBLED");
        this.appendDummyInput('LEFT')
            .appendField('(')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ADD' + 0)
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA' + 1)
            .appendField(',');
        this.appendValueInput('ADD' + 1)
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA' + 2)
            .appendField(',');
        this.appendValueInput('ADD' + 2)
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('RIGHT')
            .appendField(')')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

    }
};

Blockly.Blocks['gpiozero_led_on_off_toggle'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["on", "on()"], ["off", "off()"], ["toggle", "toggle()"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip("Turn the LED on or off or toggle it.");

        this.setColour(Blockly.Hue.LED);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.RGBLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.block_type = TYPE;

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_blink'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip(
            "Make the LED turn on and off repeatedly." + "\n" +
            "on_time - The amount of time (in seconds) for the LED to be on each iteration. Default: 1.\n" +
            "off_time - The amount of time(in seconds) for the LED to be off each iteration. Default: 1.\n" +
            "n - The number of iterations.None means infinite. Default: None.\n" +
            "background - If True, start a background thread to continue blinking and return immediately. If False, only" +
            "return when the blink is finished (warning: the default value of n will result in this method never returning)." +
            "Default: True."
        );

        this.setColour(Blockly.Hue.LED);

        //this.block_type = Blockly.Type.LED;
        this.input_types = [
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.BOOL,Blockly.Type.NONE]
        ];

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.RGBLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.itemCount_ = 2;
        this.appendDummyInput('METHOD')
            .appendField("blink");
        this.updateShape_();
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['gpiozero_led_blink_create_item']));

        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;


    },

    /**
     * Create XML to represent inputs.
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
        // console.log("IN DECOMPOSE");
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_led_blink_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_led_blink_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 4) {
             new_itemCount = 4;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck(this.input_types[i]).connection.connect(connections[i]);
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
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 4) {
                    //console.log("DESTROY COMMA" + i);
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        if (this.itemCount_ < 3) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(this.input_types[0]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck(this.input_types[1]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);

        } else if (this.itemCount_ <= 4) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0 && i < 4) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                this.appendValueInput('ADD' + i)
                    .setCheck(this.input_types[i]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(this.input_types[0]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck(this.input_types[1]);
            this.appendDummyInput('COMMA' + 2)
                .appendField(',');
            this.appendValueInput('ADD' + 2)
                .setCheck(this.input_types[2]);
            this.appendDummyInput('COMMA' + 3)
                .appendField(',');
            this.appendValueInput('ADD' + 3)
                .setCheck(this.input_types[3]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_led_blink_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_blink_create_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_pin'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.INT;
        this.setColour(Blockly.Hue.INTEGER);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("pin");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_on_off_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["on", "on"], ["off", "off"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.LED;
        this.setColour(Blockly.Hue.LED);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_islit'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("is_lit");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_value_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_value_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");


        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_pwmled_value_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.FLOAT;
        this.setColour(Blockly.Hue.FLOAT);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_pwmled_value_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");


        this.setColour(Blockly.Hue.FLOAT);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};


Blockly.Blocks['gpiozero_led_rgb_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.COLORS = [["red", ".red"], ["green", ".green"], ["blue", ".blue"]];

        this.block_type = Blockly.Type.FLOAT;
        this.setColour(Blockly.Hue.FLOAT);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.LED, Blockly.Type.PWMLED, Blockly.Type.NONE]);

        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.COLORS), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_rgb_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.COLORS = [["red", ".red"], ["green", ".green"], ["blue", ".blue"]];
        this.setColour(Blockly.Hue.FLOAT);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.RGBLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.COLORS), "COLOR");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    },
    onchange: function () {
        var val = this.getInputTargetBlock('VALUE');
        // console.log(val);
        if (val > 1) {
            this.setWarningText('Values must be less than 1.');
            //Blockly.Warning.setVisible(true);
        } else if (val < 0) {
            this.setWarningText('Values must be greater than 0.');
            //Blockly.Warning.setVisible(true);
        } else {
            this.setWarningText(null);
            //Blockly.Warning.setVisible(false);
        }
    }
};

Blockly.Blocks['gpiozero_led_rgb_value_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.TUPLE;
        this.setColour(Blockly.Hue.TUPLE);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.RGBLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_led_rgb_value_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");


        this.setColour(Blockly.Hue.TUPLE);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.RGBLED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.TUPLE, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    },
    onchange: function () {
        var tup = this.getInputTargetBlock('VALUE').getChildren();
        // console.log(tup);
        if (tup[0] > 1 || tup[1] > 1 || tup[2] > 1) {
            this.setWarningText('Values must be less than 1.');
                //Blockly.Warning.setVisible(true);
        } else if (tup[0] < 0 || tup[1] < 0 || tup[2] < 0) {
            this.setWarningText('Values must be greater than 0.');
            //Blockly.Warning.setVisible(true);
        }else {
            this.setWarningText(null);
            //Blockly.Warning.setVisible(false);
        }
    }
};

//Blockly.Blocks['gpiozero_rgbled_on_off_toggle'] = {
//    /**
//     * Mutator block for add items.
//     * @this Blockly.Block
//     */
//    init: function () {
//
//        this.OPS = [["on", ".on()"], ["off", ".off()"], ["toggle", "toggle()"]];
//        this.COLORS = [["red", ".red"], ["green", ".green"], ["blue", ".blue"]];
//
//        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
//        this.setTooltip("Turn the LED on or off or toggle it.");
//
//        this.setColour(Blockly.Hue.LED);
//
//        this.appendValueInput("LED")
//            .setCheck([Blockly.Type.RGBLED, Blockly.Type.NONE]);
//        this.appendDummyInput()
//            .appendField('.');
//        this.appendDummyInput()
//            .appendField(new Blockly.FieldDropdown(this.COLORS), "COLOR");
//        this.appendDummyInput()
//            .appendField('.');
//        this.appendDummyInput()
//            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
//        this.appendDummyInput()
//            .appendField('(');
//        this.appendDummyInput()
//            .appendField(')');
//        this.setInputsInline(true);
//        this.setPreviousStatement(true);
//        this.setNextStatement(true);
//
//        this.block_type = TYPE;
//
//        this.contextMenu = false;
//    }
//};
//==========END GPIOZERO LED section==========

//==========BEGIN GPIOZERO Buzzer section==========
Blockly.Blocks['gpiozero_buzzer'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.BUZZER;

        this.input_types = [Blockly.Type.INT, Blockly.Type.BOOL];

        // console.log("this.input_types = " + this.input_types);


        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs/#buzzer");
        this.setTooltip(
            "Create a Buzzer object.   " +
            "Initialization Options: Buzzer(pin=None, active_high=True)"
        );

        this.setColour(Blockly.Hue.BUZZER);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField("Buzzer");
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['gpiozero_buzzer_create_item']));


        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_buzzer_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_buzzer_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 2) {
            new_itemCount = 2;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        var types = [Blockly.Type.LED, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 2) {
                    // console.log("DESTROY COMMA" + i);
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

        } else if (this.itemCount_ <= 2) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                // console.log("this.input_types = " + this.input_types);
                // console.log("i = " + i);
                if (i != 0 && i < 2) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                // console.log("this.input_types = " + this.input_types[i]);
                this.appendValueInput('ADD' + i)
                    .setCheck([this.input_types[i], Blockly.Type.NONE]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([this.input_types[0], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck([this.input_types[1], Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_buzzer_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.Buzzer);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_create_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_on_off_toggle'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["on", "on()"], ["off", "off()"], ["toggle", "toggle()"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip("Turn the LED on or off or toggle it.");

        this.setColour(Blockly.Hue.BUZZER);

        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.BUZZER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.block_type = TYPE;

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_beep'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip(
            "Make the buzzer turn on and off repeatedly." + "\n" +
            "on_time - The amount of time (in seconds) for the LED to be on each iteration. Default: 1.\n" +
            "off_time - The amount of time(in seconds) for the LED to be off each iteration. Default: 1.\n" +
            "n - The number of iterations.None means infinite. Default: None.\n" +
            "background - If True, start a background thread to continue blinking and return immediately. If False, only" +
            "return when the blink is finished (warning: the default value of n will result in this method never returning)." +
            "Default: True."
        );

        this.setColour(Blockly.Hue.BUZZER);

        this.input_types = [
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.BOOL, Blockly.Type.NONE]
        ];


        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.BUZZER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.itemCount_ = 4;
        this.appendDummyInput('METHOD')
            .appendField("beep");
        this.updateShape_();
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['gpiozero_buzzer_beep_create_item']));

        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;


    },

    /**
     * Create XML to represent inputs.
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
        // console.log("IN DECOMPOSE");
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_buzzer_beep_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_buzzer_beep_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 4) {
            new_itemCount = 4;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck(this.input_types[i]).connection.connect(connections[i]);
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
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 4) {
                    //console.log("DESTROY COMMA" + i);
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        if (this.itemCount_ < 3) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(this.input_types[0]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck(this.input_types[1]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);

        } else if (this.itemCount_ <= 4) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0 && i < 4) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                this.appendValueInput('ADD' + i)
                    .setCheck(this.input_types[i]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(this.input_types[0]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck(this.input_types[1]);
            this.appendDummyInput('COMMA' + 2)
                .appendField(',');
            this.appendValueInput('ADD' + 2)
                .setCheck(this.input_types[2]);
            this.appendDummyInput('COMMA' + 3)
                .appendField(',');
            this.appendValueInput('ADD' + 3)
                .setCheck(this.input_types[3]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_buzzer_beep_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_beep_create_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_pin'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.INT;
        this.setColour(Blockly.Hue.INTEGER);

        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.BUZZER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("pin");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_isactive'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.BUZZER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("is_active");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_value_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.BUZZER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_buzzer_value_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");


        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("Buzzer")
            .setCheck([Blockly.Type.LED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};
//==========END GPIOZERO Buzzer section==========

//==========BEGIN GPIOZERO Button section==========

Blockly.Blocks['gpiozero_button'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.BUTTON;

        this.input_types = [Blockly.Type.INT, Blockly.Type.BOOL, Blockly.Type.FLOAT];

        // console.log("this.input_types = " + this.input_types);


        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs/#button");
        this.setTooltip(
            "Create a Button object.   " +
            "Initialization Options: Button(pin=None, pull_up=True, bounce_time=None)"
        );

        this.setColour(Blockly.Hue.BUTTON);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField("Button");
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['gpiozero_button_create_pin', 'gpiozero_button_create_pullup', 'gpiozero_button_create_bouncetime']));


        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_button_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        var mutator_items =['gpiozero_button_create_pin', 'gpiozero_button_create_pullup', 'gpiozero_button_create_bouncetime']
        var itemBlock;
        for (var i = 0; i < this.itemCount_; i++) {
            if (i == 0) {
                itemBlock = Blockly.Block.obtain(workspace, mutator_items[0]);
            } else if (i == 1){
                itemBlock = Blockly.Block.obtain(workspace, mutator_items[1]);
            } else {
                itemBlock = Blockly.Block.obtain(workspace, mutator_items[2]);
            }
            //var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_button_create_pin');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 3) {
            new_itemCount = 3;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        //var types = [Blockly.Type.LED, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 3) {
                    // console.log("DESTROY COMMA" + i);
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        //if (this.itemCount_ < 3) {
        //    this.appendDummyInput('LEFT')
        //        .appendField('(')
        //        .setAlign(Blockly.ALIGN_RIGHT);
        //    this.appendValueInput('ADD' + 0)
        //        .setCheck(this.input_types[0]);
        //    this.appendDummyInput('COMMA' + 1)
        //        .appendField(',');
        //    this.appendValueInput('ADD' + 1)
        //        .setCheck(this.input_types[1]);
        //    this.appendDummyInput('RIGHT')
        //        .appendField(')')
        //        .setAlign(Blockly.ALIGN_RIGHT);
        //
        //} else
        // Rebuild Block
        var property_names = ["", "pull_up=", "bounce_time=" ];
        if (this.itemCount_ <= 3) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                // console.log("this.input_types = " + this.input_types);
                // console.log("i = " + i);
                if (i != 0 && i < 3) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",")
                        .appendField(property_names[i]);
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                // console.log("this.input_types = " + this.input_types[i]);
                this.appendValueInput('ADD' + i)
                    .setCheck([this.input_types[i], Blockly.Type.NONE]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([this.input_types[0], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(",")
                .appendField(property_names[1]);
            this.appendValueInput('ADD' + 1)
                .setCheck([this.input_types[1], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 2)
                .appendField(",")
                .appendField(property_names[2]);
            this.appendValueInput('ADD' + 2)
                .setCheck([this.input_types[2], Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_button_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.BUTTON);
        this.appendDummyInput()
            .appendField("Button");
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_create_pin'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.BUTTON);
        this.appendDummyInput()
            .appendField("pin");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_create_pullup'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.BUTTON);
        this.appendDummyInput()
            .appendField("pull_up");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_create_bouncetime'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.BUTTON);
        this.appendDummyInput()
            .appendField("bounce_time");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};


Blockly.Blocks['gpiozero_button_when_pressed'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("");
        this.setTooltip("");


        this.setColour(Blockly.Hue.BUTTON);

        this.appendValueInput("Button")
            .setCheck([Blockly.Type.BUTTON, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("when_pressed");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_when_released'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("");
        this.setTooltip("");


        this.setColour(Blockly.Hue.BUTTON);

        this.appendValueInput("Button")
            .setCheck([Blockly.Type.BUTTON, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("when_released");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_is_pressed'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("Button")
            .setCheck([Blockly.Type.BUTTON, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("is_pressed");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};


Blockly.Blocks['gpiozero_button_pin'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.INT;
        this.setColour(Blockly.Hue.INTEGER);

        this.appendValueInput("Button")
            .setCheck([Blockly.Type.BUTTON, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("pin");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_button_pull_up'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BUTTON;
        this.setColour(Blockly.Hue.BUTTON);

        this.appendValueInput("Button")
            .setCheck([Blockly.Type.BUTTON, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("pull_up");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

//==========END GPIOZERO Button section==========

//==========BEGIN GPIOZERO MotionSensor section==========

Blockly.Blocks['gpiozero_motion'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.MOTIONSENSOR;

        this.input_types = [Blockly.Type.INT, Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.FLOAT, Blockly.Type.BOOL];

        this.mutator_blocks = [  'gpiozero_motion_create_pin',
                                'gpiozero_motion_create_queuelen',
                                'gpiozero_motion_create_samplerate',
                                'gpiozero_motion_create_threshold',
                                'gpiozero_motion_create_partial'];
        // console.log("this.input_types = " + this.input_types);

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs/#button");
        this.setTooltip(
            "Create a MotionSensor object.   " +
            "Initialization Options: MotionSensor(pin=None, pull_up=True, bounce_time=None)"
        );

        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField("MotionSensor");
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(this.mutator_blocks));


        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_motion_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        var itemBlock;
        for (var i = 0; i < this.itemCount_; i++) {
            itemBlock = Blockly.Block.obtain(workspace, this.mutator_blocks[i]);
            itemBlock.initSvg();

                connection.connect(itemBlock.previousConnection);

            if (i < 5) {
                connection = itemBlock.nextConnection;
            }
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 2) {
            new_itemCount = 2;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        var types = [Blockly.Type.LED, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 5) {
                    // console.log("DESTROY COMMA" + i);
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        var property_names = ["", "queue_len=", "sample_rate=", "threshold=", "partial="];
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField('( )');

        } else if (this.itemCount_ <= 5) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                // console.log("this.input_types = " + this.input_types);
                // console.log("i = " + i);
                if (i != 0 && i < 5) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",")
                        .appendField(property_names[i]);
                }
                //var input = this.appendValueInput('ADD' + i);
                // console.log("this.input_types = " + this.input_types[i]);
                this.appendValueInput('ADD' + i)
                    .setCheck([this.input_types[i], Blockly.Type.NONE]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([this.input_types[0], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(",")
                .appendField(property_names[1]);
            this.appendValueInput('ADD' + 1)
                .setCheck([this.input_types[1], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(",")
                .appendField(property_names[2]);
            this.appendValueInput('ADD' + 2)
                .setCheck([this.input_types[2], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 2)
                .appendField(",")
                .appendField(property_names[3]);
            this.appendValueInput('ADD' + 3)
                .setCheck([this.input_types[2], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 3)
                .appendField(",")
                .appendField(property_names[4]);
            this.appendValueInput('ADD' + 4)
                .setCheck([this.input_types[2], Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_motion_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_motion_create_pin'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField("pin");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_motion_create_queuelen'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField("queue_len");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_motion_create_samplerate'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField("sample_rate");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_motion_create_threshold'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField("threshold");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_motion_create_partial'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.MOTIONSENSOR);
        this.appendDummyInput()
            .appendField("partial");
        this.setPreviousStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    }
};


Blockly.Blocks['gpiozero_motion_when_motion_no_motion'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("");
        this.setTooltip("");

        this.setColour(Blockly.Hue.MOTIONSENSOR);

        this.OPS = [["when_motion", ".when_motion = "], ["when_no_motion", ".when_no_motion = "]];

        this.appendValueInput("MotionSensor")
            .setCheck([Blockly.Type.MOTIONSENSOR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};
//
//Blockly.Blocks['gpiozero_motion_when_no_motion'] = {
//    /**
//     * Mutator block for add items.
//     * @this Blockly.Block
//     */
//    init: function () {
//
//        this.setHelpUrl("");
//        this.setTooltip("");
//
//
//        this.setColour(Blockly.Hue.MOTIONSENSOR);
//
//        this.appendValueInput("MotionSensor")
//            .setCheck([Blockly.Type.MOTIONSENSOR, Blockly.Type.NONE]);
//        this.appendDummyInput()
//            .appendField('.');
//        this.appendDummyInput()
//            .appendField("when_no_motion");
//        this.appendDummyInput("EQUALS")
//            .appendField('=');
//        this.appendValueInput("VALUE");
//        this.setInputsInline(true);
//        this.setPreviousStatement(true);
//        this.setNextStatement(true);
//
//        this.contextMenu = false;
//    }
//};
//
Blockly.Blocks['gpiozero_motion_motion_detected'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.BOOL;
        this.setColour(Blockly.Hue.BOOL);

        this.appendValueInput("MotionSensor")
            .setCheck([Blockly.Type.MOTIONSENSOR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("motion_detected");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};


Blockly.Blocks['gpiozero_motion_pin'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/inputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.INT;
        this.setColour(Blockly.Hue.INTEGER);

        this.appendValueInput("MotionSensor")
            .setCheck([Blockly.Type.MOTIONSENSOR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("pin");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

//==========END GPIOZERO MotionSensor section==========



//==========BEGIN GPIOZERO PiLiter section==========
Blockly.Blocks['gpiozero_piliter'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.PILITER;

        this.input_types = [Blockly.Type.BOOL];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs/#led");
        this.setTooltip(
            "Create an LED object by passing in the pin number the LED is connected to.  " +
            "Initialization Options: LED(pin=None, active_high=True)"
        );

        this.setColour(Blockly.Hue.PILITER);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField("PiLiter");
        this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput('PWM')
                .appendField('pwm=')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD0')
                .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['gpiozero_piliter_create_item']));



        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_piliter_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_piliter_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 1) {
            new_itemCount = 1;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        var types = [Blockly.Type.LED, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
        } else if (this.itemCount_ == 1){
            this.removeInput('LEFT', true);
            this.removeInput('ADD0');
            this.removeInput('PWM');
            this.removeInput('RIGHT', true);
        } else {

        }


        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField('( )');
        } else if (this.itemCount_ == 1) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput('PWM')
                .appendField('pwm=')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD0')
                .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {

        }
    }
};

Blockly.Blocks['gpiozero_piliter_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_create_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_on_off_toggle_close'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["on", "on()"], ["off", "off()"], ["toggle", "toggle()"], ["close", "close()"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip("Turn the LED on or off or toggle it.");

        this.setColour(Blockly.Hue.PILITER);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.block_type = TYPE;

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_blink'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#methods");
        this.setTooltip(
            "Make the LED turn on and off repeatedly." + "\n" +
            "on_time - The amount of time (in seconds) for the LED to be on each iteration. Default: 1.\n" +
            "off_time - The amount of time(in seconds) for the LED to be off each iteration. Default: 1.\n" +
            "n - The number of iterations.None means infinite. Default: None.\n" +
            "background - If True, start a background thread to continue blinking and return immediately. If False, only" +
            "return when the blink is finished (warning: the default value of n will result in this method never returning)." +
            "Default: True."
        );

        this.setColour(Blockly.Hue.PILITER);

        //this.block_type = Blockly.Type.PILITER;
        this.input_types = [
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE],
            [Blockly.Type.BOOL,Blockly.Type.NONE]
        ];

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.itemCount_ = 6;
        this.appendDummyInput('METHOD')
            .appendField("blink");
        this.updateShape_();
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['gpiozero_piliter_blink_create_item']));

        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;


    },

    /**
     * Create XML to represent inputs.
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
        // console.log("IN DECOMPOSE");
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_piliter_blink_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_piliter_blink_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 6) {
             new_itemCount = 6;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck(this.input_types[i]).connection.connect(connections[i]);
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
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 6) {
                    //console.log("DESTROY COMMA" + i);
                    this.removeInput('COMMA' + i);
                }
                i++;
            }
            this.removeInput('RIGHT', true);
        }
        // Rebuild block.
        //if (this.itemCount_ < 5) {
        //    this.appendDummyInput('LEFT')
        //        .appendField('(')
        //        .setAlign(Blockly.ALIGN_RIGHT);
        //    this.appendValueInput('ADD' + 0)
        //        .setCheck(this.input_types[0]);
        //    this.appendDummyInput('COMMA' + 1)
        //        .appendField(',');
        //    this.appendValueInput('ADD' + 1)
        //        .setCheck(this.input_types[1]);
        //    this.appendDummyInput('RIGHT')
        //        .appendField(')')
        //        .setAlign(Blockly.ALIGN_RIGHT);
        if (this.itemCount_ == 0) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else if (this.itemCount_ <= 6) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                if (i != 0 && i < 6) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                this.appendValueInput('ADD' + i)
                    .setCheck(this.input_types[i]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck(this.input_types[0]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck(this.input_types[1]);
            this.appendDummyInput('COMMA' + 2)
                .appendField(',');
            this.appendValueInput('ADD' + 2)
                .setCheck(this.input_types[2]);
            this.appendDummyInput('COMMA' + 3)
                .appendField(',');
            this.appendValueInput('ADD' + 3)
                .setCheck(this.input_types[3]);
            this.appendValueInput('ADD' + 4)
                .setCheck(this.input_types[4]);
            this.appendValueInput('ADD' + 5)
                .setCheck(this.input_types[5]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_piliter_blink_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_blink_create_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_on_off_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.OPS = [["on", "on"], ["off", "off"]];

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.PILITER;
        this.setColour(Blockly.Hue.PILITER);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPS), "OP");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_value_out'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.TUPLE;
        this.setColour(Blockly.Hue.TUPLE);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_value_in'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");


        this.setColour(Blockly.Hue.TUPLE);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("value");
        this.appendDummyInput("EQUALS")
            .appendField('=');
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.TUPLE, Blockly.Type.NONE]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_piliter_leds'] = {
    /**
     * Mutator block for add items.
     * @this Blockly.Block
     */
    init: function () {

        this.setHelpUrl("http://pythonhosted.org/gpiozero/outputs#properties");
        this.setTooltip("");

        this.block_type = Blockly.Type.TUPLE;
        this.setColour(Blockly.Hue.TUPLE);

        this.appendValueInput("LED")
            .setCheck([Blockly.Type.PILITER, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.');
        this.appendDummyInput()
            .appendField("leds");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);

        this.contextMenu = false;
    }
};

//==========END GPIOZERO PiLiter section==========

//==========BEGIN GPIOZERO MCP3008 section==========

Blockly.Blocks['gpiozero_adc'] = {
    /**
     *
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.ADC;

        this.input_types = [Blockly.Type.INT, Blockly.Type.INT, Blockly.Type.BOOL];

        // console.log("this.input_types = " + this.input_types);

        this.CLASSES = [["MCP3004", "MCP3004"], ["MCP3008", "MCP3008"], ["MCP3204", "MCP3204"], ["MCP3208", "MCP3208"],
                     ["MCP3301", "MCP3301"], ["MCP3302", "MCP3302"], ["MCP3304", "MCP3304"]];

        this.setHelpUrl("");
        this.setTooltip(
            ""
        );

        this.setColour(Blockly.Hue.ADC);
        this.itemCount_ = 1;
        this.appendDummyInput('PRETEXT')
            .appendField(new Blockly.FieldDropdown(this.CLASSES), "CLASS");
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setMutator(new Blockly.Mutator(['gpiozero_adc_create_item']));



        Blockly.Blocks.gpio.num_items = this.itemCount_;
        Blockly.Blocks.gpio.num_blocks = this.itemCount_;
        Blockly.Blocks.gpio.number_times_through = 0;
    },

    /**
     * Create XML to represent inputs.
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
        var containerBlock = Blockly.Block.obtain(workspace, 'gpiozero_adc_create_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'gpiozero_adc_create_item');
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
        var new_itemCount = this.itemCount_;
        if (this.itemCount_ > 3) {
            new_itemCount = 3;
        }
        for (var i = 0; i < new_itemCount; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).setCheck([this.input_types[i], Blockly.Type.NONE]).connection.connect(connections[i]);
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
        var types = [Blockly.Type.ADC, Blockly.Type.BOOL];
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            //input.setCheck([types[i], Blockly.Type.NONE]);
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
                if (i != 0 && i < 3) {
                    // console.log("DESTROY COMMA" + i);
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

        } else if (this.itemCount_ <= 3) {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            for (var i = 0; i < this.itemCount_; i++) {
                // console.log("this.input_types = " + this.input_types);
                // console.log("i = " + i);
                if (i != 0 && i < 3) {
                    // console.log("REBUILD COMMA" + i);
                    this.appendDummyInput('COMMA' + i)
                        .appendField(",");
                    //.setAlign(Blockly.ALIGN_RIGHT);
                }
                //var input = this.appendValueInput('ADD' + i);
                // console.log("this.input_types = " + this.input_types[i]);
                this.appendValueInput('ADD' + i)
                    .setCheck([this.input_types[i], Blockly.Type.NONE]);
            }
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        } else {
            this.appendDummyInput('LEFT')
                .appendField('(')
                .setAlign(Blockly.ALIGN_RIGHT);
            this.appendValueInput('ADD' + 0)
                .setCheck([this.input_types[0], Blockly.Type.NONE]);
            this.appendDummyInput('COMMA' + 1)
                .appendField(',');
            this.appendValueInput('ADD' + 1)
                .setCheck([this.input_types[1], Blockly.Type.NONE]);
            this.appendDummyInput('RIGHT')
                .appendField(')')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['gpiozero_adc_create_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.ADC);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['gpiozero_adc_create_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.LED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};


//==========END GPIOZERO MCP3008 section==========