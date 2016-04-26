/**
 * Created by anthony on 8/8/15.
 */

/**
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.signal');

goog.require('Blockly.Python');

Blockly.Python['signal_import'] = function (block) {

    Blockly.Python.definitions_['import_signal'] = '# The signal standard library contains pause().\nfrom signal import pause\n';
    return "";
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Python['signal_pause'] = function(block) {

    return 'pause()\n';
};
