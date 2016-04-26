/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.numbers');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');


Blockly.Blocks.numbers.HUE = 230;
Blockly.Blocks.numbers.INT = 230;
// Blockly.Hue.FLOAT = 30


Blockly.Blocks.numbers.SYMBOL_ADDITION = '+';
Blockly.Blocks.numbers.SYMBOL_SUBTRACTION = '-';
Blockly.Blocks.numbers.SYMBOL_MULTIPLICATION = '*';
Blockly.Blocks.numbers.SYMBOL_DIVISION = '/';
Blockly.Blocks.numbers.SYMBOL_POWER = '**';
Blockly.Blocks.numbers.SYMBOL_MODULUS = '%';

Blockly.Blocks.numbers.SYMBOL_EQUALS = '=';
Blockly.Blocks.numbers.SYMBOL_PLUS_EQUALS = '+=';
Blockly.Blocks.numbers.SYMBOL_MINUS_EQUALS = '-=';
Blockly.Blocks.numbers.SYMBOL_TIMES_EQUALS = '*=';
Blockly.Blocks.numbers.SYMBOL_DIVIDE_EQUALS = '/=';


Blockly.Blocks['numbers_int'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.NUMBERS_INT_HELPURL);
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.intValidator), 'NUM');
        this.setOutput(true, Blockly.Type.INT);
        this.setTooltip(Blockly.Msg.NUMBERS_INT_TOOLTIP);

        this.block_type = 'int';
    }
};

Blockly.Blocks['numbers_float'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        // console.log("START init for numbers_float");
        this.setHelpUrl(Blockly.Msg.NUMBERS_FLOAT_HELPURL);
        this.setColour(Blockly.Hue.FLOAT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('0.0', Blockly.FieldTextInput.floatValidator), 'NUM');
        this.setOutput(true, Blockly.Type.FLOAT);
        this.setTooltip(Blockly.Msg.NUMBERS_FLOAT_TOOLTIP);

        this.block_type = 'float';
        // console.log("FINISH init for numbers_float");

    }
};

