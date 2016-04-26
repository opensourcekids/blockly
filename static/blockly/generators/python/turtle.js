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

goog.provide('Blockly.Python.turtle');

goog.require('Blockly.Python');


// Extensions to Blockly's language and Python generator.


Blockly.Python['turtle_import'] = function (block) {

    //Blockly.Python.definitions_['import_turtle'] = '# The Turtle library contains code for making and using a Turtle.\nimport turtle\n';
    return "import turtle\n\n";
};

Blockly.Python['turtle_screen'] = function (block) {
    //var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    //Blockly.Python.definitions_['import_turtle'] = "# get the turtle library\nimport turtle\nturtle.getscreen()._root.attributes(\'-topmost\', 1)\n";

    var code = 'turtle.Screen()\n';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_turtle'] = function (block) {
    //var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    //Blockly.Python.definitions_['import_turtle'] = "# get the turtle library\nimport turtle\n"; //turtle.getscreen()._root.attributes(\'-topmost\', 1)\n";

    var code = 'turtle.Turtle()\n';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_done'] = function (block) {

    //Blockly.Python.definitions_['import_turtle'] = "# get the turtle library\nimport turtle\nturtle.getscreen()._root.attributes(\'-topmost\', 1)\n";

    return 'turtle.done()\n';
};

Blockly.Python['turtle_move'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    //Blockly.Python.definitions_['import_turle'] = '# get the turtle library\nimport turtle\n';
    // Generate JavaScript for moving forward or backwards.
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
    return turtle_name + "." + block.getFieldValue('DIR') + '(' + value + ')\n';//', \'block_id_' + block.id + '\');\n';
};

Blockly.Python['turtle_speed'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + "." + 'speed(' + block.getFieldValue('SPEED') + ')\n';
};

Blockly.Python['turtle_move_internal'] = function (block) {
    //Blockly.Python.definitions_['import_turle'] = '# get the turtle library\nimport turtle\n';
    // Generate JavaScript for moving forward or backwards.
    var value = block.getFieldValue('VALUE');
    return 'turtle.' + block.getFieldValue('DIR') + '(' + value + ')\n';       //', \'block_id_' + block.id + '\');\n';
};

Blockly.Python['turtle_turn'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    // Generate JavaScript for turning left or right.
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
    return turtle_name + "." + block.getFieldValue('DIR') + '(' + value + ')\n'; //, \'block_id_' + block.id + '\');\n';
};

Blockly.Python['turtle_turn_internal'] = function (block) {
    // Generate JavaScript for turning left or right.
    var value = block.getFieldValue('VALUE');
    //return block.getFieldValue('DIR') + '(' + value + ', \'block_id_' + block.id + '\');\n';

    return 'turtle.' + block.getFieldValue('DIR') + '(' + value + ')\n';
};

Blockly.Python['turtle_width'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    // Generate JavaScript for setting the width.
    var width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE) || '1';
    return turtle_name + '.pensize(' + width + ')\n';
};

Blockly.Python['turtle_pen'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.' + block.getFieldValue('PEN') + '()\n';
};

Blockly.Python['turtle_poly'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.' + block.getFieldValue('WHAT') + '()\n';
};

Blockly.Python['turtle_fill'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.' + block.getFieldValue('WHAT') + '()\n';
};

Blockly.Python['turtle_reset'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.reset()\n';
};

Blockly.Python['turtle_fillcolor'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    // Generate JavaScript for setting the colour.
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '\'#000000\'';
    return turtle_name + '.fillcolor(' + colour + ')\n';
};

Blockly.Python['turtle_pencolor'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    // Generate JavaScript for setting the colour.
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '\'#000000\'';
    return turtle_name + '.pencolor(' + colour + ')\n';
};

Blockly.Python['turtle_colour'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    // Generate JavaScript for setting the colour.
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '\'#000000\'';
    return turtle_name + '.color(' + colour + ')\n';
};

Blockly.Python['turtle_bgcolor'] = function (block) {
    var screen_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '\'#000000\'';
    return screen_name + '.bgcolor(' + colour + ')\n';
};

Blockly.Python['turtle_colour_internal'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var colour = '\'' + block.getFieldValue('COLOUR') + '\'';
    return turtle_name + '.color(' + colour + ')\n';
};

Blockly.Python['turtle_hide_show'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.' + block.getFieldValue('WHAT') + '()\n';
};

Blockly.Python['turtle_print'] = function (block) {
    // Generate JavaScript for printing text.
    var argument0 = String(Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'');
    return 'turtle.write(' + argument0 + ')\n';
};

Blockly.Python['turtle_title'] = function (block) {

    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '\'\'';
    return 'turtle.title(' + value + ')\n';
};

Blockly.Python['turtle_write'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var text = String(Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'');
    var move = block.getFieldValue('MOVES');

    return turtle_name + '.write(' + text + ', ' +
        move + ', ' +
        '\'' + block.getFieldValue('ALIGN') + '\', ' +
        '(\'' + block.getFieldValue('FONT') + '\', \'' +
        Number(block.getFieldValue('FONTSIZE')) + '\' ,\'' +
        block.getFieldValue('FONTSTYLE') + '\'))\n';
};

Blockly.Python['turtle_circle'] = function (block) {
     var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
    return turtle_name + '.circle(' + value + ')\n';
};

Blockly.Python['turtle_shape'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var shape = block.getFieldValue('IMAGE');
    return turtle_name + '.shape(\'' + shape + '\')\n';
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

Blockly.Python['turtle_repeat_internal'] = Blockly.Python['controls_repeat'];

Blockly.Python['turtle_location'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = turtle_name + '.' + block.getFieldValue('WHAT') + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_heading'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = turtle_name + '.heading()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_dot'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var diameter = Blockly.Python.valueToCode(block, 'DIAMETER', Blockly.Python.ORDER_NONE);
    var colour = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE);
    return turtle_name + '.dot(' + diameter + ', ' + colour + ')\n';
};

Blockly.Python['turtle_home'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.home()\n';
};

Blockly.Python['turtle_stamp'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.stamp()\n';
};

Blockly.Python['turtle_isdown'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = turtle_name + '.isdown()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_position'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var method = block.getFieldValue('WHAT');
    var params = new Array(block.itemCount_);

    for (var n = 0; n < block.itemCount_; n++) {
        var val = Blockly.Python.valueToCode(block, 'ADD' + n, Blockly.Python.ORDER_NONE);
        params[n] = val
    }
    var code = turtle_name + '.' + method + '(' + params.join(', ') + ')\n';

    return code;
};

Blockly.Python['turtle_isvisible'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = turtle_name + '.isvisible()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['turtle_listen'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return turtle_name + '.listen()';
};

Blockly.Python['turtle_screen_onclick'] = function (block) {
    var screen_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VARS'), Blockly.Variables.NAME_TYPE);
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VART'), Blockly.Variables.NAME_TYPE);

    return screen_name + '.onclick(' + turtle_name + '.setposition)\n';
};

Blockly.Python['turtle_ondrag'] = function (block) {
    var name1 = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
    var name2 = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR2'), Blockly.Variables.NAME_TYPE);

    return name1 + '.ondrag(' + name2 + '.setposition)\n';
};

Blockly.Python['turtle_mainloop'] = function (block) {

    Blockly.Python.definitions_['import_turle'] = '# get the turtle library\nimport turtle\n';

    return 'turtle.mainloop()\n';
};

Blockly.Python['turtle_part_circle'] = function (block) {
    var turtle_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var radius = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_NONE);
    var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_NONE);
    return turtle_name + '.circle(' + radius + ', ' + degrees + ')\n';
};