/**
 * Created by anthony on 8/7/15.
 */

'use strict';

goog.provide('Blockly.Blocks.explorerhat');

goog.require('Blockly.Blocks');

var COLOR_EXPLORERHAT = Blockly.Hue.EXPLORERHAT;

Blockly.Blocks['explorerhat_import'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("import explorerhat");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Hue.EXPLORERHAT);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['explorerhat_analog'] = {
    init: function () {

        var DROPDOWN_PINS = [['one', 'one'], ['two', 'two'], ['three', 'three'], ['four', 'four']];

        this.appendDummyInput()
            .appendField('explorerhat.analog.');
        this.appendDummyInput('PINS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_PINS), 'DROP_PINS');
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.EXPLORERHAT);

        this.block_type = Blockly.Type.EXPLORERHAT;
        this.setColour(Blockly.Hue.EXPLORERHAT);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};

Blockly.Blocks['explorerhat_analog_read'] = {
    init: function () {
        
        this.appendValueInput('EXP_HAT')
            .setCheck([Blockly.Type.EXPLORERHAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField('.read (  )');
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.FLOAT);

        this.block_type = Blockly.Type.FLOAT;
        this.setColour(Blockly.Hue.FLOAT);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};

Blockly.Blocks['explorerhat_motor'] = {
    init: function () {

        var DROPDOWN_PINS = [['one', 'one'], ['two', 'two']];

        this.appendDummyInput()
            .appendField('explorerhat.motor.');
        this.appendDummyInput('PINS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_PINS), 'DROP_PINS');
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.EXPLORERHAT);

        this.block_type = Blockly.Type.EXPLORERHAT;
        this.setColour(Blockly.Hue.EXPLORERHAT);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};

Blockly.Blocks['explorerhat_motor_direction_speed'] = {
    init: function () {

        var DROPDOWN_DIRECTION = [['forward', 'forward'], ['backward', 'backward'], ['speed', 'speed']];

        this.block_type = Blockly.Type.EXPLORERHAT;

        this.appendValueInput('EXP_HAT')
            .setCheck([Blockly.Type.EXPLORERHAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DROPDOWN_DIRECTION), 'DROP_DIRECTION');
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('SPEED')
            .setCheck([Blockly.Type.FLOAT, Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Hue.EXPLORERHAT);

        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};

Blockly.Blocks['explorerhat_motor_invert'] = {
    init: function () {


        this.block_type = Blockly.Type.EXPLORERHAT;

        this.appendValueInput('EXP_HAT')
            .setCheck([Blockly.Type.EXPLORERHAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".invert( )");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(Blockly.Hue.EXPLORERHAT);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};

Blockly.Blocks['explorerhat_motor_speed'] = {
    init: function () {

        this.block_type = Blockly.Type.EXPLORERHAT;

        this.appendValueInput('EXP_HAT')
            .setCheck([Blockly.Type.EXPLORERHAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".speed");
        this.appendDummyInput()
            .appendField('(');
        this.appendValueInput('SPEED')
            .setCheck([Blockly.Type.FLOAT, Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(')');

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);


        this.setColour(Blockly.Hue.EXPLORERHAT);
        this.setTooltip('');
        this.setHelpUrl('https://github.com/pimoroni/explorer-hat');
    }
};
