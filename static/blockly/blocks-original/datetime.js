/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Blocks.datetime');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');



var COLOR_DATETIME = Blockly.Hue.DATETIME;


/*
* Begin datetime.date blocks
*/

Blockly.Blocks['datetime_date'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("date(");
        this.appendValueInput("YEAR")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("MONTH")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("DAY")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");

        this.setOutput(true, Blockly.Type.DATETIME_DATE);
        this.setInputsInline(true);

        this.setColour(Blockly.Hue.DATETIME_DATE);
        this.setTooltip('Return the time in seconds since the epoch.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.time');
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

        var ranges = [[1, 9999], [1, 12],[1, 31]];
        var vals = this.getChildren();

        for (var i = 0; i < vals.length; i++){
            vals[i].setFieldValue(this.check_range(vals[i].getFieldValue('NUM'), ranges[i][0], ranges[i][1]), "NUM");
        }
    },
};

Blockly.Blocks['datetime_date_today'] = {
    init: function () {

        var DROPDOWN = [[String.fromCharCode(160), ''], ['.year','.year'], ['.month','.month'], ['.day','.day']];

        this.appendDummyInput()
            .appendField('date.today( )');
        //this.appendDummyInput('METHOD')
        //    .appendField(new Blockly.FieldDropdown(DROPDOWN), 'DROP_METHOD');
        this.setOutput(true, Blockly.Type.DATETIME_DATE);
        this.setInputsInline(true);

        this.setColour(Blockly.Hue.DATETIME_DATE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
};

Blockly.Blocks['datetime_date_methods'] = {

    init: function () {
        var DROPDOWN = [
        ['timetuple( )', 'timetuple()'],
        ['toordinal( )', 'toordinal()'],
        ['weekday( )', 'weekday()'],
        ['isoweekday( )', 'isoweekday()'],
        ['isocalendar( )', 'isocalendar()'],
        ['isoformat( )', 'isoformat()'],
        ['ctime( )', 'ctime()']
        ];

        this.appendDummyInput()
            .appendField("");
        this.appendValueInput("DATE")
            .setCheck([Blockly.Type.DATETIME_DATE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(DROPDOWN), 'DROP_METHOD');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        var m = this.getFieldValue('DROP_METHOD');

        if (m == 'weekday()' || m == 'isoweekday()' || m == 'toordinal()'){
            this.changeOutput(Blockly.Type.INT);
            this.setColour(Blockly.Hue.INTEGER);
        } else if (m == 'timetuple()' || m == 'isocalendar()'){
            this.changeOutput(Blockly.Type.TUPLE);
            this.setColour(Blockly.Hue.TUPLE);
        } else if (m == 'ctime()' || m == 'isoformat()'){
            this.changeOutput(Blockly.Type.STR);
            this.setColour(Blockly.Hue.STR);
        }
    },
};

Blockly.Blocks['datetime_date_attributes'] = {

    init: function () {
        var DROPDOWN = [
        ['year', 'year'],
        ['month', 'month'],
        ['day', 'day'],
        ['min', 'min'],
        ['max', 'max'],
        ['resolution', 'resolution']
        ];

        this.appendDummyInput()
            .appendField("");
        this.appendValueInput("DATE")
            .setCheck([Blockly.Type.DATETIME_DATE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(DROPDOWN), 'DROP_ATTRIBUTE');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        var m = this.getFieldValue('DROP_ATTRIBUTE');

        if (m == 'year' || m == 'month' || m == 'day'){
            this.changeOutput(Blockly.Type.INT);
            this.setColour(Blockly.Hue.INTEGER);
        } else if (m == 'min' || m == 'max'){
            this.changeOutput(Blockly.Type.DATETIME_DATE);
            this.setColour(Blockly.Hue.DATETIME_DATE);
        } else {
            this.changeOutput(Blockly.Type.DATETIME_TIMEDELTA);
            this.setColour(Blockly.Hue.DATETIME_TIMEDELTA);
        }
    },
};

/*
* Begin datetime.time blocks
*/

Blockly.Blocks['datetime_time'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("time(");
        this.appendValueInput("HOUR")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("MINUTE")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("SECOND")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("MICROSECOND")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendValueInput("TZINFO")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");

        this.setOutput(true, Blockly.Type.DATETIME_TIME);

        this.setInputsInline(true);

        this.setColour(Blockly.Hue.DATETIME_TIME);
        this.setTooltip('Return the time in seconds since the epoch.');
        this.setHelpUrl('https://docs.python.org/2/library/time.html#time.time');
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

        var ranges = [[0, 23], [0, 59],[0, 59], [0, 999999]];
        var vals = this.getChildren();

        for (var i = 0; i < vals.length -1; i++){
            vals[i].setFieldValue(this.check_range(vals[i].getFieldValue('NUM'), ranges[i][0], ranges[i][1]), "NUM");
        }
    },
};

Blockly.Blocks['datetime_time_methods'] = {

    init: function () {
        var DROPDOWN = [
        ['isoformat( )', 'isoformat()'],
        ['utcoffset( )', 'utcoffset()'],
        ['dst( )', 'dst()'],
        ['tzname( )', 'tzname()']
        ];

        this.appendDummyInput()
            .appendField("");
        this.appendValueInput("DATE")
            .setCheck([Blockly.Type.DATETIME_DATE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(DROPDOWN), 'DROP_METHOD');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        var m = this.getFieldValue('DROP_METHOD');

        if (m == 'utcoffset()' || m == 'dst()'){
            this.changeOutput(Blockly.Type.INT);
            this.setColour(Blockly.Hue.INTEGER);
        } else if (m == 'tzname()'){
            this.changeOutput(Blockly.Type.TUPLE);
            this.setColour(Blockly.Hue.TUPLE);
        } else if (m == 'isoformat()'){
            this.changeOutput(Blockly.Type.STR);
            this.setColour(Blockly.Hue.STR);
        }
    },
};

Blockly.Blocks['datetime_time_attributes'] = {

    init: function () {
        var DROPDOWN = [
        ['hour', 'hour'],
        ['minute', 'minute'],
        ['second', 'second'],
        ['microsecond', 'microsecond'],
        ['min', 'min'],
        ['max', 'max'],
        ['resolution', 'resolution'],
        ['tzinfo', 'tzinfo']
        ];

        this.appendDummyInput()
            .appendField("");
        this.appendValueInput("DATE")
            .setCheck([Blockly.Type.DATETIME_DATE, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(DROPDOWN), 'DROP_ATTRIBUTE');

        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        var m = this.getFieldValue('DROP_ATTRIBUTE');

        if (m == 'year' || m == 'month' || m == 'day'){
            this.changeOutput(Blockly.Type.INT);
            this.setColour(Blockly.Hue.INTEGER);
        } else if (m == 'min' || m == 'max'){
            this.changeOutput(Blockly.Type.DATETIME_DATE);
            this.setColour(Blockly.Hue.DATETIME_DATE);
        } else if (m == 'resolution'){
            this.changeOutput(Blockly.Type.DATETIME_TIMEDELTA);
            this.setColour(Blockly.Hue.DATETIME_TIMEDELTA);
        } else {
            this.changeOutput(Blockly.Type.DATETIME_TZINFO);
            this.setColour(Blockly.Hue.DATETIME_TZINFO);
        }
    },
};