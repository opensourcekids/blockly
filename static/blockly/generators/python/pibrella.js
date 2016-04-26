
'use strict';

goog.provide('Blockly.Python.pibrella');

goog.require('Blockly.Python');

Blockly.Python['pibrella_import'] = function (block) {

    var comment1 = '# Get the PiBrella and signal libraries.\n';
    Blockly.Python.imports_['import_pibrella'] = comment1 + 'import pibrella';

    return '\n';
};

Blockly.Python['pibrella_buzzer_off'] = function (block) {


    return 'pibrella.buzzer.off()\n';
};

Blockly.Python['pibrella_output_write'] = function(block) {

    var pin = block.getFieldValue('DROP_PINS');
    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';

    var state = block.getFieldValue('DROP_STATE');

    var code = 'pibrella.output.' + pin + '.write(' + state + ')\n';
    return code;

};

Blockly.Python['pibrella_input_read'] = function(block) {

    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var pin = block.getFieldValue('DROP_PINS');
    var code = 'pibrella.input.' + pin + '.read()\n';
    return code;
};

Blockly.Python['pibrella_button_read'] = function(block) {

    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var code = 'pibrella.button.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['pibrella_leds'] = function(block) {

    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var led = block.getFieldValue('DROP_LEDS');
    var state = block.getFieldValue('DROP_STATE');

    var code = 'pibrella.light.' + led + state + '()\n';
    return code;
};

Blockly.Python['pibrella_leds_blink'] = function(block) {

    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var led = block.getFieldValue('DROP_LEDS');
    var on = Blockly.Python.valueToCode(block, 'ON_TIME', Blockly.Python.ORDER_ATOMIC);
    var off = Blockly.Python.valueToCode(block, 'OFF_TIME', Blockly.Python.ORDER_ATOMIC);
    var code = 'pibrella.light.' + led + 'blink(' + on + ', ' + off + ')\n';
    return code;
};

Blockly.Python['pibrella_leds_pulse'] = function(block) {
    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var led = block.getFieldValue('DROP_LEDS');
    var fade_in = Blockly.Python.valueToCode(block, 'FADE_IN_TIME', Blockly.Python.ORDER_ATOMIC);
    var fade_out = Blockly.Python.valueToCode(block, 'FADE_OUT_TIME', Blockly.Python.ORDER_ATOMIC);
    var on = Blockly.Python.valueToCode(block, 'ON_TIME', Blockly.Python.ORDER_ATOMIC);
    var off = Blockly.Python.valueToCode(block, 'OFF_TIME', Blockly.Python.ORDER_ATOMIC);
    var code = 'pibrella.light.' + led + 'pulse(' + fade_in + ', ' + fade_out + ', ' + on + ', ' + off + ')\n';
    return code;
};

Blockly.Python['pibrella_leds_fade'] = function(block) {
    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var led = block.getFieldValue('DROP_LEDS');
    var start_pct = Blockly.Python.valueToCode(block, 'START_PCT', Blockly.Python.ORDER_ATOMIC);
    var end_pct = Blockly.Python.valueToCode(block, 'END_PCT', Blockly.Python.ORDER_ATOMIC);
    var time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC);
    var code = 'pibrella.light.' + led + 'fade(' + start_pct + ', ' + end_pct + ', ' + time + ')\n';
    return code;
};

Blockly.Python['pibrella_buzzer'] = function(block) {
    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var kind = block.getFieldValue('DROP_KIND');

    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);

    var code = 'pibrella.buzzer.' + kind + '(' + value + ')\n';
    return code;
};

Blockly.Python['pibrella_events'] = function(block) {
    //Blockly.Python.definitions_['import_pibrella'] = '# get the PiBrella library\nimport pibrella\n';
    var value = block.getFieldValue('DROP_FUNCTIONS');

    var code = 'pibrella.button.' + value + '\n';
    return code;
};