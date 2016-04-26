
'use strict';

goog.provide('Blockly.Python.random');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords('math,random');

Blockly.Python['random_int'] = function (block) {
    // Random integer between [X] and [Y].
    // Blockly.Python.imports_['import_random_int'] = 'from random import randint';
    Blockly.Python.generate_imports('random', 'randint');

    var argument0 = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || '';
    var argument1 = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || '';
    var code = 'randint(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['random_float'] = function (block) {
    // Random fraction between 0 and 1.
    //Blockly.Python.imports_['import_random_float'] = 'from random import random';
    Blockly.Python.generate_imports('random', 'random');

    return ['random()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['random_uniform'] = function (block) {
    // Random integer between [X] and [Y].
     //Blockly.Python.imports_['import_random_uniform'] = 'from random import uniform';
    Blockly.Python.generate_imports('random', 'uniform');

    var argument0 = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || '';
    var argument1 = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || '';
    var code = 'uniform(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['random_randrange'] = function (block) {
    // Random integer between [X] and [Y].
    //Blockly.Python.imports_['import_random'] = 'from random import randrange';
    Blockly.Python.generate_imports('random', 'randrange');

    var argument0 = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || '';
    var argument1 = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || '';
    var argument2 = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_NONE) || '';
    var code = 'randrange(' + argument0 + ', ' + argument1 + ', ' + argument2 +')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['random_choice'] = function (block) {
    // Random
    Blockly.Python.generate_imports('random', 'choice');
        //Blockly.Python.imports_['import_random'] = 'from random import choice';

    var argument0 = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_NONE) || '';
    var code = 'choice(' + argument0 + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};
