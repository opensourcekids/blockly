$(document).ready(function () {
    var $flyout = $('.flyout'),
        $overlay = $('.overlay'),
        $flyoutToggle = $('.flyout-toggle')
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

    $overlay.bind("click keypress", function (e) {
        e.preventDefault();
        $flyout.toggleClass('active');
        $overlay.toggleClass('active');
    });
});