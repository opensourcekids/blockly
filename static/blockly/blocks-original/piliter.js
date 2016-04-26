/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Blocks.piliter');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');


var COLOR_PILITER = Blockly.Hue.PILITER;


Blockly.Blocks['piliter_initalize'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("import ");
        this.setNextStatement(true);
        this.setColour(COLOR_PILITER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

//Blockly.Blocks['piliter_'] = {
//    init: function () {
//
//
//        this.appendValueInput("XXX")
//            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
//
//
//        this.setInputsInline(true);
//        this.setPreviousStatement(true);
//        this.setNextStatement(true);
//
//        this.setColour(COLOR_PILITER);
//        this.setTooltip('');
//        this.setHelpUrl('http://www.example.com/');
//    },
//};

