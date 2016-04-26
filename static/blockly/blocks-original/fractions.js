/**
 * Created by anthony on 8/8/15.
 */

'use strict';

goog.provide('Blockly.Blocks.fractions');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');


var COLOR_FRACTION = Blockly.Hue.FRACTION;

Blockly.Blocks['fractions_import'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("from fractions import Fraction, gcd");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(COLOR_FRACTION);
        this.setTooltip('Imports the fractions library.');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['fractions_import2'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("from fractions_ed import Fraction, Mixed, lcd, gcf");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(COLOR_FRACTION);
        this.setTooltip('Imports the fractions_ed library.');
        this.setHelpUrl('');
    },
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#53syye
Blockly.Blocks['fractions_Fraction'] = {

    init: function () {

        this.block_type = Blockly.Type.FRACTION;
        this.setColour(Blockly.Hue.FRACTION);

        this.appendDummyInput()
            .appendField("Fraction (");
        this.appendValueInput("NUMERATOR")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("DENOMINATOR")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.FRACTION);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_Fraction_as_string'] = {

    init: function () {

        this.block_type = Blockly.Type.FRACTION;
        this.setColour(Blockly.Hue.FRACTION);

        this.appendDummyInput()
            .appendField("Fraction");
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("FRACTION")
            .setCheck([Blockly.Type.STR, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.FRACTION);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_Mixed'] = {

    init: function () {

        this.block_type = Blockly.Type.MIXED;
        this.setColour(Blockly.Hue.MIXED);

        this.appendDummyInput()
            .appendField("Mixed");
        this.appendDummyInput()
            .appendField("(");
        this.appendValueInput("MIX")
            .setCheck([Blockly.Type.STR, Blockly.Type.FRACTION, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.MIXED);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_num_denom'] = {
    /**
     * Block for pen up/down.
     * @this Blockly.Block
     */
    init: function () {

        this.block_type = Blockly.Type.INT;
        this.setColour(Blockly.Hue.INTEGER);

        var What = [['numerator', 'numerator'], ['denominator', 'denominator']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable('f'), 'VAR')
            .appendField('.');
        this.appendDummyInput('DROP')
            .appendField(new Blockly.FieldDropdown(What), 'WHAT');

        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        this.setHelpUrl("");
        this.setTooltip('');
    }
};


Blockly.Blocks['fractions_gcd'] = {

    init: function () {
        this.block_type = Blockly.Type.INT;

        this.appendDummyInput()
            .appendField("gcf (");
        this.appendValueInput("FIRST")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("SECOND")
            .setCheck([Blockly.Type.INT, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Msg.INT);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_lcd'] = {

    init: function () {
        this.block_type = Blockly.Type.INT;

        this.appendDummyInput()
            .appendField("lcd (");
        this.appendValueInput("FIRST")
            .setCheck([Blockly.Type.FRACTION, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("SECOND")
            .setCheck([Blockly.Type.FRACTION, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Msg.INT);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_reduce'] = {

    init: function () {

        this.block_type = Blockly.Type.NONE;

        this.appendValueInput("FRACTION")
            .setCheck([Blockly.Type.FRACTION, Blockly.Type.MIXED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("reduced");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, Blockly.Type.NONE);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.NONE);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    set_to_none: function () {
        this.setColour(Blockly.Hue.NONE);
        this.changeOutput(Blockly.Type.NONE);
        this.block_type = Blockly.Type.NONE;
    },
    
    set_to_fraction: function () {
        this.setColour(Blockly.Hue.FRACTION);
        this.changeOutput(Blockly.Type.FRACTION);
        this.block_type = Blockly.Type.FRACTION;
    },
    
    set_to_mixed: function () {
        this.setColour(Blockly.Hue.MIXED);
        this.changeOutput(Blockly.Type.MIXED);
        this.block_type = Blockly.Type.MIXED;
    },
    
    onchange: function () {
        var blockA = this.getInputTargetBlock('FRACTION');
        
        if (blockA == null) {
            this.set_to_none();
        }  else if (blockA != null && blockA.block_type == Blockly.Type.FRACTION) {
            this.set_to_fraction();
        } else if (blockA != null && blockA.block_type == Blockly.Type.MIXED) {
            this.set_to_mixed();
        } else {
            
        }
    }
};

// Blockly.Blocks['fractions_reduce_details'] = {
//
//     init: function () {
//
//         this.block_type = Blockly.Type.TUPLE;
//
//
//         this.appendValueInput("FRACTION")
//             .setCheck([Blockly.Type.FRACTION, Blockly.Type.NONE]);
//         this.appendDummyInput()
//             .appendField(".");
//         this.appendDummyInput()
//             .appendField("reduce_details");
//         this.appendDummyInput()
//             .appendField("(");
//         this.appendDummyInput()
//             .appendField(")");
//         this.setInputsInline(true);
//         this.setOutput(true, this.block_type);
//         //this.setPreviousStatement(true);
//         //this.setNextStatement(true);
//
//         this.setColour(Blockly.Hue.TUPLE);
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };

Blockly.Blocks['fractions_is_improper'] = {

    init: function () {

        this.block_type = Blockly.Type.BOOL;


        this.appendValueInput("FRACTION")
            .setCheck([Blockly.Type.FRACTION, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("is_improper");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.BOOL);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_as_mixed'] = {

    init: function () {

        this.block_type = Blockly.Type.MIXED;


        this.appendValueInput("FRACTION")
            .setCheck([Blockly.Type.FRACTION, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("as_mixed");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.MIXED);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_mixed_as_improper'] = {

    init: function () {

        this.block_type = Blockly.Type.FRACTION;


        this.appendValueInput("MIX")
            .setCheck([Blockly.Type.MIXED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("as_improper");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.FRACTION);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_mixed_whole_part'] = {

    init: function () {

        this.block_type = Blockly.Type.INT;


        this.appendValueInput("MIX")
            .setCheck([Blockly.Type.MIXED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("whole_part");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.INTEGER);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_mixed_fraction_part'] = {

    init: function () {

        this.block_type = Blockly.Type.FRACTION;


        this.appendValueInput("MIX")
            .setCheck([Blockly.Type.MIXED, Blockly.Type.NONE]);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput()
            .appendField("fraction_part");
        //this.appendDummyInput()
        //    .appendField("(");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, this.block_type);
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);

        this.setColour(Blockly.Hue.FRACTION);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['fractions_import_mixed'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("from fractions_ed import Mixed");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Hue.MIXED);
        this.setTooltip('Imports the fractions_ed library Mixed class.');
        this.setHelpUrl('');
    },
};