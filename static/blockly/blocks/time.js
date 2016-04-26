/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Blocks.time');

goog.require('Blockly.Blocks');



var COLOR_TIME = Blockly.Hue.TIME;

Blockly.Blocks['time_import'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("import time");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('Pauses execution for the given number of seconds.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.sleep');
    }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Blocks['time_sleep'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.sleep (");
        this.appendValueInput("amount_of_time")
            .setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('Pauses execution for the given number of seconds.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.sleep');
    }
};

Blockly.Blocks['time_timezone'] = {
    init: function () {


        this.appendDummyInput()
            .appendField("time.timezone");
        this.setOutput(true, Blockly.Type.INT);
        this.setInputsInline(true);

        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('Pauses execution for the given number of seconds.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.timezone');
    },
};

Blockly.Blocks['time_tzname'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.tzname");
        this.setOutput(true, Blockly.Type.INT);

        this.setInputsInline(true);

        this.setColour(Blockly.Hue.TUPLE);
        this.setTooltip('Gives the name of timezone of the computer.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.tzname');
    },
};

Blockly.Blocks['time_localtime'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.localtime( )");
        this.setOutput(true, Blockly.Type.STRUCT_TIME);

        this.setInputsInline(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('Returns the current local time as a struct_time named tuple.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.localtime');
    },
};

Blockly.Blocks['time_gmtime'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.gmtime( )");
        this.setOutput(true, Blockly.Type.STRUCT_TIME);

        this.setInputsInline(true);

        this.setColour(COLOR_TIME);
        this.setTooltip('Returns the current greenwich mean time as a struct_time named tuple.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.gmtime');
    },
};

Blockly.Blocks['time_time'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.time( )");
        this.setOutput(true, Blockly.Type.FLOAT);

        this.setInputsInline(true);

        this.setColour(Blockly.Hue.FLOAT);
        this.setTooltip('Return the time in seconds since the epoch.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.time');
    },
};

Blockly.Blocks['time_ctime'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time.ctime(");
        this.appendValueInput("TIME_IN_SEC")
            .setCheck([Blockly.Type.FLOAT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setOutput(true, Blockly.Type.STR);

        this.setInputsInline(true);

        this.setColour(Blockly.Hue.STR);
        this.setTooltip('Return the time in seconds since the epoch.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.time');
    },
};

Blockly.Blocks['time_mktime'] = {
    init: function () {


        //var DROP_MON = this.gen_range(1, 12);
        //var DROP_MDAY = this.gen_range(1, 31);
        //var DROP_HOUR = this.gen_range(1, 23);
        //var DROP_MIN = this.gen_range(1, 59);
        //var DROP_SEC = this.gen_range(0, 61);
        //var DROP_WDAY = this.gen_range(0, 6);
        //var DROP_YDAY = this.gen_range(1, 366);
        var DROP_ISDST = this.gen_range(-1, 1);

        this.appendDummyInput()
            .appendField("time.mktime(");
        this.appendValueInput("tm_year")
            .appendField("  tm_year =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);


        //this.appendDummyInput("tm_mon")
        //    .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.intRangeValidator), 'NUM');
        this.appendValueInput("tm_mon")
            .appendField(", tm_mon =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_mday")
            .appendField(", tm_mday =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_hour")
            .appendField(", tm_hour =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_min")
            .appendField(", tm_min =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_sec")
            .appendField(", tm_sec =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_wday")
            .appendField(", tm_wday =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_yday")
            .appendField(", tm_yday =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("tm_isdst")
            .appendField(", tm_isdst =")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");

        this.setOutput(true, Blockly.Type.FLOAT);

        //this.setInputsInline(true);

        this.setColour(Blockly.Hue.STR);
        this.setTooltip('Return the time in seconds since the epoch.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.time');
    },

    gen_range: function(start, end) {
        var list = [];
        for (var i = start; i <= end; i++) {
            list.push([String(i), String(i)]);
        }
        //console.log(list);
        return list;
    },

    check_range: function(value, low, high){
        if (value < low){
            value = low;
        }
        else if (value > high){
            value = high;
        } else {

        }
        return String(value);
    },

    onchange: function(){
        //var mon = this.getChildren()[0];//.getFieldValue('NUM');
        //
        //mon.setFieldValue(this.check_range(mon.getFieldValue('NUM'), 1970, 2015), "NUM");

        var ranges = [[1900, 5000], [1, 12],[1, 31],[0, 23],[0, 59],
            [0, 61],[0, 6],[1, 366],[-1, 1]];
        var vals = this.getChildren();

        for (var i = 0; i < vals.length; i++){
            vals[i].setFieldValue(this.check_range(vals[i].getFieldValue('NUM'), ranges[i][0], ranges[i][1]), "NUM");
        }

    },
};
