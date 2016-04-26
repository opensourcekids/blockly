
'use strict';

goog.provide('Blockly.Python.gpiozero');

goog.require('Blockly.Python');

//Blockly.Python.addReservedWords('RPIO');
Blockly.Python.addReservedWords('BOARD');

Blockly.Python.addReservedWords('start');
Blockly.Python.addReservedWords('MODE');


Blockly.Python['gpiozero_libraries'] = function (block) {
    return [block.getFieldValue("LIB"), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_import'] = function (block) {

    var libraries = new Array(block.itemCount_);

    for (var n = 0; n < block.itemCount_; n++) {
        libraries[n] = Blockly.Python.valueToCode(block, 'LIB' + n, Blockly.Python.ORDER_NONE);
            //block.getFieldValue('LIBRARY' + n);
    }
    var libs = libraries.join(', ');
    //console.log("LIBS = " + libs);

    var comment = '# Bring GPIO Zero libraries into program:\n';
    Blockly.Python.definitions_['import_gpiozero'] = comment + 'from gpiozero import ' + libs + "\n";
    return "";
};

Blockly.Python['gpiozero_pins'] = function (block) {

    return [block.getFieldValue('pin_number'), Blockly.Python.ORDER_ATOMIC] ;
};

Blockly.Python['gpiozero_led'] = function (block) {

    //Blockly.Python.valueToCode(block, block.getFieldValue('LIB' + n), Blockly.Python.ORDER_NONE);
    var choice = block.getFieldValue('CLASS');


    var count = block.itemCount_;
    if (count > 2){
        count = 2;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return [choice + "(" + params.join(", ") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_rgbled'] = function (block) {

    var params = new Array(3);
    for (var n = 0; n < 3; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return ["RGBLED(" + params.join(", ") + ")", Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['gpiozero_led_on_off_toggle'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var op = block.getFieldValue("OP");


    return led + "." + op + "\n";
};

Blockly.Python['gpiozero_led_blink'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    var count = block.itemCount_;
    if (count <= 2) {
        count = 2;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return led + ".blink(" + params.join(", ") + ")\n";
};


Blockly.Python['gpiozero_led_pin'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".pin", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_on_off_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var op = block.getFieldValue("OP");

    return [led + "." + op, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_islit'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".is_lit", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_value_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".value", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_value_in'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return led + ".value = " + value + "\n";
};

Blockly.Python['gpiozero_pwmled_value_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".value", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_pwmled_value_in'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return led + ".value = " + value + "\n";
};


Blockly.Python['gpiozero_led_rgb_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var color = block.getFieldValue('COLOR');


    return [led + color, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_rgb_in'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var color = block.getFieldValue('COLOR');
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return led + color + " = " + value + "\n";
};


Blockly.Python['gpiozero_led_rgb_value_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".value", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_led_rgb_value_in'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return led + ".value = " + value + "\n";
};

Blockly.Python['gpiozero_rgbled_on_off_toggle'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var color = block.getFieldValue("COLOR");
    var op = block.getFieldValue("OP");

    return led + color + op + "\n";
};
//==========BEGIN GPIOZERO Buzzer section==========
Blockly.Python['gpiozero_buzzer'] = function (block) {

    var count = block.itemCount_;
    if (count > 2) {
        count = 2;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return ["Buzzer(" + params.join(", ") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_buzzer_on_off_toggle'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);
    var op = block.getFieldValue("OP");

    return buzzer + "." + op + "\n";
};

Blockly.Python['gpiozero_buzzer_beep'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);

    var count = block.itemCount_;
    if (count <= 2) {
        count = 2;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return buzzer + ".beep(" + params.join(", ") + ")\n";
};

Blockly.Python['gpiozero_buzzer_pin'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);

    return [buzzer + ".pin", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_buzzer_isactive'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);

    return [buzzer + ".is_active", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_buzzer_value_out'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);

    return [buzzer + ".value", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_buzzer_value_in'] = function (block) {

    var buzzer = Blockly.Python.valueToCode(block, "Buzzer", Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return buzzer + ".value = " + value + "\n";
};
//==========END GPIOZERO Buzzer section==========

//==========BEGIN GPIOZERO Button section==========
Blockly.Python['gpiozero_button'] = function (block) {

    var count = block.itemCount_;
    if (count > 3) {
        count = 3;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return ["Button(" + params.join(", ") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_button_when_pressed'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "Button", Blockly.Python.ORDER_NONE);
    var val = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return button + ".when_pressed = " + val + "\n";
};

Blockly.Python['gpiozero_button_when_released'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "Button", Blockly.Python.ORDER_NONE);
    var val = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return button + ".when_released = " + val + "\n";
};

Blockly.Python['gpiozero_button_pin'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "Button", Blockly.Python.ORDER_NONE);

    return [button + ".pin", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_button_is_pressed'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "Button", Blockly.Python.ORDER_NONE);

    return [button + ".is_pressed", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_button_pull_up'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "Button", Blockly.Python.ORDER_NONE);

    return [button + ".pull_up", Blockly.Python.ORDER_ATOMIC];
};
//==========END GPIOZERO Button section==========


//==========BEGIN GPIOZERO MotionSensor section==========

Blockly.Python['gpiozero_motion'] = function (block) {

    var count = block.itemCount_;
    if (count > 5) {
        count = 5;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return ["MotionSensor(" + params.join(", ") + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_motion_when_motion_no_motion'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "MotionSensor", Blockly.Python.ORDER_NONE);
    var val = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);
    var op = block.getFieldValue("OP");

    return button + op + val + "\n";
};

Blockly.Python['gpiozero_motion_when_no_motion'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "MotionSensor", Blockly.Python.ORDER_NONE);
    var val = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return button + ".when_no_motion = " + val + "\n";
};

Blockly.Python['gpiozero_motion_pin'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "MotionSensor", Blockly.Python.ORDER_NONE);

    return [button + ".pin", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_motion_motion_detected'] = function (block) {

    var button = Blockly.Python.valueToCode(block, "MotionSensor", Blockly.Python.ORDER_NONE);

    return [button + ".motion_detected", Blockly.Python.ORDER_ATOMIC];
};

//==========END GPIOZERO MotionSensor section==========

//==========BEGIN GPIOZERO PiLiter section==========
Blockly.Python['gpiozero_piliter'] = function (block) {

    //Blockly.Python.valueToCode(block, block.getFieldValue('LIB' + n), Blockly.Python.ORDER_NONE);

    var count = block.itemCount_;
    var pwm = "";
    if (count >= 1){
        count = 1;
        pwm = "pwm=" + Blockly.Python.valueToCode(block, "ADD0", Blockly.Python.ORDER_NONE);
    }

    return ["PiLiter(" + pwm + ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_piliter_blink'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    var count = block.itemCount_;
    if (count <= 6) {
        count = 6;
    }
    var params = new Array(count);
    for (var n = 0; n < count; n++) {
        params[n] = Blockly.Python.valueToCode(block, "ADD" + n, Blockly.Python.ORDER_NONE);
    }
    return led + ".blink(" + params.join(", ") + ")\n";
};

Blockly.Python['gpiozero_piliter_on_off_toggle_close'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var op = block.getFieldValue("OP");


    return led + "." + op + "\n";
};

Blockly.Python['gpiozero_piliter_value_out'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".value", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_piliter_value_in'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE);

    return led + ".value = " + value + "\n";
};

Blockly.Python['gpiozero_piliter_leds'] = function (block) {

    var led = Blockly.Python.valueToCode(block, "LED", Blockly.Python.ORDER_NONE);

    return [led + ".leds", Blockly.Python.ORDER_ATOMIC];
};

//==========END GPIOZERO PiLiter section==========

Blockly.Python['gpiozero_import_stepper'] = function (block) {
    var comment = '# Bring custom Stepper class that uses GPIOZero libraries into program:\n';
    Blockly.Python.definitions_['import_stepper'] = comment + 'from stepper import Stepper\n';
    return "";
};

Blockly.Python['gpiozero_stepper'] = function (block) {

    return ["Stepper()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['gpiozero_stepper_forward_backward'] = function (block) {
    var stepper = Blockly.Python.valueToCode(block, "STEPPER", Blockly.Python.ORDER_NONE);
    
    var op = block.getFieldValue("OP");
    
    var delay = Blockly.Python.valueToCode(block, "DELAY", Blockly.Python.ORDER_NONE);
    var steps = Blockly.Python.valueToCode(block, "STEPS", Blockly.Python.ORDER_NONE);
    
    return stepper + "." + op + "(" + delay + ", " + steps + ")\n";
};


