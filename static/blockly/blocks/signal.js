/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Blocks.signal');

goog.require('Blockly.Blocks');



var COLOR_TIME = Blockly.Hue.TIME;

Blockly.Blocks['signal_import'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("from signal import pause");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('Pauses execution.');
        this.setHelpUrl('');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Blocks['signal_pause'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("pause");
        this.appendDummyInput()
            .appendField("(");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
