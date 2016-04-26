
'use strict';

goog.provide('Blockly.Python.lib_time');

goog.require('Blockly.Python');

Blockly.Python.addReservedWords('RPIO');
Blockly.Python.addReservedWords('BOARD');

Blockly.Python.addReservedWords('start');
Blockly.Python.addReservedWords('MODE');


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Python['time_sleep'] = function (block) {

    var comment = '# The time standard library contains sleep().';
    Blockly.Python.definitions_['import_time'] = comment + '\nfrom time import sleep';

    var value_amount_of_time = Blockly.Python.valueToCode(block, 'amount_of_time', Blockly.Python.ORDER_ATOMIC) || 1;

    return 'sleep(' + value_amount_of_time + ')\n';
};