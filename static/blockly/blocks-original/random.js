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
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.random');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

/**
 * Block for random integer between [X] and [Y].
 * @this Blockly.Block
 */
Blockly.Blocks['random_int'] = {

    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_INT_HELPURL);

        //this.interpolateMsg(Blockly.Msg.MATH_RANDOM_INT_TITLE,
        //    ['FROM', Blockly.Type.INT, Blockly.ALIGN_RIGHT],
        //    ['TO', Blockly.Type.INT, Blockly.ALIGN_RIGHT],
        //    Blockly.ALIGN_RIGHT);

        this.appendDummyInput('RANDINT')
            .appendField('randint');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FROM')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA')
            .appendField(',')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('TO')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);


        this.setColour(Blockly.Hue.INTEGER);
        this.setOutput(true, Blockly.Type.INT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
    }
};

/**
 *
 * @type {{init: Function}}
 */
Blockly.Blocks['random_float'] = {
    /**
     * Block for random fraction between 0 and 1.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL);

        this.appendDummyInput('RANDFLOAT')
            .appendField('random');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setColour(Blockly.Hue.FLOAT);
        this.setOutput(true, Blockly.Type.FLOAT);
        this.setInputsInline(true);

        this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
    }
};


Blockly.Blocks['random_uniform'] = {

    init: function () {
        this.setHelpUrl('');

        this.appendDummyInput('RANDUNI')
            .appendField('uniform');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FROM')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA')
            .appendField(',')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('TO')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);


        this.setColour(Blockly.Hue.FLOAT);
        this.setOutput(true, Blockly.Type.FLOAT);
        this.setInputsInline(true);
        this.setTooltip('A random float between the first number and the second number');
    }
};

Blockly.Blocks['random_randrange'] = {

    init: function () {
        this.setHelpUrl('');

        this.appendDummyInput('RANDRANGE')
            .appendField('randrange');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FROM')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA')
            .appendField(',')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('TO')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('COMMA')
            .appendField(',')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STEP')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);


        this.setColour(Blockly.Hue.INTEGER);
        this.setOutput(true, Blockly.Type.INT);
        this.setInputsInline(true);
        this.setTooltip('A random float between the first number and the second number');
    }
};

Blockly.Blocks['random_choice'] = {

    init: function () {
        this.setHelpUrl('');

        this.appendDummyInput('CHOICE')
            .appendField('choice');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ITEM')
            .setCheck([Blockly.Type.STR, Blockly.Type.LIST, Blockly.Type.TUPLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);


        this.setColour(Blockly.Hue.NONE);
        this.setOutput(true, Blockly.Type.NONE);
        this.setInputsInline(true);
        this.setTooltip('A random float between the first number and the second number');
    }
};
