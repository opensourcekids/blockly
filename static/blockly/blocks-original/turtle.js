/**
 * Created by anthony on 6/14/15.
 */


/**
 * Blockly Games: Turtle Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly-games
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
 * @fileoverview Blocks for Blockly's Turtle Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.turtle');

goog.require('Blockly.Blocks');

Blockly.Blocks.turtle.TYPE = Blockly.Type.TURTLE;

Blockly.Blocks.turtle.num_blocks = 0;
Blockly.Blocks.turtle.counter = 0;

var COLOR = Blockly.Hue.TURTLE;
var TYPE = Blockly.Type.TURTLE;

Blockly.Blocks['turtle_import'] = {
    init: function () {

        this.block_type = TYPE;

        this.setColour(Blockly.Hue.TURTLE);
        this.appendDummyInput()
            .appendField("import turtle");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);


        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['turtle_screen'] = {
    /**
     * Block for creating a turtle screen.
     * @this Blockly.Block
     */
    init: function () {
        this.block_type = Blockly.Type.TURTLE_SCREEN;
        this.setColour(Blockly.Hue.TURTLE_SCREEN);

        //this.appendDummyInput()
        //    .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        this.appendDummyInput()
            //.appendField(new Blockly.FieldVariable('screen'), 'VAR')
            .appendField('turtle.Screen');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setOutput(true, this.block_type);
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_done'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);
        this.appendDummyInput()
            .appendField('turtle.done');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_turtle'] = {
    /**
     * Block for making a circle.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            //.appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('turtle.Turtle');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setOutput(true, this.block_type);
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_circle'] = {
    /**
     * Block for making a circle.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.TURTLE);

        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.circle');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VALUE')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setHelpUrl("https://docs.python.org/2.7/library/turtle.html#turtle.circle");
        this.setTooltip('This method makes a circle with the given radius.');
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
    }
};

Blockly.Blocks['turtle_move'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {
        var DIRECTIONS = [['forward', 'forward'], ['backward', 'backward']];
        this.setColour(Blockly.Hue.TURTLE);

         //this.appendDummyInput()
         //   .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VALUE')
            .setCheck([Blockly.Type.INT, Blockly.Type.LIST, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
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
    }
};

Blockly.Blocks['turtle_speed'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.TURTLE);

        var SPEED =   [['0 (fastest)', '0'],
                            ['10 (fast)', '10'],
                            ['9', '9'],
                            ['8', '8'],
                            ['7', '7'],
                            ['6 (normal)', '6'],
                            ['5', '5'],
                            ['4', '4'],
                            ['3 (slow)', '3'],
                            ['2', '2'],
                            ['1 (slowest)', '1']];

         //this.appendDummyInput()
         //   .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("speed");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
       this.appendDummyInput("SP")
            .appendField(new Blockly.FieldDropdown(SPEED), 'SPEED');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['turtle_move_internal'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {
        var DIRECTIONS =
            [['forward', 'forward'],
                ['backward', 'backward']];
        var VALUES =
            [['20', '20'],
                ['50', '50'],
                ['100', '100'],
                ['150', '150']];
        this.setColour(160);

        this.appendDummyInput()
            .appendField('turtle.');

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(VALUES), 'VALUE');

         this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['turtle_turn'] = {
    /**
     * Block for turning left or right.
     * @this Blockly.Block
     */
    init: function () {
        var DIRECTIONS =
            [['left', 'left'],
             ['right', 'right']];
        // Append arrows to direction messages.
        DIRECTIONS[0][0] += ' \u21BB';
        DIRECTIONS[1][0] += ' \u21BA';
        this.setColour(Blockly.Hue.TURTLE);

        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
         this.appendDummyInput()
             .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VALUE')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setTooltip('');
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
    }
};

