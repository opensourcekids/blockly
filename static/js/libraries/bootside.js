(function ($) {


    $.fn.BootSideMenu = function (options) {

        var oldCode, newCode, side;

        newCode = "";

        var settings = $.extend({
            side: "left",
            autoClose: true,
            glyph: '',
            order: 'zero',
            text: '&nbsp;'
        }, options);

        side = settings.side;
        autoClose = settings.autoClose;
        glyph = settings.glyph;
        order = settings.order;
        text = settings.text;

        this.addClass("container sidebar");
        this.attr('data-status', 'opened');

        if (side == "left") {
            this.addClass("sidebar-left");
        } else if (side == "right") {
            this.addClass("sidebar-right");
        } else {
            this.addClass("sidebar-left");
        }

        oldCode = this.html();

        newCode += "<div class=\"row\">\n";
        newCode += "	<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg1-12\" data-side=\"" + side + "\">\n" + oldCode + " </div>\n";
        newCode += "</div>";
        newCode += "<div class=\"toggler\" order=\"" + order + "\">\n";
        newCode += "	<p class=\"" + glyph + "\">" + text + "</p> \n";
        newCode += "</div>\n";

        //Mod suggested by asingh3
        //https://github.com/AndreaLombardo/BootSideMenu/issues/1
        var wrapper = $(newCode);
        // copy the children to the wrapper.
        $.each(this.children(), function () {
            $('.panel-content', wrapper).append(this);
        });

        // Empty the element and then append the wrapper code.
        $(this).empty();
        $(this).append(wrapper);

        if (autoClose) {
            $(this).find(".toggler").trigger("click");
        }
    };

    $(document).on('click', '.sidebar .list-group-item', function () {
        $('.sidebar .list-group-item').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });


    $(document).on('click', '.sidebar .list-group-item', function (event) {
        var idToToggle, this_offset, this_x, this_y, href, side;
        event.preventDefault();
        href = $(this).attr('href');

        if (href.substr(0, 1) == '#') {

            idToToggle = href.substr(1, href.length);

            if (searchSubMenu(idToToggle)) {

                this_offset = $(this).offset();
                side = $(this).parent().parent().attr('data-side');

                if (side == 'left') {
                    this_x = $(this).width() + 10;
                    this_y = this_offset.top + 1;
                    $('#' + idToToggle).css('left', this_x);
                    $('#' + idToToggle).css('top', this_y);
                } else if (side == 'right') {
                    this_x = $(this).width() + 10;
                    this_y = this_offset.top + 1;
                    $('#' + idToToggle).css('right', this_x);
                    $('#' + idToToggle).css('top', this_y);
                }

                $('#' + idToToggle).fadeIn();

            } else {
                $('.submenu').fadeOut();
            }
        }
    });


    $(document).on('click', '.toggler', function () {
        var toggler = $(this);
        var container = toggler.parent();
        var listaClassi = $(container[0]).attr('class').split(/\s+/); //IE9 Fix - Thanks Nicolas Renaud
        var side = getSide(listaClassi);
        var containerWidth = container.width();
        var status = container.attr('data-status');
        if (!status) {
            status = "opened";
        }
        doAnimation(container, containerWidth, side, status);
    });

    /*Cerca un div con classe submenu e id uguale a quello passato*/
    function searchSubMenu(id) {
        var found = false;
        $('.submenu').each(function () {
            var thisId = $(this).attr('id');
            if (id == thisId) {
                found = true;
            }
        });
        return found;
    }

//restituisce il lato del sidebar in base alla classe che trova settata
    function getSide(listaClassi) {
        var side;
        for (var i = 0; i < listaClassi.length; i++) {
            if (listaClassi[i] == 'sidebar-left') {
                side = "left";
                break;
            } else if (listaClassi[i] == 'sidebar-right') {
                side = "right";
                break;
            } else {
                side = null;
            }
        }
        return side;
    }

//esegue l'animazione
    function doAnimation(container, containerWidth, sidebarSide, sidebarStatus) {
        var toggler = container.children()[1];
        if (sidebarStatus == "opened") {
            if (sidebarSide == "left") {
                container.animate({
                    left: -(containerWidth + 2)
                });
                toggleArrow(toggler, "left");
            } else if (sidebarSide == "right") {
                container.animate({
                    right: -(containerWidth + 2)
                });
                toggleArrow(toggler, "right");
            }
            container.attr('data-status', 'closed');
        } else {
            if (sidebarSide == "left") {
                container.animate({
                    left: 0
                });
                toggleArrow(toggler, "right");
            } else if (sidebarSide == "right") {
                container.animate({
                    right: 0
                });
                toggleArrow(toggler, "left");
            }
            container.attr('data-status', 'opened');

            for (i = 0; i < container.siblings("div[id^=panel]").length; i++) {
                var b = container.siblings("div[id^=panel]")[i];
                // console.log(b.dataset.status);
                if (b.dataset.status == 'opened') {
                    $(b).animate({
                        right: -($(b).width() + 2)
                    });
                    b.dataset.status = 'closed';
                }
            }

            var status = container.id;
            if (container.attr("id") == 'panel_help') {
                //console.log('PANEL_HELP');
                sib = container.siblings("div[id^=panel]")[0];
                //console.log(sib);
                d = $(container).detach();
                //console.log(d);
                $(d).insertBefore(sib);
            } else if (container.attr("id") == 'panel_code') {
                //console.log('PANEL_CODE');
                sib = container.siblings("div[id^=panel]")[0];
                //console.log(sib);
                d = $(container).detach();
                //console.log(d);
                $(d).insertBefore(sib);
            } else if (container.attr("id") == 'panel_output') {
                //console.log('PANEL_OUTPUT');
                sib = container.siblings("div[id^=panel]")[0];
                //console.log(sib);
                d = $(container).detach();
                //console.log(d);
                $(d).insertBefore(sib);
            } else if (container.attr("id") == 'panel_terminal') {
                //console.log('PANEL_TERMINAL');
                sib = container.siblings("div[id^=panel]")[0];
                //console.log(sib);
                d = $(container).detach();
                //console.log(d);
                $(d).insertBefore(sib);
            }
        }
    }

    function toggleArrow(toggler, side) {
        if (side == "left") {
            $(toggler).children(".glyphicon-chevron-right").css('display', 'block');
            $(toggler).children(".glyphicon-chevron-left").css('display', 'none');
        } else if (side == "right") {
            $(toggler).children(".glyphicon-chevron-left").css('display', 'block');
            $(toggler).children(".glyphicon-chevron-right").css('display', 'none');
        }
    }

}(jQuery));

