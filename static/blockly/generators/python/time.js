/**
 * Created by anthony on 8/8/15.
 */

/**
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.time');

goog.require('Blockly.Python');

Blockly.Python['time_import'] = function (block) {

    Blockly.Python.definitions_['import_time'] = '# The time standard library contains sleep().\nimport time\n';
    return "";
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Python['time_sleep'] = function(block) {

    var comment = '# The time standard library contains sleep().';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';
    var value_amount_of_time = Blockly.Python.valueToCode(block, 'amount_of_time', Blockly.Python.ORDER_ATOMIC) || 1;
    return 'time.sleep(' + value_amount_of_time + ')\n';
};

Blockly.Python['time_timezone'] = function(block) {

    var comment = '# The time standard library contains timezone.';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    return ['time.timezone', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_tzname'] = function(block) {

    var comment = '# The time standard library contains tzname.';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    return ['time.tzname', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_localtime'] = function(block) {

    var comment = '# The time standard library contains localtime.';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    return ['time.localtime()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_gmtime'] = function(block) {

    var comment = '# The time standard library contains gmtime.';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    return ['time.gmtime()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_time'] = function(block) {

    var comment = '# The time standard library contains time().';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    return ['time.time()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_ctime'] = function(block) {

    var comment = '# The time standard library contains ctime.';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    var time_in_sec = Blockly.Python.valueToCode(block, 'TIME_IN_SEC', Blockly.Python.ORDER_ATOMIC);


    var code = 'time.ctime(' + time_in_sec + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['time_mktime'] = function(block) {

    var comment = '# The time standard library contains mktime().';
    //Blockly.Python.definitions_['import_time'] = comment + '\nimport time';

    var year = Blockly.Python.valueToCode(block, 'tm_year', Blockly.Python.ORDER_ATOMIC);
    var mon = Blockly.Python.valueToCode(block, 'tm_mon', Blockly.Python.ORDER_ATOMIC);
    var mday = Blockly.Python.valueToCode(block, 'tm_mday', Blockly.Python.ORDER_ATOMIC);
    var hour = Blockly.Python.valueToCode(block, 'tm_hour', Blockly.Python.ORDER_ATOMIC);
    var min = Blockly.Python.valueToCode(block, 'tm_min', Blockly.Python.ORDER_ATOMIC);
    var sec = Blockly.Python.valueToCode(block, 'tm_sec', Blockly.Python.ORDER_ATOMIC);
    var wday = Blockly.Python.valueToCode(block, 'tm_wday', Blockly.Python.ORDER_ATOMIC);
    var yday = Blockly.Python.valueToCode(block, 'tm_yday', Blockly.Python.ORDER_ATOMIC);
    var isdst = Blockly.Python.valueToCode(block, 'tm_isdst', Blockly.Python.ORDER_NONE);

    var code = 'time.mktime((' +
        year + ',' +
        mon + ',' +
        mday + ',' +
        hour + ',' +
        min + ',' +
        sec + ',' +
        wday + ',' +
        yday + ',' +
        isdst + '))';

    return [code, Blockly.Python.ORDER_ATOMIC];
};