// AJL: TODO: Possibly add Boolean inputs as OK with int output if Bool + int or Bool + Bool
Blockly.Blocks['numbers_arithmetic'] = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function () {
        // console.log("Begin numbers_arithmetic init");
        var OPERATORS = [
            ["+", 'ADD'],
            ["-", 'MINUS'],
            ["*", 'MULTIPLY'],
            ["/", 'DIVIDE'],
            ["//", 'DIVIDE_FLOOR'],
            ["**", 'POWER'],
            ["%", 'MODULUS']
        ];
        this.setHelpUrl(Blockly.Msg.NUMBERS_ARITHMETIC_HELPURL);
        this.setColour(Blockly.Hue.NONE);//Blockly.Blocks.numbers.HUE);
        this.setOutput(true, 'none');
        this.appendValueInput('A')
            .setCheck([
                Blockly.Type.INT,
                Blockly.Type.FLOAT,
                Blockly.Type.BOOL,
                Blockly.Type.STR,
                Blockly.Type.TUPLE,
                Blockly.Type.LIST,
                Blockly.Type.FRACTION,
                Blockly.Type.MIXED,
                Blockly.Type.NONE
            ]);
        this.appendValueInput('B')
            .setCheck([
                Blockly.Type.INT,
                Blockly.Type.FLOAT,
                Blockly.Type.BOOL,
                Blockly.Type.STR,
                Blockly.Type.TUPLE,
                Blockly.Type.LIST,
                Blockly.Type.FRACTION,
                Blockly.Type.MIXED,
                Blockly.Type.NONE
            ])
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'ADD': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_ADD,
                'MINUS': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_MINUS,
                'MULTIPLY': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_MULTIPLY,
                'DIVIDE': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_DIVIDE,
                'POWER': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_POWER,
                'MODULUS': Blockly.Msg.NUMBERS_ARITHMETIC_TOOLTIP_DIVIDE
            };
            return TOOLTIPS[mode];
        });
        // console.log("End numbers_arithmetic init on to onchange");
        //this.onchange;
    },

    set_to_float: function () {
        this.setColour(Blockly.Hue.FLOAT);
        this.changeOutput(Blockly.Type.FLOAT);
        //this.block_type = Blockly.Type.FLOAT;
    },

    set_to_int: function () {
        this.setColour(Blockly.Hue.INTEGER);
        this.changeOutput(Blockly.Type.INT);
        //this.block_type = Blockly.Type.INT;
    },
    set_to_str: function () {
        this.setColour(Blockly.Hue.STR);
        this.changeOutput(Blockly.Type.STR);
    },
    set_to_list: function () {
        this.setColour(Blockly.Hue.LIST);
        this.changeOutput(Blockly.Type.LIST);
    },
    set_to_tuple: function () {
        this.setColour(Blockly.Hue.TUPLE);
        this.changeOutput(Blockly.Type.TUPLE);
    },
    set_to_fraction: function () {
        this.setColour(Blockly.Hue.FRACTION);
        this.changeOutput(Blockly.Type.FRACTION);
    },
    set_to_mixed: function () {
        this.setColour(Blockly.Hue.MIXED);
        this.changeOutput(Blockly.Type.MIXED);
    },
    set_to_none: function () {
        this.setColour(Blockly.Hue.NONE);
        this.changeOutput(Blockly.Type.NONE);
    },
    getTheType: function (block) {
        var block_connections = block.getConnections_();
        var block_type = block_connections[0].check_;
        // console.log("Block A Type: " + a_type);

        return block_type;
    },
    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @this Blockly.Block
     */
    onchange: function () {

        var blockA = this.getInputTargetBlock('A');
        var blockB = this.getInputTargetBlock('B');

        if (blockA != null) {
            var a_type = this.getTheType(blockA);
        } else {
            a_type = 'none';
        }
        if (blockB != null) {
            var b_type = this.getTheType(blockB);
            // console.log("Block B Type: " + b_type);
        } else {
            b_type = 'none';
        }

        //console.log("a_type: " + a_type + ";  b_type: " + b_type);
        if (this.getFieldValue('OP') == 'ADD') {
            if (blockA == null && blockB == null) {
                this.set_to_none();
            } else if ((blockA != null && a_type == Blockly.Type.STR) && (blockB != null && b_type == Blockly.Type.STR)) {
                this.set_to_str();
            } else if (
                ((blockA != null && a_type == Blockly.Type.STR) && (blockB != null && b_type != Blockly.Type.STR)) ||
                ((blockA != null && a_type != Blockly.Type.STR) && (blockB != null && b_type == Blockly.Type.STR))) {
                this.set_to_none()
            } else if ((blockA != null && a_type == Blockly.Type.LIST) && (blockB != null && b_type == Blockly.Type.LIST)) {
                this.set_to_list()
            } else if (
                ((blockA != null && a_type == Blockly.Type.LIST) && (blockB != null && b_type != Blockly.Type.LIST)) ||
                ((blockA != null && a_type != Blockly.Type.LIST) && (blockB != null && b_type == Blockly.Type.LIST))) {
                this.set_to_none();
            } else if ((blockA != null && a_type == Blockly.Type.TUPLE) && (blockB != null && b_type == Blockly.Type.TUPLE)) {
                this.set_to_tuple()
            } else if (
                ((blockA != null && a_type == Blockly.Type.TUPLE) && (blockB != null && b_type != Blockly.Type.TUPLE)) ||
                ((blockA != null && a_type != Blockly.Type.TUPLE) && (blockB != null && b_type == Blockly.Type.TUPLE))) {
                this.set_to_none();
            } else if ((blockA != null && a_type == Blockly.Type.FLOAT) || (blockB != null && b_type == Blockly.Type.FLOAT)) {
                this.set_to_float();
            } else if (
                (blockA != null && a_type == Blockly.Type.INT) ||
                (blockB != null && b_type == Blockly.Type.INT) ||
                (blockA != null && a_type == Blockly.Type.BOOL) ||
                (blockB != null && b_type == Blockly.Type.BOOL)) {
                this.set_to_int();
            } else {
                this.set_to_none();
            }
        } else if (this.getFieldValue('OP') == 'MULTIPLY') {
            if (blockA == null && blockB == null) {
                this.set_to_none();
            } else if (
                ((blockA != null && a_type == Blockly.Type.STR) && (blockB != null && b_type == Blockly.Type.INT)) ||
                ((blockA != null && a_type == Blockly.Type.INT) && (blockB != null && b_type == Blockly.Type.STR)) ||
                ((blockA != null && a_type == Blockly.Type.STR) && (blockB != null && b_type == Blockly.Type.BOOL)) ||
                ((blockA != null && a_type == Blockly.Type.BOOL) && (blockB != null && b_type == Blockly.Type.STR))) {
                this.set_to_str();
             } else if (
                (blockA != null && a_type == Blockly.Type.STR) || (blockB != null && b_type == Blockly.Type.STR)) {
                this.set_to_none();
            } else if (
                ((blockA != null && a_type == Blockly.Type.LIST) && (blockB != null && b_type == Blockly.Type.INT)) ||
                ((blockA != null && a_type == Blockly.Type.INT) && (blockB != null && b_type == Blockly.Type.LIST)) ||
                ((blockA != null && a_type == Blockly.Type.LIST) && (blockB != null && b_type == Blockly.Type.BOOL)) ||
                ((blockA != null && a_type == Blockly.Type.BOOL) && (blockB != null && b_type == Blockly.Type.LIST))) {
                this.set_to_list();
            } else if (
                (blockA != null && a_type == Blockly.Type.LIST) || (blockB != null && b_type == Blockly.Type.LIST)) {
                this.set_to_none();
            } else if (
                ((blockA != null && a_type == Blockly.Type.TUPLE) && (blockB != null && b_type == Blockly.Type.INT)) ||
                ((blockA != null && a_type == Blockly.Type.INT) && (blockB != null && b_type == Blockly.Type.TUPLE)) ||
                ((blockA != null && a_type == Blockly.Type.TUPLE) && (blockB != null && b_type == Blockly.Type.BOOL)) ||
                ((blockA != null && a_type == Blockly.Type.BOOL) && (blockB != null && b_type == Blockly.Type.TUPLE))) {
                this.set_to_tuple();
            } else if (
                (blockA != null && a_type == Blockly.Type.TUPLE) || (blockB != null && b_type == Blockly.Type.TUPLE)) {
                this.set_to_none();
            } else if ((blockA != null && a_type == Blockly.Type.FLOAT) || (blockB != null && b_type == Blockly.Type.FLOAT)) {
                this.set_to_float();
            } else if (
                (blockA != null && a_type == Blockly.Type.INT) ||
                (blockB != null && b_type == Blockly.Type.INT) ||
                (blockA != null && a_type == Blockly.Type.BOOL) ||
                (blockB != null && b_type == Blockly.Type.BOOL)) {
                this.set_to_int();
            } else {
                this.set_to_none();
            }
        } else {

            if (
                (blockA != null && a_type == Blockly.Type.STR) || (blockB != null && b_type == Blockly.Type.STR) ||
                (blockA != null && a_type == Blockly.Type.LIST) || (blockB != null && b_type == Blockly.Type.LIST) ||
                (blockA != null && a_type == Blockly.Type.TUPLE) || (blockB != null && b_type == Blockly.Type.TUPLE)) {
                this.set_to_none();

            } else if ((blockA != null && a_type == Blockly.Type.FLOAT) || (blockB != null && b_type == Blockly.Type.FLOAT)) {
                this.set_to_float();
            } else if (
                (blockA != null && a_type == Blockly.Type.INT) ||
                (blockB != null && b_type == Blockly.Type.INT) ||
                (blockA != null && a_type == Blockly.Type.BOOL) ||
                (blockB != null && b_type == Blockly.Type.BOOL)) {
                this.set_to_int();
            } else {
                this.set_to_none();
            }
        }
        var this_connections = this.getConnections_();
    }
};


