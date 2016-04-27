/**
 * Created by anthony on 10/25/15.
 */

var wasCanvasClosed = false;

function modalOutput() {
    wasCanvasClosed = false;
    $('#modal-output').modal('show');
}

function modalIntro() {
    $('#modal-intro').modal('show');
}

if (modal_template) {
    $(window).load(function () {
        modalIntro();
    });
}

function canvasClose() {
    wasCanvasClosed = true;
}