
// This is the lesson tab.
$(document).ready(function () {
    $('#panel_help').BootSideMenu({
        side: "right",
        autoClose: true,
        glyph: "zero lesson glyphicon glyphicon-question-sign",
        order: 'zero'
    });
});

// This is the output tab.
$(document).ready(function () {
    $('#panel_output').BootSideMenu({
        side: "right",
        autoClose: true,
        //text: '>>>',
        order: 'two',
        glyph: 'two glyphicon glyphicon-console'
    });
});

// This is the code tab.
$(document).ready(function () {
    $('#panel_code').BootSideMenu({
        side: "right",
        autoClose: false,
        order: 'one',
        //text: 'code',
        glyph: 'one glyphicon glyphicon-text-size' // ../img/python_logo.png'
    });
});