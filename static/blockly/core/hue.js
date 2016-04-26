/**
 * Created by anthony on 2/1/16.
 */
'use strict';

goog.provide('Blockly.Hue');


Blockly.Hue.NONE = NaN;

// Numbers
Blockly.Hue.FLOAT = 30;//15;
Blockly.Hue.LONG = 30;
Blockly.Hue.INTEGER = 45;//50;

Blockly.Hue.BOOL = 130;//140;

Blockly.Hue.STR = 312;

Blockly.Hue.TUPLE = 230;
Blockly.Hue.LIST = 210;
Blockly.Hue.DICT = 190;
Blockly.Hue.KEYVAL = 170;

Blockly.Hue.PIBRELLA = 270;
Blockly.Hue.PILITER = 250;

Blockly.Hue.TIME = 0;
Blockly.Hue.OS = 0;
Blockly.Hue.SYS = 0;
Blockly.Hue.COLLECTIONS = 0;


Blockly.Hue.DATETIME_DATE = 0;
Blockly.Hue.DATETIME_TIME = 0;
Blockly.Hue.DATETIME_DATETIME = 0;
Blockly.Hue.DATETIME_TIMEDELTA = 0;
Blockly.Hue.DATETIME_TZINFO = 0;


Blockly.Hue.TURTLE = 120;
Blockly.Hue.TURTLE_SCREEN = 35;
Blockly.Hue.COLOUR = 20;

Blockly.Hue.LOOP = 322;
Blockly.Hue.VARIABLE = NaN;

//Blockly.Hue.TYPE_INTEGER = Blockly.Hue.INTEGER;
//Blockly.Hue.TYPE_FLOAT = Blockly.Hue.FLOAT;
//Blockly.Hue.TYPE_BOOL = Blockly.Hue.BOOL;

Blockly.Hue.GPIO = 270;
Blockly.Hue.FUNCTIONS = 30;
Blockly.Hue.OBJECTS = 290;
Blockly.Hue.METHODS = 30;
Blockly.Hue.PROPERTIES = NaN;

Blockly.Hue.FRACTION = 325;
Blockly.Hue.MIXED = 345;

Blockly.Hue.LED = 0;
Blockly.Hue.RGBLED = Blockly.Hue.LED;
Blockly.Hue.PWMLED = Blockly.Hue.LED;
Blockly.Hue.BUTTON = 330;
Blockly.Hue.BUZZER = 100;
Blockly.Hue.MOTIONSENSOR = 340;
Blockly.Hue.PILITER = 350;
Blockly.Hue.STEPPER = 350;
Blockly.Hue.EXPLORERHAT = 270;

Blockly.Hue.ALL_COLORS = [
    Blockly.Hue.FLOAT,
    Blockly.Hue.INTEGER,
    Blockly.Hue.BOOL,
    Blockly.Hue.STR,
    Blockly.Hue.TUPLE,
    Blockly.Hue.LONG,
    Blockly.Hue.LIST,
    Blockly.Hue.NONE,
    Blockly.Hue.DICT,
    Blockly.Hue.TURTLE,
    Blockly.Hue.TURTLE_SCREEN,
    Blockly.Hue.COLOUR,
    Blockly.Hue.LOOP,
    Blockly.Hue.VARIABLE,
    Blockly.Hue.GPIO,
    Blockly.Hue.FUNCTIONS,
    Blockly.Hue.OBJECTS,
    Blockly.Hue.METHODS,
    Blockly.Hue.PROPERTIES,
    Blockly.Hue.FRACTION,
    Blockly.Hue.MIXED,
    Blockly.Hue.LED,
    Blockly.Hue.RGBLED,
    Blockly.Hue.PWMLED,
    Blockly.Hue.BUTTON,
    Blockly.Hue.BUZZER,
    Blockly.Hue.MOTIONSENSOR,
    Blockly.Hue.PILITER,
    Blockly.Hue.STEPPER,
    Blockly.Hue.EXPLORERHAT
];