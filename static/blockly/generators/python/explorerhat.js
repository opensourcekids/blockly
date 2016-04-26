
'use strict';

goog.provide('Blockly.Python.explorerhat');

goog.require('Blockly.Python');

Blockly.Python['explorerhat_import'] = function (block) {

    var comment1 = '# Get Pimoroni Explorer HAT/pHAT libraries.\n';
    Blockly.Python.imports_['import_explorerhat'] = comment1 + 'import explorerhat';

    return '\n';
};

Blockly.Python['explorerhat_analog'] = function(block) {

    var channel = block.getFieldValue('DROP_PINS');
    var code = 'explorerhat.analog.' + channel;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['explorerhat_analog_read'] = function(block) {

    var hat = Blockly.Python.valueToCode(block, 'EXP_HAT', Blockly.Python.ORDER_ATOMIC);
    var code = hat + '.read()';

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['explorerhat_motor'] = function(block) {

    var channel = block.getFieldValue('DROP_PINS');
    var code = 'explorerhat.motor.' + channel;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['explorerhat_motor_direction_speed'] = function (block) {

    var hat = Blockly.Python.valueToCode(block, 'EXP_HAT', Blockly.Python.ORDER_ATOMIC);
    var direction = block.getFieldValue("DROP_DIRECTION");
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return hat + "." + direction + "(" + speed + ")\n";
};

Blockly.Python['explorerhat_motor_invert'] = function (block) {

    var hat = Blockly.Python.valueToCode(block, 'EXP_HAT', Blockly.Python.ORDER_ATOMIC);

    return hat + ".invert()\n";
};

Blockly.Python['explorerhat_motor_speed'] = function (block) {

    var hat = Blockly.Python.valueToCode(block, 'EXP_HAT', Blockly.Python.ORDER_ATOMIC);
    var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_NONE);
    return hat + ".speed(" + speed + ")\n";
};