Blockly.Blocks['turtle_turn_internal'] = {
    /**
     * Block for turning left or right.
     * @this Blockly.Block
     */
    init: function () {
        var DIRECTIONS =
            [['right', 'right'],
                ['left', 'left']];
        var VALUES =
            [['1\u00B0', '1'],
                ['45\u00B0', '45'],
                ['72\u00B0', '72'],
                ['90\u00B0', '90'],
                ['120\u00B0', '120'],
                ['144\u00B0', '144']];
        // Append arrows to direction messages.
        DIRECTIONS[0][0] += ' \u21BB';
        DIRECTIONS[1][0] += ' \u21BA';
        this.setColour(160);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
            .appendField(new Blockly.FieldDropdown(VALUES), 'VALUE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};


Blockly.Blocks['turtle_width'] = {
    /**
     * Block for setting the width.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        //this.appendDummyInput()
        //    .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.pensize');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('WIDTH')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.width");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_pen'] = {
    /**
     * Block for pen up/down.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        var STATE = [['penup', 'penup'], ['pendown', 'pendown']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(STATE), 'PEN');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.pendown");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_poly'] = {
    /**
     * Block for pen up/down.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        var POLY_METHOD = [['begin_poly', 'begin_poly'], ['end_poly', 'end_poly']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(POLY_METHOD), 'WHAT');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.pendown");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_fill'] = {
    /**
     * Block for pen up/down.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        var FILL_METHOD = [['begin_fill', 'begin_fill'], ['end_fill', 'end_fill']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(FILL_METHOD), 'WHAT');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_bgcolor'] = {
    /**
     * Block for setting the colour.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.TURTLE_SCREEN;
        this.setColour(Blockly.Hue.TURTLE_SCREEN);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('screen'), 'VAR');
        this.appendDummyInput()
            .appendField('.bgcolor');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('COLOUR');
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.bgcolor");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_colour'] = {
    /**
     * Block for setting the colour.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        //this.appendDummyInput()
        //    .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.color');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('COLOUR');
            //.setCheck([Blockly.Type.COLOUR, Blockly.Type.NONE, 'any']);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.color");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_colour_internal'] = {
    /**
     * Block for setting the colour.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.color');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldColour("#0072BC"), "COLOUR");
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.color");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_fillcolor'] = {
    /**
     * Block for setting the fill colour.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.fillcolor');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('COLOUR');
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.fillcolor");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_pencolor'] = {
    /**
     * Block for setting the fill colour.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.pencolor');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('COLOUR');
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.pencolor");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_hide_show'] = {
    /**
     * Block for
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        var SHOW_METHOD = [['hideturtle', 'hideturtle'], ['showturtle', 'showturtle']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(SHOW_METHOD), 'WHAT');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');
    }
};


Blockly.Blocks['turtle_print'] = {
    /**
     * Block for printing text.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('');
        this.setColour(160);
        this.appendValueInput('TEXT')
            .appendField('turtle.write');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_title'] = {
    /**
     * Block for printing text.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('');
        this.setColour(160);
        this.appendDummyInput()
            .appendField('turtle.title');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VALUE')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_shape'] = {

    init: function(){
        var image = [['turtle', 'turtle'],
                     ['arrow', 'arrow'],
                     ['circle', 'circle'],
                     ['square', 'square'],
                     ['triangle', 'triangle'],
                     ['classic', 'classic']];

        this.setColour(Blockly.Hue.TURTLE);

        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.shape');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(image), 'IMAGE');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setHelpUrl('');
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
    }
};

Blockly.Blocks['turtle_write'] = {
    /**
     * Block for setting the font.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        // Common font names (intentionally not localized)
        var FONTLIST = [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
                        ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
                        ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];

        var STYLE = [['normal', 'normal'], ['italic', 'italic'], ['bold', 'bold']];

        var MOVES = [['False', 'False'], ['True', 'True']];

        var ALIGNMENT = [['left', 'left'], ['right', 'right'], ['center', 'center']];

        //this.appendDummyInput()

        this.appendValueInput('TEXT')
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE])
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.write(');
        this.appendDummyInput()
            .appendField('move')
            .appendField(new Blockly.FieldDropdown(MOVES), 'MOVES');
        this.appendDummyInput()
            .appendField('align')
            .appendField(new Blockly.FieldDropdown(ALIGNMENT), 'ALIGN');
        this.appendDummyInput()
            .appendField('font')
            .appendField(new Blockly.FieldDropdown(FONTLIST), 'FONT');
        this.appendDummyInput()
            .appendField('size')
            .appendField(new Blockly.FieldTextInput('18', Blockly.FieldTextInput.nonnegativeIntegerValidator), 'FONTSIZE');
        this.appendDummyInput()
            .appendField('type')
            .appendField(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE')
            .appendField(")");
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setHelpUrl('https://docs.python.org/2/library/turtle.html#turtle.write');
        this.setTooltip('');
    }
};


Blockly.Blocks['turtle_repeat_internal'] = {
    /**
     * Block for repeat n times (internal number).
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);
        this.setColour(120);
        var TIMES =
            [['3', '3'],
                ['4', '4'],
                ['5', '5'],
                ['360', '360']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown(TIMES), 'TIMES')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks['turtle_reset'] = {
    /**
     * Block for pen up/down.
     * @this Blockly.Block
     */
    init: function () {


        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("reset");
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.reset");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_location'] = {
    /**
     * Block for
     * @this Blockly.Block
     */
    init: function () {

        var SHOW_METHOD = [['position', 'position'], ['xcor', 'xcor'], ['ycor', 'ycor']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(SHOW_METHOD), 'WHAT');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, []);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');

        // Type and Colour
        this.block_type = Blockly.Type.TUPLE;
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.TUPLE);
    }
};

Blockly.Blocks['turtle_heading'] = {
    /**
     * Block for
     * @this Blockly.Block
     */
    init: function () {

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField("heading");
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');

        // Type and Colour
        this.block_type = Blockly.Type.FLOAT;
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.FLOAT);
    }
};

Blockly.Blocks['turtle_dot'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.TURTLE);

        //this.appendDummyInput()
        //   .appendField(new Blockly.FieldVariable("t"), "TURTLE_NAME");
        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("dot");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('DIAMETER')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput('COLOUR')
            .setCheck();
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
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
    }
};

