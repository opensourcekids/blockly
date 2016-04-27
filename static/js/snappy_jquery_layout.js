/**
 * Created by anthony on 2016/04/26.
 */

var myLayout; // a var is required because this page utilizes: myLayout.allowOverflow() method

$(document).ready(function () {
    myLayout = $('body').layout({
        // enable showOverflow on west-pane so popups will overlap north pane
        west__showOverflowOnHover: true
        , west: {
            size: '400'
            , maxSize: '400'
            , initClosed: true
        }
        , east: {
            size: '33%'
        }
        , east__childOptions: {
            center__size: '50%'
            , south: {
                size: '50%'
                , initClosed: true
            }
        }
        , south: {
            initClosed: true
        }
        , north: {
            size: '80'
            , resizable: false
            , slidable: false
            , closable: false
        }
    });

    
});