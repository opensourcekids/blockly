$(document).ready(function () {
    var $flyout = $('.flyout'),
        $flyout2 = $('.flyout2'),
        $overlay = $('.overlay'),
        $flyoutToggle = $('.flyout-toggle'),
        $flyout2Toggle = $('.flyout2-toggle'),
        $flyoutOpen = $('.flyout-open');


    $flyoutOpen.bind("click keypress", function (e) {
        e.preventDefault();
        $flyout.toggleClass('active');
        $overlay.toggleClass('active');
    });

    $flyoutToggle.bind("click keypress", function (e) {
        e.preventDefault();
        $flyout.toggleClass('active');
        $overlay.toggleClass('active');
    });

    $flyout2Toggle.bind("click keypress", function (e) {
        e.preventDefault();
        $flyout.toggleClass('active');
        $overlay.toggleClass('active');
    });

    $overlay.bind("click keypress", function (e) {
        e.preventDefault();
        $flyout.toggleClass('active');
        $overlay.toggleClass('active');
    });
});