Blockly.Blocks['turtle_stamp'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("stamp");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
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
    }
};

Blockly.Blocks['turtle_home'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("home");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
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
    }
};

Blockly.Blocks['turtle_isdown'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("isdown");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);

        this.setTooltip('');

        this.block_type = Blockly.Type.BOOL;
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.BOOL);
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
    }
};

Blockly.Blocks['turtle_position'] = {
    /**
     * Block for
     * @this Blockly.Block
     */
    init: function () {

        var SHOW_METHOD = [['setposition', 'setposition'], ['setx', 'setx'], ['sety', 'sety']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(SHOW_METHOD), 'WHAT');

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("");
        this.setTooltip('');

        // Type and Colour
        this.block_type = Blockly.Type.TURTLE;
        this.setColour(Blockly.Hue.TURTLE);

        this.itemCount_ = 2;
        this.updateShape_();
        this.setInputsInline(true);

        this.setMutator(new Blockly.Mutator(['turtle_create_with_item']));
        this.setTooltip();

        Blockly.Blocks.turtle.num_blocks = this.itemCount_;

        //Blockly.Blocks.lists.num_items = this.itemCount_;
        //Blockly.Blocks.lists.num_blocks = this.itemCount_;
        //Blockly.Blocks.lists.number_times_through = 0;
    },
    onchange: function () {
        var input = this.getInput('ADD0');
        if (this.getFieldValue('WHAT') == 'setx' || this.getFieldValue('WHAT') == 'sety') {
            this.itemCount_ = 1;
            input.setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
            Blockly.Blocks.turtle.num_blocks = this.itemCount_;
            if (this.getInput('ADD1')){
                this.removeInput('ADD1');
                this.removeInput('COMMA0');
            }
        } else {
            Blockly.Blocks.turtle.num_blocks = this.itemCount_;
            if (this.getInput('ADD1')) {
                input.setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
                input = this.getInput('ADD1');
                input.setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
            } else {
                input.setCheck([Blockly.Type.TYPE, Blockly.Type.NONE]);
            }
        }
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
    }
    ,
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    }
    ,
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'turtle_create_with_container');
        containerBlock.initSvg();

        Blockly.Blocks.turtle.num_blocks = this.itemCount_;

        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Blocks.turtle.counter = i + 1;
            var itemBlock = Blockly.Block.obtain(workspace, 'turtle_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        Blockly.Blocks.turtle.counter = 0;

        return containerBlock;
    }
    ,
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
    }
    ,
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
        if (this.getFieldValue('WHAT') == 'setx' || this.getFieldValue('WHAT') == 'sety') {

        } else {
            this.removeInput('LEFT', true);

            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);

                i++;
            }
            if (this.getInput('COMMA0')) {
                this.removeInput('COMMA0');
            }
            this.removeInput('RIGHT', true);

            // Rebuild block.
            if (this.itemCount_ <= 1) {

                //} else if (this.itemCount_ == 1) {
                this.appendDummyInput('LEFT')
                    .appendField(Blockly.Blocks.parens_('left'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('ADD' + 0)
                    .setCheck([Blockly.Type.TUPLE, Blockly.Type.NONE]);
                this.appendDummyInput('RIGHT')
                    .appendField(Blockly.Blocks.parens_('right'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            } else if (this.itemCount_ >= 2) {
                this.appendDummyInput('LEFT')
                    .appendField(Blockly.Blocks.parens_('left'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('ADD' + 0)
                    .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
                this.appendDummyInput('COMMA' + 0)
                    .appendField(Blockly.Blocks.comma_());
                this.appendValueInput('ADD' + 1)
                    .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
                this.appendDummyInput('RIGHT')
                    .appendField(Blockly.Blocks.parens_('right'))
                    .setAlign(Blockly.ALIGN_RIGHT);
            } else {

            }
        }
    }
};

Blockly.Blocks['turtle_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Hue.TURTLE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['turtle_create_with_item'] = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.TURTLE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['turtle_isvisible'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.');
        this.appendDummyInput()
            .appendField("isvisible");
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);

        this.setTooltip('');

        this.block_type = Blockly.Type.BOOL;
        this.setOutput(true, this.block_type);
        this.setColour(Blockly.Hue.BOOL);
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
    }
};


