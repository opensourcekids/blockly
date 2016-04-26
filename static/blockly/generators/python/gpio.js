
'use strict';

goog.provide('Blockly.Python.gpio');

goog.require('Blockly.Python');

//Blockly.Python.addReservedWords('RPIO');
Blockly.Python.addReservedWords('BOARD');

Blockly.Python.addReservedWords('start');
Blockly.Python.addReservedWords('MODE');

//Blockly.Python.addReservedWords('time');

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wra9xe
Blockly.Python['gpio_mode'] = function (block) {
    var dropdown_mode = block.getFieldValue('mode');
    var comment = '# Pin mode for GPIO:\n#     BCM is GPIO number; BOARD is pin number.';
    code = comment + '\nGPIO.setmode(GPIO.' + dropdown_mode + ')\n\n';

    return code;
};

Blockly.Python['gpio_pin_setup'] = function (block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_pin = block.getFieldValue('pin');

    return 'GPIO.setup(' + dropdown_pin + ',GPIO.' + dropdown_type + ')\n';
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#uaf7bw
Blockly.Python['gpio_pin_set_state'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_state = block.getFieldValue('state');

    return 'GPIO.output(' + dropdown_pin + ', ' + dropdown_state + ')\n';
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#fm8bcv
Blockly.Python['gpio_pin_read'] = function (block) {
    var dropdown_read = block.getFieldValue('read');

    return 'GPIO.input(' + dropdown_read[1] + ')\n';
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5fqfu6
Blockly.Python['gpio_pin_type'] = function (block) {
    var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var dropdown_type = block.getFieldValue('type');

    return 'GPIO.setup(' + value_pin + ', GPIO.' + dropdown_type + ')\n';
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pvtmj5
Blockly.Python['gpio_read_pin_value'] = function (block) {
    var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    return ['GPIO.input(' + value_pin + ')', Blockly.Python.ORDER_NONE];

};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ci89xb
Blockly.Python['gpio_board_pins'] = function (block) {
    var dropdown_pin_number = block.getFieldValue('pin_number');

    // The operator precedence needs to be ORDER_ATOMIC not ORDER_NONE.
    // This will ensure the pin number is not surrounded by '( )'.
    // See https://developers.google.com/blockly/custom-blocks/operator-precedence for details.
    return [dropdown_pin_number, Blockly.Python.ORDER_ATOMIC];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5qhj7n
Blockly.Python['gpio_bcm_pins'] = function(block) {
    var dropdown_pin_number = block.getFieldValue('pin_number');

    // The operator precedence needs to be ORDER_ATOMIC not ORDER_NONE.
    // This will ensure the pin number is not surrounded by '( )'.
    // See https://developers.google.com/blockly/custom-blocks/operator-precedence for details.
    return [dropdown_pin_number, Blockly.Python.ORDER_ATOMIC];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#iauv7o
Blockly.Python['gpio_output_value'] = function(block) {
    var dropdown_output_values = block.getFieldValue('output_values');
    // TODO: Assemble Python into code variable.
    var code = dropdown_output_values;

    return [code, Blockly.Python.ORDER_ATOMIC];
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3if9t7
Blockly.Python['gpio_set_output_value'] = function(block) {
    var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var value_state = Blockly.Python.valueToCode(block, 'state', Blockly.Python.ORDER_ATOMIC);
    var code = 'GPIO.output(' + value_pin + ', ' + value_state + ')\n';

    return code;
};

Blockly.Python['gpio_import'] = function (block) {

    Blockly.Python.definitions_['import_RPIO'] = '# get the GPIO Library\nimport RPi.GPIO as GPIO\n';
    return "";
};

Blockly.Python['gpio_setwarnings'] = function (block) {
    var dropdown_mode = block.getFieldValue('state');
    var comment = '# Prevents annoying warnings.';
    code = comment + '\nGPIO.setwarnings(' + dropdown_mode + ')\n\n';

    return code;
};
