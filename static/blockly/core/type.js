/**
 * Created by anthony on 2/1/16.
 */
'use strict';

goog.provide('Blockly.Type');

// Block types.

/// null type.
Blockly.Type.NULL = null;

/// Javascript Array.
Blockly.Type.ARRAY = 'Array';
/// Python List
Blockly.Type.LIST = 'List';
/// Tuple
Blockly.Type.TUPLE = 'Tuple';
/// Dictionary
Blockly.Type.DICT = 'Dict';
/// Integer.
Blockly.Type.INT = 'int';
/// Floating point number.
Blockly.Type.FLOAT = 'float';
/// A number which is either a floating point or an integer.  This helps with functions that take either or a mixture as intputs
Blockly.Type.NUMBER = 'Number';
/// A Boolean.
Blockly.Type.BOOL = 'Boolean';
/// A string.
Blockly.Type.STR = 'String';
/// None type.
Blockly.Type.NONE = 'none';
/// A long.
Blockly.Type.LONG = 'long';
/// A struct_time.  A named tuple holding time information.
Blockly.Type.STRUCT_TIME = 'struct_time';
/// A datetime.date.
Blockly.Type.DATETIME_DATE = 'datetime_date';
/// A datetime.time.
Blockly.Type.DATETIME_TIME = 'datetime_time';
/// A datetime.datetime.
Blockly.Type.DATETIME_DATETIME = 'datetime_datetime';
/// A datetime.timedelta.
Blockly.Type.DATETIME_TIMEDELTA = 'datetime_timedelta';
/// A datetime.tzinfo.
Blockly.Type.DATETIME_TZINFO = 'datetime_tzinfo';
/// A key-value pair for a dictionary.
Blockly.Type.KEYVALUE = 'key-value pair';
/// A type.
Blockly.Type.TYPE = 'type';
/// A turtle object.
Blockly.Type.TURTLE = 'Turtle';
/// A turtle screen object.
Blockly.Type.TURTLE_SCREEN = 'Screen';
/// A colour.
Blockly.Type.COLOUR = 'Colour';
/// A fraction
Blockly.Type.FRACTION = 'Fraction';
/// A fraction
Blockly.Type.MIXED = 'Mixed';
/// GPIO Zero library.
Blockly.Type.GPIOZERO = 'Zero';
/// LED class in GPIO Zero library
Blockly.Type.LED = "LED";
/// RGBLED class in GPIO Zero library
Blockly.Type.RGBLED = "RGBLED";
/// PWMLED class in GPIO Zero library
Blockly.Type.PWMLED = "PWMLED";
/// Button class in GPIO Zero library
Blockly.Type.BUTTON = 'Button';
/// Buzzer class in GPIO Zero library
Blockly.Type.BUZZER = 'Buzzer';
/// MotionSensor class in GPIO Zero library
Blockly.Type.MOTIONSENSOR = 'MotionSensor';
/// PiLiter Board class in GPIO Zero library
Blockly.Type.PILITER = 'PiLiter';
/// PiLiter Board class in GPIO Zero library
Blockly.Type.STEPPER = 'Stepper';
/// Pimoroni Explorer HAT/pHAT Board class
Blockly.Type.EXPLORERHAT = 'ExplorerHat';
/// All the types.
Blockly.Type.ALL = [
    Blockly.Type.LONG,
    Blockly.Type.NONE,
    Blockly.Type.STR,
    Blockly.Type.BOOL,
    Blockly.Type.FLOAT,
    Blockly.Type.INT,
    Blockly.Type.DICT,
    Blockly.Type.TUPLE,
    Blockly.Type.LIST,
    Blockly.Type.STRUCT_TIME,
    Blockly.Type.KEYVALUE,
    Blockly.Type.TURTLE,
    Blockly.Type.TURTLE_SCREEN,
    Blockly.Type.COLOUR,
    Blockly.Type.FRACTION,
    Blockly.Type.MIXED,
    Blockly.Type.GPIOZERO,
    Blockly.Type.LED,
    Blockly.Type.BUTTON,
    Blockly.Type.BUZZER,
    Blockly.Type.MOTIONSENSOR,
    Blockly.Type.PILITER,
    Blockly.Type.STEPPER,
    Blockly.Type.EXPLORERHAT
];
