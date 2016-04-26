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

goog.provide('Blockly.Blocks.gpio');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

Blockly.Blocks.gpio.HUE = Blockly.Hue.GPIO; //270;

var board_pins = [["pin 7", "7"], ["pin 11", "11"], ["pin 12", "12"], ["pin 13", "13"], ["pin 15", "15"], ["pin 16", "16"]];

var bcm_pins = [["4", "4"], ["17", "17"], ["18", "18"], ["27", "27"],
                ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"],
                ["5", "5"], ["6", "6"], ["12", "12"], ["13", "13"], ["19", "19"],
                ["16", "16"], ["26", "26"], ["20", "20"], ["21", "21"]];

var selected = [];


Blockly.Blocks['gpio_import'] = {

    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField("import RPi.GPIO as GPIO");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_pin_setup'] = {

    init: function () {

        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(board_pins), "pin");
        this.appendDummyInput()
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([["input", "IN"], ["output", "OUT"]]), "type");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');

    },
    onchange: function () {

        var the_pin = this.getFieldValue("pin");

    }
};

Blockly.Blocks['gpio_bcm_pin_setup'] = {

    init: function () {

        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(bcm_pins), "pin");
        this.appendDummyInput()
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([["GPIO.IN", "IN"], ["GPIO.OUT", "OUT"]]), "type");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    },
    onchange: function () {

        var the_pin = this.getFieldValue("pin");
    }
};

Blockly.Blocks['gpio_pin_set_state'] = {

    init: function () {

        function dyn() {
            return board_pins;
        }

        var dropdown = new Blockly.FieldDropdown(dyn);

        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField(dropdown, "pin");
        this.appendDummyInput()
            .appendField("state")
            .appendField(new Blockly.FieldDropdown([["HIGH", "True"], ["LOW", "False"]]), "state");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        //input.appendField(dropdown, "pin");    this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        //insert.appendField(selected, "pin");
    }
};

Blockly.Blocks['gpio_pin_read'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField("read");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["pin 7", "7"], ["pin 11", "11"], ["pin 12", "12"], ["pin 13", "13"], ["pin 15", "15"]]), "read");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_mode'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField("GPIO.setmode");
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["GPIO.BCM", "BCM"], ["GPIO.BOARD", "BOARD"]]), "mode");
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_pin_type'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField('GPIO.setup');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput("pin")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);

        this.appendDummyInput()
            .appendField(', ')
            .appendField(new Blockly.FieldDropdown([["GPIO.OUT", "OUT"], ["GPIO.IN", "IN"]]), "type");
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_read_pin_value'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField('GPIO.input');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput("pin")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE])
            .appendField("read pin");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.BOOL);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_board_pins'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["pin 7", "7"], ["pin 11", "11"], ["pin 12", "12"], ["pin 13", "13"], ["pin 15", "15"], ["pin 16", "16"], ["pin 18", "18"], ["pin 22", "22"]]), "pin_number");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_bcm_pins'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(bcm_pins), "pin_number");
        this.setInputsInline(true);
        this.setOutput(true, [Blockly.Type.INT, Blockly.Type.NONE,  "gpio_bcm_pins"]);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_output_value'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField("")
            .appendField(new Blockly.FieldDropdown([["LOW (0)", "False"], ["HIGH (1)", "True"]]), "output_values");
        this.setInputsInline(true);
        this.setOutput(true, ["Boolean", "gpio_output_value"]);
        this.setTooltip('');
    }
};

Blockly.Blocks['gpio_set_output_value'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField('GPIO.output');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput("pin")
            .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE, "gpio_board_pins", "gpio_bcm_pins"]);
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput("state")
            .setCheck([Blockly.Type.BOOL, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['gpio_setwarnings'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Blocks.gpio.HUE);
        this.appendDummyInput()
            .appendField('GPIO.setwarnings');
        this.appendDummyInput()
            .appendField('(');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["False", "False"], ["True", "True"]]), "state");
        this.appendDummyInput()
            .appendField(')');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};