Blockly.Blocks['numbers_something_equals_tovar'] = {
    init: function () {
        var OPERATORS =
            [
                ["+", 'ADD'],
                ["-", 'MINUS'],
                ["*", 'MULTIPLY'],
                ["/", 'DIVIDE']
            ];
        this.setHelpUrl('http://www.example.com/');
        this.setColour();
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "VAR")
            .appendField(new Blockly.FieldDropdown(OPERATORS), "OP");
        this.appendValueInput("VALUE")
            .setCheck([Blockly.Type.NONE, Blockly.Type.INT, Blockly.Type.FLOAT]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.block_type = 'none';
    },
    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @this Blockly.Block
     */
    onchange: function () {
        // console.log("BEGIN-- variables_set.onchange");
        var blockA = this.getInputTargetBlock('VALUE');
        if (this.getInputTargetBlock('VALUE') != null) {//blockA != null) {

            var blockA_connections = blockA.getConnections_();
            var blockA_type = blockA_connections[0].check_;

            this.block_type = blockA.block_type;
            this.setColour(blockA.getColour());
        } else {
            this.setColour();
            this.block_type = 'none';
        }

    }

};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ixmhvn
Blockly.Blocks['numbers_cast_int'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.INTEGER);
        this.appendDummyInput('TEXT')
            .appendField("int");
        this.appendDummyInput()
            .appendField("(")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("CAST");
            //.setCheck([Blockly.Type.INT, Blockly.Type.FLOAT, Blockly.Type.STR, Blockly.Type.BOOL, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.INT);
        this.setTooltip('');
    }
};

