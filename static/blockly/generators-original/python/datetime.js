/**
 * Created by anthony on 8/8/15.
 */

/**
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.datetime');

goog.require('Blockly.Python');


Blockly.Python['datetime_date_today'] = function(block) {

    var comment = '# The date type is an idealized naive date.  Its attributes are year, month, and day.';
    Blockly.Python.definitions_['import_datetime_date'] = 'from datetime import date  ' + comment;
    //var method = block.getFieldValue('DROP_METHOD');
    var code = 'date.today()'; // + method;

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['datetime_date'] = function(block) {

     var comment = '# The date type is an idealized naive date.  Its attributes are year, month, and day.';
    Blockly.Python.definitions_['import_datetime_date'] = 'from datetime import date  ' + comment;

    var year = Blockly.Python.valueToCode(block, 'YEAR', Blockly.Python.ORDER_ATOMIC);
    var month = Blockly.Python.valueToCode(block, 'MONTH', Blockly.Python.ORDER_ATOMIC);
    var day = Blockly.Python.valueToCode(block, 'DAY', Blockly.Python.ORDER_ATOMIC);
    var code = 'date(' + year + ',' + month + ',' + day + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['datetime_date_methods'] = function(block) {

    var comment = '# The date type is an idealized naive date.  Its attributes are year, month, and day.';
    Blockly.Python.definitions_['import_datetime_date'] = 'from datetime import date  ' + comment;

    var date = Blockly.Python.valueToCode(block, 'DATE', Blockly.Python.ORDER_ATOMIC);
    var method = block.getFieldValue('DROP_METHOD');
    var code = date + '.' + method;

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['datetime_date_attributes'] = function(block) {

    var comment = '# The date type is an idealized naive date.  Its attributes are year, month, and day.';
    Blockly.Python.definitions_['import_datetime_date'] = 'from datetime import date  ' + comment;

    var date = Blockly.Python.valueToCode(block, 'DATE', Blockly.Python.ORDER_ATOMIC);
    var attribute = block.getFieldValue('DROP_ATTRIBUTE');
    var code = date + '.' + attribute;

    return [code, Blockly.Python.ORDER_ATOMIC];
};


