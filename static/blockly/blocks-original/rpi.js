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

goog.provide('Blockly.Blocks.rpi');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

var pins = [["pin 7", "7"], ["pin 11", "11"], ["pin 12", "12"], ["pin 13", "13"], ["pin 15", "15"], ["pin 16", "16"]];
var selected = [];

//Blockly.Blocks['time_sleep'] = {
//    init: function () {
//        this.setHelpUrl('http://www.example.com/');
//        this.setColour(120);
//        this.appendValueInput("amount_of_time")
//            .setCheck([Blockly.Type.INT, Blockly.Type.NONE])
//            .appendField("sleep");
//        this.appendDummyInput()
//            .appendField("seconds");
//        this.setInputsInline(true);
//        this.setPreviousStatement(true);
//        this.setNextStatement(true);
//        this.setTooltip('');
//    }
//};

Blockly.Blocks['comment'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(135);
        this.appendValueInput("the_comment")
            .setCheck(Blockly.Type.STR)
            .appendField("#");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['start_program_python2'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(45);
        this.appendDummyInput()
            .appendField("Begin Program (Python 2.7)");
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['start_program_python3'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(45);
        this.appendDummyInput()
            .appendField("Begin Program (Python 3.4)");
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['bool_convert_to'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(120);
        this.appendValueInput("number")
            .setCheck("Number")
            .appendField("number");
        this.appendDummyInput()
            .appendField("as Boolean");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('');
    }
};

Blockly.Blocks['funct'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(120);
        this.appendDummyInput()
            .appendField("def")
            .appendField(new Blockly.FieldTextInput("my_function"), "funct_name")
            .appendField("(")
            .appendField(new Blockly.FieldTextInput(""), "arguments")
            .appendField(")");
        this.appendStatementInput("funct_body");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};