Blockly.Blocks['numbers_cast_float'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(Blockly.Hue.FLOAT);
        this.appendDummyInput('TEXT')
            .appendField("float");
        this.appendDummyInput()
            .appendField("(")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("CAST")
            .setCheck([Blockly.Type.NUMBER, Blockly.Type.INT, Blockly.Type.STR, Blockly.Type.BOOL])
        this.appendDummyInput()
            .appendField(")")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.FLOAT);
        this.setTooltip('');
    }
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yukf32
 * @type {{init: Function}}
 */
Blockly.Blocks['numbers_to_base'] = {
    init: function () {
        this.appendDummyInput('MENU')
            .appendField(new Blockly.FieldDropdown([["bin", "BIN"], ["oct", "OCT"], ["dec", "DEC"], ["hex", "HEX"]]), "BASE");
        this.appendDummyInput()
            .appendField("(")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("NUMBER")
            .setCheck([Blockly.Type.INT, Blockly.Type.BOOL, Blockly.Type.NONE]);
            //.appendField("convert");
        this.appendDummyInput()
            .appendField(")")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.STR);
        this.setColour(Blockly.Hue.STR);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['numbers_properties'] = {
  /**
   * Block for checking if a number is even, odd, prime, whole, positive,
   * negative or if it is divisible by certain number.
   * @this Blockly.Block
   */
  init: function() {
    var PROPERTIES =
        [[Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
         [Blockly.Msg.MATH_IS_ODD, 'ODD'],
         [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
         [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
         [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
         [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput('NUMBER_TO_CHECK')
        .setCheck([Blockly.Type.FLOAT, Blockly.Type.INT]);
    var dropdown = new Blockly.FieldDropdown(PROPERTIES, function(option) {
      var divisorInput = (option == 'DIVISIBLE_BY');
      this.sourceBlock_.updateShape_(divisorInput);
    });
    this.appendDummyInput()
        .appendField(dropdown, 'PROPERTY');
    this.setInputsInline(true);
    this.setOutput(true, Blockly.Type.BOOL);
    this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
  },
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
            .setCheck(Blockly.Type.INT);
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};