Blockly.Blocks['turtle_listen'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE_SCREEN);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('screen'), 'VAR');
        this.appendDummyInput()
            .appendField('.listen');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.listen");
        this.setTooltip('');
        }
    };

Blockly.Blocks['turtle_stub'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE_SCREEN);
        this.appendValueInput('OBJECT');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.listen");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_screen_onclick'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.TURTLE_SCREEN;
        this.setColour(Blockly.Hue.TURTLE_SCREEN);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('screen'), 'VARS');
        this.appendDummyInput()
            .appendField('.onclick');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VART');
        this.appendDummyInput()
            .appendField('.setposition');
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.bgcolor");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_ondrag'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.TURTLE;
        this.setColour(Blockly.Hue.TURTLE);

        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR1');
        this.appendDummyInput()
            .appendField('.ondrag');
        this.appendDummyInput('LEFT')
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR2');
        this.appendDummyInput()
            .appendField('.setposition');
        this.appendDummyInput('RIGHT')
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://docs.python.org/2/library/turtle.html#turtle.bgcolor");
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_mainloop'] = {
    /**
     * Block for moving forward or backwards.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Blocks.turtle.TYPE;
        this.setColour(Blockly.Hue.TURTLE);
        this.appendDummyInput()
            .appendField('turtle.mainloop');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['turtle_part_circle'] = {
    /**
     * Block for making a circle.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(Blockly.Hue.TURTLE);

        //this.appendValueInput('TURTLE_NAME')
        //    .setCheck([Blockly.Type.TURTLE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('t'), 'VAR')
            .appendField('.circle');
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('left'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('RADIUS')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.comma_());
        this.appendValueInput('DEGREES')
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(Blockly.Blocks.parens_('right'))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setHelpUrl("https://docs.python.org/2.7/library/turtle.html#turtle.circle");
        this.setTooltip('This method makes a circle with the given radius.');
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
    }
};