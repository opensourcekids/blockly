/**
 * Created by anthony on 8/7/15.
 */

'use strict';

goog.provide('Blockly.Blocks.pibrella');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

var COLOR_PIBRELLA = Blockly.Hue.PIBRELLA;


//Blockly.Blocks['pibrella_red_light'] = {
//    init: function () {
//
//        this.setColour(COLOR_PIBRELLA);
//
//
//        this.appendDummyInput()
//            .appendField('type');
//        this.appendDummyInput()
//            .appendField(Blockly.Blocks.parens_('left'));
//        this.appendValueInput('VALUE')
//            .setCheck(null)
//        this.appendDummyInput()
//            .appendField(Blockly.Blocks.parens_('right'));
//        this.setOutput(true, Blockly.Type.STR);
//        this.setInputsInline(true);
//        this.setColour();
//        this.setTooltip('');
//        this.setHelpUrl('http://www.example.com/');
//    },
//};

Blockly.Blocks['pibrella_import'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("import pibrella");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['pibrella_buzzer_off'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("pibrella.buzzer.off()");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['pibrella_input_read'] = {
    init: function () {

        var DROPDOWN_PINS = [['a.', 'a.'], ['b.', 'b.'], ['c.', 'c.'], ['d.', 'd.'], [String.fromCharCode(160), '']];

        this.appendDummyInput()
            .appendField('pibrella.input.');
        this.appendDummyInput('PINS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_PINS), 'DROP_PINS');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('read (  )');
        //this.appendDummyInput()
        //    //.appendField(Blockly.Blocks.parens_('right'));
        //    .appendField(Blockly.Blocks.parens_('left'));

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_output_write'] = {
    init: function () {

        var DROPDOWN_PINS = [['e.', 'e.'], ['f.', 'f.'], ['g.', 'g.'], ['h.', 'h.'], [String.fromCharCode(160), '']];
        var DROPDOWN_STATE = [['0', '0'], ['1', '1']];


        this.appendDummyInput()
            .appendField('pibrella.output.');
        this.appendDummyInput('PINS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_PINS), 'DROP_PINS');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('write ( ');
        this.appendDummyInput('STATE')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_STATE), 'DROP_STATE');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('right'));
             .appendField(' )');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_button_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('pibrella.button.read(  )');
        //this.appendDummyInput()
        //    //.appendField(Blockly.Blocks.parens_('left'));
        //    .appendField('(  )', Blockly.ALIGN_LEFT);
        //this.appendDummyInput()
        //    //.appendField(Blockly.Blocks.parens_('right'));
        //    .appendField(Blockly.Blocks.parens_('left'));

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        //this.setNextStatement(true);
        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');

    },
};

Blockly.Blocks['pibrella_leds'] = {
    init: function () {

        var DROPDOWN_LEDS = [['red.', 'red.'], ['yellow.', 'yellow.'], ['green.', 'green.'], [String.fromCharCode(160), '']];
        var DROPDOWN_STATE = [['on', 'on'], ['off', 'off']];


        this.appendDummyInput()
            .appendField('pibrella.light.');
        this.appendDummyInput('LEDS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_LEDS), 'DROP_LEDS');
        this.appendDummyInput('STATE')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_STATE), 'DROP_STATE');
        this.appendDummyInput()
            .appendField('(  )');


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_leds_blink'] = {
    init: function () {

        var DROPDOWN_LEDS = [['red.', 'red.'], ['yellow.', 'yellow.'], ['green.', 'green.'], [String.fromCharCode(160), '']];

        this.appendDummyInput()
            .appendField('pibrella.light.');
        this.appendDummyInput('LEDS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_LEDS), 'DROP_LEDS');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('blink ( ');
        this.appendValueInput('ON_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('OFF_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(' )');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_leds_pulse'] = {
    init: function () {

        var DROPDOWN_LEDS = [['red.', 'red.'], ['yellow.', 'yellow.'], ['green.', 'green.'], ['amber.', 'amber.'], [String.fromCharCode(160), '']];

        this.appendDummyInput()
            .appendField('pibrella.light.');
        this.appendDummyInput('LEDS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_LEDS), 'DROP_LEDS');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('pulse ( ');
        this.appendValueInput('FADE_IN_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('FADE_OUT_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('ON_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('OFF_TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(' )');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_leds_fade'] = {
    init: function () {
        var DROPDOWN_LEDS = [['red.', 'red.'], ['yellow.', 'yellow.'], ['green.', 'green.'], ['amber.', 'amber.'], [String.fromCharCode(160), '']];

        this.appendDummyInput()
            .appendField('pibrella.light.');
        this.appendDummyInput('LEDS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_LEDS), 'DROP_LEDS');
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('fade ( ');
        this.appendValueInput('START_PCT')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('END_PCT')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(', ');
        this.appendValueInput('TIME')
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);

        this.appendDummyInput()
            .appendField(' )');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_buzzer'] = {
    init: function () {

        var DROPDOWN_KIND = [['note', 'note'], ['buzz', 'buzz']];


        this.appendDummyInput()
            .appendField('pibrella.buzzer.');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(DROPDOWN_KIND), 'DROP_KIND');

        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('left'));
            .appendField('( ');
        this.appendValueInput('VALUE');
            //.setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            //.appendField(Blockly.Blocks.parens_('right'));
             .appendField(' )');


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['pibrella_events'] = {
    init: function () {

        var DROPDOWN_EVENTS = [['changed.', 'changed'], ['pressed.', 'pressed'], ['released.', 'released']];
        var DROPDOWN_FUNCTIONS =
            [['changed (button_changed)', 'changed(button_changed)'],
             ['pressed (button_pressed)', 'pressed(button_pressed)'],
             ['released (button_released)', 'released(button_released)']];

        this.appendDummyInput()
            .appendField('pibrella.button.');
        //this.appendDummyInput('EVENTS')
        //    .appendField(new Blockly.FieldDropdown(DROPDOWN_EVENTS), 'DROP_EVENTS');
        this.appendDummyInput('DROP_FUNCTIONS')
            .appendField(new Blockly.FieldDropdown(DROPDOWN_FUNCTIONS), 'DROP_FUNCTIONS');

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_PIBRELLA);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};
