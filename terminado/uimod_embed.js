//var TERM;

window.addEventListener('load', function () {
    var containers = document.getElementsByClassName('terminado-container');
    var container, rows, cols, protocol, ws_url;
    for (var i = 0; i < containers.length; i++) {
        container = containers[i];
        rows = parseInt(container.dataset.rows);
        cols = parseInt(container.dataset.cols);
        protocol = (window.location.protocol.indexOf("https") === 0) ? "wss" : "ws";
        ws_url = protocol+"://"+window.location.host+ container.dataset.wsUrl;
        TERM = make_terminal(container, {rows: rows, cols: cols}, ws_url);
    }
}, false);
//
//
//function myFunction() {
//
//    TERM.showCursor();
//    TERM.handler("python ~/while_loop.py\r");
//}
