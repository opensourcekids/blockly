/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Python.piliter');

goog.require('Blockly.Python');

Blockly.Python.addReservedWords('pyheader,rpigpio,time,os');

Blockly.Python['piliter_initalize'] = function(block) {

    var comment1 = '# get the GPIO Library\n';
    Blockly.Python.imports_['import_rpigpio'] = comment1 + 'import RPi.GPIO as GPIO';

    //var comment2 = '# Pin mode for GPIO:\n#     BCM is labeled GPIO number.\n#     BOARD is actual pin number.\n';
    //Blockly.Python.setups_['setup_PinMode'] = comment2 + 'GPIO.setmode(GPIO.BOARD)';
    //var comment3 = '# Define PiLITEr to GPIO mapping\n';
    //Blockly.Python.setups_['setup_PinMap'] = comment3 + 'LED1 = 7\nLED2 = 11\nLED3 = 13\nLED4 = 12\nLED5 = 15\nLED6 = 16\nLED7 = 18\nLED8 = 22\n';

    return '\n';
};

